--! Previous: -
--! Hash: sha1:18004c20ae0730bae5a8899253ed16acc5430b8f
--! Message: initial-schema

-- NAVIGATION:
-- section headings: https://textfancy.com/multiline-text-art/ style "Meh"
-- search for this to jump to the corresponding sections:
-- * #general
-- * #setting
-- * #movie
-- * #tvshow
-- * #season
-- * #episode
-- * #collection

-------------- #general ---------------
--                                   _
--  __ _  ___  _ _   ___  _ _  __ _ | |
-- / _` |/ -_)| ' \ / -_)| '_|/ _` || |
-- \__. |\___||_||_|\___||_|  \__/_||_|
-- |___/
---------------------------------------

-- it is important that the DB is based on UTC for date and time data types
ALTER DATABASE :DB_NAME SET timezone TO 'UTC';

-- NOTE: enum values must all be UPPER CASE!

-- type: publish_status
DROP TYPE IF EXISTS app_public.publish_status CASCADE;
CREATE TYPE app_public.publish_status AS enum (
  'NOT_PUBLISHED',
  'PUBLISH_PROGRESS',
  'PUBLISHED',
  'PUBLISH_ERROR',
  'CHANGED'
);
SELECT app_hidden.expose_enum_endpoint('publish_status', 'app_public');

-- type: movie_image_type
DROP TYPE IF EXISTS app_public.movie_image_type CASCADE;
CREATE TYPE app_public.movie_image_type AS enum (
  'COVER',
  'TEASER'
);
SELECT app_hidden.expose_enum_endpoint('movie_image_type', 'app_public');

-- type: tvshow_image_type
DROP TYPE IF EXISTS app_public.tvshow_image_type CASCADE;
CREATE TYPE app_public.tvshow_image_type AS enum (
  'COVER',
  'TEASER'
);
SELECT app_hidden.expose_enum_endpoint('tvshow_image_type', 'app_public');

-- type: season_image_type
DROP TYPE IF EXISTS app_public.season_image_type CASCADE;
CREATE TYPE app_public.season_image_type AS enum (
  'COVER',
  'TEASER'
);
SELECT app_hidden.expose_enum_endpoint('season_image_type', 'app_public');

-- type: episode_image_type
DROP TYPE IF EXISTS app_public.episode_image_type CASCADE;
CREATE TYPE app_public.episode_image_type AS enum (
  'COVER',
  'TEASER'
);
SELECT app_hidden.expose_enum_endpoint('episode_image_type', 'app_public');

-- type: collection_image_type
DROP TYPE IF EXISTS app_public.collection_image_type CASCADE;
CREATE TYPE app_public.collection_image_type AS enum (
  'COVER',
  'TEASER'
);
SELECT app_hidden.expose_enum_endpoint('collection_image_type', 'app_public');

-- type: collection_type
DROP TYPE IF EXISTS app_public.collection_type CASCADE;
CREATE TYPE app_public.collection_type AS enum (
  'MANUAL',
  'AUTOMATIC'
);
SELECT app_hidden.expose_enum_endpoint('collection_type', 'app_public');

-- type: collection_entity
DROP TYPE IF EXISTS app_public.collection_entity CASCADE;
CREATE TYPE app_public.collection_entity AS enum (
  'MOVIE',
  'TVSHOW',
  'SEASON',
  'EPISODE'
);
SELECT app_hidden.expose_enum_endpoint('collection_entity', 'app_public');

-- type: iso_alpha_three_country_codes
DROP TYPE IF EXISTS app_public.iso_alpha_three_country_codes CASCADE;
CREATE TYPE app_public.iso_alpha_three_country_codes AS enum (
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
SELECT app_hidden.expose_enum_endpoint('iso_alpha_three_country_codes', 'app_public');



-------------- #setting --------------
--  ___       _    _    _
-- / __| ___ | |_ | |_ (_) _ _   __ _
-- \__ \/ -_)|  _||  _|| || ' \ / _` |
-- |___/\___| \__| \__||_||_||_|\__. |
--                              |___/
--------------------------------------

-- table: movie_genres
DROP TABLE IF EXISTS app_public.movie_genres CASCADE;
CREATE TABLE app_public.movie_genres (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title text NOT NULL,
  sort_order integer NOT NULL,

  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text,

  CONSTRAINT title_max_length CHECK(app_hidden.constraint_max_length(title, 50, 'The title can only be %2$s characters long.')),
  CONSTRAINT title_not_empty CHECK(app_hidden.constraint_not_empty(title, 'The title cannot be empty.'))
);
GRANT SELECT, DELETE ON app_public.movie_genres TO :DATABASE_VISITOR;
GRANT INSERT (
  title,
  sort_order
) ON app_public.movie_genres TO :DATABASE_VISITOR;
GRANT UPDATE (
  title,
  sort_order
) ON app_public.movie_genres TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('id', 'movie_genres', 'app_public', 'movie_genres', 'MovieGenre');
SELECT app_hidden.define_indexes_with_id('title', 'movie_genres', 'app_public');
SELECT app_hidden.define_indexes_with_id('created_date', 'movie_genres', 'app_public');
SELECT app_hidden.define_indexes_with_id('updated_date', 'movie_genres', 'app_public');
SELECT app_hidden.define_unique_index('sort_order', 'movie_genres', 'app_public');
SELECT app_hidden.define_like_index('title', 'movie_genres', 'app_public');
SELECT app_hidden.define_timestamps_trigger('movie_genres', 'app_public');
SELECT app_hidden.define_users_trigger('movie_genres', 'app_public');
SELECT app_hidden.define_authentication('SETTINGS_READER,SETTINGS_EDITOR,ADMIN', 'SETTINGS_EDITOR,ADMIN', 'movie_genres', 'app_public');

