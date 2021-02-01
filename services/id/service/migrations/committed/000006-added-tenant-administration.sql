--! Previous: sha1:ed171b385fbb4fb0e4dcbaee2b7f04c6069e941a
--! Hash: sha1:81f400044de3d1e86e4ee64a23179ea6fce4efda
--! Message: added-tenant-administration

-- TYPES - BEGIN
DROP TYPE IF EXISTS tenant_administration.tenant_status CASCADE;
CREATE TYPE tenant_administration.tenant_status AS ENUM ('ENABLED', 'DISABLED');
-- TYPES - END

-- TABLES - BEGIN
-- TABLE - TENANT - BEGIN
DROP TABLE IF EXISTS tenant_administration.tenant CASCADE;
CREATE TABLE tenant_administration.tenant
(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  status tenant_administration.tenant_status NOT NULL DEFAULT 'DISABLED',
  is_root BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT tenant_name_key UNIQUE(name),

  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'Name')),
  CONSTRAINT name_max_length CHECK(app_hidden.constraint_max_length(name, 'Name', 200))
);

ALTER TABLE tenant_administration.tenant ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_root_policy ON tenant_administration.tenant CASCADE;
CREATE POLICY tenant_root_policy ON tenant_administration.tenant FOR ALL
USING (is_root = FALSE)
WITH CHECK (is_root = FALSE);

REVOKE ALL ON TABLE tenant_administration.tenant FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON tenant_administration.tenant TO ":DATABASE_PG_WEB_USER";
GRANT INSERT(name), UPDATE(name, status) ON tenant_administration.tenant TO ":DATABASE_PG_WEB_USER";
-- TABLE - TENANT - END

-- TABLE - TENANT_ADMIN - BEGIN
DROP TABLE IF EXISTS tenant_administration.tenant_admin CASCADE;
CREATE TABLE tenant_administration.tenant_admin
(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT,
  active BOOLEAN NOT NULL DEFAULT FALSE,
  password_changed BOOLEAN NOT NULL DEFAULT FALSE,
  tenant_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT tenant_admin_tenant_id_email_key UNIQUE(tenant_id, email),

  CONSTRAINT tenant_admin_tenant_id_fkey FOREIGN KEY (tenant_id)
  REFERENCES tenant_administration.tenant (id) ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'Name')),
  CONSTRAINT name_max_length CHECK(app_hidden.constraint_max_length(name, 'Name', 200)),
  CONSTRAINT email_format CHECK(app_hidden.constraint_email_format(email, 'Email'))
);

DROP INDEX IF EXISTS fki_tenant_admin_tenant_id_fkey;
CREATE INDEX fki_tenant_admin_tenant_id_fkey ON tenant_administration.tenant_admin (tenant_id);

REVOKE ALL ON TABLE tenant_administration.tenant_admin FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON tenant_administration.tenant_admin TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(name, email, password_hash, tenant_id),
UPDATE(name, email, password_hash, active, password_changed) ON tenant_administration.tenant_admin TO ":DATABASE_PG_WEB_USER";
-- TABLE - TENANT_ADMIN - END
-- TABLES - END

-- TRIGGERS - BEGIN
-- TENANT - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON tenant_administration.tenant CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON tenant_administration.tenant FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON tenant_administration.tenant CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON tenant_administration.tenant FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();
-- TENANT - END

-- TENANT_ADMIN - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON tenant_administration.tenant_admin CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON tenant_administration.tenant_admin FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON tenant_administration.tenant_admin CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON tenant_administration.tenant_admin FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();
-- TENANT_ADMIN - END
-- TRIGGERS - END

-- BASIC DATA - BEGIN
-- TENANT - BEGIN
BEGIN;
  SET LOCAL "axinom.auth.user" TO 'SYSTEM';
  INSERT INTO tenant_administration.tenant (name, status, is_root)
  VALUES ('Axinom IAM', 'ENABLED', TRUE);
COMMIT;
-- TENANT - END
-- BASIC DATA - END
