import argon2 = require('argon2');
import crypto = require('crypto');
import * as fs from 'fs';
import { gql, makeExtendSchemaPlugin } from 'graphile-utils';
import { JWK } from 'jose';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import { sql } from 'slonik';

import { config } from '../../../../common';
import { handledError } from '../../../../common/errors';
import { IdentityProvider, User } from '../../../../generated/graphql.types';

// This will be static ID used when creating development time basic data records
const developmentId = '00000000-0000-0000-0000-000000000000';

// eslint-disable-next-line @typescript-eslint/camelcase
const _DEV_setupIdBasicData = async (query, args, context): Promise<object> => {
  const { dbOwnerPool } = context;
  const {
    adminEmail,
    adminPassword,
    googleClientId,
    googleClientSecret,
  } = args.input;

  // Hash the adminPassword
  const adminPasswordHash = await argon2.hash(adminPassword, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 4,
    parallelism: 1,
  });
  try {
    // ** DELETE DATA **

    // Setup Config Values for User
    let pgSettingsQuery = sql`
      SELECT set_config('axinom.auth.user', ${adminEmail}, FALSE),
             set_config('axinom.auth.tenantId', ${developmentId}, FALSE),
             set_config('axinom.auth.applicationId', ${developmentId}, FALSE)
    `;
    await dbOwnerPool.query(pgSettingsQuery.sql, pgSettingsQuery.values);

    // Delete Application
    const deleteApplicationQuery = sql`
      DELETE FROM application_administration.application
      WHERE tenant_id = ${developmentId};
    `;
    await dbOwnerPool.query(
      deleteApplicationQuery.sql,
      deleteApplicationQuery.values,
    );

    // Delete Tenant
    const deleteTenantQuery = sql`
      DELETE FROM tenant_administration.tenant
      WHERE id = ${developmentId};
    `;
    await dbOwnerPool.query(deleteTenantQuery.sql, deleteTenantQuery.values);

    // ** INSERT DATA **

    // Setup Config Values for Tenant & Tenant Admin
    pgSettingsQuery = sql`
      SELECT set_config('axinom.auth.user', ${adminEmail}, FALSE)
    `;
    await dbOwnerPool.query(pgSettingsQuery.sql, pgSettingsQuery.values);

    // Create Tenant
    const createTenantQuery = sql`
      INSERT INTO tenant_administration.tenant (id, name, status)
      VALUES (${developmentId}, 'Local Development Tenant', 'ENABLED') RETURNING *;
    `;

    const {
      rows: [tenant],
    } = await dbOwnerPool.query(
      createTenantQuery.sql,
      createTenantQuery.values,
    );

    // Create Tenant Administrator
    const createTenantAdministratorQuery = sql`
      INSERT INTO tenant_administration.tenant_admin (id, tenant_id, name, email, password_hash, active, password_changed)
      VALUES (${developmentId}, ${tenant.id}, 'Tenant Administrator', ${adminEmail}, ${adminPasswordHash}, TRUE, TRUE) RETURNING *;
    `;

    await dbOwnerPool.query(
      createTenantAdministratorQuery.sql,
      createTenantAdministratorQuery.values,
    );

    // Setup Config Values for Application & IDP Configuration
    pgSettingsQuery = sql`
      SELECT set_config('axinom.auth.user', ${adminEmail}, FALSE),
             set_config('axinom.auth.tenantId', ${tenant.id}, FALSE)
    `;
    await dbOwnerPool.query(pgSettingsQuery.sql, pgSettingsQuery.values);

    // Create Application
    const createApplicationQuery = sql`
      INSERT INTO application_administration.application (id, name, allowed_origins, interim_administrator_email, enabled)
      VALUES (${developmentId}, 'Local Development Application', '{}', ${adminEmail}, TRUE) RETURNING *;
    `;

    const {
      rows: [application],
    } = await dbOwnerPool.query(
      createApplicationQuery.sql,
      createApplicationQuery.values,
    );

    // Create IDP Configuration - GOOGLE
    const createGoogleIdpQuery = sql`
      INSERT INTO application_administration.idp_configuration
      (id, application_id, idp_id, discovery_document_url , client_id, client_secret, scopes, enabled)
      VALUES
      (${developmentId}, ${application.id}, ${IdentityProvider.GOOGLE}, 'https://accounts.google.com/.well-known/openid-configuration', ${googleClientId}, ${googleClientSecret}, '{"openid", "profile", "email"}', TRUE);
    `;

    await dbOwnerPool.query(
      createGoogleIdpQuery.sql,
      createGoogleIdpQuery.values,
    );

    // Setup Config Values for User
    pgSettingsQuery = sql`
      SELECT set_config('axinom.auth.user', ${adminEmail}, FALSE),
             set_config('axinom.auth.tenantId', ${tenant.id}, FALSE),
             set_config('axinom.auth.applicationId', ${application.id}, FALSE)
    `;
    await dbOwnerPool.query(pgSettingsQuery.sql, pgSettingsQuery.values);

    // Create User
    const createUserQuery = sql`
      INSERT INTO access_management.user(id, name, email, status)
      VALUES (${developmentId}, 'Local Development User', ${adminEmail}, 'ACTIVE') RETURNING *;
    `;

    await dbOwnerPool.query(createUserQuery.sql, createUserQuery.values);

    return {
      tenantId: tenant.id,
      applicationId: application.id,
    };
  } catch (error) {
    return handledError(error.message);
  }
};

