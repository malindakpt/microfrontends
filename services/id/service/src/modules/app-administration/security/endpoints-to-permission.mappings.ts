import { Endpoints as EP } from './endpoints';

// Edit this block to define the Permission -> EndPoint mapping as desired.
// Any endpoints not mapped to atleast one permission, will be automatically excluded from the published GraphQL API.
export const EndpointsToPermissionMappings = {
  // This is a special permission.
  // If the permission name is called "ANONYMOUS", any endpoints mapped here will not be checked for authroization rules
  ANONYMOUS: [EP.authenticateTenantAdmin],

  APPLICATION_QUERY: [EP.application, EP.applications],
  APPLICATION_MUTATE: [
    EP.createApplication,
    EP.updateApplication,
    EP.deleteApplication,
  ],

  IDP_CONFIGURATION_QUERY: [EP.idpConfiguration, EP.idpConfigurations],
  IDP_CONFIGURATION_MUTATE: [
    EP.createIdpConfiguration,
    EP.updateIdpConfiguration,
    EP.deleteIdpConfiguration,
  ],

  IDP_SCOPE_QUERY: [EP.idpScope, EP.idpScopes],

  CHANGE_OWN_PASSWORD: [EP.changeTenantAdminPassword],
};
