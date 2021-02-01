import {
  AxGuardPlugin,
  EnforceStrictPermissionsPlugin,
  getAuthenticationContext,
  LogType,
} from '@ax/id-guard';
import {
  AnnotateTypesWithPermissionsPlugin,
  getHttpServer,
  getOwnerPgPool,
  getWebsocketMiddlewares,
  ValidationDirectivesPlugin,
} from '@ax/service-common';
import * as PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import PgPubsub from '@graphile/pg-pubsub';
import { Express, Request, Response } from 'express';
import { Pool } from 'pg';
import {
  enhanceHttpServerWithSubscriptions,
  makePluginHook,
  Middleware,
  postgraphile,
  PostGraphileOptions,
} from 'postgraphile';
import * as ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter';

import { Config, config, handleErrors, Logger } from '../common';
import {
  OverallProgressPlugin,
  PopulateVideosEndpointPlugin,
  SourceVideosEndpointPlugin,
  StartVipJobEndpointPlugin,
  SubscriptionsPlugin,
} from '../plugins';
import { EndpointsToPermissionMappings } from '../security';

const pluginHook = makePluginHook([
  // Add the pub/sub realtime provider
  PgPubsub,
]);

export const getPostGraphileOptions = (
  config: Config,
  ownerPool: Pool,
  websocketMiddlewares: Middleware<Request, Response>[] = [],
): PostGraphileOptions<Request, Response> => {
  const options: PostGraphileOptions<Request, Response> = {
    graphiql: true, //todo: DEV
    enhanceGraphiql: true, //todo: DEV
    enableCors: true,
    dynamicJson: true,
    ownerConnectionString: config.dbOwnerConnectionString(), //required for CheckForCustomEndpointAuthPlugin
    pluginHook, // This is for PostGraphile server plugins: https://www.graphile.org/postgraphile/plugins/
    // Add websocket support to the PostGraphile server
    subscriptions: true,
    websocketMiddlewares,
    appendPlugins: [
      SubscriptionsPlugin,
      ValidationDirectivesPlugin,
      ConnectionFilterPlugin,
      PgSimplifyInflectorPlugin,
      SourceVideosEndpointPlugin,
      StartVipJobEndpointPlugin,
      OverallProgressPlugin,
      AxGuardPlugin,
      EnforceStrictPermissionsPlugin,
      // some plugins are pushed also further down for dev only/at the end...
    ],
    graphileBuildOptions: {
      connectionFilterRelations: true,
      serviceId: config.serviceId,
      permissionMappings: EndpointsToPermissionMappings,
      vipJobUrl: config.vipJobUrl,
      vipAuthHeader: config.vipAuthHeader,
      vipServiceBusConnection: config.vipServiceBusSenderConnection,
      logger: (log, type) => {
        const logger = new Logger(config, 'EnforceStrictPermissionsPlugin');

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
    handleErrors: errors => {
      return handleErrors(config, errors);
    },
    async pgSettings(req) {
      const { user } = getAuthenticationContext(req);
      return {
        // Everyone uses the "visitor" role currently
        role: config.dbVisitorName,
        'ax.claims.username': user?.name || 'Anonymous',
        'ax.claims.permissions': 'ADMIN', //TODO: Adjust when login functionality is implemented
      };
    },
    async additionalGraphQLContextFromRequest(req) {
      const { user, authErrorInfo } = getAuthenticationContext(req);
      return { user, authErrorInfo, ownerPool };
    },
    skipPlugins: [
      //NodePlugin, // removes some nodeId and byNodeId endpoints, but still leaves support for cursor pagination
      //MutationPayloadQueryPlugin,
    ],
    allowExplain: () => true,
    //disableQueryLog: true, //TODO: Move to config
  };

  if (config.isDev()) {
    options.exportGqlSchemaPath = './src/generated/schema.graphql';

    options.watchPg = true; //TODO: Move to config

    options.appendPlugins.push(PopulateVideosEndpointPlugin);
  }

  options.appendPlugins.push(AnnotateTypesWithPermissionsPlugin);

  return options;
};

export const setupPostGraphile = async (app: Express): Promise<void> => {
  const webSocketsMiddleware = getWebsocketMiddlewares(app);
  const ownerPool = getOwnerPgPool(app);
  const options = getPostGraphileOptions(
    config,
    ownerPool,
    webSocketsMiddleware,
  );
  const middleware = postgraphile(
    config.dbAuthConnectionString(),
    'app_public',
    options,
  );
  app.use(middleware);

  const httpServer = getHttpServer(app);
  if (httpServer) {
    await enhanceHttpServerWithSubscriptions(httpServer, middleware);
  }
};
