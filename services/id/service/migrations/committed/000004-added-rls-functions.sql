--! Previous: sha1:b1b2eb828276727f2128662fe5e6b3c737918289
--! Hash: sha1:e38e655accc6427930bed2df1c04ab9ea6ff4f55
--! Message: added-rls-functions

-- Functions for validating RLS policies - BEGIN
CREATE OR REPLACE FUNCTION app_hidden.current_tenant_id() RETURNS UUID AS $$
  SELECT coalesce(nullif(current_setting('axinom.auth.tenantId', TRUE), ''), uuid_nil()::TEXT)::UUID;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION app_hidden.current_application_id() RETURNS UUID AS $$
  SELECT coalesce(nullif(current_setting('axinom.auth.applicationId', TRUE), ''), uuid_nil()::TEXT)::UUID;
$$ LANGUAGE sql STABLE;
-- Functions for validating RLS policies - END

-- Functions for adding RLS policies - BEGIN
CREATE OR REPLACE FUNCTION app_private.enable_tenant_rls_on_table(schema_name_ TEXT, table_name_ TEXT)
RETURNS VOID AS $$
DECLARE
  policy_name_ TEXT := table_name_ || '_policy';
  qualified_table_name_ TEXT := schema_name_ || '.' || table_name_;
BEGIN
  EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', qualified_table_name_);
  EXECUTE format('DROP POLICY IF EXISTS %s ON %s CASCADE', policy_name_, qualified_table_name_);
  EXECUTE format(
    'CREATE POLICY %s ON %s FOR ALL '
    'USING (tenant_id = app_hidden.current_tenant_id()) '
    'WITH CHECK (tenant_id = app_hidden.current_tenant_id())', policy_name_, qualified_table_name_);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION app_private.enable_tenant_application_rls_on_table(schema_name_ TEXT, table_name_ TEXT)
RETURNS VOID AS $$
DECLARE
  policy_name_ TEXT := table_name_ || '_policy';
  qualified_table_name_ TEXT := schema_name_ || '.' || table_name_;
BEGIN
  EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', qualified_table_name_);
  EXECUTE format('DROP POLICY IF EXISTS %s ON %s CASCADE', policy_name_, qualified_table_name_);
  EXECUTE format(
    'CREATE POLICY %s ON %s FOR ALL '
    'USING (tenant_id = app_hidden.current_tenant_id() AND application_id = app_hidden.current_application_id()) '
    'WITH CHECK (tenant_id = app_hidden.current_tenant_id() AND application_id = app_hidden.current_application_id())',
    policy_name_, qualified_table_name_);
END;
$$ LANGUAGE plpgsql;
-- Functions for adding RLS policies - END
