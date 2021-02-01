/* eslint-disable no-console */
import { promises as fsp } from 'fs';
import { run } from 'graphile-migrate';
import { Settings } from 'graphile-migrate/dist/settings';
import { join, relative, resolve } from 'path';
import * as readdir from 'readdirp';

//TODO: Replace console calls with logger calls when Logger is refactored and moved to this library
/**
 * Executes all .sql files located in a specified directory.
 *
 * @param settings - graphile-migrate settings object
 * @param dirPath - relative path from root of consumer project to a folder with startup scripts in it. Default value - `migrations/startup`
 */
export const runStartupScripts = async (
  settings: Settings,
  dirPath = 'migrations/startup',
): Promise<void> => {
  const sortedList = (
    await readdir.promise(dirPath, { fileFilter: '*.sql' })
  ).sort((a, b) => a.path.localeCompare(b.path));
  for await (const { path } of sortedList) {
    const scriptPath = join(dirPath, path);
    const content = await fsp.readFile(scriptPath, 'utf8');
    console.debug(`Running Script: '${scriptPath}'`);
    await run(settings, content, path);
  }
};

/**
 * Retrieves an array of relative string paths to after-reset sql scripts, which is consumed by graphile-migrate settings. 
 * Approximate return value:
 * ```
 * [
      '..\\..\\..\\..\\libs\\service-common\\migrations\\after-reset\\001-setup.sql',
      '..\\..\\..\\..\\libs\\service-common\\migrations\\after-reset\\002-error-functions.sql',
      '..\\..\\..\\..\\libs\\service-common\\migrations\\after-reset\\003-validation-functions.sql',
      '..\\..\\..\\..\\libs\\service-common\\migrations\\after-reset\\004-subscriptions.sql',
      '..\\..\\..\\..\\libs\\service-common\\migrations\\after-reset\\005-created-updated-triggers.sql',
      '..\\..\\..\\..\\libs\\service-common\\migrations\\after-reset\\006-authorization.sql',
      '..\\..\\..\\..\\libs\\service-common\\migrations\\after-reset\\099-define-functions.sql'
    ]
    ```
 */
export const getAfterResetScripts = async (): Promise<string[]> => {
  const executionPath = join(process.cwd(), 'migrations');
  const dirPath = resolve(__dirname, '..', '..', 'migrations', 'after-reset');
  return (await readdir.promise(dirPath, { fileFilter: '*.sql' }))
    .sort((a, b) => a.path.localeCompare(b.path))
    .map(file => relative(executionPath, file.fullPath));
};
