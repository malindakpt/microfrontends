import { config, Logger } from '../../../common';
import {
  SyncPermissionsMutation,
  SyncPermissionsMutationVariables,
  SyncPermissionsDocument,
} from '../../../generated/graphql.types';
import { EndpointsToPermissionMappings } from './endpoints-to-permission.mappings';
import { gqlClient } from '../gql-client/gql-client';

const logger = new Logger('access-management-id-service-sync');

export const synchronizePermissions = async (): Promise<void> => {
  const permissions = Object.keys(EndpointsToPermissionMappings).filter(
    permission => permission !== 'ANONYMOUS',
  );

  const permissionSyncResults = await gqlClient(
    `http://localhost:${config.accessManagementPort}/graphql`,
  ).mutate<SyncPermissionsMutation, SyncPermissionsMutationVariables>({
    mutation: SyncPermissionsDocument,
    variables: {
      input: {
        serviceId: config.serviceId,
        permissions,
      },
    },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  });

  if (permissionSyncResults.errors) {
    logger.log(permissionSyncResults.errors);
  } else {
    logger.log({
      message: `Synchronized permissions for ${config.serviceId}`,
      ...permissionSyncResults.data.synchronizePermissions,
    });
  }
};
