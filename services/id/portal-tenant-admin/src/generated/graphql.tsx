import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: any;
  UUID: any;
  Datetime: any;
};

export type AuthenticateSuperUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthenticateSuperUserPayload = {
   __typename?: 'AuthenticateSuperUserPayload';
  accessToken: Scalars['String'];
  tokenType: Scalars['String'];
  expiresIn: Scalars['Int'];
};

export type BooleanFilter = {
  isNull?: Maybe<Scalars['Boolean']>;
  equalTo?: Maybe<Scalars['Boolean']>;
  notEqualTo?: Maybe<Scalars['Boolean']>;
  distinctFrom?: Maybe<Scalars['Boolean']>;
  notDistinctFrom?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Scalars['Boolean']>>;
  notIn?: Maybe<Array<Scalars['Boolean']>>;
  lessThan?: Maybe<Scalars['Boolean']>;
  lessThanOrEqualTo?: Maybe<Scalars['Boolean']>;
  greaterThan?: Maybe<Scalars['Boolean']>;
  greaterThanOrEqualTo?: Maybe<Scalars['Boolean']>;
};

export type CreateTenantAdminInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  tenantAdmin: TenantAdminInput;
};

export type CreateTenantAdminPayload = {
   __typename?: 'CreateTenantAdminPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  tenantAdmin?: Maybe<TenantAdmin>;
  tenant?: Maybe<Tenant>;
  tenantAdminEdge?: Maybe<TenantAdminsEdge>;
};


export type CreateTenantAdminPayloadTenantAdminEdgeArgs = {
  orderBy?: Maybe<Array<TenantAdminsOrderBy>>;
};

export type CreateTenantInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  tenant: TenantInput;
};

export type CreateTenantPayload = {
   __typename?: 'CreateTenantPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  tenant?: Maybe<Tenant>;
  tenantEdge?: Maybe<TenantsEdge>;
};


export type CreateTenantPayloadTenantEdgeArgs = {
  orderBy?: Maybe<Array<TenantsOrderBy>>;
};



export type DatetimeFilter = {
  isNull?: Maybe<Scalars['Boolean']>;
  equalTo?: Maybe<Scalars['Datetime']>;
  notEqualTo?: Maybe<Scalars['Datetime']>;
  distinctFrom?: Maybe<Scalars['Datetime']>;
  notDistinctFrom?: Maybe<Scalars['Datetime']>;
  in?: Maybe<Array<Scalars['Datetime']>>;
  notIn?: Maybe<Array<Scalars['Datetime']>>;
  lessThan?: Maybe<Scalars['Datetime']>;
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>;
  greaterThan?: Maybe<Scalars['Datetime']>;
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>;
};

export type DeleteTenantAdminInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

export type DeleteTenantAdminPayload = {
   __typename?: 'DeleteTenantAdminPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  tenantAdmin?: Maybe<TenantAdmin>;
  deletedTenantAdminNodeId?: Maybe<Scalars['ID']>;
  tenant?: Maybe<Tenant>;
  tenantAdminEdge?: Maybe<TenantAdminsEdge>;
};


export type DeleteTenantAdminPayloadTenantAdminEdgeArgs = {
  orderBy?: Maybe<Array<TenantAdminsOrderBy>>;
};

export type DeleteTenantInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

export type DeleteTenantPayload = {
   __typename?: 'DeleteTenantPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  tenant?: Maybe<Tenant>;
  deletedTenantNodeId?: Maybe<Scalars['ID']>;
  tenantEdge?: Maybe<TenantsEdge>;
};


export type DeleteTenantPayloadTenantEdgeArgs = {
  orderBy?: Maybe<Array<TenantsOrderBy>>;
};

export type GenerateTenantAdminPasswordInput = {
  id: Scalars['String'];
};

