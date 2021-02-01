import { Endpoints as EP } from './endpoints';

// Edit this block to define the Permission -> EndPoint mapping as desired.
// Any endpoints not mapped to at least one permission, will be automatically excluded from the published GraphQL API.
export const EndpointsToPermissionMappings = {
  // This is a special permission.
  // If the permission name is called "ANONYMOUS", any endpoints mapped here will not be checked for authorization rules
  ANONYMOUS: [EP.authenticateSuperUser],

  TENANT_QUERY: [EP.tenant, EP.tenants],
  TENANT_MUTATE: [EP.createTenant, EP.updateTenant, EP.deleteTenant],
  TENANT_ADMIN_QUERY: [EP.tenantAdmin, EP.tenantAdmins],
  TENANT_ADMIN_MUTATE: [
    EP.createTenantAdmin,
    EP.updateTenantAdmin,
    EP.deleteTenantAdmin,
    EP.generateTenantAdminPassword,
  ],
};
