-- creation method to help on consistently create subscription triggers
CREATE OR REPLACE FUNCTION app_hidden.define_subscription_triggers(idColumn text, tableName text, schemaName text, mainTableName text, eventType text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP TRIGGER IF EXISTS _500_gql_' || tableName || '_inserted ON ' || schemaName || '.' || tableName;
  EXECUTE 'CREATE TRIGGER _500_gql_' || tableName || '_inserted after insert on ' || schemaName || '.' || tableName || ' ' ||
          'for each row execute procedure app_public.tg__graphql_subscription(''' || eventType || 'Created'',''graphql:' || mainTableName || ''',''' || idColumn || ''');';

  EXECUTE 'DROP TRIGGER IF EXISTS _500_gql_' || tableName || '_updated ON ' || schemaName || '.' || tableName;
  EXECUTE 'CREATE TRIGGER _500_gql_' || tableName || '_updated after update on ' || schemaName || '.' || tableName || ' ' ||
          'for each row execute procedure app_public.tg__graphql_subscription(''' || eventType || 'Changed'',''graphql:' || mainTableName || ''',''' || idColumn || ''');';

  EXECUTE 'DROP TRIGGER IF EXISTS _500_gql_' || tableName || '_deleted ON ' || schemaName || '.' || tableName;
  EXECUTE 'CREATE TRIGGER _500_gql_' || tableName || '_deleted before delete on ' || schemaName || '.' || tableName || ' ' ||
          'for each row execute procedure app_public.tg__graphql_subscription(''' || eventType || 'Deleted'',''graphql:' || mainTableName || ''',''' || idColumn || ''');';
END;
$$;

-- creation method to help on consistently create timestamp triggers
CREATE OR REPLACE FUNCTION app_hidden.define_timestamps_trigger(tableName text, schemaName text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP trigger IF EXISTS _100_timestamps on ' || schemaName || '.' || tableName || ';';
  EXECUTE 'CREATE trigger _100_timestamps BEFORE UPDATE ON ' || schemaName || '.' || tableName ||
          ' for each ROW EXECUTE PROCEDURE app_hidden.tg__timestamps();';
END;
$$;

-- creation method to help on consistently create users triggers
CREATE OR REPLACE FUNCTION app_hidden.define_users_trigger(tableName text, schemaName text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP trigger IF EXISTS _200_username on ' || schemaName || '.' || tableName || ';';
  EXECUTE 'CREATE trigger _200_username BEFORE INSERT OR UPDATE ON ' || schemaName || '.' || tableName ||
          ' for each ROW EXECUTE PROCEDURE app_hidden.tg__username();';
END;
$$;

-- creation method to help on consistently create "normal" indexes in an idempotent way for a single field
CREATE OR REPLACE FUNCTION app_hidden.define_index(fieldName text, tableName text, schemaName text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP INDEX IF EXISTS idx_' || tableName || '_' || fieldName || ' cascade;';
  EXECUTE 'CREATE INDEX idx_' || tableName || '_' || fieldName || ' ON ' || schemaName || '.' || tableName || ' (' || fieldName || ');';
END;
$$;

-- creation method to help on consistently create indexes in an idempotent way for a field plus the id field for explorer sorting
CREATE OR REPLACE FUNCTION app_hidden.define_indexes_with_id(fieldName text, tableName text, schemaName text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP INDEX IF EXISTS idx_' || tableName || '_' || fieldName || '_asc_with_id cascade;';
  EXECUTE 'CREATE INDEX idx_' || tableName || '_' || fieldName || '_asc_with_id ON ' || schemaName || '.' || tableName || ' (' || fieldName || ' ASC, id ASC);';
  EXECUTE 'DROP INDEX IF EXISTS idx_' || tableName || '_' || fieldName || '_desc_with_id cascade;';
  EXECUTE 'CREATE INDEX idx_' || tableName || '_' || fieldName || '_desc_with_id ON ' || schemaName || '.' || tableName || ' (' || fieldName || ' DESC, id ASC);';
END;
$$;

-- creation method to help on consistently create UNIQUE indexes in an idempotent way
CREATE OR REPLACE FUNCTION app_hidden.define_unique_index(fieldName text, tableName text, schemaName text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP INDEX IF EXISTS idx_' || tableName || '_' || fieldName || ' cascade;';
  EXECUTE 'CREATE UNIQUE INDEX idx_' || tableName || '_' || fieldName || ' ON ' || schemaName || '.' || tableName || ' (' || fieldName || ');';
END;
$$;

-- creation method to help on consistently create UNIQUE constraint in an idempotent way
CREATE OR REPLACE FUNCTION app_hidden.define_unique_constraint(fieldName text, tableName text, schemaName text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'ALTER TABLE ' || schemaName || '.' || tableName || ' DROP CONSTRAINT IF EXISTS ' || fieldName || '_is_unique;';
  EXECUTE 'ALTER TABLE ' || schemaName || '.' || tableName || ' ADD CONSTRAINT ' || fieldName || '_is_unique UNIQUE (' || fieldName || ');';
END;
$$;

-- creation method to help on consistently create indexes in an idempotent way to support LIKE/ILIKE searches
-- read more here: https://niallburkley.com/blog/index-columns-for-like-in-postgres/
CREATE OR REPLACE FUNCTION app_hidden.define_like_index(fieldName text, tableName text, schemaName text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP INDEX IF EXISTS idx_trgm_' || tableName || '_' || fieldName || ' cascade;';
  EXECUTE 'CREATE INDEX idx_trgm_' || tableName || '_' || fieldName || ' ON ' || schemaName || '.' || tableName || ' USING gin (' || fieldName || ' gin_trgm_ops);';
END;
$$;

-- create authentication for a table via row level security
CREATE OR REPLACE FUNCTION app_hidden.define_authentication(readPermissions text, modifyPermissions text, tableName text, schemaName text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'ALTER TABLE ' || schemaName || '.' || tableName || ' ENABLE ROW LEVEL SECURITY;';
  EXECUTE 'DROP POLICY IF EXISTS ' || tableName || '_authorization ON ' || schemaName || '.' || tableName || ';';
  EXECUTE 'CREATE POLICY ' || tableName || '_authorization ON ' || schemaName || '.' || tableName || ' FOR ALL
    USING (app_hidden.user_has_permission(''' || readPermissions || '''))
    WITH CHECK (app_hidden.user_has_permission(''' || modifyPermissions || '''));';
  EXECUTE 'DROP POLICY IF EXISTS ' || tableName || '_authorization_delete ON ' || schemaName || '.' || tableName || ';';
  EXECUTE 'CREATE POLICY ' || tableName || '_authorization_delete ON ' || schemaName || '.' || tableName || ' AS restrictive FOR DELETE
   USING (app_hidden.user_has_permission(''' || modifyPermissions || '''));';
END;
$$;

-- create readonly authentication for a table via row level security
CREATE OR REPLACE FUNCTION app_hidden.define_readonly_authentication(readPermissions text, tableName text, schemaName text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'ALTER TABLE ' || schemaName || '.' || tableName || ' ENABLE ROW LEVEL SECURITY;';
  EXECUTE 'DROP POLICY IF EXISTS ' || tableName || '_authorization ON ' || schemaName || '.' || tableName || ';';
  EXECUTE 'CREATE POLICY ' || tableName || '_authorization ON ' || schemaName || '.' || tableName || ' FOR SELECT
    USING (app_hidden.user_has_permission(''' || readPermissions || '''));';
END;
$$;

-- creation method to help on consistently create GraphQL endpoints for enum SQL types
CREATE OR REPLACE FUNCTION app_hidden.expose_enum_endpoint(typeName text, schemaName text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'CREATE OR REPLACE FUNCTION ' || schemaName || '.get_' || typeName || '_values() ' ||
    'RETURNS SETOF ' || schemaName || '.' || typeName || ' AS $get$ ' ||
    'SELECT unnest(enum_range(NULL::' || schemaName || '.' || typeName || '));' ||
    '$get$ LANGUAGE SQL STABLE;';
END;
$$;
