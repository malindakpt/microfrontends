import React from 'react';
import { UserToken } from '@ax/id-link-utils';
import { useIdentityService } from '../IdentityServiceProvider/IdentityServiceProvider';
import { PermissionDeniedError } from '../PermissionDeniedError/PermissionDeniedError';

export type UserPermissions = UserToken['permissions'];

export interface EnsurePermissionProps {
  /** The required permissions. */
  permissions: UserPermissions;
  /** The component shown when permissions are insufficient. */
  denied?: React.ReactNode;
}

/**
 * Renders the children only if the current user has the required permissions.
 * The component that will be shown when the permissions are insufficient can be defined through the `denied` prop.
 */
export const EnsurePermission: React.FC<EnsurePermissionProps> = ({
  children,
  permissions,
  denied,
}) => {
  if (useHasPermissions(permissions)) {
    return <>{children}</>;
  } else {
    return denied ? <>{denied}</> : <PermissionDeniedError />;
  }
};

/**
 * Checks whether the current user has the permissions specified as `requiredPermissions`.
 * @param requiredPermissions The required permissions.
 */
export const useHasPermissions = async (
  requiredPermissions: UserPermissions,
): Promise<boolean> => {
  const { getToken } = useIdentityService();

  const { user } = await getToken();
  if (!user) {
    return false;
  }
  const currentPermissions = user.token.permissions;

  return checkPermissions(requiredPermissions, currentPermissions);
};

/**
 * Checks whether the `requiredPermissions` are satisfied by the `currentPermissions` or not.
 * @param requiredPermissions The required permissions.
 * @param currentPermissions The current permissions of the user.
 */
export const checkPermissions = (
  requiredPermissions: UserPermissions,
  currentPermissions: UserPermissions,
): boolean => {
  const services = Object.keys(requiredPermissions);
  for (const service in services) {
    const serviceName = services[service];
    if (!currentPermissions[serviceName]) {
      return false;
    } else {
      for (const permission in requiredPermissions[serviceName]) {
        const permissionName = requiredPermissions[serviceName][permission];
        if (currentPermissions[serviceName].indexOf(permissionName) === -1) {
          return false;
        }
      }
    }
  }

  return true;
};
