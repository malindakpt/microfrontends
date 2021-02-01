import argon2 = require('argon2');
import crypto = require('crypto');
import { gql, makeExtendSchemaPlugin } from 'postgraphile';

import { handledError, inputError } from '../../../../common/errors';

//this plugin adds a custom mutation to generate a client secret for a service account
export const ServiceAccountSecretGeneratorPlugin = makeExtendSchemaPlugin(
  build => {
    const { pgSql: sql } = build;
    return {
      typeDefs: gql`
        input GenerateServiceAccountSecretInput {
          id: String!
        }

        type GenerateServiceAccountSecretPayload {
          serviceAccount: ServiceAccount @pgField

          """
          Generated client secret.
          """
          clientSecret: String!
        }

        extend type Mutation {
          """
          Generates a new client secret for a \`ServiceAccount\`.
          """
          generateServiceAccountSecret(
            input: GenerateServiceAccountSecretInput!
          ): GenerateServiceAccountSecretPayload
        }
      `,
      resolvers: {
        Mutation: {
          generateServiceAccountSecret: async (
            _query,
            args,
            context,
            resolveInfo,
          ) => {
            const { pgClient } = context;
            try {
              //generate a new secret
              const key = crypto.randomBytes(17);
              const secret = key.toString('base64');

              //hash generated secret using Argon2id
              const secretHash = await argon2.hash(secret, {
                type: argon2.argon2id,
                memoryCost: 2 ** 16, //64MB
                timeCost: 4,
                parallelism: 1,
              });

              //update database with the secret hash
              const {
                rows: [serviceAccount],
              } = await pgClient.query(
                `UPDATE access_management.service_account SET client_secret = $1 WHERE id = $2 RETURNING *`,
                [secretHash, args.input.id],
              );

              if (!serviceAccount)
                return inputError('Service Account does not exist');

              //fetch results requested by the GraphQL client
              const [
                row,
              ] = await resolveInfo.graphile.selectGraphQLResultFromTable(
                sql.fragment`access_management.service_account`,
                (tableAlias, queryBuilder) => {
                  queryBuilder.where(
                    sql.fragment`${tableAlias}.id = ${sql.value(
                      serviceAccount.id,
                    )}`,
                  );
                },
              );

              return {
                data: row,
                clientSecret: secret,
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
