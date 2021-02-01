CREATE OR REPLACE FUNCTION app_hidden.constraint_max_length(
  input_value text,
  max_length integer,
  error_message text default 'The value "%s" is too long. It must be maximum %s characters long.',
  error_code text default 'MXLEN'
) RETURNS boolean
  LANGUAGE plpgsql
  AS $$
BEGIN
  IF length(input_value) > max_length THEN
      perform app_hidden.raise_error(error_message, error_code, input_value, max_length::text);
  END IF;
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION app_hidden.constraint_min_length(
  input_value text,
  min_length integer,
  error_message text default 'The value "%s" is not long enough. It must be at least %s characters long.',
  error_code text default 'MNLEN'
) RETURNS boolean
  LANGUAGE plpgsql
  AS $$
BEGIN
  IF length(input_value) < min_length THEN
  	perform app_hidden.raise_error(error_message, error_code, input_value, min_length::text);
  END IF;
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION app_hidden.constraint_not_empty(
  input_value text,
  error_message text default 'Property must not start or end with whitespace value and must not be an empty or whitespace value.',
  error_code text default 'EMPTY'
) RETURNS boolean
  LANGUAGE plpgsql
  AS $$
begin
  if app_hidden.validation_not_empty(input_value) then
    return true;
  end if;
  perform app_hidden.raise_error(error_message, error_code);
end;
$$;

CREATE OR REPLACE FUNCTION app_hidden.validation_not_empty(
  input_value text
) RETURNS boolean
  LANGUAGE plpgsql
  AS $$
begin
  if input_value IS NULL OR input_value = '' OR input_value !~* '^(?!.*^[\s])(?!.*[\s]$).*$' then
  	return false;
  end if;
  return true;
end;
$$;

CREATE OR REPLACE FUNCTION app_hidden.validation_is_base64(
  input_value text
) RETURNS boolean
  LANGUAGE plpgsql
  AS $$
begin
  if input_value !~* '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$' then
  	return false;
  end if;
  return true;
end;
$$;

CREATE OR REPLACE FUNCTION app_hidden.validation_is_url(
  input_value text
) RETURNS boolean
  LANGUAGE plpgsql
  AS $$
begin
  if input_value !~* 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,9}\y([-a-zA-Z0-9@:%_\+.~#?&//=]*)$' then
  	return false;
  end if;
  return true;
end;
$$;

CREATE OR REPLACE FUNCTION app_hidden.validation_starts_with(
  input_value text,
  prefix_value text
) RETURNS boolean
  LANGUAGE plpgsql
  AS $$
begin
  if input_value like prefix_value || '%' then
  	return true;
  end if;
  return false;
end;
$$;
