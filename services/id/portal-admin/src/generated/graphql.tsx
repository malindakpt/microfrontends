import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any,
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any,
  /** 
 * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
 */
  Datetime: Date,
};

export type Application = {
   __typename?: 'Application',
  id: Scalars['UUID'],
  name: Scalars['String'],
  allowedOrigins?: Maybe<Array<Maybe<Scalars['String']>>>,
  interimAdministratorEmail: Scalars['String'],
  enabled: Scalars['Boolean'],
  tenantId: Scalars['UUID'],
  createdAt: Scalars['Datetime'],
  createdBy: Scalars['String'],
  updatedAt: Scalars['Datetime'],
  updatedBy: Scalars['String'],
  /** Reads and enables pagination through a set of `IdpConfiguration`. */
  idpConfigurations: IdpConfigurationsConnection,
};


export type ApplicationIdpConfigurationsArgs = {
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['Cursor']>,
  after?: Maybe<Scalars['Cursor']>,
  orderBy?: Maybe<Array<IdpConfigurationsOrderBy>>,
  condition?: Maybe<IdpConfigurationCondition>,
  filter?: Maybe<IdpConfigurationFilter>
};

/** 
 * A condition to be used against `Application` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ApplicationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>,
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `allowedOrigins` field. */
  allowedOrigins?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Checks for equality with the object’s `interimAdministratorEmail` field. */
  interimAdministratorEmail?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `enabled` field. */
  enabled?: Maybe<Scalars['Boolean']>,
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>,
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>,
};

/** A filter to be used against `Application` object types. All fields are combined with a logical ‘and.’ */
export type ApplicationFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>,
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>,
  /** Filter by the object’s `allowedOrigins` field. */
  allowedOrigins?: Maybe<StringListFilter>,
  /** Filter by the object’s `interimAdministratorEmail` field. */
  interimAdministratorEmail?: Maybe<StringFilter>,
  /** Filter by the object’s `enabled` field. */
  enabled?: Maybe<BooleanFilter>,
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>,
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>,
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>,
  /** Filter by the object’s `idpConfigurations` relation. */
  idpConfigurations?: Maybe<ApplicationToManyIdpConfigurationFilter>,
  /** Some related `idpConfigurations` exist. */
  idpConfigurationsExist?: Maybe<Scalars['Boolean']>,
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ApplicationFilter>>,
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ApplicationFilter>>,
  /** Negates the expression. */
  not?: Maybe<ApplicationFilter>,
};

/** An input for mutations affecting `Application` */
export type ApplicationInput = {
  name: Scalars['String'],
  allowedOrigins?: Maybe<Array<Maybe<Scalars['String']>>>,
  interimAdministratorEmail: Scalars['String'],
};

/** Represents an update to a `Application`. Fields that are set will be updated. */
export type ApplicationPatch = {
  name?: Maybe<Scalars['String']>,
  allowedOrigins?: Maybe<Array<Maybe<Scalars['String']>>>,
  interimAdministratorEmail?: Maybe<Scalars['String']>,
  enabled?: Maybe<Scalars['Boolean']>,
};

/** A connection to a list of `Application` values. */
export type ApplicationsConnection = {
   __typename?: 'ApplicationsConnection',
  /** A list of `Application` objects. */
  nodes: Array<Maybe<Application>>,
  /** A list of edges which contains the `Application` and cursor to aid in pagination. */
  edges: Array<ApplicationsEdge>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** The count of *all* `Application` you could get from the connection. */
  totalCount: Scalars['Int'],
};

/** A `Application` edge in the connection. */
export type ApplicationsEdge = {
   __typename?: 'ApplicationsEdge',
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>,
  /** The `Application` at the end of the edge. */
  node?: Maybe<Application>,
};

/** Methods to use when ordering `Application`. */
export enum ApplicationsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  AllowedOriginsAsc = 'ALLOWED_ORIGINS_ASC',
  AllowedOriginsDesc = 'ALLOWED_ORIGINS_DESC',
  InterimAdministratorEmailAsc = 'INTERIM_ADMINISTRATOR_EMAIL_ASC',
  InterimAdministratorEmailDesc = 'INTERIM_ADMINISTRATOR_EMAIL_DESC',
  EnabledAsc = 'ENABLED_ASC',
  EnabledDesc = 'ENABLED_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CreatedByAsc = 'CREATED_BY_ASC',
  CreatedByDesc = 'CREATED_BY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UpdatedByAsc = 'UPDATED_BY_ASC',
  UpdatedByDesc = 'UPDATED_BY_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A filter to be used against many `IdpConfiguration` object types. All fields are combined with a logical ‘and.’ */
export type ApplicationToManyIdpConfigurationFilter = {
  /** Every related `IdpConfiguration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<IdpConfigurationFilter>,
  /** Some related `IdpConfiguration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<IdpConfigurationFilter>,
  /** No related `IdpConfiguration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<IdpConfigurationFilter>,
};

export type AuthenticateTenantAdminInput = {
  tenantId: Scalars['UUID'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type AuthenticateTenantAdminPayload = {
   __typename?: 'AuthenticateTenantAdminPayload',
  /** Name of the Tenant */
  tenantName: Scalars['String'],
  /** Name of the Tenant Administrator */
  tenantAdminName: Scalars['String'],
  /** Access Token containing permissions of the Tenant Admin */
  accessToken: Scalars['String'],
  /** Access Token type to use when making client requests */
  tokenType: Scalars['String'],
  /** Access Token expiration timeout */
  expiresIn: Scalars['Int'],
  /** System generated password has been changed */
  passwordChanged: Scalars['Boolean'],
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Boolean']>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Boolean']>,
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Boolean']>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Boolean']>,
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Boolean']>>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Boolean']>>,
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Boolean']>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Boolean']>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Boolean']>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Boolean']>,
};

export type ChangeTenantAdminPasswordInput = {
  password: Scalars['String'],
  newPassword: Scalars['String'],
};

/** All input for the create `Application` mutation. */
export type CreateApplicationInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Application` to be created by this mutation. */
  application: ApplicationInput,
};

/** The output of our create `Application` mutation. */
export type CreateApplicationPayload = {
   __typename?: 'CreateApplicationPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Application` that was created by this mutation. */
  application?: Maybe<Application>,
  /** An edge for our `Application`. May be used by Relay 1. */
  applicationEdge?: Maybe<ApplicationsEdge>,
};


