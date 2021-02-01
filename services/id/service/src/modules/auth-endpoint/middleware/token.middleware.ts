/* eslint-disable @typescript-eslint/camelcase */
import { TokenResponse, TokenResponseCode } from '@ax/id-link-utils';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import { JWK } from 'jose';
import * as jwt from 'jsonwebtoken';
import { Issuer } from 'openid-client';
import * as path from 'path';
import { sql } from 'slonik';

import { config, Logger } from '../../../common';
import {
  Permission,
  TenantStatus,
  User,
  UserStatus,
} from '../../../generated/graphql.types';
import { applicationError } from '../common/error-handler';
import { AuthRequest } from '../common/interfaces';
import { PgClient } from '../database/pg-client';
import { UserToken } from '../entity/user-token';

const logger = new Logger('token-middleware');

const tokenExpirationInSeconds = 60 * 10; // 10 Minutes

export const tokenRequestExtractor = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const tenantId = req.params.tenantId;
  const applicationId = req.params.applicationId;
  const axinomIamToken = req.cookies['AXINOM_IAM_TOKEN'];

  //validate request
  if (!tenantId) {
    res.status(400).send(applicationError(req, 'Tenant ID is required.'));
  } else if (!applicationId) {
    res.status(400).send(applicationError(req, 'Application ID is required.'));
  } else {
    (req as AuthRequest).tokenRequestParams = {
      tenantId,
      applicationId,
      axinomIamToken,
    };
    next();
  }
};

function generateAccessToken(
  tenantId: string,
  applicationId: string,
  userId: string,
  permissions: { [serviceId: string]: [string] },
  audience: string,
  expiresIn: number,
): string {
  const executionStart = process.hrtime();

  const payload = {
    tenantId,
    applicationId,
    userId,
    permissions,
    tags: [],
  };

  const privateKey = fs.readFileSync(
    path.resolve(__dirname, './../../../../keys/private.key'),
    'utf8',
  );

  const publicKey = JWK.asKey(
    fs.readFileSync(
      path.resolve(__dirname, './../../../../keys/public.key'),
      'utf8',
    ),
  );

  const signOptions: jwt.SignOptions = {
    issuer: config.serviceId,
    subject: userId,
    audience: audience,
    expiresIn: expiresIn,
    algorithm: 'RS256',
    keyid: publicKey.kid,
  };

  const token = jwt.sign(payload, privateKey, signOptions);

  const executionTime = process.hrtime(executionStart);
  logger.debug({
    message: 'Performance Statistics',
    methodName: 'generateAccessToken',
    executionTimeMs: executionTime[0] * 1000 + executionTime[1] / (1000 * 1000),
  });

  return token;
}