export type GenerateTenantAdminPasswordPayload = {
   __typename?: 'GenerateTenantAdminPasswordPayload';
  tenantAdmin?: Maybe<TenantAdmin>;
  password: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createTenant?: Maybe<CreateTenantPayload>;
  createTenantAdmin?: Maybe<CreateTenantAdminPayload>;
  updateTenant?: Maybe<UpdateTenantPayload>;
  updateTenantAdmin?: Maybe<UpdateTenantAdminPayload>;
  deleteTenant?: Maybe<DeleteTenantPayload>;
  deleteTenantAdmin?: Maybe<DeleteTenantAdminPayload>;
  authenticateSuperUser: AuthenticateSuperUserPayload;
  generateTenantAdminPassword?: Maybe<GenerateTenantAdminPasswordPayload>;
};


export type MutationCreateTenantArgs = {
  input: CreateTenantInput;
};


export type MutationCreateTenantAdminArgs = {
  input: CreateTenantAdminInput;
};


export type MutationUpdateTenantArgs = {
  input: UpdateTenantInput;
};


export type MutationUpdateTenantAdminArgs = {
  input: UpdateTenantAdminInput;
};


export type MutationDeleteTenantArgs = {
  input: DeleteTenantInput;
};


export type MutationDeleteTenantAdminArgs = {
  input: DeleteTenantAdminInput;
};


export type MutationAuthenticateSuperUserArgs = {
  input?: Maybe<AuthenticateSuperUserInput>;
};


export type MutationGenerateTenantAdminPasswordArgs = {
  input: GenerateTenantAdminPasswordInput;
};

export type PageInfo = {
   __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['Cursor']>;
  endCursor?: Maybe<Scalars['Cursor']>;
};

export type Query = {
   __typename?: 'Query';
  query: Query;
  tenants?: Maybe<TenantsConnection>;
  tenantAdmins?: Maybe<TenantAdminsConnection>;
  tenant?: Maybe<Tenant>;
  tenantAdmin?: Maybe<TenantAdmin>;
};


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


export type QueryTenantArgs = {
  id: Scalars['UUID'];
};


export type QueryTenantAdminArgs = {
  id: Scalars['UUID'];
};

export type StringFilter = {
  isNull?: Maybe<Scalars['Boolean']>;
  equalTo?: Maybe<Scalars['String']>;
  notEqualTo?: Maybe<Scalars['String']>;
  distinctFrom?: Maybe<Scalars['String']>;
  notDistinctFrom?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lessThan?: Maybe<Scalars['String']>;
  lessThanOrEqualTo?: Maybe<Scalars['String']>;
  greaterThan?: Maybe<Scalars['String']>;
  greaterThanOrEqualTo?: Maybe<Scalars['String']>;
  includes?: Maybe<Scalars['String']>;
  notIncludes?: Maybe<Scalars['String']>;
  includesInsensitive?: Maybe<Scalars['String']>;
  notIncludesInsensitive?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  notStartsWith?: Maybe<Scalars['String']>;
  startsWithInsensitive?: Maybe<Scalars['String']>;
  notStartsWithInsensitive?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  notEndsWith?: Maybe<Scalars['String']>;
  endsWithInsensitive?: Maybe<Scalars['String']>;
  notEndsWithInsensitive?: Maybe<Scalars['String']>;
  like?: Maybe<Scalars['String']>;
  notLike?: Maybe<Scalars['String']>;
  likeInsensitive?: Maybe<Scalars['String']>;
  notLikeInsensitive?: Maybe<Scalars['String']>;
  similarTo?: Maybe<Scalars['String']>;
  notSimilarTo?: Maybe<Scalars['String']>;
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
  tenantId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  createdBy: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  updatedBy: Scalars['String'];
  tenant?: Maybe<Tenant>;
};

export type TenantAdminCondition = {
  id?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  tenantId?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  createdBy?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  updatedBy?: Maybe<Scalars['String']>;
};

export type TenantAdminFilter = {
  id?: Maybe<UuidFilter>;
  name?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  active?: Maybe<BooleanFilter>;
  tenantId?: Maybe<UuidFilter>;
  createdAt?: Maybe<DatetimeFilter>;
  createdBy?: Maybe<StringFilter>;
  updatedAt?: Maybe<DatetimeFilter>;
  updatedBy?: Maybe<StringFilter>;
  tenant?: Maybe<TenantFilter>;
  and?: Maybe<Array<TenantAdminFilter>>;
  or?: Maybe<Array<TenantAdminFilter>>;
  not?: Maybe<TenantAdminFilter>;
};