/** The output of our create `Application` mutation. */
export type CreateApplicationPayloadApplicationEdgeArgs = {
  orderBy?: Maybe<Array<ApplicationsOrderBy>>
};

/** All input for the create `IdpConfiguration` mutation. */
export type CreateIdpConfigurationInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `IdpConfiguration` to be created by this mutation. */
  idpConfiguration: IdpConfigurationInput,
};

/** The output of our create `IdpConfiguration` mutation. */
export type CreateIdpConfigurationPayload = {
   __typename?: 'CreateIdpConfigurationPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `IdpConfiguration` that was created by this mutation. */
  idpConfiguration?: Maybe<IdpConfiguration>,
  /** Reads a single `Application` that is related to this `IdpConfiguration`. */
  application?: Maybe<Application>,
  /** An edge for our `IdpConfiguration`. May be used by Relay 1. */
  idpConfigurationEdge?: Maybe<IdpConfigurationsEdge>,
};


/** The output of our create `IdpConfiguration` mutation. */
export type CreateIdpConfigurationPayloadIdpConfigurationEdgeArgs = {
  orderBy?: Maybe<Array<IdpConfigurationsOrderBy>>
};



/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Datetime']>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Datetime']>,
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Datetime']>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Datetime']>,
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Datetime']>>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Datetime']>>,
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Datetime']>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Datetime']>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>,
};

/** All input for the `deleteApplication` mutation. */
export type DeleteApplicationInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  id: Scalars['UUID'],
};

/** The output of our delete `Application` mutation. */
export type DeleteApplicationPayload = {
   __typename?: 'DeleteApplicationPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Application` that was deleted by this mutation. */
  application?: Maybe<Application>,
  deletedApplicationNodeId?: Maybe<Scalars['ID']>,
  /** An edge for our `Application`. May be used by Relay 1. */
  applicationEdge?: Maybe<ApplicationsEdge>,
};


/** The output of our delete `Application` mutation. */
export type DeleteApplicationPayloadApplicationEdgeArgs = {
  orderBy?: Maybe<Array<ApplicationsOrderBy>>
};

/** All input for the `deleteIdpConfiguration` mutation. */
export type DeleteIdpConfigurationInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  id: Scalars['UUID'],
};

/** The output of our delete `IdpConfiguration` mutation. */
export type DeleteIdpConfigurationPayload = {
   __typename?: 'DeleteIdpConfigurationPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `IdpConfiguration` that was deleted by this mutation. */
  idpConfiguration?: Maybe<IdpConfiguration>,
  deletedIdpConfigurationNodeId?: Maybe<Scalars['ID']>,
  /** Reads a single `Application` that is related to this `IdpConfiguration`. */
  application?: Maybe<Application>,
  /** An edge for our `IdpConfiguration`. May be used by Relay 1. */
  idpConfigurationEdge?: Maybe<IdpConfigurationsEdge>,
};


/** The output of our delete `IdpConfiguration` mutation. */
export type DeleteIdpConfigurationPayloadIdpConfigurationEdgeArgs = {
  orderBy?: Maybe<Array<IdpConfigurationsOrderBy>>
};

export enum IdentityProvider {
  AzureAd = 'AZURE_AD',
  AxAuth = 'AX_AUTH',
  Google = 'GOOGLE'
}

/** A filter to be used against IdentityProvider fields. All fields are combined with a logical ‘and.’ */
export type IdentityProviderFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<IdentityProvider>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<IdentityProvider>,
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<IdentityProvider>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<IdentityProvider>,
  /** Included in the specified list. */
  in?: Maybe<Array<IdentityProvider>>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<IdentityProvider>>,
  /** Less than the specified value. */
  lessThan?: Maybe<IdentityProvider>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<IdentityProvider>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<IdentityProvider>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<IdentityProvider>,
};

export type IdpConfiguration = {
   __typename?: 'IdpConfiguration',
  id: Scalars['UUID'],
  idpId: IdentityProvider,
  discoveryDocumentUrl: Scalars['String'],
  clientId: Scalars['String'],
  clientSecret: Scalars['String'],
  scopes: Array<Maybe<Scalars['String']>>,
  enabled: Scalars['Boolean'],
  tenantId: Scalars['UUID'],
  applicationId: Scalars['UUID'],
  createdAt: Scalars['Datetime'],
  createdBy: Scalars['String'],
  updatedAt: Scalars['Datetime'],
  updatedBy: Scalars['String'],
  /** Reads a single `Application` that is related to this `IdpConfiguration`. */
  application?: Maybe<Application>,
};

/** 
 * A condition to be used against `IdpConfiguration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type IdpConfigurationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>,
  /** Checks for equality with the object’s `idpId` field. */
  idpId?: Maybe<IdentityProvider>,
  /** Checks for equality with the object’s `discoveryDocumentUrl` field. */
  discoveryDocumentUrl?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `clientId` field. */
  clientId?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `clientSecret` field. */
  clientSecret?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `scopes` field. */
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Checks for equality with the object’s `enabled` field. */
  enabled?: Maybe<Scalars['Boolean']>,
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>,
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>,
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>,
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>,
};

/** A filter to be used against `IdpConfiguration` object types. All fields are combined with a logical ‘and.’ */
export type IdpConfigurationFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>,
  /** Filter by the object’s `idpId` field. */
  idpId?: Maybe<IdentityProviderFilter>,
  /** Filter by the object’s `discoveryDocumentUrl` field. */
  discoveryDocumentUrl?: Maybe<StringFilter>,
  /** Filter by the object’s `clientId` field. */
  clientId?: Maybe<StringFilter>,
  /** Filter by the object’s `clientSecret` field. */
  clientSecret?: Maybe<StringFilter>,
  /** Filter by the object’s `scopes` field. */
  scopes?: Maybe<StringListFilter>,
  /** Filter by the object’s `enabled` field. */
  enabled?: Maybe<BooleanFilter>,
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>,
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>,
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>,
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>,
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>,
  /** Filter by the object’s `application` relation. */
  application?: Maybe<ApplicationFilter>,
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<IdpConfigurationFilter>>,
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<IdpConfigurationFilter>>,
  /** Negates the expression. */
  not?: Maybe<IdpConfigurationFilter>,
};

