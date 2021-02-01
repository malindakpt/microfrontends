import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
};

export type Application = {
   __typename?: 'Application';
  id: Scalars['UUID'];
  name: Scalars['String'];
  allowedOrigins?: Maybe<Array<Maybe<Scalars['String']>>>;
  interimAdministratorEmail: Scalars['String'];
  enabled: Scalars['Boolean'];
  tenantId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads and enables pagination through a set of `IdpConfiguration`. */
  idpConfigurations: IdpConfigurationsConnection;
};


export type ApplicationIdpConfigurationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<IdpConfigurationsOrderBy>>;
  condition?: Maybe<IdpConfigurationCondition>;
  filter?: Maybe<IdpConfigurationFilter>;
};

/**
 * A condition to be used against `Application` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ApplicationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `allowedOrigins` field. */
  allowedOrigins?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `interimAdministratorEmail` field. */
  interimAdministratorEmail?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `enabled` field. */
  enabled?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Application` object types. All fields are combined with a logical ‘and.’ */
export type ApplicationFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `allowedOrigins` field. */
  allowedOrigins?: Maybe<StringListFilter>;
  /** Filter by the object’s `interimAdministratorEmail` field. */
  interimAdministratorEmail?: Maybe<StringFilter>;
  /** Filter by the object’s `enabled` field. */
  enabled?: Maybe<BooleanFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `idpConfigurations` relation. */
  idpConfigurations?: Maybe<ApplicationToManyIdpConfigurationFilter>;
  /** Some related `idpConfigurations` exist. */
  idpConfigurationsExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ApplicationFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ApplicationFilter>>;
  /** Negates the expression. */
  not?: Maybe<ApplicationFilter>;
};

/** An input for mutations affecting `Application` */
export type ApplicationInput = {
  name: Scalars['String'];
  allowedOrigins?: Maybe<Array<Maybe<Scalars['String']>>>;
  interimAdministratorEmail: Scalars['String'];
};

/** Represents an update to a `Application`. Fields that are set will be updated. */
export type ApplicationPatch = {
  name?: Maybe<Scalars['String']>;
  allowedOrigins?: Maybe<Array<Maybe<Scalars['String']>>>;
  interimAdministratorEmail?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of `Application` values. */
export type ApplicationsConnection = {
   __typename?: 'ApplicationsConnection';
  /** A list of `Application` objects. */
  nodes: Array<Maybe<Application>>;
  /** A list of edges which contains the `Application` and cursor to aid in pagination. */
  edges: Array<ApplicationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Application` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Application` edge in the connection. */
export type ApplicationsEdge = {
   __typename?: 'ApplicationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Application` at the end of the edge. */
  node?: Maybe<Application>;
};

/** Methods to use when ordering `Application`. */
export enum ApplicationsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  ALLOWED_ORIGINS_ASC = 'ALLOWED_ORIGINS_ASC',
  ALLOWED_ORIGINS_DESC = 'ALLOWED_ORIGINS_DESC',
  INTERIM_ADMINISTRATOR_EMAIL_ASC = 'INTERIM_ADMINISTRATOR_EMAIL_ASC',
  INTERIM_ADMINISTRATOR_EMAIL_DESC = 'INTERIM_ADMINISTRATOR_EMAIL_DESC',
  ENABLED_ASC = 'ENABLED_ASC',
  ENABLED_DESC = 'ENABLED_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/** A filter to be used against many `IdpConfiguration` object types. All fields are combined with a logical ‘and.’ */
export type ApplicationToManyIdpConfigurationFilter = {
  /** Every related `IdpConfiguration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<IdpConfigurationFilter>;
  /** Some related `IdpConfiguration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<IdpConfigurationFilter>;
  /** No related `IdpConfiguration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<IdpConfigurationFilter>;
};

export type AuthenticateServiceAccountInput = {
  clientId: Scalars['String'];
  clientSecret: Scalars['String'];
};

export type AuthenticateServiceAccountPayload = {
   __typename?: 'AuthenticateServiceAccountPayload';
  /** Access Token containing permissions of the Service Account */
  accessToken: Scalars['String'];
  /** Access Token type to use when making client requests */
  tokenType: Scalars['String'];
  /** Access Token expiration timeout */
  expiresIn: Scalars['Int'];
};

export type AuthenticateSuperUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthenticateSuperUserPayload = {
   __typename?: 'AuthenticateSuperUserPayload';
  /** Access Token containing permissions of the Super User */
  accessToken: Scalars['String'];
  /** Access Token type to use when making client requests */
  tokenType: Scalars['String'];
  /** Access Token expiration timeout */
  expiresIn: Scalars['Int'];
};

export type AuthenticateTenantAdminInput = {
  tenantId: Scalars['UUID'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthenticateTenantAdminPayload = {
   __typename?: 'AuthenticateTenantAdminPayload';
  /** Name of the Tenant */
  tenantName: Scalars['String'];
  /** Name of the Tenant Administrator */
  tenantAdminName: Scalars['String'];
  /** Access Token containing permissions of the Tenant Admin */
  accessToken: Scalars['String'];
  /** Access Token type to use when making client requests */
  tokenType: Scalars['String'];
  /** Access Token expiration timeout */
  expiresIn: Scalars['Int'];
  /** System generated password has been changed */
  passwordChanged: Scalars['Boolean'];
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Boolean']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Boolean']>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Boolean']>>;
};

export type ChangeTenantAdminPasswordInput = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};

/** All input for the create `Application` mutation. */
export type CreateApplicationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Application` to be created by this mutation. */
  application: ApplicationInput;
};

/** The output of our create `Application` mutation. */
export type CreateApplicationPayload = {
   __typename?: 'CreateApplicationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Application` that was created by this mutation. */
  application?: Maybe<Application>;
  /** An edge for our `Application`. May be used by Relay 1. */
  applicationEdge?: Maybe<ApplicationsEdge>;
};


/** The output of our create `Application` mutation. */
export type CreateApplicationPayloadApplicationEdgeArgs = {
  orderBy?: Maybe<Array<ApplicationsOrderBy>>;
};

export type CreateDevServiceAccountInput = {
  serviceAccountName: Scalars['String'];
};

export type CreateDevServiceAccountPayload = {
   __typename?: 'CreateDevServiceAccountPayload';
  tenantId: Scalars['String'];
  applicationId: Scalars['String'];
  serviceAccountName: Scalars['String'];
  clientId: Scalars['String'];
  clientSecret: Scalars['String'];
};

/** All input for the create `IdpConfiguration` mutation. */
export type CreateIdpConfigurationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `IdpConfiguration` to be created by this mutation. */
  idpConfiguration: IdpConfigurationInput;
};

/** The output of our create `IdpConfiguration` mutation. */
export type CreateIdpConfigurationPayload = {
   __typename?: 'CreateIdpConfigurationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `IdpConfiguration` that was created by this mutation. */
  idpConfiguration?: Maybe<IdpConfiguration>;
  /** Reads a single `Application` that is related to this `IdpConfiguration`. */
  application?: Maybe<Application>;
  /** An edge for our `IdpConfiguration`. May be used by Relay 1. */
  idpConfigurationEdge?: Maybe<IdpConfigurationsEdge>;
};


/** The output of our create `IdpConfiguration` mutation. */
export type CreateIdpConfigurationPayloadIdpConfigurationEdgeArgs = {
  orderBy?: Maybe<Array<IdpConfigurationsOrderBy>>;
};

/** All input for the create `ServiceAccount` mutation. */
export type CreateServiceAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ServiceAccount` to be created by this mutation. */
  serviceAccount: ServiceAccountInput;
};

/** The output of our create `ServiceAccount` mutation. */
export type CreateServiceAccountPayload = {
   __typename?: 'CreateServiceAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ServiceAccount` that was created by this mutation. */
  serviceAccount?: Maybe<ServiceAccount>;
  /** An edge for our `ServiceAccount`. May be used by Relay 1. */
  serviceAccountEdge?: Maybe<ServiceAccountsEdge>;
};


/** The output of our create `ServiceAccount` mutation. */
export type CreateServiceAccountPayloadServiceAccountEdgeArgs = {
  orderBy?: Maybe<Array<ServiceAccountsOrderBy>>;
};

/** All input for the create `ServiceAccountPermissionAssignment` mutation. */
export type CreateServiceAccountPermissionAssignmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ServiceAccountPermissionAssignment` to be created by this mutation. */
  serviceAccountPermissionAssignment: ServiceAccountPermissionAssignmentInput;
};

/** The output of our create `ServiceAccountPermissionAssignment` mutation. */
export type CreateServiceAccountPermissionAssignmentPayload = {
   __typename?: 'CreateServiceAccountPermissionAssignmentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ServiceAccountPermissionAssignment` that was created by this mutation. */
  serviceAccountPermissionAssignment?: Maybe<ServiceAccountPermissionAssignment>;
  /** Reads a single `ServiceAccount` that is related to this `ServiceAccountPermissionAssignment`. */
  serviceAccount?: Maybe<ServiceAccount>;
  /** Reads a single `Permission` that is related to this `ServiceAccountPermissionAssignment`. */
  permission?: Maybe<Permission>;
  /** An edge for our `ServiceAccountPermissionAssignment`. May be used by Relay 1. */
  serviceAccountPermissionAssignmentEdge?: Maybe<ServiceAccountPermissionAssignmentsEdge>;
};


/** The output of our create `ServiceAccountPermissionAssignment` mutation. */
export type CreateServiceAccountPermissionAssignmentPayloadServiceAccountPermissionAssignmentEdgeArgs = {
  orderBy?: Maybe<Array<ServiceAccountPermissionAssignmentsOrderBy>>;
};

/** All input for the create `Tag` mutation. */
export type CreateTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tag` to be created by this mutation. */
  tag: TagInput;
};

/** The output of our create `Tag` mutation. */
export type CreateTagPayload = {
   __typename?: 'CreateTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tag` that was created by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagsEdge>;
};


/** The output of our create `Tag` mutation. */
export type CreateTagPayloadTagEdgeArgs = {
  orderBy?: Maybe<Array<TagsOrderBy>>;
};

/** All input for the create `TenantAdmin` mutation. */
export type CreateTenantAdminInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TenantAdmin` to be created by this mutation. */
  tenantAdmin: TenantAdminInput;
};

/** The output of our create `TenantAdmin` mutation. */
export type CreateTenantAdminPayload = {
   __typename?: 'CreateTenantAdminPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TenantAdmin` that was created by this mutation. */
  tenantAdmin?: Maybe<TenantAdmin>;
  /** Reads a single `Tenant` that is related to this `TenantAdmin`. */
  tenant?: Maybe<Tenant>;
  /** An edge for our `TenantAdmin`. May be used by Relay 1. */
  tenantAdminEdge?: Maybe<TenantAdminsEdge>;
};


/** The output of our create `TenantAdmin` mutation. */
export type CreateTenantAdminPayloadTenantAdminEdgeArgs = {
  orderBy?: Maybe<Array<TenantAdminsOrderBy>>;
};

/** All input for the create `Tenant` mutation. */
export type CreateTenantInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tenant` to be created by this mutation. */
  tenant: TenantInput;
};

/** The output of our create `Tenant` mutation. */
export type CreateTenantPayload = {
   __typename?: 'CreateTenantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tenant` that was created by this mutation. */
  tenant?: Maybe<Tenant>;
  /** An edge for our `Tenant`. May be used by Relay 1. */
  tenantEdge?: Maybe<TenantsEdge>;
};


/** The output of our create `Tenant` mutation. */
export type CreateTenantPayloadTenantEdgeArgs = {
  orderBy?: Maybe<Array<TenantsOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
   __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the create `UserRoleAssignment` mutation. */
export type CreateUserRoleAssignmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRoleAssignment` to be created by this mutation. */
  userRoleAssignment: UserRoleAssignmentInput;
};

/** The output of our create `UserRoleAssignment` mutation. */
export type CreateUserRoleAssignmentPayload = {
   __typename?: 'CreateUserRoleAssignmentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRoleAssignment` that was created by this mutation. */
  userRoleAssignment?: Maybe<UserRoleAssignment>;
  /** Reads a single `User` that is related to this `UserRoleAssignment`. */
  user?: Maybe<User>;
  /** Reads a single `UserRole` that is related to this `UserRoleAssignment`. */
  userRole?: Maybe<UserRole>;
  /** An edge for our `UserRoleAssignment`. May be used by Relay 1. */
  userRoleAssignmentEdge?: Maybe<UserRoleAssignmentsEdge>;
};


