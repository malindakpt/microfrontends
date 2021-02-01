/* eslint-disable no-console */
import { initializePgPool, runResetQueries } from '../../../../scripts/helpers';
import { config, validateConfig } from '../src/common';
import { reset } from './helpers'

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

  console.log('4. Creating Database');
  await reset(rootPgPool, config.dbName, config.dbAuthName, config.dbOwnerName);

  console.log('5. Closing ROOT Database Connection...');
  await rootPgPool.end();

  console.log('6. Database Reset/Initialization Completed!');
}

main().catch(error => {
  console.error(error);
  process.exit(-1);
});
