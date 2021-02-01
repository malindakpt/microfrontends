--! Previous: sha1:0ea0b438854ad4fc42bdbf283c244ae353bf1436
--! Hash: sha1:70ced491e5ebc193dfd0961000371974e88f4b49
--! Message: added-access-management

-- TYPES - BEGIN
DROP TYPE IF EXISTS access_management.user_status CASCADE;
CREATE TYPE access_management.user_status AS ENUM ('ACTIVE', 'BLOCKED');
-- TYPES - END

-- TABLES - BEGIN
-- TABLE - USER - BEGIN
DROP TABLE IF EXISTS access_management.user CASCADE;
CREATE TABLE access_management.user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  profile_picture_url TEXT,
  email TEXT NOT NULL,
  status access_management.user_status NOT NULL DEFAULT 'BLOCKED',
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT user_tenant_id_application_id_id_key UNIQUE(tenant_id, application_id, id),
  CONSTRAINT user_tenant_id_application_id_email_key UNIQUE(tenant_id, application_id, email),

  CONSTRAINT user_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'Name')),
  CONSTRAINT name_max_length CHECK(app_hidden.constraint_max_length(name, 'Name', 200)),
  CONSTRAINT profile_picture_url_not_empty CHECK(app_hidden.constraint_not_empty(profile_picture_url, 'Profile Picture URL')),
  CONSTRAINT profile_picture_url_max_length CHECK(app_hidden.constraint_max_length(profile_picture_url, 'Profile Picture URL', 2000)),
  CONSTRAINT email_format CHECK(app_hidden.constraint_email_format(email, 'Email'))
);

SELECT app_private.enable_tenant_application_rls_on_table('access_management', 'user');

DROP INDEX IF EXISTS fki_user_tenant_id_fkey;
CREATE INDEX fki_user_tenant_id_fkey ON access_management.user (tenant_id);
DROP INDEX IF EXISTS fki_user_application_id_fkey;
CREATE INDEX fki_user_application_id_fkey ON access_management.user (application_id);
DROP INDEX IF EXISTS fki_user_tenant_id_application_id_fkey;
CREATE INDEX fki_user_tenant_id_application_id_fkey ON access_management.user (tenant_id, application_id);

REVOKE ALL ON TABLE access_management.user FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON access_management.user TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(name, profile_picture_url, email, status),
UPDATE(name, profile_picture_url, status) ON access_management.user TO ":DATABASE_PG_WEB_USER";
-- TABLE - USER - END

-- TABLE - USER_ROLE - BEGIN
DROP TABLE IF EXISTS access_management.user_role CASCADE;
CREATE TABLE access_management.user_role (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,
  
  CONSTRAINT user_role_tenant_id_application_id_name_key UNIQUE(tenant_id, application_id, name),

  CONSTRAINT user_role_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'Name')),
  CONSTRAINT name_max_length CHECK(app_hidden.constraint_max_length(name, 'Name', 200)),
  CONSTRAINT description_not_empty CHECK(app_hidden.constraint_not_empty(description, 'Description')),
  CONSTRAINT description_max_length CHECK(app_hidden.constraint_max_length(description, 'Description', 2000))
);

SELECT app_private.enable_tenant_application_rls_on_table('access_management', 'user_role');

DROP INDEX IF EXISTS fki_user_role_tenant_id_fkey;
CREATE INDEX fki_user_role_tenant_id_fkey ON access_management.user_role (tenant_id);
DROP INDEX IF EXISTS fki_user_role_application_id_fkey;
CREATE INDEX fki_user_role_application_id_fkey ON access_management.user_role (application_id);
DROP INDEX IF EXISTS fki_user_role_tenant_id_application_id_fkey;
CREATE INDEX fki_user_role_tenant_id_application_id_fkey ON access_management.user_role (tenant_id, application_id);

REVOKE ALL ON TABLE access_management.user_role FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON access_management.user_role TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(name, description),
UPDATE(name, description) ON access_management.user_role TO ":DATABASE_PG_WEB_USER";
-- TABLE - USER_ROLE - END