-- table: tvshow_genres
DROP TABLE IF EXISTS app_public.tvshow_genres CASCADE;
CREATE TABLE app_public.tvshow_genres (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title text NOT NULL,
  sort_order integer NOT NULL,

  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text,

  CONSTRAINT title_max_length CHECK(app_hidden.constraint_max_length(title, 50, 'The title can only be %2$s characters long.')),
  CONSTRAINT title_not_empty CHECK(app_hidden.constraint_not_empty(title, 'The title cannot be empty.'))
);
GRANT SELECT, DELETE ON app_public.tvshow_genres TO :DATABASE_VISITOR;
GRANT INSERT (
  title,
  sort_order
) ON app_public.tvshow_genres TO :DATABASE_VISITOR;
GRANT UPDATE (
  title,
  sort_order
) ON app_public.tvshow_genres TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('id', 'tvshow_genres', 'app_public', 'tvshow_genres', 'TvshowGenre');
SELECT app_hidden.define_indexes_with_id('title', 'tvshow_genres', 'app_public');
SELECT app_hidden.define_indexes_with_id('created_date', 'tvshow_genres', 'app_public');
SELECT app_hidden.define_indexes_with_id('updated_date', 'tvshow_genres', 'app_public');
SELECT app_hidden.define_unique_index('sort_order', 'tvshow_genres', 'app_public');
SELECT app_hidden.define_like_index('title', 'tvshow_genres', 'app_public');
SELECT app_hidden.define_timestamps_trigger('tvshow_genres', 'app_public');
SELECT app_hidden.define_users_trigger('tvshow_genres', 'app_public');
SELECT app_hidden.define_authentication('SETTINGS_READER,SETTINGS_EDITOR,ADMIN', 'SETTINGS_EDITOR,ADMIN', 'tvshow_genres', 'app_public');



---------- #movie -----------
--  __  __            _
-- |  \/  | ___ __ __(_) ___
-- | |\/| |/ _ \\ V /| |/ -_)
-- |_|  |_|\___/ \_/ |_|\___|
-----------------------------