/** An input for mutations affecting `IdpConfiguration` */
export type IdpConfigurationInput = {
  idpId: IdentityProvider,
  discoveryDocumentUrl: Scalars['String'],
  clientId: Scalars['String'],
  clientSecret: Scalars['String'],
  scopes: Array<Maybe<Scalars['String']>>,
  applicationId: Scalars['UUID'],
};

/** Represents an update to a `IdpConfiguration`. Fields that are set will be updated. */
export type IdpConfigurationPatch = {
  discoveryDocumentUrl?: Maybe<Scalars['String']>,
  clientId?: Maybe<Scalars['String']>,
  clientSecret?: Maybe<Scalars['String']>,
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>,
  enabled?: Maybe<Scalars['Boolean']>,
};

/** A connection to a list of `IdpConfiguration` values. */
export type IdpConfigurationsConnection = {
   __typename?: 'IdpConfigurationsConnection',
  /** A list of `IdpConfiguration` objects. */
  nodes: Array<Maybe<IdpConfiguration>>,
  /** A list of edges which contains the `IdpConfiguration` and cursor to aid in pagination. */
  edges: Array<IdpConfigurationsEdge>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** The count of *all* `IdpConfiguration` you could get from the connection. */
  totalCount: Scalars['Int'],
};

/** A `IdpConfiguration` edge in the connection. */
export type IdpConfigurationsEdge = {
   __typename?: 'IdpConfigurationsEdge',
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>,
  /** The `IdpConfiguration` at the end of the edge. */
  node?: Maybe<IdpConfiguration>,
};

/** Methods to use when ordering `IdpConfiguration`. */
export enum IdpConfigurationsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IdpIdAsc = 'IDP_ID_ASC',
  IdpIdDesc = 'IDP_ID_DESC',
  DiscoveryDocumentUrlAsc = 'DISCOVERY_DOCUMENT_URL_ASC',
  DiscoveryDocumentUrlDesc = 'DISCOVERY_DOCUMENT_URL_DESC',
  ClientIdAsc = 'CLIENT_ID_ASC',
  ClientIdDesc = 'CLIENT_ID_DESC',
  ClientSecretAsc = 'CLIENT_SECRET_ASC',
  ClientSecretDesc = 'CLIENT_SECRET_DESC',
  ScopesAsc = 'SCOPES_ASC',
  ScopesDesc = 'SCOPES_DESC',
  EnabledAsc = 'ENABLED_ASC',
  EnabledDesc = 'ENABLED_DESC',
  TenantIdAsc = 'TENANT_ID_ASC',
  TenantIdDesc = 'TENANT_ID_DESC',
  ApplicationIdAsc = 'APPLICATION_ID_ASC',
  ApplicationIdDesc = 'APPLICATION_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CreatedByAsc = 'CREATED_BY_ASC',
  CreatedByDesc = 'CREATED_BY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UpdatedByAsc = 'UPDATED_BY_ASC',
  UpdatedByDesc = 'UPDATED_BY_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type IdpScope = {
   __typename?: 'IdpScope',
  id: Scalars['UUID'],
  idpId: IdentityProvider,
  scopeName: Scalars['String'],
  required: Scalars['Boolean'],
};

/** 
 * A condition to be used against `IdpScope` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type IdpScopeCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>,
  /** Checks for equality with the object’s `idpId` field. */
  idpId?: Maybe<IdentityProvider>,
  /** Checks for equality with the object’s `scopeName` field. */
  scopeName?: Maybe<Scalars['String']>,
  /** Checks for equality with the object’s `required` field. */
  required?: Maybe<Scalars['Boolean']>,
};

/** A filter to be used against `IdpScope` object types. All fields are combined with a logical ‘and.’ */
export type IdpScopeFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>,
  /** Filter by the object’s `idpId` field. */
  idpId?: Maybe<IdentityProviderFilter>,
  /** Filter by the object’s `scopeName` field. */
  scopeName?: Maybe<StringFilter>,
  /** Filter by the object’s `required` field. */
  required?: Maybe<BooleanFilter>,
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<IdpScopeFilter>>,
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<IdpScopeFilter>>,
  /** Negates the expression. */
  not?: Maybe<IdpScopeFilter>,
};

/** A connection to a list of `IdpScope` values. */
export type IdpScopesConnection = {
   __typename?: 'IdpScopesConnection',
  /** A list of `IdpScope` objects. */
  nodes: Array<Maybe<IdpScope>>,
  /** A list of edges which contains the `IdpScope` and cursor to aid in pagination. */
  edges: Array<IdpScopesEdge>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** The count of *all* `IdpScope` you could get from the connection. */
  totalCount: Scalars['Int'],
};

/** A `IdpScope` edge in the connection. */
export type IdpScopesEdge = {
   __typename?: 'IdpScopesEdge',
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>,
  /** The `IdpScope` at the end of the edge. */
  node?: Maybe<IdpScope>,
};

