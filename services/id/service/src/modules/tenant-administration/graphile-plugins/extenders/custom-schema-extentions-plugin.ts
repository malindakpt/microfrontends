import * as argon2 from 'argon2';
import * as fs from 'fs';
import { gql, makeExtendSchemaPlugin } from 'graphile-utils';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

import { ErrorCode } from '../../../../common';
import { config } from '../../../../common/config';
import { ApplicationError } from '../../../../common/errors/types/application.error';
import { EndpointsToPermissionMappings } from '../../security';

const CustomSchemaExtentionsPlugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      input AuthenticateSuperUserInput {
        email: String!
        password: String!
      }

      type AuthenticateSuperUserPayload {
        """
        Access Token containing permissions of the Super User
        """
        accessToken: String!

        """
        Access Token type to use when making client requests
        """
        tokenType: String!

        """
        Access Token expiration timeout
        """
        expiresIn: Int!
      }

      extend type Mutation {
        """
        Authenticates a Identity Service Super User
        """
        authenticateSuperUser(
          input: AuthenticateSuperUserInput
        ): AuthenticateSuperUserPayload!
      }
    `,
    resolvers: {
      Mutation: {
        authenticateSuperUser: async (query, args) => {
          if (args.input.email === config.taSuperUserEmail) {
            const options: argon2.Options & { raw: false } = {
              raw: false,
              type: argon2.argon2id,
              memoryCost: 2 ** 16,
              parallelism: 1,
              timeCost: 3,
            };

            if (
              await argon2.verify(
                config.taSuperUserPasswordHash,
                args.input.password,
                options,
              )
            ) {
              const permissions = Object.keys(
                EndpointsToPermissionMappings,
              ).filter(permission => permission !== 'ANONYMOUS');
              const payload = {
                permissions: {
                  [config.serviceId]: permissions,
                },
                tags: [],
              };

              const privateKey = fs.readFileSync(
                path.resolve(__dirname, './../../../../../keys/private.key'),
                'utf8',
              );

              const signOptions: jwt.SignOptions = {
                issuer: config.serviceId,
                subject: args.input.email,
                audience: 'tenant-administration',
                expiresIn: 60 * 60,
                algorithm: 'RS256',
              };

              return {
                accessToken: jwt.sign(payload, privateKey, signOptions),
                tokenType: 'Bearer',
                expiresIn: signOptions.expiresIn,
              };
            }
          }

          throw new ApplicationError({
            code: ErrorCode.CredentialsInvalid,
            message: 'Invalid email or password',
          });
        },
      },
    },
  };
});

export default CustomSchemaExtentionsPlugin;
