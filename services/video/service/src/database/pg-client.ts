import * as camelcaseKeys from 'camelcase-keys';
import { Pool, PoolClient, QueryResult } from 'pg';
import { QueryResultRowType, sql, SqlSqlTokenType } from 'slonik';

export class PgClient {
  private poolClient: PoolClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * Creates an instance of PgClient, begins a transaction for multiple queries and initializes pg configuration using set_config function with pgSettings keys and values.
   */
  public static async create(
    pool: Pool,
    pgSettings: {
      [key: string]: string | number | boolean;
    } = {},
  ): Promise<PgClient> {
    const pgClient = new PgClient();
    await pgClient.initializeClient(pool, pgSettings);
    return pgClient;
  }

  private async initializeClient(
    pool: Pool = null,
    pgSettings: {
      [key: string]: string | number | boolean;
    } = {},
  ): Promise<void> {
    this.poolClient = await pool.connect();
    await this.beginTransaction();

    const config = [];
    for (const key in pgSettings) {
      if (pgSettings.hasOwnProperty(key)) {
        config.push(sql`set_config(${key}, ${pgSettings[key]}, TRUE)`);
      }
    }

    const configQuery = sql`SELECT ${sql.join(config, sql`, `)}`;
    await this.poolClient.query(configQuery.sql, configQuery.values);
  }

  private async beginTransaction(): Promise<void> {
    await this.poolClient.query('BEGIN');
  }

  public async commitTransaction(): Promise<void> {
    await this.poolClient.query('COMMIT');
  }

  public async rollbackTransaction(): Promise<void> {
    await this.poolClient.query('ROLLBACK');
  }

  public release(): void {
    this.poolClient.release();
  }

  public async query<T>(
    sqlQuery: SqlSqlTokenType<QueryResultRowType>,
  ): Promise<QueryResult<T>> {
    const result = await this.poolClient.query<T>(
      sqlQuery.sql,
      sqlQuery.values,
    );
    result.rows = camelcaseKeys(result.rows);
    return result;
  }

  public async queryExactlyOne<T>(
    sqlQuery: SqlSqlTokenType<QueryResultRowType>,
  ): Promise<T> {
    const result = await this.poolClient.query<T>(
      sqlQuery.sql,
      sqlQuery.values,
    );
    if (result.rowCount !== 1) {
      throw new Error(
        `Expected exactly 1 row to be affected while actual was ${result.rowCount} rows`,
      );
    }

    return camelcaseKeys(result.rows[0]);
  }

  public async exists(
    sqlQuery: SqlSqlTokenType<QueryResultRowType>,
  ): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await this.query<any>(sql`select exists(${sqlQuery})`);
    return result.rows[0].exists;
  }
}
