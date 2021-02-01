import { Config } from '../common';
import { Settings } from 'graphile-migrate/dist/settings';
import * as path from 'path';

const dbSchemaExportPath = path.resolve(__dirname, '../generated/schema.sql');

export const getMigrationsSettings = (config: Config): Settings => {
  const shadowConnectionString = `${config.dbOwnerConnectionString()}_shadow`;

  const migrationSettings: Settings = {
    connectionString: config.dbOwnerConnectionString(),
    shadowConnectionString: shadowConnectionString,
    rootConnectionString: config.pgRootConnectionString(),
    pgSettings: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      search_path: 'application_administration,app_private,public',
    },
    placeholders: {
      ':DB_NAME': config.dbName,
      ':DB_OWNER': config.dbOwnerName,
      ':DATABASE_PG_USER': config.dbPgUser,
      ':DATABASE_PG_WEB_USER': config.dbPgWebUser,
    },
    afterReset: ['afterReset/createExtensions.sql'],
    afterAllMigrations: [
      {
        _: 'command',
        shadow: true,
        command: `cd ../../scripts/db && docker-compose exec -T postgres pg_dump --no-sync --schema-only --no-owner --exclude-schema=graphile_migrate --exclude-schema=graphile_worker ${shadowConnectionString} > ${dbSchemaExportPath}`,
      },
    ],
    blankMigrationContent: `
--! Message: replace-with-migration-name

-- Remove this comment line and write your migration here. Make sure to keep one empty line between 'Message' header and first migration line to properly name future migration file.
`,
  };

  return migrationSettings;
};