/** The output of our create `UserRoleAssignment` mutation. */
export type CreateUserRoleAssignmentPayloadUserRoleAssignmentEdgeArgs = {
  orderBy?: Maybe<Array<UserRoleAssignmentsOrderBy>>;
};

/** All input for the create `UserRole` mutation. */
export type CreateUserRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRole` to be created by this mutation. */
  userRole: UserRoleInput;
};

/** All input for the create `UserRoleParentAssignment` mutation. */
export type CreateUserRoleParentAssignmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRoleParentAssignment` to be created by this mutation. */
  userRoleParentAssignment: UserRoleParentAssignmentInput;
};

/** The output of our create `UserRoleParentAssignment` mutation. */
export type CreateUserRoleParentAssignmentPayload = {
   __typename?: 'CreateUserRoleParentAssignmentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRoleParentAssignment` that was created by this mutation. */
  userRoleParentAssignment?: Maybe<UserRoleParentAssignment>;
  /** Reads a single `UserRole` that is related to this `UserRoleParentAssignment`. */
  parentUserRole?: Maybe<UserRole>;
  /** An edge for our `UserRoleParentAssignment`. May be used by Relay 1. */
  userRoleParentAssignmentEdge?: Maybe<UserRoleParentAssignmentsEdge>;
};


/** The output of our create `UserRoleParentAssignment` mutation. */
export type CreateUserRoleParentAssignmentPayloadUserRoleParentAssignmentEdgeArgs = {
  orderBy?: Maybe<Array<UserRoleParentAssignmentsOrderBy>>;
};

/** The output of our create `UserRole` mutation. */
export type CreateUserRolePayload = {
   __typename?: 'CreateUserRolePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRole` that was created by this mutation. */
  userRole?: Maybe<UserRole>;
  /** An edge for our `UserRole`. May be used by Relay 1. */
  userRoleEdge?: Maybe<UserRolesEdge>;
};


/** The output of our create `UserRole` mutation. */
export type CreateUserRolePayloadUserRoleEdgeArgs = {
  orderBy?: Maybe<Array<UserRolesOrderBy>>;
};

/** All input for the create `UserRolePermissionAssignment` mutation. */
export type CreateUserRolePermissionAssignmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRolePermissionAssignment` to be created by this mutation. */
  userRolePermissionAssignment: UserRolePermissionAssignmentInput;
};

/** The output of our create `UserRolePermissionAssignment` mutation. */
export type CreateUserRolePermissionAssignmentPayload = {
   __typename?: 'CreateUserRolePermissionAssignmentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRolePermissionAssignment` that was created by this mutation. */
  userRolePermissionAssignment?: Maybe<UserRolePermissionAssignment>;
  /** Reads a single `UserRole` that is related to this `UserRolePermissionAssignment`. */
  userRole?: Maybe<UserRole>;
  /** Reads a single `Permission` that is related to this `UserRolePermissionAssignment`. */
  permission?: Maybe<Permission>;
  /** An edge for our `UserRolePermissionAssignment`. May be used by Relay 1. */
  userRolePermissionAssignmentEdge?: Maybe<UserRolePermissionAssignmentsEdge>;
};


/** The output of our create `UserRolePermissionAssignment` mutation. */
export type CreateUserRolePermissionAssignmentPayloadUserRolePermissionAssignmentEdgeArgs = {
  orderBy?: Maybe<Array<UserRolePermissionAssignmentsOrderBy>>;
};

/** All input for the create `UserRoleTagAssignment` mutation. */
export type CreateUserRoleTagAssignmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRoleTagAssignment` to be created by this mutation. */
  userRoleTagAssignment: UserRoleTagAssignmentInput;
};

/** The output of our create `UserRoleTagAssignment` mutation. */
export type CreateUserRoleTagAssignmentPayload = {
   __typename?: 'CreateUserRoleTagAssignmentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRoleTagAssignment` that was created by this mutation. */
  userRoleTagAssignment?: Maybe<UserRoleTagAssignment>;
  /** Reads a single `UserRole` that is related to this `UserRoleTagAssignment`. */
  userRole?: Maybe<UserRole>;
  /** Reads a single `Tag` that is related to this `UserRoleTagAssignment`. */
  tag?: Maybe<Tag>;
  /** An edge for our `UserRoleTagAssignment`. May be used by Relay 1. */
  userRoleTagAssignmentEdge?: Maybe<UserRoleTagAssignmentsEdge>;
};


/** The output of our create `UserRoleTagAssignment` mutation. */
export type CreateUserRoleTagAssignmentPayloadUserRoleTagAssignmentEdgeArgs = {
  orderBy?: Maybe<Array<UserRoleTagAssignmentsOrderBy>>;
};



/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Datetime']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Datetime']>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Datetime']>>;
};

/** All input for the `deleteApplication` mutation. */
export type DeleteApplicationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Application` mutation. */
export type DeleteApplicationPayload = {
   __typename?: 'DeleteApplicationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Application` that was deleted by this mutation. */
  application?: Maybe<Application>;
  deletedApplicationNodeId?: Maybe<Scalars['ID']>;
  /** An edge for our `Application`. May be used by Relay 1. */
  applicationEdge?: Maybe<ApplicationsEdge>;
};


/** The output of our delete `Application` mutation. */
export type DeleteApplicationPayloadApplicationEdgeArgs = {
  orderBy?: Maybe<Array<ApplicationsOrderBy>>;
};

/** All input for the `deleteIdpConfiguration` mutation. */
export type DeleteIdpConfigurationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `IdpConfiguration` mutation. */
export type DeleteIdpConfigurationPayload = {
   __typename?: 'DeleteIdpConfigurationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `IdpConfiguration` that was deleted by this mutation. */
  idpConfiguration?: Maybe<IdpConfiguration>;
  deletedIdpConfigurationNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Application` that is related to this `IdpConfiguration`. */
  application?: Maybe<Application>;
  /** An edge for our `IdpConfiguration`. May be used by Relay 1. */
  idpConfigurationEdge?: Maybe<IdpConfigurationsEdge>;
};


/** The output of our delete `IdpConfiguration` mutation. */
export type DeleteIdpConfigurationPayloadIdpConfigurationEdgeArgs = {
  orderBy?: Maybe<Array<IdpConfigurationsOrderBy>>;
};

/** All input for the `deleteServiceAccount` mutation. */
export type DeleteServiceAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `ServiceAccount` mutation. */
export type DeleteServiceAccountPayload = {
   __typename?: 'DeleteServiceAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ServiceAccount` that was deleted by this mutation. */
  serviceAccount?: Maybe<ServiceAccount>;
  deletedServiceAccountNodeId?: Maybe<Scalars['ID']>;
  /** An edge for our `ServiceAccount`. May be used by Relay 1. */
  serviceAccountEdge?: Maybe<ServiceAccountsEdge>;
};


/** The output of our delete `ServiceAccount` mutation. */
export type DeleteServiceAccountPayloadServiceAccountEdgeArgs = {
  orderBy?: Maybe<Array<ServiceAccountsOrderBy>>;
};

/** All input for the `deleteServiceAccountPermissionAssignment` mutation. */
export type DeleteServiceAccountPermissionAssignmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `ServiceAccountPermissionAssignment` mutation. */
export type DeleteServiceAccountPermissionAssignmentPayload = {
   __typename?: 'DeleteServiceAccountPermissionAssignmentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ServiceAccountPermissionAssignment` that was deleted by this mutation. */
  serviceAccountPermissionAssignment?: Maybe<ServiceAccountPermissionAssignment>;
  deletedServiceAccountPermissionNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `ServiceAccount` that is related to this `ServiceAccountPermissionAssignment`. */
  serviceAccount?: Maybe<ServiceAccount>;
  /** Reads a single `Permission` that is related to this `ServiceAccountPermissionAssignment`. */
  permission?: Maybe<Permission>;
  /** An edge for our `ServiceAccountPermissionAssignment`. May be used by Relay 1. */
  serviceAccountPermissionAssignmentEdge?: Maybe<ServiceAccountPermissionAssignmentsEdge>;
};


/** The output of our delete `ServiceAccountPermissionAssignment` mutation. */
export type DeleteServiceAccountPermissionAssignmentPayloadServiceAccountPermissionAssignmentEdgeArgs = {
  orderBy?: Maybe<Array<ServiceAccountPermissionAssignmentsOrderBy>>;
};

/** All input for the `deleteTag` mutation. */
export type DeleteTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Tag` mutation. */
export type DeleteTagPayload = {
   __typename?: 'DeleteTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tag` that was deleted by this mutation. */
  tag?: Maybe<Tag>;
  deletedTagNodeId?: Maybe<Scalars['ID']>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagsEdge>;
};


/** The output of our delete `Tag` mutation. */
export type DeleteTagPayloadTagEdgeArgs = {
  orderBy?: Maybe<Array<TagsOrderBy>>;
};

/** All input for the `deleteTenantAdmin` mutation. */
export type DeleteTenantAdminInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `TenantAdmin` mutation. */
export type DeleteTenantAdminPayload = {
   __typename?: 'DeleteTenantAdminPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TenantAdmin` that was deleted by this mutation. */
  tenantAdmin?: Maybe<TenantAdmin>;
  deletedTenantAdminNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Tenant` that is related to this `TenantAdmin`. */
  tenant?: Maybe<Tenant>;
  /** An edge for our `TenantAdmin`. May be used by Relay 1. */
  tenantAdminEdge?: Maybe<TenantAdminsEdge>;
};


/** The output of our delete `TenantAdmin` mutation. */
export type DeleteTenantAdminPayloadTenantAdminEdgeArgs = {
  orderBy?: Maybe<Array<TenantAdminsOrderBy>>;
};

/** All input for the `deleteTenant` mutation. */
export type DeleteTenantInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Tenant` mutation. */
export type DeleteTenantPayload = {
   __typename?: 'DeleteTenantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tenant` that was deleted by this mutation. */
  tenant?: Maybe<Tenant>;
  deletedTenantNodeId?: Maybe<Scalars['ID']>;
  /** An edge for our `Tenant`. May be used by Relay 1. */
  tenantEdge?: Maybe<TenantsEdge>;
};


/** The output of our delete `Tenant` mutation. */
export type DeleteTenantPayloadTenantEdgeArgs = {
  orderBy?: Maybe<Array<TenantsOrderBy>>;
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
   __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  deletedUserNodeId?: Maybe<Scalars['ID']>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `deleteUserRoleAssignment` mutation. */
export type DeleteUserRoleAssignmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserRoleAssignment` mutation. */
export type DeleteUserRoleAssignmentPayload = {
   __typename?: 'DeleteUserRoleAssignmentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRoleAssignment` that was deleted by this mutation. */
  userRoleAssignment?: Maybe<UserRoleAssignment>;
  deletedUserRoleAssignmentNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `User` that is related to this `UserRoleAssignment`. */
  user?: Maybe<User>;
  /** Reads a single `UserRole` that is related to this `UserRoleAssignment`. */
  userRole?: Maybe<UserRole>;
  /** An edge for our `UserRoleAssignment`. May be used by Relay 1. */
  userRoleAssignmentEdge?: Maybe<UserRoleAssignmentsEdge>;
};


/** The output of our delete `UserRoleAssignment` mutation. */
export type DeleteUserRoleAssignmentPayloadUserRoleAssignmentEdgeArgs = {
  orderBy?: Maybe<Array<UserRoleAssignmentsOrderBy>>;
};

/** All input for the `deleteUserRole` mutation. */
export type DeleteUserRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteUserRoleParentAssignment` mutation. */
export type DeleteUserRoleParentAssignmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserRoleParentAssignment` mutation. */
export type DeleteUserRoleParentAssignmentPayload = {
   __typename?: 'DeleteUserRoleParentAssignmentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRoleParentAssignment` that was deleted by this mutation. */
  userRoleParentAssignment?: Maybe<UserRoleParentAssignment>;
  deletedUserRoleParentNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `UserRole` that is related to this `UserRoleParentAssignment`. */
  parentUserRole?: Maybe<UserRole>;
  /** An edge for our `UserRoleParentAssignment`. May be used by Relay 1. */
  userRoleParentAssignmentEdge?: Maybe<UserRoleParentAssignmentsEdge>;
};


/** The output of our delete `UserRoleParentAssignment` mutation. */
export type DeleteUserRoleParentAssignmentPayloadUserRoleParentAssignmentEdgeArgs = {
  orderBy?: Maybe<Array<UserRoleParentAssignmentsOrderBy>>;
};

/** The output of our delete `UserRole` mutation. */
export type DeleteUserRolePayload = {
   __typename?: 'DeleteUserRolePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRole` that was deleted by this mutation. */
  userRole?: Maybe<UserRole>;
  deletedUserRoleNodeId?: Maybe<Scalars['ID']>;
  /** An edge for our `UserRole`. May be used by Relay 1. */
  userRoleEdge?: Maybe<UserRolesEdge>;
};


/** The output of our delete `UserRole` mutation. */
export type DeleteUserRolePayloadUserRoleEdgeArgs = {
  orderBy?: Maybe<Array<UserRolesOrderBy>>;
};

/** All input for the `deleteUserRolePermissionAssignment` mutation. */
export type DeleteUserRolePermissionAssignmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserRolePermissionAssignment` mutation. */
export type DeleteUserRolePermissionAssignmentPayload = {
   __typename?: 'DeleteUserRolePermissionAssignmentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRolePermissionAssignment` that was deleted by this mutation. */
  userRolePermissionAssignment?: Maybe<UserRolePermissionAssignment>;
  deletedUserRolePermissionNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `UserRole` that is related to this `UserRolePermissionAssignment`. */
  userRole?: Maybe<UserRole>;
  /** Reads a single `Permission` that is related to this `UserRolePermissionAssignment`. */
  permission?: Maybe<Permission>;
  /** An edge for our `UserRolePermissionAssignment`. May be used by Relay 1. */
  userRolePermissionAssignmentEdge?: Maybe<UserRolePermissionAssignmentsEdge>;
};


