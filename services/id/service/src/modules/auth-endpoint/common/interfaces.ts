import { Request } from 'express';

import { AuthContext, ApplicationIdpConfig } from './types';

export interface AuthRequest extends Request {
  authReqestParams: AuthRequestParams;
  authReqestCallbackParams: AuthRequestCallbackParams;
  tokenRequestParams: TokenRequestParams;
  idpConfig: ApplicationIdpConfig;
}

export interface AuthRequestParams {
  tenantId: string;
  applicationId: string;
  providerId: string;
  originUrl: string;
}

export interface AuthRequestCallbackParams {
  tenantId: string;
  applicationId: string;
  providerId: string;
  authContext: AuthContext;
  authorizationCode: string;
}

export interface TokenRequestParams {
  tenantId: string;
  applicationId: string;
  axinomIamToken: string;
}
