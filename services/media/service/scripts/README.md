## Scripts

- reset
  - wrapper command, uses graphile-migrates `reset` command in addition to other
    SQL statements.
  - creates a database and all corresponding users/roles, if they do not exist
  - if database or users/roles exist - deletes them and re-creates them.
  - represented by an `yarn run db:reset` command that can be run via console
  - by using graphile-migrate `reset` command, all committed migrations are also
    applied to newly (re-)created database
- commit
  - wrapper command, uses graphile-migrates `commit` command using config of
    this app.
  - moves content of `migrations/current.sql` script into a dedicated migration
    file inside of the `migrations/committed` folder
  - also makes a record inside of target database, `graphile-migrate` schema,
    `migrations` table
  - Recreates shadow database, applies all migrations to it and then applies new
    and unapplied migrations to target database.
  - represented by an `yarn run db:commit` command that can be run via console
- uncommit
  - wrapper command, uses graphile-migrates `uncommit` command using config of
    this app.
  - moves content of latest migration from `migrations/committed` folder into
    `migrations/current.sql`
  - also removes a corresponding record from target database, `graphile-migrate`
    schema, `migrations` table
  - Recreates shadow database, applies all migrations to it
  - **N.B!** Does not unapply previously applied SQL from the target database
    - If you need to unapply it - reset command is probably the quickest option,
      otherwise revert SQL can be written in current.sql and executed while in
      watch mode.
  - **N.B!** Only works on 1 last migration and only when current.sql is empty
    (comments do not count)
  - represented by an `yarn run db:uncommit` command that can be run via console
- open-coverage
  - This command is not related to database manipulations
  - Instead, it improves an experience of accessing a coverage report generated
    by Jest
  - this command is ran as part of `yarn run test:cov` command
    - after tests are ran and coverage report is generated, this command opens
      the report in browser
    - this removes the need to manually navigate inside of the
      `coverage/Icov-report` folder and manually opening an `index.html` using a
      browser

## Notes

- To be able to use grants to expose only certain properties via API
  (ignoreRBAC: false), we need to have specific users/roles ready before
  migrations are ran.
  - root - usually represented by the default user `postgres` (at least in
    development), used by graphile-migrate to perform reset actions. For
    development it must be a superuser for the DB schema watch feature.
  - owner - this user must be created before launching the application or
    applying migrations. It is used for database migrations and to execute SQL
    queries with elevated privileges
  - auth - user with login rights that has (almost) no permissions on its own.
    This user is used purely for the login. In the TS code the role is defined
    into which this user switches to execute the DB commands in. For
    PostGraphile this will be the visitor role (see below).
  - visitor - a role without login rights. This role is the default PostGraphile
    role. The access rights of the visitor are used to generate the GraphQL API
    endpoint. Grants can be used for example to narrow down the fields of a DB
    that this user can query/insert/update which will also be reflected in the
    GraphQL API. PostGraphile should NOT use owner/root roles as this would
    (likely) expose the full app_public schema via GraphQL.
  - creation of owner/auth and visitor roles is done by the `reset` command
