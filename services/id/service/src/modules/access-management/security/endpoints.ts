/* Autogenerated section below, manual changes done here will be lost */
// TODO: Implement autogeneration logic :)

export enum Endpoints {
  // User
  user = 'user',
  users = 'users',
  createUser = 'createUser',
  updateUser = 'updateUser',
  deleteUser = 'deleteUser',

  // UserRole
  userRole = 'userRole',
  userRoles = 'userRoles',
  createUserRole = 'createUserRole',
  updateUserRole = 'updateUserRole',
  deleteUserRole = 'deleteUserRole',

  // Permission
  permission = 'permission',
  permissions = 'permissions',
  synchronizePermissions = 'synchronizePermissions',

  // ServiceAccount
  serviceAccount = 'serviceAccount',
  serviceAccounts = 'serviceAccounts',
  createServiceAccount = 'createServiceAccount',
  updateServiceAccount = 'updateServiceAccount',
  deleteServiceAccount = 'deleteServiceAccount',
  generateServiceAccountSecret = 'generateServiceAccountSecret',
  authenticateServiceAccount = 'authenticateServiceAccount',
  authenticateManagedServiceAccount = 'authenticateManagedServiceAccount',

  // Tag
  tag = 'tag',
  tags = 'tags',
  createTag = 'createTag',
  updateTag = 'updateTag',
  deleteTag = 'deleteTag',

  // UserRoleAssignment
  userRoleAssignment = 'userRoleAssignment',
  userRoleAssignments = 'userRoleAssignments',
  createUserRoleAssignment = 'createUserRoleAssignment',
  deleteUserRoleAssignment = 'deleteUserRoleAssignment',

  // UserRoleParentAssignment
  userRoleParentAssignment = 'userRoleParentAssignment',
  userRoleParentAssignments = 'userRoleParentAssignments',
  createUserRoleParentAssignment = 'createUserRoleParentAssignment',
  deleteUserRoleParentAssignment = 'deleteUserRoleParentAssignment',

  // UserRolePermissionAssignment
  userRolePermissionAssignment = 'userRolePermissionAssignment',
  userRolePermissionAssignments = 'userRolePermissionAssignments',
  createUserRolePermissionAssignment = 'createUserRolePermissionAssignment',
  deleteUserRolePermissionAssignment = 'deleteUserRolePermissionAssignment',

  // UserRoleTagAssignment
  userRoleTagAssignment = 'userRoleTagAssignment',
  userRoleTagAssignments = 'userRoleTagAssignments',
  createUserRoleTagAssignment = 'createUserRoleTagAssignment',
  deleteUserRoleTagAssignment = 'deleteUserRoleTagAssignment',

  // ServiceAccountPermissionAssignment
  serviceAccountPermissionAssignment = 'serviceAccountPermissionAssignment',
  serviceAccountPermissionAssignments = 'serviceAccountPermissionAssignments',
  createServiceAccountPermissionAssignment = 'createServiceAccountPermissionAssignment',
  deleteServiceAccountPermissionAssignment = 'deleteServiceAccountPermissionAssignment',

  // Dev Only Endpoints
  // eslint-disable-next-line @typescript-eslint/camelcase
  _DEV_setupIdBasicData = '_DEV_setupIdBasicData',
  // eslint-disable-next-line @typescript-eslint/camelcase
  _DEV_createServiceAccount = '_DEV_createServiceAccount',
  // eslint-disable-next-line @typescript-eslint/camelcase
  _DEV_generateUserAccessToken = '_DEV_generateUserAccessToken',
}