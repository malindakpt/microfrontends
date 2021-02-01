## Read first

- To keep track of current state of the database and to see how migration
  changes affect that state, a dump of current database schema is always stored
  under source control.
- It's located in `src/generated/schema.sql` file.
- a cmd utility called "pg_dump" is used to generate that file each time a
  migration is committed or uncommited (`yarn run db:commit` or
  `yarn run db:uncommit`)
  - it's usage is defined inside of `migrations.settings.ts`
- Problem is, to make that utility work, path to PostgreSQL installation folder
  must be added to Windows PATH environment variable (which does not happen
  automatically when PostgreSQL is installed)
  - if an error like this occurs - you probably do not have PATH adjusted
  - "pg_dump : The term 'pg_dump' is not recognized as the name of a cmdlet,
    function, script file, or operable program. Check the spelling of the name,
    or if a path was included, verify that the path is correct and try again."
- TODO: alternative using PostgreSQL from docker: "pg_dump": "docker exec
  pgDocker pg_dump --no-sync --schema-only --no-owner
  --exclude-schema=graphile_migrate --exclude-schema=graphile_worker
  postgres://postgres:postgres@postgres:5432/media > ./src/generated/schema.sql"

## PATH Setup

- Manual adjustment:
  https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/
  - you probably want to add a path like this:
    `C:\Program Files\PostgreSQL\10\bin`
  - Make sure that such path actually exists, it should contain a lot of .exe
    files, including `pg_dump.exe`
  - You will need to close and reopen VSCode for PATH changes to take effect.
    - if multiple VSCode instances are open - close all of them first and then
      reopen.
