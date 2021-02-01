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
-- Name: access_management; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA access_management;


--
-- Name: app_hidden; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_hidden;


--
-- Name: app_private; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_private;


--
-- Name: application_administration; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA application_administration;


--
-- Name: auth_endpoint; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA auth_endpoint;


--
-- Name: tenant_administration; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA tenant_administration;


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: user_status; Type: TYPE; Schema: access_management; Owner: -
--

CREATE TYPE access_management.user_status AS ENUM (
    'ACTIVE',
    'BLOCKED'
);


--
-- Name: identity_provider; Type: TYPE; Schema: application_administration; Owner: -
--

CREATE TYPE application_administration.identity_provider AS ENUM (
    'AZURE_AD',
    'AX_AUTH',
    'GOOGLE'
);


--
-- Name: tenant_status; Type: TYPE; Schema: tenant_administration; Owner: -
--

CREATE TYPE tenant_administration.tenant_status AS ENUM (
    'ENABLED',
    'DISABLED'
);


--
-- Name: constraint_email_format(text, text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.constraint_email_format(email_ text, property_name_ text, error_message_ text DEFAULT '"$1" is not in a valid format.'::text, error_code_ text DEFAULT 'PATRN'::text) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$
DECLARE
  email_regex_ TEXT := '^[^\s@]+@[^\s@]+\.[^\s@]+$';
BEGIN
  RETURN app_hidden.format_error(email_, email_regex_, error_message_, error_code_, property_name_, email_);
END;
$_$;


--
-- Name: constraint_max_length(text, text, integer, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.constraint_max_length(input_value_ text, property_name_ text, max_length_ integer, error_message_ text DEFAULT '"$1" can only be $2 character(s) long.'::text, error_code_ text DEFAULT 'MXLEN'::text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF length(input_value_) > max_length_ THEN
    perform app_hidden.raise_error(error_message_, error_code_, property_name_, max_length_::TEXT);
  END IF;

  RETURN TRUE;
END;
$$;


--
-- Name: constraint_min_length(text, text, integer, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.constraint_min_length(input_value_ text, property_name_ text, min_length_ integer, error_message_ text DEFAULT '"$1" must be at least $2 character(s) long.'::text, error_code_ text DEFAULT 'MNLEN'::text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF length(input_value_) < min_length_ THEN
  	perform app_hidden.raise_error(error_message_, error_code_, property_name_, min_length_::TEXT);
  END IF;

  RETURN TRUE;
END;
$$;


--
-- Name: constraint_not_empty(text, text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.constraint_not_empty(input_value_ text, property_name_ text, error_message_ text DEFAULT '"$1" cannot be whitespace or empty.'::text, error_code_ text DEFAULT 'EMPTY'::text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF trim(input_value_) = '' THEN
  	perform app_hidden.raise_error(error_message_, error_code_, property_name_, input_value_);
  END IF;

  RETURN TRUE;
END;
$$;


--
-- Name: current_application_id(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.current_application_id() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  SELECT coalesce(nullif(current_setting('axinom.auth.applicationId', TRUE), ''), uuid_nil()::TEXT)::UUID;
$$;


--
-- Name: current_tenant_id(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.current_tenant_id() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  SELECT coalesce(nullif(current_setting('axinom.auth.tenantId', TRUE), ''), uuid_nil()::TEXT)::UUID;
$$;


--
-- Name: format_error(text, text, text, text, text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.format_error(input_value_ text, pattern_regex_ text, error_message_ text, error_code_ text DEFAULT 'PATRN'::text, value1_ text DEFAULT '$1'::text, value2_ text DEFAULT '$2'::text, value3_ text DEFAULT '$3'::text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF input_value_ !~* pattern_regex_ THEN
    perform app_hidden.raise_error(error_message_, error_code_, value1_, value2_, value3_);
  END IF;
  
  RETURN TRUE;
END;
$$;


--
-- Name: get_tenant_id_by_application_id(uuid); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.get_tenant_id_by_application_id(application_id_ uuid) RETURNS uuid
    LANGUAGE sql SECURITY DEFINER
    SET search_path TO 'application_administration'
    AS $$
  SELECT tenant_id FROM application_administration.application WHERE id = application_id_;
$$;


--
-- Name: raise_error(text, text, text, text, text); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.raise_error(error_message_ text, error_code_ text, value1_ text DEFAULT '$1'::text, value2_ text DEFAULT '$2'::text, value3_ text DEFAULT '$3'::text) RETURNS void
    LANGUAGE plpgsql
    AS $_$
DECLARE
  error_text_ TEXT;
BEGIN
  error_text_ = replace(replace(replace(error_message_, '$1', value1_), '$2', value2_), '$3', value3_);
  RAISE EXCEPTION '%', error_text_ using ERRCODE = error_code_;
END;
$_$;


--
-- Name: tg__tenant(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.tg__tenant() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.tenant_id = current_setting('axinom.auth.tenantId', FALSE);  
  RETURN NEW;
END;
$$;


--
-- Name: FUNCTION tg__tenant(); Type: COMMENT; Schema: app_hidden; Owner: -
--

COMMENT ON FUNCTION app_hidden.tg__tenant() IS 'This trigger should be called on tables needing automatic tenant_id - to support multi-tenancy';


--
-- Name: tg__tenant_application(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.tg__tenant_application() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.tenant_id = current_setting('axinom.auth.tenantId', FALSE);
  NEW.application_id = current_setting('axinom.auth.applicationId', FALSE);  
  RETURN NEW;
END;
$$;


--
-- Name: FUNCTION tg__tenant_application(); Type: COMMENT; Schema: app_hidden; Owner: -
--

COMMENT ON FUNCTION app_hidden.tg__tenant_application() IS 'This trigger should be called on tables needing automatic tenant_id, application_id - to support multi-tenancy';


--
-- Name: tg__timestamps(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.tg__timestamps() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.created_at = (CASE WHEN TG_OP = 'INSERT' THEN NOW() ELSE OLD.created_at END);
  NEW.updated_at = (CASE WHEN TG_OP = 'UPDATE' AND OLD.updated_at >= NOW() THEN OLD.updated_at + interval '1 millisecond' ELSE NOW() END);
  RETURN NEW;
END;
$$;


--
-- Name: FUNCTION tg__timestamps(); Type: COMMENT; Schema: app_hidden; Owner: -
--

COMMENT ON FUNCTION app_hidden.tg__timestamps() IS 'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';


--
-- Name: tg__usernames(); Type: FUNCTION; Schema: app_hidden; Owner: -
--

CREATE FUNCTION app_hidden.tg__usernames() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.created_by = (CASE WHEN TG_OP = 'INSERT' THEN current_setting('axinom.auth.user', FALSE) ELSE OLD.created_by END);
  NEW.updated_by = (CASE WHEN TG_OP = 'UPDATE' OR TG_OP = 'INSERT' THEN current_setting('axinom.auth.user', FALSE) ELSE OLD.updated_by END);
  RETURN NEW;
END;
$$;


--
-- Name: FUNCTION tg__usernames(); Type: COMMENT; Schema: app_hidden; Owner: -
--

COMMENT ON FUNCTION app_hidden.tg__usernames() IS 'This trigger should be called on all tables with created_by, updated_by - it ensures that they cannot be manipulated';


--
-- Name: enable_tenant_application_rls_on_table(text, text); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.enable_tenant_application_rls_on_table(schema_name_ text, table_name_ text) RETURNS void
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: enable_tenant_rls_on_table(text, text); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.enable_tenant_rls_on_table(schema_name_ text, table_name_ text) RETURNS void
    LANGUAGE plpgsql
    AS $$
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
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: permission; Type: TABLE; Schema: access_management; Owner: -
--

CREATE TABLE access_management.permission (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    service_id text NOT NULL,
    name text NOT NULL,
    from_managed_service boolean DEFAULT false NOT NULL,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL,
    CONSTRAINT name_max_length CHECK (app_hidden.constraint_max_length(name, 'Name'::text, 100)),
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'Name'::text)),
    CONSTRAINT service_id_max_length CHECK (app_hidden.constraint_max_length(service_id, 'Service ID'::text, 50)),
    CONSTRAINT service_id_not_empty CHECK (app_hidden.constraint_not_empty(service_id, 'Service ID'::text))
);


--
-- Name: service_account; Type: TABLE; Schema: access_management; Owner: -
--

CREATE TABLE access_management.service_account (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    client_id text DEFAULT public.uuid_generate_v4() NOT NULL,
    client_secret text,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL,
    CONSTRAINT name_max_length CHECK (app_hidden.constraint_max_length(name, 'Name'::text, 100)),
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'Name'::text))
);


--
-- Name: service_account_permission; Type: TABLE; Schema: access_management; Owner: -
--

CREATE TABLE access_management.service_account_permission (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    service_account_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL
);


--
-- Name: tag; Type: TABLE; Schema: access_management; Owner: -
--

CREATE TABLE access_management.tag (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL,
    CONSTRAINT description_max_length CHECK (app_hidden.constraint_max_length(description, 'Description'::text, 2000)),
    CONSTRAINT description_not_empty CHECK (app_hidden.constraint_not_empty(description, 'Description'::text)),
    CONSTRAINT name_max_length CHECK (app_hidden.constraint_max_length(name, 'Name'::text, 100)),
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'Name'::text))
);


--
-- Name: user; Type: TABLE; Schema: access_management; Owner: -
--

CREATE TABLE access_management."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    profile_picture_url text,
    email text NOT NULL,
    status access_management.user_status DEFAULT 'BLOCKED'::access_management.user_status NOT NULL,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL,
    CONSTRAINT email_format CHECK (app_hidden.constraint_email_format(email, 'Email'::text)),
    CONSTRAINT name_max_length CHECK (app_hidden.constraint_max_length(name, 'Name'::text, 200)),
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'Name'::text)),
    CONSTRAINT profile_picture_url_max_length CHECK (app_hidden.constraint_max_length(profile_picture_url, 'Profile Picture URL'::text, 2000)),
    CONSTRAINT profile_picture_url_not_empty CHECK (app_hidden.constraint_not_empty(profile_picture_url, 'Profile Picture URL'::text))
);


--
-- Name: user_role; Type: TABLE; Schema: access_management; Owner: -
--

CREATE TABLE access_management.user_role (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL,
    CONSTRAINT description_max_length CHECK (app_hidden.constraint_max_length(description, 'Description'::text, 2000)),
    CONSTRAINT description_not_empty CHECK (app_hidden.constraint_not_empty(description, 'Description'::text)),
    CONSTRAINT name_max_length CHECK (app_hidden.constraint_max_length(name, 'Name'::text, 200)),
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'Name'::text))
);


--
-- Name: user_role_assignment; Type: TABLE; Schema: access_management; Owner: -
--

CREATE TABLE access_management.user_role_assignment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    user_role_id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL
);


--
-- Name: user_role_parent; Type: TABLE; Schema: access_management; Owner: -
--

CREATE TABLE access_management.user_role_parent (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_role_id uuid NOT NULL,
    parent_user_role_id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL
);


--
-- Name: user_role_permission; Type: TABLE; Schema: access_management; Owner: -
--

CREATE TABLE access_management.user_role_permission (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_role_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL
);


--
-- Name: user_role_tag; Type: TABLE; Schema: access_management; Owner: -
--

CREATE TABLE access_management.user_role_tag (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_role_id uuid NOT NULL,
    tag_id uuid NOT NULL,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL
);


--
-- Name: application; Type: TABLE; Schema: application_administration; Owner: -
--

CREATE TABLE application_administration.application (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    allowed_origins text[],
    interim_administrator_email text NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    is_root boolean DEFAULT false NOT NULL,
    tenant_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL,
    CONSTRAINT email_format CHECK (app_hidden.constraint_email_format(interim_administrator_email, 'Interim Administrator Email'::text)),
    CONSTRAINT name_max_length CHECK (app_hidden.constraint_max_length(name, 'Name'::text, 100)),
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'Name'::text))
);