export const idpTokenMiddleware = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const executionStart = process.hrtime();

  try {
    const {
      tenantId,
      applicationId,
      axinomIamToken,
    } = (req as AuthRequest).tokenRequestParams;

    if (axinomIamToken) {
      const pgClient = new PgClient({
        user: 'SYSTEM',
        tenantId,
        applicationId,
      });
      const userTokenResults = await pgClient.query<UserToken>(sql`
        SELECT id, user_id, idp_id, idp_access_token, idp_refresh_token, idp_access_token_expires_at, expires_at
        FROM auth_endpoint.user_token
        WHERE axinom_iam_token = ${axinomIamToken}`);

      if (userTokenResults.rowCount === 1) {
        let userToken = userTokenResults.rows[0];

        // Check axinom iam token
        if (userToken.expiresAt.valueOf() <= new Date().valueOf()) {
          // Axinom iam token has expired
          const tokenResponse: TokenResponse = {
            code: TokenResponseCode.NEEDS_LOGIN,
          };
          res.send(tokenResponse);
        } else {
          // Axinom iam token is valid

          // Check tenant, application and idp configurations
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const idpConfig = await pgClient.queryExactlyOne<any>(sql`
            SELECT ic.discovery_document_url, ic.client_id, ic.client_secret, ic.enabled AS idp_enabled,
                   a.enabled AS application_enabled, t.status AS tenant_status
            FROM application_administration.idp_configuration ic, application_administration.application a, tenant_administration.tenant t
            WHERE t.id = a.tenant_id
            AND   a.id = ic.application_id
            AND   ic.tenant_id = ${tenantId}
            AND   ic.application_id = ${applicationId}
            AND   ic.idp_id = ${userToken.idpId}`);

          if (
            !idpConfig ||
            !idpConfig.idpEnabled ||
            !idpConfig.applicationEnabled ||
            idpConfig.tenantStatus === TenantStatus.DISABLED
          ) {
            const tokenResponse: TokenResponse = {
              code: TokenResponseCode.ERROR,
              message:
                'Tenant, application or IDP configuration is disabled. Please contact the Tenant Administrator.',
            };
            res.send(tokenResponse);
          } else {
            // Check user status
            const user = await pgClient.queryExactlyOne<User>(sql`
              SELECT *
              FROM access_management.user
              WHERE id = ${userToken.userId}`);

            if (user.status === UserStatus.BLOCKED) {
              logger.debug({
                message: 'Attempted to renew access token for inactive user',
                user,
              });

              const tokenResponse: TokenResponse = {
                code: TokenResponseCode.ACCOUNT_NOT_ACTIVE,
                message:
                  'The user account is not active. Please contact your administrator.',
              };
              res.send(tokenResponse);
            } else {
              // Get permissions for the user
              const { rows: permissionRows } = await pgClient.query<
                Permission
              >(sql`
                WITH RECURSIVE user_roles AS (
                  SELECT user_role_id
                  FROM access_management.user_role_assignment
                  WHERE user_id = ${userToken.userId}
                  UNION
                  SELECT urp.parent_user_role_id
                  FROM access_management.user_role_parent urp, user_roles ur
                  WHERE urp.user_role_id = ur.user_role_id
                ) 
                SELECT DISTINCT p.service_id, p.name
                FROM access_management.user_role_permission urp, access_management.permission p
                WHERE urp.user_role_id IN (SELECT user_role_id FROM user_roles)
                AND urp.permission_id = p.id
              `);

              // Group permissions by service-id
              const permissions: {
                [serviceId: string]: [string];
              } = permissionRows.reduce((groupedPermissions, permission) => {
                groupedPermissions[permission.serviceId] =
                  groupedPermissions[permission.serviceId] || [];
                groupedPermissions[permission.serviceId].push(permission.name);
                return groupedPermissions;
              }, {});

              // Check IDP access token
              if (
                userToken.idpAccessTokenExpiresAt.valueOf() <=
                new Date().valueOf()
              ) {
                // IDP access token has expired
                // Renew IDP tokens using IDP refresh token
                const authProvider = await Issuer.discover(
                  idpConfig.discoveryDocumentUrl,
                );
                const authClient = new authProvider.Client({
                  client_id: idpConfig.clientId,
                  client_secret: idpConfig.clientSecret,
                });
                const tokenSet = await authClient.refresh(
                  userToken.idpRefreshToken,
                );

                // Retrieve user info from IDP (i.e. profile_picture_url)
                const idpUserInfo = await authClient.userinfo(
                  tokenSet.access_token,
                );

                // Update user
                const user = await pgClient.queryExactlyOne<User>(sql`
                  UPDATE access_management.user
                  SET name = ${idpUserInfo.name},
                    profile_picture_url = ${idpUserInfo.picture}
                  WHERE email = ${idpUserInfo.email}
                  RETURNING *
                  `);

                // Update user token
                userToken = await pgClient.queryExactlyOne<UserToken>(sql`
                  UPDATE auth_endpoint.user_token
                  SET idp_access_token = ${tokenSet.access_token},
                    idp_access_token_expires_at = to_timestamp(${tokenSet.expires_at})
                  WHERE id = ${userToken.id}
                  RETURNING *
                `);

                // Generate a new access token
                const tokenResponse: TokenResponse = {
                  code: TokenResponseCode.SUCCESS,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    profilePictureUrl: idpUserInfo.picture || '',
                    token: {
                      accessToken: generateAccessToken(
                        tenantId,
                        applicationId,
                        userToken.userId,
                        permissions,
                        '*',
                        tokenExpirationInSeconds,
                      ),
                      expiresIn: tokenExpirationInSeconds,
                      permissions,
                      tags: [],
                    },
                  },
                };
                res.send(tokenResponse);
              } else {
                //IDP access token is valid
                //Get user details
                const user = await pgClient.queryExactlyOne<User>(sql`
                  SELECT name, profile_picture_url, email
                  FROM access_management.user
                  WHERE id = ${userToken.userId}`);

                // Generate a new access token
                const tokenResponse: TokenResponse = {
                  code: TokenResponseCode.SUCCESS,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    profilePictureUrl: user.profilePictureUrl || '',
                    token: {
                      accessToken: generateAccessToken(
                        tenantId,
                        applicationId,
                        userToken.userId,
                        permissions,
                        '*',
                        tokenExpirationInSeconds,
                      ),
                      expiresIn: tokenExpirationInSeconds,
                      permissions,
                      tags: [],
                    },
                  },
                };
                res.send(tokenResponse);
              }
            }
          }
        }
      } else {
        // Axinom iam token was not found
        const tokenResponse: TokenResponse = {
          code: TokenResponseCode.NEEDS_LOGIN,
        };
        res.send(tokenResponse);
      }
    } else {
      // Axinom iam token was not sent with request
      const tokenResponse: TokenResponse = {
        code: TokenResponseCode.NEEDS_LOGIN,
      };
      res.send(tokenResponse);
    }
  } catch (error) {
    logger.log(error);

    const tokenResponse: TokenResponse = {
      code: TokenResponseCode.ERROR,
      message: `Internal server error while renewing access token, Please check the ${config.serviceId} log for more details.`,
    };
    res.send(tokenResponse);
  }
  const executionTime = process.hrtime(executionStart);

  logger.debug({
    message: 'Performance Statistics',
    methodName: 'idpTokenMiddleware',
    executionTimeMs: executionTime[0] * 1000 + executionTime[1] / (1000 * 1000),
  });
};