export type TenantAdminInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  tenantId: Scalars['UUID'];
};

export type TenantAdminPatch = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type TenantAdminsConnection = {
   __typename?: 'TenantAdminsConnection';
  nodes: Array<Maybe<TenantAdmin>>;
  edges: Array<TenantAdminsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TenantAdminsEdge = {
   __typename?: 'TenantAdminsEdge';
  cursor?: Maybe<Scalars['Cursor']>;
  node?: Maybe<TenantAdmin>;
};

export enum TenantAdminsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  ActiveAsc = 'ACTIVE_ASC',
  ActiveDesc = 'ACTIVE_DESC',
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

export type TenantCondition = {
  id?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<TenantStatus>;
  createdAt?: Maybe<Scalars['Datetime']>;
  createdBy?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  updatedBy?: Maybe<Scalars['String']>;
};

export type TenantFilter = {
  id?: Maybe<UuidFilter>;
  name?: Maybe<StringFilter>;
  status?: Maybe<TenantStatusFilter>;
  createdAt?: Maybe<DatetimeFilter>;
  createdBy?: Maybe<StringFilter>;
  updatedAt?: Maybe<DatetimeFilter>;
  updatedBy?: Maybe<StringFilter>;
  tenantAdmins?: Maybe<TenantToManyTenantAdminFilter>;
  tenantAdminsExist?: Maybe<Scalars['Boolean']>;
  and?: Maybe<Array<TenantFilter>>;
  or?: Maybe<Array<TenantFilter>>;
  not?: Maybe<TenantFilter>;
};

export type TenantInput = {
  name: Scalars['String'];
};

export type TenantPatch = {
  name?: Maybe<Scalars['String']>;
  status?: Maybe<TenantStatus>;
};

export type TenantsConnection = {
   __typename?: 'TenantsConnection';
  nodes: Array<Maybe<Tenant>>;
  edges: Array<TenantsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TenantsEdge = {
   __typename?: 'TenantsEdge';
  cursor?: Maybe<Scalars['Cursor']>;
  node?: Maybe<Tenant>;
};

export enum TenantsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
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

export enum TenantStatus {
  Enabled = 'ENABLED',
  Disabled = 'DISABLED'
}

export type TenantStatusFilter = {
  isNull?: Maybe<Scalars['Boolean']>;
  equalTo?: Maybe<TenantStatus>;
  notEqualTo?: Maybe<TenantStatus>;
  distinctFrom?: Maybe<TenantStatus>;
  notDistinctFrom?: Maybe<TenantStatus>;
  in?: Maybe<Array<TenantStatus>>;
  notIn?: Maybe<Array<TenantStatus>>;
  lessThan?: Maybe<TenantStatus>;
  lessThanOrEqualTo?: Maybe<TenantStatus>;
  greaterThan?: Maybe<TenantStatus>;
  greaterThanOrEqualTo?: Maybe<TenantStatus>;
};

export type TenantToManyTenantAdminFilter = {
  every?: Maybe<TenantAdminFilter>;
  some?: Maybe<TenantAdminFilter>;
  none?: Maybe<TenantAdminFilter>;
};

export type UpdateTenantAdminInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  patch: TenantAdminPatch;
  id: Scalars['UUID'];
};

export type UpdateTenantAdminPayload = {
   __typename?: 'UpdateTenantAdminPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  tenantAdmin?: Maybe<TenantAdmin>;
  tenant?: Maybe<Tenant>;
  tenantAdminEdge?: Maybe<TenantAdminsEdge>;
};


export type UpdateTenantAdminPayloadTenantAdminEdgeArgs = {
  orderBy?: Maybe<Array<TenantAdminsOrderBy>>;
};

export type UpdateTenantInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  patch: TenantPatch;
  id: Scalars['UUID'];
};

export type UpdateTenantPayload = {
   __typename?: 'UpdateTenantPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  tenant?: Maybe<Tenant>;
  tenantEdge?: Maybe<TenantsEdge>;
};


