--! Previous: sha1:70ced491e5ebc193dfd0961000371974e88f4b49
--! Hash: sha1:a1e012833b72a0e4fa31cb0c3624782ba15c6a5c
--! Message: added-auth-endpoint

-- TABLES - BEGIN
-- TABLE - USER_TOKEN - BEGIN
DROP TABLE IF EXISTS auth_endpoint.user_token CASCADE;
CREATE TABLE auth_endpoint.user_token (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  idp_id application_administration.identity_provider NOT NULL,
  idp_subject_id TEXT NOT NULL,
  idp_access_token TEXT NOT NULL,
  idp_refresh_token TEXT NOT NULL,
  idp_access_token_expires_at TIMESTAMPTZ NOT NULL,
  axinom_iam_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  tenant_id UUID NOT NULL,
  application_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT user_tenant_id_application_id_axinom_iam_token_key UNIQUE(tenant_id, application_id, axinom_iam_token),

  CONSTRAINT user_token_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id)
  REFERENCES application_administration.application (tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_token_tenant_id_application_id_user_id_fkey FOREIGN KEY (tenant_id, application_id, user_id)
  REFERENCES access_management.user (tenant_id, application_id, id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_token_tenant_id_application_id_idp_id_fkey FOREIGN KEY (tenant_id, application_id, idp_id)
  REFERENCES application_administration.idp_configuration (tenant_id, application_id, idp_id) ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT app_private.enable_tenant_application_rls_on_table('auth_endpoint', 'user_token');

DROP INDEX IF EXISTS fki_user_token_tenant_id_application_id_fkey;
CREATE INDEX fki_user_token_tenant_id_application_id_fkey ON auth_endpoint.user_token (tenant_id, application_id);
DROP INDEX IF EXISTS fki_user_token_tenant_id_application_id_user_id_fkey;
CREATE INDEX fki_user_token_tenant_id_application_id_user_id_fkey ON auth_endpoint.user_token (tenant_id, application_id, user_id);
DROP INDEX IF EXISTS fki_user_token_tenant_id_application_id_idp_id_fkey;
CREATE INDEX fki_user_token_tenant_id_application_id_idp_id_fkey ON auth_endpoint.user_token (tenant_id, application_id, idp_id);

REVOKE ALL ON TABLE auth_endpoint.user_token FROM ":DATABASE_PG_WEB_USER";
GRANT ALL ON auth_endpoint.user_token TO ":DATABASE_PG_WEB_USER";
-- TABLE - USER_TOKEN - END
-- TABLES - END

-- TRIGGERS - BEGIN
-- USER_TOKEN - BEGIN
DROP TRIGGER IF EXISTS _100_timestamps ON auth_endpoint.user_token CASCADE;
CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE
ON auth_endpoint.user_token FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__timestamps();

DROP TRIGGER IF EXISTS _200_tenant_app_auth ON auth_endpoint.user_token CASCADE;
CREATE TRIGGER _200_tenant_app_auth BEFORE INSERT OR UPDATE OR DELETE
ON auth_endpoint.user_token FOR EACH ROW
EXECUTE PROCEDURE app_hidden.tg__tenant_application();
-- USER_TOKEN - END
-- TRIGGERS - END

-- Functions - BEGIN
CREATE OR REPLACE FUNCTION app_hidden.get_tenant_id_by_application_id(
  application_id_ UUID
) RETURNS UUID
AS $$
  SELECT tenant_id FROM application_administration.application WHERE id = application_id_;
$$ LANGUAGE sql SECURITY DEFINER SET search_path = application_administration;
-- Functions - END
