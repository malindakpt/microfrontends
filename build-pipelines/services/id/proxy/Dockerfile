# Use this to build a production image of a node backend api hosted in lerna monorepo

# Relative path to local package root - i.e. services/id/service
ARG PACKAGE_ROOT=services/id-proxy
# NPM Package command name to make production build - i.e. build:id-service:prod
ARG PACKAGE_BUILD_COMMAND=build:id-proxy:prod

# BASE
FROM node:lts AS base
WORKDIR /checkout

ARG PACKAGE_ROOT
RUN test -n "$PACKAGE_ROOT" || (echo "PACKAGE_ROOT not set" && false)

ARG PACKAGE_BUILD_COMMAND
RUN test -n "$PACKAGE_BUILD_COMMAND" || (echo "PACKAGE_BUILD_COMMAND not set" && false)

# BUILD
FROM base AS build

ARG PACKAGE_ROOT
ARG PACKAGE_BUILD_COMMAND

COPY [".", "."]
RUN npm run $PACKAGE_BUILD_COMMAND
RUN cp -rL node_modules node_modules_full
RUN rm -rf node_modules
RUN mv node_modules_full node_modules

# RELEASE
FROM node:lts-alpine
WORKDIR /app

ARG PACKAGE_ROOT
ARG PACKAGE_BUILD_COMMAND

COPY --from=build ["/checkout/node_modules", "node_modules/"]
COPY --from=build ["/checkout/$PACKAGE_ROOT/dist", "dist/"]

CMD ["node", "dist/index.js"]

EXPOSE 5500/tcp