export type UpdateTenantPayloadTenantEdgeArgs = {
  orderBy?: Maybe<Array<TenantsOrderBy>>;
};


export type UuidFilter = {
  isNull?: Maybe<Scalars['Boolean']>;
  equalTo?: Maybe<Scalars['UUID']>;
  notEqualTo?: Maybe<Scalars['UUID']>;
  distinctFrom?: Maybe<Scalars['UUID']>;
  notDistinctFrom?: Maybe<Scalars['UUID']>;
  in?: Maybe<Array<Scalars['UUID']>>;
  notIn?: Maybe<Array<Scalars['UUID']>>;
  lessThan?: Maybe<Scalars['UUID']>;
  lessThanOrEqualTo?: Maybe<Scalars['UUID']>;
  greaterThan?: Maybe<Scalars['UUID']>;
  greaterThanOrEqualTo?: Maybe<Scalars['UUID']>;
};

export type AuthenticateSuperUserMutationVariables = {
  dto: AuthenticateSuperUserInput;
};


export type AuthenticateSuperUserMutation = (
  { __typename?: 'Mutation' }
  & { authenticateSuperUser: (
    { __typename?: 'AuthenticateSuperUserPayload' }
    & Pick<AuthenticateSuperUserPayload, 'accessToken'>
  ) }
);

export type TenantAdminsQueryVariables = {
  dto: TenantAdminCondition;
};


export type TenantAdminsQuery = (
  { __typename?: 'Query' }
  & { tenantAdmins: Maybe<(
    { __typename?: 'TenantAdminsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'TenantAdmin' }
      & Pick<TenantAdmin, 'id' | 'name' | 'email' | 'active' | 'createdAt' | 'updatedAt'>
    )>> }
  )> }
);

export type CreateTenantAdminMutationVariables = {
  dto: CreateTenantAdminInput;
};


