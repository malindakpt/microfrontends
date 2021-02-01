import { makeExtendSchemaPlugin, gql } from 'postgraphile';
import { handledError, inputError } from '../../../../common/errors';
import argon2 = require('argon2');
import generator = require('generate-password');

//this plugin adds a custom mutation to generate tenant admin password
export const GenerateTenantAdminPasswordPlugin = makeExtendSchemaPlugin(
  build => {
    const { pgSql: sql } = build;
    return {
      typeDefs: gql`
        input GenerateTenantAdminPasswordInput {
          id: String!
        }

        type GenerateTenantAdminPasswordPayload {
          tenantAdmin: TenantAdmin @pgField

          """
          Generated password.
          """
          password: String!
        }

        extend type Mutation {
          """
          Generates a new password for a \`TenantAdmin\`.
          """
          generateTenantAdminPassword(
            input: GenerateTenantAdminPasswordInput!
          ): GenerateTenantAdminPasswordPayload
        }
      `,
      resolvers: {
        Mutation: {
          generateTenantAdminPassword: async (
            _query,
            args,
            context,
            resolveInfo,
          ) => {
            const { pgClient } = context;
            try {
              //generate a new password
              const password = generator.generate({
                length: 12,
                numbers: true,
                symbols: false,
              });

              //hash generated password using Argon2id
              const passwordHash = await argon2.hash(password, {
                type: argon2.argon2id,
                memoryCost: 2 ** 16, //64MB
                timeCost: 4,
                parallelism: 1,
              });

              //update database with the password hash
              const {
                rows: [tenantAdmin],
              } = await pgClient.query(
                `UPDATE tenant_administration.tenant_admin SET password_hash = $1, password_changed = FALSE WHERE id = $2 RETURNING *`,
                [passwordHash, args.input.id],
              );

              if (!tenantAdmin)
                return inputError('Tenant Admin does not exist');

              //fetch results requested by the GraphQL client
              const [
                row,
              ] = await resolveInfo.graphile.selectGraphQLResultFromTable(
                sql.fragment`tenant_administration.tenant_admin`,
                (tableAlias, queryBuilder) => {
                  queryBuilder.where(
                    sql.fragment`${tableAlias}.id = ${sql.value(
                      tenantAdmin.id,
                    )}`,
                  );
                },
              );

              return {
                data: row,
                password: password,
              };
            } catch (e) {
              return handledError(e.message);
            }
          },
        },
      },
    };
  },
);
