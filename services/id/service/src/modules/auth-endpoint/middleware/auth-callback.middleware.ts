/* eslint-disable @typescript-eslint/camelcase */
import * as crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { sql } from 'slonik';

import { config, Logger } from '../../../common';
import { User, UserRole, UserStatus } from '../../../generated/graphql.types';
import { applicationError } from '../common/error-handler';
import { AuthRequest } from '../common/interfaces';
import { stateContextMap } from '../common/shared-state';
import { PgClient } from '../database/pg-client';
import { UserToken } from '../entity/user-token';

const logger = new Logger('auth-callback-middleware');

const handleInterimAdministrator = async (
  tenantId: string,
  applicationId: string,
  user: User,
): Promise<void> => {
  const executionStart = process.hrtime();

  const pgClient = new PgClient({ user: 'SYSTEM', tenantId, applicationId });

  user = await pgClient.queryExactlyOne<User>(sql`
    UPDATE access_management.user
    SET status = ${UserStatus.ACTIVE}
    WHERE id = ${user.id}
    RETURNING *
  `);

  let userRoleId: number;

  const userRoleResults = await pgClient.query<UserRole>(sql`
    SELECT ur.id FROM access_management.user_role ur WHERE ur.name = ${'Administrator'}
  `);

  if (userRoleResults.rowCount) {
    const administratorUserRole = userRoleResults.rows[0];
    userRoleId = administratorUserRole.id;

    await pgClient.query(sql`
      DELETE FROM access_management.user_role_permission urp
      WHERE urp.user_role_id = ${userRoleId}
      RETURNING *
    `);
  } else {
    const userRole = await pgClient.queryExactlyOne<UserRole>(sql`
      INSERT INTO access_management.user_role
      (
        name,
        description
      )
      VALUES
      (
        ${'Administrator'},
        ${'A system generated role which consists of all permissions needed to administrate an application'}
      )
      RETURNING *
    `);

    userRoleId = userRole.id;
  }

  await pgClient.query(sql`
    INSERT INTO access_management.user_role_permission
    (
      user_role_id,
      permission_id
    )
    (
      SELECT ${userRoleId}, p.id
      FROM access_management.permission p
      WHERE p.service_id = ${config.serviceId}
    )
    RETURNING *
  `);

  if (
    !(await pgClient.exists(sql`
      SELECT 1
      FROM access_management.user_role_assignment ura
      WHERE ura.user_id = ${user.id}
      AND   ura.user_role_id = ${userRoleId}
    `))
  ) {
    await pgClient.query(sql`
    INSERT INTO access_management.user_role_assignment
    (
      user_id,
      user_role_id
    )
    VALUES
    (
      ${user.id},
      ${userRoleId}
    )
    RETURNING *
  `);
  }

  const executionTime = process.hrtime(executionStart);

  logger.debug({
    message: 'Performance Statistics',
    methodName: 'handleInterimAdministrator',
    executionTimeMs: executionTime[0] * 1000 + executionTime[1] / (1000 * 1000),
  });
};

export const authCallbackRequestExtractor = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const tenantId = req.params.tenantId;
  const applicationId = req.params.applicationId;
  const providerId = req.query.providerId as string;
  const state = req.query.state as string;
  const authorizationCode = req.query.code as string;

  //validate request
  if (!tenantId) {
    res.status(400).send(applicationError(req, 'Tenant ID is not found.'));
  } else if (!applicationId) {
    res.status(400).send(applicationError(req, 'Application ID is not found.'));
  } else if (!providerId) {
    res
      .status(400)
      .send(applicationError(req, 'Identity Provider ID is not found.'));
  } else if (!state) {
    res.status(400).send(applicationError(req, 'State is not found.'));
  } else if (!authorizationCode) {
    res
      .status(400)
      .send(applicationError(req, 'Authorization Code is not found.'));
  } else {
    const authContext = stateContextMap.get(state);
    if (authContext) {
      stateContextMap.delete(state);

      (req as AuthRequest).authReqestCallbackParams = {
        tenantId,
        applicationId,
        providerId,
        authContext,
        authorizationCode,
      };
      next();
    } else {
      res.send({
        status: 'ERROR',
        message: 'Callback context is not valid. Please try again.',
      });
    }
  }
};