--
-- Name: idp_configuration; Type: TABLE; Schema: application_administration; Owner: -
--

CREATE TABLE application_administration.idp_configuration (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    idp_id application_administration.identity_provider NOT NULL,
    discovery_document_url text NOT NULL,
    client_id text NOT NULL,
    client_secret text NOT NULL,
    scopes text[] NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL,
    CONSTRAINT client_id_max_length CHECK (app_hidden.constraint_max_length(client_id, 'Client ID'::text, 100)),
    CONSTRAINT client_id_not_empty CHECK (app_hidden.constraint_not_empty(client_id, 'Client ID'::text)),
    CONSTRAINT client_secret_max_length CHECK (app_hidden.constraint_max_length(client_secret, 'Client Secret'::text, 200)),
    CONSTRAINT client_secret_not_empty CHECK (app_hidden.constraint_not_empty(client_secret, 'Client Secret'::text)),
    CONSTRAINT discovery_document_url_not_empty CHECK (app_hidden.constraint_not_empty(discovery_document_url, 'Discovery document URL'::text))
);


--
-- Name: idp_scope; Type: TABLE; Schema: application_administration; Owner: -
--

CREATE TABLE application_administration.idp_scope (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    idp_id application_administration.identity_provider NOT NULL,
    scope_name text NOT NULL,
    required boolean DEFAULT false NOT NULL
);


--
-- Name: user_token; Type: TABLE; Schema: auth_endpoint; Owner: -
--

CREATE TABLE auth_endpoint.user_token (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    idp_id application_administration.identity_provider NOT NULL,
    idp_subject_id text NOT NULL,
    idp_access_token text NOT NULL,
    idp_refresh_token text NOT NULL,
    idp_access_token_expires_at timestamp with time zone NOT NULL,
    axinom_iam_token text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    tenant_id uuid NOT NULL,
    application_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: tenant; Type: TABLE; Schema: tenant_administration; Owner: -
--

CREATE TABLE tenant_administration.tenant (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    status tenant_administration.tenant_status DEFAULT 'DISABLED'::tenant_administration.tenant_status NOT NULL,
    is_root boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL,
    CONSTRAINT name_max_length CHECK (app_hidden.constraint_max_length(name, 'Name'::text, 200)),
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'Name'::text))
);


--
-- Name: tenant_admin; Type: TABLE; Schema: tenant_administration; Owner: -
--

CREATE TABLE tenant_administration.tenant_admin (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password_hash text,
    active boolean DEFAULT false NOT NULL,
    password_changed boolean DEFAULT false NOT NULL,
    tenant_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by text NOT NULL,
    CONSTRAINT email_format CHECK (app_hidden.constraint_email_format(email, 'Email'::text)),
    CONSTRAINT name_max_length CHECK (app_hidden.constraint_max_length(name, 'Name'::text, 200)),
    CONSTRAINT name_not_empty CHECK (app_hidden.constraint_not_empty(name, 'Name'::text))
);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: permission permission_service_id_name_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.permission
    ADD CONSTRAINT permission_service_id_name_key UNIQUE (tenant_id, application_id, service_id, name);


