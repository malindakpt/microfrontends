--! Previous: sha1:955ab682aa2c28ca6bf078cf780603419c0c9e78
--! Hash: sha1:b1b2eb828276727f2128662fe5e6b3c737918289
--! Message: added-constraint-check-functions

-- Validation constraint functions - BEGIN
CREATE OR REPLACE FUNCTION app_hidden.constraint_min_length(
  input_value_ TEXT,
  property_name_ TEXT,
  min_length_ INTEGER,
  error_message_ TEXT DEFAULT '"$1" must be at least $2 character(s) long.',
  error_code_ TEXT DEFAULT 'MNLEN'
) RETURNS BOOLEAN AS $$
BEGIN
  IF length(input_value_) < min_length_ THEN
  	perform app_hidden.raise_error(error_message_, error_code_, property_name_, min_length_::TEXT);
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION app_hidden.constraint_max_length(
  input_value_ TEXT,
  property_name_ TEXT,
  max_length_ INTEGER,
  error_message_ TEXT DEFAULT '"$1" can only be $2 character(s) long.',
  error_code_ TEXT DEFAULT 'MXLEN'
) RETURNS BOOLEAN AS $$
BEGIN
  IF length(input_value_) > max_length_ THEN
    perform app_hidden.raise_error(error_message_, error_code_, property_name_, max_length_::TEXT);
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION app_hidden.constraint_not_empty(
  input_value_ TEXT,
  property_name_ TEXT,
  error_message_ TEXT DEFAULT '"$1" cannot be whitespace or empty.',
  error_code_ TEXT DEFAULT 'EMPTY'
) RETURNS BOOLEAN AS $$
BEGIN
  IF trim(input_value_) = '' THEN
  	perform app_hidden.raise_error(error_message_, error_code_, property_name_, input_value_);
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION app_hidden.constraint_email_format(
  email_ TEXT,
  property_name_ TEXT,
  error_message_ TEXT DEFAULT '"$1" is not in a valid format.',
  error_code_ TEXT DEFAULT 'PATRN'
) RETURNS BOOLEAN AS $$
DECLARE
  email_regex_ TEXT := '^[^\s@]+@[^\s@]+\.[^\s@]+$';
BEGIN
  RETURN app_hidden.format_error(email_, email_regex_, error_message_, error_code_, property_name_, email_);
END;
$$ LANGUAGE plpgsql;
-- Validation constraint functions - END