/** Methods to use when ordering `IdpScope`. */
export enum IdpScopesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IdpIdAsc = 'IDP_ID_ASC',
  IdpIdDesc = 'IDP_ID_DESC',
  ScopeNameAsc = 'SCOPE_NAME_ASC',
  ScopeNameDesc = 'SCOPE_NAME_DESC',
  RequiredAsc = 'REQUIRED_ASC',
  RequiredDesc = 'REQUIRED_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
   __typename?: 'Mutation',
  /** Creates a single `Application`. */
  createApplication?: Maybe<CreateApplicationPayload>,
  /** Creates a single `IdpConfiguration`. */
  createIdpConfiguration?: Maybe<CreateIdpConfigurationPayload>,
  /** Updates a single `Application` using a unique key and a patch. */
  updateApplication?: Maybe<UpdateApplicationPayload>,
  /** Updates a single `IdpConfiguration` using a unique key and a patch. */
  updateIdpConfiguration?: Maybe<UpdateIdpConfigurationPayload>,
  /** Deletes a single `Application` using a unique key. */
  deleteApplication?: Maybe<DeleteApplicationPayload>,
  /** Deletes a single `IdpConfiguration` using a unique key. */
  deleteIdpConfiguration?: Maybe<DeleteIdpConfigurationPayload>,
  /** Authenticates a Identity Service Tenant Admin */
  authenticateTenantAdmin: AuthenticateTenantAdminPayload,
  /** Change password of a Identity Service Tenant Admin */
  changeTenantAdminPassword: AuthenticateTenantAdminPayload,
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateIdpConfigurationArgs = {
  input: CreateIdpConfigurationInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateIdpConfigurationArgs = {
  input: UpdateIdpConfigurationInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteApplicationArgs = {
  input: DeleteApplicationInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteIdpConfigurationArgs = {
  input: DeleteIdpConfigurationInput
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateTenantAdminArgs = {
  input?: Maybe<AuthenticateTenantAdminInput>
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationChangeTenantAdminPasswordArgs = {
  input?: Maybe<ChangeTenantAdminPasswordInput>
};

/** Information about pagination in a connection. */
export type PageInfo = {
   __typename?: 'PageInfo',
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'],
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'],
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>,
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>,
};

/** The root query type which gives access points into the data universe. */
export type Query = {
   __typename?: 'Query',
  /** 
 * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
 */
  query: Query,
  /** Reads and enables pagination through a set of `Application`. */
  applications?: Maybe<ApplicationsConnection>,
  /** Reads and enables pagination through a set of `IdpConfiguration`. */
  idpConfigurations?: Maybe<IdpConfigurationsConnection>,
  /** Reads and enables pagination through a set of `IdpScope`. */
  idpScopes?: Maybe<IdpScopesConnection>,
  application?: Maybe<Application>,
  idpConfiguration?: Maybe<IdpConfiguration>,
  idpScope?: Maybe<IdpScope>,
};


/** The root query type which gives access points into the data universe. */
export type QueryApplicationsArgs = {
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['Cursor']>,
  after?: Maybe<Scalars['Cursor']>,
  orderBy?: Maybe<Array<ApplicationsOrderBy>>,
  condition?: Maybe<ApplicationCondition>,
  filter?: Maybe<ApplicationFilter>
};


/** The root query type which gives access points into the data universe. */
export type QueryIdpConfigurationsArgs = {
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['Cursor']>,
  after?: Maybe<Scalars['Cursor']>,
  orderBy?: Maybe<Array<IdpConfigurationsOrderBy>>,
  condition?: Maybe<IdpConfigurationCondition>,
  filter?: Maybe<IdpConfigurationFilter>
};


/** The root query type which gives access points into the data universe. */
export type QueryIdpScopesArgs = {
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['Cursor']>,
  after?: Maybe<Scalars['Cursor']>,
  orderBy?: Maybe<Array<IdpScopesOrderBy>>,
  condition?: Maybe<IdpScopeCondition>,
  filter?: Maybe<IdpScopeFilter>
};


/** The root query type which gives access points into the data universe. */
export type QueryApplicationArgs = {
  id: Scalars['UUID']
};


/** The root query type which gives access points into the data universe. */
export type QueryIdpConfigurationArgs = {
  id: Scalars['UUID']
};


/** The root query type which gives access points into the data universe. */
export type QueryIdpScopeArgs = {
  id: Scalars['UUID']
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>,
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>,
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>,
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>,
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>,
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>,
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>,
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>,
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>,
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>,
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>,
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>,
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>,
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>,
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>,
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>,
  /** 
 * Matches the specified pattern (case-sensitive). An underscore (_) matches any
   * single character; a percent sign (%) matches any sequence of zero or more characters.
 */
  like?: Maybe<Scalars['String']>,
  /** 
 * Does not match the specified pattern (case-sensitive). An underscore (_)
   * matches any single character; a percent sign (%) matches any sequence of zero
   * or more characters.
 */
  notLike?: Maybe<Scalars['String']>,
  /** 
 * Matches the specified pattern (case-insensitive). An underscore (_) matches
   * any single character; a percent sign (%) matches any sequence of zero or more characters.
 */
  likeInsensitive?: Maybe<Scalars['String']>,
  /** 
 * Does not match the specified pattern (case-insensitive). An underscore (_)
   * matches any single character; a percent sign (%) matches any sequence of zero
   * or more characters.
 */
  notLikeInsensitive?: Maybe<Scalars['String']>,
  /** Matches the specified pattern using the SQL standard's definition of a regular expression. */
  similarTo?: Maybe<Scalars['String']>,
  /** Does not match the specified pattern using the SQL standard's definition of a regular expression. */
  notSimilarTo?: Maybe<Scalars['String']>,
};

/** A filter to be used against String List fields. All fields are combined with a logical ‘and.’ */
export type StringListFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Less than the specified value. */
  lessThan?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Contains the specified list of values. */
  contains?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Contained by the specified list of values. */
  containedBy?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Overlaps the specified list of values. */
  overlaps?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** Any array item is equal to the specified value. */
  anyEqualTo?: Maybe<Scalars['String']>,
  /** Any array item is not equal to the specified value. */
  anyNotEqualTo?: Maybe<Scalars['String']>,
  /** Any array item is less than the specified value. */
  anyLessThan?: Maybe<Scalars['String']>,
  /** Any array item is less than or equal to the specified value. */
  anyLessThanOrEqualTo?: Maybe<Scalars['String']>,
  /** Any array item is greater than the specified value. */
  anyGreaterThan?: Maybe<Scalars['String']>,
  /** Any array item is greater than or equal to the specified value. */
  anyGreaterThanOrEqualTo?: Maybe<Scalars['String']>,
};

/** All input for the `updateApplication` mutation. */
export type UpdateApplicationInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** An object where the defined keys will be set on the `Application` being updated. */
  patch: ApplicationPatch,
  id: Scalars['UUID'],
};

/** The output of our update `Application` mutation. */
export type UpdateApplicationPayload = {
   __typename?: 'UpdateApplicationPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `Application` that was updated by this mutation. */
  application?: Maybe<Application>,
  /** An edge for our `Application`. May be used by Relay 1. */
  applicationEdge?: Maybe<ApplicationsEdge>,
};


/** The output of our update `Application` mutation. */
export type UpdateApplicationPayloadApplicationEdgeArgs = {
  orderBy?: Maybe<Array<ApplicationsOrderBy>>
};

/** All input for the `updateIdpConfiguration` mutation. */
export type UpdateIdpConfigurationInput = {
  /** 
 * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** An object where the defined keys will be set on the `IdpConfiguration` being updated. */
  patch: IdpConfigurationPatch,
  id: Scalars['UUID'],
};

/** The output of our update `IdpConfiguration` mutation. */
export type UpdateIdpConfigurationPayload = {
   __typename?: 'UpdateIdpConfigurationPayload',
  /** 
 * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
 */
  clientMutationId?: Maybe<Scalars['String']>,
  /** The `IdpConfiguration` that was updated by this mutation. */
  idpConfiguration?: Maybe<IdpConfiguration>,
  /** Reads a single `Application` that is related to this `IdpConfiguration`. */
  application?: Maybe<Application>,
  /** An edge for our `IdpConfiguration`. May be used by Relay 1. */
  idpConfigurationEdge?: Maybe<IdpConfigurationsEdge>,
};


/** The output of our update `IdpConfiguration` mutation. */
export type UpdateIdpConfigurationPayloadIdpConfigurationEdgeArgs = {
  orderBy?: Maybe<Array<IdpConfigurationsOrderBy>>
};


/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>,
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['UUID']>,
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['UUID']>,
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['UUID']>,
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['UUID']>,
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['UUID']>>,
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['UUID']>>,
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['UUID']>,
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['UUID']>,
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['UUID']>,
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['UUID']>,
};

export type ChangeTenantAdminPasswordMutationVariables = {
  dto: ChangeTenantAdminPasswordInput
};


export type ChangeTenantAdminPasswordMutation = (
  { __typename?: 'Mutation' }
  & { changeTenantAdminPassword: (
    { __typename?: 'AuthenticateTenantAdminPayload' }
    & Pick<AuthenticateTenantAdminPayload, 'accessToken' | 'tenantAdminName' | 'tenantName'>
  ) }
);

export type AuthenticateTenantAdminMutationVariables = {
  input: AuthenticateTenantAdminInput
};


export type AuthenticateTenantAdminMutation = (
  { __typename?: 'Mutation' }
  & { authenticateTenantAdmin: (
    { __typename?: 'AuthenticateTenantAdminPayload' }
    & Pick<AuthenticateTenantAdminPayload, 'accessToken' | 'tenantAdminName' | 'passwordChanged' | 'tenantName' | 'expiresIn'>
  ) }
);

export type CreateApplicationMutationVariables = {
  input: CreateApplicationInput
};


export type CreateApplicationMutation = (
  { __typename?: 'Mutation' }
  & { createApplication: Maybe<(
    { __typename?: 'CreateApplicationPayload' }
    & { application: Maybe<(
      { __typename?: 'Application' }
      & Pick<Application, 'id' | 'tenantId' | 'name' | 'allowedOrigins' | 'interimAdministratorEmail' | 'enabled' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>
    )> }
  )> }
);

export type ApplicationQueryVariables = {
  id: Scalars['UUID']
};


export type ApplicationQuery = (
  { __typename?: 'Query' }
  & { application: Maybe<(
    { __typename?: 'Application' }
    & Pick<Application, 'id' | 'tenantId' | 'name' | 'allowedOrigins' | 'interimAdministratorEmail' | 'enabled' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>
  )> }
);

export type UpdateApplicationMutationVariables = {
  input: UpdateApplicationInput
};


export type UpdateApplicationMutation = (
  { __typename?: 'Mutation' }
  & { updateApplication: Maybe<(
    { __typename?: 'UpdateApplicationPayload' }
    & Pick<UpdateApplicationPayload, 'clientMutationId'>
    & { application: Maybe<(
      { __typename?: 'Application' }
      & Pick<Application, 'name' | 'allowedOrigins' | 'interimAdministratorEmail' | 'enabled' | 'updatedAt' | 'updatedBy'>
    )> }
  )> }
);

export type DeleteApplicationMutationVariables = {
  input: DeleteApplicationInput
};


export type DeleteApplicationMutation = (
  { __typename?: 'Mutation' }
  & { deleteApplication: Maybe<(
    { __typename?: 'DeleteApplicationPayload' }
    & Pick<DeleteApplicationPayload, 'clientMutationId'>
  )> }
);

export type ApplicationsWithDataQueryVariables = {
  filter?: Maybe<ApplicationFilter>
};


export type ApplicationsWithDataQuery = (
  { __typename?: 'Query' }
  & { filtered: Maybe<(
    { __typename?: 'ApplicationsConnection' }
    & Pick<ApplicationsConnection, 'totalCount'>
    & { nodes: Array<Maybe<(
      { __typename?: 'Application' }
      & Pick<Application, 'id' | 'name' | 'interimAdministratorEmail' | 'enabled' | 'createdAt' | 'updatedAt'>
    )>> }
  )>, nonFilterd: Maybe<(
    { __typename?: 'ApplicationsConnection' }
    & Pick<ApplicationsConnection, 'totalCount'>
  )> }
);

export type ApplicationsQueryVariables = {};


export type ApplicationsQuery = (
  { __typename?: 'Query' }
  & { applications: Maybe<(
    { __typename?: 'ApplicationsConnection' }
    & Pick<ApplicationsConnection, 'totalCount'>
  )> }
);

export type IdpConfigurationsQueryVariables = {
  idpConfigurationCondition?: Maybe<IdpConfigurationCondition>,
  idpScopeFilter?: Maybe<IdpScopeFilter>
};


export type IdpConfigurationsQuery = (
  { __typename?: 'Query' }
  & { configurations: Maybe<(
    { __typename?: 'IdpConfigurationsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'IdpConfiguration' }
      & Pick<IdpConfiguration, 'id' | 'discoveryDocumentUrl' | 'clientId' | 'clientSecret' | 'scopes' | 'enabled' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>
    )>> }
  )>, scopes: Maybe<(
    { __typename?: 'IdpScopesConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'IdpScope' }
      & Pick<IdpScope, 'scopeName' | 'required'>
    )>> }
  )> }
);

