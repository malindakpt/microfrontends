import { LogLevel } from '../logging';

export const config = {
  logLevel: process.env.LOG_LEVEL,
  environment: process.env.NODE_ENV,
  serviceId: process.env.SERVICE_ID,
  port: parseInt(process.env.PORT, 10),
  logProject: process.env.LOG_PROJECT,
  dbHost: process.env.DATABASE_HOST,
  dbPort: parseInt(process.env.DATABASE_PORT, 10),
  dbName: process.env.DATABASE_NAME,
  dbOwnerName: process.env.DATABASE_OWNER,
  dbOwnerPassword: process.env.DATABASE_OWNER_PASSWORD,
  dbAuthName: process.env.DATABASE_AUTHENTICATOR,
  dbAuthPassword: process.env.DATABASE_AUTHENTICATOR_PASSWORD,
  dbVisitorName: process.env.DATABASE_VISITOR,
  dbRootConnectionString: process.env.ROOT_DATABASE_CONNECTION_STRING,
  dbOwnerConnectionString: function() {
    return `postgres://${this.dbOwnerName}:${this.dbOwnerPassword}@${this.dbHost}:${this.dbPort}/${this.dbName}`;
  },
  dbAuthConnectionString: function() {
    return `postgres://${this.dbAuthName}:${this.dbAuthPassword}@${this.dbHost}:${this.dbPort}/${this.dbName}`;
  },
  isDev: function() {
    return this.environment === 'dev';
  },
  isProd: function() {
    return this.environment === 'prod';
  },
} as const;

export type Config = typeof config;
