--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: app_hidden; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_hidden;


--
-- Name: app_private; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_private;


--
-- Name: app_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_public;


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: archiving; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.archiving AS ENUM (
    'NONE',
    'TAR',
    'SINGLE_TAR'
);


--
-- Name: drm_protection; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.drm_protection AS ENUM (
    'NONE',
    'MANAGED'
);


--
-- Name: output_format; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.output_format AS ENUM (
    'HLS',
    'DASH',
    'HLS_DASH',
    'CMAF'
);


--
-- Name: qa_status; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.qa_status AS ENUM (
    'NOT_PREVIEWED',
    'NOT_APPROVED',
    'APPROVED'
);


--
-- Name: transcoding_status; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.transcoding_status AS ENUM (
    'WAITING',
    'IN_PROGRESS',
    'READY',
    'ERROR'
);


--
-- Name: constraint_max_length(text, integer, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.constraint_max_length(input_value text, max_length integer, error_message text DEFAULT 'The value "%s" is too long. It must be maximum %s characters long.'::text, error_code text DEFAULT 'MXLEN'::text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF length(input_value) > max_length THEN
      perform app_hidden.raise_error(error_message, error_code, input_value, max_length::text);
  END IF;
  RETURN true;
END;
$$;


--
-- Name: constraint_min_length(text, integer, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.constraint_min_length(input_value text, min_length integer, error_message text DEFAULT 'The value "%s" is not long enough. It must be at least %s characters long.'::text, error_code text DEFAULT 'MNLEN'::text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF length(input_value) < min_length THEN
  	perform app_hidden.raise_error(error_message, error_code, input_value, min_length::text);
  END IF;
  RETURN true;
END;
$$;


--
-- Name: constraint_not_empty(text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.constraint_not_empty(input_value text, error_message text DEFAULT 'Property must not start or end with whitespace value and must not be an empty or whitespace value.'::text, error_code text DEFAULT 'EMPTY'::text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
begin
  if app_hidden.validation_not_empty(input_value) then
    return true;
  end if;
  perform app_hidden.raise_error(error_message, error_code);
end;
$$;


--
-- Name: define_authentication(text, text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.define_authentication(readpermissions text, modifypermissions text, tablename text, schemaname text) RETURNS void
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


--
-- Name: define_index(text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.define_index(fieldname text, tablename text, schemaname text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP INDEX IF EXISTS idx_' || tableName || '_' || fieldName || ' cascade;';
  EXECUTE 'CREATE INDEX idx_' || tableName || '_' || fieldName || ' ON ' || schemaName || '.' || tableName || ' (' || fieldName || ');';
END;
$$;


--
-- Name: define_indexes_with_id(text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.define_indexes_with_id(fieldname text, tablename text, schemaname text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP INDEX IF EXISTS idx_' || tableName || '_' || fieldName || '_asc_with_id cascade;';
  EXECUTE 'CREATE INDEX idx_' || tableName || '_' || fieldName || '_asc_with_id ON ' || schemaName || '.' || tableName || ' (' || fieldName || ' ASC, id ASC);';
  EXECUTE 'DROP INDEX IF EXISTS idx_' || tableName || '_' || fieldName || '_desc_with_id cascade;';
  EXECUTE 'CREATE INDEX idx_' || tableName || '_' || fieldName || '_desc_with_id ON ' || schemaName || '.' || tableName || ' (' || fieldName || ' DESC, id ASC);';
END;
$$;


--
-- Name: define_like_index(text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.define_like_index(fieldname text, tablename text, schemaname text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP INDEX IF EXISTS idx_trgm_' || tableName || '_' || fieldName || ' cascade;';
  EXECUTE 'CREATE INDEX idx_trgm_' || tableName || '_' || fieldName || ' ON ' || schemaName || '.' || tableName || ' USING gin (' || fieldName || ' gin_trgm_ops);';
END;
$$;


--
-- Name: define_readonly_authentication(text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.define_readonly_authentication(readpermissions text, tablename text, schemaname text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'ALTER TABLE ' || schemaName || '.' || tableName || ' ENABLE ROW LEVEL SECURITY;';
  EXECUTE 'DROP POLICY IF EXISTS ' || tableName || '_authorization ON ' || schemaName || '.' || tableName || ';';
  EXECUTE 'CREATE POLICY ' || tableName || '_authorization ON ' || schemaName || '.' || tableName || ' FOR SELECT
    USING (app_hidden.user_has_permission(''' || readPermissions || '''));';
END;
$$;


--
-- Name: define_subscription_triggers(text, text, text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.define_subscription_triggers(idcolumn text, tablename text, schemaname text, maintablename text, eventtype text) RETURNS void
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


--
-- Name: define_timestamps_trigger(text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.define_timestamps_trigger(tablename text, schemaname text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP trigger IF EXISTS _100_timestamps on ' || schemaName || '.' || tableName || ';';
  EXECUTE 'CREATE trigger _100_timestamps BEFORE UPDATE ON ' || schemaName || '.' || tableName ||
          ' for each ROW EXECUTE PROCEDURE app_hidden.tg__timestamps();';
END;
$$;


--
-- Name: define_unique_constraint(text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.define_unique_constraint(fieldname text, tablename text, schemaname text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'ALTER TABLE ' || schemaName || '.' || tableName || ' DROP CONSTRAINT IF EXISTS ' || fieldName || '_is_unique;';
  EXECUTE 'ALTER TABLE ' || schemaName || '.' || tableName || ' ADD CONSTRAINT ' || fieldName || '_is_unique UNIQUE (' || fieldName || ');';
END;
$$;


--
-- Name: define_unique_index(text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.define_unique_index(fieldname text, tablename text, schemaname text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP INDEX IF EXISTS idx_' || tableName || '_' || fieldName || ' cascade;';
  EXECUTE 'CREATE UNIQUE INDEX idx_' || tableName || '_' || fieldName || ' ON ' || schemaName || '.' || tableName || ' (' || fieldName || ');';
END;
$$;


--
-- Name: define_users_trigger(text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.define_users_trigger(tablename text, schemaname text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  EXECUTE 'DROP trigger IF EXISTS _200_username on ' || schemaName || '.' || tableName || ';';
  EXECUTE 'CREATE trigger _200_username BEFORE INSERT OR UPDATE ON ' || schemaName || '.' || tableName ||
          ' for each ROW EXECUTE PROCEDURE app_hidden.tg__username();';
END;
$$;


--
-- Name: expose_enum_endpoint(text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.expose_enum_endpoint(typename text, schemaname text) RETURNS void
    LANGUAGE plpgsql
    AS $_$
BEGIN
  EXECUTE 'CREATE OR REPLACE FUNCTION ' || schemaName || '.get_' || typeName || '_values() ' ||
    'RETURNS SETOF ' || schemaName || '.' || typeName || ' AS $get$ ' ||
    'SELECT unnest(enum_range(NULL::' || schemaName || '.' || typeName || '));' ||
    '$get$ LANGUAGE SQL STABLE;';
END;
$_$;


--
-- Name: raise_error(text, text, text[]); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.raise_error(error_message text, error_code text, VARIADIC placeholder_values text[] DEFAULT '{}'::text[]) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  RAISE EXCEPTION '%', format(error_message, VARIADIC placeholder_values) using errcode = error_code;
END;
$$;


--
-- Name: tg__timestamps(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.tg__timestamps() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
BEGIN
  NEW.created_date = (CASE WHEN TG_OP = 'INSERT' THEN (now() at time zone 'utc') ELSE OLD.created_date END);
  NEW.updated_date = (CASE WHEN TG_OP = 'UPDATE' AND OLD.updated_date  >= (now() at time zone 'utc') THEN OLD.updated_date  + interval '1 millisecond' ELSE (now() at time zone 'utc') END);
  RETURN NEW;
END;
$$;


--
-- Name: FUNCTION tg__timestamps(); Type: COMMENT; Schema: app_hidden; Owner: -
--

COMMENT ON FUNCTION app_hidden.tg__timestamps() IS 'This trigger should be called on all tables with created_date , updated_date  - it ensures that they cannot be manipulated and that updated_date  will always be larger than the previous updated_date .';


--
-- Name: tg__username(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.tg__username() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
BEGIN
  NEW.created_user = (CASE WHEN TG_OP = 'INSERT' THEN pg_catalog.current_setting('ax.claims.username', true) ELSE OLD.created_user END);
  NEW.updated_user = (CASE WHEN TG_OP = 'UPDATE' OR TG_OP = 'INSERT' THEN pg_catalog.current_setting('ax.claims.username', true) ELSE OLD.updated_user END);
  RETURN NEW;
END;
$$;


--
-- Name: tg_transcoding_acquisition_profiles__check_validity(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.tg_transcoding_acquisition_profiles__check_validity() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
BEGIN
  NEW.is_valid = app_hidden.validation_not_empty(NEW.provider) AND 
                 app_hidden.validation_not_empty(NEW.uri_path) AND 
                 app_hidden.validation_is_url(NEW.uri_path) AND 
                 app_hidden.validation_not_empty(NEW.read_credentials_name) AND 
                 app_hidden.validation_not_empty(NEW.read_credentials_secret) AND 
                 app_hidden.validation_is_base64(NEW.read_credentials_secret) AND  
                 app_hidden.validation_not_empty(NEW.list_credentials_secret) AND 
                 app_hidden.validation_starts_with(NEW.list_credentials_secret, '?');
  RETURN NEW;
END;
$$;


--
-- Name: tg_transcoding_processing_profiles__check_validity(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.tg_transcoding_processing_profiles__check_validity() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
DECLARE
  default_validity boolean;
BEGIN
  default_validity = app_hidden.validation_not_empty(NEW.video_stream_expression) AND 
                     app_hidden.validation_not_empty(NEW.audio_file_language_expression) AND 
                     app_hidden.validation_not_empty(NEW.subtitle_file_language_expression) AND 
                     app_hidden.validation_not_empty(NEW.caption_file_language_expression);

  IF NEW.drm_protection = 'MANAGED' THEN
    NEW.is_valid = default_validity AND 
                   app_hidden.validation_not_empty(NEW.drm_api_url) AND 
                   app_hidden.validation_is_url(NEW.drm_api_url) AND 
                   app_hidden.validation_not_empty(NEW.drm_tenant_id) AND 
                   app_hidden.validation_not_empty(NEW.drm_management_key) AND 
                   app_hidden.validation_is_base64(NEW.drm_management_key) AND 
                   app_hidden.validation_not_empty(NEW.drm_key_seed) AND 
                   app_hidden.validation_is_base64(NEW.drm_key_seed) AND
                   app_hidden.validation_not_empty(NEW.drm_thumbprints) AND 
                   app_hidden.validation_is_base64(NEW.drm_thumbprints);
  ELSE
    NEW.is_valid = default_validity;
  END IF;

  RETURN NEW;
END;
$$;


--
-- Name: tg_transcoding_publishing_profiles__check_validity(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.tg_transcoding_publishing_profiles__check_validity() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
BEGIN
  NEW.is_valid = app_hidden.validation_not_empty(NEW.provider) AND 
                 app_hidden.validation_not_empty(NEW.uri_path) AND 
                 app_hidden.validation_is_url(NEW.uri_path) AND 
                 app_hidden.validation_not_empty(NEW.credentials_name) AND 
                 app_hidden.validation_not_empty(NEW.credentials_secret) AND 
                 app_hidden.validation_is_base64(NEW.credentials_secret);
  RETURN NEW;
END;
$$;


--
-- Name: user_has_permission(text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.user_has_permission(required_permissions text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
   return app_hidden.user_has_setting(required_permissions, 'ax.claims.permissions');
END;
$$;


--
-- Name: user_has_permission_and_tag(text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.user_has_permission_and_tag(required_permissions text, fieldvalue text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_part text;
	v_user_permissions text = ',' || pg_catalog.current_setting('ax.claims.permissions', true) || ',';
	v_user_tags text = pg_catalog.current_setting('ax.claims.tags', true);
BEGIN
   -- check if the user has the needed permission - otherwise skip
   if app_hidden.user_has_setting(required_permissions, 'ax.claims.permissions') = false then
      return false;
   end if;
   -- check if any tag matches the discrete column value
   foreach v_part in array string_to_array(v_user_tags, ',')
   loop
       if v_part = CAST (fieldValue AS TEXT) then
           return true;
       end if;
   end loop;
   return false;
END;
$$;


--
-- Name: user_has_setting(text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.user_has_setting(required_settings text, local_variable_field text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
DECLARE
	v_part text;
	v_user_settings text = ',' || pg_catalog.current_setting(local_variable_field, true) || ',';
BEGIN
   foreach v_part in array string_to_array(required_settings, ',')
   loop
       if v_user_settings like '%,' || v_part || ',%' then
           return true;
       end if;
   end loop;
   return false;
END;
$$;


--
-- Name: user_has_tag(text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.user_has_tag(required_permissions text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
   return app_hidden.user_has_setting(required_permissions, 'ax.claims.tags');
END;
$$;


--
-- Name: validation_is_base64(text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.validation_is_base64(input_value text) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$
begin
  if input_value !~* '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$' then
  	return false;
  end if;
  return true;
end;
$_$;


--
-- Name: validation_is_url(text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.validation_is_url(input_value text) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$
begin
  if input_value !~* 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,9}\y([-a-zA-Z0-9@:%_\+.~#?&//=]*)$' then
  	return false;
  end if;
  return true;
end;
$_$;


--
-- Name: validation_not_empty(text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.validation_not_empty(input_value text) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$
begin
  if input_value IS NULL OR input_value = '' OR input_value !~* '^(?!.*^[\s])(?!.*[\s]$).*$' then
  	return false;
  end if;
  return true;
end;
$_$;


--
-- Name: validation_starts_with(text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.validation_starts_with(input_value text, prefix_value text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
begin
  if input_value like prefix_value || '%' then
  	return true;
  end if;
  return false;
end;
$$;


--
-- Name: get_archiving_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_archiving_values() RETURNS SETOF app_public.archiving
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.archiving));$$;


--
-- Name: get_drm_protection_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_drm_protection_values() RETURNS SETOF app_public.drm_protection
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.drm_protection));$$;


--
-- Name: get_output_format_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_output_format_values() RETURNS SETOF app_public.output_format
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.output_format));$$;


--
-- Name: get_qa_status_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_qa_status_values() RETURNS SETOF app_public.qa_status
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.qa_status));$$;


--
-- Name: get_transcoding_status_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_transcoding_status_values() RETURNS SETOF app_public.transcoding_status
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.transcoding_status));$$;


--
-- Name: tg__graphql_subscription(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.tg__graphql_subscription() RETURNS trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
  v_process_new bool = (TG_OP = 'INSERT' OR TG_OP = 'UPDATE');
  v_process_old bool = (TG_OP = 'UPDATE' OR TG_OP = 'DELETE');
  v_event text = TG_ARGV[0];
  v_topic_template text = TG_ARGV[1];
  v_attribute text = TG_ARGV[2];
  v_record record;
  v_sub text;
  v_topic text;
  v_i int = 0;
  v_last_topic text;
BEGIN
  FOR v_i IN 0..1 LOOP
    IF (v_i = 0) AND v_process_new IS TRUE THEN
      v_record = new;
    ELSIF (v_i = 1) AND v_process_old IS TRUE THEN
      v_record = old;
    ELSE
      CONTINUE;
    END IF;
    IF v_attribute IS NOT NULL THEN
      EXECUTE 'select $1.' || quote_ident(v_attribute)
        USING v_record
        INTO  v_sub;
    END IF;
    IF v_sub IS NOT NULL THEN
      v_topic = replace(v_topic_template, '$1', v_sub);
    ELSE
      v_topic = v_topic_template;
    END IF;
    IF v_topic IS DISTINCT FROM v_last_topic THEN
      -- This if statement prevents us from triggering the same notification twice
      v_last_topic = v_topic; 
      perform pg_notify(v_topic, json_build_object(
        'event', v_event,
        'subject', v_sub
      )::text);
    END IF;
  END LOOP;
  RETURN v_record;
END;
$_$;


--
-- Name: FUNCTION tg__graphql_subscription(); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.tg__graphql_subscription() IS 'This function enables the creation of simple focussed GraphQL subscriptions using database triggers. Read more here: https://www.graphile.org/postgraphile/subscriptions/#custom-subscriptions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: transcoding_acquisition_profiles; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.transcoding_acquisition_profiles (
    id integer NOT NULL,
    title text NOT NULL,
    is_valid boolean DEFAULT false NOT NULL,
    provider text,
    uri_path text,
    root_folder_path text,
    read_credentials_name text,
    read_credentials_secret text,
    list_credentials_name text,
    list_credentials_secret text,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_user text NOT NULL,
    updated_user text NOT NULL,
    CONSTRAINT title_max_length CHECK (app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.'::text)),
    CONSTRAINT title_not_empty CHECK (app_hidden.constraint_not_empty(title, 'The title cannot be empty.'::text))
);


--
-- Name: transcoding_acquisition_profiles_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.transcoding_acquisition_profiles ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.transcoding_acquisition_profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: transcoding_histories; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.transcoding_histories (
    id integer NOT NULL,
    video_id integer NOT NULL,
    message_type text NOT NULL,
    message_body jsonb NOT NULL,
    enqueued_date timestamp with time zone NOT NULL,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


--
-- Name: transcoding_histories_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.transcoding_histories ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.transcoding_histories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: transcoding_processing_profiles; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.transcoding_processing_profiles (
    id integer NOT NULL,
    title text NOT NULL,
    is_valid boolean DEFAULT false NOT NULL,
    video_stream_expression text,
    audio_file_language_expression text,
    subtitle_file_language_expression text,
    caption_file_language_expression text,
    output_format app_public.output_format DEFAULT 'DASH'::app_public.output_format,
    drm_protection app_public.drm_protection DEFAULT 'NONE'::app_public.drm_protection,
    archiving app_public.archiving DEFAULT 'NONE'::app_public.archiving,
    use_native_language_names boolean DEFAULT true NOT NULL,
    delete_files_from_source_when_done boolean DEFAULT false NOT NULL,
    drm_api_url text,
    drm_tenant_id text,
    drm_management_key text,
    drm_key_seed text,
    drm_thumbprints text,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_user text NOT NULL,
    updated_user text NOT NULL,
    CONSTRAINT title_max_length CHECK (app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.'::text)),
    CONSTRAINT title_not_empty CHECK (app_hidden.constraint_not_empty(title, 'The title cannot be empty.'::text))
);


--
-- Name: transcoding_processing_profiles_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.transcoding_processing_profiles ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.transcoding_processing_profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: transcoding_publishing_profiles; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.transcoding_publishing_profiles (
    id integer NOT NULL,
    title text NOT NULL,
    is_valid boolean DEFAULT false NOT NULL,
    provider text,
    uri_path text,
    credentials_name text,
    credentials_secret text,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_user text NOT NULL,
    updated_user text NOT NULL,
    CONSTRAINT title_max_length CHECK (app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.'::text)),
    CONSTRAINT title_not_empty CHECK (app_hidden.constraint_not_empty(title, 'The title cannot be empty.'::text))
);


--
-- Name: transcoding_publishing_profiles_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.transcoding_publishing_profiles ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.transcoding_publishing_profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: transcoding_video_representations; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.transcoding_video_representations (
    id integer NOT NULL,
    transcoding_processing_profile_id integer NOT NULL,
    width integer,
    height integer,
    bitrate_in_kbps integer NOT NULL,
    CONSTRAINT has_width_or_height CHECK ((num_nonnulls(width, height) > 0))
);


--
-- Name: transcoding_video_representations_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.transcoding_video_representations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.transcoding_video_representations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: videos; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.videos (
    id integer NOT NULL,
    title text NOT NULL,
    external_id text,
    job_id text,
    drm_key_id text,
    is_protected boolean DEFAULT false NOT NULL,
    source_file_name text,
    source_file_extension text,
    source_location text NOT NULL,
    source_size_in_bytes bigint,
    audio_languages text[],
    subtitle_languages text[],
    caption_languages text[],
    video_bitrates integer[],
    transcoding_status app_public.transcoding_status DEFAULT 'WAITING'::app_public.transcoding_status,
    output_format app_public.output_format DEFAULT 'DASH'::app_public.output_format,
    qa_status app_public.qa_status DEFAULT 'NOT_PREVIEWED'::app_public.qa_status,
    qa_comment text,
    acquisition_progress integer,
    encoding_progress integer,
    hls_size_in_bytes bigint,
    dash_size_in_bytes bigint,
    cmaf_size_in_bytes bigint,
    hls_manifest_path text,
    dash_manifest_path text,
    duration_in_seconds integer,
    is_archived boolean DEFAULT false NOT NULL,
    finished_date timestamp with time zone,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_user text NOT NULL,
    updated_user text NOT NULL,
    CONSTRAINT title_max_length CHECK (app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.'::text)),
    CONSTRAINT title_not_empty CHECK (app_hidden.constraint_not_empty(title, 'The title cannot be empty.'::text))
);


--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.videos ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.videos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: videos_tags; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.videos_tags (
    video_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: videos external_id_is_unique; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.videos
    ADD CONSTRAINT external_id_is_unique UNIQUE (external_id);


--
-- Name: videos source_location_is_unique; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.videos
    ADD CONSTRAINT source_location_is_unique UNIQUE (source_location);


--
-- Name: transcoding_acquisition_profiles transcoding_acquisition_profiles_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.transcoding_acquisition_profiles
    ADD CONSTRAINT transcoding_acquisition_profiles_pkey PRIMARY KEY (id);


--
-- Name: transcoding_histories transcoding_histories_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.transcoding_histories
    ADD CONSTRAINT transcoding_histories_pkey PRIMARY KEY (id);


--
-- Name: transcoding_processing_profiles transcoding_processing_profiles_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.transcoding_processing_profiles
    ADD CONSTRAINT transcoding_processing_profiles_pkey PRIMARY KEY (id);


--
-- Name: transcoding_publishing_profiles transcoding_publishing_profiles_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.transcoding_publishing_profiles
    ADD CONSTRAINT transcoding_publishing_profiles_pkey PRIMARY KEY (id);


--
-- Name: transcoding_video_representations transcoding_video_representations_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.transcoding_video_representations
    ADD CONSTRAINT transcoding_video_representations_pkey PRIMARY KEY (id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: videos_tags videos_tags_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.videos_tags
    ADD CONSTRAINT videos_tags_pkey PRIMARY KEY (video_id, name);


--
-- Name: idx_transcoding_histories_created_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_histories_created_date_asc_with_id ON app_public.transcoding_histories USING btree (created_date, id);


--
-- Name: idx_transcoding_histories_created_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_histories_created_date_desc_with_id ON app_public.transcoding_histories USING btree (created_date DESC, id);


--
-- Name: idx_transcoding_histories_enqueued_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_histories_enqueued_date_asc_with_id ON app_public.transcoding_histories USING btree (enqueued_date, id);


--
-- Name: idx_transcoding_histories_enqueued_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_histories_enqueued_date_desc_with_id ON app_public.transcoding_histories USING btree (enqueued_date DESC, id);


--
-- Name: idx_transcoding_histories_video_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_histories_video_id ON app_public.transcoding_histories USING btree (video_id);


--
-- Name: idx_transcoding_processing_profiles_archiving_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_processing_profiles_archiving_asc_with_id ON app_public.transcoding_processing_profiles USING btree (archiving, id);


--
-- Name: idx_transcoding_processing_profiles_archiving_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_processing_profiles_archiving_desc_with_id ON app_public.transcoding_processing_profiles USING btree (archiving DESC, id);


--
-- Name: idx_transcoding_processing_profiles_drm_protection_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_processing_profiles_drm_protection_asc_with_id ON app_public.transcoding_processing_profiles USING btree (drm_protection, id);


--
-- Name: idx_transcoding_processing_profiles_drm_protection_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_processing_profiles_drm_protection_desc_with_id ON app_public.transcoding_processing_profiles USING btree (drm_protection DESC, id);


--
-- Name: idx_transcoding_processing_profiles_output_format_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_processing_profiles_output_format_asc_with_id ON app_public.transcoding_processing_profiles USING btree (output_format, id);


--
-- Name: idx_transcoding_processing_profiles_output_format_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_processing_profiles_output_format_desc_with_id ON app_public.transcoding_processing_profiles USING btree (output_format DESC, id);


--
-- Name: idx_transcoding_processing_profiles_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_processing_profiles_title_asc_with_id ON app_public.transcoding_processing_profiles USING btree (title, id);


--
-- Name: idx_transcoding_processing_profiles_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_processing_profiles_title_desc_with_id ON app_public.transcoding_processing_profiles USING btree (title DESC, id);


--
-- Name: idx_transcoding_video_representations_transcoding_processing_pr; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_transcoding_video_representations_transcoding_processing_pr ON app_public.transcoding_video_representations USING btree (transcoding_processing_profile_id);


--
-- Name: idx_trgm_videos_source_file_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_videos_source_file_name ON app_public.videos USING gin (source_file_name public.gin_trgm_ops);


--
-- Name: idx_trgm_videos_title; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_videos_title ON app_public.videos USING gin (title public.gin_trgm_ops);


--
-- Name: idx_videos_audio_languages_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_audio_languages_asc_with_id ON app_public.videos USING btree (audio_languages, id);


--
-- Name: idx_videos_audio_languages_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_audio_languages_desc_with_id ON app_public.videos USING btree (audio_languages DESC, id);


--
-- Name: idx_videos_caption_languages_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_caption_languages_asc_with_id ON app_public.videos USING btree (caption_languages, id);


--
-- Name: idx_videos_caption_languages_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_caption_languages_desc_with_id ON app_public.videos USING btree (caption_languages DESC, id);


--
-- Name: idx_videos_duration_in_seconds_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_duration_in_seconds_asc_with_id ON app_public.videos USING btree (duration_in_seconds, id);


--
-- Name: idx_videos_duration_in_seconds_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_duration_in_seconds_desc_with_id ON app_public.videos USING btree (duration_in_seconds DESC, id);


--
-- Name: idx_videos_finished_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_finished_date_asc_with_id ON app_public.videos USING btree (finished_date, id);


--
-- Name: idx_videos_finished_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_finished_date_desc_with_id ON app_public.videos USING btree (finished_date DESC, id);


--
-- Name: idx_videos_is_archived; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_is_archived ON app_public.videos USING btree (is_archived);


--
-- Name: idx_videos_is_protected_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_is_protected_asc_with_id ON app_public.videos USING btree (is_protected, id);


--
-- Name: idx_videos_is_protected_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_is_protected_desc_with_id ON app_public.videos USING btree (is_protected DESC, id);


--
-- Name: idx_videos_output_format_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_output_format_asc_with_id ON app_public.videos USING btree (output_format, id);


--
-- Name: idx_videos_output_format_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_output_format_desc_with_id ON app_public.videos USING btree (output_format DESC, id);


--
-- Name: idx_videos_qa_status; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_qa_status ON app_public.videos USING btree (qa_status);


--
-- Name: idx_videos_source_file_name_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_source_file_name_asc_with_id ON app_public.videos USING btree (source_file_name, id);


--
-- Name: idx_videos_source_file_name_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_source_file_name_desc_with_id ON app_public.videos USING btree (source_file_name DESC, id);


--
-- Name: idx_videos_subtitle_languages_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_subtitle_languages_asc_with_id ON app_public.videos USING btree (subtitle_languages, id);


--
-- Name: idx_videos_subtitle_languages_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_subtitle_languages_desc_with_id ON app_public.videos USING btree (subtitle_languages DESC, id);


--
-- Name: idx_videos_tags_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_tags_name ON app_public.videos_tags USING btree (name);


--
-- Name: idx_videos_tags_video_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_tags_video_id ON app_public.videos_tags USING btree (video_id);


--
-- Name: idx_videos_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_title_asc_with_id ON app_public.videos USING btree (title, id);


--
-- Name: idx_videos_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_title_desc_with_id ON app_public.videos USING btree (title DESC, id);


--
-- Name: idx_videos_transcoding_status_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_transcoding_status_asc_with_id ON app_public.videos USING btree (transcoding_status, id);


--
-- Name: idx_videos_transcoding_status_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_videos_transcoding_status_desc_with_id ON app_public.videos USING btree (transcoding_status DESC, id);


--
-- Name: transcoding_acquisition_profiles _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.transcoding_acquisition_profiles FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: transcoding_processing_profiles _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.transcoding_processing_profiles FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: transcoding_publishing_profiles _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.transcoding_publishing_profiles FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: videos _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.videos FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: transcoding_acquisition_profiles _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.transcoding_acquisition_profiles FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: transcoding_processing_profiles _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.transcoding_processing_profiles FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: transcoding_publishing_profiles _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.transcoding_publishing_profiles FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: videos _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.videos FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: transcoding_acquisition_profiles _300_check_validity; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _300_check_validity BEFORE INSERT OR UPDATE ON app_public.transcoding_acquisition_profiles FOR EACH ROW EXECUTE FUNCTION app_hidden.tg_transcoding_acquisition_profiles__check_validity();


--
-- Name: transcoding_processing_profiles _300_check_validity; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _300_check_validity BEFORE INSERT OR UPDATE ON app_public.transcoding_processing_profiles FOR EACH ROW EXECUTE FUNCTION app_hidden.tg_transcoding_processing_profiles__check_validity();


--
-- Name: transcoding_publishing_profiles _300_check_validity; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _300_check_validity BEFORE INSERT OR UPDATE ON app_public.transcoding_publishing_profiles FOR EACH ROW EXECUTE FUNCTION app_hidden.tg_transcoding_publishing_profiles__check_validity();


--
-- Name: videos _500_gql_videos_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_videos_deleted BEFORE DELETE ON app_public.videos FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('VideoDeleted', 'graphql:videos', 'id');


--
-- Name: videos _500_gql_videos_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_videos_inserted AFTER INSERT ON app_public.videos FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('VideoCreated', 'graphql:videos', 'id');


--
-- Name: videos_tags _500_gql_videos_tags_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_videos_tags_deleted BEFORE DELETE ON app_public.videos_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('VideoTagDeleted', 'graphql:videos', 'video_id');


--
-- Name: videos_tags _500_gql_videos_tags_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_videos_tags_inserted AFTER INSERT ON app_public.videos_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('VideoTagCreated', 'graphql:videos', 'video_id');


--
-- Name: videos_tags _500_gql_videos_tags_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_videos_tags_updated AFTER UPDATE ON app_public.videos_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('VideoTagChanged', 'graphql:videos', 'video_id');


--
-- Name: videos _500_gql_videos_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_videos_updated AFTER UPDATE ON app_public.videos FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('VideoChanged', 'graphql:videos', 'id');


--
-- Name: transcoding_histories transcoding_histories_video_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.transcoding_histories
    ADD CONSTRAINT transcoding_histories_video_id_fkey FOREIGN KEY (video_id) REFERENCES app_public.videos(id) ON DELETE CASCADE;


--
-- Name: transcoding_video_representations transcoding_video_representat_transcoding_processing_profi_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.transcoding_video_representations
    ADD CONSTRAINT transcoding_video_representat_transcoding_processing_profi_fkey FOREIGN KEY (transcoding_processing_profile_id) REFERENCES app_public.transcoding_processing_profiles(id) ON DELETE CASCADE;


--
-- Name: videos_tags videos_tags_video_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.videos_tags
    ADD CONSTRAINT videos_tags_video_id_fkey FOREIGN KEY (video_id) REFERENCES app_public.videos(id) ON DELETE CASCADE;


--
-- Name: transcoding_acquisition_profiles; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.transcoding_acquisition_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: transcoding_acquisition_profiles transcoding_acquisition_profiles_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY transcoding_acquisition_profiles_authorization ON app_public.transcoding_acquisition_profiles USING (app_hidden.user_has_permission('ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('ADMIN'::text));


--
-- Name: transcoding_acquisition_profiles transcoding_acquisition_profiles_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY transcoding_acquisition_profiles_authorization_delete ON app_public.transcoding_acquisition_profiles AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('ADMIN'::text));


--
-- Name: transcoding_histories; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.transcoding_histories ENABLE ROW LEVEL SECURITY;

--
-- Name: transcoding_histories transcoding_histories_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY transcoding_histories_authorization ON app_public.transcoding_histories FOR SELECT USING (app_hidden.user_has_permission('VIDEO_READER,VIDEO_EDITOR,ADMIN'::text));


--
-- Name: transcoding_processing_profiles; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.transcoding_processing_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: transcoding_processing_profiles transcoding_processing_profiles_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY transcoding_processing_profiles_authorization ON app_public.transcoding_processing_profiles USING (app_hidden.user_has_permission('ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('ADMIN'::text));


--
-- Name: transcoding_processing_profiles transcoding_processing_profiles_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY transcoding_processing_profiles_authorization_delete ON app_public.transcoding_processing_profiles AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('ADMIN'::text));


--
-- Name: transcoding_publishing_profiles; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.transcoding_publishing_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: transcoding_publishing_profiles transcoding_publishing_profiles_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY transcoding_publishing_profiles_authorization ON app_public.transcoding_publishing_profiles USING (app_hidden.user_has_permission('ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('ADMIN'::text));


--
-- Name: transcoding_publishing_profiles transcoding_publishing_profiles_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY transcoding_publishing_profiles_authorization_delete ON app_public.transcoding_publishing_profiles AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('ADMIN'::text));


--
-- Name: transcoding_video_representations; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.transcoding_video_representations ENABLE ROW LEVEL SECURITY;

--
-- Name: transcoding_video_representations transcoding_video_representations_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY transcoding_video_representations_authorization ON app_public.transcoding_video_representations USING (app_hidden.user_has_permission('ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('ADMIN'::text));


--
-- Name: transcoding_video_representations transcoding_video_representations_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY transcoding_video_representations_authorization_delete ON app_public.transcoding_video_representations AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('ADMIN'::text));


--
-- Name: videos; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.videos ENABLE ROW LEVEL SECURITY;

--
-- Name: videos videos_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY videos_authorization ON app_public.videos USING (app_hidden.user_has_permission('VIDEO_READER,VIDEO_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('VIDEO_EDITOR,ADMIN'::text));


--
-- Name: videos videos_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY videos_authorization_delete ON app_public.videos AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('VIDEO_EDITOR,ADMIN'::text));


--
-- Name: videos_tags; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.videos_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: videos_tags videos_tags_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY videos_tags_authorization ON app_public.videos_tags USING (app_hidden.user_has_permission('VIDEO_READER,VIDEO_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('VIDEO_EDITOR,ADMIN'::text));


--
-- Name: videos_tags videos_tags_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY videos_tags_authorization_delete ON app_public.videos_tags AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('VIDEO_EDITOR,ADMIN'::text));


--
-- Name: SCHEMA app_hidden; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA app_hidden TO navy_video_service_visitor;


--
-- Name: SCHEMA app_public; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA app_public TO navy_video_service_visitor;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO navy_video_service_owner;
GRANT USAGE ON SCHEMA public TO navy_video_service_visitor;


--
-- Name: FUNCTION constraint_max_length(input_value text, max_length integer, error_message text, error_code text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.constraint_max_length(input_value text, max_length integer, error_message text, error_code text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.constraint_max_length(input_value text, max_length integer, error_message text, error_code text) TO navy_video_service_visitor;


--
-- Name: FUNCTION constraint_min_length(input_value text, min_length integer, error_message text, error_code text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.constraint_min_length(input_value text, min_length integer, error_message text, error_code text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.constraint_min_length(input_value text, min_length integer, error_message text, error_code text) TO navy_video_service_visitor;


--
-- Name: FUNCTION constraint_not_empty(input_value text, error_message text, error_code text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.constraint_not_empty(input_value text, error_message text, error_code text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.constraint_not_empty(input_value text, error_message text, error_code text) TO navy_video_service_visitor;


--
-- Name: FUNCTION define_authentication(readpermissions text, modifypermissions text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_authentication(readpermissions text, modifypermissions text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_authentication(readpermissions text, modifypermissions text, tablename text, schemaname text) TO navy_video_service_visitor;


--
-- Name: FUNCTION define_index(fieldname text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_index(fieldname text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_index(fieldname text, tablename text, schemaname text) TO navy_video_service_visitor;


--
-- Name: FUNCTION define_indexes_with_id(fieldname text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_indexes_with_id(fieldname text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_indexes_with_id(fieldname text, tablename text, schemaname text) TO navy_video_service_visitor;


--
-- Name: FUNCTION define_like_index(fieldname text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_like_index(fieldname text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_like_index(fieldname text, tablename text, schemaname text) TO navy_video_service_visitor;


--
-- Name: FUNCTION define_readonly_authentication(readpermissions text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_readonly_authentication(readpermissions text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_readonly_authentication(readpermissions text, tablename text, schemaname text) TO navy_video_service_visitor;


--
-- Name: FUNCTION define_subscription_triggers(idcolumn text, tablename text, schemaname text, maintablename text, eventtype text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_subscription_triggers(idcolumn text, tablename text, schemaname text, maintablename text, eventtype text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_subscription_triggers(idcolumn text, tablename text, schemaname text, maintablename text, eventtype text) TO navy_video_service_visitor;


--
-- Name: FUNCTION define_timestamps_trigger(tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_timestamps_trigger(tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_timestamps_trigger(tablename text, schemaname text) TO navy_video_service_visitor;


--
-- Name: FUNCTION define_unique_constraint(fieldname text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_unique_constraint(fieldname text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_unique_constraint(fieldname text, tablename text, schemaname text) TO navy_video_service_visitor;


--
-- Name: FUNCTION define_unique_index(fieldname text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_unique_index(fieldname text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_unique_index(fieldname text, tablename text, schemaname text) TO navy_video_service_visitor;


--
-- Name: FUNCTION define_users_trigger(tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_users_trigger(tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_users_trigger(tablename text, schemaname text) TO navy_video_service_visitor;


--
-- Name: FUNCTION expose_enum_endpoint(typename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.expose_enum_endpoint(typename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.expose_enum_endpoint(typename text, schemaname text) TO navy_video_service_visitor;


--
-- Name: FUNCTION raise_error(error_message text, error_code text, VARIADIC placeholder_values text[]); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.raise_error(error_message text, error_code text, VARIADIC placeholder_values text[]) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.raise_error(error_message text, error_code text, VARIADIC placeholder_values text[]) TO navy_video_service_visitor;


--
-- Name: FUNCTION tg__timestamps(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg__timestamps() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg__timestamps() TO navy_video_service_visitor;


--
-- Name: FUNCTION tg__username(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg__username() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg__username() TO navy_video_service_visitor;


--
-- Name: FUNCTION tg_transcoding_acquisition_profiles__check_validity(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg_transcoding_acquisition_profiles__check_validity() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg_transcoding_acquisition_profiles__check_validity() TO navy_video_service_visitor;


--
-- Name: FUNCTION tg_transcoding_processing_profiles__check_validity(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg_transcoding_processing_profiles__check_validity() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg_transcoding_processing_profiles__check_validity() TO navy_video_service_visitor;


--
-- Name: FUNCTION tg_transcoding_publishing_profiles__check_validity(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg_transcoding_publishing_profiles__check_validity() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg_transcoding_publishing_profiles__check_validity() TO navy_video_service_visitor;


--
-- Name: FUNCTION user_has_permission(required_permissions text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.user_has_permission(required_permissions text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.user_has_permission(required_permissions text) TO navy_video_service_visitor;


--
-- Name: FUNCTION user_has_permission_and_tag(required_permissions text, fieldvalue text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.user_has_permission_and_tag(required_permissions text, fieldvalue text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.user_has_permission_and_tag(required_permissions text, fieldvalue text) TO navy_video_service_visitor;


--
-- Name: FUNCTION user_has_setting(required_settings text, local_variable_field text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.user_has_setting(required_settings text, local_variable_field text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.user_has_setting(required_settings text, local_variable_field text) TO navy_video_service_visitor;


--
-- Name: FUNCTION user_has_tag(required_permissions text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.user_has_tag(required_permissions text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.user_has_tag(required_permissions text) TO navy_video_service_visitor;


--
-- Name: FUNCTION validation_is_base64(input_value text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.validation_is_base64(input_value text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.validation_is_base64(input_value text) TO navy_video_service_visitor;


--
-- Name: FUNCTION validation_is_url(input_value text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.validation_is_url(input_value text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.validation_is_url(input_value text) TO navy_video_service_visitor;


--
-- Name: FUNCTION validation_not_empty(input_value text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.validation_not_empty(input_value text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.validation_not_empty(input_value text) TO navy_video_service_visitor;


--
-- Name: FUNCTION validation_starts_with(input_value text, prefix_value text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.validation_starts_with(input_value text, prefix_value text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.validation_starts_with(input_value text, prefix_value text) TO navy_video_service_visitor;


--
-- Name: FUNCTION get_archiving_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_archiving_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_archiving_values() TO navy_video_service_visitor;


--
-- Name: FUNCTION get_drm_protection_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_drm_protection_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_drm_protection_values() TO navy_video_service_visitor;


--
-- Name: FUNCTION get_output_format_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_output_format_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_output_format_values() TO navy_video_service_visitor;


--
-- Name: FUNCTION get_qa_status_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_qa_status_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_qa_status_values() TO navy_video_service_visitor;


--
-- Name: FUNCTION get_transcoding_status_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_transcoding_status_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_transcoding_status_values() TO navy_video_service_visitor;


--
-- Name: FUNCTION tg__graphql_subscription(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.tg__graphql_subscription() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.tg__graphql_subscription() TO navy_video_service_visitor;


--
-- Name: TABLE transcoding_acquisition_profiles; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT ON TABLE app_public.transcoding_acquisition_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_acquisition_profiles.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(title) ON TABLE app_public.transcoding_acquisition_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_acquisition_profiles.uri_path; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(uri_path) ON TABLE app_public.transcoding_acquisition_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_acquisition_profiles.root_folder_path; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(root_folder_path) ON TABLE app_public.transcoding_acquisition_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_acquisition_profiles.read_credentials_name; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(read_credentials_name) ON TABLE app_public.transcoding_acquisition_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_acquisition_profiles.read_credentials_secret; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(read_credentials_secret) ON TABLE app_public.transcoding_acquisition_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_acquisition_profiles.list_credentials_name; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(list_credentials_name) ON TABLE app_public.transcoding_acquisition_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_acquisition_profiles.list_credentials_secret; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(list_credentials_secret) ON TABLE app_public.transcoding_acquisition_profiles TO navy_video_service_visitor;


--
-- Name: SEQUENCE transcoding_acquisition_profiles_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.transcoding_acquisition_profiles_id_seq TO navy_video_service_visitor;


--
-- Name: TABLE transcoding_histories; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT ON TABLE app_public.transcoding_histories TO navy_video_service_visitor;


--
-- Name: SEQUENCE transcoding_histories_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.transcoding_histories_id_seq TO navy_video_service_visitor;


--
-- Name: TABLE transcoding_processing_profiles; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(title),UPDATE(title) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.video_stream_expression; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(video_stream_expression),UPDATE(video_stream_expression) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.audio_file_language_expression; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(audio_file_language_expression),UPDATE(audio_file_language_expression) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.subtitle_file_language_expression; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(subtitle_file_language_expression),UPDATE(subtitle_file_language_expression) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.caption_file_language_expression; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(caption_file_language_expression),UPDATE(caption_file_language_expression) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.output_format; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(output_format),UPDATE(output_format) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.drm_protection; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(drm_protection),UPDATE(drm_protection) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.archiving; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(archiving),UPDATE(archiving) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.use_native_language_names; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(use_native_language_names),UPDATE(use_native_language_names) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.delete_files_from_source_when_done; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(delete_files_from_source_when_done),UPDATE(delete_files_from_source_when_done) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.drm_api_url; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(drm_api_url),UPDATE(drm_api_url) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.drm_tenant_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(drm_tenant_id),UPDATE(drm_tenant_id) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.drm_management_key; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(drm_management_key),UPDATE(drm_management_key) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.drm_key_seed; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(drm_key_seed),UPDATE(drm_key_seed) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_processing_profiles.drm_thumbprints; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(drm_thumbprints),UPDATE(drm_thumbprints) ON TABLE app_public.transcoding_processing_profiles TO navy_video_service_visitor;


--
-- Name: SEQUENCE transcoding_processing_profiles_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.transcoding_processing_profiles_id_seq TO navy_video_service_visitor;


--
-- Name: TABLE transcoding_publishing_profiles; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT ON TABLE app_public.transcoding_publishing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_publishing_profiles.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(title) ON TABLE app_public.transcoding_publishing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_publishing_profiles.uri_path; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(uri_path) ON TABLE app_public.transcoding_publishing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_publishing_profiles.credentials_name; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(credentials_name) ON TABLE app_public.transcoding_publishing_profiles TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_publishing_profiles.credentials_secret; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(credentials_secret) ON TABLE app_public.transcoding_publishing_profiles TO navy_video_service_visitor;


--
-- Name: SEQUENCE transcoding_publishing_profiles_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.transcoding_publishing_profiles_id_seq TO navy_video_service_visitor;


--
-- Name: TABLE transcoding_video_representations; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.transcoding_video_representations TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_video_representations.transcoding_processing_profile_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(transcoding_processing_profile_id) ON TABLE app_public.transcoding_video_representations TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_video_representations.width; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(width),UPDATE(width) ON TABLE app_public.transcoding_video_representations TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_video_representations.height; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(height),UPDATE(height) ON TABLE app_public.transcoding_video_representations TO navy_video_service_visitor;


--
-- Name: COLUMN transcoding_video_representations.bitrate_in_kbps; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(bitrate_in_kbps),UPDATE(bitrate_in_kbps) ON TABLE app_public.transcoding_video_representations TO navy_video_service_visitor;


--
-- Name: SEQUENCE transcoding_video_representations_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.transcoding_video_representations_id_seq TO navy_video_service_visitor;


--
-- Name: TABLE videos; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.videos TO navy_video_service_visitor;


--
-- Name: COLUMN videos.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(title) ON TABLE app_public.videos TO navy_video_service_visitor;


--
-- Name: COLUMN videos.qa_status; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(qa_status) ON TABLE app_public.videos TO navy_video_service_visitor;


--
-- Name: COLUMN videos.qa_comment; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(qa_comment) ON TABLE app_public.videos TO navy_video_service_visitor;


--
-- Name: COLUMN videos.is_archived; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(is_archived) ON TABLE app_public.videos TO navy_video_service_visitor;


--
-- Name: SEQUENCE videos_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.videos_id_seq TO navy_video_service_visitor;


--
-- Name: TABLE videos_tags; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.videos_tags TO navy_video_service_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app_hidden; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA app_hidden REVOKE ALL ON SEQUENCES  FROM navy_video_service_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA app_hidden GRANT SELECT,USAGE ON SEQUENCES  TO navy_video_service_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: app_hidden; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA app_hidden REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA app_hidden REVOKE ALL ON FUNCTIONS  FROM navy_video_service_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA app_hidden GRANT ALL ON FUNCTIONS  TO navy_video_service_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app_public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA app_public REVOKE ALL ON SEQUENCES  FROM navy_video_service_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA app_public GRANT SELECT,USAGE ON SEQUENCES  TO navy_video_service_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: app_public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA app_public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA app_public REVOKE ALL ON FUNCTIONS  FROM navy_video_service_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA app_public GRANT ALL ON FUNCTIONS  TO navy_video_service_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA public REVOKE ALL ON SEQUENCES  FROM navy_video_service_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA public GRANT SELECT,USAGE ON SEQUENCES  TO navy_video_service_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM navy_video_service_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner IN SCHEMA public GRANT ALL ON FUNCTIONS  TO navy_video_service_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_video_service_owner REVOKE ALL ON FUNCTIONS  FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