export type CreateIdpConfigurationMutationVariables = {
  input: CreateIdpConfigurationInput
};


export type CreateIdpConfigurationMutation = (
  { __typename?: 'Mutation' }
  & { createIdpConfiguration: Maybe<(
    { __typename?: 'CreateIdpConfigurationPayload' }
    & Pick<CreateIdpConfigurationPayload, 'clientMutationId'>
  )> }
);

export type UpdateIdpConfigurationMutationVariables = {
  input: UpdateIdpConfigurationInput
};


export type UpdateIdpConfigurationMutation = (
  { __typename?: 'Mutation' }
  & { updateIdpConfiguration: Maybe<(
    { __typename?: 'UpdateIdpConfigurationPayload' }
    & { idpConfiguration: Maybe<(
      { __typename?: 'IdpConfiguration' }
      & Pick<IdpConfiguration, 'discoveryDocumentUrl' | 'clientId' | 'clientSecret' | 'scopes' | 'enabled' | 'updatedAt' | 'updatedBy'>
    )> }
  )> }
);

export type DeleteIdpConfigurationMutationVariables = {
  input: DeleteIdpConfigurationInput
};


export type DeleteIdpConfigurationMutation = (
  { __typename?: 'Mutation' }
  & { deleteIdpConfiguration: Maybe<(
    { __typename?: 'DeleteIdpConfigurationPayload' }
    & Pick<DeleteIdpConfigurationPayload, 'clientMutationId'>
  )> }
);