--
-- Name: service_account_permission service_account_permission_pkey; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.service_account_permission
    ADD CONSTRAINT service_account_permission_pkey PRIMARY KEY (id);


--
-- Name: service_account_permission service_account_permission_service_account_id_permission_id_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.service_account_permission
    ADD CONSTRAINT service_account_permission_service_account_id_permission_id_key UNIQUE (tenant_id, application_id, service_account_id, permission_id);


--
-- Name: service_account service_account_pkey; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.service_account
    ADD CONSTRAINT service_account_pkey PRIMARY KEY (id);


--
-- Name: service_account service_account_tenant_id_application_id_name_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.service_account
    ADD CONSTRAINT service_account_tenant_id_application_id_name_key UNIQUE (tenant_id, application_id, name);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: tag tag_tenant_id_application_id_name_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.tag
    ADD CONSTRAINT tag_tenant_id_application_id_name_key UNIQUE (tenant_id, application_id, name);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_role_assignment user_role_assignment_pkey; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_assignment
    ADD CONSTRAINT user_role_assignment_pkey PRIMARY KEY (id);


--
-- Name: user_role_assignment user_role_assignment_user_id_user_role_id_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_assignment
    ADD CONSTRAINT user_role_assignment_user_id_user_role_id_key UNIQUE (tenant_id, application_id, user_id, user_role_id);


--
-- Name: user_role_parent user_role_parent_pkey; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_parent
    ADD CONSTRAINT user_role_parent_pkey PRIMARY KEY (id);


--
-- Name: user_role_parent user_role_parent_user_role_id_parent_user_role_id_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_parent
    ADD CONSTRAINT user_role_parent_user_role_id_parent_user_role_id_key UNIQUE (tenant_id, application_id, user_role_id, parent_user_role_id);


--
-- Name: user_role_permission user_role_permission_pkey; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_permission
    ADD CONSTRAINT user_role_permission_pkey PRIMARY KEY (id);


--
-- Name: user_role_permission user_role_permission_user_role_id_permission_id_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_permission
    ADD CONSTRAINT user_role_permission_user_role_id_permission_id_key UNIQUE (tenant_id, application_id, user_role_id, permission_id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);


--
-- Name: user_role_tag user_role_tag_pkey; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_tag
    ADD CONSTRAINT user_role_tag_pkey PRIMARY KEY (id);


--
-- Name: user_role_tag user_role_tag_user_role_id_tag_id_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_tag
    ADD CONSTRAINT user_role_tag_user_role_id_tag_id_key UNIQUE (tenant_id, application_id, user_role_id, tag_id);


--
-- Name: user_role user_role_tenant_id_application_id_name_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role
    ADD CONSTRAINT user_role_tenant_id_application_id_name_key UNIQUE (tenant_id, application_id, name);


--
-- Name: user user_tenant_id_application_id_email_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management."user"
    ADD CONSTRAINT user_tenant_id_application_id_email_key UNIQUE (tenant_id, application_id, email);


--
-- Name: user user_tenant_id_application_id_id_key; Type: CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management."user"
    ADD CONSTRAINT user_tenant_id_application_id_id_key UNIQUE (tenant_id, application_id, id);


--
-- Name: application application_pkey; Type: CONSTRAINT; Schema: application_administration; Owner: -
--

ALTER TABLE ONLY application_administration.application
    ADD CONSTRAINT application_pkey PRIMARY KEY (id);


--
-- Name: application application_tenant_id_id_key; Type: CONSTRAINT; Schema: application_administration; Owner: -
--

ALTER TABLE ONLY application_administration.application
    ADD CONSTRAINT application_tenant_id_id_key UNIQUE (tenant_id, id);


--
-- Name: application application_tenant_id_name_key; Type: CONSTRAINT; Schema: application_administration; Owner: -
--

ALTER TABLE ONLY application_administration.application
    ADD CONSTRAINT application_tenant_id_name_key UNIQUE (tenant_id, name);


--
-- Name: idp_configuration idp_configuration_pkey; Type: CONSTRAINT; Schema: application_administration; Owner: -
--

ALTER TABLE ONLY application_administration.idp_configuration
    ADD CONSTRAINT idp_configuration_pkey PRIMARY KEY (id);


--
-- Name: idp_configuration idp_configuration_tenant_id_application_id_idp_id_key; Type: CONSTRAINT; Schema: application_administration; Owner: -
--

ALTER TABLE ONLY application_administration.idp_configuration
    ADD CONSTRAINT idp_configuration_tenant_id_application_id_idp_id_key UNIQUE (tenant_id, application_id, idp_id);


--
-- Name: idp_scope idp_scope_idp_id_scope_name_key; Type: CONSTRAINT; Schema: application_administration; Owner: -
--

ALTER TABLE ONLY application_administration.idp_scope
    ADD CONSTRAINT idp_scope_idp_id_scope_name_key UNIQUE (idp_id, scope_name);


--
-- Name: idp_scope idp_scope_pkey; Type: CONSTRAINT; Schema: application_administration; Owner: -
--

ALTER TABLE ONLY application_administration.idp_scope
    ADD CONSTRAINT idp_scope_pkey PRIMARY KEY (id);


--
-- Name: user_token user_tenant_id_application_id_axinom_iam_token_key; Type: CONSTRAINT; Schema: auth_endpoint; Owner: -
--

ALTER TABLE ONLY auth_endpoint.user_token
    ADD CONSTRAINT user_tenant_id_application_id_axinom_iam_token_key UNIQUE (tenant_id, application_id, axinom_iam_token);


--
-- Name: user_token user_token_pkey; Type: CONSTRAINT; Schema: auth_endpoint; Owner: -
--

ALTER TABLE ONLY auth_endpoint.user_token
    ADD CONSTRAINT user_token_pkey PRIMARY KEY (id);


--
-- Name: tenant_admin tenant_admin_pkey; Type: CONSTRAINT; Schema: tenant_administration; Owner: -
--

ALTER TABLE ONLY tenant_administration.tenant_admin
    ADD CONSTRAINT tenant_admin_pkey PRIMARY KEY (id);


--
-- Name: tenant_admin tenant_admin_tenant_id_email_key; Type: CONSTRAINT; Schema: tenant_administration; Owner: -
--

ALTER TABLE ONLY tenant_administration.tenant_admin
    ADD CONSTRAINT tenant_admin_tenant_id_email_key UNIQUE (tenant_id, email);


--
-- Name: tenant tenant_name_key; Type: CONSTRAINT; Schema: tenant_administration; Owner: -
--

ALTER TABLE ONLY tenant_administration.tenant
    ADD CONSTRAINT tenant_name_key UNIQUE (name);


--
-- Name: tenant tenant_pkey; Type: CONSTRAINT; Schema: tenant_administration; Owner: -
--

ALTER TABLE ONLY tenant_administration.tenant
    ADD CONSTRAINT tenant_pkey PRIMARY KEY (id);


--
-- Name: fki_permission_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_permission_application_id_fkey ON access_management.permission USING btree (application_id);


--
-- Name: fki_permission_tenant_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_permission_tenant_id_fkey ON access_management.permission USING btree (tenant_id);


