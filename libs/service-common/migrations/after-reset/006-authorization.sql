-- Function to check if a user has one of the given settings in a local variable 
-- example: user_has_setting('update,admin', 'ax.claims.permissions')
create or replace function app_hidden.user_has_setting(required_settings text, local_variable_field text) returns boolean
	LANGUAGE plpgsql	
	as $$
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


-- Function to check if a user has one of the permissions that allow to 
-- SELECT, INSERT, UPDATE and DELETE on the table via policy 
-- e.g. user_has_permission('video_editor,admin') would allow a user rights on
-- that table if he has either the permission 'video_editor' or 'admin'
create or replace function app_hidden.user_has_permission(required_permissions text) returns boolean
	LANGUAGE plpgsql	
	as $$
BEGIN
   return app_hidden.user_has_setting(required_permissions, 'ax.claims.permissions');
END;
$$;

-- Function to check if a user has one of the tags that allow to 
-- SELECT, INSERT, UPDATE and DELETE on the table via policy 
-- e.g. user_has_tag('superadmin,debug') would allow a user rights on
-- that table if he has either the tag 'superadmin' or 'debug'
create or replace function app_hidden.user_has_tag(required_permissions text) returns boolean
	LANGUAGE plpgsql	
	as $$
BEGIN
   return app_hidden.user_has_setting(required_permissions, 'ax.claims.tags');
END;
$$;

-- Function to check if a user has a specific permission. If he has such a
-- permission he also needs a tag that is part of a specific database column.
-- e.g. user_has_permission_and_tag('country_reader', country) would allow a
-- user with permission 'country_reader' to use a row when the field 'country'
-- contains a value that is part of the users 'ax.claims.tags' - e.g. "us"/"uk".
create or replace function app_hidden.user_has_permission_and_tag(required_permissions text, fieldValue text) returns boolean
	LANGUAGE plpgsql	
	as $$
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