export type IdpConfigurationsCountQueryVariables = {
  condition?: Maybe<IdpConfigurationCondition>
};


export type IdpConfigurationsCountQuery = (
  { __typename?: 'Query' }
  & { idpConfigurations: Maybe<(
    { __typename?: 'IdpConfigurationsConnection' }
    & Pick<IdpConfigurationsConnection, 'totalCount'>
    & { nodes: Array<Maybe<(
      { __typename?: 'IdpConfiguration' }
      & Pick<IdpConfiguration, 'enabled'>
    )>> }
  )> }
);


export const ChangeTenantAdminPasswordDocument = gql`
    mutation ChangeTenantAdminPassword($dto: ChangeTenantAdminPasswordInput!) {
  changeTenantAdminPassword(input: $dto) {
    accessToken
    tenantAdminName
    tenantName
  }
}
    `;
export type ChangeTenantAdminPasswordMutationFn = ApolloReactCommon.MutationFunction<ChangeTenantAdminPasswordMutation, ChangeTenantAdminPasswordMutationVariables>;

/**
 * __useChangeTenantAdminPasswordMutation__
 *
 * To run a mutation, you first call `useChangeTenantAdminPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeTenantAdminPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeTenantAdminPasswordMutation, { data, loading, error }] = useChangeTenantAdminPasswordMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useChangeTenantAdminPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeTenantAdminPasswordMutation, ChangeTenantAdminPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangeTenantAdminPasswordMutation, ChangeTenantAdminPasswordMutationVariables>(ChangeTenantAdminPasswordDocument, baseOptions);
      }
export type ChangeTenantAdminPasswordMutationHookResult = ReturnType<typeof useChangeTenantAdminPasswordMutation>;
export type ChangeTenantAdminPasswordMutationResult = ApolloReactCommon.MutationResult<ChangeTenantAdminPasswordMutation>;
export type ChangeTenantAdminPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangeTenantAdminPasswordMutation, ChangeTenantAdminPasswordMutationVariables>;
export const AuthenticateTenantAdminDocument = gql`
    mutation AuthenticateTenantAdmin($input: AuthenticateTenantAdminInput!) {
  authenticateTenantAdmin(input: $input) {
    accessToken
    tenantAdminName
    passwordChanged
    tenantName
    expiresIn
  }
}
    `;
export type AuthenticateTenantAdminMutationFn = ApolloReactCommon.MutationFunction<AuthenticateTenantAdminMutation, AuthenticateTenantAdminMutationVariables>;

/**
 * __useAuthenticateTenantAdminMutation__
 *
 * To run a mutation, you first call `useAuthenticateTenantAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateTenantAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateTenantAdminMutation, { data, loading, error }] = useAuthenticateTenantAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthenticateTenantAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthenticateTenantAdminMutation, AuthenticateTenantAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthenticateTenantAdminMutation, AuthenticateTenantAdminMutationVariables>(AuthenticateTenantAdminDocument, baseOptions);
      }
export type AuthenticateTenantAdminMutationHookResult = ReturnType<typeof useAuthenticateTenantAdminMutation>;
export type AuthenticateTenantAdminMutationResult = ApolloReactCommon.MutationResult<AuthenticateTenantAdminMutation>;
export type AuthenticateTenantAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthenticateTenantAdminMutation, AuthenticateTenantAdminMutationVariables>;
export const CreateApplicationDocument = gql`
    mutation CreateApplication($input: CreateApplicationInput!) {
  createApplication(input: $input) {
    application {
      id
      tenantId
      name
      allowedOrigins
      interimAdministratorEmail
      enabled
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
}
    `;
export type CreateApplicationMutationFn = ApolloReactCommon.MutationFunction<CreateApplicationMutation, CreateApplicationMutationVariables>;

/**
 * __useCreateApplicationMutation__
 *
 * To run a mutation, you first call `useCreateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApplicationMutation, { data, loading, error }] = useCreateApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateApplicationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateApplicationMutation, CreateApplicationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateApplicationMutation, CreateApplicationMutationVariables>(CreateApplicationDocument, baseOptions);
      }
export type CreateApplicationMutationHookResult = ReturnType<typeof useCreateApplicationMutation>;
export type CreateApplicationMutationResult = ApolloReactCommon.MutationResult<CreateApplicationMutation>;
export type CreateApplicationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateApplicationMutation, CreateApplicationMutationVariables>;
export const ApplicationDocument = gql`
    query Application($id: UUID!) {
  application(id: $id) {
    id
    tenantId
    name
    allowedOrigins
    interimAdministratorEmail
    enabled
    createdAt
    createdBy
    updatedAt
    updatedBy
  }
}
    `;

/**
 * __useApplicationQuery__
 *
 * To run a query within a React component, call `useApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApplicationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ApplicationQuery, ApplicationQueryVariables>) {
        return ApolloReactHooks.useQuery<ApplicationQuery, ApplicationQueryVariables>(ApplicationDocument, baseOptions);
      }
export function useApplicationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ApplicationQuery, ApplicationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ApplicationQuery, ApplicationQueryVariables>(ApplicationDocument, baseOptions);
        }
export type ApplicationQueryHookResult = ReturnType<typeof useApplicationQuery>;
export type ApplicationLazyQueryHookResult = ReturnType<typeof useApplicationLazyQuery>;
export type ApplicationQueryResult = ApolloReactCommon.QueryResult<ApplicationQuery, ApplicationQueryVariables>;
export const UpdateApplicationDocument = gql`
    mutation UpdateApplication($input: UpdateApplicationInput!) {
  updateApplication(input: $input) {
    clientMutationId
    application {
      name
      allowedOrigins
      interimAdministratorEmail
      enabled
      updatedAt
      updatedBy
    }
  }
}
    `;
export type UpdateApplicationMutationFn = ApolloReactCommon.MutationFunction<UpdateApplicationMutation, UpdateApplicationMutationVariables>;

/**
 * __useUpdateApplicationMutation__
 *
 * To run a mutation, you first call `useUpdateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApplicationMutation, { data, loading, error }] = useUpdateApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateApplicationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateApplicationMutation, UpdateApplicationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateApplicationMutation, UpdateApplicationMutationVariables>(UpdateApplicationDocument, baseOptions);
      }
export type UpdateApplicationMutationHookResult = ReturnType<typeof useUpdateApplicationMutation>;
export type UpdateApplicationMutationResult = ApolloReactCommon.MutationResult<UpdateApplicationMutation>;
export type UpdateApplicationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateApplicationMutation, UpdateApplicationMutationVariables>;
export const DeleteApplicationDocument = gql`
    mutation DeleteApplication($input: DeleteApplicationInput!) {
  deleteApplication(input: $input) {
    clientMutationId
  }
}
    `;
export type DeleteApplicationMutationFn = ApolloReactCommon.MutationFunction<DeleteApplicationMutation, DeleteApplicationMutationVariables>;

/**
 * __useDeleteApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApplicationMutation, { data, loading, error }] = useDeleteApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteApplicationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteApplicationMutation, DeleteApplicationMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteApplicationMutation, DeleteApplicationMutationVariables>(DeleteApplicationDocument, baseOptions);
      }
export type DeleteApplicationMutationHookResult = ReturnType<typeof useDeleteApplicationMutation>;
export type DeleteApplicationMutationResult = ApolloReactCommon.MutationResult<DeleteApplicationMutation>;
export type DeleteApplicationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteApplicationMutation, DeleteApplicationMutationVariables>;
export const ApplicationsWithDataDocument = gql`
    query ApplicationsWithData($filter: ApplicationFilter) {
  filtered: applications(filter: $filter) {
    totalCount
    nodes {
      id
      name
      interimAdministratorEmail
      enabled
      createdAt
      updatedAt
    }
  }
  nonFilterd: applications {
    totalCount
  }
}
    `;

/**
 * __useApplicationsWithDataQuery__
 *
 * To run a query within a React component, call `useApplicationsWithDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationsWithDataQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationsWithDataQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useApplicationsWithDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ApplicationsWithDataQuery, ApplicationsWithDataQueryVariables>) {
        return ApolloReactHooks.useQuery<ApplicationsWithDataQuery, ApplicationsWithDataQueryVariables>(ApplicationsWithDataDocument, baseOptions);
      }
export function useApplicationsWithDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ApplicationsWithDataQuery, ApplicationsWithDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ApplicationsWithDataQuery, ApplicationsWithDataQueryVariables>(ApplicationsWithDataDocument, baseOptions);
        }
export type ApplicationsWithDataQueryHookResult = ReturnType<typeof useApplicationsWithDataQuery>;
export type ApplicationsWithDataLazyQueryHookResult = ReturnType<typeof useApplicationsWithDataLazyQuery>;
export type ApplicationsWithDataQueryResult = ApolloReactCommon.QueryResult<ApplicationsWithDataQuery, ApplicationsWithDataQueryVariables>;
export const ApplicationsDocument = gql`
    query Applications {
  applications {
    totalCount
  }
}
    `;

/**
 * __useApplicationsQuery__
 *
 * To run a query within a React component, call `useApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useApplicationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ApplicationsQuery, ApplicationsQueryVariables>) {
        return ApolloReactHooks.useQuery<ApplicationsQuery, ApplicationsQueryVariables>(ApplicationsDocument, baseOptions);
      }
export function useApplicationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ApplicationsQuery, ApplicationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ApplicationsQuery, ApplicationsQueryVariables>(ApplicationsDocument, baseOptions);
        }
export type ApplicationsQueryHookResult = ReturnType<typeof useApplicationsQuery>;
export type ApplicationsLazyQueryHookResult = ReturnType<typeof useApplicationsLazyQuery>;
export type ApplicationsQueryResult = ApolloReactCommon.QueryResult<ApplicationsQuery, ApplicationsQueryVariables>;
export const IdpConfigurationsDocument = gql`
    query IdpConfigurations($idpConfigurationCondition: IdpConfigurationCondition, $idpScopeFilter: IdpScopeFilter) {
  configurations: idpConfigurations(condition: $idpConfigurationCondition) {
    nodes {
      id
      discoveryDocumentUrl
      clientId
      clientSecret
      scopes
      enabled
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
  scopes: idpScopes(filter: $idpScopeFilter) {
    nodes {
      scopeName
      required
    }
  }
}
    `;

/**
 * __useIdpConfigurationsQuery__
 *
 * To run a query within a React component, call `useIdpConfigurationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIdpConfigurationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdpConfigurationsQuery({
 *   variables: {
 *      idpConfigurationCondition: // value for 'idpConfigurationCondition'
 *      idpScopeFilter: // value for 'idpScopeFilter'
 *   },
 * });
 */
