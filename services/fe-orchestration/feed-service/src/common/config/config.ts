export const config = {
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  dbHost: process.env.DATABASE_HOST,
  dbPort: parseInt(process.env.DATABASE_PORT, 10),
  dbName: process.env.DATABASE_NAME,
  dbOwnerName: process.env.DATABASE_OWNER,
  dbOwnerPassword: process.env.DATABASE_OWNER_PASSWORD,
  dbAuthName: process.env.DATABASE_AUTHENTICATOR,
  dbAuthPassword: process.env.DATABASE_AUTHENTICATOR_PASSWORD,
  dbVisitorName: process.env.DATABASE_VISITOR,
  dbRootConnectionString: process.env.ROOT_DATABASE_CONNECTION_STRING,
  protocol: process.env.HTTPS ? 'https' : 'http',
  piletPath: `/api/v1/pilet`,
  filePath: '/files(/@:org)?/:name/:version/:file?',
  authKeys: process.env.PILET_API_KEYS ? process.env.PILET_API_KEYS.split(',') : [],
  appURL: function() {
    const host = process.env.WEBSITE_HOSTNAME || `localhost:${this.port}`;
    return `${process.env.HTTP_X_FORWARDED_PROTO || this.protocol}://${host}`;
  }
} as const;

export type Config = typeof config;
