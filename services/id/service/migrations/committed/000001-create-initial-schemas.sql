--! Previous: -
--! Hash: sha1:195c689b1fd91a6cfe5c4b08bb8e7b2ca5499006
--! Message: create-initial-schemas

-- Grant connect to ${config.dbPgUser} so it can create a connection pool
GRANT CONNECT ON DATABASE ":DB_NAME" TO ":DATABASE_PG_USER";

-- Revoke grants from users on the public schema and only grant it to ${config.dbOwnerName}
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO ":DB_OWNER";

-- Revoke default grants to sequences and functions from all users
ALTER DEFAULT PRIVILEGES REVOKE ALL ON SEQUENCES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES REVOKE ALL ON FUNCTIONS FROM PUBLIC;

-- Create new schema to isolate TenantAdministration objects
DROP SCHEMA IF EXISTS tenant_administration CASCADE;
CREATE SCHEMA tenant_administration;

-- Create new schema to isolate ApplicationAdministration objects
DROP SCHEMA IF EXISTS application_administration CASCADE;
CREATE SCHEMA application_administration;

-- Create new schema to isolate AccessManagement objects
DROP SCHEMA IF EXISTS access_management CASCADE;
CREATE SCHEMA access_management;

-- Create new schema to isolate AuthEndpoint objects
DROP SCHEMA IF EXISTS auth_endpoint CASCADE;
CREATE SCHEMA auth_endpoint;

-- Create new schema for private objects which will never be exposed via postgraphile
DROP SCHEMA IF EXISTS app_private CASCADE;
CREATE SCHEMA app_private;

-- Create new schema for hidden objects which will never be exposed via postgraphile but ${config.dbPgWebUser} will have access to
DROP SCHEMA IF EXISTS app_hidden CASCADE;
CREATE SCHEMA app_hidden;

-- Grant schema usages to ${config.dbPgWebUser}
GRANT USAGE ON SCHEMA public, tenant_administration, application_administration, access_management, auth_endpoint, app_hidden
TO ":DATABASE_PG_WEB_USER";

-- All newly created sequences and functions in following schema will be automatically granted to ${config.dbPgWebUser}
ALTER DEFAULT PRIVILEGES IN SCHEMA public, tenant_administration, application_administration, access_management, auth_endpoint, app_hidden
GRANT USAGE, SELECT ON SEQUENCES TO ":DATABASE_PG_WEB_USER";

ALTER DEFAULT PRIVILEGES IN SCHEMA public, tenant_administration, application_administration, access_management, auth_endpoint, app_hidden
GRANT EXECUTE ON FUNCTIONS TO ":DATABASE_PG_WEB_USER";
