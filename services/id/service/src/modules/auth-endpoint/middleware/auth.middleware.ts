/* eslint-disable @typescript-eslint/camelcase */
import { NextFunction, Request, Response } from 'express';
import { generators, Issuer } from 'openid-client';
import { sql } from 'slonik';
import { setTimeout } from 'timers';

import { config, Logger } from '../../../common';
import { ErrorCode } from '../../../common/errors';
import { PgClient } from '../database/pg-client';
import { applicationError } from '../common/error-handler';
import { AuthRequest } from '../common/interfaces';
import { AuthContext } from '../common/types';
import { stateContextMap } from '../common/shared-state';

const logger = new Logger('auth-middleware');

export const authRequestExtractor = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const tenantId = req.params.tenantId;
  const applicationId = req.params.applicationId;
  const providerId = req.query.providerId as string;
  const originUrl = req.query.originUrl as string;

  //validate request
  if (!tenantId) {
    res.status(400).send(applicationError(req, 'Tenant ID is required.'));
  } else if (!applicationId) {
    res.status(400).send(applicationError(req, 'Application ID is required.'));
  } else if (!providerId) {
    res
      .status(400)
      .send(applicationError(req, 'Identity Provider ID is required.'));
  } else if (!originUrl) {
    res.status(400).send(applicationError(req, 'Origin URL is required.'));
  } else {
    (req as AuthRequest).authReqestParams = {
      tenantId,
      applicationId,
      providerId,
      originUrl,
    };
    next();
  }
};

export const idpConfigValidatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const executionStart = process.hrtime();

  const {
    tenantId,
    applicationId,
    providerId,
  } = (req as AuthRequest).authReqestParams;

  try {
    const pgClient = new PgClient({ tenantId, applicationId });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const idpConfig = await pgClient.queryExactlyOne<any>(sql`
        SELECT ic.discovery_document_url, ic.client_id, ic.client_secret, array_to_string(ic.scopes, ' ') AS scopes,
               ic.enabled AS idp_enabled, a.enabled AS application_enabled, a.interim_administrator_email, t.status AS tenant_status
        FROM application_administration.idp_configuration ic, application_administration.application a, tenant_administration.tenant t
        WHERE t.id = a.tenant_id
        AND   a.id = ic.application_id
        AND   ic.tenant_id = ${tenantId}
        AND   ic.application_id = ${applicationId}
        AND   ic.idp_id = ${providerId}`);

    //validate IDP configuration
    if (!idpConfig) {
      res
        .status(400)
        .send(applicationError(req, 'IDP configuration does not exist.'));
    } else if (idpConfig.idpEnabled === false) {
      res
        .status(400)
        .send(
          applicationError(
            req,
            'The requested IDP configuration is disabled. Please contact the Tenant Administrator.',
          ),
        );
    } else if (idpConfig.applicationEnabled === false) {
      res
        .status(400)
        .send(
          applicationError(
            req,
            'The application is not enabled for use. Please contact the Tenant Administrator.',
          ),
        );
    } else if (idpConfig.tenantStatus === 'DISABLED') {
      res
        .status(400)
        .send(
          applicationError(
            req,
            'The tenant is currently not active. Please contact Tenant Administrator.',
          ),
        );
    } else {
      (req as AuthRequest).idpConfig = {
        clientId: idpConfig.clientId,
        clientSecret: idpConfig.clientSecret,
        scopes: idpConfig.scopes,
        discoveryDocumentUrl: idpConfig.discoveryDocumentUrl,
        interimAdministratorEmail: idpConfig.interimAdministratorEmail,
      };
      next();
    }
  } catch (error) {
    logger.error(error);

    let code: ErrorCode;
    let message: string;

    // invalid input syntax for type uuid
    if (error.code === '22P02') {
      code = ErrorCode.BadRequest;
      message = 'One or more parameter formats are invalid.';
    } else {
      code = ErrorCode.InternalServerError;
      message = 'An error occured while validating IDP Configuration.';
    }

    res.status(400).send(applicationError(req, message, logger, false, code));
  }

  const executionTime = process.hrtime(executionStart);
  logger.debug({
    message: 'Performance Statistics',
    methodName: 'idpConfigValidatorMiddleware',
    executionTimeMs: executionTime[0] * 1000 + executionTime[1] / (1000 * 1000),
  });
};

export const idpAuthMiddleware = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const executionStart = process.hrtime();

  const {
    tenantId,
    applicationId,
    providerId,
    originUrl,
  } = (req as AuthRequest).authReqestParams;

  // Check if proxy is being used, and use it as public endpoint
  let publicAuthEndpointUrl: string;
  if (req.get('x-forwarded-proto') && req.get('x-forwarded-host')) {
    publicAuthEndpointUrl = `${req.get('x-forwarded-proto')}://${req.get(
      'x-forwarded-host',
    )}`;
  } else {
    publicAuthEndpointUrl = config.publicAuthEndpointUrl;
  }

  //get IDP configuration
  try {
    const idpConfig = (req as AuthRequest).idpConfig;
    const { clientId, clientSecret, scopes, discoveryDocumentUrl } = idpConfig;

    const redirectUrl = new URL(
      `${tenantId}/${applicationId}/auth/callback`,
      publicAuthEndpointUrl,
    );
    redirectUrl.searchParams.append('providerId', providerId);

    const authProvider = await Issuer.discover(discoveryDocumentUrl);
    const authClient = new authProvider.Client({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uris: [redirectUrl.href],
      response_types: ['code'],
    });

    const state = generators.state();

    //create PKCE code challenge
    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);

    //create nonce to add replay protection over IDP token endpoint
    const nonce = generators.nonce();

    const authUrl = authClient.authorizationUrl({
      scope: scopes,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      nonce,
      prompt: 'consent',
      access_type: 'offline', // TODO: This is special handling needed to GOOGLE. Check for AzureAD
    });

    const authContext: AuthContext = {
      state,
      nonce,
      authClient,
      codeVerifier,
      redirectUrl: redirectUrl.href,
      originUrl,
      idpConfig,
    };
    stateContextMap.set(state, authContext);

    // self-cleanup of states from memory (60 second timeout)
    setTimeout(
      state => {
        stateContextMap.delete(state);
      },
      1000 * 60,
      state,
    );

    res.redirect(302, authUrl);
  } catch (error) {
    logger.error(error);

    res
      .status(400)
      .send(
        applicationError(
          req,
          'An error occured while generating IDP authorization URL.',
        ),
      );
  }

  const executionTime = process.hrtime(executionStart);
  logger.debug({
    message: 'Performance Statistics',
    methodName: 'idpAuthMiddleware',
    executionTimeMs: executionTime[0] * 1000 + executionTime[1] / (1000 * 1000),
  });
};