-- table: movies
DROP TABLE IF EXISTS app_public.movies CASCADE;
CREATE TABLE app_public.movies (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title text NOT NULL,
  external_id text unique,
  original_title text,
  synopsis text,
  description text,
  studio text,
  released date,
  main_video_id int,

  publish_status app_public.publish_status DEFAULT 'NOT_PUBLISHED',
  published_date timestamptz,
  published_user text,
  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text,

  CONSTRAINT title_max_length CHECK(app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.')),
  CONSTRAINT title_not_empty CHECK(app_hidden.constraint_not_empty(title, 'The title cannot be empty.'))
);
GRANT SELECT, DELETE ON app_public.movies TO :DATABASE_VISITOR;
GRANT INSERT (
  title,
  external_id,
  original_title,
  synopsis,
  description,
  studio,
  released,
  main_video_id
) ON app_public.movies TO :DATABASE_VISITOR;
GRANT UPDATE (
  title,
  external_id,
  original_title,
  synopsis,
  description,
  studio,
  released,
  main_video_id,
  publish_status
) ON app_public.movies TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('id', 'movies', 'app_public', 'movies', 'Movie');
SELECT app_hidden.define_indexes_with_id('title', 'movies', 'app_public');
SELECT app_hidden.define_indexes_with_id('original_title', 'movies', 'app_public');
SELECT app_hidden.define_indexes_with_id('external_id', 'movies', 'app_public');
SELECT app_hidden.define_indexes_with_id('released', 'movies', 'app_public');
SELECT app_hidden.define_index('publish_status', 'movies', 'app_public');
SELECT app_hidden.define_indexes_with_id('created_date', 'movies', 'app_public');
SELECT app_hidden.define_indexes_with_id('updated_date', 'movies', 'app_public');
SELECT app_hidden.define_like_index('title', 'movies', 'app_public');
SELECT app_hidden.define_like_index('original_title', 'movies', 'app_public');
SELECT app_hidden.define_timestamps_trigger('movies', 'app_public');
SELECT app_hidden.define_users_trigger('movies', 'app_public');
SELECT app_hidden.define_authentication('MOVIE_READER,MOVIE_EDITOR,ADMIN', 'MOVIE_EDITOR,ADMIN', 'movies', 'app_public');

-- table: movies_tags
DROP TABLE IF EXISTS app_public.movies_tags CASCADE;
CREATE TABLE app_public.movies_tags (
  movie_id integer NOT NULL REFERENCES app_public.movies(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(movie_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.movies_tags TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('movie_id', 'movies_tags', 'app_public', 'movies', 'MovieTag');
SELECT app_hidden.define_index('movie_id', 'movies_tags', 'app_public');
SELECT app_hidden.define_index('name', 'movies_tags', 'app_public');
SELECT app_hidden.define_authentication('MOVIE_READER,MOVIE_EDITOR,ADMIN', 'MOVIE_EDITOR,ADMIN', 'movies_tags', 'app_public');

-- table: movies_casts
DROP TABLE IF EXISTS app_public.movies_casts CASCADE;
CREATE TABLE app_public.movies_casts (
  movie_id integer NOT NULL REFERENCES app_public.movies(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(movie_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.movies_casts TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('movie_id', 'movies_casts', 'app_public', 'movies', 'MovieCast');
SELECT app_hidden.define_index('movie_id', 'movies_casts', 'app_public');
SELECT app_hidden.define_index('name', 'movies_casts', 'app_public');
SELECT app_hidden.define_authentication('MOVIE_READER,MOVIE_EDITOR,ADMIN', 'MOVIE_EDITOR,ADMIN', 'movies_casts', 'app_public');

-- table: movies_licenses
DROP TABLE IF EXISTS app_public.movies_licenses CASCADE;
CREATE TABLE app_public.movies_licenses (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  movie_id integer NOT NULL REFERENCES app_public.movies(id) ON DELETE CASCADE,
  license_start timestamptz,
  license_end timestamptz,
  countries app_public.iso_alpha_three_country_codes[],

  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text
);
GRANT SELECT, DELETE ON app_public.movies_licenses TO :DATABASE_VISITOR;
GRANT INSERT (
  movie_id,
  license_start,
  license_end,
  countries
) ON app_public.movies_licenses TO :DATABASE_VISITOR;
GRANT UPDATE (
  movie_id,
  license_start,
  license_end,
  countries
) ON app_public.movies_licenses TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('movie_id', 'movies_licenses', 'app_public', 'movies', 'MovieLicense');
SELECT app_hidden.define_index('movie_id', 'movies_licenses', 'app_public');
SELECT app_hidden.define_index('license_start', 'movies_licenses', 'app_public');
SELECT app_hidden.define_timestamps_trigger('movies_licenses', 'app_public');
SELECT app_hidden.define_users_trigger('movies_licenses', 'app_public');
SELECT app_hidden.define_authentication('MOVIE_READER,MOVIE_EDITOR,ADMIN', 'MOVIE_EDITOR,ADMIN', 'movies_licenses', 'app_public');

-- table: movies_production_countries
DROP TABLE IF EXISTS app_public.movies_production_countries CASCADE;
CREATE TABLE app_public.movies_production_countries (
  movie_id integer NOT NULL REFERENCES app_public.movies(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(movie_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.movies_production_countries TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('movie_id', 'movies_production_countries', 'app_public', 'movies', 'MovieProductionCountry');
SELECT app_hidden.define_index('movie_id', 'movies_production_countries', 'app_public');
SELECT app_hidden.define_index('name', 'movies_production_countries', 'app_public');
SELECT app_hidden.define_authentication('MOVIE_READER,MOVIE_EDITOR,ADMIN', 'MOVIE_EDITOR,ADMIN', 'movies_production_countries', 'app_public');

-- table: movies_movie_genres
DROP TABLE IF EXISTS app_public.movies_movie_genres CASCADE;
CREATE TABLE app_public.movies_movie_genres (
  movie_id integer NOT NULL REFERENCES app_public.movies(id) ON DELETE CASCADE,
  movie_genres_id integer NOT NULL REFERENCES app_public.movie_genres(id) ON DELETE CASCADE,

  PRIMARY KEY(movie_id, movie_genres_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.movies_movie_genres TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('movie_id', 'movies_movie_genres', 'app_public', 'movies', 'MovieGenre');
SELECT app_hidden.define_index('movie_id', 'movies_movie_genres', 'app_public');
SELECT app_hidden.define_index('movie_genres_id', 'movies_movie_genres', 'app_public');
SELECT app_hidden.define_authentication('MOVIE_READER,MOVIE_EDITOR,ADMIN', 'MOVIE_EDITOR,ADMIN', 'movies_movie_genres', 'app_public');

-- table: movies_images
DROP TABLE IF EXISTS app_public.movies_images CASCADE;
CREATE TABLE app_public.movies_images (
  movie_id integer NOT NULL REFERENCES app_public.movies(id) ON DELETE CASCADE,
  image_id integer NOT NULL,
  image_type app_public.movie_image_type NOT NULL,

  PRIMARY KEY(movie_id, image_id, image_type)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.movies_images TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('movie_id', 'movies_images', 'app_public', 'movies', 'MovieImage');
SELECT app_hidden.define_index('movie_id', 'movies_images', 'app_public');
SELECT app_hidden.define_authentication('MOVIE_READER,MOVIE_EDITOR,ADMIN', 'MOVIE_EDITOR,ADMIN', 'movies_images', 'app_public');

-- table: movies_trailers
DROP TABLE IF EXISTS app_public.movies_trailers CASCADE;
CREATE TABLE app_public.movies_trailers (
  movie_id integer NOT NULL REFERENCES app_public.movies(id) ON DELETE CASCADE,
  video_id integer NOT NULL,

  PRIMARY KEY(movie_id, video_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.movies_trailers TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('movie_id', 'movies_trailers', 'app_public', 'movies', 'MovieTrailer');
SELECT app_hidden.define_index('movie_id', 'movies_trailers', 'app_public');
SELECT app_hidden.define_authentication('MOVIE_READER,MOVIE_EDITOR,ADMIN', 'MOVIE_EDITOR,ADMIN', 'movies_trailers', 'app_public');



-------------------- #tvshow -------------------
--  _____ __   __       ___  _
-- |_   _|\ \ / /      / __|| |_   ___  _ __ __
--   | |   \   /       \__ \|   \ / _ \ \ V  V /
--   |_|    \_/        |___/|_||_|\___/  \_/\_/
------------------------------------------------

-- table: tvshows
DROP TABLE IF EXISTS app_public.tvshows CASCADE;
CREATE TABLE app_public.tvshows (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title text NOT NULL,
  external_id text unique,
  original_title text,
  synopsis text,
  description text,
  studio text,
  released date,

  publish_status app_public.publish_status DEFAULT 'NOT_PUBLISHED',
  published_date timestamptz,
  published_user text,
  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text,

  CONSTRAINT title_max_length CHECK(app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.')),
  CONSTRAINT title_not_empty CHECK(app_hidden.constraint_not_empty(title, 'The title cannot be empty.'))
);
GRANT SELECT, DELETE ON app_public.tvshows TO :DATABASE_VISITOR;
GRANT INSERT (
  title,
  external_id,
  original_title,
  synopsis,
  description,
  studio,
  released
) ON app_public.tvshows TO :DATABASE_VISITOR;
GRANT UPDATE (
  title,
  external_id,
  original_title,
  synopsis,
  description,
  studio,
  released,
  publish_status
) ON app_public.tvshows TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('id', 'tvshows', 'app_public', 'tvshows', 'Tvshow');
SELECT app_hidden.define_indexes_with_id('title', 'tvshows', 'app_public');
SELECT app_hidden.define_indexes_with_id('original_title', 'tvshows', 'app_public');
SELECT app_hidden.define_indexes_with_id('external_id', 'tvshows', 'app_public');
SELECT app_hidden.define_indexes_with_id('released', 'tvshows', 'app_public');
SELECT app_hidden.define_index('publish_status', 'tvshows', 'app_public');
SELECT app_hidden.define_indexes_with_id('created_date', 'tvshows', 'app_public');
SELECT app_hidden.define_indexes_with_id('updated_date', 'tvshows', 'app_public');
SELECT app_hidden.define_like_index('title', 'tvshows', 'app_public');
SELECT app_hidden.define_like_index('original_title', 'tvshows', 'app_public');
SELECT app_hidden.define_timestamps_trigger('tvshows', 'app_public');
SELECT app_hidden.define_users_trigger('tvshows', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'tvshows', 'app_public');

-- table: tvshows_tags
DROP TABLE IF EXISTS app_public.tvshows_tags CASCADE;
CREATE TABLE app_public.tvshows_tags (
  tvshow_id integer NOT NULL REFERENCES app_public.tvshows(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(tvshow_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.tvshows_tags TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('tvshow_id', 'tvshows_tags', 'app_public', 'tvshows', 'TvshowTag');
SELECT app_hidden.define_index('tvshow_id', 'tvshows_tags', 'app_public');
SELECT app_hidden.define_index('name', 'tvshows_tags', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'tvshows_tags', 'app_public');

-- table: tvshows_casts
DROP TABLE IF EXISTS app_public.tvshows_casts CASCADE;
CREATE TABLE app_public.tvshows_casts (
  tvshow_id integer NOT NULL REFERENCES app_public.tvshows(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(tvshow_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.tvshows_casts TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('tvshow_id', 'tvshows_casts', 'app_public', 'tvshows', 'TvshowCast');
SELECT app_hidden.define_index('tvshow_id', 'tvshows_casts', 'app_public');
SELECT app_hidden.define_index('name', 'tvshows_casts', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'tvshows_casts', 'app_public');

-- table: tvshows_licenses
DROP TABLE IF EXISTS app_public.tvshows_licenses CASCADE;
CREATE TABLE app_public.tvshows_licenses (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  tvshow_id integer NOT NULL REFERENCES app_public.tvshows(id) ON DELETE CASCADE,
  license_start timestamptz,
  license_end timestamptz,
  countries app_public.iso_alpha_three_country_codes[],

  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text
);
GRANT SELECT, DELETE ON app_public.tvshows_licenses TO :DATABASE_VISITOR;
GRANT INSERT (
  tvshow_id,
  license_start,
  license_end,
  countries
) ON app_public.tvshows_licenses TO :DATABASE_VISITOR;
GRANT UPDATE (
  tvshow_id,
  license_start,
  license_end,
  countries
) ON app_public.tvshows_licenses TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('tvshow_id', 'tvshows_licenses', 'app_public', 'tvshows', 'TvshowLicense');
SELECT app_hidden.define_index('tvshow_id', 'tvshows_licenses', 'app_public');
SELECT app_hidden.define_index('license_start', 'tvshows_licenses', 'app_public');
SELECT app_hidden.define_timestamps_trigger('tvshows_licenses', 'app_public');
SELECT app_hidden.define_users_trigger('tvshows_licenses', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'tvshows_licenses', 'app_public');

-- table: tvshows_production_countries
DROP TABLE IF EXISTS app_public.tvshows_production_countries CASCADE;
CREATE TABLE app_public.tvshows_production_countries (
  tvshow_id integer NOT NULL REFERENCES app_public.tvshows(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(tvshow_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.tvshows_production_countries TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('tvshow_id', 'tvshows_production_countries', 'app_public', 'tvshows', 'TvshowProductionCountry');
SELECT app_hidden.define_index('tvshow_id', 'tvshows_production_countries', 'app_public');
SELECT app_hidden.define_index('name', 'tvshows_production_countries', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'tvshows_production_countries', 'app_public');

-- table: tvshows_tvshow_genres
DROP TABLE IF EXISTS app_public.tvshows_tvshow_genres CASCADE;
CREATE TABLE app_public.tvshows_tvshow_genres (
  tvshow_id integer NOT NULL REFERENCES app_public.tvshows(id) ON DELETE CASCADE,
  tvshow_genres_id integer NOT NULL REFERENCES app_public.tvshow_genres(id) ON DELETE CASCADE,

  PRIMARY KEY(tvshow_id, tvshow_genres_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.tvshows_tvshow_genres TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('tvshow_id', 'tvshows_tvshow_genres', 'app_public', 'tvshows', 'TvshowGenre');
SELECT app_hidden.define_index('tvshow_id', 'tvshows_tvshow_genres', 'app_public');
SELECT app_hidden.define_index('tvshow_genres_id', 'tvshows_tvshow_genres', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'tvshows_tvshow_genres', 'app_public');

-- table: tvshows_images
DROP TABLE IF EXISTS app_public.tvshows_images CASCADE;
CREATE TABLE app_public.tvshows_images (
  tvshow_id integer NOT NULL REFERENCES app_public.tvshows(id) ON DELETE CASCADE,
  image_id integer NOT NULL,
  image_type app_public.tvshow_image_type NOT NULL,

  PRIMARY KEY(tvshow_id, image_id, image_type)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.tvshows_images TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('tvshow_id', 'tvshows_images', 'app_public', 'tvshows', 'TvshowImage');
SELECT app_hidden.define_index('tvshow_id', 'tvshows_images', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'tvshows_images', 'app_public');

-- table: tvshows_trailers
DROP TABLE IF EXISTS app_public.tvshows_trailers CASCADE;
CREATE TABLE app_public.tvshows_trailers (
  tvshow_id integer NOT NULL REFERENCES app_public.tvshows(id) ON DELETE CASCADE,
  video_id integer NOT NULL,

  PRIMARY KEY(tvshow_id, video_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.tvshows_trailers TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('tvshow_id', 'tvshows_trailers', 'app_public', 'tvshows', 'TvshowTrailer');
SELECT app_hidden.define_index('tvshow_id', 'tvshows_trailers', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'tvshows_trailers', 'app_public');



------------ #season -------------
--  ___
-- / __| ___  __ _  ___ ___  _ _
-- \__ \/ -_)/ _` |(_-// _ \| ' \
-- |___/\___|\__/_|/__/\___/|_||_|
----------------------------------

-- table: seasons
DROP TABLE IF EXISTS app_public.seasons CASCADE;
CREATE TABLE app_public.seasons (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  tvshow_id integer REFERENCES app_public.tvshows(id) ON DELETE SET NULL,
  index integer NOT NULL,
  external_id text unique,
  synopsis text,
  description text,
  studio text,
  released date,

  publish_status app_public.publish_status DEFAULT 'NOT_PUBLISHED',
  published_date timestamptz,
  published_user text,
  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text
);
GRANT SELECT, DELETE ON app_public.seasons TO :DATABASE_VISITOR;
GRANT INSERT (
  tvshow_id,
  index,
  external_id,
  synopsis,
  description,
  studio,
  released
) ON app_public.seasons TO :DATABASE_VISITOR;
GRANT UPDATE (
  tvshow_id,
  index,
  external_id,
  synopsis,
  description,
  studio,
  released,
  publish_status
) ON app_public.seasons TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('id', 'seasons', 'app_public', 'seasons', 'Season');
SELECT app_hidden.define_index('tvshow_id', 'seasons', 'app_public');
SELECT app_hidden.define_indexes_with_id('index', 'seasons', 'app_public');
SELECT app_hidden.define_indexes_with_id('external_id', 'seasons', 'app_public');
SELECT app_hidden.define_indexes_with_id('released', 'seasons', 'app_public');
SELECT app_hidden.define_index('publish_status', 'seasons', 'app_public');
SELECT app_hidden.define_indexes_with_id('created_date', 'seasons', 'app_public');
SELECT app_hidden.define_indexes_with_id('updated_date', 'seasons', 'app_public');
SELECT app_hidden.define_timestamps_trigger('seasons', 'app_public');
SELECT app_hidden.define_users_trigger('seasons', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'seasons', 'app_public');

-- table: seasons_tags
DROP TABLE IF EXISTS app_public.seasons_tags CASCADE;
CREATE TABLE app_public.seasons_tags (
  season_id integer NOT NULL REFERENCES app_public.seasons(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(season_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.seasons_tags TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('season_id', 'seasons_tags', 'app_public', 'seasons', 'SeasonTag');
SELECT app_hidden.define_index('season_id', 'seasons_tags', 'app_public');
SELECT app_hidden.define_index('name', 'seasons_tags', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'seasons_tags', 'app_public');

-- table: seasons_casts
DROP TABLE IF EXISTS app_public.seasons_casts CASCADE;
CREATE TABLE app_public.seasons_casts (
  season_id integer NOT NULL REFERENCES app_public.seasons(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(season_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.seasons_casts TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('season_id', 'seasons_casts', 'app_public', 'seasons', 'SeasonCast');
SELECT app_hidden.define_index('season_id', 'seasons_casts', 'app_public');
SELECT app_hidden.define_index('name', 'seasons_casts', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'seasons_casts', 'app_public');

-- table: seasons_licenses
DROP TABLE IF EXISTS app_public.seasons_licenses CASCADE;
CREATE TABLE app_public.seasons_licenses (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  season_id integer NOT NULL REFERENCES app_public.seasons(id) ON DELETE CASCADE,
  license_start timestamptz,
  license_end timestamptz,
  countries app_public.iso_alpha_three_country_codes[],

  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text
);
GRANT SELECT, DELETE ON app_public.seasons_licenses TO :DATABASE_VISITOR;
GRANT INSERT (
  season_id,
  license_start,
  license_end,
  countries
) ON app_public.seasons_licenses TO :DATABASE_VISITOR;
GRANT UPDATE (
  season_id,
  license_start,
  license_end,
  countries
) ON app_public.seasons_licenses TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('season_id', 'seasons_licenses', 'app_public', 'seasons', 'SeasonLicense');
SELECT app_hidden.define_index('season_id', 'seasons_licenses', 'app_public');
SELECT app_hidden.define_index('license_start', 'seasons_licenses', 'app_public');
SELECT app_hidden.define_timestamps_trigger('seasons_licenses', 'app_public');
SELECT app_hidden.define_users_trigger('seasons_licenses', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'seasons_licenses', 'app_public');

-- table: seasons_production_countries
DROP TABLE IF EXISTS app_public.seasons_production_countries CASCADE;
CREATE TABLE app_public.seasons_production_countries (
  season_id integer NOT NULL REFERENCES app_public.seasons(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(season_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.seasons_production_countries TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('season_id', 'seasons_production_countries', 'app_public', 'seasons', 'SeasonProductionCountry');
SELECT app_hidden.define_index('season_id', 'seasons_production_countries', 'app_public');
SELECT app_hidden.define_index('name', 'seasons_production_countries', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'seasons_production_countries', 'app_public');

-- table: seasons_tvshow_genres
DROP TABLE IF EXISTS app_public.seasons_tvshow_genres CASCADE;
CREATE TABLE app_public.seasons_tvshow_genres (
  season_id integer NOT NULL REFERENCES app_public.seasons(id) ON DELETE CASCADE,
  tvshow_genres_id integer NOT NULL REFERENCES app_public.tvshow_genres(id) ON DELETE CASCADE,
  
  PRIMARY KEY(season_id, tvshow_genres_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.seasons_tvshow_genres TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('season_id', 'seasons_tvshow_genres', 'app_public', 'seasons', 'SeasonGenre');
SELECT app_hidden.define_index('season_id', 'seasons_tvshow_genres', 'app_public');
SELECT app_hidden.define_index('tvshow_genres_id', 'seasons_tvshow_genres', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'seasons_tvshow_genres', 'app_public');

-- table: seasons_images
DROP TABLE IF EXISTS app_public.seasons_images CASCADE;
CREATE TABLE app_public.seasons_images (
  season_id integer NOT NULL REFERENCES app_public.seasons(id) ON DELETE CASCADE,
  image_id integer NOT NULL,
  image_type app_public.season_image_type NOT NULL,

  PRIMARY KEY(season_id, image_id, image_type)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.seasons_images TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('season_id', 'seasons_images', 'app_public', 'seasons', 'SeasonImage');
SELECT app_hidden.define_index('season_id', 'seasons_images', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'seasons_images', 'app_public');

-- table: seasons_trailers
DROP TABLE IF EXISTS app_public.seasons_trailers CASCADE;
CREATE TABLE app_public.seasons_trailers (
  season_id integer NOT NULL REFERENCES app_public.seasons(id) ON DELETE CASCADE,
  video_id integer NOT NULL,

  PRIMARY KEY(season_id, video_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.seasons_trailers TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('season_id', 'seasons_trailers', 'app_public', 'seasons', 'SeasonTrailer');
SELECT app_hidden.define_index('season_id', 'seasons_trailers', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'seasons_trailers', 'app_public');



------------ #episode -------------
--  ___       _             _
-- | __] ___ [_] ___ ___  _| | ___
-- | _] | . \| |[_-[/ . \/ . |/ ._]
-- |___]|  _/|_|/__/\___/\___|\___.
--      |_|
-----------------------------------

-- table: episodes
DROP TABLE IF EXISTS app_public.episodes CASCADE;
CREATE TABLE app_public.episodes (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  season_id integer REFERENCES app_public.seasons(id) ON DELETE SET NULL,
  index integer NOT NULL,
  title text NOT NULL,
  external_id text unique,
  original_title text,
  synopsis text,
  description text,
  studio text,
  released date,
  main_video_id int,

  publish_status app_public.publish_status DEFAULT 'NOT_PUBLISHED',
  published_date timestamptz,
  published_user text,
  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text,

  CONSTRAINT title_max_length CHECK(app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.')),
  CONSTRAINT title_not_empty CHECK(app_hidden.constraint_not_empty(title, 'The title cannot be empty.'))
);
GRANT SELECT, DELETE ON app_public.episodes TO :DATABASE_VISITOR;
GRANT INSERT (
  season_id,
  index,
  title,
  external_id,
  original_title,
  synopsis,
  description,
  studio,
  released,
  main_video_id
) ON app_public.episodes TO :DATABASE_VISITOR;
GRANT UPDATE (
  season_id,
  index,
  title,
  external_id,
  original_title,
  synopsis,
  description,
  studio,
  released,
  main_video_id,
  publish_status
) ON app_public.episodes TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('id', 'episodes', 'app_public', 'episodes', 'Episode');
SELECT app_hidden.define_index('season_id', 'episodes', 'app_public');
SELECT app_hidden.define_indexes_with_id('index', 'episodes', 'app_public');
SELECT app_hidden.define_indexes_with_id('title', 'episodes', 'app_public');
SELECT app_hidden.define_indexes_with_id('original_title', 'episodes', 'app_public');
SELECT app_hidden.define_indexes_with_id('external_id', 'episodes', 'app_public');
SELECT app_hidden.define_indexes_with_id('released', 'episodes', 'app_public');
SELECT app_hidden.define_index('publish_status', 'episodes', 'app_public');
SELECT app_hidden.define_indexes_with_id('created_date', 'episodes', 'app_public');
SELECT app_hidden.define_indexes_with_id('updated_date', 'episodes', 'app_public');
SELECT app_hidden.define_like_index('title', 'episodes', 'app_public');
SELECT app_hidden.define_like_index('original_title', 'episodes', 'app_public');
SELECT app_hidden.define_timestamps_trigger('episodes', 'app_public');
SELECT app_hidden.define_users_trigger('episodes', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'episodes', 'app_public');

-- table: episodes_tags
DROP TABLE IF EXISTS app_public.episodes_tags CASCADE;
CREATE TABLE app_public.episodes_tags (
  episode_id integer NOT NULL REFERENCES app_public.episodes(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(episode_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.episodes_tags TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('episode_id', 'episodes_tags', 'app_public', 'episodes', 'EpisodeTag');
SELECT app_hidden.define_index('episode_id', 'episodes_tags', 'app_public');
SELECT app_hidden.define_index('name', 'episodes_tags', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'episodes_tags', 'app_public');

-- table: episodes_casts
DROP TABLE IF EXISTS app_public.episodes_casts CASCADE;
CREATE TABLE app_public.episodes_casts (
  episode_id integer NOT NULL REFERENCES app_public.episodes(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(episode_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.episodes_casts TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('episode_id', 'episodes_casts', 'app_public', 'episodes', 'EpisodeCast');
SELECT app_hidden.define_index('episode_id', 'episodes_casts', 'app_public');
SELECT app_hidden.define_index('name', 'episodes_casts', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'episodes_casts', 'app_public');

-- table: episodes_licenses
DROP TABLE IF EXISTS app_public.episodes_licenses CASCADE;
CREATE TABLE app_public.episodes_licenses (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  episode_id integer NOT NULL REFERENCES app_public.episodes(id) ON DELETE CASCADE,
  license_start timestamptz,
  license_end timestamptz,
  countries app_public.iso_alpha_three_country_codes[],

  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text
);
GRANT SELECT, DELETE ON app_public.episodes_licenses TO :DATABASE_VISITOR;
GRANT INSERT (
  episode_id,
  license_start,
  license_end,
  countries
) ON app_public.episodes_licenses TO :DATABASE_VISITOR;
GRANT UPDATE (
  episode_id,
  license_start,
  license_end,
  countries
) ON app_public.episodes_licenses TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('episode_id', 'episodes_licenses', 'app_public', 'episodes', 'EpisodeLicense');
SELECT app_hidden.define_index('episode_id', 'episodes_licenses', 'app_public');
SELECT app_hidden.define_index('license_start', 'episodes_licenses', 'app_public');
SELECT app_hidden.define_timestamps_trigger('episodes_licenses', 'app_public');
SELECT app_hidden.define_users_trigger('episodes_licenses', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'episodes_licenses', 'app_public');

-- table: episodes_production_countries
DROP TABLE IF EXISTS app_public.episodes_production_countries CASCADE;
CREATE TABLE app_public.episodes_production_countries (
  episode_id integer NOT NULL REFERENCES app_public.episodes(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(episode_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.episodes_production_countries TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('episode_id', 'episodes_production_countries', 'app_public', 'episodes', 'EpisodeProductionCountry');
SELECT app_hidden.define_index('episode_id', 'episodes_production_countries', 'app_public');
SELECT app_hidden.define_index('name', 'episodes_production_countries', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'episodes_production_countries', 'app_public');

-- table: episodes_tvshow_genres
DROP TABLE IF EXISTS app_public.episodes_tvshow_genres CASCADE;
CREATE TABLE app_public.episodes_tvshow_genres (
  episode_id integer NOT NULL REFERENCES app_public.episodes(id) ON DELETE CASCADE,
  tvshow_genres_id integer NOT NULL REFERENCES app_public.tvshow_genres(id) ON DELETE CASCADE,

  PRIMARY KEY(episode_id, tvshow_genres_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.episodes_tvshow_genres TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('episode_id', 'episodes_tvshow_genres', 'app_public', 'episodes', 'EpisodeGenre');
SELECT app_hidden.define_index('episode_id', 'episodes_tvshow_genres', 'app_public');
SELECT app_hidden.define_index('tvshow_genres_id', 'episodes_tvshow_genres', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'episodes_tvshow_genres', 'app_public');

-- table: episodes_images
DROP TABLE IF EXISTS app_public.episodes_images CASCADE;
CREATE TABLE app_public.episodes_images (
  episode_id integer NOT NULL REFERENCES app_public.episodes(id) ON DELETE CASCADE,
  image_id integer NOT NULL,
  image_type app_public.episode_image_type NOT NULL,

  PRIMARY KEY(episode_id, image_id, image_type)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.episodes_images TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('episode_id', 'episodes_images', 'app_public', 'episodes', 'EpisodeImage');
SELECT app_hidden.define_index('episode_id', 'episodes_images', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'episodes_images', 'app_public');

-- table: episodes_trailers
DROP TABLE IF EXISTS app_public.episodes_trailers CASCADE;
CREATE TABLE app_public.episodes_trailers (
  episode_id integer NOT NULL REFERENCES app_public.episodes(id) ON DELETE CASCADE,
  video_id integer NOT NULL,

  PRIMARY KEY(episode_id, video_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.episodes_trailers TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('episode_id', 'episodes_trailers', 'app_public', 'episodes', 'EpisodeTrailer');
SELECT app_hidden.define_index('episode_id', 'episodes_trailers', 'app_public');
SELECT app_hidden.define_authentication('TVSHOW_READER,TVSHOW_EDITOR,ADMIN', 'TVSHOW_EDITOR,ADMIN', 'episodes_trailers', 'app_public');



----------------- #collection ------------------
--   ___       _  _           _    _
--  / __| ___ | || | ___  __ | |_ (_) ___  _ _
-- | (__ / _ \| || |/ -_)/ _||  _|| |/ _ \| ' \
--  \___|\___/|_||_|\___|\__| \__||_|\___/|_||_|
------------------------------------------------

-- table: collections
DROP TABLE IF EXISTS app_public.collections CASCADE;
CREATE TABLE app_public.collections (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title text NOT NULL,
  external_id text unique,
  synopsis text,
  description text,
  collection_type app_public.collection_type,
  automatic_collection_sort_key text,

  publish_status app_public.publish_status DEFAULT 'NOT_PUBLISHED',
  published_date timestamptz,
  published_user text,
  created_date timestamptz DEFAULT (now() at time zone 'utc'),
  updated_date timestamptz DEFAULT (now() at time zone 'utc'),
  created_user text,
  updated_user text,

  CONSTRAINT title_max_length CHECK(app_hidden.constraint_max_length(title, 100, 'The title can only be %2$s characters long.')),
  CONSTRAINT title_not_empty CHECK(app_hidden.constraint_not_empty(title, 'The title cannot be empty.'))
);
GRANT SELECT, DELETE ON app_public.collections TO :DATABASE_VISITOR;
GRANT INSERT (
  title,
  external_id,
  synopsis,
  description,
  collection_type,
  automatic_collection_sort_key
) ON app_public.collections TO :DATABASE_VISITOR;
GRANT UPDATE (
  title,
  external_id,
  synopsis,
  description,
  collection_type,
  automatic_collection_sort_key,
  publish_status
) ON app_public.collections TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('id', 'collections', 'app_public', 'collections', 'Collection');
SELECT app_hidden.define_indexes_with_id('title', 'collections', 'app_public');
SELECT app_hidden.define_indexes_with_id('external_id', 'collections', 'app_public');
SELECT app_hidden.define_indexes_with_id('collection_type', 'collections', 'app_public');
SELECT app_hidden.define_index('publish_status', 'collections', 'app_public');
SELECT app_hidden.define_indexes_with_id('created_date', 'collections', 'app_public');
SELECT app_hidden.define_indexes_with_id('updated_date', 'collections', 'app_public');
SELECT app_hidden.define_like_index('title', 'collections', 'app_public');
SELECT app_hidden.define_timestamps_trigger('collections', 'app_public');
SELECT app_hidden.define_users_trigger('collections', 'app_public');
SELECT app_hidden.define_authentication('COLLECTION_READER,COLLECTION_EDITOR,ADMIN', 'COLLECTION_EDITOR,ADMIN', 'collections', 'app_public');

-- table: automatic_collections_filters
DROP TABLE IF EXISTS app_public.automatic_collections_filters CASCADE;
CREATE TABLE app_public.automatic_collections_filters (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  collection_id integer NOT NULL REFERENCES app_public.collections(id) ON DELETE CASCADE,
  entity_type app_public.collection_entity NOT NULL,
  filter_key text NOT NULL,
  filter_value text,

  CONSTRAINT filter_key_not_empty CHECK(app_hidden.constraint_not_empty(filter_key, 'The filter key cannot be empty.'))
);
CREATE INDEX ON app_public.automatic_collections_filters(collection_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.automatic_collections_filters TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('collection_id', 'automatic_collections_filters', 'app_public', 'collections', 'AutomaticCollectionFilter');
SELECT app_hidden.define_index('collection_id', 'automatic_collections_filters', 'app_public');
SELECT app_hidden.define_index('filter_key', 'automatic_collections_filters', 'app_public');
SELECT app_hidden.define_authentication('COLLECTION_READER,COLLECTION_EDITOR,ADMIN', 'COLLECTION_EDITOR,ADMIN', 'automatic_collections_filters', 'app_public');

-- table: collection_relations
DROP TABLE IF EXISTS app_public.collection_relations CASCADE; 
CREATE TABLE app_public.collection_relations (
  id INT NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  collection_id integer NOT NULL REFERENCES app_public.collections(id) ON DELETE CASCADE,
  sort_order INT NOT NULL,

  movie_id integer null REFERENCES app_public.movies(id) ON DELETE CASCADE,
  tvshow_id integer null REFERENCES app_public.tvshows(id) ON DELETE CASCADE,
  season_id integer null REFERENCES app_public.seasons(id) ON DELETE CASCADE,
  episode_id integer null REFERENCES app_public.episodes(id) ON DELETE CASCADE,

  -- check that there is exactly one related item for each row
  CONSTRAINT exactly_one_relation CHECK(num_nonnulls(movie_id, tvshow_id, season_id, episode_id) = 1),
  -- check that each combination from collection to any other element is unique
  CONSTRAINT unique_movie_per_collection UNIQUE(collection_id, movie_id),
  CONSTRAINT unique_tvshow_per_collection UNIQUE(collection_id, tvshow_id),
  CONSTRAINT unique_season_per_collection UNIQUE(collection_id, season_id),
  CONSTRAINT unique_episode_per_collection UNIQUE(collection_id, episode_id)
);
GRANT SELECT, DELETE ON app_public.collection_relations TO :DATABASE_VISITOR;
GRANT INSERT, UPDATE (
  collection_id,
  sort_order,
  movie_id,
  tvshow_id,
  season_id,
  episode_id
) ON app_public.collection_relations TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('collection_id', 'collection_relations', 'app_public', 'collections', 'CollectionRelation');
SELECT app_hidden.define_index('sort_order', 'collection_relations', 'app_public');
SELECT app_hidden.define_index('movie_id', 'collection_relations', 'app_public');
SELECT app_hidden.define_index('tvshow_id', 'collection_relations', 'app_public');
SELECT app_hidden.define_index('season_id', 'collection_relations', 'app_public');
SELECT app_hidden.define_index('episode_id', 'collection_relations', 'app_public');
SELECT app_hidden.define_authentication('COLLECTION_READER,COLLECTION_EDITOR,ADMIN', 'COLLECTION_EDITOR,ADMIN', 'collection_relations', 'app_public');

-- table: collections_tags
DROP TABLE IF EXISTS app_public.collections_tags CASCADE;
CREATE TABLE app_public.collections_tags (
  collection_id integer NOT NULL REFERENCES app_public.collections(id) ON DELETE CASCADE,
  name text NOT NULL,

  PRIMARY KEY(collection_id, name),
  CONSTRAINT name_not_empty CHECK(app_hidden.constraint_not_empty(name, 'The name cannot be empty.'))
);
CREATE INDEX ON app_public.collections_tags(name);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.collections_tags TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('collection_id', 'collections_tags', 'app_public', 'collections', 'CollectionTag');
SELECT app_hidden.define_index('collection_id', 'collections_tags', 'app_public');
SELECT app_hidden.define_index('name', 'collections_tags', 'app_public');
SELECT app_hidden.define_authentication('COLLECTION_READER,COLLECTION_EDITOR,ADMIN', 'COLLECTION_EDITOR,ADMIN', 'collections_tags', 'app_public');

-- table: collections_images
DROP TABLE IF EXISTS app_public.collections_images CASCADE;
CREATE TABLE app_public.collections_images (
  collection_id integer NOT NULL REFERENCES app_public.collections(id) ON DELETE CASCADE,
  image_id integer NOT NULL,
  image_type app_public.collection_image_type NOT NULL,

  PRIMARY KEY(collection_id, image_id, image_type)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON app_public.collections_images TO :DATABASE_VISITOR;
SELECT app_hidden.define_subscription_triggers('collection_id', 'collections_images', 'app_public', 'collections', 'CollectionImage');
SELECT app_hidden.define_index('collection_id', 'collections_images', 'app_public');
SELECT app_hidden.define_authentication('COLLECTION_READER,COLLECTION_EDITOR,ADMIN', 'COLLECTION_EDITOR,ADMIN', 'collections_images', 'app_public');
