import { setupJWTProcessingMiddleware } from '@ax/id-guard';
import {
  setupHttpServerWithWebsockets,
  setupOwnerPgPool,
  setupShutdownActions,
} from '@ax/service-common';
import * as express from 'express';
import { resolve } from 'path';

import { config, ErrorCode, Logger, validateConfig } from './common';
import { setupPostGraphile } from './middleware';
import { applyMigrations } from './migrations';
import { registerReceivers } from './vip';

const logger = new Logger(config, 'bootstrap');

async function bootstrap(): Promise<void> {
  const app = express();
  const httpServer = setupHttpServerWithWebsockets(app);

  await validateConfig(config);
  await applyMigrations();
  setupShutdownActions(app);
  setupOwnerPgPool(app, config.dbOwnerConnectionString());
  setupJWTProcessingMiddleware(
    app,
    '/graphql',
    resolve(__dirname, '../keys/public.key'),
  );
  await setupPostGraphile(app);
  registerReceivers(app);

  httpServer.addListener('request', app);

  httpServer.listen(config.port, () => {
    if (config.isDev()) {
      logger.log(`http://localhost:${config.port}/graphiql`);
    }
  });
}

bootstrap().catch(error => {
  logger.error(error, { code: ErrorCode.StartupError });
  process.exit(-1);
});
