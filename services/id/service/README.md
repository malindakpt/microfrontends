# Instructions to launch this project for development (id-service)

**The development infrastructure is based on docker, and will be a
pre-requisite.**

## Setting up the PostgreSQL Development Server (one-time setup)

- Create a copy of the `.env.template` file on the root and name it `.env`
- Change the `.env` file values as necessary
- While inside the root of the id-service folder, run `docker-compose up -d`.
  - Please **make sure to stop/disable** any locally installed PostgreSQL,
    PgAdmin servers if the ports mentioned in the `.env` file conflicts.
  - The server root credentials will be picked up from the `.env` file
  - The data of the server will be persisted on a local volume and can be
    inspected/removed using the corresponding `docker volume` commands
- The PgAdmin Server will be running on http://localhost:8888 and can be
  accessed with credentials mentioned in the `docker-compose.yml`
  - After logging into the PgAdmin UI, you will need to 'add' and connect to the
    PostgresSQL Server. Host will always be "postgres" (service name in the
    docker-compose file), Port, Root User, Root Password are as defined in the
    `.env` file. This needs to be done only once, and the connection details
    will be persisted in the local volume of PgAdmin Server.

## Setting up the Development Database (one-time setup)

- Run `yarn install`
- Create a copy of the `.env.template` file on the root and name it `.env` (if
  not already done)
- Change the `.env` file values as necessary (if not already done)
- Run `yarn run db:reset`
  - This is a **destructive operation** and will reset the database. This only
    needs to be done the very first time running the project or when a total
    reset is needed.

## Setting up the JWT signing & verifying keys (one-time setup)

1. Create a new folder "keys" inside the "id-service" folder
2. Create two files "private.key" & "public.key" inside this new folder
3. Generate an RSA keypair and update the contents of the files accordingly.

You may use an online key generator like
https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator for Step #3 if
OpenSSH or equivalent is not installed (make sure the format is PKCS#1, key size
could be smaller i.e. 1024 bits).

## Running the Project

The ID Service will consist of multiple modules which run as their own express
apps. All of these apps will be started at once upon issuing the below command.

- Run `yarn run start:dev`
- Any pending migrations will be applied, and the GraphQL API will be accessible
  via the URLs printed in the console.

## Development-Time User Access Token Generation

The ID Service will have a development-time plugin which activates a GraphQL
mutation to generate fake user access tokens with required permissions and tags.

> NOTE: For this plugin to work, ID Service needs to be started with
> `NODE_ENV=dev` and the `db:reset` package script run, so that the
> `setupDevelopmentApplication.sql` file will be executed on the id-service DB.

This mutation will be published on the `ACCESS_MANAGEMENT` port of the ID
Service.

```js
mutation GenerateDevAccessToken {
  _DEV_generateUserAccessToken(input: {
    # // You may add items to the permissions array resembling your service's permissions (according to the endpoints-to-permission.mappings.ts of your service). Permissions specified here will not be validated and are treated as raw values for development. Permissions for multiple such services may be defined here. The serviceId must match the value defined in your .env file.
    permissionStructure: [
      {
        serviceId: "media-service",
        permissions: ["ADMIN", "MOVIE_EDITOR"]
      },
      {
        serviceId: "video-service",
        permissions: ["ADMIN", "VIDEO_EDITOR"]
      }
    ],

    # // Tags is an array of strings, and you can feed any value here.
    tags: ["MEDIA_SUPER_USER"]})
    {
      accessToken
      expiresIn
      tokenType
    }
}
```

The output will contain the corresponding accessToken with a long expiration (1
year).

