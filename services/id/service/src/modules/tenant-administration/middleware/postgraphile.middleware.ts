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
import {
  AtomicMutationRequest,
  AtomicMutationsPlugin,
  getMutationAtomicityContext,
} from 'postgraphile-plugin-atomic-mutations';
import * as ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter';

import { Config, config, Logger } from '../../../common';
import { handleErrors } from '../../../common/errors';
import CustomSchemaExtentionsPlugin from '../graphile-plugins/extenders/custom-schema-extentions-plugin';
import { GenerateTenantAdminPasswordPlugin } from '../graphile-plugins/extenders/generate-password';
import { ModuleSmartTagsPlugin } from '../graphile-plugins/taggers';
import { ValidateTenantAdminPlugin } from '../graphile-plugins/wrappers/validate-tenant-admin';
import { EndpointsToPermissionMappings } from '../security';

const logger = new Logger('postgraphile-middleware');

const getPostGraphileOptions = (
  config: Config,
  dbOwnerPool: Pool,
): PostGraphileOptions<Request, Response> => {
  const options: PostGraphileOptions<Request, Response> = {
    dynamicJson: true,
    appendPlugins: [
      ConnectionFilterPlugin,
      PgSimplifyInflectorPlugin,
      ModuleSmartTagsPlugin,
      CustomSchemaExtentionsPlugin, // Schema extender to be used to introduce any new mutations or queries
      GenerateTenantAdminPasswordPlugin,
      ValidateTenantAdminPlugin,
      // These three always needs to be the last.
      AxGuardPlugin,
      EnforceStrictPermissionsPlugin, // This will omit any endpoints currently not having any permission mappings for it
      AtomicMutationsPlugin, // This will make multiple mutations in the same request behave as atomic
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
        mutationAtomicityContext: getMutationAtomicityContext(req, true),
      } as ExtendedGraphQLContext;
      return context;
    },
    async pgSettings(req) {
      const { user } = getAuthenticationContext(req);

      return {
        // Each GraphQL Request will run on the DB as dbPgWebUser
        role: config.dbPgWebUser,
        'axinom.auth.user': user?.sub,
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
    options.exportGqlSchemaPath = './src/generated/tenant-admin-schema.graphql';
    options.graphiql = true;
    options.enhanceGraphiql = true;
    options.watchPg = true;
    options.ownerConnectionString = config.dbOwnerConnectionString();
  }

  return options;
};

export interface ExtendedGraphQLContext
  extends IAuthenticationRequestContext,
    AtomicMutationRequest {
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

  const options = getPostGraphileOptions(config, dbOwnerPool);
  const middleware = postgraphile(
    config.dbPgConnectionString(),
    ['tenant_administration'],
    options,
  );
  app.use(middleware);
};
