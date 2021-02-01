/* eslint-disable no-console */
import { reset } from 'graphile-migrate';

import { initializePgPool, runResetQueries } from '../../../../scripts/helpers';
import { config, validateConfig } from '../src/common';
import { getMigrationsSettings } from '../src/migrations';

async function main(): Promise<void> {
  console.log('1. Validating Config...');
  await validateConfig(config);

  console.log('2. Initializing ROOT Database Connection...');
  const rootPgPool = await initializePgPool(config.dbRootConnectionString);

  console.log('3. Running Reset/Initialization Queries...');
  await runResetQueries(
    rootPgPool,
    config.dbName,
    config.dbVisitorName,
    config.dbAuthName,
    config.dbOwnerName,
    config.dbOwnerPassword,
    config.dbAuthPassword,
  );

  console.log('4. Closing ROOT Database Connection...');
  await rootPgPool.end();

  console.log(`5. Running Graphile-Migrate 'reset' command`);
  const settings = await getMigrationsSettings(config);
  await reset(settings);

  console.log('6. Database Reset/Initialization Completed!');
}

main().catch(error => {
  console.error(error);
  process.exit(-1);
});
