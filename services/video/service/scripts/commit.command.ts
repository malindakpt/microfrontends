/* eslint-disable no-console */
import { commit } from 'graphile-migrate';

import { config } from '../src/common';
import { getMigrationsSettings } from '../src/migrations';

async function main(): Promise<void> {
  const settings = await getMigrationsSettings(config);
  await commit(settings);
}

main().catch(error => {
  console.error(error);
  process.exit(-1);
});
