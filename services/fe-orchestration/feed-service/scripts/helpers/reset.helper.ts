import { Pool } from "pg";

export const reset = async (
  pgPool: Pool,
  dbName: string,
  dbAuthName: string,
  dbOwnerName: string
) => {
  const client = await pgPool.connect();
  try {
    const commands: string[] = [
      // Create Database
      `CREATE DATABASE ${dbName} OWNER ${dbOwnerName};`,

      // Revoke public access
      `REVOKE ALL ON DATABASE ${dbName} FROM PUBLIC;`,

      // Grant connect access to Auth User
      `GRANT CONNECT ON DATABASE ${dbName} TO ${dbAuthName};`
    ];

    for await (const command of commands) {
      console.log(`Running Query: '${command}'`);
      await client.query(command);
    }
  } finally {
    await client.release();
  }
} 