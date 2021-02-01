# Prerequisites
- yarn needs to be installed globally - to do so, run `npm i -g yarn` once.

# Startup instructions

- run `yarn` to bootstrap all libs and services.
- run `yarn apply-templates` to get the default configuration (.env files, etc)
  generated.
- [suggested]: run `yarn db:start` to start docker containers for PostgreSQL and
  for pgAdmin
- [potentially]: run `yarn build` to (re-) build the project
- run `yarn db:reset` to setup (or reset) back end databases
- run `yarn start` to start the services
- media/video service might fail when the project with DB is initially created.
  The GraphQL types for subscriptions are generated too late and thus the code
  in subscriptions might fail. See
  https://github.com/graphile/graphile-engine/issues/575 Solution: in the file
  postgraphile.middleware.ts remove the `SubscriptionsPlugin` from the
  `appendPlugins` section. Run `yarn media build`, `yarn media start`, add the
  plugin back, run again build and start.
