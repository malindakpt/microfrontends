import { Request, Response } from 'express';
import { reset } from 'graphile-migrate';
import { DocumentNode, graphql, GraphQLSchema } from 'graphql';
import { print } from 'graphql/language/printer';
import { mockRequest, mockResponse } from 'mock-req-res';
import { resolve } from 'path';
import { Pool, QueryResult } from 'pg';
import {
  createPostGraphileSchema,
  PostGraphileOptions,
  withPostGraphileContext,
} from 'postgraphile';
import { QueryResultRowType, SqlSqlTokenType } from 'slonik';

import {
  initializePgPool,
  runResetQueries,
} from '../../../../../../scripts/helpers';
import {
  Config,
  GraphQLErrorEnhanced,
  handleErrors,
  Logger,
  validateConfig,
} from '../../common';
import { PgClient } from '../../database';
import { getPostGraphileOptions } from '../../middleware';
import { getMigrationsSettings } from '../../migrations';
import { createTestConfig } from './test.config';

interface ICtx {
  testPgPool: Pool;
  ownerPgPool: Pool;
  options: PostGraphileOptions<Request, Response>;
  schema: GraphQLSchema;
}

interface IExecutionResult {
  errors?: readonly GraphQLErrorEnhanced[];
  data?: { [key: string]: any };
}

export class TestGraphQLContext {
  private ctx: ICtx = null;
  private config: Config = null;
  private logger: Logger = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  // This is done because constructor cannot be async
  public static async create(): Promise<TestGraphQLContext> {
    const context = new TestGraphQLContext();
    await context.init();
    return context;
  }

  public async init(): Promise<void> {
    //This is needed if tests are running from monorepo context instead of project context, e.g. using Jest Runner extension
    process.chdir(resolve(__dirname, '../../../'));
    this.config = createTestConfig();
    await validateConfig(this.config);

    this.logger = new Logger(this.config, 'GraphQLTestContext');
    const rootPgPool = await initializePgPool(
      this.config.dbRootConnectionString,
    );
    await runResetQueries(
      rootPgPool,
      this.config.dbName,
      this.config.dbVisitorName,
      this.config.dbAuthName,
      this.config.dbOwnerName,
      this.config.dbOwnerPassword,
      this.config.dbAuthPassword,
    );
    await rootPgPool.end();
    const settings = await getMigrationsSettings(this.config);
    await reset(settings);
    this.ctx = await this.createContext();
  }

  private async createContext(): Promise<ICtx> {
    const testPgPool = new Pool({
      connectionString: this.config.dbAuthConnectionString(),
    });

    const ownerPgPool = new Pool({
      connectionString: this.config.dbOwnerConnectionString(),
    });

    const options = getPostGraphileOptions(this.config, ownerPgPool);
    const schema = await createPostGraphileSchema(
      testPgPool,
      'app_public',
      options,
    );

    // Store the context
    return {
      ownerPgPool,
      testPgPool,
      options,
      schema,
    };
  }

  public async truncate(tableName: string): Promise<void> {
    const client = await this.ctx.ownerPgPool.connect();
    try {
      await client.query(`TRUNCATE app_public.${tableName} CASCADE;`);
    } catch (e) {
      this.logger.error(e);
    } finally {
      await client.release();
    }
  }

  public async query<T>(
    sqlQuery: SqlSqlTokenType<QueryResultRowType>,
  ): Promise<QueryResult<T>> {
    let pgClient: PgClient;
    try {
      pgClient = await PgClient.create(this.ctx.ownerPgPool, {
        'ax.claims.username': 'TestContext',
      });
      const result = await pgClient.query<T>(sqlQuery);

      await pgClient.commitTransaction();
      return result;
    } catch (error) {
      await pgClient?.rollbackTransaction();
    } finally {
      pgClient?.release();
    }
  }

  public async queryExactlyOne<T>(
    sqlQuery: SqlSqlTokenType<QueryResultRowType>,
  ): Promise<T> {
    let pgClient: PgClient;
    try {
      pgClient = await PgClient.create(this.ctx.ownerPgPool, {
        'ax.claims.username': 'TestContext',
      });
      const result = await pgClient.queryExactlyOne<T>(sqlQuery);

      await pgClient.commitTransaction();
      return result;
    } catch (error) {
      await pgClient?.rollbackTransaction();
    } finally {
      pgClient?.release();
    }
  }

  public async dispose(): Promise<void> {
    try {
      await this.ctx.testPgPool.end();
      await this.ctx.ownerPgPool.end();
      this.ctx = null;
    } catch (e) {
      this.logger.error(e);
    }
  }

  public async gqlQuery(
    query: string | DocumentNode,
    variables: { [key: string]: any } = {},
    requestContext: { [key: string]: any } = {},
  ): Promise<IExecutionResult> {
    const queryString = typeof query === 'string' ? query : print(query);
    const req = mockRequest({
      body: { query: queryString },
      ...requestContext,
    });
    const res = mockResponse();
    const pgSettings =
      (typeof this.ctx.options.pgSettings === 'function'
        ? await this.ctx.options.pgSettings(req)
        : this.ctx.options.pgSettings) || {};
    return withPostGraphileContext(
      {
        ...this.ctx.options,
        pgPool: this.ctx.testPgPool,
        pgSettings,
      },
      async context => {
        const additionalContext = await this.ctx.options.additionalGraphQLContextFromRequest(
          req,
          res,
        );
        const result = await graphql(
          this.ctx.schema,
          queryString,
          null,
          {
            ...context,
            ...additionalContext,
          },
          variables,
        );

        // Transform errors
        if (result.errors) {
          result.errors = handleErrors(this.config, result.errors);
        }
        return result;
      },
    ) as IExecutionResult;
  }
}