/** The output of our delete `UserRolePermissionAssignment` mutation. */
export type DeleteUserRolePermissionAssignmentPayloadUserRolePermissionAssignmentEdgeArgs = {
  orderBy?: Maybe<Array<UserRolePermissionAssignmentsOrderBy>>;
};

/** All input for the `deleteUserRoleTagAssignment` mutation. */
export type DeleteUserRoleTagAssignmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserRoleTagAssignment` mutation. */
export type DeleteUserRoleTagAssignmentPayload = {
   __typename?: 'DeleteUserRoleTagAssignmentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRoleTagAssignment` that was deleted by this mutation. */
  userRoleTagAssignment?: Maybe<UserRoleTagAssignment>;
  deletedUserRoleTagNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `UserRole` that is related to this `UserRoleTagAssignment`. */
  userRole?: Maybe<UserRole>;
  /** Reads a single `Tag` that is related to this `UserRoleTagAssignment`. */
  tag?: Maybe<Tag>;
  /** An edge for our `UserRoleTagAssignment`. May be used by Relay 1. */
  userRoleTagAssignmentEdge?: Maybe<UserRoleTagAssignmentsEdge>;
};


/** The output of our delete `UserRoleTagAssignment` mutation. */
export type DeleteUserRoleTagAssignmentPayloadUserRoleTagAssignmentEdgeArgs = {
  orderBy?: Maybe<Array<UserRoleTagAssignmentsOrderBy>>;
};

export type DevPermissionStructureInput = {
  serviceId: Scalars['String'];
  permissions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GenerateDevAccessTokenInput = {
  permissionStructure?: Maybe<Array<Maybe<DevPermissionStructureInput>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GenerateDevAccessTokenPayload = {
   __typename?: 'GenerateDevAccessTokenPayload';
  accessToken: Scalars['String'];
  tokenType: Scalars['String'];
  expiresIn: Scalars['Int'];
};

export type GenerateServiceAccountSecretInput = {
  id: Scalars['String'];
};

export type GenerateServiceAccountSecretPayload = {
   __typename?: 'GenerateServiceAccountSecretPayload';
  serviceAccount?: Maybe<ServiceAccount>;
  /** Generated client secret. */
  clientSecret: Scalars['String'];
};

export type GenerateTenantAdminPasswordInput = {
  id: Scalars['String'];
};

export type GenerateTenantAdminPasswordPayload = {
   __typename?: 'GenerateTenantAdminPasswordPayload';
  tenantAdmin?: Maybe<TenantAdmin>;
  /** Generated password. */
  password: Scalars['String'];
};

export enum IdentityProvider {
  AZURE_AD = 'AZURE_AD',
  AX_AUTH = 'AX_AUTH',
  GOOGLE = 'GOOGLE'
}

/** A filter to be used against IdentityProvider fields. All fields are combined with a logical ‘and.’ */
export type IdentityProviderFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<IdentityProvider>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<IdentityProvider>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<IdentityProvider>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<IdentityProvider>;
  /** Included in the specified list. */
  in?: Maybe<Array<IdentityProvider>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<IdentityProvider>>;
  /** Less than the specified value. */
  lessThan?: Maybe<IdentityProvider>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<IdentityProvider>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<IdentityProvider>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<IdentityProvider>;
};

export type IdpConfiguration = {
   __typename?: 'IdpConfiguration';
  id: Scalars['UUID'];
  idpId: IdentityProvider;
  discoveryDocumentUrl: Scalars['String'];
  clientId: Scalars['String'];
  clientSecret: Scalars['String'];
  scopes: Array<Maybe<Scalars['String']>>;
  enabled: Scalars['Boolean'];
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads a single `Application` that is related to this `IdpConfiguration`. */
  application?: Maybe<Application>;
};

/**
 * A condition to be used against `IdpConfiguration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type IdpConfigurationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `idpId` field. */
  idpId?: Maybe<IdentityProvider>;
  /** Checks for equality with the object’s `discoveryDocumentUrl` field. */
  discoveryDocumentUrl?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `clientId` field. */
  clientId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `clientSecret` field. */
  clientSecret?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `scopes` field. */
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `enabled` field. */
  enabled?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `IdpConfiguration` object types. All fields are combined with a logical ‘and.’ */
export type IdpConfigurationFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `idpId` field. */
  idpId?: Maybe<IdentityProviderFilter>;
  /** Filter by the object’s `discoveryDocumentUrl` field. */
  discoveryDocumentUrl?: Maybe<StringFilter>;
  /** Filter by the object’s `clientId` field. */
  clientId?: Maybe<StringFilter>;
  /** Filter by the object’s `clientSecret` field. */
  clientSecret?: Maybe<StringFilter>;
  /** Filter by the object’s `scopes` field. */
  scopes?: Maybe<StringListFilter>;
  /** Filter by the object’s `enabled` field. */
  enabled?: Maybe<BooleanFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `application` relation. */
  application?: Maybe<ApplicationFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<IdpConfigurationFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<IdpConfigurationFilter>>;
  /** Negates the expression. */
  not?: Maybe<IdpConfigurationFilter>;
};

/** An input for mutations affecting `IdpConfiguration` */
export type IdpConfigurationInput = {
  idpId: IdentityProvider;
  discoveryDocumentUrl: Scalars['String'];
  clientId: Scalars['String'];
  clientSecret: Scalars['String'];
  scopes: Array<Maybe<Scalars['String']>>;
  applicationId: Scalars['UUID'];
};

/** Represents an update to a `IdpConfiguration`. Fields that are set will be updated. */
export type IdpConfigurationPatch = {
  discoveryDocumentUrl?: Maybe<Scalars['String']>;
  clientId?: Maybe<Scalars['String']>;
  clientSecret?: Maybe<Scalars['String']>;
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  enabled?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of `IdpConfiguration` values. */
export type IdpConfigurationsConnection = {
   __typename?: 'IdpConfigurationsConnection';
  /** A list of `IdpConfiguration` objects. */
  nodes: Array<Maybe<IdpConfiguration>>;
  /** A list of edges which contains the `IdpConfiguration` and cursor to aid in pagination. */
  edges: Array<IdpConfigurationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `IdpConfiguration` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `IdpConfiguration` edge in the connection. */
export type IdpConfigurationsEdge = {
   __typename?: 'IdpConfigurationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `IdpConfiguration` at the end of the edge. */
  node?: Maybe<IdpConfiguration>;
};

/** Methods to use when ordering `IdpConfiguration`. */
export enum IdpConfigurationsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  IDP_ID_ASC = 'IDP_ID_ASC',
  IDP_ID_DESC = 'IDP_ID_DESC',
  DISCOVERY_DOCUMENT_URL_ASC = 'DISCOVERY_DOCUMENT_URL_ASC',
  DISCOVERY_DOCUMENT_URL_DESC = 'DISCOVERY_DOCUMENT_URL_DESC',
  CLIENT_ID_ASC = 'CLIENT_ID_ASC',
  CLIENT_ID_DESC = 'CLIENT_ID_DESC',
  CLIENT_SECRET_ASC = 'CLIENT_SECRET_ASC',
  CLIENT_SECRET_DESC = 'CLIENT_SECRET_DESC',
  SCOPES_ASC = 'SCOPES_ASC',
  SCOPES_DESC = 'SCOPES_DESC',
  ENABLED_ASC = 'ENABLED_ASC',
  ENABLED_DESC = 'ENABLED_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

export type IdpScope = {
   __typename?: 'IdpScope';
  id: Scalars['UUID'];
  idpId: IdentityProvider;
  scopeName: Scalars['String'];
  required: Scalars['Boolean'];
};

/**
 * A condition to be used against `IdpScope` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type IdpScopeCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `idpId` field. */
  idpId?: Maybe<IdentityProvider>;
  /** Checks for equality with the object’s `scopeName` field. */
  scopeName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `required` field. */
  required?: Maybe<Scalars['Boolean']>;
};

/** A filter to be used against `IdpScope` object types. All fields are combined with a logical ‘and.’ */
export type IdpScopeFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `idpId` field. */
  idpId?: Maybe<IdentityProviderFilter>;
  /** Filter by the object’s `scopeName` field. */
  scopeName?: Maybe<StringFilter>;
  /** Filter by the object’s `required` field. */
  required?: Maybe<BooleanFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<IdpScopeFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<IdpScopeFilter>>;
  /** Negates the expression. */
  not?: Maybe<IdpScopeFilter>;
};