```json
{
  "data": {
    "_DEV_generateUserAccessToken": {
      "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkstcHFyczV3c3lSVGUzZUd3WU8zaGItZUZTdnFFRDJzclBPdExqb05TS1kifQ.eyJ0ZW5hbnRJZCI6ImQ1MGZlZGU0LTlhNWUtNGYwNS1hZDg5LThiN2QwOTM1N2EwMiIsImFwcGxpY2F0aW9uSWQiOiI3ZGYwMzI4Ny04NGE3LTQwOGYtODIyNy1jMWFhNTk3ZjAwNWIiLCJ1c2VySWQiOiJhYWUyYzcwZC1iZmM0LTQ2MmMtYjIzYi1lYmJhMTgzZWI5OTIiLCJuYW1lIjoiTmF2eSBVc2VyIiwiZW1haWwiOiJ1c2VyQG5hdnkuY29tIiwicGVybWlzc2lvbnMiOnsibWVkaWEtc2VydmljZSI6WyJBRE1JTiIsIk1PVklFX0VESVRPUiJdLCJ2aWRlby1zZXJ2aWNlIjpbIkFETUlOIiwiVklERU9fRURJVE9SIl19LCJ0YWdzIjpbIk1FRElBX1NVUEVSX1VTRVIiXSwiaWF0IjoxNTg5NDM3NDA4LCJleHAiOjE2MjA5NzM0MDgsImF1ZCI6IioiLCJpc3MiOiJpZC1zZXJ2aWNlIiwic3ViIjoiYWFlMmM3MGQtYmZjNC00NjJjLWIyM2ItZWJiYTE4M2ViOTkyIn0.S28FjwgR09JDDM2yLY-UnDquXAy9TJBpOvdGcxT_OE9s85uH4kw_WfY7NslGFRmOnSFn5V-liwTfrJYhdIrJkGmOVXilh-kcRFHkTVycIPaVDUWBsLdPXJehH2xKxOfElA4Y4XkNMpfwshVKmAQq21aU2Y-57A3arGB-y4QIv3eJ7eWw6i1Nsv-RbKtSHnH2WWNz7uAt2ZHRb6EbjiOV3IqOek7WyPNa1CQX9tiT1heQCp_pe4vEJqTEuc8i7279_0ERcgCK_zdFsBZah_nnEIwoDekVBFVkIdY_Bf9PE62oVlfdVR3eKtyWkzW0KwXDwerYws39abVWvlG5RSTW_A",
      "expiresIn": 31536000,
      "tokenType": "Bearer"
    }
  }
}
```

The above `accessToken` can be used as the `Authorization Bearer` token in any
HTTP Request for testing authorization of GraphGL queries & mutations of the
corresponding service.

## ID Service Integration - Backend

A backend service can integrate with the ID Service by installing the
`@ax/id-guard` package and using its `setJWTProcessingMiddleware` in their
express middleware.

```js
import { setJWTProcessingMiddleware } from '@ax/id-guard';

setJWTProcessingMiddleware(
  app, // express application
  '/graphql', // route where graphql endpoints are published
  resolve(__dirname, '../keys/public.key'), // path to the public key exported from the id-service used to verify the received token. This argument will soon be obsolete when the @ax/id-guard plugin is updated to use the JWKS endpoint published by the ID Service for token verification.
);
```

This middleware will parse the `accessToken` contained in HTTP requests and
enrich a `user` object (having an interface `IAuthenticatedUser`) which can be
accessed as below.

```js
import { getAuthenticationContext } from '@ax/id-guard';

const { user } = getAuthenticationContext(req /*incoming HTTP request*/);
```

```ts
export interface IAuthenticatedUser {
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string; // An UUID to identify the user uniquely, same as userId
  name: string; // The name of the user as received from the IDP

  // All permissions for the user depending on user roles assigned to them. Permissions are always grouped by serviceId which defines the permissions. So you may need to use 'user.permissions[config.serviceId]' to access permissions specific for your service.
  permissions: {
    [key: string]: string[];
  };

  // All tags for the user depending on the user roles assigned to them. Tags are directly defined on each user role, and the tag list here will be the combined union of all user roles assigned to the user.
  tags: string[];

  // You may also access some other properties contained in the user token (i.e. tenantId, applicationId, email, etc.). Once there are more use cases the id-service will expose such fields directly as properties rather than a free KVP.
  [key: string]: any;
}
```

You may then use the properties defined in the `user` object for any
identification or authorization logic your service may require.

The ID Service is unopinionated on how each service decides to identify a
specific user (by _userId_, _name_, _email_, some combination, etc.). However if
there are certain requirements to identify a user which currently is not exposed
by the `IAuthenticatedUser` interface, please make a request to the id-service
team.
