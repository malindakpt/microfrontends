/* eslint-disable @typescript-eslint/no-explicit-any */
import { Build, Plugin } from 'graphile-build';
import { SQL, QueryBuilder } from 'graphile-build-pg';
import { makeExtendSchemaPlugin, gql } from 'graphile-utils';
// graphile-utils doesn't export this yet
import { GraphQLResolveInfo } from 'graphql';
import * as inflection from 'inflection';

type GraphileHelpers = any;
type AugmentedGraphQLFieldResolver<
  TSource,
  TContext,
  TArgs = { [argName: string]: any }
> = (
  parent: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo & {
    graphile: GraphileHelpers;
  },
) => any;
/* The JSON object that `tg__graphql_subscription()` delivers via NOTIFY */
interface ITgGraphQLSubscriptionPayload {
  event: string;
  subject: string | null;
}

/*
 * This function handles the boilerplate of fetching a record from the database
 * which has the 'id' equal to the 'subject' from the PG NOTIFY event payload
 * (see `tg__graphql_subscription()` trigger function in the database).
 */
function recordByIdFromTable(
  build: Build,
  sqlTable: SQL,
): AugmentedGraphQLFieldResolver<ITgGraphQLSubscriptionPayload, any> {
  const { pgSql: sql } = build;
  return async (
    event: ITgGraphQLSubscriptionPayload,
    _args: {},
    _context: any,
    // eslint-disable-next-line @typescript-eslint/typedef
    { graphile: { selectGraphQLResultFromTable } },
  ) => {
    const rows = await selectGraphQLResultFromTable(
      sqlTable,
      (tableAlias: SQL, sqlBuilder: QueryBuilder) => {
        sqlBuilder.where(
          sql.fragment`${tableAlias}.id = ${sql.value(event.subject)}`,
        );
      },
    );
    return rows[0];
  };
}

function getId(): AugmentedGraphQLFieldResolver<
  ITgGraphQLSubscriptionPayload,
  any
> {
  return async (event: ITgGraphQLSubscriptionPayload) => event.subject;
}

export const SubscriptionsPluginFactory = (
  mainTableName: string,
  typeName: string,
): Plugin =>
  makeExtendSchemaPlugin((build: Build) => {
    const { pgSql: sql } = build;
    const variableName = inflection.camelize(typeName, true);
    const payloadName =
      inflection.camelize(typeName, false) + 'SubscriptionPayload';
    const topicName = 'graphql:' + mainTableName;
    const definition = {
      typeDefs: gql`
      type ${payloadName} {
        id: Int! # Populated by our resolver below 
        ${variableName}: ${typeName} # Populated by our resolver below
        event: String # Part of the NOTIFY payload
      }

      extend type Subscription {
        """
        Triggered when a ${typeName} is mutated (insert, update or delete). 
        """
        ${variableName}Mutated: ${payloadName}
          @pgSubscription(topic: "${topicName}")
      }
    `,
      resolvers: {},
    };
    definition.resolvers[payloadName] = { id: getId() };
    definition.resolvers[payloadName][variableName] = recordByIdFromTable(
      build,
      sql.fragment([`app_public.${mainTableName}`]),
    );
    return definition;
  });