-- TABLE - USER_ROLE_PARENT - BEGIN
DROP TABLE IF EXISTS access_management.user_role_parent CASCADE;
CREATE TABLE access_management.user_role_parent (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_role_id UUID NOT NULL,
  parent_user_role_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT user_role_parent_user_role_id_parent_user_role_id_key UNIQUE(tenant_id, application_id, user_role_id, parent_user_role_id),

  CONSTRAINT user_role_parent_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_role_parent_user_role_id_fkey FOREIGN KEY (user_role_id)
  REFERENCES access_management.user_role (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_role_parent_parent_user_role_id_fkey FOREIGN KEY (parent_user_role_id)
  REFERENCES access_management.user_role (id) ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT app_private.enable_tenant_application_rls_on_table('access_management', 'user_role_parent');

DROP INDEX IF EXISTS fki_user_role_parent_user_role_id_fkey;
CREATE INDEX fki_user_role_parent_user_role_id_fkey ON access_management.user_role_parent (user_role_id);
DROP INDEX IF EXISTS fki_user_role_parent_parent_user_role_id_fkey;
CREATE INDEX fki_user_role_parent_parent_user_role_id_fkey ON access_management.user_role_parent (parent_user_role_id);
DROP INDEX IF EXISTS fki_user_role_parent_tenant_id_fkey;
CREATE INDEX fki_user_role_parent_tenant_id_fkey ON access_management.user_role_parent (tenant_id);
DROP INDEX IF EXISTS fki_user_role_parent_application_id_fkey;
CREATE INDEX fki_user_role_parent_application_id_fkey ON access_management.user_role_parent (application_id);

REVOKE ALL ON TABLE access_management.user_role_parent FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON access_management.user_role_parent TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(user_role_id, parent_user_role_id) ON access_management.user_role_parent TO ":DATABASE_PG_WEB_USER";
-- TABLE - USER_ROLE_PARENT - END

-- TABLE - USER_ROLE_ASSIGNMENT - BEGIN
DROP TABLE IF EXISTS access_management.user_role_assignment CASCADE;
CREATE TABLE access_management.user_role_assignment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  user_role_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT user_role_assignment_user_id_user_role_id_key UNIQUE(tenant_id, application_id, user_id, user_role_id),

  CONSTRAINT user_role_assignment_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_role_assignment_user_id_fkey FOREIGN KEY (user_id)
  REFERENCES access_management.user (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_role_assignment_user_role_id_fkey FOREIGN KEY (user_role_id)
  REFERENCES access_management.user_role (id) ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT app_private.enable_tenant_application_rls_on_table('access_management', 'user_role_assignment');

DROP INDEX IF EXISTS fki_user_role_assignment_user_id_fkey;
CREATE INDEX fki_user_role_assignment_user_id_fkey ON access_management.user_role_assignment (user_id);
DROP INDEX IF EXISTS fki_user_role_assignment_user_role_id_fkey;
CREATE INDEX fki_user_role_assignment_user_role_id_fkey ON access_management.user_role_assignment (user_role_id);
DROP INDEX IF EXISTS fki_user_role_assignment_tenant_id_fkey;
CREATE INDEX fki_user_role_assignment_tenant_id_fkey ON access_management.user_role_assignment (tenant_id);
DROP INDEX IF EXISTS fki_user_role_assignment_application_id_fkey;
CREATE INDEX fki_user_role_assignment_application_id_fkey ON access_management.user_role_assignment (application_id);

REVOKE ALL ON TABLE access_management.user_role_assignment FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON access_management.user_role_assignment TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(user_id, user_role_id) ON access_management.user_role_assignment TO ":DATABASE_PG_WEB_USER";
-- TABLE - USER_ROLE_ASSIGNMENT - END

-- TABLE - TAG - BEGIN
DROP TABLE IF EXISTS access_management.tag CASCADE;
CREATE TABLE access_management.tag (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT tag_tenant_id_application_id_name_key UNIQUE(tenant_id, application_id, name),

  CONSTRAINT tag_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'Name')),
  CONSTRAINT name_max_length CHECK(app_hidden.constraint_max_length(name, 'Name', 100)),
  CONSTRAINT description_not_empty CHECK(app_hidden.constraint_not_empty(description, 'Description')),
  CONSTRAINT description_max_length CHECK(app_hidden.constraint_max_length(description, 'Description', 2000))
);

SELECT app_private.enable_tenant_application_rls_on_table('access_management', 'tag');

DROP INDEX IF EXISTS fki_tag_tenant_id_fkey;
CREATE INDEX fki_tag_tenant_id_fkey ON access_management.tag (tenant_id);
DROP INDEX IF EXISTS fki_tag_application_id_fkey;
CREATE INDEX fki_tag_application_id_fkey ON access_management.tag (application_id);

REVOKE ALL ON TABLE access_management.tag FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON access_management.tag TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(name, description),
UPDATE(name, description) ON access_management.tag TO ":DATABASE_PG_WEB_USER";
-- TABLE - TAG - END

-- TABLE - USER_ROLE_TAG - BEGIN
DROP TABLE IF EXISTS access_management.user_role_tag CASCADE;
CREATE TABLE access_management.user_role_tag (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_role_id UUID NOT NULL,
  tag_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT user_role_tag_user_role_id_tag_id_key UNIQUE(tenant_id, application_id, user_role_id, tag_id),

  CONSTRAINT user_role_tag_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_role_tag_user_role_id_fkey FOREIGN KEY (user_role_id)
  REFERENCES access_management.user_role (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_role_tag_tag_id_fkey FOREIGN KEY (tag_id)
  REFERENCES access_management.tag (id) ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT app_private.enable_tenant_application_rls_on_table('access_management', 'user_role_tag');

DROP INDEX IF EXISTS fki_user_role_tag_user_role_id_fkey;
CREATE INDEX fki_user_role_tag_user_role_id_fkey ON access_management.user_role_tag (user_role_id);
DROP INDEX IF EXISTS fki_user_role_tag_tag_id_fkey;
CREATE INDEX fki_user_role_tag_tag_id_fkey ON access_management.user_role_tag (tag_id);
DROP INDEX IF EXISTS fki_user_role_tag_tenant_id_fkey;
CREATE INDEX fki_user_role_tag_tenant_id_fkey ON access_management.user_role_tag (tenant_id);
DROP INDEX IF EXISTS fki_user_role_tag_application_id_fkey;
CREATE INDEX fki_user_role_tag_application_id_fkey ON access_management.user_role_tag (application_id);

REVOKE ALL ON TABLE access_management.user_role_tag FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON access_management.user_role_tag TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(user_role_id, tag_id) ON access_management.user_role_tag TO ":DATABASE_PG_WEB_USER";
-- TABLE - USER_ROLE_TAG - END

-- TABLE - PERMISSION - BEGIN
DROP TABLE IF EXISTS access_management.permission CASCADE;
CREATE TABLE access_management.permission (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id TEXT NOT NULL,
  name TEXT NOT NULL,
  from_managed_service BOOLEAN NOT NULL DEFAULT FALSE,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT permission_service_id_name_key UNIQUE(tenant_id, application_id, service_id, name),

  CONSTRAINT permission_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT service_id_not_empty CHECK(app_hidden.constraint_not_empty(service_id, 'Service ID')),
  CONSTRAINT service_id_max_length CHECK(app_hidden.constraint_max_length(service_id, 'Service ID', 50)),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'Name')),
  CONSTRAINT name_max_length CHECK(app_hidden.constraint_max_length(name, 'Name', 100))
);

ALTER TABLE access_management.permission ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS permission_managed_service_policy ON access_management.permission CASCADE;
CREATE POLICY permission_managed_service_policy ON access_management.permission FOR SELECT
USING (from_managed_service = TRUE);

SELECT app_private.enable_tenant_application_rls_on_table('access_management', 'permission');

DROP INDEX IF EXISTS fki_permission_tenant_id_fkey;
CREATE INDEX fki_permission_tenant_id_fkey ON access_management.permission (tenant_id);
DROP INDEX IF EXISTS fki_permission_application_id_fkey;
CREATE INDEX fki_permission_application_id_fkey ON access_management.permission (application_id);

REVOKE ALL ON TABLE access_management.permission FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON access_management.permission TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(service_id, name, from_managed_service) ON access_management.permission TO ":DATABASE_PG_WEB_USER";
-- TABLE - PERMISSION - END

-- TABLE - USER_ROLE_PERMISSION - BEGIN
DROP TABLE IF EXISTS access_management.user_role_permission CASCADE;

CREATE TABLE access_management.user_role_permission (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_role_id UUID NOT NULL,
  permission_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT user_role_permission_user_role_id_permission_id_key UNIQUE(tenant_id, application_id, user_role_id, permission_id),

  CONSTRAINT user_role_permission_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_role_permission_user_role_id_fkey FOREIGN KEY (user_role_id)
  REFERENCES access_management.user_role (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_role_permission_permission_id_fkey FOREIGN KEY (permission_id)
  REFERENCES access_management.permission (id) ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT app_private.enable_tenant_application_rls_on_table('access_management', 'user_role_permission');

DROP INDEX IF EXISTS fki_user_role_permission_user_role_id_fkey;
CREATE INDEX fki_user_role_permission_user_role_id_fkey ON access_management.user_role_permission (user_role_id);
DROP INDEX IF EXISTS fki_user_role_permission_permission_id_fkey;
CREATE INDEX fki_user_role_permission_permission_id_fkey ON access_management.user_role_permission (permission_id);
DROP INDEX IF EXISTS fki_user_role_permission_tenant_id_fkey;
CREATE INDEX fki_user_role_permission_tenant_id_fkey ON access_management.user_role_permission (tenant_id);
DROP INDEX IF EXISTS fki_user_role_permission_application_id_fkey;
CREATE INDEX fki_user_role_permission_application_id_fkey ON access_management.user_role_permission (application_id);

REVOKE ALL ON TABLE access_management.user_role_permission FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON access_management.user_role_permission TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(user_role_id, permission_id) ON access_management.user_role_permission TO ":DATABASE_PG_WEB_USER";
-- TABLE - USER_ROLE_PERMISSION - END

-- TABLE - SERVICE_ACCOUNT - BEGIN
DROP TABLE IF EXISTS access_management.service_account CASCADE;
CREATE TABLE access_management.service_account (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  client_id TEXT NOT NULL DEFAULT uuid_generate_v4(),
  client_secret TEXT,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT service_account_tenant_id_application_id_name_key UNIQUE(tenant_id, application_id, name),

  CONSTRAINT service_account_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'Name')),
  CONSTRAINT name_max_length CHECK(app_hidden.constraint_max_length(name, 'Name', 100))
);

SELECT app_private.enable_tenant_application_rls_on_table('access_management', 'service_account');

DROP INDEX IF EXISTS fki_service_account_tenant_id_fkey;
CREATE INDEX fki_service_account_tenant_id_fkey ON access_management.service_account (tenant_id);
DROP INDEX IF EXISTS fki_service_account_application_id_fkey;
CREATE INDEX fki_service_account_application_id_fkey ON access_management.service_account (application_id);
DROP INDEX IF EXISTS fki_service_account_tenant_id_application_id_fkey;
CREATE INDEX fki_service_account_tenant_id_application_id_fkey ON access_management.service_account (tenant_id, application_id);

REVOKE ALL ON TABLE access_management.service_account FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON access_management.service_account TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(name),
UPDATE(name, client_secret) ON access_management.service_account TO ":DATABASE_PG_WEB_USER";
-- TABLE - SERVICE_ACCOUNT - END

-- TABLE - SERVICE_ACCOUNT_PERMISSION - BEGIN
DROP TABLE IF EXISTS access_management.service_account_permission CASCADE;
CREATE TABLE access_management.service_account_permission (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_account_id UUID NOT NULL,
  permission_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NOT NULL,

  CONSTRAINT service_account_permission_service_account_id_permission_id_key UNIQUE(tenant_id, application_id, service_account_id, permission_id),

  CONSTRAINT service_account_permission_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT service_account_permission_service_account_id_fkey FOREIGN KEY (service_account_id)
  REFERENCES access_management.service_account (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT service_account_permission_permission_id_fkey FOREIGN KEY (permission_id)
  REFERENCES access_management.permission (id) ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT app_private.enable_tenant_application_rls_on_table('access_management', 'service_account_permission');

DROP INDEX IF EXISTS fki_service_account_permission_service_account_id_fkey;
CREATE INDEX fki_service_account_permission_service_account_id_fkey ON access_management.service_account_permission (service_account_id);
DROP INDEX IF EXISTS fki_service_account_permission_permission_id_fkey;
CREATE INDEX fki_service_account_permission_permission_id_fkey ON access_management.service_account_permission (permission_id);
DROP INDEX IF EXISTS fki_service_account_permission_tenant_id_fkey;
CREATE INDEX fki_service_account_permission_tenant_id_fkey ON access_management.service_account_permission (tenant_id);
DROP INDEX IF EXISTS fki_service_account_permission_application_id_fkey;
CREATE INDEX fki_service_account_permission_application_id_fkey ON access_management.service_account_permission (application_id);

REVOKE ALL ON TABLE access_management.service_account_permission FROM ":DATABASE_PG_WEB_USER";
GRANT SELECT, DELETE ON access_management.service_account_permission TO ":DATABASE_PG_WEB_USER";
GRANT
INSERT(service_account_id, permission_id) ON access_management.service_account_permission TO ":DATABASE_PG_WEB_USER";
-- TABLE - SERVICE_ACCOUNT_PERMISSION - END
-- TABLES - END

-- TRIGGERS - BEGIN
-- USER - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON access_management.user CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON access_management.user FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON access_management.user CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON access_management.user FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

DROP TRIGGER IF EXISTS _300_tenant_app_auth ON access_management.user CASCADE;
CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON access_management.user FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- USER - END

-- USER_ROLE - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON access_management.user_role CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON access_management.user_role FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON access_management.user_role CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON access_management.user_role FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

DROP TRIGGER IF EXISTS _300_tenant_app_auth ON access_management.user_role CASCADE;
CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON access_management.user_role FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- USER_ROLE - END

-- USER_ROLE_PARENT - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON access_management.user_role_parent CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON access_management.user_role_parent FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON access_management.user_role_parent CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON access_management.user_role_parent FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

DROP TRIGGER IF EXISTS _300_tenant_app_auth ON access_management.user_role_parent CASCADE;
CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON access_management.user_role_parent FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- USER_ROLE_PARENT - END

-- TAG - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON access_management.tag CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON access_management.tag FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON access_management.tag CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON access_management.tag FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

DROP TRIGGER IF EXISTS _300_tenant_app_auth ON access_management.tag CASCADE;
CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON access_management.tag FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- TAG - END

-- USER_ROLE_TAG - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON access_management.user_role_tag CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON access_management.user_role_tag FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON access_management.user_role_tag CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON access_management.user_role_tag FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

DROP TRIGGER IF EXISTS _300_tenant_app_auth ON access_management.user_role_tag CASCADE;
CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON access_management.user_role_tag FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- USER_ROLE_TAG - END

-- USER_ROLE_ASSIGNMENT - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON access_management.user_role_assignment CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON access_management.user_role_assignment FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON access_management.user_role_assignment CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON access_management.user_role_assignment FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

DROP TRIGGER IF EXISTS _300_tenant_app_auth ON access_management.user_role_assignment CASCADE;
CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON access_management.user_role_assignment FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- USER_ROLE_ASSIGNMENT - END

-- PERMISSION - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON access_management.permission CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON access_management.permission FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON access_management.permission CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON access_management.permission FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

-- BASIC DATA - BEGIN
BEGIN;
  SET LOCAL "axinom.auth.user" TO 'SYSTEM';
  INSERT INTO access_management.permission (service_id, name, from_managed_service, tenant_id, application_id)
  SELECT 'id-service', 'SYNCHRONIZE_PERMISSIONS', TRUE, t.id, a.id
  FROM tenant_administration.tenant t, application_administration.application a
  WHERE t.id = a.tenant_id
  AND   t.is_root = TRUE;
COMMIT;
-- BASIC DATA - END

DROP TRIGGER IF EXISTS _300_tenant_app_auth ON access_management.permission CASCADE;
CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON access_management.permission FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- PERMISSION - END

-- USER_ROLE_PERMISSION - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON access_management.user_role_permission CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON access_management.user_role_permission FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON access_management.user_role_permission CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON access_management.user_role_permission FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

DROP TRIGGER IF EXISTS _300_tenant_app_auth ON access_management.user_role_permission CASCADE;
CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON access_management.user_role_permission FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- USER_ROLE_PERMISSION - END

-- SERVICE_ACCOUNT - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON access_management.service_account CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON access_management.service_account FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON access_management.service_account CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON access_management.service_account FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

DROP TRIGGER IF EXISTS _300_tenant_app_auth ON access_management.service_account CASCADE;
CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON access_management.service_account FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- SERVICE_ACCOUNT - END

-- SERVICE_ACCOUNT_PERMISSION - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON access_management.service_account_permission CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON access_management.service_account_permission FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_usernames ON access_management.service_account_permission CASCADE;
CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE
ON access_management.service_account_permission FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__usernames();

DROP TRIGGER IF EXISTS _300_tenant_app_auth ON access_management.service_account_permission CASCADE;
CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON access_management.service_account_permission FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- SERVICE_ACCOUNT_PERMISSION - END
-- TRIGGERS - END
