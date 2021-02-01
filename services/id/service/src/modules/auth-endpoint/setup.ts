import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { Application } from 'express';

import {
  authCallbackRequestExtractor,
  authRequestExtractor,
  configStatusMiddleware,
  idpAuthCallbackMiddleware,
  idpAuthMiddleware,
  idpConfigValidatorMiddleware,
  idpTokenMiddleware,
  logoutUserMiddleware,
  tokenRequestExtractor,
  wellKnownConfigMiddleware,
} from './middleware';

export const setupAuthMiddleware = (app: Application): void => {
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(cookieParser());

  // ID Service Configuration
  app.get('/:tenantId/:applicationId/id-config-status', configStatusMiddleware);

  // OIDC Authenticate
  app.get(
    '/:tenantId/:applicationId/auth',
    authRequestExtractor,
    idpConfigValidatorMiddleware,
    idpAuthMiddleware,
  );

  // OIDC Authenticate Callback
  app.get(
    '/:tenantId/:applicationId/auth/callback',
    authCallbackRequestExtractor,
    idpAuthCallbackMiddleware,
  );

  // Access Token Retrieval
  app.get(
    '/:tenantId/:applicationId/token',
    tokenRequestExtractor,
    idpTokenMiddleware,
  );

  // Logout user
  app.get('/:tenantId/:applicationId/logout', logoutUserMiddleware);

  // well-known configuration
  app.get('/.well-known/:configKey?', wellKnownConfigMiddleware);
};
