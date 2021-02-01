- Update `@ax/id-guard` to easily sync permissions of a service into the
  id-service
  - Expose another function which requires just the
    `EndpointsToPermissionMappings` object which syncs the permissions and
    result would be permissions which were `added` and `deleted`
  - Define new `env` vars for consumer services for id-service connection
    parameters (`tenantId, applicationId, clientId, clientSecret`) and use them
    in `@ax/id-guard` function via parameters
- Enable `JWKS` endpoint support for access token verification in `@ax/id-guard`
  - The id-service already exposes an JWKS endpoint
    (`AUTH_ENDPOINT/.well-known`) for public keys used for token signing. This
    should be used instead of reading `public.key` from a file when verifying an
    accessToken
- Change all occurrences of `current_setting` i.e.
  `current_setting('axinom.auth.user', FALSE)` to be
  `nullif(current_setting('axinom.auth.user', FALSE), '')`
  - since PostgreSQL will not 'reset' setting after transaction scope but rather
    return `''` (empty string)
  - check if affected DB columns have `NOT NULL` checks when doing this
- Separate id-service integration guide into separate documentation from the
  readme
- Update documentation with serviceAccount generation and how consumer service
  can upload permissions to id-service
