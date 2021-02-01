export const config = {
  environment: process.env.NODE_ENV,
  serviceId: process.env.SERVICE_ID,
  logLevel: process.env.LOG_LEVEL,

  tenantAdminPort: parseInt(process.env.TENANT_ADMIN_PORT),
  appAdminPort: parseInt(process.env.APP_ADMIN_PORT),
  accessManagementPort: parseInt(process.env.ACCESS_MANAGEMENT_PORT),
  authEndpointPort: parseInt(process.env.AUTH_ENDPOINT_PORT),

  pgHost: process.env.POSTGRESQL_HOST,
  pgPort: parseInt(process.env.POSTGRESQL_PORT),
  pgUserSuffix: process.env.POSTGRESQL_USER_SUFFIX || '',
  pgSSLMode: process.env.PGSSLMODE,
  pgRootUser: process.env.POSTGRESQL_ROOT_USER,
  pgRootUserPassword: process.env.POSTGRESQL_ROOT_USER_PASSWORD,

  dbName: process.env.DATABASE_NAME,
  dbOwnerName: process.env.DATABASE_OWNER,
  dbOwnerPassword: process.env.DATABASE_OWNER_PASSWORD,

  dbPgUser: process.env.DATABASE_PG_USER,
  dbPgUserPassword: process.env.DATABASE_PG_USER_PASSWORD,
  dbPgWebUser: process.env.DATABASE_PG_WEB_USER,

  taSuperUserEmail: process.env.SUPER_USER_EMAIL,
  taSuperUserPasswordHash: process.env.SUPER_USER_PASSWORD_HASH,

  managedServiceClientId: process.env.MANAGED_SERVICE_CLIENT_ID,
  managedServiceClientSecret: process.env.MANAGED_SERVICE_CLIENT_SECRET,

  publicAuthEndpointUrl: process.env.PUBLIC_AUTH_ENDPOINT_URL,

  pgRootConnectionString: function() {
    return `postgres://${this.pgRootUser}${this.pgUserSuffix}:${this.pgRootUserPassword}@${this.pgHost}:${this.pgPort}/template1`;
  },
  dbOwnerConnectionString: function() {
    return `postgres://${this.dbOwnerName}${this.pgUserSuffix}:${this.dbOwnerPassword}@${this.pgHost}:${this.pgPort}/${this.dbName}`;
  },
  dbPgConnectionString: function() {
    return `postgres://${this.dbPgUser}${this.pgUserSuffix}:${this.dbPgUserPassword}@${this.pgHost}:${this.pgPort}/${this.dbName}`;
  },

  isDev: function() {
    return this.environment === 'dev';
  },
} as const;

export type Config = typeof config;
