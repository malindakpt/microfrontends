import * as dotenv from 'dotenv';
import { resolve } from 'path';

import { Config } from '../../common';

export const createTestConfig = (overrides: any = {}): Config => {
  //TODO: This is needed if tests are running from monorepo context instead of project context, e.g. using Jest Runner extension
  process.chdir(resolve(__dirname, '../../../'));
  dotenv.config();
  return {
    environment: 'test',
    port: parseInt(process.env.PORT, 10),
    serviceId: `${process.env.SERVICE_ID}_test`,
    logProject: `${process.env.LOG_PROJECT}_test`,
    dbHost: process.env.DATABASE_HOST,
    dbPort: parseInt(process.env.DATABASE_PORT, 10),
    dbName: `${process.env.DATABASE_NAME}_test`,
    dbOwnerName: `${process.env.DATABASE_OWNER}_test`,
    dbOwnerPassword: process.env.DATABASE_OWNER_PASSWORD,
    dbAuthName: `${process.env.DATABASE_AUTHENTICATOR}_test`,
    dbAuthPassword: process.env.DATABASE_AUTHENTICATOR_PASSWORD,
    dbVisitorName: `${process.env.DATABASE_VISITOR}_test`,
    dbRootConnectionString: process.env.ROOT_DATABASE_CONNECTION_STRING,
    ...overrides,
  };
};