--
-- Name: fki_service_account_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_service_account_application_id_fkey ON access_management.service_account USING btree (application_id);


--
-- Name: fki_service_account_permission_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_service_account_permission_application_id_fkey ON access_management.service_account_permission USING btree (application_id);


--
-- Name: fki_service_account_permission_permission_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_service_account_permission_permission_id_fkey ON access_management.service_account_permission USING btree (permission_id);


--
-- Name: fki_service_account_permission_service_account_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_service_account_permission_service_account_id_fkey ON access_management.service_account_permission USING btree (service_account_id);


--
-- Name: fki_service_account_permission_tenant_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_service_account_permission_tenant_id_fkey ON access_management.service_account_permission USING btree (tenant_id);


--
-- Name: fki_service_account_tenant_id_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_service_account_tenant_id_application_id_fkey ON access_management.service_account USING btree (tenant_id, application_id);


--
-- Name: fki_service_account_tenant_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_service_account_tenant_id_fkey ON access_management.service_account USING btree (tenant_id);


--
-- Name: fki_tag_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_tag_application_id_fkey ON access_management.tag USING btree (application_id);


--
-- Name: fki_tag_tenant_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_tag_tenant_id_fkey ON access_management.tag USING btree (tenant_id);


--
-- Name: fki_user_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_application_id_fkey ON access_management."user" USING btree (application_id);


--
-- Name: fki_user_role_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_application_id_fkey ON access_management.user_role USING btree (application_id);


--
-- Name: fki_user_role_assignment_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_assignment_application_id_fkey ON access_management.user_role_assignment USING btree (application_id);


--
-- Name: fki_user_role_assignment_tenant_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_assignment_tenant_id_fkey ON access_management.user_role_assignment USING btree (tenant_id);


--
-- Name: fki_user_role_assignment_user_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_assignment_user_id_fkey ON access_management.user_role_assignment USING btree (user_id);


--
-- Name: fki_user_role_assignment_user_role_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_assignment_user_role_id_fkey ON access_management.user_role_assignment USING btree (user_role_id);


--
-- Name: fki_user_role_parent_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_parent_application_id_fkey ON access_management.user_role_parent USING btree (application_id);


--
-- Name: fki_user_role_parent_parent_user_role_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_parent_parent_user_role_id_fkey ON access_management.user_role_parent USING btree (parent_user_role_id);


--
-- Name: fki_user_role_parent_tenant_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_parent_tenant_id_fkey ON access_management.user_role_parent USING btree (tenant_id);


--
-- Name: fki_user_role_parent_user_role_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_parent_user_role_id_fkey ON access_management.user_role_parent USING btree (user_role_id);


--
-- Name: fki_user_role_permission_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_permission_application_id_fkey ON access_management.user_role_permission USING btree (application_id);


--
-- Name: fki_user_role_permission_permission_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_permission_permission_id_fkey ON access_management.user_role_permission USING btree (permission_id);


--
-- Name: fki_user_role_permission_tenant_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_permission_tenant_id_fkey ON access_management.user_role_permission USING btree (tenant_id);


--
-- Name: fki_user_role_permission_user_role_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_permission_user_role_id_fkey ON access_management.user_role_permission USING btree (user_role_id);


--
-- Name: fki_user_role_tag_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_tag_application_id_fkey ON access_management.user_role_tag USING btree (application_id);


--
-- Name: fki_user_role_tag_tag_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_tag_tag_id_fkey ON access_management.user_role_tag USING btree (tag_id);


--
-- Name: fki_user_role_tag_tenant_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_tag_tenant_id_fkey ON access_management.user_role_tag USING btree (tenant_id);


--
-- Name: fki_user_role_tag_user_role_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_tag_user_role_id_fkey ON access_management.user_role_tag USING btree (user_role_id);


--
-- Name: fki_user_role_tenant_id_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_tenant_id_application_id_fkey ON access_management.user_role USING btree (tenant_id, application_id);


--
-- Name: fki_user_role_tenant_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_role_tenant_id_fkey ON access_management.user_role USING btree (tenant_id);


--
-- Name: fki_user_tenant_id_application_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_tenant_id_application_id_fkey ON access_management."user" USING btree (tenant_id, application_id);


--
-- Name: fki_user_tenant_id_fkey; Type: INDEX; Schema: access_management; Owner: -
--

CREATE INDEX fki_user_tenant_id_fkey ON access_management."user" USING btree (tenant_id);


--
-- Name: fki_application_tenant_id_fkey; Type: INDEX; Schema: application_administration; Owner: -
--

CREATE INDEX fki_application_tenant_id_fkey ON application_administration.application USING btree (tenant_id);


--
-- Name: fki_idp_configuration_application_id_fkey; Type: INDEX; Schema: application_administration; Owner: -
--

CREATE INDEX fki_idp_configuration_application_id_fkey ON application_administration.idp_configuration USING btree (application_id);


--
-- Name: fki_idp_configuration_tenant_id_application_id_fkey; Type: INDEX; Schema: application_administration; Owner: -
--

CREATE INDEX fki_idp_configuration_tenant_id_application_id_fkey ON application_administration.idp_configuration USING btree (tenant_id, application_id);


--
-- Name: fki_idp_configuration_tenant_id_fkey; Type: INDEX; Schema: application_administration; Owner: -
--

CREATE INDEX fki_idp_configuration_tenant_id_fkey ON application_administration.idp_configuration USING btree (tenant_id);


--
-- Name: fki_user_token_tenant_id_application_id_fkey; Type: INDEX; Schema: auth_endpoint; Owner: -
--

CREATE INDEX fki_user_token_tenant_id_application_id_fkey ON auth_endpoint.user_token USING btree (tenant_id, application_id);


--
-- Name: fki_user_token_tenant_id_application_id_idp_id_fkey; Type: INDEX; Schema: auth_endpoint; Owner: -
--

CREATE INDEX fki_user_token_tenant_id_application_id_idp_id_fkey ON auth_endpoint.user_token USING btree (tenant_id, application_id, idp_id);


--
-- Name: fki_user_token_tenant_id_application_id_user_id_fkey; Type: INDEX; Schema: auth_endpoint; Owner: -
--

CREATE INDEX fki_user_token_tenant_id_application_id_user_id_fkey ON auth_endpoint.user_token USING btree (tenant_id, application_id, user_id);


--
-- Name: fki_tenant_admin_tenant_id_fkey; Type: INDEX; Schema: tenant_administration; Owner: -
--

CREATE INDEX fki_tenant_admin_tenant_id_fkey ON tenant_administration.tenant_admin USING btree (tenant_id);