const getDevApplicationInfo = async (
  dbOwnerPool,
): Promise<{
  tenantId: string;
  applicationId: string;
  adminEmail: string;
}> => {
  const sqlQuery = sql`
    SELECT id, tenant_id, interim_administrator_email
    FROM application_administration.application
    WHERE id = ${developmentId}
  `;

  const {
    rows: [devApplication],
  } = await dbOwnerPool.query(sqlQuery.sql, sqlQuery.values);

  return devApplication
    ? {
        tenantId: devApplication.tenant_id,
        applicationId: devApplication.id,
        adminEmail: devApplication.interim_administrator_email,
      }
    : undefined;
};

// eslint-disable-next-line @typescript-eslint/camelcase
const _DEV_createServiceAccount = async (
  query,
  args,
  context,
): Promise<object> => {
  const { pgClient, dbOwnerPool } = context;
  const { serviceAccountName } = args.input;

  try {
    const devApplication = await getDevApplicationInfo(dbOwnerPool);
    if (!devApplication) {
      throw new Error(
        'Basic Data has not been setup. Please run the [_DEV_setupIdBasicData] mutation.',
      );
    }

    // Setup Config Values for Service Account
    const pgSettingsQuery = sql`
    SELECT  set_config('axinom.auth.user', ${devApplication.adminEmail}, TRUE),
            set_config('axinom.auth.tenantId', ${devApplication.tenantId}, TRUE),
            set_config('axinom.auth.applicationId', ${devApplication.applicationId}, TRUE)
    `;
    await pgClient.query(pgSettingsQuery.sql, pgSettingsQuery.values);

    // Delete & Create new Service Account with given name
    const deleteQuery = sql`
      DELETE FROM access_management.service_account WHERE name = ${serviceAccountName}
    `;
    await pgClient.query(deleteQuery.sql, deleteQuery.values);

    const insertQuery = sql`
      INSERT INTO access_management.service_account (name) VALUES (${serviceAccountName}) RETURNING *
    `;
    const {
      rows: [serviceAccount],
    } = await pgClient.query(insertQuery.sql, insertQuery.values);

    // Generate random clientSecret
    const clientSecret = crypto.randomBytes(16).toString('base64');

    // Get Argon2id hash of the clientSecret
    const clientSecretHash = await argon2.hash(clientSecret, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 4,
      parallelism: 1,
    });

    // Update Service Account hash on DB
    const updateClientSecretHashQuery = sql`
      UPDATE access_management.service_account
      SET client_secret = ${clientSecretHash}
      WHERE id = ${serviceAccount.id} RETURNING *
    `;
    await pgClient.query(
      updateClientSecretHashQuery.sql,
      updateClientSecretHashQuery.values,
    );

    // Assign the permissions to the Service Account - just SYNCHRONIZE_PERMISSIONS should be enough for now
    const assignPermissionQuery = sql`
      INSERT INTO access_management.service_account_permission (service_account_id, permission_id)
      (
        SELECT ${serviceAccount.id}, p.id
        FROM access_management.permission p
        WHERE p.name = ${'SYNCHRONIZE_PERMISSIONS'}
      )
    `;
    await pgClient.query(
      assignPermissionQuery.sql,
      assignPermissionQuery.values,
    );

    return {
      tenantId: devApplication.tenantId,
      applicationId: devApplication.applicationId,
      serviceAccountName,
      clientId: serviceAccount.client_id,
      clientSecret: clientSecret,
    };
  } catch (error) {
    return handledError(error.message);
  }
};

const generateAccessToken = (
  tenantId: string,
  applicationId: string,
  user: User,
  permissions: { [serviceId: string]: [string] },
  tags: string[],
  audience: string,
  expiresIn: number,
): string => {
  const payload = {
    tenantId,
    applicationId,
    userId: user.id,
    name: user.name,
    email: user.email,
    permissions,
    tags,
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
    subject: user.id,
    audience: audience,
    expiresIn: expiresIn,
    algorithm: 'RS256',
    keyid: publicKey.kid,
  };

  return jwt.sign(payload, privateKey, signOptions);
};

