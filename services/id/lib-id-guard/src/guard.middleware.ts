import { Express, json, NextFunction, Request, Response } from 'express';
import * as bearerTokenExtractor from 'express-bearer-token';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

import {
  ErrorCode,
  ErrorMessage,
  IAuthenticatedUser,
  IAuthenticationRequestContext,
} from './common';

const jwtParser = (publicKeyPath: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let code: ErrorCode;
    let message: string;
    let originalError: Error;

    try {
      if (req.token) {
        // throws token invalid when file is not found. Temporary implementation, acceptable.
        const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

        const decoded = jwt.verify(req.token, publicKey, {
          algorithms: ['RS256'],
        });

        (req as IAuthenticationRequestContext).user = decoded as IAuthenticatedUser;
      } else {
        code = ErrorCode.AccessTokenRequired;
        message = ErrorMessage.AccessTokenRequired;
      }
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        code = ErrorCode.AccessTokenExpired;
        message = ErrorMessage.AccessTokenExpired;
        originalError = err;
      } else {
        code = ErrorCode.AccessTokenInvalid;
        message = ErrorMessage.AccessTokenInvalid;
        originalError = err;
      }
    } finally {
      (req as IAuthenticationRequestContext).authErrorInfo = {
        code,
        message,
        originalError,
      };
      next();
    }
  };
};

export const setupJWTProcessingMiddleware = (
  app: Express,
  graphQlMountPoint: string,
  publicKeyPath: string,
): void => {
  app.use(
    graphQlMountPoint,
    bearerTokenExtractor(),
    jwtParser(publicKeyPath),
    json(),
  );
};