--
-- Name: permission _100_timestamps; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON access_management.permission FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: service_account _100_timestamps; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON access_management.service_account FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: service_account_permission _100_timestamps; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON access_management.service_account_permission FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: tag _100_timestamps; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON access_management.tag FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: user _100_timestamps; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON access_management."user" FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: user_role _100_timestamps; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON access_management.user_role FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: user_role_assignment _100_timestamps; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON access_management.user_role_assignment FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: user_role_parent _100_timestamps; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON access_management.user_role_parent FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: user_role_permission _100_timestamps; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON access_management.user_role_permission FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: user_role_tag _100_timestamps; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON access_management.user_role_tag FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: permission _200_usernames; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON access_management.permission FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: service_account _200_usernames; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON access_management.service_account FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: service_account_permission _200_usernames; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON access_management.service_account_permission FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: tag _200_usernames; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON access_management.tag FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: user _200_usernames; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON access_management."user" FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: user_role _200_usernames; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON access_management.user_role FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: user_role_assignment _200_usernames; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON access_management.user_role_assignment FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: user_role_parent _200_usernames; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON access_management.user_role_parent FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: user_role_permission _200_usernames; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON access_management.user_role_permission FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: user_role_tag _200_usernames; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON access_management.user_role_tag FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: permission _300_tenant_app_auth; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON access_management.permission FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: service_account _300_tenant_app_auth; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON access_management.service_account FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: service_account_permission _300_tenant_app_auth; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON access_management.service_account_permission FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: tag _300_tenant_app_auth; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON access_management.tag FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: user _300_tenant_app_auth; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON access_management."user" FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: user_role _300_tenant_app_auth; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON access_management.user_role FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: user_role_assignment _300_tenant_app_auth; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON access_management.user_role_assignment FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: user_role_parent _300_tenant_app_auth; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON access_management.user_role_parent FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: user_role_permission _300_tenant_app_auth; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON access_management.user_role_permission FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: user_role_tag _300_tenant_app_auth; Type: TRIGGER; Schema: access_management; Owner: -
--

CREATE TRIGGER _300_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON access_management.user_role_tag FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: application _100_timestamps; Type: TRIGGER; Schema: application_administration; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON application_administration.application FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: idp_configuration _100_timestamps; Type: TRIGGER; Schema: application_administration; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON application_administration.idp_configuration FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: application _200_usernames; Type: TRIGGER; Schema: application_administration; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON application_administration.application FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: idp_configuration _200_usernames; Type: TRIGGER; Schema: application_administration; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON application_administration.idp_configuration FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: application _300_tenant; Type: TRIGGER; Schema: application_administration; Owner: -
--

CREATE TRIGGER _300_tenant BEFORE INSERT ON application_administration.application FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant();


--
-- Name: idp_configuration _300_tenant; Type: TRIGGER; Schema: application_administration; Owner: -
--

CREATE TRIGGER _300_tenant BEFORE INSERT ON application_administration.idp_configuration FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant();


--
-- Name: user_token _100_timestamps; Type: TRIGGER; Schema: auth_endpoint; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON auth_endpoint.user_token FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: user_token _200_tenant_app_auth; Type: TRIGGER; Schema: auth_endpoint; Owner: -
--

CREATE TRIGGER _200_tenant_app_auth BEFORE INSERT OR DELETE OR UPDATE ON auth_endpoint.user_token FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__tenant_application();


--
-- Name: tenant _100_timestamps; Type: TRIGGER; Schema: tenant_administration; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON tenant_administration.tenant FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: tenant_admin _100_timestamps; Type: TRIGGER; Schema: tenant_administration; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON tenant_administration.tenant_admin FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__timestamps();


--
-- Name: tenant _200_usernames; Type: TRIGGER; Schema: tenant_administration; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON tenant_administration.tenant FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: tenant_admin _200_usernames; Type: TRIGGER; Schema: tenant_administration; Owner: -
--

CREATE TRIGGER _200_usernames BEFORE INSERT OR UPDATE ON tenant_administration.tenant_admin FOR EACH ROW EXECUTE FUNCTION app_hidden.tg__usernames();


