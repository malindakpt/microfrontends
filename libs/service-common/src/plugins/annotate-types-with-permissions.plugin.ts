import { Plugin } from 'graphile-build';
import { Client } from 'pg';

type PolicyRow = {
  schemaname: string;
  tablename: string;
  command: string;
  using: string;
  withcheck: string;
};

type SqlOperation = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
type AllOperations = 'ALL' | SqlOperation;

async function loadPolicies(
  pgOwnerConnectionString: string,
): Promise<PolicyRow[]> {
  // get all policies, sort so "ALL" is last and custom ones come earlier
  const constraintQuery = `
  select 
    schemaname,
    tablename,
    cmd as command,
    qual as using,
    with_check as withcheck
  from pg_policies
  order by command desc`;

  const pgClient = new Client(pgOwnerConnectionString);
  await pgClient.connect();
  const queryResult = await pgClient.query(constraintQuery);
  const rows = queryResult.rows;
  await pgClient.end();
  return rows as PolicyRow[];
}

function parsePermissions(sqlPolicy: string): string | undefined {
  const matches = /app_hidden\.user_has_permission\('([^']+)'/.exec(sqlPolicy);
  return matches && matches.length > 1 ? matches[1] : undefined;
}

function getPermissions(
  policies: PolicyRow[],
  commands: AllOperations[],
  field: 'using' | 'withcheck',
): string | undefined {
  const foundPolicy = policies.find(policy =>
    commands.find(cmd => policy.command === cmd),
  );
  if (foundPolicy && foundPolicy[field]) {
    return parsePermissions(foundPolicy[field]);
  }
  return undefined;
}

function setPermissionsCommentText(
  currentDescription: string,
  policies: PolicyRow[],
  type: SqlOperation,
): string {
  const field = type === 'SELECT' || type === 'DELETE' ? 'using' : 'withcheck';

  const permissions: string = getPermissions(policies, ['ALL', type], field);

  return [
    currentDescription ? currentDescription + '\n' : undefined,
    '@permissions: ',
    permissions,
  ].join('');
}

// all available hooks are defined here:
// https://www.graphile.org/graphile-build/all-hooks/
export const AnnotateTypesWithPermissionsPlugin: Plugin = async (
  builder,
  { pgOwnerConnectionString },
) => {
  const allPolicies = await loadPolicies(pgOwnerConnectionString);
  builder.hook('GraphQLInputObjectType', (obj, build, context) => {
    const scope = context.scope;

    // PostGraphile input Types that do not correspond to a database table
    if (
      scope.isPointInputType ||
      scope.isIntervalInputType ||
      scope.isPgConnectionFilterOperators ||
      scope.isPgConnectionFilterMany ||
      scope.isPgCondition ||
      scope.isPgConnectionFilter
    ) {
      return obj;
    }

    // PostGraphile generated input types for DB mutations
    if (scope.pgIntrospection) {
      const policies = allPolicies.filter(
        value =>
          value.schemaname === scope.pgIntrospection.namespaceName &&
          value.tablename === scope.pgIntrospection.name,
      );

      let operation: SqlOperation = undefined;
      if (scope.isPgCreateInputType) {
        operation = 'INSERT';
      } else if (scope.isPgUpdateInputType) {
        operation = 'UPDATE';
      } else if (scope.isPgDeleteInputType) {
        operation = 'DELETE';
      } else {
        return obj;
      }
      obj.description = setPermissionsCommentText(
        obj.description,
        policies,
        operation,
      );
      return obj;
    }

    // The input objects that come to this code-path are custom input types
    // and require custom logic to protect them!
    // Only works if they have input >types< - if they have no input or scalar
    // input values they cannot be found by this method.
    // Example: PopulateInput from the populate endpoint
    return obj;
  });

  builder.hook('GraphQLObjectType', (obj, build, context) => {
    const scope = context.scope;

    if (
      // PostGraphile Types that do not correspond to a database table
      scope.isPointType ||
      scope.isIntervalType ||
      scope.isPgConnectionFilterOperators ||
      scope.isPgConnectionFilterMany ||
      scope.isPgCondition ||
      scope.isPgConnectionFilter ||
      scope.isPageInfo ||
      scope.isEdgeType ||
      scope.isRootQuery ||
      scope.isRootMutation ||
      scope.isRootSubscription ||
      scope.isMutationPayload ||
      scope.isPgDeletePayloadType ||
      scope.isPgUpdatePayloadType ||
      // TODO: Procedures have no row level security: secure them in another way
      context?.scope?.pgIntrospection?.kind === 'procedure'
    ) {
      return obj;
    }

    // PostGraphile generated types for DB queries
    if (scope.pgIntrospection) {
      const policies = allPolicies.filter(
        value =>
          value.schemaname === scope.pgIntrospection.namespaceName &&
          value.tablename === scope.pgIntrospection.name,
      );

      obj.description = setPermissionsCommentText(
        obj.description,
        policies,
        'SELECT',
      );
      return obj;
    }

    // The objects that come to this code-path are custom types
    // and require custom logic to protect them!
    // Only works if they have >types< - if they have no input or scalar
    // input values they cannot be found by this method.
    return obj;
  });
};
