import { watch, migrate } from 'graphile-migrate';

import { config } from '../common/config';
import { getMigrationsSettings } from './';

export const applyMigrations = async (): Promise<void> => {
  const settings = getMigrationsSettings(config);
  if (config.isDev()) {
    // Watches the current.sql file and applies its changes on every save.
    await watch(settings);
  } else {
    await migrate(settings);
  }
};
