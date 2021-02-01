import * as dotenv from 'dotenv';

import { Config, config } from '../../common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTestConfig = (overrides: any = {}): Config => {
  dotenv.config();
  return {
    environment: 'test',
    serviceId: `${process.env.LOG_COMPONENT}_test`,

    tenantAdminPort: parseInt(process.env.TENANT_ADMIN_PORT),
    appAdminPort: parseInt(process.env.APP_ADMIN_PORT),
    accessManagementPort: parseInt(process.env.ACCESS_MANAGEMENT_PORT),
    authEndpointPort: parseInt(process.env.AUTH_ENDPOINT_PORT),

    pgHost: process.env.POSTGRESQL_HOST,
    pgPort: parseInt(process.env.POSTGRESQL_PORT),
    pgSSLMode: process.env.PGSSLMODE,
    pgRootUser: process.env.POSTGRESQL_ROOT_USER,
    pgRootUserPassword: process.env.POSTGRESQL_ROOT_USER_PASSWORD,

    dbName: `${process.env.DATABASE_NAME}_test`,
    dbOwnerName: `${process.env.DATABASE_OWNER}_test`,
    dbOwnerPassword: process.env.DATABASE_OWNER_PASSWORD,

    dbPgUser: `${process.env.DATABASE_PG_USER}_test`,
    dbPgUserPassword: process.env.DATABASE_PG_USER_PASSWORD,
    dbPgWebUser: `${process.env.DATABASE_PG_WEB_USER}_test`,

    taSuperUserEmail: process.env.SUPER_USER_EMAIL,
    taSuperUserPasswordHash: process.env.SUPER_USER_PASSWORD_HASH,

    pgRootConnectionString: config.pgRootConnectionString,
    dbOwnerConnectionString: config.dbOwnerConnectionString,
    dbPgConnectionString: config.dbPgConnectionString,

    isDev: config.isDev,

    ...overrides,
  };
};
