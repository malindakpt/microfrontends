/* eslint-disable no-console */
import ono from 'ono';
import { Pool } from 'pg';

const sleep = (ms: number): Promise<unknown> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const initializePgPool = async (
  connectionString: string,
): Promise<Pool> => {
  const pgPool = new Pool({ connectionString });

  pgPool.on('error', err => {
    throw ono(err, 'Error during database connection!');
  });

  let attempts = 0;
  while (true) {
    try {
      await pgPool.query('select true as "Connection test";');
      break;
    } catch (e) {
      attempts++;
      if (attempts <= 30) {
        console.log(`Database is not ready yet (attempt ${attempts})`);
      } else {
        throw ono(e, 'Unable to connect to database!');
      }
      await sleep(1000);
    }
  }
  return pgPool;
};

export const runResetQueries = async (
  pgPool: Pool,
  dbName: string,
  dbVisitorName: string,
  dbAuthName: string,
  dbOwnerName: string,
  dbOwnerPassword: string,
  dbAuthPassword: string,
): Promise<void> => {
  const client = await pgPool.connect();
  try {
    const commands: string[] = [
      // Drop existing connections to database
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='${dbName}';`,

      // RESET database
      `DROP DATABASE IF EXISTS "${dbName}";`,
      `DROP DATABASE IF EXISTS "${dbName}_shadow";`,
      `DROP ROLE IF EXISTS ${dbVisitorName};`,
      `DROP ROLE IF EXISTS ${dbAuthName};`,
      `DROP ROLE IF EXISTS ${dbOwnerName};`,

      // IMPORTANT: don't grant SUPERUSER in production, we only need this so we can load the watch fixtures, which is only required during development time.
      // Owner user is still used by populate endpoint, in addition to pg schema watching and graphile-migrate.
      // Because this code is not expected to run on production environments, it's ok to leave it as SUPERUSER
      // If these scripts are used as an example for production database setup - this needs to be further tested, e.g. that all migrations are applied and assets are being created.
      `CREATE ROLE ${dbOwnerName} WITH LOGIN PASSWORD '${dbOwnerPassword}' SUPERUSER;`,

      // This is the no-access role that PostGraphile will run as by default
      `CREATE ROLE ${dbAuthName} WITH LOGIN PASSWORD '${dbAuthPassword}' NOINHERIT;`,

      // This is the role that PostGraphile will switch to (from ${DATABASE_AUTHENTICATOR}) during a GraphQL request
      // Basically, this is a group role
      `CREATE ROLE ${dbVisitorName};`,

      // This enables PostGraphile to switch from ${DATABASE_AUTHENTICATOR} to ${DATABASE_VISITOR}
      // We say that Auth user belongs to the Visitors group
      `GRANT ${dbVisitorName} TO ${dbAuthName};`,
    ];

    for await (const command of commands) {
      console.log(`Running Query: '${command}'`);
      await client.query(command);
    }
  } finally {
    await client.release();
  }
};