--
-- Name: permission permission_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.permission
    ADD CONSTRAINT permission_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: service_account_permission service_account_permission_permission_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.service_account_permission
    ADD CONSTRAINT service_account_permission_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES access_management.permission(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: service_account_permission service_account_permission_service_account_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.service_account_permission
    ADD CONSTRAINT service_account_permission_service_account_id_fkey FOREIGN KEY (service_account_id) REFERENCES access_management.service_account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: service_account_permission service_account_permission_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.service_account_permission
    ADD CONSTRAINT service_account_permission_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: service_account service_account_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.service_account
    ADD CONSTRAINT service_account_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tag tag_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.tag
    ADD CONSTRAINT tag_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_assignment user_role_assignment_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_assignment
    ADD CONSTRAINT user_role_assignment_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_assignment user_role_assignment_user_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_assignment
    ADD CONSTRAINT user_role_assignment_user_id_fkey FOREIGN KEY (user_id) REFERENCES access_management."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_assignment user_role_assignment_user_role_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_assignment
    ADD CONSTRAINT user_role_assignment_user_role_id_fkey FOREIGN KEY (user_role_id) REFERENCES access_management.user_role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_parent user_role_parent_parent_user_role_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_parent
    ADD CONSTRAINT user_role_parent_parent_user_role_id_fkey FOREIGN KEY (parent_user_role_id) REFERENCES access_management.user_role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_parent user_role_parent_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_parent
    ADD CONSTRAINT user_role_parent_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_parent user_role_parent_user_role_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_parent
    ADD CONSTRAINT user_role_parent_user_role_id_fkey FOREIGN KEY (user_role_id) REFERENCES access_management.user_role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_permission user_role_permission_permission_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_permission
    ADD CONSTRAINT user_role_permission_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES access_management.permission(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_permission user_role_permission_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_permission
    ADD CONSTRAINT user_role_permission_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_permission user_role_permission_user_role_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_permission
    ADD CONSTRAINT user_role_permission_user_role_id_fkey FOREIGN KEY (user_role_id) REFERENCES access_management.user_role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_tag user_role_tag_tag_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_tag
    ADD CONSTRAINT user_role_tag_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES access_management.tag(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_tag user_role_tag_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_tag
    ADD CONSTRAINT user_role_tag_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role_tag user_role_tag_user_role_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role_tag
    ADD CONSTRAINT user_role_tag_user_role_id_fkey FOREIGN KEY (user_role_id) REFERENCES access_management.user_role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role user_role_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management.user_role
    ADD CONSTRAINT user_role_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user user_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: access_management; Owner: -
--

ALTER TABLE ONLY access_management."user"
    ADD CONSTRAINT user_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application application_tenant_id_fkey; Type: FK CONSTRAINT; Schema: application_administration; Owner: -
--

ALTER TABLE ONLY application_administration.application
    ADD CONSTRAINT application_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenant_administration.tenant(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: idp_configuration idp_configuration_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: application_administration; Owner: -
--

ALTER TABLE ONLY application_administration.idp_configuration
    ADD CONSTRAINT idp_configuration_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_token user_token_tenant_id_application_id_fkey; Type: FK CONSTRAINT; Schema: auth_endpoint; Owner: -
--

ALTER TABLE ONLY auth_endpoint.user_token
    ADD CONSTRAINT user_token_tenant_id_application_id_fkey FOREIGN KEY (tenant_id, application_id) REFERENCES application_administration.application(tenant_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_token user_token_tenant_id_application_id_idp_id_fkey; Type: FK CONSTRAINT; Schema: auth_endpoint; Owner: -
--

ALTER TABLE ONLY auth_endpoint.user_token
    ADD CONSTRAINT user_token_tenant_id_application_id_idp_id_fkey FOREIGN KEY (tenant_id, application_id, idp_id) REFERENCES application_administration.idp_configuration(tenant_id, application_id, idp_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_token user_token_tenant_id_application_id_user_id_fkey; Type: FK CONSTRAINT; Schema: auth_endpoint; Owner: -
--

ALTER TABLE ONLY auth_endpoint.user_token
    ADD CONSTRAINT user_token_tenant_id_application_id_user_id_fkey FOREIGN KEY (tenant_id, application_id, user_id) REFERENCES access_management."user"(tenant_id, application_id, id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tenant_admin tenant_admin_tenant_id_fkey; Type: FK CONSTRAINT; Schema: tenant_administration; Owner: -
--

ALTER TABLE ONLY tenant_administration.tenant_admin
    ADD CONSTRAINT tenant_admin_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenant_administration.tenant(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: permission; Type: ROW SECURITY; Schema: access_management; Owner: -
--

ALTER TABLE access_management.permission ENABLE ROW LEVEL SECURITY;

--
-- Name: permission permission_managed_service_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY permission_managed_service_policy ON access_management.permission FOR SELECT USING ((from_managed_service = true));


--
-- Name: permission permission_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY permission_policy ON access_management.permission USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: service_account; Type: ROW SECURITY; Schema: access_management; Owner: -
--

ALTER TABLE access_management.service_account ENABLE ROW LEVEL SECURITY;

--
-- Name: service_account_permission; Type: ROW SECURITY; Schema: access_management; Owner: -
--

ALTER TABLE access_management.service_account_permission ENABLE ROW LEVEL SECURITY;

--
-- Name: service_account_permission service_account_permission_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY service_account_permission_policy ON access_management.service_account_permission USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: service_account service_account_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY service_account_policy ON access_management.service_account USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: tag; Type: ROW SECURITY; Schema: access_management; Owner: -
--

ALTER TABLE access_management.tag ENABLE ROW LEVEL SECURITY;

--
-- Name: tag tag_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY tag_policy ON access_management.tag USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: user; Type: ROW SECURITY; Schema: access_management; Owner: -
--

ALTER TABLE access_management."user" ENABLE ROW LEVEL SECURITY;

--
-- Name: user user_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY user_policy ON access_management."user" USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: user_role; Type: ROW SECURITY; Schema: access_management; Owner: -
--

ALTER TABLE access_management.user_role ENABLE ROW LEVEL SECURITY;

--
-- Name: user_role_assignment; Type: ROW SECURITY; Schema: access_management; Owner: -
--

ALTER TABLE access_management.user_role_assignment ENABLE ROW LEVEL SECURITY;

--
-- Name: user_role_assignment user_role_assignment_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY user_role_assignment_policy ON access_management.user_role_assignment USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: user_role_parent; Type: ROW SECURITY; Schema: access_management; Owner: -
--

ALTER TABLE access_management.user_role_parent ENABLE ROW LEVEL SECURITY;

--
-- Name: user_role_parent user_role_parent_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY user_role_parent_policy ON access_management.user_role_parent USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: user_role_permission; Type: ROW SECURITY; Schema: access_management; Owner: -
--

ALTER TABLE access_management.user_role_permission ENABLE ROW LEVEL SECURITY;

--
-- Name: user_role_permission user_role_permission_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY user_role_permission_policy ON access_management.user_role_permission USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: user_role user_role_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY user_role_policy ON access_management.user_role USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: user_role_tag; Type: ROW SECURITY; Schema: access_management; Owner: -
--

ALTER TABLE access_management.user_role_tag ENABLE ROW LEVEL SECURITY;

--
-- Name: user_role_tag user_role_tag_policy; Type: POLICY; Schema: access_management; Owner: -
--

CREATE POLICY user_role_tag_policy ON access_management.user_role_tag USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: application; Type: ROW SECURITY; Schema: application_administration; Owner: -
--

ALTER TABLE application_administration.application ENABLE ROW LEVEL SECURITY;

--
-- Name: application application_policy; Type: POLICY; Schema: application_administration; Owner: -
--

CREATE POLICY application_policy ON application_administration.application USING ((tenant_id = app_hidden.current_tenant_id())) WITH CHECK ((tenant_id = app_hidden.current_tenant_id()));


--
-- Name: idp_configuration; Type: ROW SECURITY; Schema: application_administration; Owner: -
--

ALTER TABLE application_administration.idp_configuration ENABLE ROW LEVEL SECURITY;

--
-- Name: idp_configuration idp_configuration_policy; Type: POLICY; Schema: application_administration; Owner: -
--

CREATE POLICY idp_configuration_policy ON application_administration.idp_configuration USING ((tenant_id = app_hidden.current_tenant_id())) WITH CHECK ((tenant_id = app_hidden.current_tenant_id()));


--
-- Name: user_token; Type: ROW SECURITY; Schema: auth_endpoint; Owner: -
--

ALTER TABLE auth_endpoint.user_token ENABLE ROW LEVEL SECURITY;

--
-- Name: user_token user_token_policy; Type: POLICY; Schema: auth_endpoint; Owner: -
--

CREATE POLICY user_token_policy ON auth_endpoint.user_token USING (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id()))) WITH CHECK (((tenant_id = app_hidden.current_tenant_id()) AND (application_id = app_hidden.current_application_id())));


--
-- Name: tenant; Type: ROW SECURITY; Schema: tenant_administration; Owner: -
--

ALTER TABLE tenant_administration.tenant ENABLE ROW LEVEL SECURITY;

--
-- Name: tenant tenant_root_policy; Type: POLICY; Schema: tenant_administration; Owner: -
--

CREATE POLICY tenant_root_policy ON tenant_administration.tenant USING ((is_root = false)) WITH CHECK ((is_root = false));


--
-- Name: SCHEMA access_management; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA access_management TO postgraphile_web_user;


--
-- Name: SCHEMA app_hidden; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA app_hidden TO postgraphile_web_user;


--
-- Name: SCHEMA application_administration; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA application_administration TO postgraphile_web_user;


--
-- Name: SCHEMA auth_endpoint; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA auth_endpoint TO postgraphile_web_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO ids_owner;
GRANT USAGE ON SCHEMA public TO postgraphile_web_user;


--
-- Name: SCHEMA tenant_administration; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA tenant_administration TO postgraphile_web_user;


--
-- Name: FUNCTION constraint_email_format(email_ text, property_name_ text, error_message_ text, error_code_ text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.constraint_email_format(email_ text, property_name_ text, error_message_ text, error_code_ text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.constraint_email_format(email_ text, property_name_ text, error_message_ text, error_code_ text) TO postgraphile_web_user;


--
-- Name: FUNCTION constraint_max_length(input_value_ text, property_name_ text, max_length_ integer, error_message_ text, error_code_ text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.constraint_max_length(input_value_ text, property_name_ text, max_length_ integer, error_message_ text, error_code_ text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.constraint_max_length(input_value_ text, property_name_ text, max_length_ integer, error_message_ text, error_code_ text) TO postgraphile_web_user;


--
-- Name: FUNCTION constraint_min_length(input_value_ text, property_name_ text, min_length_ integer, error_message_ text, error_code_ text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.constraint_min_length(input_value_ text, property_name_ text, min_length_ integer, error_message_ text, error_code_ text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.constraint_min_length(input_value_ text, property_name_ text, min_length_ integer, error_message_ text, error_code_ text) TO postgraphile_web_user;


--
-- Name: FUNCTION constraint_not_empty(input_value_ text, property_name_ text, error_message_ text, error_code_ text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.constraint_not_empty(input_value_ text, property_name_ text, error_message_ text, error_code_ text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.constraint_not_empty(input_value_ text, property_name_ text, error_message_ text, error_code_ text) TO postgraphile_web_user;


--
-- Name: FUNCTION current_application_id(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.current_application_id() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.current_application_id() TO postgraphile_web_user;


--
-- Name: FUNCTION current_tenant_id(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.current_tenant_id() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.current_tenant_id() TO postgraphile_web_user;


--
-- Name: FUNCTION format_error(input_value_ text, pattern_regex_ text, error_message_ text, error_code_ text, value1_ text, value2_ text, value3_ text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.format_error(input_value_ text, pattern_regex_ text, error_message_ text, error_code_ text, value1_ text, value2_ text, value3_ text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.format_error(input_value_ text, pattern_regex_ text, error_message_ text, error_code_ text, value1_ text, value2_ text, value3_ text) TO postgraphile_web_user;


--
-- Name: FUNCTION get_tenant_id_by_application_id(application_id_ uuid); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.get_tenant_id_by_application_id(application_id_ uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.get_tenant_id_by_application_id(application_id_ uuid) TO postgraphile_web_user;


--
-- Name: FUNCTION raise_error(error_message_ text, error_code_ text, value1_ text, value2_ text, value3_ text); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.raise_error(error_message_ text, error_code_ text, value1_ text, value2_ text, value3_ text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.raise_error(error_message_ text, error_code_ text, value1_ text, value2_ text, value3_ text) TO postgraphile_web_user;


--
-- Name: FUNCTION tg__tenant(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg__tenant() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg__tenant() TO postgraphile_web_user;


--
-- Name: FUNCTION tg__tenant_application(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg__tenant_application() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg__tenant_application() TO postgraphile_web_user;


--
-- Name: FUNCTION tg__timestamps(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg__timestamps() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg__timestamps() TO postgraphile_web_user;


--
-- Name: FUNCTION tg__usernames(); Type: ACL; Schema: app_hidden; Owner: -
--

REVOKE ALL ON FUNCTION app_hidden.tg__usernames() FROM PUBLIC;
GRANT ALL ON FUNCTION app_hidden.tg__usernames() TO postgraphile_web_user;


--
-- Name: FUNCTION enable_tenant_application_rls_on_table(schema_name_ text, table_name_ text); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.enable_tenant_application_rls_on_table(schema_name_ text, table_name_ text) FROM PUBLIC;


--
-- Name: FUNCTION enable_tenant_rls_on_table(schema_name_ text, table_name_ text); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.enable_tenant_rls_on_table(schema_name_ text, table_name_ text) FROM PUBLIC;


--
-- Name: TABLE permission; Type: ACL; Schema: access_management; Owner: -
--

GRANT SELECT,DELETE ON TABLE access_management.permission TO postgraphile_web_user;


--
-- Name: COLUMN permission.service_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(service_id) ON TABLE access_management.permission TO postgraphile_web_user;


--
-- Name: COLUMN permission.name; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(name) ON TABLE access_management.permission TO postgraphile_web_user;


--
-- Name: COLUMN permission.from_managed_service; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(from_managed_service) ON TABLE access_management.permission TO postgraphile_web_user;


--
-- Name: TABLE service_account; Type: ACL; Schema: access_management; Owner: -
--

GRANT SELECT,DELETE ON TABLE access_management.service_account TO postgraphile_web_user;


--
-- Name: COLUMN service_account.name; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE access_management.service_account TO postgraphile_web_user;


--
-- Name: COLUMN service_account.client_secret; Type: ACL; Schema: access_management; Owner: -
--

GRANT UPDATE(client_secret) ON TABLE access_management.service_account TO postgraphile_web_user;


--
-- Name: TABLE service_account_permission; Type: ACL; Schema: access_management; Owner: -
--

GRANT SELECT,DELETE ON TABLE access_management.service_account_permission TO postgraphile_web_user;


--
-- Name: COLUMN service_account_permission.service_account_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(service_account_id) ON TABLE access_management.service_account_permission TO postgraphile_web_user;


--
-- Name: COLUMN service_account_permission.permission_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(permission_id) ON TABLE access_management.service_account_permission TO postgraphile_web_user;


--
-- Name: TABLE tag; Type: ACL; Schema: access_management; Owner: -
--

GRANT SELECT,DELETE ON TABLE access_management.tag TO postgraphile_web_user;


--
-- Name: COLUMN tag.name; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE access_management.tag TO postgraphile_web_user;


--
-- Name: COLUMN tag.description; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE access_management.tag TO postgraphile_web_user;


--
-- Name: TABLE "user"; Type: ACL; Schema: access_management; Owner: -
--

GRANT SELECT,DELETE ON TABLE access_management."user" TO postgraphile_web_user;


--
-- Name: COLUMN "user".name; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE access_management."user" TO postgraphile_web_user;


--
-- Name: COLUMN "user".profile_picture_url; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(profile_picture_url),UPDATE(profile_picture_url) ON TABLE access_management."user" TO postgraphile_web_user;


--
-- Name: COLUMN "user".email; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(email) ON TABLE access_management."user" TO postgraphile_web_user;


--
-- Name: COLUMN "user".status; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(status),UPDATE(status) ON TABLE access_management."user" TO postgraphile_web_user;


--
-- Name: TABLE user_role; Type: ACL; Schema: access_management; Owner: -
--

GRANT SELECT,DELETE ON TABLE access_management.user_role TO postgraphile_web_user;


--
-- Name: COLUMN user_role.name; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE access_management.user_role TO postgraphile_web_user;


--
-- Name: COLUMN user_role.description; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE access_management.user_role TO postgraphile_web_user;


--
-- Name: TABLE user_role_assignment; Type: ACL; Schema: access_management; Owner: -
--

GRANT SELECT,DELETE ON TABLE access_management.user_role_assignment TO postgraphile_web_user;


--
-- Name: COLUMN user_role_assignment.user_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(user_id) ON TABLE access_management.user_role_assignment TO postgraphile_web_user;


--
-- Name: COLUMN user_role_assignment.user_role_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(user_role_id) ON TABLE access_management.user_role_assignment TO postgraphile_web_user;


--
-- Name: TABLE user_role_parent; Type: ACL; Schema: access_management; Owner: -
--

GRANT SELECT,DELETE ON TABLE access_management.user_role_parent TO postgraphile_web_user;


--
-- Name: COLUMN user_role_parent.user_role_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(user_role_id) ON TABLE access_management.user_role_parent TO postgraphile_web_user;


--
-- Name: COLUMN user_role_parent.parent_user_role_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(parent_user_role_id) ON TABLE access_management.user_role_parent TO postgraphile_web_user;


--
-- Name: TABLE user_role_permission; Type: ACL; Schema: access_management; Owner: -
--

GRANT SELECT,DELETE ON TABLE access_management.user_role_permission TO postgraphile_web_user;


--
-- Name: COLUMN user_role_permission.user_role_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(user_role_id) ON TABLE access_management.user_role_permission TO postgraphile_web_user;


--
-- Name: COLUMN user_role_permission.permission_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(permission_id) ON TABLE access_management.user_role_permission TO postgraphile_web_user;


--
-- Name: TABLE user_role_tag; Type: ACL; Schema: access_management; Owner: -
--

GRANT SELECT,DELETE ON TABLE access_management.user_role_tag TO postgraphile_web_user;


--
-- Name: COLUMN user_role_tag.user_role_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(user_role_id) ON TABLE access_management.user_role_tag TO postgraphile_web_user;


--
-- Name: COLUMN user_role_tag.tag_id; Type: ACL; Schema: access_management; Owner: -
--

GRANT INSERT(tag_id) ON TABLE access_management.user_role_tag TO postgraphile_web_user;


--
-- Name: TABLE application; Type: ACL; Schema: application_administration; Owner: -
--

GRANT SELECT,DELETE ON TABLE application_administration.application TO postgraphile_web_user;


--
-- Name: COLUMN application.name; Type: ACL; Schema: application_administration; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE application_administration.application TO postgraphile_web_user;


--
-- Name: COLUMN application.allowed_origins; Type: ACL; Schema: application_administration; Owner: -
--

GRANT INSERT(allowed_origins),UPDATE(allowed_origins) ON TABLE application_administration.application TO postgraphile_web_user;


--
-- Name: COLUMN application.interim_administrator_email; Type: ACL; Schema: application_administration; Owner: -
--

GRANT INSERT(interim_administrator_email),UPDATE(interim_administrator_email) ON TABLE application_administration.application TO postgraphile_web_user;


--
-- Name: COLUMN application.enabled; Type: ACL; Schema: application_administration; Owner: -
--

GRANT UPDATE(enabled) ON TABLE application_administration.application TO postgraphile_web_user;


--
-- Name: TABLE idp_configuration; Type: ACL; Schema: application_administration; Owner: -
--

GRANT SELECT,DELETE ON TABLE application_administration.idp_configuration TO postgraphile_web_user;


--
-- Name: COLUMN idp_configuration.idp_id; Type: ACL; Schema: application_administration; Owner: -
--

GRANT INSERT(idp_id) ON TABLE application_administration.idp_configuration TO postgraphile_web_user;


--
-- Name: COLUMN idp_configuration.discovery_document_url; Type: ACL; Schema: application_administration; Owner: -
--

GRANT INSERT(discovery_document_url),UPDATE(discovery_document_url) ON TABLE application_administration.idp_configuration TO postgraphile_web_user;


--
-- Name: COLUMN idp_configuration.client_id; Type: ACL; Schema: application_administration; Owner: -
--

GRANT INSERT(client_id),UPDATE(client_id) ON TABLE application_administration.idp_configuration TO postgraphile_web_user;


--
-- Name: COLUMN idp_configuration.client_secret; Type: ACL; Schema: application_administration; Owner: -
--

GRANT INSERT(client_secret),UPDATE(client_secret) ON TABLE application_administration.idp_configuration TO postgraphile_web_user;


--
-- Name: COLUMN idp_configuration.scopes; Type: ACL; Schema: application_administration; Owner: -
--

GRANT INSERT(scopes),UPDATE(scopes) ON TABLE application_administration.idp_configuration TO postgraphile_web_user;


--
-- Name: COLUMN idp_configuration.enabled; Type: ACL; Schema: application_administration; Owner: -
--

GRANT UPDATE(enabled) ON TABLE application_administration.idp_configuration TO postgraphile_web_user;


--
-- Name: COLUMN idp_configuration.application_id; Type: ACL; Schema: application_administration; Owner: -
--

GRANT INSERT(application_id) ON TABLE application_administration.idp_configuration TO postgraphile_web_user;


--
-- Name: TABLE idp_scope; Type: ACL; Schema: application_administration; Owner: -
--

GRANT SELECT ON TABLE application_administration.idp_scope TO postgraphile_web_user;


--
-- Name: TABLE user_token; Type: ACL; Schema: auth_endpoint; Owner: -
--

GRANT ALL ON TABLE auth_endpoint.user_token TO postgraphile_web_user;


--
-- Name: TABLE tenant; Type: ACL; Schema: tenant_administration; Owner: -
--

GRANT SELECT,DELETE ON TABLE tenant_administration.tenant TO postgraphile_web_user;


--
-- Name: COLUMN tenant.name; Type: ACL; Schema: tenant_administration; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE tenant_administration.tenant TO postgraphile_web_user;


--
-- Name: COLUMN tenant.status; Type: ACL; Schema: tenant_administration; Owner: -
--

GRANT UPDATE(status) ON TABLE tenant_administration.tenant TO postgraphile_web_user;


--
-- Name: TABLE tenant_admin; Type: ACL; Schema: tenant_administration; Owner: -
--

GRANT SELECT,DELETE ON TABLE tenant_administration.tenant_admin TO postgraphile_web_user;


--
-- Name: COLUMN tenant_admin.name; Type: ACL; Schema: tenant_administration; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE tenant_administration.tenant_admin TO postgraphile_web_user;


--
-- Name: COLUMN tenant_admin.email; Type: ACL; Schema: tenant_administration; Owner: -
--

GRANT INSERT(email),UPDATE(email) ON TABLE tenant_administration.tenant_admin TO postgraphile_web_user;


--
-- Name: COLUMN tenant_admin.password_hash; Type: ACL; Schema: tenant_administration; Owner: -
--

GRANT INSERT(password_hash),UPDATE(password_hash) ON TABLE tenant_administration.tenant_admin TO postgraphile_web_user;


--
-- Name: COLUMN tenant_admin.active; Type: ACL; Schema: tenant_administration; Owner: -
--

GRANT UPDATE(active) ON TABLE tenant_administration.tenant_admin TO postgraphile_web_user;


--
-- Name: COLUMN tenant_admin.password_changed; Type: ACL; Schema: tenant_administration; Owner: -
--

GRANT UPDATE(password_changed) ON TABLE tenant_administration.tenant_admin TO postgraphile_web_user;


--
-- Name: COLUMN tenant_admin.tenant_id; Type: ACL; Schema: tenant_administration; Owner: -
--

GRANT INSERT(tenant_id) ON TABLE tenant_administration.tenant_admin TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: access_management; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA access_management REVOKE ALL ON SEQUENCES  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA access_management GRANT SELECT,USAGE ON SEQUENCES  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: access_management; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA access_management REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA access_management REVOKE ALL ON FUNCTIONS  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA access_management GRANT ALL ON FUNCTIONS  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app_hidden; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA app_hidden REVOKE ALL ON SEQUENCES  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA app_hidden GRANT SELECT,USAGE ON SEQUENCES  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: app_hidden; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA app_hidden REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA app_hidden REVOKE ALL ON FUNCTIONS  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA app_hidden GRANT ALL ON FUNCTIONS  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: application_administration; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA application_administration REVOKE ALL ON SEQUENCES  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA application_administration GRANT SELECT,USAGE ON SEQUENCES  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: application_administration; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA application_administration REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA application_administration REVOKE ALL ON FUNCTIONS  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA application_administration GRANT ALL ON FUNCTIONS  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth_endpoint; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA auth_endpoint REVOKE ALL ON SEQUENCES  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA auth_endpoint GRANT SELECT,USAGE ON SEQUENCES  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth_endpoint; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA auth_endpoint REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA auth_endpoint REVOKE ALL ON FUNCTIONS  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA auth_endpoint GRANT ALL ON FUNCTIONS  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA public REVOKE ALL ON SEQUENCES  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA public GRANT SELECT,USAGE ON SEQUENCES  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: tenant_administration; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA tenant_administration REVOKE ALL ON SEQUENCES  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA tenant_administration GRANT SELECT,USAGE ON SEQUENCES  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: tenant_administration; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA tenant_administration REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA tenant_administration REVOKE ALL ON FUNCTIONS  FROM ids_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner IN SCHEMA tenant_administration GRANT ALL ON FUNCTIONS  TO postgraphile_web_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE ids_owner REVOKE ALL ON FUNCTIONS  FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

