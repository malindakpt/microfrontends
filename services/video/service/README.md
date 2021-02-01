## About

This is a backend service with focus on video management which is using
PostgreSQL as a database and PostGraphile as an API engine. More details will
follow.

## Setup and Startup

- create a copy of the file `.env.template` as `.env` and modify
  DATABASE-related variables, e.g. DATABASE_NAME
  - ROOT_DATABASE_CONNECTION_STRING might require different credentials
    information.
  - ROOT_DATABASE_CONNECTION_STRING must be a superuser connection string to a
    database, which is not the same as DATABASE_NAME.
    - by default it points to `template1` database and it's ok to leave it like
      that, even if `template1` is not visible in pgAdmin UI.
  - VIP_SERVICE_BUS_CONNECTION must be an encrypted azure service bus connection
    string
    - This value was left unfilled with default value on purpose, because using
      the same connection string for more than 1 app instance can produce
      unpredictable results.
      - e.g. if 2 developers launch video-service at the same time and have the
        same service bus connection string and one of them will start VIP job -
        both instances will 'fight' for VIP event messages, meaning some data
        will be lost for one app instance and another app instance will consume
        event messages which it did not ask for.
    - to prepare such connection string, regular azure service bus connection
      string must be prepared (e.g. using Azure Portal) and then encrypted with
      public VIP certificate using a specific tool.
      - Contact Sergey Trusov or Frank Zehelein for assistance with this.
- Make sure that PostgreSQL is installed.
  - At the moment of writing this, currently installed version is 12.2
  - use `postgres -V` to check
- Add PostgreSQL installation path to PATH Environment variable
  - See `src/migrations/README.md` for more info
- run `yarn run db:reset`
  - This step is not required if db:reset command was also ran from repository
    root.
  - this will create a new database based on your configuration and setup
    users/roles (Owner, Auth and Visitor)
  - this script can also be used to completely reset the database and related
    roles, starting cleanly again
- run `yarn start`

## TODOS:

- Update error and logging documentation
- Investigate if SQL testing makes sense?
- investigate gracefulShutdown function, how it works and ways to improve it.
- Investigate logging/debugging of postgresql. e.g.
  https://stackoverflow.com/questions/722221/how-to-log-postgresql-queries
- Go through postgraphile production suggestions and activate request limiters
- Low Prio: See if its possible to improve the setup experience of adding
  postgresql path to PATH variable
- Add a script that creates a .env file from .env.template
- Make ROOT_DATABASE_CONNECTION_STRING optional, check that it's possible.
- Currently graphile-migrate logging will not output names with messages, which
  will be fixed in next release, PR already merged.
- graphile-migrate allows to use a /current folder vs. current.sql file. Check
  if that helps for large initial DB create logic to split it up nicer.
- Add explicit documentation on how to approach authentication during
  development when keys will become required, for now access is Anonymous for
  all endpoints.
- if we use the nested mutations plugin we should use a for from the original -
  potentially even inline the sources:  
  https://github.com/farcasmihai91/postgraphile-plugin-nested-mutations/commits/master

## Notes

- In case template1 database was modified:
  - https://gist.github.com/juike/2b187f0b83cf2b0f5987
- Need to keep track of possible ways to reproduce errors to test errors
  handler:
  - make a request with required input that is not specified
  - make a request with input that is not present in schema
  - delete an asset that does not exist - no code.
  - call an unknown function - code 42883
  - making a request to non-existent table, e.g. by not prefixing it with
    schema - code 42P01
  - using incorrect type in the where select, e.g. using string on an int
    column - 22P02
    - invalid input syntax for integer: \"L1xqiUlB\"",
  - constraint check failed on insert: 23514
- It seems like there is some windows-specific problem flying around which
  results in following error:
  - `basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")`
  - `SyntaxError: missing ) after argument list`
  - In 1 particular case it was related to running tests using jest in debug
    mode, adjusting a path to bin/jest fixed it:
    - https://github.com/facebook/jest/issues/4751#issuecomment-361063215
- initializePgPool - tested retry logic by not specifying
  ROOT_DATABASE_CONNECTION_STRING, works ok.
- configuration and dotenv
  - dotenv is responsible for loading env variables from .env file into
    process.env.
  - for this reason, it is important to execute it as soon as possible during
    app startup.
  - current approach - preload it as part of a start command, e.g.
    `node -r dotenv/config dist/index`
    - this way we don't need to even define it in code and variables are loaded
      right before app startup
    - using imports can be tricky in a way that there is always a chance that
      something will be executed before variables are loaded. e.g.
      - you can define `import * as dotenv from 'dotenv';` and `donenv.config()`
        at the top of the file, but if you run some "Organize Imports" command -
        `dotenv.config()` config will be moved after all imports, so it's easy
        to unintentionally break the app.
- API
  - Every query or mutation has a query, why?
  - Edges on mutations - why are they needed?
    - Answer: the use case is for performing mutations and then updating your
      client cache from the mutation result efficiently - you can just put the
      edge on the end of the existing list of edges rather than having to query
      the whole collection again
- PostgreSQL
  - it supports enums, but does not support numeric enums, values are strings
  - even though in GraphiQL (and in GraphQL requests in general) you have to
    specify transformed ENUM value, e.g. \_4_G, in Database a correct value will
    be stored, e.g. 4G
- Triggers
  - might be helpful when triggers need to update relations:
    https://dba.stackexchange.com/questions/180078/postgres-update-parent-if-entity-foreign-key-updates
  - Relationships that should eventually be handled:
    - Many-to-many,
    - One-to-many, tree-structure of different types
    - One-to-many, recursive tree of same type
  - Trigger updates of parent/child entities shall be supported when a
    child/parent is being updated (or deleted)
- SQL Debugging - add `RAISE EXCEPTION '(%)!', OLD;`, replace OLD with the thing
  you want to display
  - There is probably a better way :)
- might be interesting: https://wiki.postgresql.org/wiki/Don%27t_Do_This
- PostgreSQL Unique IDs alternatives:
  - ULID, Default specification: https://github.com/ulid/spec
  - ULID, PostgreSQL function:
    https://github.com/geckoboard/pgulid/blob/master/pgulid.sql
- Indexes
  - current indexes are set to support sorting for explorer columns
  - indexes are set for sort property and for id, because ID is always included
    as a second sorting column
  - TODO: test with cursor paging
  - Tested with 10000000 assets
  - **N.B.** LIKE/ILIKE text search:
    https://niallburkley.com/blog/index-columns-for-like-in-postgres/
  - Useful:
    https://www.reddit.com/r/node/comments/f86iic/what_should_i_know_about_postgresql_if_i_am/
  - creation of indexes can take some time =)
- Cursor Pagination and Indexes
  - Works good with LIKE and order by
  - one case where it gets slow - a request to get last page (when a response
    will have pageInfo.hasNextPage set as false).
    - page next to last: 478.22ms
    - last page: 16283.39ms
    - I think this is relevant only for huge amounts of data and only in certain
      scenarios, for a query that retrieved about 4 pages out of 10 million
      entries, last request was not that slow 323.93ms vs 424.91ms, so the only
      chance to experience that slowdown from UI perspective is to endlessly
      scroll down the explorer
- Tests
  - Tests shall be executable individually
  - Tests shall be debuggable individually
  - DB connection context shall be clearly define
    - in graphile starter it is hidden in helpers
    - while resulting tests appear cleaner, lack of explicit flow does not seem
      right to me.
