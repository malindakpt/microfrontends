-- trigger function to set timestamps
CREATE OR REPLACE FUNCTION app_hidden.tg__timestamps() RETURNS trigger AS $$
BEGIN
  NEW.created_date = (CASE WHEN TG_OP = 'INSERT' THEN (now() at time zone 'utc') ELSE OLD.created_date END);
  NEW.updated_date = (CASE WHEN TG_OP = 'UPDATE' AND OLD.updated_date  >= (now() at time zone 'utc') THEN OLD.updated_date  + interval '1 millisecond' ELSE (now() at time zone 'utc') END);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql volatile SET search_path TO pg_catalog, public, pg_temp;
COMMENT ON FUNCTION app_hidden.tg__timestamps() IS
  E'This trigger should be called on all tables with created_date , updated_date  - it ensures that they cannot be manipulated and that updated_date  will always be larger than the previous updated_date .';

-- trigger function to set created_user/updated_user from settings
-- ax.claims.username is added by PostGraphile to the pool context. If a pool
-- is manually created the settings must be supplied as well.
CREATE OR REPLACE FUNCTION app_hidden.tg__username() RETURNS trigger AS $$
BEGIN
  NEW.created_user = (CASE WHEN TG_OP = 'INSERT' THEN pg_catalog.current_setting('ax.claims.username', true) ELSE OLD.created_user END);
  NEW.updated_user = (CASE WHEN TG_OP = 'UPDATE' OR TG_OP = 'INSERT' THEN pg_catalog.current_setting('ax.claims.username', true) ELSE OLD.updated_user END);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql volatile SET search_path TO pg_catalog, public, pg_temp;

