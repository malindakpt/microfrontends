import { setupJWTProcessingMiddleware } from '@ax/id-guard';
import {
  JSONify,
  setupShutdownActions,
  setupHttpServerWithWebsockets,
} from '@ax/service-common';
import * as express from 'express';
import { resolve } from 'path';

import { config, ErrorCode, Logger, validateConfig } from './common';
import { setupPostGraphile } from './middleware';
import { applyMigrations } from './migrations';

const logger = new Logger(config, 'bootstrap');

async function bootstrap(): Promise<void> {
  const app = express();
  const httpServer = setupHttpServerWithWebsockets(app);

  await validateConfig(config);
  await applyMigrations();
  setupShutdownActions(app);

  setupJWTProcessingMiddleware(
    app,
    '/graphql',
    resolve(__dirname, '../keys/public.key'),
  );
  await setupPostGraphile(app);

  httpServer.addListener('request', app);

  httpServer.listen(config.port, () => {
    if (config.isDev()) {
      logger.log(`http://localhost:${config.port}/graphiql`);
    }
  });
}

bootstrap().catch(error => {
  logger.error({ code: ErrorCode.StartupError, ...JSONify(error) });
  process.exit(-1);
});
