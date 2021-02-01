-- Some extensions require superuser privileges, so we create them before migration time.
-- Also, this code needs to be ran against shadow database as well to successfully apply migrations
-- This means that after-reset sql scripts must be run for both shadow and regular database and we should utilize graphile-migrate reset command
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public; -- used for generation of short unique string values, e.g. salt in extenal_id
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public; -- used for gin indexes which optimize requests that use LIKE/ILIKE operators, e.g. filter by title

GRANT CONNECT ON DATABASE ":DB_NAME" TO ":DATABASE_AUTHENTICATOR";

-- Revoke grants for any user to create objects in the public schema and only allow the ${config.dbOwnerName}
ALTER default privileges REVOKE all ON sequences FROM public;
ALTER default privileges REVOKE all ON functions FROM public;
REVOKE ALL ON SCHEMA public FROM public;
GRANT ALL ON schema public TO ":DB_OWNER";

-- Create new schema to isolate objects that are exposed to postgraphile
CREATE SCHEMA app_public;

-- Create new schema for private objects which will never be exposed to postgraphile
CREATE SCHEMA app_private;

-- Create new schema for hidden objects which will never be exposed to postgraphile but ${config.dbVisitorName} will have access to
CREATE SCHEMA app_hidden;

-- Grant public schema USAGE to ${config.dbVisitorName}
GRANT USAGE ON SCHEMA public, app_public, app_hidden TO ":DATABASE_VISITOR";

-- All newly created sequences and functions will be automatically granted to ${config.dbVisitorName}
ALTER default privileges IN SCHEMA public, app_public, app_hidden GRANT usage, SELECT ON sequences TO ":DATABASE_VISITOR";
ALTER default privileges IN SCHEMA public, app_public, app_hidden GRANT EXECUTE ON functions TO ":DATABASE_VISITOR";

-- make sure the database is set to UTC timezone
ALTER DATABASE ":DB_NAME" SET timezone TO 'UTC';
