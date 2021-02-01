CREATE OR REPLACE FUNCTION app_hidden.raise_error(
  error_message text,
  -- error code must be exact 5 characters long (letters or numbers)
  error_code text,
  VARIADIC placeholder_values text[] DEFAULT '{}'
) RETURNS void
  LANGUAGE plpgsql
  AS $$
BEGIN
  RAISE EXCEPTION '%', format(error_message, VARIADIC placeholder_values) using errcode = error_code;
END;
$$;