export type CreateTenantAdminMutation = (
  { __typename?: 'Mutation' }
  & { createTenantAdmin: Maybe<(
    { __typename?: 'CreateTenantAdminPayload' }
    & { tenantAdmin: Maybe<(
      { __typename?: 'TenantAdmin' }
      & Pick<TenantAdmin, 'id' | 'name' | 'email' | 'active' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);

export type UpdateTenantAdminMutationVariables = {
  dto: UpdateTenantAdminInput;
};


export type UpdateTenantAdminMutation = (
  { __typename?: 'Mutation' }
  & { updateTenantAdmin: Maybe<(
    { __typename?: 'UpdateTenantAdminPayload' }
    & { tenantAdmin: Maybe<(
      { __typename?: 'TenantAdmin' }
      & Pick<TenantAdmin, 'id' | 'name' | 'email' | 'active' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);

export type DeleteTenantAdminMutationVariables = {
  dto: DeleteTenantAdminInput;
};


export type DeleteTenantAdminMutation = (
  { __typename?: 'Mutation' }
  & { deleteTenantAdmin: Maybe<(
    { __typename?: 'DeleteTenantAdminPayload' }
    & { tenantAdmin: Maybe<(
      { __typename?: 'TenantAdmin' }
      & Pick<TenantAdmin, 'id'>
    )> }
  )> }
);

export type GenerateTenantAdminPasswordMutationVariables = {
  dto: GenerateTenantAdminPasswordInput;
};


export type GenerateTenantAdminPasswordMutation = (
  { __typename?: 'Mutation' }
  & { generateTenantAdminPassword: Maybe<(
    { __typename?: 'GenerateTenantAdminPasswordPayload' }
    & Pick<GenerateTenantAdminPasswordPayload, 'password'>
  )> }
);

export type AllTenantsQueryVariables = {};


export type AllTenantsQuery = (
  { __typename?: 'Query' }
  & { tenants: Maybe<(
    { __typename?: 'TenantsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Tenant' }
      & Pick<Tenant, 'id' | 'name' | 'status' | 'createdAt' | 'updatedAt'>
    )>> }
  )> }
);

export type CreateTenantMutationVariables = {
  dto: CreateTenantInput;
};


export type CreateTenantMutation = (
  { __typename?: 'Mutation' }
  & { createTenant: Maybe<(
    { __typename?: 'CreateTenantPayload' }
    & { tenant: Maybe<(
      { __typename?: 'Tenant' }
      & Pick<Tenant, 'id' | 'name' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);

export type DeleteTenantMutationVariables = {
  dto: DeleteTenantInput;
};


export type DeleteTenantMutation = (
  { __typename?: 'Mutation' }
  & { deleteTenant: Maybe<(
    { __typename?: 'DeleteTenantPayload' }
    & { tenant: Maybe<(
      { __typename?: 'Tenant' }
      & Pick<Tenant, 'id'>
    )> }
  )> }
);

export type UpdateTenantMutationVariables = {
  dto: UpdateTenantInput;
};


export type UpdateTenantMutation = (
  { __typename?: 'Mutation' }
  & { updateTenant: Maybe<(
    { __typename?: 'UpdateTenantPayload' }
    & { tenant: Maybe<(
      { __typename?: 'Tenant' }
      & Pick<Tenant, 'id' | 'name' | 'status' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);


export const AuthenticateSuperUserDocument = gql`
    mutation AuthenticateSuperUser($dto: AuthenticateSuperUserInput!) {
  authenticateSuperUser(input: $dto) {
    accessToken
  }
}
    `;
export type AuthenticateSuperUserMutationFn = ApolloReactCommon.MutationFunction<AuthenticateSuperUserMutation, AuthenticateSuperUserMutationVariables>;

/**
 * __useAuthenticateSuperUserMutation__
 *
 * To run a mutation, you first call `useAuthenticateSuperUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateSuperUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateSuperUserMutation, { data, loading, error }] = useAuthenticateSuperUserMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useAuthenticateSuperUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthenticateSuperUserMutation, AuthenticateSuperUserMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthenticateSuperUserMutation, AuthenticateSuperUserMutationVariables>(AuthenticateSuperUserDocument, baseOptions);
      }
export type AuthenticateSuperUserMutationHookResult = ReturnType<typeof useAuthenticateSuperUserMutation>;
export type AuthenticateSuperUserMutationResult = ApolloReactCommon.MutationResult<AuthenticateSuperUserMutation>;
export type AuthenticateSuperUserMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthenticateSuperUserMutation, AuthenticateSuperUserMutationVariables>;
export const TenantAdminsDocument = gql`
    query TenantAdmins($dto: TenantAdminCondition!) {
  tenantAdmins(condition: $dto) {
    nodes {
      id
      name
      email
      active
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useTenantAdminsQuery__
 *
 * To run a query within a React component, call `useTenantAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTenantAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTenantAdminsQuery({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useTenantAdminsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TenantAdminsQuery, TenantAdminsQueryVariables>) {
        return ApolloReactHooks.useQuery<TenantAdminsQuery, TenantAdminsQueryVariables>(TenantAdminsDocument, baseOptions);
      }
export function useTenantAdminsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TenantAdminsQuery, TenantAdminsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TenantAdminsQuery, TenantAdminsQueryVariables>(TenantAdminsDocument, baseOptions);
        }
export type TenantAdminsQueryHookResult = ReturnType<typeof useTenantAdminsQuery>;
export type TenantAdminsLazyQueryHookResult = ReturnType<typeof useTenantAdminsLazyQuery>;
export type TenantAdminsQueryResult = ApolloReactCommon.QueryResult<TenantAdminsQuery, TenantAdminsQueryVariables>;
export const CreateTenantAdminDocument = gql`
    mutation CreateTenantAdmin($dto: CreateTenantAdminInput!) {
  createTenantAdmin(input: $dto) {
    tenantAdmin {
      id
      name
      email
      active
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateTenantAdminMutationFn = ApolloReactCommon.MutationFunction<CreateTenantAdminMutation, CreateTenantAdminMutationVariables>;

/**
 * __useCreateTenantAdminMutation__
 *
 * To run a mutation, you first call `useCreateTenantAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTenantAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTenantAdminMutation, { data, loading, error }] = useCreateTenantAdminMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useCreateTenantAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTenantAdminMutation, CreateTenantAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTenantAdminMutation, CreateTenantAdminMutationVariables>(CreateTenantAdminDocument, baseOptions);
      }
export type CreateTenantAdminMutationHookResult = ReturnType<typeof useCreateTenantAdminMutation>;
export type CreateTenantAdminMutationResult = ApolloReactCommon.MutationResult<CreateTenantAdminMutation>;
export type CreateTenantAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTenantAdminMutation, CreateTenantAdminMutationVariables>;
export const UpdateTenantAdminDocument = gql`
    mutation UpdateTenantAdmin($dto: UpdateTenantAdminInput!) {
  updateTenantAdmin(input: $dto) {
    tenantAdmin {
      id
      name
      email
      active
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdateTenantAdminMutationFn = ApolloReactCommon.MutationFunction<UpdateTenantAdminMutation, UpdateTenantAdminMutationVariables>;

/**
 * __useUpdateTenantAdminMutation__
 *
 * To run a mutation, you first call `useUpdateTenantAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTenantAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTenantAdminMutation, { data, loading, error }] = useUpdateTenantAdminMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useUpdateTenantAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTenantAdminMutation, UpdateTenantAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTenantAdminMutation, UpdateTenantAdminMutationVariables>(UpdateTenantAdminDocument, baseOptions);
      }
export type UpdateTenantAdminMutationHookResult = ReturnType<typeof useUpdateTenantAdminMutation>;
export type UpdateTenantAdminMutationResult = ApolloReactCommon.MutationResult<UpdateTenantAdminMutation>;
export type UpdateTenantAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTenantAdminMutation, UpdateTenantAdminMutationVariables>;
export const DeleteTenantAdminDocument = gql`
    mutation DeleteTenantAdmin($dto: DeleteTenantAdminInput!) {
  deleteTenantAdmin(input: $dto) {
    tenantAdmin {
      id
    }
  }
}
    `;
export type DeleteTenantAdminMutationFn = ApolloReactCommon.MutationFunction<DeleteTenantAdminMutation, DeleteTenantAdminMutationVariables>;

/**
 * __useDeleteTenantAdminMutation__
 *
 * To run a mutation, you first call `useDeleteTenantAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTenantAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTenantAdminMutation, { data, loading, error }] = useDeleteTenantAdminMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useDeleteTenantAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTenantAdminMutation, DeleteTenantAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTenantAdminMutation, DeleteTenantAdminMutationVariables>(DeleteTenantAdminDocument, baseOptions);
      }
export type DeleteTenantAdminMutationHookResult = ReturnType<typeof useDeleteTenantAdminMutation>;
export type DeleteTenantAdminMutationResult = ApolloReactCommon.MutationResult<DeleteTenantAdminMutation>;
export type DeleteTenantAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTenantAdminMutation, DeleteTenantAdminMutationVariables>;
export const GenerateTenantAdminPasswordDocument = gql`
    mutation generateTenantAdminPassword($dto: GenerateTenantAdminPasswordInput!) {
  generateTenantAdminPassword(input: $dto) {
    password
  }
}
    `;
export type GenerateTenantAdminPasswordMutationFn = ApolloReactCommon.MutationFunction<GenerateTenantAdminPasswordMutation, GenerateTenantAdminPasswordMutationVariables>;

/**
 * __useGenerateTenantAdminPasswordMutation__
 *
 * To run a mutation, you first call `useGenerateTenantAdminPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTenantAdminPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTenantAdminPasswordMutation, { data, loading, error }] = useGenerateTenantAdminPasswordMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useGenerateTenantAdminPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GenerateTenantAdminPasswordMutation, GenerateTenantAdminPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<GenerateTenantAdminPasswordMutation, GenerateTenantAdminPasswordMutationVariables>(GenerateTenantAdminPasswordDocument, baseOptions);
      }
export type GenerateTenantAdminPasswordMutationHookResult = ReturnType<typeof useGenerateTenantAdminPasswordMutation>;
export type GenerateTenantAdminPasswordMutationResult = ApolloReactCommon.MutationResult<GenerateTenantAdminPasswordMutation>;
export type GenerateTenantAdminPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<GenerateTenantAdminPasswordMutation, GenerateTenantAdminPasswordMutationVariables>;
export const AllTenantsDocument = gql`
    query AllTenants {
  tenants {
    nodes {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useAllTenantsQuery__
 *
 * To run a query within a React component, call `useAllTenantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTenantsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTenantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTenantsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllTenantsQuery, AllTenantsQueryVariables>) {
        return ApolloReactHooks.useQuery<AllTenantsQuery, AllTenantsQueryVariables>(AllTenantsDocument, baseOptions);
      }
export function useAllTenantsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllTenantsQuery, AllTenantsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllTenantsQuery, AllTenantsQueryVariables>(AllTenantsDocument, baseOptions);
        }
export type AllTenantsQueryHookResult = ReturnType<typeof useAllTenantsQuery>;
export type AllTenantsLazyQueryHookResult = ReturnType<typeof useAllTenantsLazyQuery>;
export type AllTenantsQueryResult = ApolloReactCommon.QueryResult<AllTenantsQuery, AllTenantsQueryVariables>;
export const CreateTenantDocument = gql`
    mutation CreateTenant($dto: CreateTenantInput!) {
  createTenant(input: $dto) {
    tenant {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateTenantMutationFn = ApolloReactCommon.MutationFunction<CreateTenantMutation, CreateTenantMutationVariables>;

/**
 * __useCreateTenantMutation__
 *
 * To run a mutation, you first call `useCreateTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTenantMutation, { data, loading, error }] = useCreateTenantMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useCreateTenantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTenantMutation, CreateTenantMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTenantMutation, CreateTenantMutationVariables>(CreateTenantDocument, baseOptions);
      }
export type CreateTenantMutationHookResult = ReturnType<typeof useCreateTenantMutation>;
export type CreateTenantMutationResult = ApolloReactCommon.MutationResult<CreateTenantMutation>;
export type CreateTenantMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTenantMutation, CreateTenantMutationVariables>;
export const DeleteTenantDocument = gql`
    mutation DeleteTenant($dto: DeleteTenantInput!) {
  deleteTenant(input: $dto) {
    tenant {
      id
    }
  }
}
    `;
export type DeleteTenantMutationFn = ApolloReactCommon.MutationFunction<DeleteTenantMutation, DeleteTenantMutationVariables>;

/**
 * __useDeleteTenantMutation__
 *
 * To run a mutation, you first call `useDeleteTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTenantMutation, { data, loading, error }] = useDeleteTenantMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useDeleteTenantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTenantMutation, DeleteTenantMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTenantMutation, DeleteTenantMutationVariables>(DeleteTenantDocument, baseOptions);
      }
export type DeleteTenantMutationHookResult = ReturnType<typeof useDeleteTenantMutation>;
export type DeleteTenantMutationResult = ApolloReactCommon.MutationResult<DeleteTenantMutation>;
export type DeleteTenantMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTenantMutation, DeleteTenantMutationVariables>;
export const UpdateTenantDocument = gql`
    mutation UpdateTenant($dto: UpdateTenantInput!) {
  updateTenant(input: $dto) {
    tenant {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdateTenantMutationFn = ApolloReactCommon.MutationFunction<UpdateTenantMutation, UpdateTenantMutationVariables>;

/**
 * __useUpdateTenantMutation__
 *
 * To run a mutation, you first call `useUpdateTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTenantMutation, { data, loading, error }] = useUpdateTenantMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useUpdateTenantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTenantMutation, UpdateTenantMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTenantMutation, UpdateTenantMutationVariables>(UpdateTenantDocument, baseOptions);
      }
export type UpdateTenantMutationHookResult = ReturnType<typeof useUpdateTenantMutation>;
export type UpdateTenantMutationResult = ApolloReactCommon.MutationResult<UpdateTenantMutation>;
export type UpdateTenantMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTenantMutation, UpdateTenantMutationVariables>;