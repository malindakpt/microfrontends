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
  setupOwnerPgPool,
  ValidationDirectivesPlugin,
} from '@ax/service-common';
import * as PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import PgPubsub from '@graphile/pg-pubsub';
import { Express, Request, Response } from 'express';
import {
  enhanceHttpServerWithSubscriptions,
  makePluginHook,
  Middleware,
  postgraphile,
  PostGraphileOptions,
} from 'postgraphile';
import {
  AtomicMutationsPlugin,
  getMutationAtomicityContext,
} from 'postgraphile-plugin-atomic-mutations';
import * as ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter';

import { Config, config, handleErrors, Logger } from '../common';
import {
  PopulateCollectionsEndpointPlugin,
  PopulateMoviesEndpointPlugin,
  PopulateTvshowsEndpointPlugin,
  SubscriptionsPlugin,
} from '../plugins';
import { EndpointsToPermissionMappings } from '../security';

const pluginHook = makePluginHook([
  // Add the pub/sub realtime provider
  PgPubsub,
]);

export const getPostGraphileOptions = (
  config: Config,
  websocketMiddlewares: Middleware<Request, Response>[] = [],
  app: Express = null,
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
      // These three always needs to be the last.
      AxGuardPlugin,
      EnforceStrictPermissionsPlugin,
      // some plugins are pushed also further down for dev only/at the end...
    ],
    graphileBuildOptions: {
      connectionFilterRelations: true,
      serviceId: config.serviceId,
      permissionMappings: EndpointsToPermissionMappings,
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
        'ax.claims.username': user?.sub || 'Anonymous',
        'ax.claims.permissions': 'ADMIN', //TODO: Adjust when login functionality is implemented
      };
    },
    async additionalGraphQLContextFromRequest(req) {
      const { user, authErrorInfo } = getAuthenticationContext(req);

      // TODO: check if we can use strong typing for the context everywhere
      return {
        authErrorInfo,
        user,
        mutationAtomicityContext: getMutationAtomicityContext(req, true),
      };
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

    setupOwnerPgPool(app, config.dbOwnerConnectionString());
    const ownerPool = getOwnerPgPool(app);

    options.appendPlugins.push(PopulateMoviesEndpointPlugin);
    options.appendPlugins.push(PopulateTvshowsEndpointPlugin);
    options.appendPlugins.push(PopulateCollectionsEndpointPlugin);

    const originalContextFunction = options.additionalGraphQLContextFromRequest;
    options.additionalGraphQLContextFromRequest = async (req, res) => {
      const originalContext = await originalContextFunction(req, res);
      return {
        ownerPool,
        ...originalContext,
      };
    };
  }

  options.appendPlugins.push(AnnotateTypesWithPermissionsPlugin);
  options.appendPlugins.push(AtomicMutationsPlugin); // This will make multiple mutations in the same request behave as atomic

  return options;
};

export const setupPostGraphile = async (app: Express): Promise<void> => {
  const webSocketsMiddleware = getWebsocketMiddlewares(app);
  const options = getPostGraphileOptions(config, webSocketsMiddleware, app);
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
