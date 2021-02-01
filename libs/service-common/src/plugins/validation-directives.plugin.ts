import { Plugin, SchemaBuilder, camelCase } from 'graphile-build';
import * as inflection from 'inflection';

interface Constraint {
  id: number;
  name: string;
  tableId: number;
  tableIndexes: [number];
  definition: string;
}

interface Constraints {
  [Key: string]: Constraint[];
}

async function loadDbConstraints(builder: SchemaBuilder): Promise<any[]> {
  const constraintQuery = `
    SELECT
      oid, conname, conrelid, conkey, pg_get_constraintdef(oid) AS definition
    FROM
      pg_constraint
    WHERE
      contype = 'c' AND conrelid > 0;`;

  // this pgConfig is not part of the public TS builder API so it may change
  const queryResult = await (builder as any).options.pgConfig.query(
    constraintQuery,
  );
  return queryResult.rows;
}

async function getConstraints(builder: SchemaBuilder): Promise<Constraints> {
  const constraints: Constraints = {};
  const rows = await loadDbConstraints(builder);
  for (const row of rows) {
    const key = `${row.conrelid}`;
    constraints[key] = constraints[key] || [];
    constraints[key].push({
      id: row.oid,
      name: row.conname,
      tableId: row.conrelid,
      definition: row.definition,
      tableIndexes: row.conkey,
    });
  }
  return constraints;
}

function mapCheckToValidation(constraint: string): string {
  const regex = /CHECK\s*\(\s*([a-zA-Z0-9_]+\.){0,1}([a-zA-Z0-9_]+)\s*\(\s*([\'a-zA-Z0-9_]+)\s*,\s*([\'a-zA-Z0-9_]+)/gm;

  const result = regex.exec(constraint);
  if (result?.length && result.length > 4) {
    switch (result[2]) {
      // custom handle when parameters are used - otherwise default is fine
      case 'constraint_max_length':
        return `@maxLength(${result[4]})`;
      case 'constraint_min_length':
        return `@minLength(${result[4]})`;
      default:
        const constraintName = inflection.camelize(
          result[2].replace('constraint_', ''),
          true,
        );
        return `@${constraintName}()`;
    }
  }

  return '';
}

export const ValidationDirectivesPlugin: Plugin = async builder => {
  const constraints = await getConstraints(builder);

  builder.hook('GraphQLInputObjectType:fields', (fields, build, context) => {
    const tableConstraints =
      constraints[`${context.scope.pgIntrospection?.id}`];

    // check if there are any constraints in the DB
    if (tableConstraints && Object.keys(fields).length) {
      for (const constraint of tableConstraints) {
        for (const tableIndex of constraint.tableIndexes) {
          // find the DB column by its index with 'pg_constraint.conkey'
          const column = context.scope.pgIntrospection.attributes.find(
            (at: { num: number }) => at.num === tableIndex,
          );

          const validation = mapCheckToValidation(constraint.definition);
          if (validation) {
            // convert the DB column name to camel case to compare it
            const f = fields[camelCase(column.name)];
            if (f && f.description) {
              f.description = `${f.description}\n${validation}`;
            } else if (f) {
              f.description = validation;
            }
          }
        }
      }
    }

    return fields;
  });

  builder.hook('GraphQLSchema', (schemaConfig /*, build*/) => {
    return schemaConfig;
    // The following would allow to add custom directives.
    // They can only be used on the server! They are not sent back to clients.
    // return {
    //   ...schemaConfig,
    //   directives: [
    //     ...(schemaConfig.directives || []),
    //     build.newWithHooks(
    //       build.graphql.GraphQLDirective,
    //       {
    //         name: 'upper',
    //         locations: ['FIELD_DEFINITION', 'FIELD'],
    //         args: {
    //           name: { type: build.graphql.GraphQLString },
    //         },
    //       },
    //       { isUpperDirective: true },
    //     ),
    //   ],
    // };
  });
};