export const idpAuthCallbackMiddleware = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const executionStart = process.hrtime();

  try {
    const {
      tenantId,
      applicationId,
      providerId,
      authContext,
    } = (req as AuthRequest).authReqestCallbackParams;

    const {
      state,
      nonce,
      authClient,
      codeVerifier,
      redirectUrl,
      originUrl,
      idpConfig,
    } = authContext;

    // Retrieve access_token, refresh_token & id_token
    const backchannelExecutionStart = process.hrtime();
    const params = authClient.callbackParams(req);
    const tokenSet = await authClient.callback(redirectUrl, params, {
      state,
      nonce,
      code_verifier: codeVerifier,
    });
    const backchannelExecutionTime = process.hrtime(backchannelExecutionStart);
    logger.debug({
      message: 'Performance Statistics',
      methodName: 'oidc-backchannel-call',
      executionTimeMs:
        backchannelExecutionTime[0] * 1000 +
        backchannelExecutionTime[1] / (1000 * 1000),
    });

    // Retrieve user info from IDP (i.e. profile_picture_url)
    const idpTokenExecutionStart = process.hrtime();
    const idpUserInfo = await authClient.userinfo(tokenSet.access_token);
    const idpTokenExecutionTime = process.hrtime(idpTokenExecutionStart);
    logger.debug({
      message: 'Performance Statistics',
      methodName: 'oidc-token-call',
      executionTimeMs:
        idpTokenExecutionTime[0] * 1000 +
        idpTokenExecutionTime[1] / (1000 * 1000),
    });

    // Insert or update user
    const pgClient = new PgClient({ user: 'SYSTEM', tenantId, applicationId });
    let user: User;
    if (
      await pgClient.exists(
        sql`SELECT 1 FROM access_management.user u WHERE u.email = ${idpUserInfo.email}`,
      )
    ) {
      user = await pgClient.queryExactlyOne<User>(sql`
        UPDATE access_management.user
        SET name = ${idpUserInfo.name},
            profile_picture_url = ${idpUserInfo.picture}
        WHERE email = ${idpUserInfo.email}
        RETURNING *
      `);
    } else {
      user = await pgClient.queryExactlyOne<User>(sql`
        INSERT INTO access_management.user
        (
          name,
          profile_picture_url,
          email
        )
        VALUES
        (
          ${idpUserInfo.name},
          ${idpUserInfo.picture},
          ${idpUserInfo.email}
        )
        RETURNING *
      `);
    }

    if (user.email === idpConfig.interimAdministratorEmail) {
      await handleInterimAdministrator(tenantId, applicationId, user);
    }

    // Clean-up existing user tokens for the same idpId
    // This will force user to always have at-most one browser they are logged into using same idp
    const { rows: deletedRows } = await pgClient.query<UserToken>(
      sql`
          DELETE FROM auth_endpoint.user_token ut
          WHERE ut.tenant_id = ${tenantId}
          AND   ut.application_id = ${applicationId}
          AND   ut.idp_id = ${providerId}
          RETURNING *
        `,
    );

    logger.debug({
      message: 'Cleaning up existing user token(s)',
      deletedUserTokenIds: deletedRows.map(row => {
        return row.id;
      }),
    });

    // Insert new user token
    const axinomIamToken = crypto.randomBytes(64).toString('base64');

    const userToken = await pgClient.queryExactlyOne<UserToken>(sql`
      INSERT INTO auth_endpoint.user_token
      (
        user_id,
        idp_id,
        idp_subject_id,
        idp_access_token,
        idp_refresh_token,
        idp_access_token_expires_at,
        axinom_iam_token,
        expires_at
      )
      VALUES
      (
        ${user.id},
        ${providerId},
        ${idpUserInfo.sub},
        ${tokenSet.access_token},
        ${tokenSet.refresh_token},
        to_timestamp(${tokenSet.expires_at}),
        ${axinomIamToken},
        now() + interval '30 day'
      )
      RETURNING *
    `);

    logger.debug({
      message: 'Created a new existing user token',
      userTokenId: userToken.id,
    });

    res.cookie('AXINOM_IAM_TOKEN', axinomIamToken, {
      // domain: 'id.axinom.com',
      path: `/${tenantId}/${applicationId}/`,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 Days in ms
      httpOnly: true,
      secure: !config.isDev(),
      sameSite: 'strict',
    });

    res.redirect(originUrl);
  } catch (error) {
    logger.log(error);

    res.send({
      status: 'ERROR',
      message: 'Error while requesting IDP Tokens',
    });
  }

  const executionTime = process.hrtime(executionStart);

  logger.debug({
    message: 'Performance Statistics',
    methodName: 'idpAuthCallbackMiddleware',
    executionTimeMs: executionTime[0] * 1000 + executionTime[1] / (1000 * 1000),
  });
};
