import { Endpoints as EP } from './endpoints';

// Edit this block to define the Permission -> EndPoint mapping as desired.
// Any endpoints not mapped to at least one permission, will be automatically excluded from the published GraphQL API.
export const EndpointsToPermissionMappings = {
  // This is a special permission.
  // If the permission name is called "ANONYMOUS", any endpoints mapped here will not be checked for authorization rules
  ANONYMOUS: [
    EP.authenticateServiceAccount,
    EP.authenticateManagedServiceAccount,

    // Dev Only Endpoints
    EP._DEV_setupIdBasicData,
    EP._DEV_createServiceAccount,
    EP._DEV_generateUserAccessToken,
  ],

  USER_QUERY: [EP.user, EP.users],
  USER_MUTATE: [EP.createUser, EP.updateUser, EP.deleteUser],

  USER_ROLE_QUERY: [EP.userRole, EP.userRoles],
  USER_ROLE_MUTATE: [EP.createUserRole, EP.updateUserRole, EP.deleteUserRole],

  PERMISSION_QUERY: [EP.permission, EP.permissions],
  SYNCHRONIZE_PERMISSIONS: [EP.synchronizePermissions],

  SERVICE_ACCOUNT_QUERY: [EP.serviceAccount, EP.serviceAccounts],
  SERVICE_ACCOUNT_MUTATE: [
    EP.createServiceAccount,
    EP.updateServiceAccount,
    EP.deleteServiceAccount,
    EP.generateServiceAccountSecret,
  ],

  TAG_QUERY: [EP.tag, EP.tags],
  TAG_MUTATE: [EP.createTag, EP.updateTag, EP.deleteTag],

  USER_ROLE_ASSIGNMENT_QUERY: [EP.userRoleAssignment, EP.userRoleAssignments],
  USER_ROLE_ASSIGNMENT_MUTATE: [
    EP.createUserRoleAssignment,
    EP.deleteUserRoleAssignment,
  ],

  USER_ROLE_PARENT_ASSIGNMENT_QUERY: [
    EP.userRoleParentAssignment,
    EP.userRoleParentAssignments,
  ],
  USER_ROLE_PARENT_ASSIGNMENT_MUTATE: [
    EP.createUserRoleParentAssignment,
    EP.deleteUserRoleParentAssignment,
  ],

  USER_ROLE_PERMISSION_ASSIGNMENT_QUERY: [
    EP.userRolePermissionAssignment,
    EP.userRolePermissionAssignments,
  ],
  USER_ROLE_PERMISSION_ASSIGNMENT_MUTATE: [
    EP.createUserRolePermissionAssignment,
    EP.deleteUserRolePermissionAssignment,
  ],

  USER_ROLE_TAG_ASSIGNMENT_QUERY: [
    EP.userRoleTagAssignment,
    EP.userRoleTagAssignments,
  ],
  USER_ROLE_TAG_ASSIGNMENT_MUTATE: [
    EP.createUserRoleTagAssignment,
    EP.deleteUserRoleTagAssignment,
  ],

  SERVICE_ACCOUNT_PERMISSION_ASSIGNMENT_QUERY: [
    EP.serviceAccountPermissionAssignment,
    EP.serviceAccountPermissionAssignments,
  ],
  SERVICE_ACCOUNT_PERMISSION_ASSIGNMENT_MUTATE: [
    EP.createServiceAccountPermissionAssignment,
    EP.deleteServiceAccountPermissionAssignment,
  ],
};
