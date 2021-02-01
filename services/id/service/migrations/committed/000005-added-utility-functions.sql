--! Previous: sha1:e38e655accc6427930bed2df1c04ab9ea6ff4f55
--! Hash: sha1:ed171b385fbb4fb0e4dcbaee2b7f04c6069e941a
--! Message: added-utility-functions

-- Utility Functions - BEGIN
CREATE OR REPLACE FUNCTION app_hidden.raise_error(
  error_message_ TEXT,
  error_code_ TEXT,
  value1_ TEXT DEFAULT '$1',
  value2_ TEXT DEFAULT '$2',
  value3_ TEXT DEFAULT '$3'
) RETURNS VOID AS $$
DECLARE
  error_text_ TEXT;
BEGIN
  error_text_ = replace(replace(replace(error_message_, '$1', value1_), '$2', value2_), '$3', value3_);
  RAISE EXCEPTION '%', error_text_ using ERRCODE = error_code_;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION app_hidden.format_error(
  input_value_ TEXT,
  pattern_regex_ TEXT,
  error_message_ TEXT,
  error_code_ TEXT DEFAULT 'PATRN',
  value1_ TEXT DEFAULT '$1',
  value2_ TEXT DEFAULT '$2',
  value3_ TEXT DEFAULT '$3'
) RETURNS BOOLEAN AS $$
BEGIN
  IF input_value_ !~* pattern_regex_ THEN
    perform app_hidden.raise_error(error_message_, error_code_, value1_, value2_, value3_);
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
-- Utility Functions - END