/** A connection to a list of `IdpScope` values. */
export type IdpScopesConnection = {
   __typename?: 'IdpScopesConnection';
  /** A list of `IdpScope` objects. */
  nodes: Array<Maybe<IdpScope>>;
  /** A list of edges which contains the `IdpScope` and cursor to aid in pagination. */
  edges: Array<IdpScopesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `IdpScope` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `IdpScope` edge in the connection. */
export type IdpScopesEdge = {
   __typename?: 'IdpScopesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `IdpScope` at the end of the edge. */
  node?: Maybe<IdpScope>;
};

/** Methods to use when ordering `IdpScope`. */
export enum IdpScopesOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  IDP_ID_ASC = 'IDP_ID_ASC',
  IDP_ID_DESC = 'IDP_ID_DESC',
  SCOPE_NAME_ASC = 'SCOPE_NAME_ASC',
  SCOPE_NAME_DESC = 'SCOPE_NAME_DESC',
  REQUIRED_ASC = 'REQUIRED_ASC',
  REQUIRED_DESC = 'REQUIRED_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
   __typename?: 'Mutation';
  /** Creates a development-time service account with SYNCHRONIZE_PERMISSIONS granted. */
  _DEV_createServiceAccount?: Maybe<CreateDevServiceAccountPayload>;
  /** Generates development-time user access tokens with specified PERMISSIONS. */
  _DEV_generateUserAccessToken?: Maybe<GenerateDevAccessTokenPayload>;
  /** Authenticates a Managed Service Account */
  authenticateManagedServiceAccount: AuthenticateServiceAccountPayload;
  /** Authenticates a Service Account */
  authenticateServiceAccount: AuthenticateServiceAccountPayload;
  /** Authenticates a Identity Service Super User */
  authenticateSuperUser: AuthenticateSuperUserPayload;
  /** Authenticates a Identity Service Tenant Admin */
  authenticateTenantAdmin: AuthenticateTenantAdminPayload;
  /** Change password of a Identity Service Tenant Admin */
  changeTenantAdminPassword: AuthenticateTenantAdminPayload;
  /** Creates a single `Application`. */
  createApplication?: Maybe<CreateApplicationPayload>;
  /** Creates a single `IdpConfiguration`. */
  createIdpConfiguration?: Maybe<CreateIdpConfigurationPayload>;
  /** Creates a single `ServiceAccount`. */
  createServiceAccount?: Maybe<CreateServiceAccountPayload>;
  /** Creates a single `ServiceAccountPermissionAssignment`. */
  createServiceAccountPermissionAssignment?: Maybe<CreateServiceAccountPermissionAssignmentPayload>;
  /** Creates a single `Tag`. */
  createTag?: Maybe<CreateTagPayload>;
  /** Creates a single `Tenant`. */
  createTenant?: Maybe<CreateTenantPayload>;
  /** Creates a single `TenantAdmin`. */
  createTenantAdmin?: Maybe<CreateTenantAdminPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `UserRole`. */
  createUserRole?: Maybe<CreateUserRolePayload>;
  /** Creates a single `UserRoleAssignment`. */
  createUserRoleAssignment?: Maybe<CreateUserRoleAssignmentPayload>;
  /** Creates a single `UserRoleParentAssignment`. */
  createUserRoleParentAssignment?: Maybe<CreateUserRoleParentAssignmentPayload>;
  /** Creates a single `UserRolePermissionAssignment`. */
  createUserRolePermissionAssignment?: Maybe<CreateUserRolePermissionAssignmentPayload>;
  /** Creates a single `UserRoleTagAssignment`. */
  createUserRoleTagAssignment?: Maybe<CreateUserRoleTagAssignmentPayload>;
  /** Deletes a single `Application` using a unique key. */
  deleteApplication?: Maybe<DeleteApplicationPayload>;
  /** Deletes a single `IdpConfiguration` using a unique key. */
  deleteIdpConfiguration?: Maybe<DeleteIdpConfigurationPayload>;
  /** Deletes a single `ServiceAccount` using a unique key. */
  deleteServiceAccount?: Maybe<DeleteServiceAccountPayload>;
  /** Deletes a single `ServiceAccountPermissionAssignment` using a unique key. */
  deleteServiceAccountPermissionAssignment?: Maybe<DeleteServiceAccountPermissionAssignmentPayload>;
  /** Deletes a single `Tag` using a unique key. */
  deleteTag?: Maybe<DeleteTagPayload>;
  /** Deletes a single `Tenant` using a unique key. */
  deleteTenant?: Maybe<DeleteTenantPayload>;
  /** Deletes a single `TenantAdmin` using a unique key. */
  deleteTenantAdmin?: Maybe<DeleteTenantAdminPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `UserRole` using a unique key. */
  deleteUserRole?: Maybe<DeleteUserRolePayload>;
  /** Deletes a single `UserRoleAssignment` using a unique key. */
  deleteUserRoleAssignment?: Maybe<DeleteUserRoleAssignmentPayload>;
  /** Deletes a single `UserRoleParentAssignment` using a unique key. */
  deleteUserRoleParentAssignment?: Maybe<DeleteUserRoleParentAssignmentPayload>;
  /** Deletes a single `UserRolePermissionAssignment` using a unique key. */
  deleteUserRolePermissionAssignment?: Maybe<DeleteUserRolePermissionAssignmentPayload>;
  /** Deletes a single `UserRoleTagAssignment` using a unique key. */
  deleteUserRoleTagAssignment?: Maybe<DeleteUserRoleTagAssignmentPayload>;
  /** Generates a new client secret for a `ServiceAccount`. */
  generateServiceAccountSecret?: Maybe<GenerateServiceAccountSecretPayload>;
  /** Generates a new password for a `TenantAdmin`. */
  generateTenantAdminPassword?: Maybe<GenerateTenantAdminPasswordPayload>;
  /** Synchronizes permissions from other services. */
  synchronizePermissions?: Maybe<SynchronizePermissionsPayload>;
  /** Updates a single `Application` using a unique key and a patch. */
  updateApplication?: Maybe<UpdateApplicationPayload>;
  /** Updates a single `IdpConfiguration` using a unique key and a patch. */
  updateIdpConfiguration?: Maybe<UpdateIdpConfigurationPayload>;
  /** Updates a single `ServiceAccount` using a unique key and a patch. */
  updateServiceAccount?: Maybe<UpdateServiceAccountPayload>;
  /** Updates a single `Tag` using a unique key and a patch. */
  updateTag?: Maybe<UpdateTagPayload>;
  /** Updates a single `Tenant` using a unique key and a patch. */
  updateTenant?: Maybe<UpdateTenantPayload>;
  /** Updates a single `TenantAdmin` using a unique key and a patch. */
  updateTenantAdmin?: Maybe<UpdateTenantAdminPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `UserRole` using a unique key and a patch. */
  updateUserRole?: Maybe<UpdateUserRolePayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type Mutation_Dev_CreateServiceAccountArgs = {
  input: CreateDevServiceAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type Mutation_Dev_GenerateUserAccessTokenArgs = {
  input: GenerateDevAccessTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateManagedServiceAccountArgs = {
  input?: Maybe<AuthenticateServiceAccountInput>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateServiceAccountArgs = {
  input?: Maybe<AuthenticateServiceAccountInput>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateSuperUserArgs = {
  input?: Maybe<AuthenticateSuperUserInput>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateTenantAdminArgs = {
  input?: Maybe<AuthenticateTenantAdminInput>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationChangeTenantAdminPasswordArgs = {
  input?: Maybe<ChangeTenantAdminPasswordInput>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateIdpConfigurationArgs = {
  input: CreateIdpConfigurationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateServiceAccountArgs = {
  input: CreateServiceAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateServiceAccountPermissionAssignmentArgs = {
  input: CreateServiceAccountPermissionAssignmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTenantArgs = {
  input: CreateTenantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTenantAdminArgs = {
  input: CreateTenantAdminInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserRoleArgs = {
  input: CreateUserRoleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserRoleAssignmentArgs = {
  input: CreateUserRoleAssignmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserRoleParentAssignmentArgs = {
  input: CreateUserRoleParentAssignmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserRolePermissionAssignmentArgs = {
  input: CreateUserRolePermissionAssignmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserRoleTagAssignmentArgs = {
  input: CreateUserRoleTagAssignmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteApplicationArgs = {
  input: DeleteApplicationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteIdpConfigurationArgs = {
  input: DeleteIdpConfigurationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceAccountArgs = {
  input: DeleteServiceAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteServiceAccountPermissionAssignmentArgs = {
  input: DeleteServiceAccountPermissionAssignmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagArgs = {
  input: DeleteTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTenantArgs = {
  input: DeleteTenantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTenantAdminArgs = {
  input: DeleteTenantAdminInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserRoleArgs = {
  input: DeleteUserRoleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserRoleAssignmentArgs = {
  input: DeleteUserRoleAssignmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserRoleParentAssignmentArgs = {
  input: DeleteUserRoleParentAssignmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserRolePermissionAssignmentArgs = {
  input: DeleteUserRolePermissionAssignmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserRoleTagAssignmentArgs = {
  input: DeleteUserRoleTagAssignmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGenerateServiceAccountSecretArgs = {
  input: GenerateServiceAccountSecretInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGenerateTenantAdminPasswordArgs = {
  input: GenerateTenantAdminPasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSynchronizePermissionsArgs = {
  input: SynchronizePermissionsInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateIdpConfigurationArgs = {
  input: UpdateIdpConfigurationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateServiceAccountArgs = {
  input: UpdateServiceAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTenantArgs = {
  input: UpdateTenantInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTenantAdminArgs = {
  input: UpdateTenantAdminInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserRoleArgs = {
  input: UpdateUserRoleInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
   __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

export type Permission = {
   __typename?: 'Permission';
  id: Scalars['UUID'];
  serviceId: Scalars['String'];
  name: Scalars['String'];
  fromManagedService: Scalars['Boolean'];
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads and enables pagination through a set of `UserRolePermissionAssignment`. */
  userRolePermissionAssignments: UserRolePermissionAssignmentsConnection;
  /** Reads and enables pagination through a set of `ServiceAccountPermissionAssignment`. */
  serviceAccountPermissionAssignments: ServiceAccountPermissionAssignmentsConnection;
};


export type PermissionUserRolePermissionAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRolePermissionAssignmentsOrderBy>>;
  condition?: Maybe<UserRolePermissionAssignmentCondition>;
  filter?: Maybe<UserRolePermissionAssignmentFilter>;
};


export type PermissionServiceAccountPermissionAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ServiceAccountPermissionAssignmentsOrderBy>>;
  condition?: Maybe<ServiceAccountPermissionAssignmentCondition>;
  filter?: Maybe<ServiceAccountPermissionAssignmentFilter>;
};

/**
 * A condition to be used against `Permission` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PermissionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `serviceId` field. */
  serviceId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `fromManagedService` field. */
  fromManagedService?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Permission` object types. All fields are combined with a logical ‘and.’ */
export type PermissionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `serviceId` field. */
  serviceId?: Maybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `fromManagedService` field. */
  fromManagedService?: Maybe<BooleanFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `userRolePermissionAssignments` relation. */
  userRolePermissionAssignments?: Maybe<PermissionToManyUserRolePermissionAssignmentFilter>;
  /** Some related `userRolePermissionAssignments` exist. */
  userRolePermissionAssignmentsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `serviceAccountPermissionAssignments` relation. */
  serviceAccountPermissionAssignments?: Maybe<PermissionToManyServiceAccountPermissionAssignmentFilter>;
  /** Some related `serviceAccountPermissionAssignments` exist. */
  serviceAccountPermissionAssignmentsExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<PermissionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<PermissionFilter>>;
  /** Negates the expression. */
  not?: Maybe<PermissionFilter>;
};

/** A connection to a list of `Permission` values. */
export type PermissionsConnection = {
   __typename?: 'PermissionsConnection';
  /** A list of `Permission` objects. */
  nodes: Array<Maybe<Permission>>;
  /** A list of edges which contains the `Permission` and cursor to aid in pagination. */
  edges: Array<PermissionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Permission` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Permission` edge in the connection. */
export type PermissionsEdge = {
   __typename?: 'PermissionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Permission` at the end of the edge. */
  node?: Maybe<Permission>;
};

/** Methods to use when ordering `Permission`. */
export enum PermissionsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  SERVICE_ID_ASC = 'SERVICE_ID_ASC',
  SERVICE_ID_DESC = 'SERVICE_ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  FROM_MANAGED_SERVICE_ASC = 'FROM_MANAGED_SERVICE_ASC',
  FROM_MANAGED_SERVICE_DESC = 'FROM_MANAGED_SERVICE_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/**
 * A filter to be used against many `ServiceAccountPermissionAssignment` object
 * types. All fields are combined with a logical ‘and.’
 */
export type PermissionToManyServiceAccountPermissionAssignmentFilter = {
  /**
   * Every related `ServiceAccountPermissionAssignment` matches the filter
   * criteria. All fields are combined with a logical ‘and.’
   */
  every?: Maybe<ServiceAccountPermissionAssignmentFilter>;
  /**
   * Some related `ServiceAccountPermissionAssignment` matches the filter criteria.
   * All fields are combined with a logical ‘and.’
   */
  some?: Maybe<ServiceAccountPermissionAssignmentFilter>;
  /** No related `ServiceAccountPermissionAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<ServiceAccountPermissionAssignmentFilter>;
};

/** A filter to be used against many `UserRolePermissionAssignment` object types. All fields are combined with a logical ‘and.’ */
export type PermissionToManyUserRolePermissionAssignmentFilter = {
  /** Every related `UserRolePermissionAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<UserRolePermissionAssignmentFilter>;
  /** Some related `UserRolePermissionAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<UserRolePermissionAssignmentFilter>;
  /** No related `UserRolePermissionAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<UserRolePermissionAssignmentFilter>;
};

/** The root query type which gives access points into the data universe. */
export type Query = {
   __typename?: 'Query';
  application?: Maybe<Application>;
  /** Reads and enables pagination through a set of `Application`. */
  applications?: Maybe<ApplicationsConnection>;
  idpConfiguration?: Maybe<IdpConfiguration>;
  /** Reads and enables pagination through a set of `IdpConfiguration`. */
  idpConfigurations?: Maybe<IdpConfigurationsConnection>;
  idpScope?: Maybe<IdpScope>;
  /** Reads and enables pagination through a set of `IdpScope`. */
  idpScopes?: Maybe<IdpScopesConnection>;
  permission?: Maybe<Permission>;
  /** Reads and enables pagination through a set of `Permission`. */
  permissions?: Maybe<PermissionsConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  serviceAccount?: Maybe<ServiceAccount>;
  serviceAccountPermissionAssignment?: Maybe<ServiceAccountPermissionAssignment>;
  /** Reads and enables pagination through a set of `ServiceAccountPermissionAssignment`. */
  serviceAccountPermissionAssignments?: Maybe<ServiceAccountPermissionAssignmentsConnection>;
  /** Reads and enables pagination through a set of `ServiceAccount`. */
  serviceAccounts?: Maybe<ServiceAccountsConnection>;
  tag?: Maybe<Tag>;
  /** Reads and enables pagination through a set of `Tag`. */
  tags?: Maybe<TagsConnection>;
  tenant?: Maybe<Tenant>;
  tenantAdmin?: Maybe<TenantAdmin>;
  /** Reads and enables pagination through a set of `TenantAdmin`. */
  tenantAdmins?: Maybe<TenantAdminsConnection>;
  /** Reads and enables pagination through a set of `Tenant`. */
  tenants?: Maybe<TenantsConnection>;
  user?: Maybe<User>;
  userRole?: Maybe<UserRole>;
  userRoleAssignment?: Maybe<UserRoleAssignment>;
  /** Reads and enables pagination through a set of `UserRoleAssignment`. */
  userRoleAssignments?: Maybe<UserRoleAssignmentsConnection>;
  userRoleParentAssignment?: Maybe<UserRoleParentAssignment>;
  /** Reads and enables pagination through a set of `UserRoleParentAssignment`. */
  userRoleParentAssignments?: Maybe<UserRoleParentAssignmentsConnection>;
  userRolePermissionAssignment?: Maybe<UserRolePermissionAssignment>;
  /** Reads and enables pagination through a set of `UserRolePermissionAssignment`. */
  userRolePermissionAssignments?: Maybe<UserRolePermissionAssignmentsConnection>;
  userRoleTagAssignment?: Maybe<UserRoleTagAssignment>;
  /** Reads and enables pagination through a set of `UserRoleTagAssignment`. */
  userRoleTagAssignments?: Maybe<UserRoleTagAssignmentsConnection>;
  /** Reads and enables pagination through a set of `UserRole`. */
  userRoles?: Maybe<UserRolesConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryApplicationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryApplicationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ApplicationsOrderBy>>;
  condition?: Maybe<ApplicationCondition>;
  filter?: Maybe<ApplicationFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryIdpConfigurationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIdpConfigurationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<IdpConfigurationsOrderBy>>;
  condition?: Maybe<IdpConfigurationCondition>;
  filter?: Maybe<IdpConfigurationFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryIdpScopeArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIdpScopesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<IdpScopesOrderBy>>;
  condition?: Maybe<IdpScopeCondition>;
  filter?: Maybe<IdpScopeFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPermissionArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPermissionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PermissionsOrderBy>>;
  condition?: Maybe<PermissionCondition>;
  filter?: Maybe<PermissionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceAccountArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceAccountPermissionAssignmentArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceAccountPermissionAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ServiceAccountPermissionAssignmentsOrderBy>>;
  condition?: Maybe<ServiceAccountPermissionAssignmentCondition>;
  filter?: Maybe<ServiceAccountPermissionAssignmentFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryServiceAccountsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ServiceAccountsOrderBy>>;
  condition?: Maybe<ServiceAccountCondition>;
  filter?: Maybe<ServiceAccountFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTagArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TagsOrderBy>>;
  condition?: Maybe<TagCondition>;
  filter?: Maybe<TagFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantAdminArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantAdminsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TenantAdminsOrderBy>>;
  condition?: Maybe<TenantAdminCondition>;
  filter?: Maybe<TenantAdminFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTenantsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TenantsOrderBy>>;
  condition?: Maybe<TenantCondition>;
  filter?: Maybe<TenantFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserRoleArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserRoleAssignmentArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserRoleAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRoleAssignmentsOrderBy>>;
  condition?: Maybe<UserRoleAssignmentCondition>;
  filter?: Maybe<UserRoleAssignmentFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserRoleParentAssignmentArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserRoleParentAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRoleParentAssignmentsOrderBy>>;
  condition?: Maybe<UserRoleParentAssignmentCondition>;
  filter?: Maybe<UserRoleParentAssignmentFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserRolePermissionAssignmentArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserRolePermissionAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRolePermissionAssignmentsOrderBy>>;
  condition?: Maybe<UserRolePermissionAssignmentCondition>;
  filter?: Maybe<UserRolePermissionAssignmentFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserRoleTagAssignmentArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserRoleTagAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRoleTagAssignmentsOrderBy>>;
  condition?: Maybe<UserRoleTagAssignmentCondition>;
  filter?: Maybe<UserRoleTagAssignmentFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserRolesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRolesOrderBy>>;
  condition?: Maybe<UserRoleCondition>;
  filter?: Maybe<UserRoleFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};

export type ServiceAccount = {
   __typename?: 'ServiceAccount';
  id: Scalars['UUID'];
  name: Scalars['String'];
  clientId: Scalars['String'];
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads and enables pagination through a set of `ServiceAccountPermissionAssignment`. */
  serviceAccountPermissionAssignments: ServiceAccountPermissionAssignmentsConnection;
};


export type ServiceAccountServiceAccountPermissionAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ServiceAccountPermissionAssignmentsOrderBy>>;
  condition?: Maybe<ServiceAccountPermissionAssignmentCondition>;
  filter?: Maybe<ServiceAccountPermissionAssignmentFilter>;
};

/**
 * A condition to be used against `ServiceAccount` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ServiceAccountCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `clientId` field. */
  clientId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `ServiceAccount` object types. All fields are combined with a logical ‘and.’ */
export type ServiceAccountFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `clientId` field. */
  clientId?: Maybe<StringFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `serviceAccountPermissionAssignments` relation. */
  serviceAccountPermissionAssignments?: Maybe<ServiceAccountToManyServiceAccountPermissionAssignmentFilter>;
  /** Some related `serviceAccountPermissionAssignments` exist. */
  serviceAccountPermissionAssignmentsExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ServiceAccountFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ServiceAccountFilter>>;
  /** Negates the expression. */
  not?: Maybe<ServiceAccountFilter>;
};

/** An input for mutations affecting `ServiceAccount` */
export type ServiceAccountInput = {
  name: Scalars['String'];
};

/** Represents an update to a `ServiceAccount`. Fields that are set will be updated. */
export type ServiceAccountPatch = {
  name?: Maybe<Scalars['String']>;
};

export type ServiceAccountPermissionAssignment = {
   __typename?: 'ServiceAccountPermissionAssignment';
  id: Scalars['UUID'];
  serviceAccountId: Scalars['UUID'];
  permissionId: Scalars['UUID'];
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads a single `ServiceAccount` that is related to this `ServiceAccountPermissionAssignment`. */
  serviceAccount?: Maybe<ServiceAccount>;
  /** Reads a single `Permission` that is related to this `ServiceAccountPermissionAssignment`. */
  permission?: Maybe<Permission>;
};

/**
 * A condition to be used against `ServiceAccountPermissionAssignment` object
 * types. All fields are tested for equality and combined with a logical ‘and.’
 */
export type ServiceAccountPermissionAssignmentCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `serviceAccountId` field. */
  serviceAccountId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `permissionId` field. */
  permissionId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `ServiceAccountPermissionAssignment` object types. All fields are combined with a logical ‘and.’ */
export type ServiceAccountPermissionAssignmentFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `serviceAccountId` field. */
  serviceAccountId?: Maybe<UuidFilter>;
  /** Filter by the object’s `permissionId` field. */
  permissionId?: Maybe<UuidFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `serviceAccount` relation. */
  serviceAccount?: Maybe<ServiceAccountFilter>;
  /** Filter by the object’s `permission` relation. */
  permission?: Maybe<PermissionFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ServiceAccountPermissionAssignmentFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ServiceAccountPermissionAssignmentFilter>>;
  /** Negates the expression. */
  not?: Maybe<ServiceAccountPermissionAssignmentFilter>;
};

/** An input for mutations affecting `ServiceAccountPermissionAssignment` */
export type ServiceAccountPermissionAssignmentInput = {
  serviceAccountId: Scalars['UUID'];
  permissionId: Scalars['UUID'];
};

/** A connection to a list of `ServiceAccountPermissionAssignment` values. */
export type ServiceAccountPermissionAssignmentsConnection = {
   __typename?: 'ServiceAccountPermissionAssignmentsConnection';
  /** A list of `ServiceAccountPermissionAssignment` objects. */
  nodes: Array<Maybe<ServiceAccountPermissionAssignment>>;
  /** A list of edges which contains the `ServiceAccountPermissionAssignment` and cursor to aid in pagination. */
  edges: Array<ServiceAccountPermissionAssignmentsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ServiceAccountPermissionAssignment` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ServiceAccountPermissionAssignment` edge in the connection. */
export type ServiceAccountPermissionAssignmentsEdge = {
   __typename?: 'ServiceAccountPermissionAssignmentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ServiceAccountPermissionAssignment` at the end of the edge. */
  node?: Maybe<ServiceAccountPermissionAssignment>;
};

/** Methods to use when ordering `ServiceAccountPermissionAssignment`. */
export enum ServiceAccountPermissionAssignmentsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  SERVICE_ACCOUNT_ID_ASC = 'SERVICE_ACCOUNT_ID_ASC',
  SERVICE_ACCOUNT_ID_DESC = 'SERVICE_ACCOUNT_ID_DESC',
  PERMISSION_ID_ASC = 'PERMISSION_ID_ASC',
  PERMISSION_ID_DESC = 'PERMISSION_ID_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `ServiceAccount` values. */
export type ServiceAccountsConnection = {
   __typename?: 'ServiceAccountsConnection';
  /** A list of `ServiceAccount` objects. */
  nodes: Array<Maybe<ServiceAccount>>;
  /** A list of edges which contains the `ServiceAccount` and cursor to aid in pagination. */
  edges: Array<ServiceAccountsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ServiceAccount` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ServiceAccount` edge in the connection. */
export type ServiceAccountsEdge = {
   __typename?: 'ServiceAccountsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ServiceAccount` at the end of the edge. */
  node?: Maybe<ServiceAccount>;
};

/** Methods to use when ordering `ServiceAccount`. */
export enum ServiceAccountsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  CLIENT_ID_ASC = 'CLIENT_ID_ASC',
  CLIENT_ID_DESC = 'CLIENT_ID_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/**
 * A filter to be used against many `ServiceAccountPermissionAssignment` object
 * types. All fields are combined with a logical ‘and.’
 */
export type ServiceAccountToManyServiceAccountPermissionAssignmentFilter = {
  /**
   * Every related `ServiceAccountPermissionAssignment` matches the filter
   * criteria. All fields are combined with a logical ‘and.’
   */
  every?: Maybe<ServiceAccountPermissionAssignmentFilter>;
  /**
   * Some related `ServiceAccountPermissionAssignment` matches the filter criteria.
   * All fields are combined with a logical ‘and.’
   */
  some?: Maybe<ServiceAccountPermissionAssignmentFilter>;
  /** No related `ServiceAccountPermissionAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<ServiceAccountPermissionAssignmentFilter>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>;
  /**
   * Matches the specified pattern (case-sensitive). An underscore (_) matches any
   * single character; a percent sign (%) matches any sequence of zero or more characters.
   */
  like?: Maybe<Scalars['String']>;
  /**
   * Matches the specified pattern (case-insensitive). An underscore (_) matches
   * any single character; a percent sign (%) matches any sequence of zero or more characters.
   */
  likeInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>;
  /**
   * Does not match the specified pattern (case-sensitive). An underscore (_)
   * matches any single character; a percent sign (%) matches any sequence of zero
   * or more characters.
   */
  notLike?: Maybe<Scalars['String']>;
  /**
   * Does not match the specified pattern (case-insensitive). An underscore (_)
   * matches any single character; a percent sign (%) matches any sequence of zero
   * or more characters.
   */
  notLikeInsensitive?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern using the SQL standard's definition of a regular expression. */
  notSimilarTo?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>;
  /** Matches the specified pattern using the SQL standard's definition of a regular expression. */
  similarTo?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>;
};

/** A filter to be used against String List fields. All fields are combined with a logical ‘and.’ */
export type StringListFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the specified list of values. */
  contains?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contained by the specified list of values. */
  containedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Overlaps the specified list of values. */
  overlaps?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Any array item is equal to the specified value. */
  anyEqualTo?: Maybe<Scalars['String']>;
  /** Any array item is not equal to the specified value. */
  anyNotEqualTo?: Maybe<Scalars['String']>;
  /** Any array item is less than the specified value. */
  anyLessThan?: Maybe<Scalars['String']>;
  /** Any array item is less than or equal to the specified value. */
  anyLessThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Any array item is greater than the specified value. */
  anyGreaterThan?: Maybe<Scalars['String']>;
  /** Any array item is greater than or equal to the specified value. */
  anyGreaterThanOrEqualTo?: Maybe<Scalars['String']>;
};

export type SynchronizePermissionsInput = {
  serviceId: Scalars['String'];
  permissions: Array<Maybe<Scalars['String']>>;
};

export type SynchronizePermissionsPayload = {
   __typename?: 'SynchronizePermissionsPayload';
  added?: Maybe<Array<Maybe<Scalars['String']>>>;
  removed?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Tag = {
   __typename?: 'Tag';
  id: Scalars['UUID'];
  name: Scalars['String'];
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads and enables pagination through a set of `UserRoleTagAssignment`. */
  userRoleTagAssignments: UserRoleTagAssignmentsConnection;
};


export type TagUserRoleTagAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRoleTagAssignmentsOrderBy>>;
  condition?: Maybe<UserRoleTagAssignmentCondition>;
  filter?: Maybe<UserRoleTagAssignmentFilter>;
};

/** A condition to be used against `Tag` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TagCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Tag` object types. All fields are combined with a logical ‘and.’ */
export type TagFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `userRoleTagAssignments` relation. */
  userRoleTagAssignments?: Maybe<TagToManyUserRoleTagAssignmentFilter>;
  /** Some related `userRoleTagAssignments` exist. */
  userRoleTagAssignmentsExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TagFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TagFilter>>;
  /** Negates the expression. */
  not?: Maybe<TagFilter>;
};

/** An input for mutations affecting `Tag` */
export type TagInput = {
  name: Scalars['String'];
};

/** Represents an update to a `Tag`. Fields that are set will be updated. */
export type TagPatch = {
  name?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Tag` values. */
export type TagsConnection = {
   __typename?: 'TagsConnection';
  /** A list of `Tag` objects. */
  nodes: Array<Maybe<Tag>>;
  /** A list of edges which contains the `Tag` and cursor to aid in pagination. */
  edges: Array<TagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Tag` edge in the connection. */
export type TagsEdge = {
   __typename?: 'TagsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Tag` at the end of the edge. */
  node?: Maybe<Tag>;
};

/** Methods to use when ordering `Tag`. */
export enum TagsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/** A filter to be used against many `UserRoleTagAssignment` object types. All fields are combined with a logical ‘and.’ */
export type TagToManyUserRoleTagAssignmentFilter = {
  /** Every related `UserRoleTagAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<UserRoleTagAssignmentFilter>;
  /** Some related `UserRoleTagAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<UserRoleTagAssignmentFilter>;
  /** No related `UserRoleTagAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<UserRoleTagAssignmentFilter>;
};

export type Tenant = {
   __typename?: 'Tenant';
  id: Scalars['UUID'];
  name: Scalars['String'];
  status: TenantStatus;
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads and enables pagination through a set of `TenantAdmin`. */
  tenantAdmins: TenantAdminsConnection;
};


export type TenantTenantAdminsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TenantAdminsOrderBy>>;
  condition?: Maybe<TenantAdminCondition>;
  filter?: Maybe<TenantAdminFilter>;
};

export type TenantAdmin = {
   __typename?: 'TenantAdmin';
  id: Scalars['UUID'];
  name: Scalars['String'];
  email: Scalars['String'];
  active: Scalars['Boolean'];
  passwordChanged: Scalars['Boolean'];
  tenantId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads a single `Tenant` that is related to this `TenantAdmin`. */
  tenant?: Maybe<Tenant>;
};

/**
 * A condition to be used against `TenantAdmin` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TenantAdminCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `active` field. */
  active?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `passwordChanged` field. */
  passwordChanged?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `TenantAdmin` object types. All fields are combined with a logical ‘and.’ */
export type TenantAdminFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `email` field. */
  email?: Maybe<StringFilter>;
  /** Filter by the object’s `active` field. */
  active?: Maybe<BooleanFilter>;
  /** Filter by the object’s `passwordChanged` field. */
  passwordChanged?: Maybe<BooleanFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `tenant` relation. */
  tenant?: Maybe<TenantFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TenantAdminFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TenantAdminFilter>>;
  /** Negates the expression. */
  not?: Maybe<TenantAdminFilter>;
};

/** An input for mutations affecting `TenantAdmin` */
export type TenantAdminInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  tenantId: Scalars['UUID'];
};

/** Represents an update to a `TenantAdmin`. Fields that are set will be updated. */
export type TenantAdminPatch = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of `TenantAdmin` values. */
export type TenantAdminsConnection = {
   __typename?: 'TenantAdminsConnection';
  /** A list of `TenantAdmin` objects. */
  nodes: Array<Maybe<TenantAdmin>>;
  /** A list of edges which contains the `TenantAdmin` and cursor to aid in pagination. */
  edges: Array<TenantAdminsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TenantAdmin` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TenantAdmin` edge in the connection. */
export type TenantAdminsEdge = {
   __typename?: 'TenantAdminsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TenantAdmin` at the end of the edge. */
  node?: Maybe<TenantAdmin>;
};

/** Methods to use when ordering `TenantAdmin`. */
export enum TenantAdminsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  EMAIL_ASC = 'EMAIL_ASC',
  EMAIL_DESC = 'EMAIL_DESC',
  ACTIVE_ASC = 'ACTIVE_ASC',
  ACTIVE_DESC = 'ACTIVE_DESC',
  PASSWORD_CHANGED_ASC = 'PASSWORD_CHANGED_ASC',
  PASSWORD_CHANGED_DESC = 'PASSWORD_CHANGED_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `Tenant` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TenantCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<TenantStatus>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Tenant` object types. All fields are combined with a logical ‘and.’ */
export type TenantFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `status` field. */
  status?: Maybe<TenantStatusFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `tenantAdmins` relation. */
  tenantAdmins?: Maybe<TenantToManyTenantAdminFilter>;
  /** Some related `tenantAdmins` exist. */
  tenantAdminsExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TenantFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TenantFilter>>;
  /** Negates the expression. */
  not?: Maybe<TenantFilter>;
};

/** An input for mutations affecting `Tenant` */
export type TenantInput = {
  name: Scalars['String'];
};

/** Represents an update to a `Tenant`. Fields that are set will be updated. */
export type TenantPatch = {
  name?: Maybe<Scalars['String']>;
  status?: Maybe<TenantStatus>;
};

/** A connection to a list of `Tenant` values. */
export type TenantsConnection = {
   __typename?: 'TenantsConnection';
  /** A list of `Tenant` objects. */
  nodes: Array<Maybe<Tenant>>;
  /** A list of edges which contains the `Tenant` and cursor to aid in pagination. */
  edges: Array<TenantsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tenant` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Tenant` edge in the connection. */
export type TenantsEdge = {
   __typename?: 'TenantsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Tenant` at the end of the edge. */
  node?: Maybe<Tenant>;
};

/** Methods to use when ordering `Tenant`. */
export enum TenantsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  STATUS_ASC = 'STATUS_ASC',
  STATUS_DESC = 'STATUS_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

export enum TenantStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED'
}

/** A filter to be used against TenantStatus fields. All fields are combined with a logical ‘and.’ */
export type TenantStatusFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<TenantStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<TenantStatus>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<TenantStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<TenantStatus>;
  /** Included in the specified list. */
  in?: Maybe<Array<TenantStatus>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<TenantStatus>>;
  /** Less than the specified value. */
  lessThan?: Maybe<TenantStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<TenantStatus>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<TenantStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<TenantStatus>;
};

/** A filter to be used against many `TenantAdmin` object types. All fields are combined with a logical ‘and.’ */
export type TenantToManyTenantAdminFilter = {
  /** Every related `TenantAdmin` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TenantAdminFilter>;
  /** Some related `TenantAdmin` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TenantAdminFilter>;
  /** No related `TenantAdmin` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TenantAdminFilter>;
};

/** All input for the `updateApplication` mutation. */
export type UpdateApplicationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Application` being updated. */
  patch: ApplicationPatch;
  id: Scalars['UUID'];
};

/** The output of our update `Application` mutation. */
export type UpdateApplicationPayload = {
   __typename?: 'UpdateApplicationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Application` that was updated by this mutation. */
  application?: Maybe<Application>;
  /** An edge for our `Application`. May be used by Relay 1. */
  applicationEdge?: Maybe<ApplicationsEdge>;
};


/** The output of our update `Application` mutation. */
export type UpdateApplicationPayloadApplicationEdgeArgs = {
  orderBy?: Maybe<Array<ApplicationsOrderBy>>;
};

/** All input for the `updateIdpConfiguration` mutation. */
export type UpdateIdpConfigurationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `IdpConfiguration` being updated. */
  patch: IdpConfigurationPatch;
  id: Scalars['UUID'];
};

/** The output of our update `IdpConfiguration` mutation. */
export type UpdateIdpConfigurationPayload = {
   __typename?: 'UpdateIdpConfigurationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `IdpConfiguration` that was updated by this mutation. */
  idpConfiguration?: Maybe<IdpConfiguration>;
  /** Reads a single `Application` that is related to this `IdpConfiguration`. */
  application?: Maybe<Application>;
  /** An edge for our `IdpConfiguration`. May be used by Relay 1. */
  idpConfigurationEdge?: Maybe<IdpConfigurationsEdge>;
};


/** The output of our update `IdpConfiguration` mutation. */
export type UpdateIdpConfigurationPayloadIdpConfigurationEdgeArgs = {
  orderBy?: Maybe<Array<IdpConfigurationsOrderBy>>;
};

/** All input for the `updateServiceAccount` mutation. */
export type UpdateServiceAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ServiceAccount` being updated. */
  patch: ServiceAccountPatch;
  id: Scalars['UUID'];
};

/** The output of our update `ServiceAccount` mutation. */
export type UpdateServiceAccountPayload = {
   __typename?: 'UpdateServiceAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ServiceAccount` that was updated by this mutation. */
  serviceAccount?: Maybe<ServiceAccount>;
  /** An edge for our `ServiceAccount`. May be used by Relay 1. */
  serviceAccountEdge?: Maybe<ServiceAccountsEdge>;
};


/** The output of our update `ServiceAccount` mutation. */
export type UpdateServiceAccountPayloadServiceAccountEdgeArgs = {
  orderBy?: Maybe<Array<ServiceAccountsOrderBy>>;
};

/** All input for the `updateTag` mutation. */
export type UpdateTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Tag` being updated. */
  patch: TagPatch;
  id: Scalars['UUID'];
};

/** The output of our update `Tag` mutation. */
export type UpdateTagPayload = {
   __typename?: 'UpdateTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tag` that was updated by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagsEdge>;
};


/** The output of our update `Tag` mutation. */
export type UpdateTagPayloadTagEdgeArgs = {
  orderBy?: Maybe<Array<TagsOrderBy>>;
};

/** All input for the `updateTenantAdmin` mutation. */
export type UpdateTenantAdminInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TenantAdmin` being updated. */
  patch: TenantAdminPatch;
  id: Scalars['UUID'];
};

/** The output of our update `TenantAdmin` mutation. */
export type UpdateTenantAdminPayload = {
   __typename?: 'UpdateTenantAdminPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TenantAdmin` that was updated by this mutation. */
  tenantAdmin?: Maybe<TenantAdmin>;
  /** Reads a single `Tenant` that is related to this `TenantAdmin`. */
  tenant?: Maybe<Tenant>;
  /** An edge for our `TenantAdmin`. May be used by Relay 1. */
  tenantAdminEdge?: Maybe<TenantAdminsEdge>;
};


/** The output of our update `TenantAdmin` mutation. */
export type UpdateTenantAdminPayloadTenantAdminEdgeArgs = {
  orderBy?: Maybe<Array<TenantAdminsOrderBy>>;
};

/** All input for the `updateTenant` mutation. */
export type UpdateTenantInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Tenant` being updated. */
  patch: TenantPatch;
  id: Scalars['UUID'];
};

/** The output of our update `Tenant` mutation. */
export type UpdateTenantPayload = {
   __typename?: 'UpdateTenantPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tenant` that was updated by this mutation. */
  tenant?: Maybe<Tenant>;
  /** An edge for our `Tenant`. May be used by Relay 1. */
  tenantEdge?: Maybe<TenantsEdge>;
};


/** The output of our update `Tenant` mutation. */
export type UpdateTenantPayloadTenantEdgeArgs = {
  orderBy?: Maybe<Array<TenantsOrderBy>>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  id: Scalars['UUID'];
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
   __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `updateUserRole` mutation. */
export type UpdateUserRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserRole` being updated. */
  patch: UserRolePatch;
  id: Scalars['UUID'];
};

/** The output of our update `UserRole` mutation. */
export type UpdateUserRolePayload = {
   __typename?: 'UpdateUserRolePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserRole` that was updated by this mutation. */
  userRole?: Maybe<UserRole>;
  /** An edge for our `UserRole`. May be used by Relay 1. */
  userRoleEdge?: Maybe<UserRolesEdge>;
};


/** The output of our update `UserRole` mutation. */
export type UpdateUserRolePayloadUserRoleEdgeArgs = {
  orderBy?: Maybe<Array<UserRolesOrderBy>>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['UUID'];
  name: Scalars['String'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  status: UserStatus;
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads and enables pagination through a set of `UserRoleAssignment`. */
  userRoleAssignments: UserRoleAssignmentsConnection;
};


export type UserUserRoleAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRoleAssignmentsOrderBy>>;
  condition?: Maybe<UserRoleAssignmentCondition>;
  filter?: Maybe<UserRoleAssignmentFilter>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `profilePictureUrl` field. */
  profilePictureUrl?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<UserStatus>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `profilePictureUrl` field. */
  profilePictureUrl?: Maybe<StringFilter>;
  /** Filter by the object’s `email` field. */
  email?: Maybe<StringFilter>;
  /** Filter by the object’s `status` field. */
  status?: Maybe<UserStatusFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `userRoleAssignments` relation. */
  userRoleAssignments?: Maybe<UserToManyUserRoleAssignmentFilter>;
  /** Some related `userRoleAssignments` exist. */
  userRoleAssignmentsExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  name: Scalars['String'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  status?: Maybe<UserStatus>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  status?: Maybe<UserStatus>;
};

export type UserRole = {
   __typename?: 'UserRole';
  id: Scalars['UUID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads and enables pagination through a set of `UserRoleParentAssignment`. */
  userRoleParentAssignments: UserRoleParentAssignmentsConnection;
  /** Reads and enables pagination through a set of `UserRoleAssignment`. */
  userRoleAssignments: UserRoleAssignmentsConnection;
  /** Reads and enables pagination through a set of `UserRoleTagAssignment`. */
  userRoleTagAssignments: UserRoleTagAssignmentsConnection;
  /** Reads and enables pagination through a set of `UserRolePermissionAssignment`. */
  userRolePermissionAssignments: UserRolePermissionAssignmentsConnection;
};


export type UserRoleUserRoleParentAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRoleParentAssignmentsOrderBy>>;
  condition?: Maybe<UserRoleParentAssignmentCondition>;
  filter?: Maybe<UserRoleParentAssignmentFilter>;
};


export type UserRoleUserRoleAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRoleAssignmentsOrderBy>>;
  condition?: Maybe<UserRoleAssignmentCondition>;
  filter?: Maybe<UserRoleAssignmentFilter>;
};


export type UserRoleUserRoleTagAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRoleTagAssignmentsOrderBy>>;
  condition?: Maybe<UserRoleTagAssignmentCondition>;
  filter?: Maybe<UserRoleTagAssignmentFilter>;
};


export type UserRoleUserRolePermissionAssignmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserRolePermissionAssignmentsOrderBy>>;
  condition?: Maybe<UserRolePermissionAssignmentCondition>;
  filter?: Maybe<UserRolePermissionAssignmentFilter>;
};

export type UserRoleAssignment = {
   __typename?: 'UserRoleAssignment';
  id: Scalars['UUID'];
  userId: Scalars['UUID'];
  userRoleId: Scalars['UUID'];
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads a single `User` that is related to this `UserRoleAssignment`. */
  user?: Maybe<User>;
  /** Reads a single `UserRole` that is related to this `UserRoleAssignment`. */
  userRole?: Maybe<UserRole>;
};

/**
 * A condition to be used against `UserRoleAssignment` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserRoleAssignmentCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userRoleId` field. */
  userRoleId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `UserRoleAssignment` object types. All fields are combined with a logical ‘and.’ */
export type UserRoleAssignmentFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<UuidFilter>;
  /** Filter by the object’s `userRoleId` field. */
  userRoleId?: Maybe<UuidFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `user` relation. */
  user?: Maybe<UserFilter>;
  /** Filter by the object’s `userRole` relation. */
  userRole?: Maybe<UserRoleFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserRoleAssignmentFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserRoleAssignmentFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserRoleAssignmentFilter>;
};

/** An input for mutations affecting `UserRoleAssignment` */
export type UserRoleAssignmentInput = {
  userId: Scalars['UUID'];
  userRoleId: Scalars['UUID'];
};

/** A connection to a list of `UserRoleAssignment` values. */
export type UserRoleAssignmentsConnection = {
   __typename?: 'UserRoleAssignmentsConnection';
  /** A list of `UserRoleAssignment` objects. */
  nodes: Array<Maybe<UserRoleAssignment>>;
  /** A list of edges which contains the `UserRoleAssignment` and cursor to aid in pagination. */
  edges: Array<UserRoleAssignmentsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserRoleAssignment` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserRoleAssignment` edge in the connection. */
export type UserRoleAssignmentsEdge = {
   __typename?: 'UserRoleAssignmentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserRoleAssignment` at the end of the edge. */
  node?: Maybe<UserRoleAssignment>;
};

/** Methods to use when ordering `UserRoleAssignment`. */
export enum UserRoleAssignmentsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  USER_ID_ASC = 'USER_ID_ASC',
  USER_ID_DESC = 'USER_ID_DESC',
  USER_ROLE_ID_ASC = 'USER_ROLE_ID_ASC',
  USER_ROLE_ID_DESC = 'USER_ROLE_ID_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `UserRole` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserRoleCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `UserRole` object types. All fields are combined with a logical ‘and.’ */
export type UserRoleFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `userRoleParentAssignments` relation. */
  userRoleParentAssignments?: Maybe<UserRoleToManyUserRoleParentAssignmentFilter>;
  /** Some related `userRoleParentAssignments` exist. */
  userRoleParentAssignmentsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `userRoleAssignments` relation. */
  userRoleAssignments?: Maybe<UserRoleToManyUserRoleAssignmentFilter>;
  /** Some related `userRoleAssignments` exist. */
  userRoleAssignmentsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `userRoleTagAssignments` relation. */
  userRoleTagAssignments?: Maybe<UserRoleToManyUserRoleTagAssignmentFilter>;
  /** Some related `userRoleTagAssignments` exist. */
  userRoleTagAssignmentsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `userRolePermissionAssignments` relation. */
  userRolePermissionAssignments?: Maybe<UserRoleToManyUserRolePermissionAssignmentFilter>;
  /** Some related `userRolePermissionAssignments` exist. */
  userRolePermissionAssignmentsExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserRoleFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserRoleFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserRoleFilter>;
};

/** An input for mutations affecting `UserRole` */
export type UserRoleInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UserRoleParentAssignment = {
   __typename?: 'UserRoleParentAssignment';
  id: Scalars['UUID'];
  userRoleId: Scalars['UUID'];
  parentUserRoleId: Scalars['UUID'];
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads a single `UserRole` that is related to this `UserRoleParentAssignment`. */
  parentUserRole?: Maybe<UserRole>;
};

/**
 * A condition to be used against `UserRoleParentAssignment` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type UserRoleParentAssignmentCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userRoleId` field. */
  userRoleId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `parentUserRoleId` field. */
  parentUserRoleId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `UserRoleParentAssignment` object types. All fields are combined with a logical ‘and.’ */
export type UserRoleParentAssignmentFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `userRoleId` field. */
  userRoleId?: Maybe<UuidFilter>;
  /** Filter by the object’s `parentUserRoleId` field. */
  parentUserRoleId?: Maybe<UuidFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `parentUserRole` relation. */
  parentUserRole?: Maybe<UserRoleFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserRoleParentAssignmentFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserRoleParentAssignmentFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserRoleParentAssignmentFilter>;
};

/** An input for mutations affecting `UserRoleParentAssignment` */
export type UserRoleParentAssignmentInput = {
  userRoleId: Scalars['UUID'];
  parentUserRoleId: Scalars['UUID'];
};

/** A connection to a list of `UserRoleParentAssignment` values. */
export type UserRoleParentAssignmentsConnection = {
   __typename?: 'UserRoleParentAssignmentsConnection';
  /** A list of `UserRoleParentAssignment` objects. */
  nodes: Array<Maybe<UserRoleParentAssignment>>;
  /** A list of edges which contains the `UserRoleParentAssignment` and cursor to aid in pagination. */
  edges: Array<UserRoleParentAssignmentsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserRoleParentAssignment` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserRoleParentAssignment` edge in the connection. */
export type UserRoleParentAssignmentsEdge = {
   __typename?: 'UserRoleParentAssignmentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserRoleParentAssignment` at the end of the edge. */
  node?: Maybe<UserRoleParentAssignment>;
};

/** Methods to use when ordering `UserRoleParentAssignment`. */
export enum UserRoleParentAssignmentsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  USER_ROLE_ID_ASC = 'USER_ROLE_ID_ASC',
  USER_ROLE_ID_DESC = 'USER_ROLE_ID_DESC',
  PARENT_USER_ROLE_ID_ASC = 'PARENT_USER_ROLE_ID_ASC',
  PARENT_USER_ROLE_ID_DESC = 'PARENT_USER_ROLE_ID_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `UserRole`. Fields that are set will be updated. */
export type UserRolePatch = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type UserRolePermissionAssignment = {
   __typename?: 'UserRolePermissionAssignment';
  id: Scalars['UUID'];
  userRoleId: Scalars['UUID'];
  permissionId: Scalars['UUID'];
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads a single `UserRole` that is related to this `UserRolePermissionAssignment`. */
  userRole?: Maybe<UserRole>;
  /** Reads a single `Permission` that is related to this `UserRolePermissionAssignment`. */
  permission?: Maybe<Permission>;
};

/**
 * A condition to be used against `UserRolePermissionAssignment` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type UserRolePermissionAssignmentCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userRoleId` field. */
  userRoleId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `permissionId` field. */
  permissionId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `UserRolePermissionAssignment` object types. All fields are combined with a logical ‘and.’ */
export type UserRolePermissionAssignmentFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `userRoleId` field. */
  userRoleId?: Maybe<UuidFilter>;
  /** Filter by the object’s `permissionId` field. */
  permissionId?: Maybe<UuidFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `userRole` relation. */
  userRole?: Maybe<UserRoleFilter>;
  /** Filter by the object’s `permission` relation. */
  permission?: Maybe<PermissionFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserRolePermissionAssignmentFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserRolePermissionAssignmentFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserRolePermissionAssignmentFilter>;
};

/** An input for mutations affecting `UserRolePermissionAssignment` */
export type UserRolePermissionAssignmentInput = {
  userRoleId: Scalars['UUID'];
  permissionId: Scalars['UUID'];
};

/** A connection to a list of `UserRolePermissionAssignment` values. */
export type UserRolePermissionAssignmentsConnection = {
   __typename?: 'UserRolePermissionAssignmentsConnection';
  /** A list of `UserRolePermissionAssignment` objects. */
  nodes: Array<Maybe<UserRolePermissionAssignment>>;
  /** A list of edges which contains the `UserRolePermissionAssignment` and cursor to aid in pagination. */
  edges: Array<UserRolePermissionAssignmentsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserRolePermissionAssignment` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserRolePermissionAssignment` edge in the connection. */
export type UserRolePermissionAssignmentsEdge = {
   __typename?: 'UserRolePermissionAssignmentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserRolePermissionAssignment` at the end of the edge. */
  node?: Maybe<UserRolePermissionAssignment>;
};

/** Methods to use when ordering `UserRolePermissionAssignment`. */
export enum UserRolePermissionAssignmentsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  USER_ROLE_ID_ASC = 'USER_ROLE_ID_ASC',
  USER_ROLE_ID_DESC = 'USER_ROLE_ID_DESC',
  PERMISSION_ID_ASC = 'PERMISSION_ID_ASC',
  PERMISSION_ID_DESC = 'PERMISSION_ID_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `UserRole` values. */
export type UserRolesConnection = {
   __typename?: 'UserRolesConnection';
  /** A list of `UserRole` objects. */
  nodes: Array<Maybe<UserRole>>;
  /** A list of edges which contains the `UserRole` and cursor to aid in pagination. */
  edges: Array<UserRolesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserRole` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserRole` edge in the connection. */
export type UserRolesEdge = {
   __typename?: 'UserRolesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserRole` at the end of the edge. */
  node?: Maybe<UserRole>;
};

/** Methods to use when ordering `UserRole`. */
export enum UserRolesOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  DESCRIPTION_ASC = 'DESCRIPTION_ASC',
  DESCRIPTION_DESC = 'DESCRIPTION_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

export type UserRoleTagAssignment = {
   __typename?: 'UserRoleTagAssignment';
  id: Scalars['UUID'];
  userRoleId: Scalars['UUID'];
  tagId: Scalars['UUID'];
  tenantId: Scalars['UUID'];
  applicationId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  /** Reads a single `UserRole` that is related to this `UserRoleTagAssignment`. */
  userRole?: Maybe<UserRole>;
  /** Reads a single `Tag` that is related to this `UserRoleTagAssignment`. */
  tag?: Maybe<Tag>;
};

/**
 * A condition to be used against `UserRoleTagAssignment` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type UserRoleTagAssignmentCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userRoleId` field. */
  userRoleId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `tagId` field. */
  tagId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `tenantId` field. */
  tenantId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationId` field. */
  applicationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<Scalars['String']>;
};

/** A filter to be used against `UserRoleTagAssignment` object types. All fields are combined with a logical ‘and.’ */
export type UserRoleTagAssignmentFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `userRoleId` field. */
  userRoleId?: Maybe<UuidFilter>;
  /** Filter by the object’s `tagId` field. */
  tagId?: Maybe<UuidFilter>;
  /** Filter by the object’s `tenantId` field. */
  tenantId?: Maybe<UuidFilter>;
  /** Filter by the object’s `applicationId` field. */
  applicationId?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedBy` field. */
  updatedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `userRole` relation. */
  userRole?: Maybe<UserRoleFilter>;
  /** Filter by the object’s `tag` relation. */
  tag?: Maybe<TagFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserRoleTagAssignmentFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserRoleTagAssignmentFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserRoleTagAssignmentFilter>;
};

/** An input for mutations affecting `UserRoleTagAssignment` */
export type UserRoleTagAssignmentInput = {
  userRoleId: Scalars['UUID'];
  tagId: Scalars['UUID'];
};

/** A connection to a list of `UserRoleTagAssignment` values. */
export type UserRoleTagAssignmentsConnection = {
   __typename?: 'UserRoleTagAssignmentsConnection';
  /** A list of `UserRoleTagAssignment` objects. */
  nodes: Array<Maybe<UserRoleTagAssignment>>;
  /** A list of edges which contains the `UserRoleTagAssignment` and cursor to aid in pagination. */
  edges: Array<UserRoleTagAssignmentsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserRoleTagAssignment` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserRoleTagAssignment` edge in the connection. */
export type UserRoleTagAssignmentsEdge = {
   __typename?: 'UserRoleTagAssignmentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserRoleTagAssignment` at the end of the edge. */
  node?: Maybe<UserRoleTagAssignment>;
};

/** Methods to use when ordering `UserRoleTagAssignment`. */
export enum UserRoleTagAssignmentsOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  USER_ROLE_ID_ASC = 'USER_ROLE_ID_ASC',
  USER_ROLE_ID_DESC = 'USER_ROLE_ID_DESC',
  TAG_ID_ASC = 'TAG_ID_ASC',
  TAG_ID_DESC = 'TAG_ID_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

/** A filter to be used against many `UserRoleAssignment` object types. All fields are combined with a logical ‘and.’ */
export type UserRoleToManyUserRoleAssignmentFilter = {
  /** Every related `UserRoleAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<UserRoleAssignmentFilter>;
  /** Some related `UserRoleAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<UserRoleAssignmentFilter>;
  /** No related `UserRoleAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<UserRoleAssignmentFilter>;
};

/** A filter to be used against many `UserRoleParentAssignment` object types. All fields are combined with a logical ‘and.’ */
export type UserRoleToManyUserRoleParentAssignmentFilter = {
  /** Every related `UserRoleParentAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<UserRoleParentAssignmentFilter>;
  /** Some related `UserRoleParentAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<UserRoleParentAssignmentFilter>;
  /** No related `UserRoleParentAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<UserRoleParentAssignmentFilter>;
};

/** A filter to be used against many `UserRolePermissionAssignment` object types. All fields are combined with a logical ‘and.’ */
export type UserRoleToManyUserRolePermissionAssignmentFilter = {
  /** Every related `UserRolePermissionAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<UserRolePermissionAssignmentFilter>;
  /** Some related `UserRolePermissionAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<UserRolePermissionAssignmentFilter>;
  /** No related `UserRolePermissionAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<UserRolePermissionAssignmentFilter>;
};

/** A filter to be used against many `UserRoleTagAssignment` object types. All fields are combined with a logical ‘and.’ */
export type UserRoleToManyUserRoleTagAssignmentFilter = {
  /** Every related `UserRoleTagAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<UserRoleTagAssignmentFilter>;
  /** Some related `UserRoleTagAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<UserRoleTagAssignmentFilter>;
  /** No related `UserRoleTagAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<UserRoleTagAssignmentFilter>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
   __typename?: 'UsersConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
   __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  NATURAL = 'NATURAL',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  PROFILE_PICTURE_URL_ASC = 'PROFILE_PICTURE_URL_ASC',
  PROFILE_PICTURE_URL_DESC = 'PROFILE_PICTURE_URL_DESC',
  EMAIL_ASC = 'EMAIL_ASC',
  EMAIL_DESC = 'EMAIL_DESC',
  STATUS_ASC = 'STATUS_ASC',
  STATUS_DESC = 'STATUS_DESC',
  TENANT_ID_ASC = 'TENANT_ID_ASC',
  TENANT_ID_DESC = 'TENANT_ID_DESC',
  APPLICATION_ID_ASC = 'APPLICATION_ID_ASC',
  APPLICATION_ID_DESC = 'APPLICATION_ID_DESC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DESC = 'CREATED_AT_DESC',
  CREATED_BY_ASC = 'CREATED_BY_ASC',
  CREATED_BY_DESC = 'CREATED_BY_DESC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  UPDATED_BY_ASC = 'UPDATED_BY_ASC',
  UPDATED_BY_DESC = 'UPDATED_BY_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED'
}

/** A filter to be used against UserStatus fields. All fields are combined with a logical ‘and.’ */
export type UserStatusFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<UserStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<UserStatus>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<UserStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<UserStatus>;
  /** Included in the specified list. */
  in?: Maybe<Array<UserStatus>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<UserStatus>>;
  /** Less than the specified value. */
  lessThan?: Maybe<UserStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<UserStatus>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<UserStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<UserStatus>;
};

/** A filter to be used against many `UserRoleAssignment` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyUserRoleAssignmentFilter = {
  /** Every related `UserRoleAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<UserRoleAssignmentFilter>;
  /** Some related `UserRoleAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<UserRoleAssignmentFilter>;
  /** No related `UserRoleAssignment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<UserRoleAssignmentFilter>;
};


/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['UUID']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['UUID']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['UUID']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['UUID']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['UUID']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['UUID']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['UUID']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['UUID']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['UUID']>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['UUID']>>;
};

export type GetServiceTokenMutationVariables = {
  clientId: Scalars['String'];
  clientSecret: Scalars['String'];
};


export type GetServiceTokenMutation = (
  { __typename?: 'Mutation' }
  & { authenticateManagedServiceAccount: (
    { __typename?: 'AuthenticateServiceAccountPayload' }
    & Pick<AuthenticateServiceAccountPayload, 'accessToken' | 'expiresIn' | 'tokenType'>
  ) }
);

export type SyncPermissionsMutationVariables = {
  input: SynchronizePermissionsInput;
};


export type SyncPermissionsMutation = (
  { __typename?: 'Mutation' }
  & { synchronizePermissions?: Maybe<(
    { __typename?: 'SynchronizePermissionsPayload' }
    & Pick<SynchronizePermissionsPayload, 'added' | 'removed'>
  )> }
);


export const GetServiceTokenDocument = gql`
    mutation GetServiceToken($clientId: String!, $clientSecret: String!) {
  authenticateManagedServiceAccount(input: {clientId: $clientId, clientSecret: $clientSecret}) {
    accessToken
    expiresIn
    tokenType
  }
}
    `;
export const SyncPermissionsDocument = gql`
    mutation SyncPermissions($input: SynchronizePermissionsInput!) {
  synchronizePermissions(input: $input) {
    added
    removed
  }
}
    `;