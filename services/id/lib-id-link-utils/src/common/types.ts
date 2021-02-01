import { User } from '@ax/core';

import {
  IdentityProvider,
  ConfigStatusResponseCode,
  LogoutResponseCode,
  TokenResponseCode,
} from './enums';

// Used by id-link to get IDP configuration info
export type IdentityProviderInfo = {
  idpId: IdentityProvider;
  title: string;
  enabled: boolean;
};

// Used by id-link to get new access token
export type TokenResponse = {
  code: TokenResponseCode;
  message?: string;
  user?: User;
};

// Used by id-link to get logout status
export type LogoutResponse = {
  code: LogoutResponseCode;
  message?: string;
};

// Used by id-link to get tenant & application status with idp configurations
export type ConfigStatusResponse = {
  code: ConfigStatusResponseCode;
  tenantId: string;
  applicationId: string;
  enabledIdentityProviders: IdentityProvider[];
};

// Used by Host Application to set id-service configuration
export type IdentityServiceConfig = {
  idServiceAuthEndpointUrl: string;
  tenantId: string;
  applicationId: string;
};
