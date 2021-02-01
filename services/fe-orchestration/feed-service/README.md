## About

This is a Piral Feed Service which will host all the MicroFrontends(Pilets).

## Setup and Startup

- create a copy of the file `.env.template` as `.env` and modify
  DATABASE-related variables, e.g. DATABASE_NAME
  - ROOT_DATABASE_CONNECTION_STRING might require different credentials
    information.
  - ROOT_DATABASE_CONNECTION_STRING must be a superuser connection string to a
    database, which is not the same as DATABASE_NAME.
    - by default it points to `template1` database and it's ok to leave it like
      that, even if `template1` is not visible in pgAdmin UI.
- Make sure that PostgreSQL is installed.
  - At the moment of writing this, currently installed version is 12.2
  - use `postgres -V` to check
- run `yarn run db:reset`
  - This step is not required if db:reset command was also ran from repository
    root.
  - this will create a new database based on your configuration and setup
    users/roles (Owner, Auth and Visitor)
  - this script can also be used to completely reset the database and related
    roles, starting cleanly again
- run `yarn run build`
  - This step will build all the project artifacts and create the `dist` folder.
- run `yarn start`

## TODOS

- Add an integrity check for the Pilets.
- Create an unpublish/disable API for Pilets.
