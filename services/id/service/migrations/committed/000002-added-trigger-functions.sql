--! Previous: sha1:195c689b1fd91a6cfe5c4b08bb8e7b2ca5499006
--! Hash: sha1:955ab682aa2c28ca6bf078cf780603419c0c9e78
--! Message: added-trigger-functions

-- Trigger Functions for CreatedAt, UpdatedAt, CreatedBy, UpdatedBy - BEGIN
CREATE OR REPLACE FUNCTION app_hidden.tg__timestamps() RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = (CASE WHEN TG_OP = 'INSERT' THEN NOW() ELSE OLD.created_at END);
  NEW.updated_at = (CASE WHEN TG_OP = 'UPDATE' AND OLD.updated_at >= NOW() THEN OLD.updated_at + interval '1 millisecond' ELSE NOW() END);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql VOLATILE;

COMMENT ON FUNCTION app_hidden.tg__timestamps() IS
  E'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';

CREATE OR REPLACE FUNCTION app_hidden.tg__usernames() RETURNS TRIGGER AS $$
BEGIN
  NEW.created_by = (CASE WHEN TG_OP = 'INSERT' THEN current_setting('axinom.auth.user', FALSE) ELSE OLD.created_by END);
  NEW.updated_by = (CASE WHEN TG_OP = 'UPDATE' OR TG_OP = 'INSERT' THEN current_setting('axinom.auth.user', FALSE) ELSE OLD.updated_by END);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql VOLATILE;

COMMENT ON FUNCTION app_hidden.tg__usernames() IS
  E'This trigger should be called on all tables with created_by, updated_by - it ensures that they cannot be manipulated';
-- Trigger Functions for CreatedAt, UpdatedAt, CreatedBy, UpdatedBy - END

-- Trigger Functions for TenantId, ApplicationId - BEGIN
CREATE OR REPLACE FUNCTION app_hidden.tg__tenant() RETURNS TRIGGER AS $$
BEGIN
  NEW.tenant_id = current_setting('axinom.auth.tenantId', FALSE);  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql VOLATILE;

COMMENT ON FUNCTION app_hidden.tg__tenant() IS
  E'This trigger should be called on tables needing automatic tenant_id - to support multi-tenancy';

CREATE OR REPLACE FUNCTION app_hidden.tg__tenant_application() RETURNS TRIGGER AS $$
BEGIN
  NEW.tenant_id = current_setting('axinom.auth.tenantId', FALSE);
  NEW.application_id = current_setting('axinom.auth.applicationId', FALSE);  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql VOLATILE;

COMMENT ON FUNCTION app_hidden.tg__tenant_application() IS
  E'This trigger should be called on tables needing automatic tenant_id, application_id - to support multi-tenancy';
-- Trigger Functions for TenantId, ApplicationId - END
