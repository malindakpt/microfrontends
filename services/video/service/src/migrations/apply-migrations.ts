import { runStartupScripts } from '@ax/service-common';
import { migrate, watch } from 'graphile-migrate';

import { config } from '../common';
import { getMigrationsSettings } from './migrations.settings';

export const applyMigrations = async (): Promise<void> => {
  const settings = await getMigrationsSettings(config);
  if (config.isDev()) {
    // Watches the current.sql file and applies its changes on every save.
    await watch(settings);
  } else {
    await migrate(settings);
  }

  await runStartupScripts(settings);
};
