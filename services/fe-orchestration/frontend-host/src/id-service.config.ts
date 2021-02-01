import { IdentityServiceConfig } from '@ax/id-link';

export const identityServiceConfig: IdentityServiceConfig = {
  idServiceAuthEndpointUrl:
    process.env.ID_AUTH_ENDPOINT || 'MISSING_AUTH_ENDPOINT',
  tenantId: process.env.ID_TENANT_ID || 'MISSING_TENANT_ID',
  applicationId: process.env.ID_APPLICATION_ID || 'MISSING_APPLICATION_ID',
};
