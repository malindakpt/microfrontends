import { Pool, PoolClient, QueryResult } from 'pg';
import { QueryResultRowType, sql, SqlSqlTokenType } from 'slonik';
import * as camelcaseKeys from 'camelcase-keys';

import { config } from '../../../common';

const pool = new Pool({
  connectionString: config.dbPgConnectionString(),
});

type PgClientInitOptions = {
  user?: string;
  tenantId?: string;
  applicationId?: string;
};

export class PgClient {
  constructor(private readonly initOptions: PgClientInitOptions = {}) {}

  private async initializeClient(): Promise<PoolClient> {
    const poolClient = await pool.connect();

    try {
      await poolClient.query('BEGIN');

      const selectMembers = [
        sql`set_config('role', ${config.dbPgWebUser}, TRUE)`,
      ];
      if (this.initOptions.user) {
        selectMembers.push(
          sql`set_config('axinom.auth.user', ${this.initOptions.user}, TRUE)`,
        );
      }
      if (this.initOptions.tenantId) {
        selectMembers.push(
          sql`set_config('axinom.auth.tenantId', ${this.initOptions.tenantId}, TRUE)`,
        );
      }
      if (this.initOptions.applicationId) {
        selectMembers.push(
          sql`set_config('axinom.auth.applicationId', ${this.initOptions.applicationId}, TRUE)`,
        );
      }

      const baseSqlQuery = sql`SELECT ${sql.join(selectMembers, sql`, `)}`;
      await poolClient.query(baseSqlQuery.sql, baseSqlQuery.values);

      return poolClient;
    } catch (error) {
      await poolClient.query('ROLLBACK');
      poolClient.release();
      throw error;
    }
  }

  async query<T>(
    sqlQuery: SqlSqlTokenType<QueryResultRowType>,
  ): Promise<QueryResult<T>> {
    const poolClient = await this.initializeClient();
    try {
      const restuls = await poolClient.query<T>(sqlQuery.sql, sqlQuery.values);
      restuls.rows = camelcaseKeys(restuls.rows);
      return restuls;
    } catch (error) {
      await poolClient.query('ROLLBACK');
      throw error;
    } finally {
      await poolClient.query('COMMIT');
      poolClient.release();
    }
  }

  async queryExactlyOne<T>(
    sqlQuery: SqlSqlTokenType<QueryResultRowType>,
  ): Promise<T> {
    const poolClient = await this.initializeClient();
    try {
      const result = await poolClient.query<T>(sqlQuery.sql, sqlQuery.values);
      if (result.rowCount !== 1) {
        throw new Error(
          `Expected exactly 1 row to be affected while actual was ${result.rowCount} rows`,
        );
      }

      return camelcaseKeys(result.rows[0]);
    } catch (error) {
      await poolClient.query('ROLLBACK');
      throw error;
    } finally {
      await poolClient.query('COMMIT');
      poolClient.release();
    }
  }

  async exists(
    sqlQuery: SqlSqlTokenType<QueryResultRowType>,
  ): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (await this.query<any>(sqlQuery)).rowCount > 0;
  }
}
