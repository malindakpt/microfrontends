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
-- Name: collection_entity; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.collection_entity AS ENUM (
    'MOVIE',
    'TVSHOW',
    'SEASON',
    'EPISODE'
);


--
-- Name: collection_image_type; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.collection_image_type AS ENUM (
    'COVER',
    'TEASER'
);


--
-- Name: collection_type; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.collection_type AS ENUM (
    'MANUAL',
    'AUTOMATIC'
);


--
-- Name: episode_image_type; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.episode_image_type AS ENUM (
    'COVER',
    'TEASER'
);


--
-- Name: iso_alpha_three_country_codes; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.iso_alpha_three_country_codes AS ENUM (
    'ABW',
    'AFG',
    'AGO',
    'AIA',
    'ALA',
    'ALB',
    'AND',
    'ARE',
    'ARG',
    'ARM',
    'ASM',
    'ATA',
    'ATF',
    'ATG',
    'AUS',
    'AUT',
    'AZE',
    'BDI',
    'BEL',
    'BEN',
    'BES',
    'BFA',
    'BGD',
    'BGR',
    'BHR',
    'BHS',
    'BIH',
    'BLM',
    'BLR',
    'BLZ',
    'BMU',
    'BOL',
    'BRA',
    'BRB',
    'BRN',
    'BTN',
    'BVT',
    'BWA',
    'CAF',
    'CAN',
    'CCK',
    'CHE',
    'CHL',
    'CHN',
    'CIV',
    'CMR',
    'COD',
    'COG',
    'COK',
    'COL',
    'COM',
    'CPV',
    'CRI',
    'CUB',
    'CUW',
    'CXR',
    'CYM',
    'CYP',
    'CZE',
    'DEU',
    'DJI',
    'DMA',
    'DNK',
    'DOM',
    'DZA',
    'ECU',
    'EGY',
    'ERI',
    'ESH',
    'ESP',
    'EST',
    'ETH',
    'FIN',
    'FJI',
    'FLK',
    'FRA',
    'FRO',
    'FSM',
    'GAB',
    'GBR',
    'GEO',
    'GGY',
    'GHA',
    'GIB',
    'GIN',
    'GLP',
    'GMB',
    'GNB',
    'GNQ',
    'GRC',
    'GRD',
    'GRL',
    'GTM',
    'GUF',
    'GUM',
    'GUY',
    'HKG',
    'HMD',
    'HND',
    'HRV',
    'HTI',
    'HUN',
    'IDN',
    'IMN',
    'IND',
    'IOT',
    'IRL',
    'IRN',
    'IRQ',
    'ISL',
    'ISR',
    'ITA',
    'JAM',
    'JEY',
    'JOR',
    'JPN',
    'KAZ',
    'KEN',
    'KGZ',
    'KHM',
    'KIR',
    'KNA',
    'KOR',
    'KWT',
    'LAO',
    'LBN',
    'LBR',
    'LBY',
    'LCA',
    'LIE',
    'LKA',
    'LSO',
    'LTU',
    'LUX',
    'LVA',
    'MAC',
    'MAF',
    'MAR',
    'MCO',
    'MDA',
    'MDG',
    'MDV',
    'MEX',
    'MHL',
    'MKD',
    'MLI',
    'MLT',
    'MMR',
    'MNE',
    'MNG',
    'MNP',
    'MOZ',
    'MRT',
    'MSR',
    'MTQ',
    'MUS',
    'MWI',
    'MYS',
    'MYT',
    'NAM',
    'NCL',
    'NER',
    'NFK',
    'NGA',
    'NIC',
    'NIU',
    'NLD',
    'NOR',
    'NPL',
    'NRU',
    'NZL',
    'OMN',
    'PAK',
    'PAN',
    'PCN',
    'PER',
    'PHL',
    'PLW',
    'PNG',
    'POL',
    'PRI',
    'PRK',
    'PRT',
    'PRY',
    'PSE',
    'PYF',
    'QAT',
    'REU',
    'ROU',
    'RUS',
    'RWA',
    'SAU',
    'SDN',
    'SEN',
    'SGP',
    'SGS',
    'SHN',
    'SJM',
    'SLB',
    'SLE',
    'SLV',
    'SMR',
    'SOM',
    'SPM',
    'SRB',
    'SSD',
    'STP',
    'SUR',
    'SVK',
    'SVN',
    'SWE',
    'SWZ',
    'SXM',
    'SYC',
    'SYR',
    'TCA',
    'TCD',
    'TGO',
    'THA',
    'TJK',
    'TKL',
    'TKM',
    'TLS',
    'TON',
    'TTO',
    'TUN',
    'TUR',
    'TUV',
    'TWN',
    'TZA',
    'UGA',
    'UKR',
    'UMI',
    'URY',
    'USA',
    'UZB',
    'VAT',
    'VCT',
    'VEN',
    'VGB',
    'VIR',
    'VNM',
    'VUT',
    'WLF',
    'WSM',
    'YEM',
    'ZAF',
    'ZMB',
    'ZWE'
);


--
-- Name: movie_image_type; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.movie_image_type AS ENUM (
    'COVER',
    'TEASER'
);


--
-- Name: publish_status; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.publish_status AS ENUM (
    'NOT_PUBLISHED',
    'PUBLISH_PROGRESS',
    'PUBLISHED',
    'PUBLISH_ERROR',
    'CHANGED'
);


--
-- Name: season_image_type; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.season_image_type AS ENUM (
    'COVER',
    'TEASER'
);


--
-- Name: tvshow_image_type; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.tvshow_image_type AS ENUM (
    'COVER',
    'TEASER'
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
-- Name: get_collection_entity_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_collection_entity_values() RETURNS SETOF app_public.collection_entity
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.collection_entity));$$;


--
-- Name: get_collection_image_type_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_collection_image_type_values() RETURNS SETOF app_public.collection_image_type
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.collection_image_type));$$;


--
-- Name: get_collection_type_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_collection_type_values() RETURNS SETOF app_public.collection_type
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.collection_type));$$;


--
-- Name: get_episode_image_type_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_episode_image_type_values() RETURNS SETOF app_public.episode_image_type
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.episode_image_type));$$;


--
-- Name: get_iso_alpha_three_country_codes_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_iso_alpha_three_country_codes_values() RETURNS SETOF app_public.iso_alpha_three_country_codes
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.iso_alpha_three_country_codes));$$;


--
-- Name: get_movie_image_type_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_movie_image_type_values() RETURNS SETOF app_public.movie_image_type
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.movie_image_type));$$;


--
-- Name: get_publish_status_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_publish_status_values() RETURNS SETOF app_public.publish_status
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.publish_status));$$;


--
-- Name: get_season_image_type_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_season_image_type_values() RETURNS SETOF app_public.season_image_type
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.season_image_type));$$;


