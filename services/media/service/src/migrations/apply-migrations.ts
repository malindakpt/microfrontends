import { watch, migrate } from 'graphile-migrate';

import { config } from '../common';
import { getMigrationsSettings } from './';

export const applyMigrations = async (): Promise<void> => {
  const settings = await getMigrationsSettings(config);
  if (config.isDev()) {
    // Watches the current.sql file and applies its changes on every save.
    await watch(settings);
  } else {
    await migrate(settings);
  }
};
