import { IdentityServiceConfig } from '@ax/id-link';

export const identityServiceConfig: IdentityServiceConfig = {
  idServiceAuthEndpointUrl:
    process.env.REACT_APP_AUTH_ENDPOINT || 'MISSING_AUTH_ENDPOINT',
  tenantId: process.env.REACT_APP_TENANT_ID || 'MISSING_TENANT_ID',
  applicationId:
    process.env.REACT_APP_APPLICATION_ID || 'MISSING_APPLICATION_ID',
};
