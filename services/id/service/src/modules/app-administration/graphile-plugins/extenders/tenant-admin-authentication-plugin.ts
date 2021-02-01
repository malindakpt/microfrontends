import * as argon2 from 'argon2';
import * as fs from 'fs';
import { gql, makeExtendSchemaPlugin } from 'graphile-utils';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

import { config, ErrorCode } from '../../../../common';
import { ApplicationError } from '../../../../common/errors/types/application.error';
import { ExtendedGraphQLContext } from '../../../../modules/app-administration/middleware';
import { EndpointsToPermissionMappings } from '../../security';

function invalidCredentialsError(message: string): ApplicationError {
  return new ApplicationError({
    code: ErrorCode.CredentialsInvalid,
    message,
  });
}

function contactAdministratorError(
  administratorEmail: string,
): ApplicationError {
  return new ApplicationError({
    code: ErrorCode.ResourceInactive,
    message: `Please contact ID Service administrator [${administratorEmail}] to activate account.`,
  });
}

function getAccessToken(
  tenantId: string,
  name: string,
  email: string,
  expiresIn: number,
): string {
  const permissions = Object.keys(EndpointsToPermissionMappings).filter(
    permission => permission !== 'ANONYMOUS',
  );
  const payload = {
    tenantId,
    name,
    email,
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
    subject: email,
    audience: 'app-administration',
    expiresIn,
    algorithm: 'RS256',
  };

  return jwt.sign(payload, privateKey, signOptions);
}

async function authenticateTenantAdmin(query, args, context): Promise<object> {
  const { pgClient } = context;

  const {
    rows: [tenantAdmin],
  } = await pgClient.query(
    `SELECT t.name as tenant_name, ta.email, ta.name as tenant_admin_name, ta.active, ta.password_hash, ta.password_changed, ta.updated_by
     FROM tenant_administration.tenant_admin ta, tenant_administration.tenant t
     WHERE tenant_id = $1
     AND email = $2
     AND t.id = ta.tenant_id
     AND t.status = 'ENABLED'`,
    [args.input.tenantId, args.input.email],
  );

  if (tenantAdmin) {
    if (tenantAdmin.active) {
      if (await argon2.verify(tenantAdmin.password_hash, args.input.password)) {
        return {
          tenantName: tenantAdmin.tenant_name,
          tenantAdminName: tenantAdmin.tenant_admin_name,
          accessToken: getAccessToken(
            args.input.tenantId,
            tenantAdmin.tenant_admin_name,
            tenantAdmin.email,
            60 * 60,
          ),
          tokenType: 'Bearer',
          expiresIn: 60 * 60,
          passwordChanged: tenantAdmin.password_changed,
        };
      } else {
        throw invalidCredentialsError('Invalid email or password');
      }
    } else {
      throw contactAdministratorError(tenantAdmin.updated_by);
    }
  } else {
    throw invalidCredentialsError(
      'Invalid email or tenant not enabled for usage',
    );
  }
}

async function changeTenantAdminPassword(
  query,
  args,
  context,
): Promise<object> {
  const { pgClient } = context;
  const { user } = context as ExtendedGraphQLContext;

  const {
    rows: [tenantAdmin],
  } = await pgClient.query(
    `SELECT t.name as tenant_name, ta.id, ta.email, ta.name as tenant_admin_name, ta.active, ta.password_hash, ta.updated_by
     FROM tenant_administration.tenant_admin ta, tenant_administration.tenant t
     WHERE tenant_id = $1
     AND email = $2
     AND t.id = ta.tenant_id
     AND t.status = 'ENABLED'
     AND ta.active = TRUE`,
    [user.tenantId, user.email],
  );

  if (tenantAdmin) {
    if (tenantAdmin.active) {
      if (await argon2.verify(tenantAdmin.password_hash, args.input.password)) {
        //hash new password using Argon2id
        const passwordHash = await argon2.hash(args.input.newPassword, {
          type: argon2.argon2id,
          memoryCost: 2 ** 16, //64MB
          timeCost: 4,
          parallelism: 1,
        });

        //update database with the new password hash
        const {
          rows: [updatedTenantAdmin],
        } = await pgClient.query(
          `UPDATE tenant_administration.tenant_admin
           SET password_hash = $1,
               password_changed = TRUE
           WHERE tenant_id = $2
           AND   id = $3 RETURNING *`,
          [passwordHash, user.tenantId, tenantAdmin.id],
        );

        return {
          tenantName: tenantAdmin.tenant_name,
          tenantAdminName: tenantAdmin.tenant_admin_name,
          accessToken: getAccessToken(
            user.tenantId,
            tenantAdmin.tenant_admin_name,
            user.email,
            60 * 60,
          ),
          tokenType: 'Bearer',
          expiresIn: 60 * 60,
          passwordChanged: updatedTenantAdmin.password_changed,
        };
      } else {
        throw invalidCredentialsError('Invalid credentials provided');
      }
    } else {
      throw contactAdministratorError(tenantAdmin.updated_by);
    }
  } else {
    throw invalidCredentialsError(
      'Either the account or the tenant is not enabled for usage',
    );
  }
}

const TenantAdminAuthenticationPlugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      input AuthenticateTenantAdminInput {
        tenantId: UUID!
        email: String!
        password: String!
      }

      input ChangeTenantAdminPasswordInput {
        password: String!
        newPassword: String!
      }

      type AuthenticateTenantAdminPayload {
        """
        Name of the Tenant
        """
        tenantName: String!

        """
        Name of the Tenant Administrator
        """
        tenantAdminName: String!

        """
        Access Token containing permissions of the Tenant Admin
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

        """
        System generated password has been changed
        """
        passwordChanged: Boolean!
      }

      extend type Mutation {
        """
        Authenticates a Identity Service Tenant Admin
        """
        authenticateTenantAdmin(
          input: AuthenticateTenantAdminInput
        ): AuthenticateTenantAdminPayload!

        """
        Change password of a Identity Service Tenant Admin
        """
        changeTenantAdminPassword(
          input: ChangeTenantAdminPasswordInput
        ): AuthenticateTenantAdminPayload!
      }
    `,
    resolvers: {
      Mutation: {
        authenticateTenantAdmin,
        changeTenantAdminPassword,
      },
    },
  };
});

export default TenantAdminAuthenticationPlugin;
