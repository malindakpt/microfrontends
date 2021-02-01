import * as express from 'express';
import * as responseTime from 'response-time';
import * as cors from 'cors';
import * as busboy from 'connect-busboy';
import { withGql } from './resolvers';
import { checkAuth } from './middleware';
import { getFiles, publishPilet, getLatestPilets } from './endpoints';
import { createConnection } from 'typeorm';
import { config, validateConfig } from './common/config';
import ormconfig = require('./ormconfig');

export async function runApp() {
  try {
    await validateConfig(config); 
  } catch (error) {
    console.error(error);
    return error;
  }

  const filePath = config.filePath;
  const piletPath = config.piletPath;
  const port = config.port;
  const apiKeys = config.authKeys;
  const rootUrl = config.appURL();

  try {
    await createConnection(ormconfig);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }

  const app = express();

  app.use(
    cors({
      origin: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(responseTime());
  app.use(
    busboy({
      highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
      limits: {
        fileSize: 32 * 1024 * 1024, // Set 32MiB limit
      },
    }),
  );

  app.get(piletPath, getLatestPilets());

  app.post(piletPath, checkAuth(apiKeys, 'publish-pilet'), publishPilet(rootUrl));

  app.get(filePath, getFiles());

  return withGql(app).listen(port, () => {
    console.info(`Pilet feed fervice started on port ${port}.`);
    console.info(``);
    console.info(`  URL for uploading pilets:`);
    console.info(``);
    console.info(`    ${rootUrl}${piletPath}`);
    console.info(``);
    console.info(`  API keys for publishing:`);
    console.info(``);
    console.info(`    ${apiKeys.join('\n    ')}`);
    console.info(``);
  });
}
