import * as argon2 from 'argon2';
import * as fs from 'fs';
import { gql, makeExtendSchemaPlugin } from 'graphile-utils';
import { JWK } from 'jose';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

import { config, ErrorCode } from '../../../../common';
import { ApplicationError } from '../../../../common/errors/types/application.error';

const tokenExpiresIn = 60 * 60;

function invalidCredentialsError(message: string): ApplicationError {
  return new ApplicationError({
    code: ErrorCode.CredentialsInvalid,
    message,
  });
}

function getAccessToken(
  tenantId: string,
  applicationId: string,
  clientId: string,
  name: string,
  permissions: { [serviceId: string]: string[] },
  audience: string,
  expiresIn: number,
): string {
  const payload = {
    tenantId,
    applicationId,
    clientId,
    name,
    permissions,
  };

  const privateKey = fs.readFileSync(
    path.resolve(__dirname, './../../../../../keys/private.key'),
    'utf8',
  );

  const publicKey = JWK.asKey(
    fs.readFileSync(
      path.resolve(__dirname, './../../../../../keys/public.key'),
      'utf8',
    ),
  );

  const signOptions: jwt.SignOptions = {
    issuer: config.serviceId,
    subject: clientId,
    audience: audience,
    expiresIn: expiresIn,
    algorithm: 'RS256',
    keyid: publicKey.kid,
  };

  return jwt.sign(payload, privateKey, signOptions);
}

async function authenticateServiceAccount(
  query,
  args,
  context,
): Promise<object> {
  const { pgClient } = context;
  const { tenantId, applicationId, clientId, clientSecret } = args.input;

  // Setup pgSettings
  await pgClient.query(
    `SELECT set_config('axinom.auth.tenantId', $1, TRUE),
            set_config('axinom.auth.applicationId', $2, TRUE)`,
    [tenantId, applicationId],
  );

  // Verify client id and client secret
  const {
    rows: [serviceAccount],
  } = await pgClient.query(
    `SELECT id, name, client_secret, tenant_id, application_id
    FROM access_management.service_account
    WHERE client_id = $1`,
    [clientId],
  );

  if (serviceAccount) {
    if (await argon2.verify(serviceAccount.client_secret, clientSecret)) {
      // Get permissions for the service account
      const { rows: permissionRows } = await pgClient.query(
        `SELECT p.service_id, p.name
        FROM access_management.service_account_permission sap, access_management.permission p
        WHERE sap.service_account_id = $1 AND sap.permission_id = p.id`,
        [serviceAccount.id],
      );

      // Group permissions by service id
      const permissions: {
        [serviceId: string]: string[];
      } = permissionRows.reduce((result, currentValue) => {
        if (!result[currentValue.service_id])
          result[currentValue.service_id] = [];
        result[currentValue.service_id].push(currentValue.name);
        return result;
      }, {});

      return {
        accessToken: getAccessToken(
          serviceAccount.tenant_id,
          serviceAccount.application_id,
          clientId,
          serviceAccount.name,
          permissions,
          '*',
          tokenExpiresIn,
        ),
        tokenType: 'Bearer',
        expiresIn: tokenExpiresIn,
      };
    } else {
      throw invalidCredentialsError('Invalid Client ID or Client Secret');
    }
  } else {
    throw invalidCredentialsError('Invalid Client ID or Client Secret');
  }
}

// TODO: Move to separate express endpoint so this can only be accessible in internel networks
async function authenticateManagedServiceAccount(
  query,
  args,
  context,
): Promise<object> {
  const { pgClient, dbOwnerPool } = context;
  const { clientId, clientSecret } = args.input;

  // Verify client id and client secret against config values
  if (
    clientId === config.managedServiceClientId &&
    clientSecret === config.managedServiceClientSecret
  ) {
    // Get permissions for managed services
    const { rows: permissionRows } = await pgClient.query(
      `SELECT service_id, name
      FROM access_management.permission
      WHERE from_managed_service = TRUE`,
    );

    // Group permissions by service id
    const permissions: {
      [serviceId: string]: string[];
    } = permissionRows.reduce((result, currentValue) => {
      if (!result[currentValue.service_id])
        result[currentValue.service_id] = [];
      result[currentValue.service_id].push(currentValue.name);
      return result;
    }, {});

    // Get root tenant id and root application id
    const {
      rows: [rootApplication],
    } = await dbOwnerPool.query(
      `SELECT id, tenant_id
      FROM application_administration.application
      WHERE is_root = TRUE`,
    );

    return {
      accessToken: getAccessToken(
        rootApplication.tenant_id,
        rootApplication.id,
        clientId,
        'Managed Service Account',
        permissions,
        'managed-services',
        tokenExpiresIn,
      ),
      tokenType: 'Bearer',
      expiresIn: tokenExpiresIn,
    };
  } else {
    throw invalidCredentialsError('Invalid Client ID or Client Secret');
  }
}

const ServiceAccountAuthenticationPlugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      input AuthenticateManagedServiceAccountInput {
        clientId: String!
        clientSecret: String!
      }

      input AuthenticateServiceAccountInput {
        tenantId: String!
        applicationId: String!
        clientId: String!
        clientSecret: String!
      }

      type AuthenticateServiceAccountPayload {
        """
        Access Token containing permissions of the Service Account
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
        Authenticates a Service Account
        """
        authenticateServiceAccount(
          input: AuthenticateServiceAccountInput
        ): AuthenticateServiceAccountPayload!

        """
        Authenticates a Managed Service Account
        """
        authenticateManagedServiceAccount(
          input: AuthenticateManagedServiceAccountInput
        ): AuthenticateServiceAccountPayload!
      }
    `,
    resolvers: {
      Mutation: {
        authenticateServiceAccount,
        authenticateManagedServiceAccount,
      },
    },
  };
});

export default ServiceAccountAuthenticationPlugin;
