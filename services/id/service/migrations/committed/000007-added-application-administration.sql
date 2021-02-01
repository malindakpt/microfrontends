--! Previous: sha1:81f400044de3d1e86e4ee64a23179ea6fce4efda
--! Hash: sha1:0ea0b438854ad4fc42bdbf283c244ae353bf1436
--! Message: added-application-administration

-- TYPES - BEGIN
DROP TYPE IF EXISTS application_administration.identity_provider CASCADE;
CREATE TYPE application_administration.identity_provider AS ENUM ('AZURE_AD', 'AX_AUTH', 'GOOGLE');
-- TYPES - END

-- TABLE - APPLICATION - BEGIN
DROP TABLE IF EXISTS application_administration.application CASCADE;
CREATE TABLE application_administration.application (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  allowed_origins TEXT[],
  interim_administrator_email TEXT NOT NULL,
  enabled bool NOT NULL DEFAULT FALSE,
  is_root BOOLEAN NOT NULL DEFAULT FALSE,
  tenant_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT application_tenant_id_id_key UNIQUE(tenant_id, id),
  CONSTRAINT application_tenant_id_name_key UNIQUE(tenant_id, name),

  CONSTRAINT application_tenant_id_fkey FOREIGN KEY (tenant_id)
  REFERENCES tenant_administration.tenant (id) ON UPDATE CASCADE ON DELETE RESTRICT,

  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'Name')),
  CONSTRAINT name_max_length CHECK(app_hidden.constraint_max_length(name, 'Name', 100)),
  CONSTRAINT email_format CHECK(app_hidden.constraint_email_format(interim_administrator_email, 'Interim Administrator Email'))
);

SELECT app_private.enable_tenant_rls_on_table('application_administration', 'application');

DROP INDEX IF EXISTS fki_application_tenant_id_fkey;
CREATE INDEX fki_application_tenant_id_fkey ON application_administration.application (tenant_id);

REVOKE ALL ON TABLE application_administration.application FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON application_administration.application TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(name, allowed_origins, interim_administrator_email),
UPDATE(name, allowed_origins, interim_administrator_email, enabled) ON application_administration.application TO ":DATABASE_PG_WEB_USER";
-- TABLE - APPLICATION - END

-- TABLE - IDP_SCOPE - BEGIN
DROP TABLE IF EXISTS application_administration.idp_scope CASCADE;
CREATE TABLE application_administration.idp_scope (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  idp_id application_administration.identity_provider NOT NULL,
  scope_name TEXT NOT NULL,
  required BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE(idp_id, scope_name)
);

REVOKE ALL ON TABLE application_administration.idp_scope FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT ON application_administration.idp_scope TO ":DATABASE_PG_WEB_USER";

-- BASIC DATA - BEGIN
INSERT INTO application_administration.idp_scope (idp_id, scope_name, required) VALUES
('AZURE_AD', 'openid', TRUE),
('AZURE_AD', 'offline_access', TRUE),
('AZURE_AD', 'profile', TRUE),
('AZURE_AD', 'email', TRUE),

('AX_AUTH', 'openid', TRUE),
('AX_AUTH', 'offline_access', TRUE),
('AX_AUTH', 'profile', TRUE),
('AX_AUTH', 'email', TRUE),

('GOOGLE', 'openid', TRUE),
('GOOGLE', 'profile', TRUE),
('GOOGLE', 'email', TRUE);
-- BASIC DATA - END
-- TABLE - IDP_SCOPE - END

-- TABLE - IDP_CONFIGURATION - BEGIN
DROP TABLE IF EXISTS application_administration.idp_configuration CASCADE;
CREATE TABLE application_administration.idp_configuration (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  idp_id application_administration.identity_provider NOT NULL,
  discovery_document_url TEXT NOT NULL,
  client_id TEXT NOT NULL,
  client_secret TEXT NOT NULL,
  scopes TEXT[] NOT NULL,
  enabled bool NOT NULL DEFAULT TRUE,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT idp_configuration_tenant_id_application_id_idp_id_key UNIQUE(tenant_id, application_id, idp_id),

  CONSTRAINT idp_configuration_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT discovery_document_url_not_empty CHECK(app_hidden.constraint_not_empty(discovery_document_url, 'Discovery document URL')),
  CONSTRAINT client_id_not_empty CHECK(app_hidden.constraint_not_empty(client_id, 'Client ID')),
  CONSTRAINT client_id_max_length CHECK(app_hidden.constraint_max_length(client_id, 'Client ID', 100)),
  CONSTRAINT client_secret_not_empty CHECK(app_hidden.constraint_not_empty(client_secret, 'Client Secret')),
  CONSTRAINT client_secret_max_length CHECK(app_hidden.constraint_max_length(client_secret, 'Client Secret', 200))
);

SELECT app_private.enable_tenant_rls_on_table('application_administration', 'idp_configuration');

DROP INDEX IF EXISTS fki_idp_configuration_tenant_id_fkey;
CREATE INDEX fki_idp_configuration_tenant_id_fkey ON application_administration.idp_configuration (tenant_id);
DROP INDEX IF EXISTS fki_idp_configuration_application_id_fkey;
CREATE INDEX fki_idp_configuration_application_id_fkey ON application_administration.idp_configuration (application_id);
DROP INDEX IF EXISTS fki_idp_configuration_tenant_id_application_id_fkey;
CREATE INDEX fki_idp_configuration_tenant_id_application_id_fkey ON application_administration.idp_configuration (tenant_id, application_id);

REVOKE ALL ON TABLE application_administration.idp_configuration FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON application_administration.idp_configuration TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(idp_id, discovery_document_url, client_id, client_secret, scopes, application_id),
UPDATE(discovery_document_url, client_id, client_secret, scopes, enabled) ON application_administration.idp_configuration TO ":DATABASE_PG_WEB_USER";
-- TABLE - IDP_CONFIGURATION - END
-- TABLES - END

-- APPLICATION - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON application_administration.application CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON application_administration.application FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON application_administration.application CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON application_administration.application FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

-- BASIC DATA - BEGIN
-- APPLICATION - BEGIN
BEGIN;
  SET LOCAL "axinom.auth.user" TO 'SYSTEM';
  INSERT INTO application_administration.application (name, interim_administrator_email, enabled, is_root, tenant_id)
  SELECT 'Axinom IAM', 'iam-admin@axinom.com', TRUE, TRUE, t.id FROM tenant_administration.tenant t WHERE t.is_root = TRUE;
COMMIT;
-- APPLICATION - END
-- BASIC DATA - END

DROP TRIGGER IF EXISTS _300_tenant ON application_administration.application CASCADE;
CREATE TRIGGER _300_tenant BEFORE INSERT
ON application_administration.application FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant();
-- APPLICATION - END

-- IDP_CONFIGURATION - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON application_administration.idp_configuration CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON application_administration.idp_configuration FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON application_administration.idp_configuration CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON application_administration.idp_configuration FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

DROP TRIGGER IF EXISTS _300_tenant ON application_administration.idp_configuration CASCADE;
CREATE TRIGGER _300_tenant BEFORE INSERT
ON application_administration.idp_configuration FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant();
-- IDP_CONFIGURATION - END
-- TRIGGERS - END