--
-- Name: get_tvshow_image_type_values(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_tvshow_image_type_values() RETURNS SETOF app_public.tvshow_image_type
    LANGUAGE sql STABLE
    AS $$ SELECT unnest(enum_range(NULL::app_public.tvshow_image_type));$$;


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
-- Name: automatic_collections_filters; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.automatic_collections_filters (
    id integer NOT NULL,
    collection_id integer NOT NULL,
    entity_type app_public.collection_entity NOT NULL,
    filter_key text NOT NULL,
    filter_value text,
    CONSTRAINT filter_key_not_empty CHECK (app_hidden.constraint_not_empty(filter_key, 'The filter key cannot be empty.'::text))
);


--
-- Name: automatic_collections_filters_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.automatic_collections_filters ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.automatic_collections_filters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: collection_relations; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.collection_relations (
    id integer NOT NULL,
    collection_id integer NOT NULL,
    sort_order integer NOT NULL,
    movie_id integer,
    tvshow_id integer,
    season_id integer,
    episode_id integer,
    CONSTRAINT exactly_one_relation CHECK ((num_nonnulls(movie_id, tvshow_id, season_id, episode_id) = 1))
);


--
-- Name: collection_relations_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.collection_relations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.collection_relations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: collections; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.collections (
    id integer NOT NULL,
    title text NOT NULL,
    external_id text,
    synopsis text,
    description text,
    collection_type app_public.collection_type,
    automatic_collection_sort_key text,
    publish_status app_public.publish_status DEFAULT 'NOT_PUBLISHED'::app_public.publish_status,
    published_date timestamp with time zone,
    published_user text,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text,
    CONSTRAINT title_max_length CHECK (app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.'::text)),
    CONSTRAINT title_not_empty CHECK (app_hidden.constraint_not_empty(title, 'The title cannot be empty.'::text))
);


--
-- Name: collections_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.collections ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.collections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: collections_images; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.collections_images (
    collection_id integer NOT NULL,
    image_id integer NOT NULL,
    image_type app_public.collection_image_type NOT NULL
);


--
-- Name: collections_tags; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.collections_tags (
    collection_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: episodes; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.episodes (
    id integer NOT NULL,
    season_id integer,
    index integer NOT NULL,
    title text NOT NULL,
    external_id text,
    original_title text,
    synopsis text,
    description text,
    studio text,
    released date,
    main_video_id integer,
    publish_status app_public.publish_status DEFAULT 'NOT_PUBLISHED'::app_public.publish_status,
    published_date timestamp with time zone,
    published_user text,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text,
    CONSTRAINT title_max_length CHECK (app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.'::text)),
    CONSTRAINT title_not_empty CHECK (app_hidden.constraint_not_empty(title, 'The title cannot be empty.'::text))
);


--
-- Name: episodes_casts; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.episodes_casts (
    episode_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: episodes_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.episodes ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.episodes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: episodes_images; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.episodes_images (
    episode_id integer NOT NULL,
    image_id integer NOT NULL,
    image_type app_public.episode_image_type NOT NULL
);


--
-- Name: episodes_licenses; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.episodes_licenses (
    id integer NOT NULL,
    episode_id integer NOT NULL,
    license_start timestamp with time zone,
    license_end timestamp with time zone,
    countries app_public.iso_alpha_three_country_codes[],
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text
);


--
-- Name: episodes_licenses_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.episodes_licenses ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.episodes_licenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: episodes_production_countries; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.episodes_production_countries (
    episode_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: episodes_tags; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.episodes_tags (
    episode_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: episodes_trailers; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.episodes_trailers (
    episode_id integer NOT NULL,
    video_id integer NOT NULL
);


--
-- Name: episodes_tvshow_genres; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.episodes_tvshow_genres (
    episode_id integer NOT NULL,
    tvshow_genres_id integer NOT NULL
);


--
-- Name: movie_genres; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.movie_genres (
    id integer NOT NULL,
    title text NOT NULL,
    sort_order integer NOT NULL,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text,
    CONSTRAINT title_max_length CHECK (app_hidden.constraint_max_length(title, 50, 'The title can only be %2$s characters long.'::text)),
    CONSTRAINT title_not_empty CHECK (app_hidden.constraint_not_empty(title, 'The title cannot be empty.'::text))
);


--
-- Name: movie_genres_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movie_genres ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.movie_genres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movies; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.movies (
    id integer NOT NULL,
    title text NOT NULL,
    external_id text,
    original_title text,
    synopsis text,
    description text,
    studio text,
    released date,
    main_video_id integer,
    publish_status app_public.publish_status DEFAULT 'NOT_PUBLISHED'::app_public.publish_status,
    published_date timestamp with time zone,
    published_user text,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text,
    CONSTRAINT title_max_length CHECK (app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.'::text)),
    CONSTRAINT title_not_empty CHECK (app_hidden.constraint_not_empty(title, 'The title cannot be empty.'::text))
);


--
-- Name: movies_casts; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.movies_casts (
    movie_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movies ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.movies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movies_images; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.movies_images (
    movie_id integer NOT NULL,
    image_id integer NOT NULL,
    image_type app_public.movie_image_type NOT NULL
);


--
-- Name: movies_licenses; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.movies_licenses (
    id integer NOT NULL,
    movie_id integer NOT NULL,
    license_start timestamp with time zone,
    license_end timestamp with time zone,
    countries app_public.iso_alpha_three_country_codes[],
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text
);


--
-- Name: movies_licenses_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movies_licenses ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.movies_licenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movies_movie_genres; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.movies_movie_genres (
    movie_id integer NOT NULL,
    movie_genres_id integer NOT NULL
);


--
-- Name: movies_production_countries; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.movies_production_countries (
    movie_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: movies_tags; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.movies_tags (
    movie_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: movies_trailers; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.movies_trailers (
    movie_id integer NOT NULL,
    video_id integer NOT NULL
);


--
-- Name: seasons; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.seasons (
    id integer NOT NULL,
    tvshow_id integer,
    index integer NOT NULL,
    external_id text,
    synopsis text,
    description text,
    studio text,
    released date,
    publish_status app_public.publish_status DEFAULT 'NOT_PUBLISHED'::app_public.publish_status,
    published_date timestamp with time zone,
    published_user text,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text
);


--
-- Name: seasons_casts; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.seasons_casts (
    season_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: seasons_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.seasons ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.seasons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: seasons_images; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.seasons_images (
    season_id integer NOT NULL,
    image_id integer NOT NULL,
    image_type app_public.season_image_type NOT NULL
);


--
-- Name: seasons_licenses; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.seasons_licenses (
    id integer NOT NULL,
    season_id integer NOT NULL,
    license_start timestamp with time zone,
    license_end timestamp with time zone,
    countries app_public.iso_alpha_three_country_codes[],
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text
);


--
-- Name: seasons_licenses_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.seasons_licenses ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.seasons_licenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: seasons_production_countries; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.seasons_production_countries (
    season_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: seasons_tags; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.seasons_tags (
    season_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: seasons_trailers; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.seasons_trailers (
    season_id integer NOT NULL,
    video_id integer NOT NULL
);


--
-- Name: seasons_tvshow_genres; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.seasons_tvshow_genres (
    season_id integer NOT NULL,
    tvshow_genres_id integer NOT NULL
);


--
-- Name: tvshow_genres; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.tvshow_genres (
    id integer NOT NULL,
    title text NOT NULL,
    sort_order integer NOT NULL,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text,
    CONSTRAINT title_max_length CHECK (app_hidden.constraint_max_length(title, 50, 'The title can only be %2$s characters long.'::text)),
    CONSTRAINT title_not_empty CHECK (app_hidden.constraint_not_empty(title, 'The title cannot be empty.'::text))
);


--
-- Name: tvshow_genres_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshow_genres ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.tvshow_genres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tvshows; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.tvshows (
    id integer NOT NULL,
    title text NOT NULL,
    external_id text,
    original_title text,
    synopsis text,
    description text,
    studio text,
    released date,
    publish_status app_public.publish_status DEFAULT 'NOT_PUBLISHED'::app_public.publish_status,
    published_date timestamp with time zone,
    published_user text,
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text,
    CONSTRAINT title_max_length CHECK (app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.'::text)),
    CONSTRAINT title_not_empty CHECK (app_hidden.constraint_not_empty(title, 'The title cannot be empty.'::text))
);


--
-- Name: tvshows_casts; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.tvshows_casts (
    tvshow_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: tvshows_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshows ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.tvshows_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tvshows_images; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.tvshows_images (
    tvshow_id integer NOT NULL,
    image_id integer NOT NULL,
    image_type app_public.tvshow_image_type NOT NULL
);


--
-- Name: tvshows_licenses; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.tvshows_licenses (
    id integer NOT NULL,
    tvshow_id integer NOT NULL,
    license_start timestamp with time zone,
    license_end timestamp with time zone,
    countries app_public.iso_alpha_three_country_codes[],
    created_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_date timestamp with time zone DEFAULT timezone('utc'::text, now()),
    created_user text,
    updated_user text
);


--
-- Name: tvshows_licenses_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshows_licenses ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME app_public.tvshows_licenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tvshows_production_countries; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.tvshows_production_countries (
    tvshow_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: tvshows_tags; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.tvshows_tags (
    tvshow_id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'The name cannot be empty.'::text))
);


--
-- Name: tvshows_trailers; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.tvshows_trailers (
    tvshow_id integer NOT NULL,
    video_id integer NOT NULL
);


--
-- Name: tvshows_tvshow_genres; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.tvshows_tvshow_genres (
    tvshow_id integer NOT NULL,
    tvshow_genres_id integer NOT NULL
);


--
-- Name: automatic_collections_filters automatic_collections_filters_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.automatic_collections_filters
    ADD CONSTRAINT automatic_collections_filters_pkey PRIMARY KEY (id);


--
-- Name: collection_relations collection_relations_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collection_relations
    ADD CONSTRAINT collection_relations_pkey PRIMARY KEY (id);


--
-- Name: collections collections_external_id_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collections
    ADD CONSTRAINT collections_external_id_key UNIQUE (external_id);


--
-- Name: collections_images collections_images_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collections_images
    ADD CONSTRAINT collections_images_pkey PRIMARY KEY (collection_id, image_id, image_type);


--
-- Name: collections collections_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collections
    ADD CONSTRAINT collections_pkey PRIMARY KEY (id);


--
-- Name: collections_tags collections_tags_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collections_tags
    ADD CONSTRAINT collections_tags_pkey PRIMARY KEY (collection_id, name);


--
-- Name: episodes_casts episodes_casts_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_casts
    ADD CONSTRAINT episodes_casts_pkey PRIMARY KEY (episode_id, name);


--
-- Name: episodes episodes_external_id_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes
    ADD CONSTRAINT episodes_external_id_key UNIQUE (external_id);


--
-- Name: episodes_images episodes_images_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_images
    ADD CONSTRAINT episodes_images_pkey PRIMARY KEY (episode_id, image_id, image_type);


--
-- Name: episodes_licenses episodes_licenses_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_licenses
    ADD CONSTRAINT episodes_licenses_pkey PRIMARY KEY (id);


--
-- Name: episodes episodes_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes
    ADD CONSTRAINT episodes_pkey PRIMARY KEY (id);


--
-- Name: episodes_production_countries episodes_production_countries_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_production_countries
    ADD CONSTRAINT episodes_production_countries_pkey PRIMARY KEY (episode_id, name);


--
-- Name: episodes_tags episodes_tags_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_tags
    ADD CONSTRAINT episodes_tags_pkey PRIMARY KEY (episode_id, name);


--
-- Name: episodes_trailers episodes_trailers_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_trailers
    ADD CONSTRAINT episodes_trailers_pkey PRIMARY KEY (episode_id, video_id);


--
-- Name: episodes_tvshow_genres episodes_tvshow_genres_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_tvshow_genres
    ADD CONSTRAINT episodes_tvshow_genres_pkey PRIMARY KEY (episode_id, tvshow_genres_id);


--
-- Name: movie_genres movie_genres_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movie_genres
    ADD CONSTRAINT movie_genres_pkey PRIMARY KEY (id);


--
-- Name: movies_casts movies_casts_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_casts
    ADD CONSTRAINT movies_casts_pkey PRIMARY KEY (movie_id, name);


--
-- Name: movies movies_external_id_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies
    ADD CONSTRAINT movies_external_id_key UNIQUE (external_id);


--
-- Name: movies_images movies_images_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_images
    ADD CONSTRAINT movies_images_pkey PRIMARY KEY (movie_id, image_id, image_type);


--
-- Name: movies_licenses movies_licenses_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_licenses
    ADD CONSTRAINT movies_licenses_pkey PRIMARY KEY (id);


--
-- Name: movies_movie_genres movies_movie_genres_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_movie_genres
    ADD CONSTRAINT movies_movie_genres_pkey PRIMARY KEY (movie_id, movie_genres_id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: movies_production_countries movies_production_countries_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_production_countries
    ADD CONSTRAINT movies_production_countries_pkey PRIMARY KEY (movie_id, name);


--
-- Name: movies_tags movies_tags_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_tags
    ADD CONSTRAINT movies_tags_pkey PRIMARY KEY (movie_id, name);


--
-- Name: movies_trailers movies_trailers_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_trailers
    ADD CONSTRAINT movies_trailers_pkey PRIMARY KEY (movie_id, video_id);


--
-- Name: seasons_casts seasons_casts_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_casts
    ADD CONSTRAINT seasons_casts_pkey PRIMARY KEY (season_id, name);


--
-- Name: seasons seasons_external_id_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons
    ADD CONSTRAINT seasons_external_id_key UNIQUE (external_id);


--
-- Name: seasons_images seasons_images_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_images
    ADD CONSTRAINT seasons_images_pkey PRIMARY KEY (season_id, image_id, image_type);


--
-- Name: seasons_licenses seasons_licenses_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_licenses
    ADD CONSTRAINT seasons_licenses_pkey PRIMARY KEY (id);


--
-- Name: seasons seasons_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons
    ADD CONSTRAINT seasons_pkey PRIMARY KEY (id);


--
-- Name: seasons_production_countries seasons_production_countries_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_production_countries
    ADD CONSTRAINT seasons_production_countries_pkey PRIMARY KEY (season_id, name);


--
-- Name: seasons_tags seasons_tags_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_tags
    ADD CONSTRAINT seasons_tags_pkey PRIMARY KEY (season_id, name);


--
-- Name: seasons_trailers seasons_trailers_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_trailers
    ADD CONSTRAINT seasons_trailers_pkey PRIMARY KEY (season_id, video_id);


--
-- Name: seasons_tvshow_genres seasons_tvshow_genres_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_tvshow_genres
    ADD CONSTRAINT seasons_tvshow_genres_pkey PRIMARY KEY (season_id, tvshow_genres_id);


--
-- Name: tvshow_genres tvshow_genres_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshow_genres
    ADD CONSTRAINT tvshow_genres_pkey PRIMARY KEY (id);


--
-- Name: tvshows_casts tvshows_casts_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_casts
    ADD CONSTRAINT tvshows_casts_pkey PRIMARY KEY (tvshow_id, name);


--
-- Name: tvshows tvshows_external_id_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows
    ADD CONSTRAINT tvshows_external_id_key UNIQUE (external_id);


--
-- Name: tvshows_images tvshows_images_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_images
    ADD CONSTRAINT tvshows_images_pkey PRIMARY KEY (tvshow_id, image_id, image_type);


--
-- Name: tvshows_licenses tvshows_licenses_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_licenses
    ADD CONSTRAINT tvshows_licenses_pkey PRIMARY KEY (id);


--
-- Name: tvshows tvshows_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows
    ADD CONSTRAINT tvshows_pkey PRIMARY KEY (id);


--
-- Name: tvshows_production_countries tvshows_production_countries_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_production_countries
    ADD CONSTRAINT tvshows_production_countries_pkey PRIMARY KEY (tvshow_id, name);


--
-- Name: tvshows_tags tvshows_tags_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_tags
    ADD CONSTRAINT tvshows_tags_pkey PRIMARY KEY (tvshow_id, name);


--
-- Name: tvshows_trailers tvshows_trailers_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_trailers
    ADD CONSTRAINT tvshows_trailers_pkey PRIMARY KEY (tvshow_id, video_id);


--
-- Name: tvshows_tvshow_genres tvshows_tvshow_genres_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_tvshow_genres
    ADD CONSTRAINT tvshows_tvshow_genres_pkey PRIMARY KEY (tvshow_id, tvshow_genres_id);


--
-- Name: collection_relations unique_episode_per_collection; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collection_relations
    ADD CONSTRAINT unique_episode_per_collection UNIQUE (collection_id, episode_id);


--
-- Name: collection_relations unique_movie_per_collection; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collection_relations
    ADD CONSTRAINT unique_movie_per_collection UNIQUE (collection_id, movie_id);


--
-- Name: collection_relations unique_season_per_collection; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collection_relations
    ADD CONSTRAINT unique_season_per_collection UNIQUE (collection_id, season_id);


--
-- Name: collection_relations unique_tvshow_per_collection; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collection_relations
    ADD CONSTRAINT unique_tvshow_per_collection UNIQUE (collection_id, tvshow_id);


--
-- Name: automatic_collections_filters_collection_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX automatic_collections_filters_collection_id_idx ON app_public.automatic_collections_filters USING btree (collection_id);


--
-- Name: collections_tags_name_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX collections_tags_name_idx ON app_public.collections_tags USING btree (name);


--
-- Name: idx_automatic_collections_filters_collection_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_automatic_collections_filters_collection_id ON app_public.automatic_collections_filters USING btree (collection_id);


--
-- Name: idx_automatic_collections_filters_filter_key; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_automatic_collections_filters_filter_key ON app_public.automatic_collections_filters USING btree (filter_key);


--
-- Name: idx_collection_relations_episode_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collection_relations_episode_id ON app_public.collection_relations USING btree (episode_id);


--
-- Name: idx_collection_relations_movie_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collection_relations_movie_id ON app_public.collection_relations USING btree (movie_id);


--
-- Name: idx_collection_relations_season_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collection_relations_season_id ON app_public.collection_relations USING btree (season_id);


--
-- Name: idx_collection_relations_sort_order; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collection_relations_sort_order ON app_public.collection_relations USING btree (sort_order);


--
-- Name: idx_collection_relations_tvshow_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collection_relations_tvshow_id ON app_public.collection_relations USING btree (tvshow_id);


--
-- Name: idx_collections_collection_type_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_collection_type_asc_with_id ON app_public.collections USING btree (collection_type, id);


--
-- Name: idx_collections_collection_type_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_collection_type_desc_with_id ON app_public.collections USING btree (collection_type DESC, id);


--
-- Name: idx_collections_created_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_created_date_asc_with_id ON app_public.collections USING btree (created_date, id);


--
-- Name: idx_collections_created_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_created_date_desc_with_id ON app_public.collections USING btree (created_date DESC, id);


--
-- Name: idx_collections_external_id_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_external_id_asc_with_id ON app_public.collections USING btree (external_id, id);


--
-- Name: idx_collections_external_id_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_external_id_desc_with_id ON app_public.collections USING btree (external_id DESC, id);


--
-- Name: idx_collections_images_collection_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_images_collection_id ON app_public.collections_images USING btree (collection_id);


--
-- Name: idx_collections_publish_status; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_publish_status ON app_public.collections USING btree (publish_status);


--
-- Name: idx_collections_tags_collection_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_tags_collection_id ON app_public.collections_tags USING btree (collection_id);


--
-- Name: idx_collections_tags_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_tags_name ON app_public.collections_tags USING btree (name);


--
-- Name: idx_collections_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_title_asc_with_id ON app_public.collections USING btree (title, id);


--
-- Name: idx_collections_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_title_desc_with_id ON app_public.collections USING btree (title DESC, id);


--
-- Name: idx_collections_updated_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_updated_date_asc_with_id ON app_public.collections USING btree (updated_date, id);


--
-- Name: idx_collections_updated_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_collections_updated_date_desc_with_id ON app_public.collections USING btree (updated_date DESC, id);


--
-- Name: idx_episodes_casts_episode_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_casts_episode_id ON app_public.episodes_casts USING btree (episode_id);


--
-- Name: idx_episodes_casts_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_casts_name ON app_public.episodes_casts USING btree (name);


--
-- Name: idx_episodes_created_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_created_date_asc_with_id ON app_public.episodes USING btree (created_date, id);


--
-- Name: idx_episodes_created_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_created_date_desc_with_id ON app_public.episodes USING btree (created_date DESC, id);


--
-- Name: idx_episodes_external_id_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_external_id_asc_with_id ON app_public.episodes USING btree (external_id, id);


--
-- Name: idx_episodes_external_id_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_external_id_desc_with_id ON app_public.episodes USING btree (external_id DESC, id);


--
-- Name: idx_episodes_images_episode_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_images_episode_id ON app_public.episodes_images USING btree (episode_id);


--
-- Name: idx_episodes_index_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_index_asc_with_id ON app_public.episodes USING btree (index, id);


--
-- Name: idx_episodes_index_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_index_desc_with_id ON app_public.episodes USING btree (index DESC, id);


--
-- Name: idx_episodes_licenses_episode_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_licenses_episode_id ON app_public.episodes_licenses USING btree (episode_id);


--
-- Name: idx_episodes_licenses_license_start; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_licenses_license_start ON app_public.episodes_licenses USING btree (license_start);


--
-- Name: idx_episodes_original_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_original_title_asc_with_id ON app_public.episodes USING btree (original_title, id);


--
-- Name: idx_episodes_original_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_original_title_desc_with_id ON app_public.episodes USING btree (original_title DESC, id);


--
-- Name: idx_episodes_production_countries_episode_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_production_countries_episode_id ON app_public.episodes_production_countries USING btree (episode_id);


--
-- Name: idx_episodes_production_countries_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_production_countries_name ON app_public.episodes_production_countries USING btree (name);


--
-- Name: idx_episodes_publish_status; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_publish_status ON app_public.episodes USING btree (publish_status);


--
-- Name: idx_episodes_released_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_released_asc_with_id ON app_public.episodes USING btree (released, id);


--
-- Name: idx_episodes_released_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_released_desc_with_id ON app_public.episodes USING btree (released DESC, id);


--
-- Name: idx_episodes_season_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_season_id ON app_public.episodes USING btree (season_id);


--
-- Name: idx_episodes_tags_episode_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_tags_episode_id ON app_public.episodes_tags USING btree (episode_id);


--
-- Name: idx_episodes_tags_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_tags_name ON app_public.episodes_tags USING btree (name);


--
-- Name: idx_episodes_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_title_asc_with_id ON app_public.episodes USING btree (title, id);


--
-- Name: idx_episodes_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_title_desc_with_id ON app_public.episodes USING btree (title DESC, id);


--
-- Name: idx_episodes_trailers_episode_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_trailers_episode_id ON app_public.episodes_trailers USING btree (episode_id);


--
-- Name: idx_episodes_tvshow_genres_episode_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_tvshow_genres_episode_id ON app_public.episodes_tvshow_genres USING btree (episode_id);


--
-- Name: idx_episodes_tvshow_genres_tvshow_genres_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_tvshow_genres_tvshow_genres_id ON app_public.episodes_tvshow_genres USING btree (tvshow_genres_id);


--
-- Name: idx_episodes_updated_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_updated_date_asc_with_id ON app_public.episodes USING btree (updated_date, id);


--
-- Name: idx_episodes_updated_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_episodes_updated_date_desc_with_id ON app_public.episodes USING btree (updated_date DESC, id);


--
-- Name: idx_movie_genres_created_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movie_genres_created_date_asc_with_id ON app_public.movie_genres USING btree (created_date, id);


--
-- Name: idx_movie_genres_created_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movie_genres_created_date_desc_with_id ON app_public.movie_genres USING btree (created_date DESC, id);


--
-- Name: idx_movie_genres_sort_order; Type: INDEX; Schema: app_public; Owner: -
--

CREATE UNIQUE INDEX idx_movie_genres_sort_order ON app_public.movie_genres USING btree (sort_order);


--
-- Name: idx_movie_genres_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movie_genres_title_asc_with_id ON app_public.movie_genres USING btree (title, id);


--
-- Name: idx_movie_genres_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movie_genres_title_desc_with_id ON app_public.movie_genres USING btree (title DESC, id);


--
-- Name: idx_movie_genres_updated_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movie_genres_updated_date_asc_with_id ON app_public.movie_genres USING btree (updated_date, id);


--
-- Name: idx_movie_genres_updated_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movie_genres_updated_date_desc_with_id ON app_public.movie_genres USING btree (updated_date DESC, id);


--
-- Name: idx_movies_casts_movie_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_casts_movie_id ON app_public.movies_casts USING btree (movie_id);


--
-- Name: idx_movies_casts_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_casts_name ON app_public.movies_casts USING btree (name);


--
-- Name: idx_movies_created_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_created_date_asc_with_id ON app_public.movies USING btree (created_date, id);


--
-- Name: idx_movies_created_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_created_date_desc_with_id ON app_public.movies USING btree (created_date DESC, id);


--
-- Name: idx_movies_external_id_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_external_id_asc_with_id ON app_public.movies USING btree (external_id, id);


--
-- Name: idx_movies_external_id_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_external_id_desc_with_id ON app_public.movies USING btree (external_id DESC, id);


--
-- Name: idx_movies_images_movie_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_images_movie_id ON app_public.movies_images USING btree (movie_id);


--
-- Name: idx_movies_licenses_license_start; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_licenses_license_start ON app_public.movies_licenses USING btree (license_start);


--
-- Name: idx_movies_licenses_movie_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_licenses_movie_id ON app_public.movies_licenses USING btree (movie_id);


--
-- Name: idx_movies_movie_genres_movie_genres_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_movie_genres_movie_genres_id ON app_public.movies_movie_genres USING btree (movie_genres_id);


--
-- Name: idx_movies_movie_genres_movie_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_movie_genres_movie_id ON app_public.movies_movie_genres USING btree (movie_id);


--
-- Name: idx_movies_original_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_original_title_asc_with_id ON app_public.movies USING btree (original_title, id);


--
-- Name: idx_movies_original_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_original_title_desc_with_id ON app_public.movies USING btree (original_title DESC, id);


--
-- Name: idx_movies_production_countries_movie_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_production_countries_movie_id ON app_public.movies_production_countries USING btree (movie_id);


--
-- Name: idx_movies_production_countries_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_production_countries_name ON app_public.movies_production_countries USING btree (name);


--
-- Name: idx_movies_publish_status; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_publish_status ON app_public.movies USING btree (publish_status);


--
-- Name: idx_movies_released_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_released_asc_with_id ON app_public.movies USING btree (released, id);


--
-- Name: idx_movies_released_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_released_desc_with_id ON app_public.movies USING btree (released DESC, id);


--
-- Name: idx_movies_tags_movie_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_tags_movie_id ON app_public.movies_tags USING btree (movie_id);


--
-- Name: idx_movies_tags_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_tags_name ON app_public.movies_tags USING btree (name);


--
-- Name: idx_movies_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_title_asc_with_id ON app_public.movies USING btree (title, id);


--
-- Name: idx_movies_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_title_desc_with_id ON app_public.movies USING btree (title DESC, id);


--
-- Name: idx_movies_trailers_movie_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_trailers_movie_id ON app_public.movies_trailers USING btree (movie_id);


--
-- Name: idx_movies_updated_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_updated_date_asc_with_id ON app_public.movies USING btree (updated_date, id);


--
-- Name: idx_movies_updated_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_movies_updated_date_desc_with_id ON app_public.movies USING btree (updated_date DESC, id);


--
-- Name: idx_seasons_casts_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_casts_name ON app_public.seasons_casts USING btree (name);


--
-- Name: idx_seasons_casts_season_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_casts_season_id ON app_public.seasons_casts USING btree (season_id);


--
-- Name: idx_seasons_created_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_created_date_asc_with_id ON app_public.seasons USING btree (created_date, id);


--
-- Name: idx_seasons_created_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_created_date_desc_with_id ON app_public.seasons USING btree (created_date DESC, id);


--
-- Name: idx_seasons_external_id_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_external_id_asc_with_id ON app_public.seasons USING btree (external_id, id);


--
-- Name: idx_seasons_external_id_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_external_id_desc_with_id ON app_public.seasons USING btree (external_id DESC, id);


--
-- Name: idx_seasons_images_season_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_images_season_id ON app_public.seasons_images USING btree (season_id);


--
-- Name: idx_seasons_index_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_index_asc_with_id ON app_public.seasons USING btree (index, id);


--
-- Name: idx_seasons_index_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_index_desc_with_id ON app_public.seasons USING btree (index DESC, id);


--
-- Name: idx_seasons_licenses_license_start; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_licenses_license_start ON app_public.seasons_licenses USING btree (license_start);


--
-- Name: idx_seasons_licenses_season_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_licenses_season_id ON app_public.seasons_licenses USING btree (season_id);


--
-- Name: idx_seasons_production_countries_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_production_countries_name ON app_public.seasons_production_countries USING btree (name);


--
-- Name: idx_seasons_production_countries_season_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_production_countries_season_id ON app_public.seasons_production_countries USING btree (season_id);


--
-- Name: idx_seasons_publish_status; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_publish_status ON app_public.seasons USING btree (publish_status);


--
-- Name: idx_seasons_released_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_released_asc_with_id ON app_public.seasons USING btree (released, id);


--
-- Name: idx_seasons_released_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_released_desc_with_id ON app_public.seasons USING btree (released DESC, id);


--
-- Name: idx_seasons_tags_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_tags_name ON app_public.seasons_tags USING btree (name);


--
-- Name: idx_seasons_tags_season_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_tags_season_id ON app_public.seasons_tags USING btree (season_id);


--
-- Name: idx_seasons_trailers_season_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_trailers_season_id ON app_public.seasons_trailers USING btree (season_id);


--
-- Name: idx_seasons_tvshow_genres_season_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_tvshow_genres_season_id ON app_public.seasons_tvshow_genres USING btree (season_id);


--
-- Name: idx_seasons_tvshow_genres_tvshow_genres_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_tvshow_genres_tvshow_genres_id ON app_public.seasons_tvshow_genres USING btree (tvshow_genres_id);


--
-- Name: idx_seasons_tvshow_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_tvshow_id ON app_public.seasons USING btree (tvshow_id);


--
-- Name: idx_seasons_updated_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_updated_date_asc_with_id ON app_public.seasons USING btree (updated_date, id);


--
-- Name: idx_seasons_updated_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_seasons_updated_date_desc_with_id ON app_public.seasons USING btree (updated_date DESC, id);


--
-- Name: idx_trgm_collections_title; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_collections_title ON app_public.collections USING gin (title public.gin_trgm_ops);


--
-- Name: idx_trgm_episodes_original_title; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_episodes_original_title ON app_public.episodes USING gin (original_title public.gin_trgm_ops);


--
-- Name: idx_trgm_episodes_title; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_episodes_title ON app_public.episodes USING gin (title public.gin_trgm_ops);


--
-- Name: idx_trgm_movie_genres_title; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_movie_genres_title ON app_public.movie_genres USING gin (title public.gin_trgm_ops);


--
-- Name: idx_trgm_movies_original_title; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_movies_original_title ON app_public.movies USING gin (original_title public.gin_trgm_ops);


--
-- Name: idx_trgm_movies_title; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_movies_title ON app_public.movies USING gin (title public.gin_trgm_ops);


--
-- Name: idx_trgm_tvshow_genres_title; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_tvshow_genres_title ON app_public.tvshow_genres USING gin (title public.gin_trgm_ops);


--
-- Name: idx_trgm_tvshows_original_title; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_tvshows_original_title ON app_public.tvshows USING gin (original_title public.gin_trgm_ops);


--
-- Name: idx_trgm_tvshows_title; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_trgm_tvshows_title ON app_public.tvshows USING gin (title public.gin_trgm_ops);


--
-- Name: idx_tvshow_genres_created_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshow_genres_created_date_asc_with_id ON app_public.tvshow_genres USING btree (created_date, id);


--
-- Name: idx_tvshow_genres_created_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshow_genres_created_date_desc_with_id ON app_public.tvshow_genres USING btree (created_date DESC, id);


--
-- Name: idx_tvshow_genres_sort_order; Type: INDEX; Schema: app_public; Owner: -
--

CREATE UNIQUE INDEX idx_tvshow_genres_sort_order ON app_public.tvshow_genres USING btree (sort_order);


--
-- Name: idx_tvshow_genres_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshow_genres_title_asc_with_id ON app_public.tvshow_genres USING btree (title, id);


--
-- Name: idx_tvshow_genres_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshow_genres_title_desc_with_id ON app_public.tvshow_genres USING btree (title DESC, id);


--
-- Name: idx_tvshow_genres_updated_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshow_genres_updated_date_asc_with_id ON app_public.tvshow_genres USING btree (updated_date, id);


--
-- Name: idx_tvshow_genres_updated_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshow_genres_updated_date_desc_with_id ON app_public.tvshow_genres USING btree (updated_date DESC, id);


--
-- Name: idx_tvshows_casts_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_casts_name ON app_public.tvshows_casts USING btree (name);


--
-- Name: idx_tvshows_casts_tvshow_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_casts_tvshow_id ON app_public.tvshows_casts USING btree (tvshow_id);


--
-- Name: idx_tvshows_created_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_created_date_asc_with_id ON app_public.tvshows USING btree (created_date, id);


--
-- Name: idx_tvshows_created_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_created_date_desc_with_id ON app_public.tvshows USING btree (created_date DESC, id);


--
-- Name: idx_tvshows_external_id_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_external_id_asc_with_id ON app_public.tvshows USING btree (external_id, id);


--
-- Name: idx_tvshows_external_id_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_external_id_desc_with_id ON app_public.tvshows USING btree (external_id DESC, id);


--
-- Name: idx_tvshows_images_tvshow_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_images_tvshow_id ON app_public.tvshows_images USING btree (tvshow_id);


--
-- Name: idx_tvshows_licenses_license_start; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_licenses_license_start ON app_public.tvshows_licenses USING btree (license_start);


--
-- Name: idx_tvshows_licenses_tvshow_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_licenses_tvshow_id ON app_public.tvshows_licenses USING btree (tvshow_id);


--
-- Name: idx_tvshows_original_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_original_title_asc_with_id ON app_public.tvshows USING btree (original_title, id);


--
-- Name: idx_tvshows_original_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_original_title_desc_with_id ON app_public.tvshows USING btree (original_title DESC, id);


--
-- Name: idx_tvshows_production_countries_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_production_countries_name ON app_public.tvshows_production_countries USING btree (name);


--
-- Name: idx_tvshows_production_countries_tvshow_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_production_countries_tvshow_id ON app_public.tvshows_production_countries USING btree (tvshow_id);


--
-- Name: idx_tvshows_publish_status; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_publish_status ON app_public.tvshows USING btree (publish_status);


--
-- Name: idx_tvshows_released_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_released_asc_with_id ON app_public.tvshows USING btree (released, id);


--
-- Name: idx_tvshows_released_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_released_desc_with_id ON app_public.tvshows USING btree (released DESC, id);


--
-- Name: idx_tvshows_tags_name; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_tags_name ON app_public.tvshows_tags USING btree (name);


--
-- Name: idx_tvshows_tags_tvshow_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_tags_tvshow_id ON app_public.tvshows_tags USING btree (tvshow_id);


--
-- Name: idx_tvshows_title_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_title_asc_with_id ON app_public.tvshows USING btree (title, id);


--
-- Name: idx_tvshows_title_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_title_desc_with_id ON app_public.tvshows USING btree (title DESC, id);


--
-- Name: idx_tvshows_trailers_tvshow_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_trailers_tvshow_id ON app_public.tvshows_trailers USING btree (tvshow_id);


--
-- Name: idx_tvshows_tvshow_genres_tvshow_genres_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_tvshow_genres_tvshow_genres_id ON app_public.tvshows_tvshow_genres USING btree (tvshow_genres_id);


--
-- Name: idx_tvshows_tvshow_genres_tvshow_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_tvshow_genres_tvshow_id ON app_public.tvshows_tvshow_genres USING btree (tvshow_id);


--
-- Name: idx_tvshows_updated_date_asc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_updated_date_asc_with_id ON app_public.tvshows USING btree (updated_date, id);


--
-- Name: idx_tvshows_updated_date_desc_with_id; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_tvshows_updated_date_desc_with_id ON app_public.tvshows USING btree (updated_date DESC, id);


--
-- Name: collections _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.collections FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: episodes _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.episodes FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: episodes_licenses _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.episodes_licenses FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: movie_genres _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.movie_genres FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: movies _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.movies FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: movies_licenses _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.movies_licenses FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: seasons _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.seasons FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: seasons_licenses _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.seasons_licenses FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: tvshow_genres _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: tvshows _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.tvshows FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: tvshows_licenses _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE UPDATE ON app_public.tvshows_licenses FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: collections _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.collections FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: episodes _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.episodes FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: episodes_licenses _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.episodes_licenses FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: movie_genres _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.movie_genres FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: movies _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.movies FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: movies_licenses _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.movies_licenses FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: seasons _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.seasons FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: seasons_licenses _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.seasons_licenses FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: tvshow_genres _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: tvshows _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.tvshows FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: tvshows_licenses _200_username; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_username BEFORE INSERT OR UPDATE ON app_public.tvshows_licenses FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__username();


--
-- Name: automatic_collections_filters _500_gql_automatic_collections_filters_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_automatic_collections_filters_deleted BEFORE DELETE ON app_public.automatic_collections_filters FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('AutomaticCollectionFilterDeleted', 'graphql:collections', 'collection_id');


--
-- Name: automatic_collections_filters _500_gql_automatic_collections_filters_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_automatic_collections_filters_inserted AFTER INSERT ON app_public.automatic_collections_filters FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('AutomaticCollectionFilterCreated', 'graphql:collections', 'collection_id');


--
-- Name: automatic_collections_filters _500_gql_automatic_collections_filters_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_automatic_collections_filters_updated AFTER UPDATE ON app_public.automatic_collections_filters FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('AutomaticCollectionFilterChanged', 'graphql:collections', 'collection_id');


--
-- Name: collection_relations _500_gql_collection_relations_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collection_relations_deleted BEFORE DELETE ON app_public.collection_relations FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionRelationDeleted', 'graphql:collections', 'collection_id');


--
-- Name: collection_relations _500_gql_collection_relations_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collection_relations_inserted AFTER INSERT ON app_public.collection_relations FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionRelationCreated', 'graphql:collections', 'collection_id');


--
-- Name: collection_relations _500_gql_collection_relations_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collection_relations_updated AFTER UPDATE ON app_public.collection_relations FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionRelationChanged', 'graphql:collections', 'collection_id');


--
-- Name: collections _500_gql_collections_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collections_deleted BEFORE DELETE ON app_public.collections FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionDeleted', 'graphql:collections', 'id');


--
-- Name: collections_images _500_gql_collections_images_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collections_images_deleted BEFORE DELETE ON app_public.collections_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionImageDeleted', 'graphql:collections', 'collection_id');


--
-- Name: collections_images _500_gql_collections_images_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collections_images_inserted AFTER INSERT ON app_public.collections_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionImageCreated', 'graphql:collections', 'collection_id');


--
-- Name: collections_images _500_gql_collections_images_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collections_images_updated AFTER UPDATE ON app_public.collections_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionImageChanged', 'graphql:collections', 'collection_id');


--
-- Name: collections _500_gql_collections_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collections_inserted AFTER INSERT ON app_public.collections FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionCreated', 'graphql:collections', 'id');


--
-- Name: collections_tags _500_gql_collections_tags_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collections_tags_deleted BEFORE DELETE ON app_public.collections_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionTagDeleted', 'graphql:collections', 'collection_id');


--
-- Name: collections_tags _500_gql_collections_tags_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collections_tags_inserted AFTER INSERT ON app_public.collections_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionTagCreated', 'graphql:collections', 'collection_id');


--
-- Name: collections_tags _500_gql_collections_tags_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collections_tags_updated AFTER UPDATE ON app_public.collections_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionTagChanged', 'graphql:collections', 'collection_id');


--
-- Name: collections _500_gql_collections_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_collections_updated AFTER UPDATE ON app_public.collections FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('CollectionChanged', 'graphql:collections', 'id');


--
-- Name: episodes_casts _500_gql_episodes_casts_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_casts_deleted BEFORE DELETE ON app_public.episodes_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeCastDeleted', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_casts _500_gql_episodes_casts_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_casts_inserted AFTER INSERT ON app_public.episodes_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeCastCreated', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_casts _500_gql_episodes_casts_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_casts_updated AFTER UPDATE ON app_public.episodes_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeCastChanged', 'graphql:episodes', 'episode_id');


--
-- Name: episodes _500_gql_episodes_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_deleted BEFORE DELETE ON app_public.episodes FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeDeleted', 'graphql:episodes', 'id');


--
-- Name: episodes_images _500_gql_episodes_images_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_images_deleted BEFORE DELETE ON app_public.episodes_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeImageDeleted', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_images _500_gql_episodes_images_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_images_inserted AFTER INSERT ON app_public.episodes_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeImageCreated', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_images _500_gql_episodes_images_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_images_updated AFTER UPDATE ON app_public.episodes_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeImageChanged', 'graphql:episodes', 'episode_id');


--
-- Name: episodes _500_gql_episodes_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_inserted AFTER INSERT ON app_public.episodes FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeCreated', 'graphql:episodes', 'id');


--
-- Name: episodes_licenses _500_gql_episodes_licenses_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_licenses_deleted BEFORE DELETE ON app_public.episodes_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeLicenseDeleted', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_licenses _500_gql_episodes_licenses_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_licenses_inserted AFTER INSERT ON app_public.episodes_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeLicenseCreated', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_licenses _500_gql_episodes_licenses_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_licenses_updated AFTER UPDATE ON app_public.episodes_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeLicenseChanged', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_production_countries _500_gql_episodes_production_countries_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_production_countries_deleted BEFORE DELETE ON app_public.episodes_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeProductionCountryDeleted', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_production_countries _500_gql_episodes_production_countries_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_production_countries_inserted AFTER INSERT ON app_public.episodes_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeProductionCountryCreated', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_production_countries _500_gql_episodes_production_countries_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_production_countries_updated AFTER UPDATE ON app_public.episodes_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeProductionCountryChanged', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_tags _500_gql_episodes_tags_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_tags_deleted BEFORE DELETE ON app_public.episodes_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeTagDeleted', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_tags _500_gql_episodes_tags_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_tags_inserted AFTER INSERT ON app_public.episodes_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeTagCreated', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_tags _500_gql_episodes_tags_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_tags_updated AFTER UPDATE ON app_public.episodes_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeTagChanged', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_trailers _500_gql_episodes_trailers_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_trailers_deleted BEFORE DELETE ON app_public.episodes_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeTrailerDeleted', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_trailers _500_gql_episodes_trailers_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_trailers_inserted AFTER INSERT ON app_public.episodes_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeTrailerCreated', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_trailers _500_gql_episodes_trailers_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_trailers_updated AFTER UPDATE ON app_public.episodes_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeTrailerChanged', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_tvshow_genres _500_gql_episodes_tvshow_genres_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_tvshow_genres_deleted BEFORE DELETE ON app_public.episodes_tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeGenreDeleted', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_tvshow_genres _500_gql_episodes_tvshow_genres_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_tvshow_genres_inserted AFTER INSERT ON app_public.episodes_tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeGenreCreated', 'graphql:episodes', 'episode_id');


--
-- Name: episodes_tvshow_genres _500_gql_episodes_tvshow_genres_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_tvshow_genres_updated AFTER UPDATE ON app_public.episodes_tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeGenreChanged', 'graphql:episodes', 'episode_id');


--
-- Name: episodes _500_gql_episodes_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_episodes_updated AFTER UPDATE ON app_public.episodes FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('EpisodeChanged', 'graphql:episodes', 'id');


--
-- Name: movie_genres _500_gql_movie_genres_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movie_genres_deleted BEFORE DELETE ON app_public.movie_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieGenreDeleted', 'graphql:movie_genres', 'id');


--
-- Name: movie_genres _500_gql_movie_genres_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movie_genres_inserted AFTER INSERT ON app_public.movie_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieGenreCreated', 'graphql:movie_genres', 'id');


--
-- Name: movie_genres _500_gql_movie_genres_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movie_genres_updated AFTER UPDATE ON app_public.movie_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieGenreChanged', 'graphql:movie_genres', 'id');


--
-- Name: movies_casts _500_gql_movies_casts_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_casts_deleted BEFORE DELETE ON app_public.movies_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieCastDeleted', 'graphql:movies', 'movie_id');


--
-- Name: movies_casts _500_gql_movies_casts_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_casts_inserted AFTER INSERT ON app_public.movies_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieCastCreated', 'graphql:movies', 'movie_id');


--
-- Name: movies_casts _500_gql_movies_casts_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_casts_updated AFTER UPDATE ON app_public.movies_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieCastChanged', 'graphql:movies', 'movie_id');


--
-- Name: movies _500_gql_movies_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_deleted BEFORE DELETE ON app_public.movies FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieDeleted', 'graphql:movies', 'id');


--
-- Name: movies_images _500_gql_movies_images_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_images_deleted BEFORE DELETE ON app_public.movies_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieImageDeleted', 'graphql:movies', 'movie_id');


--
-- Name: movies_images _500_gql_movies_images_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_images_inserted AFTER INSERT ON app_public.movies_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieImageCreated', 'graphql:movies', 'movie_id');


--
-- Name: movies_images _500_gql_movies_images_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_images_updated AFTER UPDATE ON app_public.movies_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieImageChanged', 'graphql:movies', 'movie_id');


--
-- Name: movies _500_gql_movies_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_inserted AFTER INSERT ON app_public.movies FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieCreated', 'graphql:movies', 'id');


--
-- Name: movies_licenses _500_gql_movies_licenses_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_licenses_deleted BEFORE DELETE ON app_public.movies_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieLicenseDeleted', 'graphql:movies', 'movie_id');


--
-- Name: movies_licenses _500_gql_movies_licenses_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_licenses_inserted AFTER INSERT ON app_public.movies_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieLicenseCreated', 'graphql:movies', 'movie_id');


--
-- Name: movies_licenses _500_gql_movies_licenses_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_licenses_updated AFTER UPDATE ON app_public.movies_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieLicenseChanged', 'graphql:movies', 'movie_id');


--
-- Name: movies_movie_genres _500_gql_movies_movie_genres_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_movie_genres_deleted BEFORE DELETE ON app_public.movies_movie_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieGenreDeleted', 'graphql:movies', 'movie_id');


--
-- Name: movies_movie_genres _500_gql_movies_movie_genres_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_movie_genres_inserted AFTER INSERT ON app_public.movies_movie_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieGenreCreated', 'graphql:movies', 'movie_id');


--
-- Name: movies_movie_genres _500_gql_movies_movie_genres_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_movie_genres_updated AFTER UPDATE ON app_public.movies_movie_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieGenreChanged', 'graphql:movies', 'movie_id');


--
-- Name: movies_production_countries _500_gql_movies_production_countries_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_production_countries_deleted BEFORE DELETE ON app_public.movies_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieProductionCountryDeleted', 'graphql:movies', 'movie_id');


--
-- Name: movies_production_countries _500_gql_movies_production_countries_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_production_countries_inserted AFTER INSERT ON app_public.movies_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieProductionCountryCreated', 'graphql:movies', 'movie_id');


--
-- Name: movies_production_countries _500_gql_movies_production_countries_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_production_countries_updated AFTER UPDATE ON app_public.movies_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieProductionCountryChanged', 'graphql:movies', 'movie_id');


--
-- Name: movies_tags _500_gql_movies_tags_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_tags_deleted BEFORE DELETE ON app_public.movies_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieTagDeleted', 'graphql:movies', 'movie_id');


--
-- Name: movies_tags _500_gql_movies_tags_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_tags_inserted AFTER INSERT ON app_public.movies_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieTagCreated', 'graphql:movies', 'movie_id');


--
-- Name: movies_tags _500_gql_movies_tags_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_tags_updated AFTER UPDATE ON app_public.movies_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieTagChanged', 'graphql:movies', 'movie_id');


--
-- Name: movies_trailers _500_gql_movies_trailers_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_trailers_deleted BEFORE DELETE ON app_public.movies_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieTrailerDeleted', 'graphql:movies', 'movie_id');


--
-- Name: movies_trailers _500_gql_movies_trailers_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_trailers_inserted AFTER INSERT ON app_public.movies_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieTrailerCreated', 'graphql:movies', 'movie_id');


--
-- Name: movies_trailers _500_gql_movies_trailers_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_trailers_updated AFTER UPDATE ON app_public.movies_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieTrailerChanged', 'graphql:movies', 'movie_id');


--
-- Name: movies _500_gql_movies_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_movies_updated AFTER UPDATE ON app_public.movies FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('MovieChanged', 'graphql:movies', 'id');


--
-- Name: seasons_casts _500_gql_seasons_casts_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_casts_deleted BEFORE DELETE ON app_public.seasons_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonCastDeleted', 'graphql:seasons', 'season_id');


--
-- Name: seasons_casts _500_gql_seasons_casts_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_casts_inserted AFTER INSERT ON app_public.seasons_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonCastCreated', 'graphql:seasons', 'season_id');


--
-- Name: seasons_casts _500_gql_seasons_casts_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_casts_updated AFTER UPDATE ON app_public.seasons_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonCastChanged', 'graphql:seasons', 'season_id');


--
-- Name: seasons _500_gql_seasons_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_deleted BEFORE DELETE ON app_public.seasons FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonDeleted', 'graphql:seasons', 'id');


--
-- Name: seasons_images _500_gql_seasons_images_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_images_deleted BEFORE DELETE ON app_public.seasons_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonImageDeleted', 'graphql:seasons', 'season_id');


--
-- Name: seasons_images _500_gql_seasons_images_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_images_inserted AFTER INSERT ON app_public.seasons_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonImageCreated', 'graphql:seasons', 'season_id');


--
-- Name: seasons_images _500_gql_seasons_images_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_images_updated AFTER UPDATE ON app_public.seasons_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonImageChanged', 'graphql:seasons', 'season_id');


--
-- Name: seasons _500_gql_seasons_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_inserted AFTER INSERT ON app_public.seasons FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonCreated', 'graphql:seasons', 'id');


--
-- Name: seasons_licenses _500_gql_seasons_licenses_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_licenses_deleted BEFORE DELETE ON app_public.seasons_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonLicenseDeleted', 'graphql:seasons', 'season_id');


--
-- Name: seasons_licenses _500_gql_seasons_licenses_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_licenses_inserted AFTER INSERT ON app_public.seasons_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonLicenseCreated', 'graphql:seasons', 'season_id');


--
-- Name: seasons_licenses _500_gql_seasons_licenses_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_licenses_updated AFTER UPDATE ON app_public.seasons_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonLicenseChanged', 'graphql:seasons', 'season_id');


--
-- Name: seasons_production_countries _500_gql_seasons_production_countries_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_production_countries_deleted BEFORE DELETE ON app_public.seasons_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonProductionCountryDeleted', 'graphql:seasons', 'season_id');


--
-- Name: seasons_production_countries _500_gql_seasons_production_countries_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_production_countries_inserted AFTER INSERT ON app_public.seasons_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonProductionCountryCreated', 'graphql:seasons', 'season_id');


--
-- Name: seasons_production_countries _500_gql_seasons_production_countries_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_production_countries_updated AFTER UPDATE ON app_public.seasons_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonProductionCountryChanged', 'graphql:seasons', 'season_id');


--
-- Name: seasons_tags _500_gql_seasons_tags_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_tags_deleted BEFORE DELETE ON app_public.seasons_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonTagDeleted', 'graphql:seasons', 'season_id');


--
-- Name: seasons_tags _500_gql_seasons_tags_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_tags_inserted AFTER INSERT ON app_public.seasons_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonTagCreated', 'graphql:seasons', 'season_id');


--
-- Name: seasons_tags _500_gql_seasons_tags_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_tags_updated AFTER UPDATE ON app_public.seasons_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonTagChanged', 'graphql:seasons', 'season_id');


--
-- Name: seasons_trailers _500_gql_seasons_trailers_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_trailers_deleted BEFORE DELETE ON app_public.seasons_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonTrailerDeleted', 'graphql:seasons', 'season_id');


--
-- Name: seasons_trailers _500_gql_seasons_trailers_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_trailers_inserted AFTER INSERT ON app_public.seasons_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonTrailerCreated', 'graphql:seasons', 'season_id');


--
-- Name: seasons_trailers _500_gql_seasons_trailers_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_trailers_updated AFTER UPDATE ON app_public.seasons_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonTrailerChanged', 'graphql:seasons', 'season_id');


--
-- Name: seasons_tvshow_genres _500_gql_seasons_tvshow_genres_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_tvshow_genres_deleted BEFORE DELETE ON app_public.seasons_tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonGenreDeleted', 'graphql:seasons', 'season_id');


--
-- Name: seasons_tvshow_genres _500_gql_seasons_tvshow_genres_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_tvshow_genres_inserted AFTER INSERT ON app_public.seasons_tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonGenreCreated', 'graphql:seasons', 'season_id');


--
-- Name: seasons_tvshow_genres _500_gql_seasons_tvshow_genres_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_tvshow_genres_updated AFTER UPDATE ON app_public.seasons_tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonGenreChanged', 'graphql:seasons', 'season_id');


--
-- Name: seasons _500_gql_seasons_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_seasons_updated AFTER UPDATE ON app_public.seasons FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('SeasonChanged', 'graphql:seasons', 'id');


--
-- Name: tvshow_genres _500_gql_tvshow_genres_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshow_genres_deleted BEFORE DELETE ON app_public.tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowGenreDeleted', 'graphql:tvshow_genres', 'id');


--
-- Name: tvshow_genres _500_gql_tvshow_genres_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshow_genres_inserted AFTER INSERT ON app_public.tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowGenreCreated', 'graphql:tvshow_genres', 'id');


--
-- Name: tvshow_genres _500_gql_tvshow_genres_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshow_genres_updated AFTER UPDATE ON app_public.tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowGenreChanged', 'graphql:tvshow_genres', 'id');


--
-- Name: tvshows_casts _500_gql_tvshows_casts_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_casts_deleted BEFORE DELETE ON app_public.tvshows_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowCastDeleted', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_casts _500_gql_tvshows_casts_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_casts_inserted AFTER INSERT ON app_public.tvshows_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowCastCreated', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_casts _500_gql_tvshows_casts_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_casts_updated AFTER UPDATE ON app_public.tvshows_casts FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowCastChanged', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows _500_gql_tvshows_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_deleted BEFORE DELETE ON app_public.tvshows FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowDeleted', 'graphql:tvshows', 'id');


--
-- Name: tvshows_images _500_gql_tvshows_images_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_images_deleted BEFORE DELETE ON app_public.tvshows_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowImageDeleted', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_images _500_gql_tvshows_images_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_images_inserted AFTER INSERT ON app_public.tvshows_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowImageCreated', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_images _500_gql_tvshows_images_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_images_updated AFTER UPDATE ON app_public.tvshows_images FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowImageChanged', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows _500_gql_tvshows_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_inserted AFTER INSERT ON app_public.tvshows FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowCreated', 'graphql:tvshows', 'id');


--
-- Name: tvshows_licenses _500_gql_tvshows_licenses_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_licenses_deleted BEFORE DELETE ON app_public.tvshows_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowLicenseDeleted', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_licenses _500_gql_tvshows_licenses_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_licenses_inserted AFTER INSERT ON app_public.tvshows_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowLicenseCreated', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_licenses _500_gql_tvshows_licenses_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_licenses_updated AFTER UPDATE ON app_public.tvshows_licenses FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowLicenseChanged', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_production_countries _500_gql_tvshows_production_countries_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_production_countries_deleted BEFORE DELETE ON app_public.tvshows_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowProductionCountryDeleted', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_production_countries _500_gql_tvshows_production_countries_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_production_countries_inserted AFTER INSERT ON app_public.tvshows_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowProductionCountryCreated', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_production_countries _500_gql_tvshows_production_countries_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_production_countries_updated AFTER UPDATE ON app_public.tvshows_production_countries FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowProductionCountryChanged', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_tags _500_gql_tvshows_tags_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_tags_deleted BEFORE DELETE ON app_public.tvshows_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowTagDeleted', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_tags _500_gql_tvshows_tags_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_tags_inserted AFTER INSERT ON app_public.tvshows_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowTagCreated', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_tags _500_gql_tvshows_tags_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_tags_updated AFTER UPDATE ON app_public.tvshows_tags FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowTagChanged', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_trailers _500_gql_tvshows_trailers_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_trailers_deleted BEFORE DELETE ON app_public.tvshows_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowTrailerDeleted', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_trailers _500_gql_tvshows_trailers_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_trailers_inserted AFTER INSERT ON app_public.tvshows_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowTrailerCreated', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_trailers _500_gql_tvshows_trailers_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_trailers_updated AFTER UPDATE ON app_public.tvshows_trailers FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowTrailerChanged', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_tvshow_genres _500_gql_tvshows_tvshow_genres_deleted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_tvshow_genres_deleted BEFORE DELETE ON app_public.tvshows_tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowGenreDeleted', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_tvshow_genres _500_gql_tvshows_tvshow_genres_inserted; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_tvshow_genres_inserted AFTER INSERT ON app_public.tvshows_tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowGenreCreated', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows_tvshow_genres _500_gql_tvshows_tvshow_genres_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_tvshow_genres_updated AFTER UPDATE ON app_public.tvshows_tvshow_genres FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowGenreChanged', 'graphql:tvshows', 'tvshow_id');


--
-- Name: tvshows _500_gql_tvshows_updated; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_tvshows_updated AFTER UPDATE ON app_public.tvshows FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('TvshowChanged', 'graphql:tvshows', 'id');


--
-- Name: automatic_collections_filters automatic_collections_filters_collection_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.automatic_collections_filters
    ADD CONSTRAINT automatic_collections_filters_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES app_public.collections(id) ON DELETE CASCADE;


--
-- Name: collection_relations collection_relations_collection_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collection_relations
    ADD CONSTRAINT collection_relations_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES app_public.collections(id) ON DELETE CASCADE;


--
-- Name: collection_relations collection_relations_episode_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collection_relations
    ADD CONSTRAINT collection_relations_episode_id_fkey FOREIGN KEY (episode_id) REFERENCES app_public.episodes(id) ON DELETE CASCADE;


--
-- Name: collection_relations collection_relations_movie_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collection_relations
    ADD CONSTRAINT collection_relations_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES app_public.movies(id) ON DELETE CASCADE;


--
-- Name: collection_relations collection_relations_season_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collection_relations
    ADD CONSTRAINT collection_relations_season_id_fkey FOREIGN KEY (season_id) REFERENCES app_public.seasons(id) ON DELETE CASCADE;


--
-- Name: collection_relations collection_relations_tvshow_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collection_relations
    ADD CONSTRAINT collection_relations_tvshow_id_fkey FOREIGN KEY (tvshow_id) REFERENCES app_public.tvshows(id) ON DELETE CASCADE;


--
-- Name: collections_images collections_images_collection_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collections_images
    ADD CONSTRAINT collections_images_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES app_public.collections(id) ON DELETE CASCADE;


--
-- Name: collections_tags collections_tags_collection_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.collections_tags
    ADD CONSTRAINT collections_tags_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES app_public.collections(id) ON DELETE CASCADE;


--
-- Name: episodes_casts episodes_casts_episode_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_casts
    ADD CONSTRAINT episodes_casts_episode_id_fkey FOREIGN KEY (episode_id) REFERENCES app_public.episodes(id) ON DELETE CASCADE;


--
-- Name: episodes_images episodes_images_episode_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_images
    ADD CONSTRAINT episodes_images_episode_id_fkey FOREIGN KEY (episode_id) REFERENCES app_public.episodes(id) ON DELETE CASCADE;


--
-- Name: episodes_licenses episodes_licenses_episode_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_licenses
    ADD CONSTRAINT episodes_licenses_episode_id_fkey FOREIGN KEY (episode_id) REFERENCES app_public.episodes(id) ON DELETE CASCADE;


--
-- Name: episodes_production_countries episodes_production_countries_episode_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_production_countries
    ADD CONSTRAINT episodes_production_countries_episode_id_fkey FOREIGN KEY (episode_id) REFERENCES app_public.episodes(id) ON DELETE CASCADE;


--
-- Name: episodes episodes_season_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes
    ADD CONSTRAINT episodes_season_id_fkey FOREIGN KEY (season_id) REFERENCES app_public.seasons(id) ON DELETE SET NULL;


--
-- Name: episodes_tags episodes_tags_episode_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_tags
    ADD CONSTRAINT episodes_tags_episode_id_fkey FOREIGN KEY (episode_id) REFERENCES app_public.episodes(id) ON DELETE CASCADE;


--
-- Name: episodes_trailers episodes_trailers_episode_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_trailers
    ADD CONSTRAINT episodes_trailers_episode_id_fkey FOREIGN KEY (episode_id) REFERENCES app_public.episodes(id) ON DELETE CASCADE;


--
-- Name: episodes_tvshow_genres episodes_tvshow_genres_episode_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_tvshow_genres
    ADD CONSTRAINT episodes_tvshow_genres_episode_id_fkey FOREIGN KEY (episode_id) REFERENCES app_public.episodes(id) ON DELETE CASCADE;


--
-- Name: episodes_tvshow_genres episodes_tvshow_genres_tvshow_genres_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.episodes_tvshow_genres
    ADD CONSTRAINT episodes_tvshow_genres_tvshow_genres_id_fkey FOREIGN KEY (tvshow_genres_id) REFERENCES app_public.tvshow_genres(id) ON DELETE CASCADE;


--
-- Name: movies_casts movies_casts_movie_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_casts
    ADD CONSTRAINT movies_casts_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES app_public.movies(id) ON DELETE CASCADE;


--
-- Name: movies_images movies_images_movie_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_images
    ADD CONSTRAINT movies_images_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES app_public.movies(id) ON DELETE CASCADE;


--
-- Name: movies_licenses movies_licenses_movie_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_licenses
    ADD CONSTRAINT movies_licenses_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES app_public.movies(id) ON DELETE CASCADE;


--
-- Name: movies_movie_genres movies_movie_genres_movie_genres_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_movie_genres
    ADD CONSTRAINT movies_movie_genres_movie_genres_id_fkey FOREIGN KEY (movie_genres_id) REFERENCES app_public.movie_genres(id) ON DELETE CASCADE;


--
-- Name: movies_movie_genres movies_movie_genres_movie_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_movie_genres
    ADD CONSTRAINT movies_movie_genres_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES app_public.movies(id) ON DELETE CASCADE;


--
-- Name: movies_production_countries movies_production_countries_movie_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_production_countries
    ADD CONSTRAINT movies_production_countries_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES app_public.movies(id) ON DELETE CASCADE;


--
-- Name: movies_tags movies_tags_movie_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_tags
    ADD CONSTRAINT movies_tags_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES app_public.movies(id) ON DELETE CASCADE;


--
-- Name: movies_trailers movies_trailers_movie_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.movies_trailers
    ADD CONSTRAINT movies_trailers_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES app_public.movies(id) ON DELETE CASCADE;


--
-- Name: seasons_casts seasons_casts_season_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_casts
    ADD CONSTRAINT seasons_casts_season_id_fkey FOREIGN KEY (season_id) REFERENCES app_public.seasons(id) ON DELETE CASCADE;


--
-- Name: seasons_images seasons_images_season_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_images
    ADD CONSTRAINT seasons_images_season_id_fkey FOREIGN KEY (season_id) REFERENCES app_public.seasons(id) ON DELETE CASCADE;


--
-- Name: seasons_licenses seasons_licenses_season_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_licenses
    ADD CONSTRAINT seasons_licenses_season_id_fkey FOREIGN KEY (season_id) REFERENCES app_public.seasons(id) ON DELETE CASCADE;


--
-- Name: seasons_production_countries seasons_production_countries_season_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_production_countries
    ADD CONSTRAINT seasons_production_countries_season_id_fkey FOREIGN KEY (season_id) REFERENCES app_public.seasons(id) ON DELETE CASCADE;


--
-- Name: seasons_tags seasons_tags_season_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_tags
    ADD CONSTRAINT seasons_tags_season_id_fkey FOREIGN KEY (season_id) REFERENCES app_public.seasons(id) ON DELETE CASCADE;


--
-- Name: seasons_trailers seasons_trailers_season_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_trailers
    ADD CONSTRAINT seasons_trailers_season_id_fkey FOREIGN KEY (season_id) REFERENCES app_public.seasons(id) ON DELETE CASCADE;


--
-- Name: seasons_tvshow_genres seasons_tvshow_genres_season_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_tvshow_genres
    ADD CONSTRAINT seasons_tvshow_genres_season_id_fkey FOREIGN KEY (season_id) REFERENCES app_public.seasons(id) ON DELETE CASCADE;


--
-- Name: seasons_tvshow_genres seasons_tvshow_genres_tvshow_genres_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons_tvshow_genres
    ADD CONSTRAINT seasons_tvshow_genres_tvshow_genres_id_fkey FOREIGN KEY (tvshow_genres_id) REFERENCES app_public.tvshow_genres(id) ON DELETE CASCADE;


--
-- Name: seasons seasons_tvshow_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.seasons
    ADD CONSTRAINT seasons_tvshow_id_fkey FOREIGN KEY (tvshow_id) REFERENCES app_public.tvshows(id) ON DELETE SET NULL;


--
-- Name: tvshows_casts tvshows_casts_tvshow_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_casts
    ADD CONSTRAINT tvshows_casts_tvshow_id_fkey FOREIGN KEY (tvshow_id) REFERENCES app_public.tvshows(id) ON DELETE CASCADE;


--
-- Name: tvshows_images tvshows_images_tvshow_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_images
    ADD CONSTRAINT tvshows_images_tvshow_id_fkey FOREIGN KEY (tvshow_id) REFERENCES app_public.tvshows(id) ON DELETE CASCADE;


--
-- Name: tvshows_licenses tvshows_licenses_tvshow_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_licenses
    ADD CONSTRAINT tvshows_licenses_tvshow_id_fkey FOREIGN KEY (tvshow_id) REFERENCES app_public.tvshows(id) ON DELETE CASCADE;


--
-- Name: tvshows_production_countries tvshows_production_countries_tvshow_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_production_countries
    ADD CONSTRAINT tvshows_production_countries_tvshow_id_fkey FOREIGN KEY (tvshow_id) REFERENCES app_public.tvshows(id) ON DELETE CASCADE;


--
-- Name: tvshows_tags tvshows_tags_tvshow_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_tags
    ADD CONSTRAINT tvshows_tags_tvshow_id_fkey FOREIGN KEY (tvshow_id) REFERENCES app_public.tvshows(id) ON DELETE CASCADE;


--
-- Name: tvshows_trailers tvshows_trailers_tvshow_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_trailers
    ADD CONSTRAINT tvshows_trailers_tvshow_id_fkey FOREIGN KEY (tvshow_id) REFERENCES app_public.tvshows(id) ON DELETE CASCADE;


--
-- Name: tvshows_tvshow_genres tvshows_tvshow_genres_tvshow_genres_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_tvshow_genres
    ADD CONSTRAINT tvshows_tvshow_genres_tvshow_genres_id_fkey FOREIGN KEY (tvshow_genres_id) REFERENCES app_public.tvshow_genres(id) ON DELETE CASCADE;


--
-- Name: tvshows_tvshow_genres tvshows_tvshow_genres_tvshow_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.tvshows_tvshow_genres
    ADD CONSTRAINT tvshows_tvshow_genres_tvshow_id_fkey FOREIGN KEY (tvshow_id) REFERENCES app_public.tvshows(id) ON DELETE CASCADE;


--
-- Name: automatic_collections_filters; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.automatic_collections_filters ENABLE ROW LEVEL SECURITY;

--
-- Name: automatic_collections_filters automatic_collections_filters_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY automatic_collections_filters_authorization ON app_public.automatic_collections_filters USING (app_hidden.user_has_permission('COLLECTION_READER,COLLECTION_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('COLLECTION_EDITOR,ADMIN'::text));


--
-- Name: automatic_collections_filters automatic_collections_filters_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY automatic_collections_filters_authorization_delete ON app_public.automatic_collections_filters AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('COLLECTION_EDITOR,ADMIN'::text));


--
-- Name: collection_relations; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.collection_relations ENABLE ROW LEVEL SECURITY;

--
-- Name: collection_relations collection_relations_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY collection_relations_authorization ON app_public.collection_relations USING (app_hidden.user_has_permission('COLLECTION_READER,COLLECTION_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('COLLECTION_EDITOR,ADMIN'::text));


--
-- Name: collection_relations collection_relations_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY collection_relations_authorization_delete ON app_public.collection_relations AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('COLLECTION_EDITOR,ADMIN'::text));


--
-- Name: collections; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.collections ENABLE ROW LEVEL SECURITY;

--
-- Name: collections collections_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY collections_authorization ON app_public.collections USING (app_hidden.user_has_permission('COLLECTION_READER,COLLECTION_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('COLLECTION_EDITOR,ADMIN'::text));


--
-- Name: collections collections_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY collections_authorization_delete ON app_public.collections AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('COLLECTION_EDITOR,ADMIN'::text));


--
-- Name: collections_images; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.collections_images ENABLE ROW LEVEL SECURITY;

--
-- Name: collections_images collections_images_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY collections_images_authorization ON app_public.collections_images USING (app_hidden.user_has_permission('COLLECTION_READER,COLLECTION_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('COLLECTION_EDITOR,ADMIN'::text));


--
-- Name: collections_images collections_images_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY collections_images_authorization_delete ON app_public.collections_images AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('COLLECTION_EDITOR,ADMIN'::text));


--
-- Name: collections_tags; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.collections_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: collections_tags collections_tags_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY collections_tags_authorization ON app_public.collections_tags USING (app_hidden.user_has_permission('COLLECTION_READER,COLLECTION_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('COLLECTION_EDITOR,ADMIN'::text));


--
-- Name: collections_tags collections_tags_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY collections_tags_authorization_delete ON app_public.collections_tags AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('COLLECTION_EDITOR,ADMIN'::text));


--
-- Name: episodes; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.episodes ENABLE ROW LEVEL SECURITY;

--
-- Name: episodes episodes_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_authorization ON app_public.episodes USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes episodes_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_authorization_delete ON app_public.episodes AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_casts; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.episodes_casts ENABLE ROW LEVEL SECURITY;

--
-- Name: episodes_casts episodes_casts_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_casts_authorization ON app_public.episodes_casts USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_casts episodes_casts_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_casts_authorization_delete ON app_public.episodes_casts AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_images; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.episodes_images ENABLE ROW LEVEL SECURITY;

--
-- Name: episodes_images episodes_images_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_images_authorization ON app_public.episodes_images USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_images episodes_images_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_images_authorization_delete ON app_public.episodes_images AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_licenses; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.episodes_licenses ENABLE ROW LEVEL SECURITY;

--
-- Name: episodes_licenses episodes_licenses_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_licenses_authorization ON app_public.episodes_licenses USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_licenses episodes_licenses_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_licenses_authorization_delete ON app_public.episodes_licenses AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_production_countries; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.episodes_production_countries ENABLE ROW LEVEL SECURITY;

--
-- Name: episodes_production_countries episodes_production_countries_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_production_countries_authorization ON app_public.episodes_production_countries USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_production_countries episodes_production_countries_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_production_countries_authorization_delete ON app_public.episodes_production_countries AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_tags; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.episodes_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: episodes_tags episodes_tags_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_tags_authorization ON app_public.episodes_tags USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_tags episodes_tags_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_tags_authorization_delete ON app_public.episodes_tags AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_trailers; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.episodes_trailers ENABLE ROW LEVEL SECURITY;

--
-- Name: episodes_trailers episodes_trailers_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_trailers_authorization ON app_public.episodes_trailers USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_trailers episodes_trailers_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_trailers_authorization_delete ON app_public.episodes_trailers AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_tvshow_genres; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.episodes_tvshow_genres ENABLE ROW LEVEL SECURITY;

--
-- Name: episodes_tvshow_genres episodes_tvshow_genres_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_tvshow_genres_authorization ON app_public.episodes_tvshow_genres USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: episodes_tvshow_genres episodes_tvshow_genres_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY episodes_tvshow_genres_authorization_delete ON app_public.episodes_tvshow_genres AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: movie_genres; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movie_genres ENABLE ROW LEVEL SECURITY;

--
-- Name: movie_genres movie_genres_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movie_genres_authorization ON app_public.movie_genres USING (app_hidden.user_has_permission('SETTINGS_READER,SETTINGS_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('SETTINGS_EDITOR,ADMIN'::text));


--
-- Name: movie_genres movie_genres_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movie_genres_authorization_delete ON app_public.movie_genres AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('SETTINGS_EDITOR,ADMIN'::text));


--
-- Name: movies; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movies ENABLE ROW LEVEL SECURITY;

--
-- Name: movies movies_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_authorization ON app_public.movies USING (app_hidden.user_has_permission('MOVIE_READER,MOVIE_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies movies_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_authorization_delete ON app_public.movies AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_casts; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movies_casts ENABLE ROW LEVEL SECURITY;

--
-- Name: movies_casts movies_casts_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_casts_authorization ON app_public.movies_casts USING (app_hidden.user_has_permission('MOVIE_READER,MOVIE_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_casts movies_casts_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_casts_authorization_delete ON app_public.movies_casts AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_images; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movies_images ENABLE ROW LEVEL SECURITY;

--
-- Name: movies_images movies_images_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_images_authorization ON app_public.movies_images USING (app_hidden.user_has_permission('MOVIE_READER,MOVIE_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_images movies_images_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_images_authorization_delete ON app_public.movies_images AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_licenses; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movies_licenses ENABLE ROW LEVEL SECURITY;

--
-- Name: movies_licenses movies_licenses_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_licenses_authorization ON app_public.movies_licenses USING (app_hidden.user_has_permission('MOVIE_READER,MOVIE_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_licenses movies_licenses_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_licenses_authorization_delete ON app_public.movies_licenses AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_movie_genres; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movies_movie_genres ENABLE ROW LEVEL SECURITY;

--
-- Name: movies_movie_genres movies_movie_genres_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_movie_genres_authorization ON app_public.movies_movie_genres USING (app_hidden.user_has_permission('MOVIE_READER,MOVIE_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_movie_genres movies_movie_genres_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_movie_genres_authorization_delete ON app_public.movies_movie_genres AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_production_countries; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movies_production_countries ENABLE ROW LEVEL SECURITY;

--
-- Name: movies_production_countries movies_production_countries_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_production_countries_authorization ON app_public.movies_production_countries USING (app_hidden.user_has_permission('MOVIE_READER,MOVIE_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_production_countries movies_production_countries_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_production_countries_authorization_delete ON app_public.movies_production_countries AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_tags; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movies_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: movies_tags movies_tags_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_tags_authorization ON app_public.movies_tags USING (app_hidden.user_has_permission('MOVIE_READER,MOVIE_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_tags movies_tags_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_tags_authorization_delete ON app_public.movies_tags AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_trailers; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.movies_trailers ENABLE ROW LEVEL SECURITY;

--
-- Name: movies_trailers movies_trailers_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_trailers_authorization ON app_public.movies_trailers USING (app_hidden.user_has_permission('MOVIE_READER,MOVIE_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: movies_trailers movies_trailers_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY movies_trailers_authorization_delete ON app_public.movies_trailers AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('MOVIE_EDITOR,ADMIN'::text));


--
-- Name: seasons; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.seasons ENABLE ROW LEVEL SECURITY;

--
-- Name: seasons seasons_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_authorization ON app_public.seasons USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons seasons_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_authorization_delete ON app_public.seasons AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_casts; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.seasons_casts ENABLE ROW LEVEL SECURITY;

--
-- Name: seasons_casts seasons_casts_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_casts_authorization ON app_public.seasons_casts USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_casts seasons_casts_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_casts_authorization_delete ON app_public.seasons_casts AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_images; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.seasons_images ENABLE ROW LEVEL SECURITY;

--
-- Name: seasons_images seasons_images_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_images_authorization ON app_public.seasons_images USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_images seasons_images_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_images_authorization_delete ON app_public.seasons_images AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_licenses; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.seasons_licenses ENABLE ROW LEVEL SECURITY;

--
-- Name: seasons_licenses seasons_licenses_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_licenses_authorization ON app_public.seasons_licenses USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_licenses seasons_licenses_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_licenses_authorization_delete ON app_public.seasons_licenses AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_production_countries; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.seasons_production_countries ENABLE ROW LEVEL SECURITY;

--
-- Name: seasons_production_countries seasons_production_countries_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_production_countries_authorization ON app_public.seasons_production_countries USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_production_countries seasons_production_countries_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_production_countries_authorization_delete ON app_public.seasons_production_countries AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_tags; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.seasons_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: seasons_tags seasons_tags_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_tags_authorization ON app_public.seasons_tags USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_tags seasons_tags_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_tags_authorization_delete ON app_public.seasons_tags AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_trailers; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.seasons_trailers ENABLE ROW LEVEL SECURITY;

--
-- Name: seasons_trailers seasons_trailers_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_trailers_authorization ON app_public.seasons_trailers USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_trailers seasons_trailers_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_trailers_authorization_delete ON app_public.seasons_trailers AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_tvshow_genres; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.seasons_tvshow_genres ENABLE ROW LEVEL SECURITY;

--
-- Name: seasons_tvshow_genres seasons_tvshow_genres_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_tvshow_genres_authorization ON app_public.seasons_tvshow_genres USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: seasons_tvshow_genres seasons_tvshow_genres_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY seasons_tvshow_genres_authorization_delete ON app_public.seasons_tvshow_genres AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshow_genres; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshow_genres ENABLE ROW LEVEL SECURITY;

--
-- Name: tvshow_genres tvshow_genres_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshow_genres_authorization ON app_public.tvshow_genres USING (app_hidden.user_has_permission('SETTINGS_READER,SETTINGS_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('SETTINGS_EDITOR,ADMIN'::text));


--
-- Name: tvshow_genres tvshow_genres_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshow_genres_authorization_delete ON app_public.tvshow_genres AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('SETTINGS_EDITOR,ADMIN'::text));


--
-- Name: tvshows; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshows ENABLE ROW LEVEL SECURITY;

--
-- Name: tvshows tvshows_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_authorization ON app_public.tvshows USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows tvshows_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_authorization_delete ON app_public.tvshows AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_casts; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshows_casts ENABLE ROW LEVEL SECURITY;

--
-- Name: tvshows_casts tvshows_casts_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_casts_authorization ON app_public.tvshows_casts USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_casts tvshows_casts_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_casts_authorization_delete ON app_public.tvshows_casts AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_images; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshows_images ENABLE ROW LEVEL SECURITY;

--
-- Name: tvshows_images tvshows_images_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_images_authorization ON app_public.tvshows_images USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_images tvshows_images_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_images_authorization_delete ON app_public.tvshows_images AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_licenses; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshows_licenses ENABLE ROW LEVEL SECURITY;

--
-- Name: tvshows_licenses tvshows_licenses_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_licenses_authorization ON app_public.tvshows_licenses USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_licenses tvshows_licenses_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_licenses_authorization_delete ON app_public.tvshows_licenses AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_production_countries; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshows_production_countries ENABLE ROW LEVEL SECURITY;

--
-- Name: tvshows_production_countries tvshows_production_countries_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_production_countries_authorization ON app_public.tvshows_production_countries USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_production_countries tvshows_production_countries_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_production_countries_authorization_delete ON app_public.tvshows_production_countries AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_tags; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshows_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: tvshows_tags tvshows_tags_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_tags_authorization ON app_public.tvshows_tags USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_tags tvshows_tags_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_tags_authorization_delete ON app_public.tvshows_tags AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_trailers; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshows_trailers ENABLE ROW LEVEL SECURITY;

--
-- Name: tvshows_trailers tvshows_trailers_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_trailers_authorization ON app_public.tvshows_trailers USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_trailers tvshows_trailers_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_trailers_authorization_delete ON app_public.tvshows_trailers AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_tvshow_genres; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.tvshows_tvshow_genres ENABLE ROW LEVEL SECURITY;

--
-- Name: tvshows_tvshow_genres tvshows_tvshow_genres_authorization; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_tvshow_genres_authorization ON app_public.tvshows_tvshow_genres USING (app_hidden.user_has_permission('TVSHOW_READER,TVSHOW_EDITOR,ADMIN'::text)) WITH CHECK (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: tvshows_tvshow_genres tvshows_tvshow_genres_authorization_delete; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY tvshows_tvshow_genres_authorization_delete ON app_public.tvshows_tvshow_genres AS RESTRICTIVE FOR DELETE USING (app_hidden.user_has_permission('TVSHOW_EDITOR,ADMIN'::text));


--
-- Name: SCHEMA app_hidden; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA app_hidden TO navy_media_visitor;


--
-- Name: SCHEMA app_public; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA app_public TO navy_media_visitor;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO navy_media;
GRANT USAGE ON SCHEMA public TO navy_media_visitor;


--
-- Name: FUNCTION constraint_max_length(input_value text, max_length integer, error_message text, error_code text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.constraint_max_length(input_value text, max_length integer, error_message text, error_code text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.constraint_max_length(input_value text, max_length integer, error_message text, error_code text) TO navy_media_visitor;


--
-- Name: FUNCTION constraint_min_length(input_value text, min_length integer, error_message text, error_code text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.constraint_min_length(input_value text, min_length integer, error_message text, error_code text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.constraint_min_length(input_value text, min_length integer, error_message text, error_code text) TO navy_media_visitor;


--
-- Name: FUNCTION constraint_not_empty(input_value text, error_message text, error_code text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.constraint_not_empty(input_value text, error_message text, error_code text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.constraint_not_empty(input_value text, error_message text, error_code text) TO navy_media_visitor;


--
-- Name: FUNCTION define_authentication(readpermissions text, modifypermissions text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_authentication(readpermissions text, modifypermissions text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_authentication(readpermissions text, modifypermissions text, tablename text, schemaname text) TO navy_media_visitor;


--
-- Name: FUNCTION define_index(fieldname text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_index(fieldname text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_index(fieldname text, tablename text, schemaname text) TO navy_media_visitor;


--
-- Name: FUNCTION define_indexes_with_id(fieldname text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_indexes_with_id(fieldname text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_indexes_with_id(fieldname text, tablename text, schemaname text) TO navy_media_visitor;


--
-- Name: FUNCTION define_like_index(fieldname text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_like_index(fieldname text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_like_index(fieldname text, tablename text, schemaname text) TO navy_media_visitor;


--
-- Name: FUNCTION define_readonly_authentication(readpermissions text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_readonly_authentication(readpermissions text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_readonly_authentication(readpermissions text, tablename text, schemaname text) TO navy_media_visitor;


--
-- Name: FUNCTION define_subscription_triggers(idcolumn text, tablename text, schemaname text, maintablename text, eventtype text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_subscription_triggers(idcolumn text, tablename text, schemaname text, maintablename text, eventtype text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_subscription_triggers(idcolumn text, tablename text, schemaname text, maintablename text, eventtype text) TO navy_media_visitor;


--
-- Name: FUNCTION define_timestamps_trigger(tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_timestamps_trigger(tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_timestamps_trigger(tablename text, schemaname text) TO navy_media_visitor;


--
-- Name: FUNCTION define_unique_constraint(fieldname text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_unique_constraint(fieldname text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_unique_constraint(fieldname text, tablename text, schemaname text) TO navy_media_visitor;


--
-- Name: FUNCTION define_unique_index(fieldname text, tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_unique_index(fieldname text, tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_unique_index(fieldname text, tablename text, schemaname text) TO navy_media_visitor;


--
-- Name: FUNCTION define_users_trigger(tablename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.define_users_trigger(tablename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.define_users_trigger(tablename text, schemaname text) TO navy_media_visitor;


--
-- Name: FUNCTION expose_enum_endpoint(typename text, schemaname text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.expose_enum_endpoint(typename text, schemaname text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.expose_enum_endpoint(typename text, schemaname text) TO navy_media_visitor;


--
-- Name: FUNCTION raise_error(error_message text, error_code text, VARIADIC placeholder_values text[]); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.raise_error(error_message text, error_code text, VARIADIC placeholder_values text[]) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.raise_error(error_message text, error_code text, VARIADIC placeholder_values text[]) TO navy_media_visitor;


--
-- Name: FUNCTION tg__timestamps(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg__timestamps() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg__timestamps() TO navy_media_visitor;


--
-- Name: FUNCTION tg__username(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg__username() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg__username() TO navy_media_visitor;


--
-- Name: FUNCTION user_has_permission(required_permissions text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.user_has_permission(required_permissions text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.user_has_permission(required_permissions text) TO navy_media_visitor;


--
-- Name: FUNCTION user_has_permission_and_tag(required_permissions text, fieldvalue text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.user_has_permission_and_tag(required_permissions text, fieldvalue text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.user_has_permission_and_tag(required_permissions text, fieldvalue text) TO navy_media_visitor;


--
-- Name: FUNCTION user_has_setting(required_settings text, local_variable_field text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.user_has_setting(required_settings text, local_variable_field text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.user_has_setting(required_settings text, local_variable_field text) TO navy_media_visitor;


--
-- Name: FUNCTION user_has_tag(required_permissions text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.user_has_tag(required_permissions text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.user_has_tag(required_permissions text) TO navy_media_visitor;


--
-- Name: FUNCTION validation_is_base64(input_value text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.validation_is_base64(input_value text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.validation_is_base64(input_value text) TO navy_media_visitor;


--
-- Name: FUNCTION validation_is_url(input_value text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.validation_is_url(input_value text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.validation_is_url(input_value text) TO navy_media_visitor;


--
-- Name: FUNCTION validation_not_empty(input_value text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.validation_not_empty(input_value text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.validation_not_empty(input_value text) TO navy_media_visitor;


--
-- Name: FUNCTION validation_starts_with(input_value text, prefix_value text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.validation_starts_with(input_value text, prefix_value text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.validation_starts_with(input_value text, prefix_value text) TO navy_media_visitor;


--
-- Name: FUNCTION get_collection_entity_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_collection_entity_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_collection_entity_values() TO navy_media_visitor;


--
-- Name: FUNCTION get_collection_image_type_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_collection_image_type_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_collection_image_type_values() TO navy_media_visitor;


--
-- Name: FUNCTION get_collection_type_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_collection_type_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_collection_type_values() TO navy_media_visitor;


--
-- Name: FUNCTION get_episode_image_type_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_episode_image_type_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_episode_image_type_values() TO navy_media_visitor;


--
-- Name: FUNCTION get_iso_alpha_three_country_codes_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_iso_alpha_three_country_codes_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_iso_alpha_three_country_codes_values() TO navy_media_visitor;


--
-- Name: FUNCTION get_movie_image_type_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_movie_image_type_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_movie_image_type_values() TO navy_media_visitor;


--
-- Name: FUNCTION get_publish_status_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_publish_status_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_publish_status_values() TO navy_media_visitor;


--
-- Name: FUNCTION get_season_image_type_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_season_image_type_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_season_image_type_values() TO navy_media_visitor;


--
-- Name: FUNCTION get_tvshow_image_type_values(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_tvshow_image_type_values() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_tvshow_image_type_values() TO navy_media_visitor;


--
-- Name: FUNCTION tg__graphql_subscription(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.tg__graphql_subscription() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.tg__graphql_subscription() TO navy_media_visitor;


--
-- Name: TABLE automatic_collections_filters; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.automatic_collections_filters TO navy_media_visitor;


--
-- Name: SEQUENCE automatic_collections_filters_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.automatic_collections_filters_id_seq TO navy_media_visitor;


--
-- Name: TABLE collection_relations; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE ON TABLE app_public.collection_relations TO navy_media_visitor;


--
-- Name: COLUMN collection_relations.collection_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(collection_id) ON TABLE app_public.collection_relations TO navy_media_visitor;


--
-- Name: COLUMN collection_relations.sort_order; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(sort_order) ON TABLE app_public.collection_relations TO navy_media_visitor;


--
-- Name: COLUMN collection_relations.movie_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(movie_id) ON TABLE app_public.collection_relations TO navy_media_visitor;


--
-- Name: COLUMN collection_relations.tvshow_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(tvshow_id) ON TABLE app_public.collection_relations TO navy_media_visitor;


--
-- Name: COLUMN collection_relations.season_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(season_id) ON TABLE app_public.collection_relations TO navy_media_visitor;


--
-- Name: COLUMN collection_relations.episode_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(episode_id) ON TABLE app_public.collection_relations TO navy_media_visitor;


--
-- Name: SEQUENCE collection_relations_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.collection_relations_id_seq TO navy_media_visitor;


--
-- Name: TABLE collections; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.collections TO navy_media_visitor;


--
-- Name: COLUMN collections.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(title),UPDATE(title) ON TABLE app_public.collections TO navy_media_visitor;


--
-- Name: COLUMN collections.external_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(external_id),UPDATE(external_id) ON TABLE app_public.collections TO navy_media_visitor;


--
-- Name: COLUMN collections.synopsis; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(synopsis),UPDATE(synopsis) ON TABLE app_public.collections TO navy_media_visitor;


--
-- Name: COLUMN collections.description; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE app_public.collections TO navy_media_visitor;


--
-- Name: COLUMN collections.collection_type; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(collection_type),UPDATE(collection_type) ON TABLE app_public.collections TO navy_media_visitor;


--
-- Name: COLUMN collections.automatic_collection_sort_key; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(automatic_collection_sort_key),UPDATE(automatic_collection_sort_key) ON TABLE app_public.collections TO navy_media_visitor;


--
-- Name: COLUMN collections.publish_status; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(publish_status) ON TABLE app_public.collections TO navy_media_visitor;


--
-- Name: SEQUENCE collections_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.collections_id_seq TO navy_media_visitor;


--
-- Name: TABLE collections_images; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.collections_images TO navy_media_visitor;


--
-- Name: TABLE collections_tags; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.collections_tags TO navy_media_visitor;


--
-- Name: TABLE episodes; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.season_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(season_id),UPDATE(season_id) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.index; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(index),UPDATE(index) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(title),UPDATE(title) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.external_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(external_id),UPDATE(external_id) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.original_title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(original_title),UPDATE(original_title) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.synopsis; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(synopsis),UPDATE(synopsis) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.description; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.studio; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(studio),UPDATE(studio) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.released; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(released),UPDATE(released) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.main_video_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(main_video_id),UPDATE(main_video_id) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: COLUMN episodes.publish_status; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(publish_status) ON TABLE app_public.episodes TO navy_media_visitor;


--
-- Name: TABLE episodes_casts; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.episodes_casts TO navy_media_visitor;


--
-- Name: SEQUENCE episodes_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.episodes_id_seq TO navy_media_visitor;


--
-- Name: TABLE episodes_images; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.episodes_images TO navy_media_visitor;


--
-- Name: TABLE episodes_licenses; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.episodes_licenses TO navy_media_visitor;


--
-- Name: COLUMN episodes_licenses.episode_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(episode_id),UPDATE(episode_id) ON TABLE app_public.episodes_licenses TO navy_media_visitor;


--
-- Name: COLUMN episodes_licenses.license_start; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(license_start),UPDATE(license_start) ON TABLE app_public.episodes_licenses TO navy_media_visitor;


--
-- Name: COLUMN episodes_licenses.license_end; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(license_end),UPDATE(license_end) ON TABLE app_public.episodes_licenses TO navy_media_visitor;


--
-- Name: COLUMN episodes_licenses.countries; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(countries),UPDATE(countries) ON TABLE app_public.episodes_licenses TO navy_media_visitor;


--
-- Name: SEQUENCE episodes_licenses_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.episodes_licenses_id_seq TO navy_media_visitor;


--
-- Name: TABLE episodes_production_countries; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.episodes_production_countries TO navy_media_visitor;


--
-- Name: TABLE episodes_tags; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.episodes_tags TO navy_media_visitor;


--
-- Name: TABLE episodes_trailers; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.episodes_trailers TO navy_media_visitor;


--
-- Name: TABLE episodes_tvshow_genres; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.episodes_tvshow_genres TO navy_media_visitor;


--
-- Name: TABLE movie_genres; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.movie_genres TO navy_media_visitor;


--
-- Name: COLUMN movie_genres.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(title),UPDATE(title) ON TABLE app_public.movie_genres TO navy_media_visitor;


--
-- Name: COLUMN movie_genres.sort_order; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(sort_order),UPDATE(sort_order) ON TABLE app_public.movie_genres TO navy_media_visitor;


--
-- Name: SEQUENCE movie_genres_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.movie_genres_id_seq TO navy_media_visitor;


--
-- Name: TABLE movies; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.movies TO navy_media_visitor;


--
-- Name: COLUMN movies.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(title),UPDATE(title) ON TABLE app_public.movies TO navy_media_visitor;


--
-- Name: COLUMN movies.external_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(external_id),UPDATE(external_id) ON TABLE app_public.movies TO navy_media_visitor;


--
-- Name: COLUMN movies.original_title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(original_title),UPDATE(original_title) ON TABLE app_public.movies TO navy_media_visitor;


--
-- Name: COLUMN movies.synopsis; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(synopsis),UPDATE(synopsis) ON TABLE app_public.movies TO navy_media_visitor;


--
-- Name: COLUMN movies.description; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE app_public.movies TO navy_media_visitor;


--
-- Name: COLUMN movies.studio; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(studio),UPDATE(studio) ON TABLE app_public.movies TO navy_media_visitor;


--
-- Name: COLUMN movies.released; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(released),UPDATE(released) ON TABLE app_public.movies TO navy_media_visitor;


--
-- Name: COLUMN movies.main_video_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(main_video_id),UPDATE(main_video_id) ON TABLE app_public.movies TO navy_media_visitor;


--
-- Name: COLUMN movies.publish_status; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(publish_status) ON TABLE app_public.movies TO navy_media_visitor;


--
-- Name: TABLE movies_casts; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.movies_casts TO navy_media_visitor;


--
-- Name: SEQUENCE movies_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.movies_id_seq TO navy_media_visitor;


--
-- Name: TABLE movies_images; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.movies_images TO navy_media_visitor;


--
-- Name: TABLE movies_licenses; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.movies_licenses TO navy_media_visitor;


--
-- Name: COLUMN movies_licenses.movie_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(movie_id),UPDATE(movie_id) ON TABLE app_public.movies_licenses TO navy_media_visitor;


--
-- Name: COLUMN movies_licenses.license_start; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(license_start),UPDATE(license_start) ON TABLE app_public.movies_licenses TO navy_media_visitor;


--
-- Name: COLUMN movies_licenses.license_end; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(license_end),UPDATE(license_end) ON TABLE app_public.movies_licenses TO navy_media_visitor;


--
-- Name: COLUMN movies_licenses.countries; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(countries),UPDATE(countries) ON TABLE app_public.movies_licenses TO navy_media_visitor;


--
-- Name: SEQUENCE movies_licenses_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.movies_licenses_id_seq TO navy_media_visitor;


--
-- Name: TABLE movies_movie_genres; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.movies_movie_genres TO navy_media_visitor;


--
-- Name: TABLE movies_production_countries; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.movies_production_countries TO navy_media_visitor;


--
-- Name: TABLE movies_tags; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.movies_tags TO navy_media_visitor;


--
-- Name: TABLE movies_trailers; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.movies_trailers TO navy_media_visitor;


--
-- Name: TABLE seasons; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.seasons TO navy_media_visitor;


--
-- Name: COLUMN seasons.tvshow_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(tvshow_id),UPDATE(tvshow_id) ON TABLE app_public.seasons TO navy_media_visitor;


--
-- Name: COLUMN seasons.index; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(index),UPDATE(index) ON TABLE app_public.seasons TO navy_media_visitor;


--
-- Name: COLUMN seasons.external_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(external_id),UPDATE(external_id) ON TABLE app_public.seasons TO navy_media_visitor;


--
-- Name: COLUMN seasons.synopsis; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(synopsis),UPDATE(synopsis) ON TABLE app_public.seasons TO navy_media_visitor;


--
-- Name: COLUMN seasons.description; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE app_public.seasons TO navy_media_visitor;


--
-- Name: COLUMN seasons.studio; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(studio),UPDATE(studio) ON TABLE app_public.seasons TO navy_media_visitor;


--
-- Name: COLUMN seasons.released; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(released),UPDATE(released) ON TABLE app_public.seasons TO navy_media_visitor;


--
-- Name: COLUMN seasons.publish_status; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(publish_status) ON TABLE app_public.seasons TO navy_media_visitor;


--
-- Name: TABLE seasons_casts; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.seasons_casts TO navy_media_visitor;


--
-- Name: SEQUENCE seasons_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.seasons_id_seq TO navy_media_visitor;


--
-- Name: TABLE seasons_images; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.seasons_images TO navy_media_visitor;


--
-- Name: TABLE seasons_licenses; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.seasons_licenses TO navy_media_visitor;


--
-- Name: COLUMN seasons_licenses.season_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(season_id),UPDATE(season_id) ON TABLE app_public.seasons_licenses TO navy_media_visitor;


--
-- Name: COLUMN seasons_licenses.license_start; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(license_start),UPDATE(license_start) ON TABLE app_public.seasons_licenses TO navy_media_visitor;


--
-- Name: COLUMN seasons_licenses.license_end; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(license_end),UPDATE(license_end) ON TABLE app_public.seasons_licenses TO navy_media_visitor;


--
-- Name: COLUMN seasons_licenses.countries; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(countries),UPDATE(countries) ON TABLE app_public.seasons_licenses TO navy_media_visitor;


--
-- Name: SEQUENCE seasons_licenses_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.seasons_licenses_id_seq TO navy_media_visitor;


--
-- Name: TABLE seasons_production_countries; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.seasons_production_countries TO navy_media_visitor;


--
-- Name: TABLE seasons_tags; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.seasons_tags TO navy_media_visitor;


--
-- Name: TABLE seasons_trailers; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.seasons_trailers TO navy_media_visitor;


--
-- Name: TABLE seasons_tvshow_genres; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.seasons_tvshow_genres TO navy_media_visitor;


--
-- Name: TABLE tvshow_genres; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.tvshow_genres TO navy_media_visitor;


--
-- Name: COLUMN tvshow_genres.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(title),UPDATE(title) ON TABLE app_public.tvshow_genres TO navy_media_visitor;


--
-- Name: COLUMN tvshow_genres.sort_order; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(sort_order),UPDATE(sort_order) ON TABLE app_public.tvshow_genres TO navy_media_visitor;


--
-- Name: SEQUENCE tvshow_genres_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.tvshow_genres_id_seq TO navy_media_visitor;


--
-- Name: TABLE tvshows; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.tvshows TO navy_media_visitor;


--
-- Name: COLUMN tvshows.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(title),UPDATE(title) ON TABLE app_public.tvshows TO navy_media_visitor;


--
-- Name: COLUMN tvshows.external_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(external_id),UPDATE(external_id) ON TABLE app_public.tvshows TO navy_media_visitor;


--
-- Name: COLUMN tvshows.original_title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(original_title),UPDATE(original_title) ON TABLE app_public.tvshows TO navy_media_visitor;


--
-- Name: COLUMN tvshows.synopsis; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(synopsis),UPDATE(synopsis) ON TABLE app_public.tvshows TO navy_media_visitor;


--
-- Name: COLUMN tvshows.description; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE app_public.tvshows TO navy_media_visitor;


--
-- Name: COLUMN tvshows.studio; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(studio),UPDATE(studio) ON TABLE app_public.tvshows TO navy_media_visitor;


--
-- Name: COLUMN tvshows.released; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(released),UPDATE(released) ON TABLE app_public.tvshows TO navy_media_visitor;


--
-- Name: COLUMN tvshows.publish_status; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(publish_status) ON TABLE app_public.tvshows TO navy_media_visitor;


--
-- Name: TABLE tvshows_casts; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.tvshows_casts TO navy_media_visitor;


--
-- Name: SEQUENCE tvshows_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.tvshows_id_seq TO navy_media_visitor;


--
-- Name: TABLE tvshows_images; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.tvshows_images TO navy_media_visitor;


--
-- Name: TABLE tvshows_licenses; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.tvshows_licenses TO navy_media_visitor;


--
-- Name: COLUMN tvshows_licenses.tvshow_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(tvshow_id),UPDATE(tvshow_id) ON TABLE app_public.tvshows_licenses TO navy_media_visitor;


--
-- Name: COLUMN tvshows_licenses.license_start; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(license_start),UPDATE(license_start) ON TABLE app_public.tvshows_licenses TO navy_media_visitor;


--
-- Name: COLUMN tvshows_licenses.license_end; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(license_end),UPDATE(license_end) ON TABLE app_public.tvshows_licenses TO navy_media_visitor;


--
-- Name: COLUMN tvshows_licenses.countries; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(countries),UPDATE(countries) ON TABLE app_public.tvshows_licenses TO navy_media_visitor;


--
-- Name: SEQUENCE tvshows_licenses_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.tvshows_licenses_id_seq TO navy_media_visitor;


--
-- Name: TABLE tvshows_production_countries; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.tvshows_production_countries TO navy_media_visitor;


--
-- Name: TABLE tvshows_tags; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.tvshows_tags TO navy_media_visitor;


--
-- Name: TABLE tvshows_trailers; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.tvshows_trailers TO navy_media_visitor;


--
-- Name: TABLE tvshows_tvshow_genres; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.tvshows_tvshow_genres TO navy_media_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app_hidden; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA app_hidden REVOKE ALL ON SEQUENCES  FROM navy_media;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA app_hidden GRANT SELECT,USAGE ON SEQUENCES  TO navy_media_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: app_hidden; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA app_hidden REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA app_hidden REVOKE ALL ON FUNCTIONS  FROM navy_media;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA app_hidden GRANT ALL ON FUNCTIONS  TO navy_media_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app_public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA app_public REVOKE ALL ON SEQUENCES  FROM navy_media;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA app_public GRANT SELECT,USAGE ON SEQUENCES  TO navy_media_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: app_public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA app_public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA app_public REVOKE ALL ON FUNCTIONS  FROM navy_media;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA app_public GRANT ALL ON FUNCTIONS  TO navy_media_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA public REVOKE ALL ON SEQUENCES  FROM navy_media;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA public GRANT SELECT,USAGE ON SEQUENCES  TO navy_media_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM navy_media;
ALTER DEFAULT PRIVILEGES FOR ROLE navy_media IN SCHEMA public GRANT ALL ON FUNCTIONS  TO navy_media_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE navy_media REVOKE ALL ON FUNCTIONS  FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

