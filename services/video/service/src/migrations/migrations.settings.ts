import { getAfterResetScripts } from '@ax/service-common';
import { Settings } from 'graphile-migrate/dist/settings';
import { resolve } from 'path';

import { Config } from '../common';

const dbSchemaExportPath = resolve(__dirname, '../generated/schema.sql');

export const getMigrationsSettings = async (
  config: Config,
): Promise<Settings> => {
  const afterReset = await getAfterResetScripts();
  const shadowConnectionString = `${config.dbOwnerConnectionString()}_shadow`;
  return {
    connectionString: config.dbOwnerConnectionString(),
    shadowConnectionString: shadowConnectionString,
    rootConnectionString: config.dbRootConnectionString,
    pgSettings: {
      search_path: 'app_public,app_private,app_hidden,public',
    },
    placeholders: {
      // :DATABASE_NAME and :DATABASE_OWNER are restricted and shall not be defined here
      ':DB_NAME': config.dbName,
      ':DB_OWNER': config.dbOwnerName,

      ':DATABASE_VISITOR': config.dbVisitorName,
      ':DATABASE_AUTHENTICATOR': config.dbAuthName,
    },
    afterReset,
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
};
