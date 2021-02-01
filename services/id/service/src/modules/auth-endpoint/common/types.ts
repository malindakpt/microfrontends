import { Client } from 'openid-client';

export type AuthContext = {
  state: string;
  nonce: string;
  authClient: Client;
  codeVerifier: string;
  redirectUrl: string;
  originUrl: string;
  idpConfig: ApplicationIdpConfig;
};

export type ApplicationIdpConfig = {
  interimAdministratorEmail: string;
  clientId: string;
  clientSecret: string;
  scopes: string;
  discoveryDocumentUrl: string;
};
