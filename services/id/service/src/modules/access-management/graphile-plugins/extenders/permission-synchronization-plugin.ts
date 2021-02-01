import { makeExtendSchemaPlugin, gql } from 'graphile-utils';
import { handledError } from '../../../../common/errors';

//this plugin adds a custom mutation to synchronize permissions from other services
const PermissionSynchronizationPlugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      input SynchronizePermissionsInput {
        serviceId: String!
        permissions: [String]!
      }

      type SynchronizePermissionsPayload {
        added: [String]
        removed: [String]
      }

      extend type Mutation {
        """
        Synchronizes permissions from other services.
        """
        synchronizePermissions(
          input: SynchronizePermissionsInput!
        ): SynchronizePermissionsPayload
      }
    `,
    resolvers: {
      Mutation: {
        synchronizePermissions: async (query, args, context) => {
          const { pgClient, dbOwnerPool, user } = context;

          //get a list of current permissions for the service
          const { rows } = await pgClient.query(
            `SELECT name
               FROM access_management.permission
               WHERE service_id = $1`,
            [args.input.serviceId],
          );
          const currentPermissions = rows.map(row => row.name);

          //sync permissions
          const permissionsToAdd = args.input.permissions.filter(permission => {
            return !currentPermissions.includes(permission);
          });

          const {
            rows: [rootApplication],
          } = await dbOwnerPool.query(
            `SELECT id, tenant_id
              FROM application_administration.application
              WHERE is_root = TRUE`,
          );

          const fromManagedService =
            user.tenantId === rootApplication.tenant_id &&
            user.applicationId === rootApplication.id;

          permissionsToAdd.forEach(async newPermission => {
            try {
              await pgClient.query(
                `INSERT INTO access_management.permission (service_id, name, from_managed_service) VALUES ($1, $2, $3)`,
                [args.input.serviceId, newPermission, fromManagedService],
              );
            } catch (e) {
              return handledError(e.message);
            }
          });

          const permissionsToRemove = currentPermissions.filter(permission => {
            return !args.input.permissions.includes(permission);
          });

          if (permissionsToRemove.length > 0) {
            try {
              await pgClient.query(
                `DELETE FROM access_management.permission WHERE service_id = $1 AND name = ANY ($2)`,
                [args.input.serviceId, permissionsToRemove],
              );
            } catch (e) {
              return handledError(e.message);
            }
          }

          return {
            added: permissionsToAdd,
            removed: permissionsToRemove,
          };
        },
      },
    },
  };
});

export default PermissionSynchronizationPlugin;
