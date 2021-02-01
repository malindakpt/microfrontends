import { JSONify } from '@ax/service-common';
import * as express from 'express';
import * as helmet from 'helmet';

import { config, validateConfig } from './common/config';
import { ErrorCode } from './common/errors';
import { Logger } from './common/logging';
import { applyMigrations } from './migrations';
import {
  setupAuthentication as setupAccessManagementAuthentication,
  setupPostGraphile as setupAccessManagementPostGraphile,
} from './modules/access-management/middleware';
import { synchronizePermissions } from './modules/access-management/security/id-service-sync';
import {
  setupAuthentication as setupAppAdminAuthentication,
  setupPostGraphile as setupAppAdminPostGraphile,
} from './modules/app-administration/middleware';
import { setupAuthMiddleware } from './modules/auth-endpoint/setup';
import {
  setupAuthentication as setupTenantAdminAuthentication,
  setupPostGraphile as setupTenantAdminPostGraphile,
} from './modules/tenant-administration/middleware';

const logger = new Logger('bootstrap');

async function bootstrap(): Promise<void> {
  await validateConfig(config);
  await applyMigrations();

  const tenantAdminApp = express().use(helmet());
  const applicationAdminApp = express().use(helmet());
  const accessManagementApp = express().use(helmet());
  const authEndpointApp = express().use(helmet());

  setupTenantAdminAuthentication(tenantAdminApp, '/graphql');
  setupTenantAdminPostGraphile(tenantAdminApp);

  setupAppAdminAuthentication(applicationAdminApp, '/graphql');
  setupAppAdminPostGraphile(applicationAdminApp);

  setupAccessManagementAuthentication(accessManagementApp, '/graphql');
  setupAccessManagementPostGraphile(accessManagementApp);
  synchronizePermissions();

  setupAuthMiddleware(authEndpointApp);

  tenantAdminApp.listen(config.tenantAdminPort);
  if (config.isDev()) {
    logger.log({
      application: 'tenantAdminApp',
      url: `http://localhost:${config.tenantAdminPort}/graphiql`,
    });
  }

  applicationAdminApp.listen(config.appAdminPort);
  if (config.isDev()) {
    logger.log({
      application: 'applicationAdminApp',
      url: `http://localhost:${config.appAdminPort}/graphiql`,
    });
  }

  accessManagementApp.listen(config.accessManagementPort);
  if (config.isDev()) {
    logger.log({
      application: 'accessManagementApp',
      url: `http://localhost:${config.accessManagementPort}/graphiql`,
    });
  }

  authEndpointApp.listen(config.authEndpointPort);
  if (config.isDev()) {
    logger.log({
      application: 'authEndpointApp',
      url: `http://localhost:${config.authEndpointPort}`,
    });
  }
}

bootstrap().catch(error => {
  logger.error({ code: ErrorCode.StartupError, ...JSONify(error) });
  process.exit();
});