export function useIdpConfigurationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IdpConfigurationsQuery, IdpConfigurationsQueryVariables>) {
        return ApolloReactHooks.useQuery<IdpConfigurationsQuery, IdpConfigurationsQueryVariables>(IdpConfigurationsDocument, baseOptions);
      }
export function useIdpConfigurationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IdpConfigurationsQuery, IdpConfigurationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IdpConfigurationsQuery, IdpConfigurationsQueryVariables>(IdpConfigurationsDocument, baseOptions);
        }
export type IdpConfigurationsQueryHookResult = ReturnType<typeof useIdpConfigurationsQuery>;
export type IdpConfigurationsLazyQueryHookResult = ReturnType<typeof useIdpConfigurationsLazyQuery>;
export type IdpConfigurationsQueryResult = ApolloReactCommon.QueryResult<IdpConfigurationsQuery, IdpConfigurationsQueryVariables>;
export const CreateIdpConfigurationDocument = gql`
    mutation CreateIdpConfiguration($input: CreateIdpConfigurationInput!) {
  createIdpConfiguration(input: $input) {
    clientMutationId
  }
}
    `;
export type CreateIdpConfigurationMutationFn = ApolloReactCommon.MutationFunction<CreateIdpConfigurationMutation, CreateIdpConfigurationMutationVariables>;

