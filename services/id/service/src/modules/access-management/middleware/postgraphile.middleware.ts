import {
  AxGuardPlugin,
  EnforceStrictPermissionsPlugin,
  getAuthenticationContext,
  IAuthenticationRequestContext,
  LogType,
} from '@ax/id-guard';
import * as PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import { Express, Request, Response } from 'express';
import { MutationPayloadQueryPlugin, NodePlugin } from 'graphile-build';
import { Pool } from 'pg';
import { postgraphile, PostGraphileOptions } from 'postgraphile';
import * as ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter';

import { config, Logger } from '../../../common';
import { handleErrors } from '../../../common/errors';
import {
  DevIntegrationUtilsPlugin,
  ServiceAccountSecretGeneratorPlugin,
} from '../graphile-plugins/extenders';
import PermissionSynchronizationPlugin from '../graphile-plugins/extenders/permission-synchronization-plugin';
import ServiceAccountAuthenticationPlugin from '../graphile-plugins/extenders/service-account-authentication-plugin';
import { ModuleSmartTagsPlugin } from '../graphile-plugins/taggers';
import { EndpointsToPermissionMappings } from '../security';

const logger = new Logger('postgraphile-middleware');

const getPostGraphileOptions = (
  dbOwnerPool: Pool,
): PostGraphileOptions<Request, Response> => {
  const options: PostGraphileOptions<Request, Response> = {
    dynamicJson: true,
    appendPlugins: [
      ConnectionFilterPlugin,
      PgSimplifyInflectorPlugin,
      ModuleSmartTagsPlugin,
      PermissionSynchronizationPlugin,
      ServiceAccountSecretGeneratorPlugin,
      ServiceAccountAuthenticationPlugin,
      // These two always needs to be the last. TODO: Investigate option to append plugins always at the end.
      AxGuardPlugin,
      EnforceStrictPermissionsPlugin, // This will omit any endpoints currently not having any permission mappings for it
    ],
    graphileBuildOptions: {
      connectionFilterRelations: true,
      serviceId: config.serviceId,
      permissionMappings: EndpointsToPermissionMappings,
      logger: (log, type) => {
        switch (type) {
          case LogType.StrictPermissionWarning:
            logger.warn(log);
            break;

          default:
            logger.log(log);
            break;
        }
      },
    },
    ignoreRBAC: false,
    legacyRelations: 'omit',
    handleErrors,
    async additionalGraphQLContextFromRequest(req) {
      const { user, authErrorInfo } = getAuthenticationContext(req);
      const context = {
        authErrorInfo,
        user,
        dbOwnerPool,
        getRequestHeader(name: string) {
          return req.get(name);
        },
      } as ExtendedGraphQLContext;
      return context;
    },
    async pgSettings(req) {
      const { user } = getAuthenticationContext(req);

      return {
        // Each GraphQL Request will run on the DB as dbPgWebUser
        role: config.dbPgWebUser,
        'axinom.auth.user': user?.sub,
        'axinom.auth.tenantId': user?.tenantId,
        'axinom.auth.applicationId': user?.applicationId,
      };
    },
    skipPlugins: [
      NodePlugin, // removes some nodeId and byNodeId endpoints, but still leaves support for cursor pagination
      MutationPayloadQueryPlugin, // removes the 'query' endpoint from Mutations by default
    ],
    allowExplain: () => true,
    disableQueryLog: true,
    enableCors: true,
  };

  if (config.isDev()) {
    options.exportGqlSchemaPath =
      './src/generated/access-management-schema.graphql';
    options.appendPlugins.unshift(DevIntegrationUtilsPlugin);
    options.graphiql = true;
    options.enhanceGraphiql = true;
    options.watchPg = true;
    options.ownerConnectionString = config.dbOwnerConnectionString();
  }

  return options;
};

export interface ExtendedGraphQLContext extends IAuthenticationRequestContext {
  dbOwnerPool: Pool;
  getRequestHeader: (name: string) => string;
}

function handlePoolErrors(error: Error): void {
  logger.error(error);
}

export const setupPostGraphile = (app: Express): void => {
  const dbOwnerPool = new Pool({
    connectionString: config.dbOwnerConnectionString(),
  });
  dbOwnerPool.on('error', handlePoolErrors);

  const options = getPostGraphileOptions(dbOwnerPool);
  const middleware = postgraphile(
    config.dbPgConnectionString(),
    ['access_management'],
    options,
  );
  app.use(middleware);
};
