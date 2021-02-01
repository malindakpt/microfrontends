import {
  ErrorCode,
  getAuthenticationContext,
  setupJWTProcessingMiddleware,
} from '@ax/id-guard';
import { Express, NextFunction, Request, Response } from 'express';
import { getIntrospectionQuery, parse, print } from 'graphql';
import { resolve } from 'path';

import { Logger } from '../../../common';

const logger = new Logger('auth-middleware');

function introspectionGuard(introspectionQuery: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.path === '/' && req.body.query) {
        const introspectionQueryReq = print(parse(req.body.query));

        if (introspectionQueryReq === introspectionQuery) {
          // Enable 'isIntrospectionQueryProtected' to enforce authentication to do GraphQL Introspection
          const isIntrospectionQueryProtected = false;

          const { user } = getAuthenticationContext(req);
          if (isIntrospectionQueryProtected && !user) {
            res.status(401).send({
              code: ErrorCode.AccessTokenRequired,
              message: 'Access Token required for introspection document',
            });

            return;
          }
        }
      }
    } catch (err) {
      logger.error(err);
    }

    next();
  };
}

export const setupAuthentication = (
  app: Express,
  graphQlMountPoint: string,
): void => {
  setupJWTProcessingMiddleware(
    app,
    graphQlMountPoint,
    resolve(__dirname, '../../../../keys/public.key'),
  );

  const introspectionQuery = print(parse(getIntrospectionQuery()));
  app.use(graphQlMountPoint, introspectionGuard(introspectionQuery));
};