/**
 * __useCreateIdpConfigurationMutation__
 *
 * To run a mutation, you first call `useCreateIdpConfigurationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIdpConfigurationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIdpConfigurationMutation, { data, loading, error }] = useCreateIdpConfigurationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIdpConfigurationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateIdpConfigurationMutation, CreateIdpConfigurationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateIdpConfigurationMutation, CreateIdpConfigurationMutationVariables>(CreateIdpConfigurationDocument, baseOptions);
      }
export type CreateIdpConfigurationMutationHookResult = ReturnType<typeof useCreateIdpConfigurationMutation>;
export type CreateIdpConfigurationMutationResult = ApolloReactCommon.MutationResult<CreateIdpConfigurationMutation>;
export type CreateIdpConfigurationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateIdpConfigurationMutation, CreateIdpConfigurationMutationVariables>;
export const UpdateIdpConfigurationDocument = gql`
    mutation updateIdpConfiguration($input: UpdateIdpConfigurationInput!) {
  updateIdpConfiguration(input: $input) {
    idpConfiguration {
      discoveryDocumentUrl
      clientId
      clientSecret
      scopes
      enabled
      updatedAt
      updatedBy
    }
  }
}
    `;
export type UpdateIdpConfigurationMutationFn = ApolloReactCommon.MutationFunction<UpdateIdpConfigurationMutation, UpdateIdpConfigurationMutationVariables>;

/**
 * __useUpdateIdpConfigurationMutation__
 *
 * To run a mutation, you first call `useUpdateIdpConfigurationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIdpConfigurationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIdpConfigurationMutation, { data, loading, error }] = useUpdateIdpConfigurationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIdpConfigurationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateIdpConfigurationMutation, UpdateIdpConfigurationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateIdpConfigurationMutation, UpdateIdpConfigurationMutationVariables>(UpdateIdpConfigurationDocument, baseOptions);
      }
export type UpdateIdpConfigurationMutationHookResult = ReturnType<typeof useUpdateIdpConfigurationMutation>;
export type UpdateIdpConfigurationMutationResult = ApolloReactCommon.MutationResult<UpdateIdpConfigurationMutation>;
export type UpdateIdpConfigurationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateIdpConfigurationMutation, UpdateIdpConfigurationMutationVariables>;
export const DeleteIdpConfigurationDocument = gql`
    mutation DeleteIdpConfiguration($input: DeleteIdpConfigurationInput!) {
  deleteIdpConfiguration(input: $input) {
    clientMutationId
  }
}
    `;
export type DeleteIdpConfigurationMutationFn = ApolloReactCommon.MutationFunction<DeleteIdpConfigurationMutation, DeleteIdpConfigurationMutationVariables>;

/**
 * __useDeleteIdpConfigurationMutation__
 *
 * To run a mutation, you first call `useDeleteIdpConfigurationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIdpConfigurationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIdpConfigurationMutation, { data, loading, error }] = useDeleteIdpConfigurationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteIdpConfigurationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteIdpConfigurationMutation, DeleteIdpConfigurationMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteIdpConfigurationMutation, DeleteIdpConfigurationMutationVariables>(DeleteIdpConfigurationDocument, baseOptions);
      }
export type DeleteIdpConfigurationMutationHookResult = ReturnType<typeof useDeleteIdpConfigurationMutation>;
export type DeleteIdpConfigurationMutationResult = ApolloReactCommon.MutationResult<DeleteIdpConfigurationMutation>;
export type DeleteIdpConfigurationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteIdpConfigurationMutation, DeleteIdpConfigurationMutationVariables>;
export const IdpConfigurationsCountDocument = gql`
    query IdpConfigurationsCount($condition: IdpConfigurationCondition) {
  idpConfigurations(condition: $condition) {
    totalCount
    nodes {
      enabled
    }
  }
}
    `;

/**
 * __useIdpConfigurationsCountQuery__
 *
 * To run a query within a React component, call `useIdpConfigurationsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useIdpConfigurationsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdpConfigurationsCountQuery({
 *   variables: {
 *      condition: // value for 'condition'
 *   },
 * });
 */
export function useIdpConfigurationsCountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IdpConfigurationsCountQuery, IdpConfigurationsCountQueryVariables>) {
        return ApolloReactHooks.useQuery<IdpConfigurationsCountQuery, IdpConfigurationsCountQueryVariables>(IdpConfigurationsCountDocument, baseOptions);
      }
export function useIdpConfigurationsCountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IdpConfigurationsCountQuery, IdpConfigurationsCountQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IdpConfigurationsCountQuery, IdpConfigurationsCountQueryVariables>(IdpConfigurationsCountDocument, baseOptions);
        }
export type IdpConfigurationsCountQueryHookResult = ReturnType<typeof useIdpConfigurationsCountQuery>;
export type IdpConfigurationsCountLazyQueryHookResult = ReturnType<typeof useIdpConfigurationsCountLazyQuery>;
export type IdpConfigurationsCountQueryResult = ApolloReactCommon.QueryResult<IdpConfigurationsCountQuery, IdpConfigurationsCountQueryVariables>;