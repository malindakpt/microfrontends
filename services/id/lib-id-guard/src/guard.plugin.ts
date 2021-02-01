import { makeWrapResolversPlugin } from 'graphile-utils';

import {
  axGuardError,
  AxGuardErrorInfo,
  ErrorCode,
  ErrorMessage,
  getPermissionsForEndpoint,
  IAuthenticatedUser,
  IAuthenticationRequestContext,
  IEndpointsToPermissionMappings,
} from './common';

export interface AxGuardOptions {
  endpoint: string;
  serviceId: string;
  permissionMappings: IEndpointsToPermissionMappings;
}

const isUserAuthorized = (
  user: IAuthenticatedUser,
  options: AxGuardOptions,
  errorInfo?: AxGuardErrorInfo,
): boolean => {
  const { serviceId, permissionMappings, endpoint } = options;
  const isAnonymousEndpoint = permissionMappings.ANONYMOUS.includes(endpoint);

  if (isAnonymousEndpoint) {
    return true;
  }

  // Error occurred and handled while extracting user information from JWT token
  if (!user) {
    const { originalError, message, ...details } = errorInfo;
    throw axGuardError(originalError, details, message);
  }

  // Not authorized to use this endpoint
  if (serviceId in user.permissions) {
    const grantedPermissions = user.permissions[serviceId];

    const requiredPermissions = getPermissionsForEndpoint(
      endpoint,
      permissionMappings,
    );
    return grantedPermissions.some(permission =>
      requiredPermissions.includes(permission),
    );
  }

  // Not authorized to use this service
  return false;
};

export const AxGuardPlugin = makeWrapResolversPlugin(
  ({ scope }, build, config, { serviceId, permissionMappings }) => {
    const endpointCanBeProtected =
      scope.fieldName !== 'query' &&
      (scope.isRootQuery ||
        scope.isRootMutation ||
        scope.isPgForwardRelationField ||
        scope.isPgBackwardRelationField);

    if (endpointCanBeProtected) {
      return { endpoint: scope.fieldName, serviceId, permissionMappings };
    }

    return null;
  },
  (options: AxGuardOptions) => async (
    resolver,
    source,
    args,
    context,
    resolveInfo,
  ) => {
    const { authErrorInfo, user } = context as IAuthenticationRequestContext;

    if (isUserAuthorized(user, options, authErrorInfo)) {
      return resolver(source, args, context, resolveInfo);
    } else {
      throw axGuardError(
        {
          code: ErrorCode.UserNotAuthorized,
          details: {
            user: user.sub,
            serviceId: options.serviceId,
          },
        },
        ErrorMessage.UserNotAuthorized,
      );
    }
  },
);
