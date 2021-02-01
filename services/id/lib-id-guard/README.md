# @ax/id-guard

> PostGraphile plugin that wraps root & relational GraphQL endpoints with
> authorization resolver checks, raising Unauthorized exceptions when necessary
> depending on jwt token permissions match.

## Install

```bash
yard add @ax/id-guard
```

## Usage

Apply JWT-processing express middleware to express app during application
startup. This call must be done before PostGraphile is registered with express
app:

```ts
import { setJWTProcessingMiddleware } from '@ax/id-guard';

//...

setJWTProcessingMiddleware(
  app,
  '/graphql',
  resolve(__dirname, '../keys/public.key'),
);
```

Parameters:

- express app
- GraphQL API endpoint path
- absolute path to `public.key` file (Will be changed)

Add an AxGuardPlugin to the appendedPlugins array of PostGraphile options
object:

```ts

import { AxGuardPlugin } from '@ax/id-guard';

//...

    appendPlugins: [
      ConnectionFilterPlugin,
      PgSimplifyInflectorPlugin,
      AxGuardPlugin({
        serviceId: config.serviceId,
        permissionMappings: {
          ANONYMOUS: [],
          ASSET_QUERY: [
            'asset',
            'assets',
            'assetByNodeId'
          ],
          ASSET_MUTATE: [
            'createAsset',
            'updateAsset',
            'deleteAsset',
            'updateAssetByNodeId',
            'deleteAssetByNodeId',
          ],
        },
      }),
    ],

```

- AxGuardPlugin must be applied last
- options:
  - serviceId - id of current service. jwt token will contain a permissions
    object using this value as a key to store user roles.
  - permissionMappings - an object that maps a user role to endpoints that are
    accessible to this role.
    - ANONYMOUS array must always be present, endpoints in this array will not
      be affected by permissions check
    - Ideally, mappings should be kept separately and imported here. This is
      just an example.

setJWTProcessingMiddleware will process a Bearer token and generate 2 object in
request: user and authErrorInfo. These objects must be passed to graphql context
of each request, so that AxGuardPlugin will be able to process them.

To do that, additionalGraphQLContextFromRequest function of PostGraphile options
must be added or modified. getAuthenticationContext function is exposed to
simplify retrieval of said objects:

```ts
import { getAuthenticationContext } from '@ax/id-guard';

//...

    async additionalGraphQLContextFromRequest(req) {
      const { user, authErrorInfo } = getAuthenticationContext(req);
      return { user, authErrorInfo };
    },
```

There might be a need to pass user information to PostgreSQL, e.g. to set
created_by/updated_by/etc.. properties with username. getAuthenticationContext
function is useful for that as well:

```ts
    async pgSettings(req) {
      const { user } = getAuthenticationContext(req);
      return {
        role: config.dbVisitorName,
        'ax.claims.username': user?.sub,
      };
    },
```

## License

UNLICENSED © [Axinom](https://github.com/Axinom)