// eslint-disable-next-line @typescript-eslint/camelcase
const _DEV_generateUserAccessToken = async (
  query,
  args,
  context,
): Promise<object> => {
  const { dbOwnerPool, pgClient } = context;

  try {
    const devApplication = await getDevApplicationInfo(dbOwnerPool);
    if (!devApplication) {
      throw new Error(
        'Basic Data has not been setup. Please run the [_DEV_setupIdBasicData] mutation.',
      );
    }

    // Setup Config Values for User
    const pgSettingsQuery = sql`
    SELECT  set_config('axinom.auth.user', ${devApplication.adminEmail}, TRUE),
            set_config('axinom.auth.tenantId', ${devApplication.tenantId}, TRUE),
            set_config('axinom.auth.applicationId', ${devApplication.applicationId}, TRUE)
    `;
    await pgClient.query(pgSettingsQuery.sql, pgSettingsQuery.values);

    // Get dev user details
    const userQuery = sql`
      SELECT *
      FROM access_management.user
      WHERE tenant_id = ${devApplication.tenantId}
      AND   application_id = ${devApplication.applicationId}
      AND   id = ${developmentId}
    `;
    const {
      rows: [user],
    } = await pgClient.query(userQuery.sql, userQuery.values);

    const tokenExpirationInSeconds = 60 * 60 * 24 * 30; // 30 Days

    // Restructure permissions as we need in the accessToken
    const permissions = args.input.permissionStructure.reduce(
      (groupedPermissions, servicePermissions) => {
        groupedPermissions[servicePermissions.serviceId] =
          servicePermissions.permissions;
        return groupedPermissions;
      },
      {},
    );

    return {
      accessToken: generateAccessToken(
        devApplication.tenantId,
        devApplication.applicationId,
        user,
        permissions,
        args.input.tags,
        '*',
        tokenExpirationInSeconds,
      ),
      tokenType: 'Bearer',
      expiresIn: tokenExpirationInSeconds,
    };
  } catch (error) {
    return handledError(error.message);
  }
};

// This plugin is only for DEVELOPMENT
export const DevIntegrationUtilsPlugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      input SetupDevBasicDataInput {
        """
        Email given here will be setup as the tenant administrator email, as well as user administrator email.
        """
        adminEmail: String!
        """
        Password given here will be setup as the tenant administrator password.
        """
        adminPassword: String!
        """
        Google IDP Configuration - Client ID.
        """
        googleClientId: String!
        """
        Google IDP Configuration - Client Secret.
        """
        googleClientSecret: String!
      }

      type SetupDevBasicDataPayload {
        """
        Development Tenant ID to be used in ID Service integration.
        """
        tenantId: String!
        """
        Development Application ID to be used in ID Service integration.
        """
        applicationId: String!
      }

      input CreateDevServiceAccountInput {
        serviceAccountName: String!
      }

      type CreateDevServiceAccountPayload {
        tenantId: String!
        applicationId: String!
        serviceAccountName: String!
        clientId: String!
        clientSecret: String!
      }

      input DevPermissionStructureInput {
        serviceId: String!
        permissions: [String]
      }

      input GenerateDevAccessTokenInput {
        """
        Example:

        permissionStructure: [
          {
            serviceId: "media-service",
            permissions: ["ADMIN", "MOVIE_EDITOR"]
          },
          {
            serviceId: "video-service",
            permissions: ["ADMIN", "VIDEO_EDITOR"]
          }
        ]
        """
        permissionStructure: [DevPermissionStructureInput]
        """
        Example:

        tags: ["LK_MANAGER", "DE_MANAGER"]
        """
        tags: [String]
      }

      type GenerateDevAccessTokenPayload {
        accessToken: String!
        tokenType: String!
        expiresIn: Int!
      }

      extend type Mutation {
        """
        Creates development-time tenant, application & idp-configuration basic data. Re-running will reset all data.
        """
        _DEV_setupIdBasicData(
          input: SetupDevBasicDataInput!
        ): SetupDevBasicDataPayload

        """
        Creates a development-time service account with SYNCHRONIZE_PERMISSIONS granted.
        """
        _DEV_createServiceAccount(
          input: CreateDevServiceAccountInput!
        ): CreateDevServiceAccountPayload

        """
        Generates development-time user access tokens with specified PERMISSIONS.
        """
        _DEV_generateUserAccessToken(
          input: GenerateDevAccessTokenInput!
        ): GenerateDevAccessTokenPayload
      }
    `,
    resolvers: {
      Mutation: {
        // This mutation is only meant to be used during DEVELOPMENT for setting up id-service basic data
        // eslint-disable-next-line @typescript-eslint/camelcase
        _DEV_setupIdBasicData,

        // This mutation is only meant to be used during DEVELOPMENT for quickly generating fake servie accounts
        // eslint-disable-next-line @typescript-eslint/camelcase
        _DEV_createServiceAccount,

        // This mutation is only meant to be used during DEVELOPMENT for quickly generating fake user access tokens
        // eslint-disable-next-line @typescript-eslint/camelcase
        _DEV_generateUserAccessToken,
      },
    },
  };
});
