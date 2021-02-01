import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: any };
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: any;
};

export enum Archiving {
  None = 'NONE',
  Tar = 'TAR',
  SingleTar = 'SINGLE_TAR'
}

/** A filter to be used against Archiving fields. All fields are combined with a logical ‘and.’ */
export type ArchivingFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Archiving>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Archiving>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Archiving>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Archiving>;
  /** Included in the specified list. */
  in?: Maybe<Array<Archiving>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Archiving>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Archiving>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Archiving>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Archiving>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Archiving>;
};


/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type BigIntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['BigInt']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['BigInt']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['BigInt']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['BigInt']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['BigInt']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['BigInt']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['BigInt']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['BigInt']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['BigInt']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Boolean']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Boolean']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Boolean']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Boolean']>;
};

/**
 * All input for the create `TranscodingProcessingProfile` mutation.
 * @permissions: ADMIN
 */
export type CreateTranscodingProcessingProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TranscodingProcessingProfile` to be created by this mutation. */
  transcodingProcessingProfile: TranscodingProcessingProfileInput;
};

/** The output of our create `TranscodingProcessingProfile` mutation. */
export type CreateTranscodingProcessingProfilePayload = {
  __typename?: 'CreateTranscodingProcessingProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TranscodingProcessingProfile` that was created by this mutation. */
  transcodingProcessingProfile?: Maybe<TranscodingProcessingProfile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `TranscodingProcessingProfile`. May be used by Relay 1. */
  transcodingProcessingProfileEdge?: Maybe<TranscodingProcessingProfilesEdge>;
};


/** The output of our create `TranscodingProcessingProfile` mutation. */
export type CreateTranscodingProcessingProfilePayloadTranscodingProcessingProfileEdgeArgs = {
  orderBy?: Maybe<Array<TranscodingProcessingProfilesOrderBy>>;
};

/**
 * All input for the create `TranscodingVideoRepresentation` mutation.
 * @permissions: ADMIN
 */
export type CreateTranscodingVideoRepresentationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TranscodingVideoRepresentation` to be created by this mutation. */
  transcodingVideoRepresentation: TranscodingVideoRepresentationInput;
};

/** The output of our create `TranscodingVideoRepresentation` mutation. */
export type CreateTranscodingVideoRepresentationPayload = {
  __typename?: 'CreateTranscodingVideoRepresentationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TranscodingVideoRepresentation` that was created by this mutation. */
  transcodingVideoRepresentation?: Maybe<TranscodingVideoRepresentation>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TranscodingProcessingProfile` that is related to this `TranscodingVideoRepresentation`. */
  transcodingProcessingProfile?: Maybe<TranscodingProcessingProfile>;
  /** An edge for our `TranscodingVideoRepresentation`. May be used by Relay 1. */
  transcodingVideoRepresentationEdge?: Maybe<TranscodingVideoRepresentationsEdge>;
};


/** The output of our create `TranscodingVideoRepresentation` mutation. */
export type CreateTranscodingVideoRepresentationPayloadTranscodingVideoRepresentationEdgeArgs = {
  orderBy?: Maybe<Array<TranscodingVideoRepresentationsOrderBy>>;
};

/**
 * All input for the create `VideosTag` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type CreateVideosTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `VideosTag` to be created by this mutation. */
  videosTag: VideosTagInput;
};

/** The output of our create `VideosTag` mutation. */
export type CreateVideosTagPayload = {
  __typename?: 'CreateVideosTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `VideosTag` that was created by this mutation. */
  videosTag?: Maybe<VideosTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Video` that is related to this `VideosTag`. */
  video?: Maybe<Video>;
  /** An edge for our `VideosTag`. May be used by Relay 1. */
  videosTagEdge?: Maybe<VideosTagsEdge>;
};


/** The output of our create `VideosTag` mutation. */
export type CreateVideosTagPayloadVideosTagEdgeArgs = {
  orderBy?: Maybe<Array<VideosTagsOrderBy>>;
};



/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Datetime']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Datetime']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>;
};

/**
 * All input for the `deleteTranscodingProcessingProfileByNodeId` mutation.
 * @permissions: ADMIN
 */
export type DeleteTranscodingProcessingProfileByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TranscodingProcessingProfile` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTranscodingProcessingProfile` mutation.
 * @permissions: ADMIN
 */
export type DeleteTranscodingProcessingProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `TranscodingProcessingProfile` mutation. */
export type DeleteTranscodingProcessingProfilePayload = {
  __typename?: 'DeleteTranscodingProcessingProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TranscodingProcessingProfile` that was deleted by this mutation. */
  transcodingProcessingProfile?: Maybe<TranscodingProcessingProfile>;
  deletedTranscodingProcessingProfileNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `TranscodingProcessingProfile`. May be used by Relay 1. */
  transcodingProcessingProfileEdge?: Maybe<TranscodingProcessingProfilesEdge>;
};


/** The output of our delete `TranscodingProcessingProfile` mutation. */
export type DeleteTranscodingProcessingProfilePayloadTranscodingProcessingProfileEdgeArgs = {
  orderBy?: Maybe<Array<TranscodingProcessingProfilesOrderBy>>;
};

/**
 * All input for the `deleteTranscodingVideoRepresentationByNodeId` mutation.
 * @permissions: ADMIN
 */
export type DeleteTranscodingVideoRepresentationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TranscodingVideoRepresentation` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTranscodingVideoRepresentation` mutation.
 * @permissions: ADMIN
 */
export type DeleteTranscodingVideoRepresentationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `TranscodingVideoRepresentation` mutation. */
export type DeleteTranscodingVideoRepresentationPayload = {
  __typename?: 'DeleteTranscodingVideoRepresentationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TranscodingVideoRepresentation` that was deleted by this mutation. */
  transcodingVideoRepresentation?: Maybe<TranscodingVideoRepresentation>;
  deletedTranscodingVideoRepresentationNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TranscodingProcessingProfile` that is related to this `TranscodingVideoRepresentation`. */
  transcodingProcessingProfile?: Maybe<TranscodingProcessingProfile>;
  /** An edge for our `TranscodingVideoRepresentation`. May be used by Relay 1. */
  transcodingVideoRepresentationEdge?: Maybe<TranscodingVideoRepresentationsEdge>;
};


/** The output of our delete `TranscodingVideoRepresentation` mutation. */
export type DeleteTranscodingVideoRepresentationPayloadTranscodingVideoRepresentationEdgeArgs = {
  orderBy?: Maybe<Array<TranscodingVideoRepresentationsOrderBy>>;
};

/**
 * All input for the `deleteVideoByExternalId` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type DeleteVideoByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
};

/**
 * All input for the `deleteVideoByNodeId` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type DeleteVideoByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Video` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteVideoBySourceLocation` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type DeleteVideoBySourceLocationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  sourceLocation: Scalars['String'];
};

/**
 * All input for the `deleteVideo` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type DeleteVideoInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Video` mutation. */
export type DeleteVideoPayload = {
  __typename?: 'DeleteVideoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Video` that was deleted by this mutation. */
  video?: Maybe<Video>;
  deletedVideoNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Video`. May be used by Relay 1. */
  videoEdge?: Maybe<VideosEdge>;
};


/** The output of our delete `Video` mutation. */
export type DeleteVideoPayloadVideoEdgeArgs = {
  orderBy?: Maybe<Array<VideosOrderBy>>;
};

/**
 * All input for the `deleteVideosTagByNodeId` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type DeleteVideosTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `VideosTag` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteVideosTag` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type DeleteVideosTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  videoId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `VideosTag` mutation. */
export type DeleteVideosTagPayload = {
  __typename?: 'DeleteVideosTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `VideosTag` that was deleted by this mutation. */
  videosTag?: Maybe<VideosTag>;
  deletedVideosTagNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Video` that is related to this `VideosTag`. */
  video?: Maybe<Video>;
  /** An edge for our `VideosTag`. May be used by Relay 1. */
  videosTagEdge?: Maybe<VideosTagsEdge>;
};


/** The output of our delete `VideosTag` mutation. */
export type DeleteVideosTagPayloadVideosTagEdgeArgs = {
  orderBy?: Maybe<Array<VideosTagsOrderBy>>;
};

export enum DrmProtection {
  None = 'NONE',
  Managed = 'MANAGED'
}

/** A filter to be used against DrmProtection fields. All fields are combined with a logical ‘and.’ */
export type DrmProtectionFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<DrmProtection>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<DrmProtection>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<DrmProtection>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<DrmProtection>;
  /** Included in the specified list. */
  in?: Maybe<Array<DrmProtection>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<DrmProtection>>;
  /** Less than the specified value. */
  lessThan?: Maybe<DrmProtection>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<DrmProtection>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<DrmProtection>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<DrmProtection>;
};

/** A `Archiving` edge in the connection. */
export type GetArchivingValueEdge = {
  __typename?: 'GetArchivingValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Archiving` at the end of the edge. */
  node?: Maybe<Archiving>;
};

/** A connection to a list of `Archiving` values. */
export type GetArchivingValuesConnection = {
  __typename?: 'GetArchivingValuesConnection';
  /** A list of `Archiving` objects. */
  nodes: Array<Maybe<Archiving>>;
  /** A list of edges which contains the `Archiving` and cursor to aid in pagination. */
  edges: Array<GetArchivingValueEdge>;
  /** The count of *all* `Archiving` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `DrmProtection` edge in the connection. */
export type GetDrmProtectionValueEdge = {
  __typename?: 'GetDrmProtectionValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `DrmProtection` at the end of the edge. */
  node?: Maybe<DrmProtection>;
};

/** A connection to a list of `DrmProtection` values. */
export type GetDrmProtectionValuesConnection = {
  __typename?: 'GetDrmProtectionValuesConnection';
  /** A list of `DrmProtection` objects. */
  nodes: Array<Maybe<DrmProtection>>;
  /** A list of edges which contains the `DrmProtection` and cursor to aid in pagination. */
  edges: Array<GetDrmProtectionValueEdge>;
  /** The count of *all* `DrmProtection` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `OutputFormat` edge in the connection. */
export type GetOutputFormatValueEdge = {
  __typename?: 'GetOutputFormatValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `OutputFormat` at the end of the edge. */
  node?: Maybe<OutputFormat>;
};

/** A connection to a list of `OutputFormat` values. */
export type GetOutputFormatValuesConnection = {
  __typename?: 'GetOutputFormatValuesConnection';
  /** A list of `OutputFormat` objects. */
  nodes: Array<Maybe<OutputFormat>>;
  /** A list of edges which contains the `OutputFormat` and cursor to aid in pagination. */
  edges: Array<GetOutputFormatValueEdge>;
  /** The count of *all* `OutputFormat` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `QaStatus` edge in the connection. */
export type GetQaStatusValueEdge = {
  __typename?: 'GetQaStatusValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `QaStatus` at the end of the edge. */
  node?: Maybe<QaStatus>;
};

/** A connection to a list of `QaStatus` values. */
export type GetQaStatusValuesConnection = {
  __typename?: 'GetQaStatusValuesConnection';
  /** A list of `QaStatus` objects. */
  nodes: Array<Maybe<QaStatus>>;
  /** A list of edges which contains the `QaStatus` and cursor to aid in pagination. */
  edges: Array<GetQaStatusValueEdge>;
  /** The count of *all* `QaStatus` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TranscodingStatus` edge in the connection. */
export type GetTranscodingStatusValueEdge = {
  __typename?: 'GetTranscodingStatusValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TranscodingStatus` at the end of the edge. */
  node?: Maybe<TranscodingStatus>;
};

/** A connection to a list of `TranscodingStatus` values. */
export type GetTranscodingStatusValuesConnection = {
  __typename?: 'GetTranscodingStatusValuesConnection';
  /** A list of `TranscodingStatus` objects. */
  nodes: Array<Maybe<TranscodingStatus>>;
  /** A list of edges which contains the `TranscodingStatus` and cursor to aid in pagination. */
  edges: Array<GetTranscodingStatusValueEdge>;
  /** The count of *all* `TranscodingStatus` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Int']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Int']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Int']>;
};

/** A filter to be used against Int List fields. All fields are combined with a logical ‘and.’ */
export type IntListFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Contains the specified list of values. */
  contains?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Contained by the specified list of values. */
  containedBy?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Overlaps the specified list of values. */
  overlaps?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Any array item is equal to the specified value. */
  anyEqualTo?: Maybe<Scalars['Int']>;
  /** Any array item is not equal to the specified value. */
  anyNotEqualTo?: Maybe<Scalars['Int']>;
  /** Any array item is less than the specified value. */
  anyLessThan?: Maybe<Scalars['Int']>;
  /** Any array item is less than or equal to the specified value. */
  anyLessThanOrEqualTo?: Maybe<Scalars['Int']>;
  /** Any array item is greater than the specified value. */
  anyGreaterThan?: Maybe<Scalars['Int']>;
  /** Any array item is greater than or equal to the specified value. */
  anyGreaterThanOrEqualTo?: Maybe<Scalars['Int']>;
};


/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type JsonFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['JSON']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['JSON']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['JSON']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['JSON']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['JSON']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['JSON']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['JSON']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['JSON']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['JSON']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['JSON']>;
  /** Contains the specified JSON. */
  contains?: Maybe<Scalars['JSON']>;
  /** Contains the specified key. */
  containsKey?: Maybe<Scalars['String']>;
  /** Contains all of the specified keys. */
  containsAllKeys?: Maybe<Array<Scalars['String']>>;
  /** Contains any of the specified keys. */
  containsAnyKeys?: Maybe<Array<Scalars['String']>>;
  /** Contained by the specified JSON. */
  containedBy?: Maybe<Scalars['JSON']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `TranscodingProcessingProfile`. */
  createTranscodingProcessingProfile?: Maybe<CreateTranscodingProcessingProfilePayload>;
  /** Creates a single `TranscodingVideoRepresentation`. */
  createTranscodingVideoRepresentation?: Maybe<CreateTranscodingVideoRepresentationPayload>;
  /** Creates a single `VideosTag`. */
  createVideosTag?: Maybe<CreateVideosTagPayload>;
  /** Updates a single `TranscodingAcquisitionProfile` using its globally unique id and a patch. */
  updateTranscodingAcquisitionProfileByNodeId?: Maybe<UpdateTranscodingAcquisitionProfilePayload>;
  /** Updates a single `TranscodingAcquisitionProfile` using a unique key and a patch. */
  updateTranscodingAcquisitionProfile?: Maybe<UpdateTranscodingAcquisitionProfilePayload>;
  /** Updates a single `TranscodingProcessingProfile` using its globally unique id and a patch. */
  updateTranscodingProcessingProfileByNodeId?: Maybe<UpdateTranscodingProcessingProfilePayload>;
  /** Updates a single `TranscodingProcessingProfile` using a unique key and a patch. */
  updateTranscodingProcessingProfile?: Maybe<UpdateTranscodingProcessingProfilePayload>;
  /** Updates a single `TranscodingPublishingProfile` using its globally unique id and a patch. */
  updateTranscodingPublishingProfileByNodeId?: Maybe<UpdateTranscodingPublishingProfilePayload>;
  /** Updates a single `TranscodingPublishingProfile` using a unique key and a patch. */
  updateTranscodingPublishingProfile?: Maybe<UpdateTranscodingPublishingProfilePayload>;
  /** Updates a single `TranscodingVideoRepresentation` using its globally unique id and a patch. */
  updateTranscodingVideoRepresentationByNodeId?: Maybe<UpdateTranscodingVideoRepresentationPayload>;
  /** Updates a single `TranscodingVideoRepresentation` using a unique key and a patch. */
  updateTranscodingVideoRepresentation?: Maybe<UpdateTranscodingVideoRepresentationPayload>;
  /** Updates a single `Video` using its globally unique id and a patch. */
  updateVideoByNodeId?: Maybe<UpdateVideoPayload>;
  /** Updates a single `Video` using a unique key and a patch. */
  updateVideo?: Maybe<UpdateVideoPayload>;
  /** Updates a single `Video` using a unique key and a patch. */
  updateVideoByExternalId?: Maybe<UpdateVideoPayload>;
  /** Updates a single `Video` using a unique key and a patch. */
  updateVideoBySourceLocation?: Maybe<UpdateVideoPayload>;
  /** Updates a single `VideosTag` using its globally unique id and a patch. */
  updateVideosTagByNodeId?: Maybe<UpdateVideosTagPayload>;
  /** Updates a single `VideosTag` using a unique key and a patch. */
  updateVideosTag?: Maybe<UpdateVideosTagPayload>;
  /** Deletes a single `TranscodingProcessingProfile` using its globally unique id. */
  deleteTranscodingProcessingProfileByNodeId?: Maybe<DeleteTranscodingProcessingProfilePayload>;
  /** Deletes a single `TranscodingProcessingProfile` using a unique key. */
  deleteTranscodingProcessingProfile?: Maybe<DeleteTranscodingProcessingProfilePayload>;
  /** Deletes a single `TranscodingVideoRepresentation` using its globally unique id. */
  deleteTranscodingVideoRepresentationByNodeId?: Maybe<DeleteTranscodingVideoRepresentationPayload>;
  /** Deletes a single `TranscodingVideoRepresentation` using a unique key. */
  deleteTranscodingVideoRepresentation?: Maybe<DeleteTranscodingVideoRepresentationPayload>;
  /** Deletes a single `Video` using its globally unique id. */
  deleteVideoByNodeId?: Maybe<DeleteVideoPayload>;
  /** Deletes a single `Video` using a unique key. */
  deleteVideo?: Maybe<DeleteVideoPayload>;
  /** Deletes a single `Video` using a unique key. */
  deleteVideoByExternalId?: Maybe<DeleteVideoPayload>;
  /** Deletes a single `Video` using a unique key. */
  deleteVideoBySourceLocation?: Maybe<DeleteVideoPayload>;
  /** Deletes a single `VideosTag` using its globally unique id. */
  deleteVideosTagByNodeId?: Maybe<DeleteVideosTagPayload>;
  /** Deletes a single `VideosTag` using a unique key. */
  deleteVideosTag?: Maybe<DeleteVideosTagPayload>;
  startVipJob?: Maybe<StartVipJobPayload>;
  populateVideos?: Maybe<PopulatePayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTranscodingProcessingProfileArgs = {
  input: CreateTranscodingProcessingProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTranscodingVideoRepresentationArgs = {
  input: CreateTranscodingVideoRepresentationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVideosTagArgs = {
  input: CreateVideosTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTranscodingAcquisitionProfileByNodeIdArgs = {
  input: UpdateTranscodingAcquisitionProfileByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTranscodingAcquisitionProfileArgs = {
  input: UpdateTranscodingAcquisitionProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTranscodingProcessingProfileByNodeIdArgs = {
  input: UpdateTranscodingProcessingProfileByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTranscodingProcessingProfileArgs = {
  input: UpdateTranscodingProcessingProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTranscodingPublishingProfileByNodeIdArgs = {
  input: UpdateTranscodingPublishingProfileByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTranscodingPublishingProfileArgs = {
  input: UpdateTranscodingPublishingProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTranscodingVideoRepresentationByNodeIdArgs = {
  input: UpdateTranscodingVideoRepresentationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTranscodingVideoRepresentationArgs = {
  input: UpdateTranscodingVideoRepresentationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVideoByNodeIdArgs = {
  input: UpdateVideoByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVideoArgs = {
  input: UpdateVideoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVideoByExternalIdArgs = {
  input: UpdateVideoByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVideoBySourceLocationArgs = {
  input: UpdateVideoBySourceLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVideosTagByNodeIdArgs = {
  input: UpdateVideosTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVideosTagArgs = {
  input: UpdateVideosTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTranscodingProcessingProfileByNodeIdArgs = {
  input: DeleteTranscodingProcessingProfileByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTranscodingProcessingProfileArgs = {
  input: DeleteTranscodingProcessingProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTranscodingVideoRepresentationByNodeIdArgs = {
  input: DeleteTranscodingVideoRepresentationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTranscodingVideoRepresentationArgs = {
  input: DeleteTranscodingVideoRepresentationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVideoByNodeIdArgs = {
  input: DeleteVideoByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVideoArgs = {
  input: DeleteVideoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVideoByExternalIdArgs = {
  input: DeleteVideoByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVideoBySourceLocationArgs = {
  input: DeleteVideoBySourceLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVideosTagByNodeIdArgs = {
  input: DeleteVideosTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVideosTagArgs = {
  input: DeleteVideosTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationStartVipJobArgs = {
  input: StartVipJobInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationPopulateVideosArgs = {
  input: PopulateInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export enum OutputFormat {
  Hls = 'HLS',
  Dash = 'DASH',
  HlsDash = 'HLS_DASH',
  Cmaf = 'CMAF'
}

/** A filter to be used against OutputFormat fields. All fields are combined with a logical ‘and.’ */
export type OutputFormatFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<OutputFormat>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<OutputFormat>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<OutputFormat>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<OutputFormat>;
  /** Included in the specified list. */
  in?: Maybe<Array<OutputFormat>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<OutputFormat>>;
  /** Less than the specified value. */
  lessThan?: Maybe<OutputFormat>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<OutputFormat>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<OutputFormat>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<OutputFormat>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

export type PopulateInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  count: Scalars['Int'];
};

export type PopulatePayload = {
  __typename?: 'PopulatePayload';
  count: Scalars['Int'];
  query?: Maybe<Query>;
};

export enum QaStatus {
  NotPreviewed = 'NOT_PREVIEWED',
  NotApproved = 'NOT_APPROVED',
  Approved = 'APPROVED'
}

/** A filter to be used against QaStatus fields. All fields are combined with a logical ‘and.’ */
export type QaStatusFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<QaStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<QaStatus>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<QaStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<QaStatus>;
  /** Included in the specified list. */
  in?: Maybe<Array<QaStatus>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<QaStatus>>;
  /** Less than the specified value. */
  lessThan?: Maybe<QaStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<QaStatus>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<QaStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<QaStatus>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `TranscodingAcquisitionProfile`. */
  transcodingAcquisitionProfiles?: Maybe<TranscodingAcquisitionProfilesConnection>;
  /** Reads and enables pagination through a set of `TranscodingHistory`. */
  transcodingHistories?: Maybe<TranscodingHistoriesConnection>;
  /** Reads and enables pagination through a set of `TranscodingProcessingProfile`. */
  transcodingProcessingProfiles?: Maybe<TranscodingProcessingProfilesConnection>;
  /** Reads and enables pagination through a set of `TranscodingPublishingProfile`. */
  transcodingPublishingProfiles?: Maybe<TranscodingPublishingProfilesConnection>;
  /** Reads and enables pagination through a set of `TranscodingVideoRepresentation`. */
  transcodingVideoRepresentations?: Maybe<TranscodingVideoRepresentationsConnection>;
  /** Reads and enables pagination through a set of `Video`. */
  videos?: Maybe<VideosConnection>;
  /** Reads and enables pagination through a set of `VideosTag`. */
  videosTags?: Maybe<VideosTagsConnection>;
  transcodingAcquisitionProfile?: Maybe<TranscodingAcquisitionProfile>;
  transcodingHistory?: Maybe<TranscodingHistory>;
  transcodingProcessingProfile?: Maybe<TranscodingProcessingProfile>;
  transcodingPublishingProfile?: Maybe<TranscodingPublishingProfile>;
  transcodingVideoRepresentation?: Maybe<TranscodingVideoRepresentation>;
  video?: Maybe<Video>;
  videoByExternalId?: Maybe<Video>;
  videoBySourceLocation?: Maybe<Video>;
  videosTag?: Maybe<VideosTag>;
  getArchivingValues: GetArchivingValuesConnection;
  getDrmProtectionValues: GetDrmProtectionValuesConnection;
  getOutputFormatValues: GetOutputFormatValuesConnection;
  getQaStatusValues: GetQaStatusValuesConnection;
  getTranscodingStatusValues: GetTranscodingStatusValuesConnection;
  /** Reads a single `TranscodingAcquisitionProfile` using its globally unique `ID`. */
  transcodingAcquisitionProfileByNodeId?: Maybe<TranscodingAcquisitionProfile>;
  /** Reads a single `TranscodingHistory` using its globally unique `ID`. */
  transcodingHistoryByNodeId?: Maybe<TranscodingHistory>;
  /** Reads a single `TranscodingProcessingProfile` using its globally unique `ID`. */
  transcodingProcessingProfileByNodeId?: Maybe<TranscodingProcessingProfile>;
  /** Reads a single `TranscodingPublishingProfile` using its globally unique `ID`. */
  transcodingPublishingProfileByNodeId?: Maybe<TranscodingPublishingProfile>;
  /** Reads a single `TranscodingVideoRepresentation` using its globally unique `ID`. */
  transcodingVideoRepresentationByNodeId?: Maybe<TranscodingVideoRepresentation>;
  /** Reads a single `Video` using its globally unique `ID`. */
  videoByNodeId?: Maybe<Video>;
  /** Reads a single `VideosTag` using its globally unique `ID`. */
  videosTagByNodeId?: Maybe<VideosTag>;
  sourceVideos?: Maybe<SourceVideoPayload>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingAcquisitionProfilesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TranscodingAcquisitionProfilesOrderBy>>;
  condition?: Maybe<TranscodingAcquisitionProfileCondition>;
  filter?: Maybe<TranscodingAcquisitionProfileFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingHistoriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TranscodingHistoriesOrderBy>>;
  condition?: Maybe<TranscodingHistoryCondition>;
  filter?: Maybe<TranscodingHistoryFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingProcessingProfilesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TranscodingProcessingProfilesOrderBy>>;
  condition?: Maybe<TranscodingProcessingProfileCondition>;
  filter?: Maybe<TranscodingProcessingProfileFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingPublishingProfilesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TranscodingPublishingProfilesOrderBy>>;
  condition?: Maybe<TranscodingPublishingProfileCondition>;
  filter?: Maybe<TranscodingPublishingProfileFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingVideoRepresentationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TranscodingVideoRepresentationsOrderBy>>;
  condition?: Maybe<TranscodingVideoRepresentationCondition>;
  filter?: Maybe<TranscodingVideoRepresentationFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryVideosArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<VideosOrderBy>>;
  condition?: Maybe<VideoCondition>;
  filter?: Maybe<VideoFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryVideosTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<VideosTagsOrderBy>>;
  condition?: Maybe<VideosTagCondition>;
  filter?: Maybe<VideosTagFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingAcquisitionProfileArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingHistoryArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingProcessingProfileArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingPublishingProfileArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingVideoRepresentationArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVideoArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVideoByExternalIdArgs = {
  externalId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVideoBySourceLocationArgs = {
  sourceLocation: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVideosTagArgs = {
  videoId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGetArchivingValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<ArchivingFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetDrmProtectionValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<DrmProtectionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetOutputFormatValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<OutputFormatFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetQaStatusValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<QaStatusFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetTranscodingStatusValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<TranscodingStatusFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingAcquisitionProfileByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingHistoryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingProcessingProfileByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingPublishingProfileByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTranscodingVideoRepresentationByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVideoByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVideosTagByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySourceVideosArgs = {
  input?: Maybe<SourceVideoInput>;
};

export type SourceVideo = {
  __typename?: 'SourceVideo';
  path: Scalars['String'];
};

export type SourceVideoFilter = {
  path?: Maybe<SourceVideoStringFilter>;
};

export type SourceVideoInput = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  filter?: Maybe<SourceVideoFilter>;
};

export type SourceVideoPageInfo = {
  __typename?: 'SourceVideoPageInfo';
  hasNextPage: Scalars['Boolean'];
  endCursor?: Maybe<Scalars['Cursor']>;
};

export type SourceVideoPayload = {
  __typename?: 'SourceVideoPayload';
  nodes: Array<Maybe<SourceVideo>>;
  pageInfo?: Maybe<SourceVideoPageInfo>;
  query?: Maybe<Query>;
};

export type SourceVideoStringFilter = {
  startsWith?: Maybe<Scalars['String']>;
};

export type StartVipJobInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  videoRelativePath: Scalars['String'];
  processingProfileId: Scalars['Int'];
};

export type StartVipJobPayload = {
  __typename?: 'StartVipJobPayload';
  video?: Maybe<Video>;
  query?: Maybe<Query>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>;
  /**
   * Matches the specified pattern (case-sensitive). An underscore (_) matches any
   * single character; a percent sign (%) matches any sequence of zero or more characters.
   */
  like?: Maybe<Scalars['String']>;
  /**
   * Does not match the specified pattern (case-sensitive). An underscore (_)
   * matches any single character; a percent sign (%) matches any sequence of zero
   * or more characters.
   */
  notLike?: Maybe<Scalars['String']>;
  /**
   * Matches the specified pattern (case-insensitive). An underscore (_) matches
   * any single character; a percent sign (%) matches any sequence of zero or more characters.
   */
  likeInsensitive?: Maybe<Scalars['String']>;
  /**
   * Does not match the specified pattern (case-insensitive). An underscore (_)
   * matches any single character; a percent sign (%) matches any sequence of zero
   * or more characters.
   */
  notLikeInsensitive?: Maybe<Scalars['String']>;
  /** Matches the specified pattern using the SQL standard's definition of a regular expression. */
  similarTo?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern using the SQL standard's definition of a regular expression. */
  notSimilarTo?: Maybe<Scalars['String']>;
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

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Triggered when a Video is mutated (insert, update or delete).  */
  videoMutated?: Maybe<VideoSubscriptionPayload>;
};

/** @permissions: ADMIN */
export type TranscodingAcquisitionProfile = Node & {
  __typename?: 'TranscodingAcquisitionProfile';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['String'];
  isValid: Scalars['Boolean'];
  provider?: Maybe<Scalars['String']>;
  uriPath?: Maybe<Scalars['String']>;
  rootFolderPath?: Maybe<Scalars['String']>;
  readCredentialsName?: Maybe<Scalars['String']>;
  readCredentialsSecret?: Maybe<Scalars['String']>;
  listCredentialsName?: Maybe<Scalars['String']>;
  listCredentialsSecret?: Maybe<Scalars['String']>;
  createdDate: Scalars['Datetime'];
  updatedDate: Scalars['Datetime'];
  createdUser: Scalars['String'];
  updatedUser: Scalars['String'];
};

/**
 * A condition to be used against `TranscodingAcquisitionProfile` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type TranscodingAcquisitionProfileCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `title` field.
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `isValid` field. */
  isValid?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `provider` field. */
  provider?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `uriPath` field. */
  uriPath?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `rootFolderPath` field. */
  rootFolderPath?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `readCredentialsName` field. */
  readCredentialsName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `readCredentialsSecret` field. */
  readCredentialsSecret?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `listCredentialsName` field. */
  listCredentialsName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `listCredentialsSecret` field. */
  listCredentialsSecret?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `TranscodingAcquisitionProfile` object types. All fields are combined with a logical ‘and.’ */
export type TranscodingAcquisitionProfileFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<StringFilter>;
  /** Filter by the object’s `isValid` field. */
  isValid?: Maybe<BooleanFilter>;
  /** Filter by the object’s `provider` field. */
  provider?: Maybe<StringFilter>;
  /** Filter by the object’s `uriPath` field. */
  uriPath?: Maybe<StringFilter>;
  /** Filter by the object’s `rootFolderPath` field. */
  rootFolderPath?: Maybe<StringFilter>;
  /** Filter by the object’s `readCredentialsName` field. */
  readCredentialsName?: Maybe<StringFilter>;
  /** Filter by the object’s `readCredentialsSecret` field. */
  readCredentialsSecret?: Maybe<StringFilter>;
  /** Filter by the object’s `listCredentialsName` field. */
  listCredentialsName?: Maybe<StringFilter>;
  /** Filter by the object’s `listCredentialsSecret` field. */
  listCredentialsSecret?: Maybe<StringFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TranscodingAcquisitionProfileFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TranscodingAcquisitionProfileFilter>>;
  /** Negates the expression. */
  not?: Maybe<TranscodingAcquisitionProfileFilter>;
};

/** Represents an update to a `TranscodingAcquisitionProfile`. Fields that are set will be updated. */
export type TranscodingAcquisitionProfilePatch = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  uriPath?: Maybe<Scalars['String']>;
  rootFolderPath?: Maybe<Scalars['String']>;
  readCredentialsName?: Maybe<Scalars['String']>;
  readCredentialsSecret?: Maybe<Scalars['String']>;
  listCredentialsName?: Maybe<Scalars['String']>;
  listCredentialsSecret?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `TranscodingAcquisitionProfile` values.
 * @permissions: ADMIN
 */
export type TranscodingAcquisitionProfilesConnection = {
  __typename?: 'TranscodingAcquisitionProfilesConnection';
  /** A list of `TranscodingAcquisitionProfile` objects. */
  nodes: Array<Maybe<TranscodingAcquisitionProfile>>;
  /** A list of edges which contains the `TranscodingAcquisitionProfile` and cursor to aid in pagination. */
  edges: Array<TranscodingAcquisitionProfilesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TranscodingAcquisitionProfile` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TranscodingAcquisitionProfile` edge in the connection. */
export type TranscodingAcquisitionProfilesEdge = {
  __typename?: 'TranscodingAcquisitionProfilesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TranscodingAcquisitionProfile` at the end of the edge. */
  node?: Maybe<TranscodingAcquisitionProfile>;
};

/** Methods to use when ordering `TranscodingAcquisitionProfile`. */
export enum TranscodingAcquisitionProfilesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  IsValidAsc = 'IS_VALID_ASC',
  IsValidDesc = 'IS_VALID_DESC',
  ProviderAsc = 'PROVIDER_ASC',
  ProviderDesc = 'PROVIDER_DESC',
  UriPathAsc = 'URI_PATH_ASC',
  UriPathDesc = 'URI_PATH_DESC',
  RootFolderPathAsc = 'ROOT_FOLDER_PATH_ASC',
  RootFolderPathDesc = 'ROOT_FOLDER_PATH_DESC',
  ReadCredentialsNameAsc = 'READ_CREDENTIALS_NAME_ASC',
  ReadCredentialsNameDesc = 'READ_CREDENTIALS_NAME_DESC',
  ReadCredentialsSecretAsc = 'READ_CREDENTIALS_SECRET_ASC',
  ReadCredentialsSecretDesc = 'READ_CREDENTIALS_SECRET_DESC',
  ListCredentialsNameAsc = 'LIST_CREDENTIALS_NAME_ASC',
  ListCredentialsNameDesc = 'LIST_CREDENTIALS_NAME_DESC',
  ListCredentialsSecretAsc = 'LIST_CREDENTIALS_SECRET_ASC',
  ListCredentialsSecretDesc = 'LIST_CREDENTIALS_SECRET_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  UpdatedDateAsc = 'UPDATED_DATE_ASC',
  UpdatedDateDesc = 'UPDATED_DATE_DESC',
  CreatedUserAsc = 'CREATED_USER_ASC',
  CreatedUserDesc = 'CREATED_USER_DESC',
  UpdatedUserAsc = 'UPDATED_USER_ASC',
  UpdatedUserDesc = 'UPDATED_USER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A connection to a list of `TranscodingHistory` values.
 * @permissions: VIDEO_READER,VIDEO_EDITOR,ADMIN
 */
export type TranscodingHistoriesConnection = {
  __typename?: 'TranscodingHistoriesConnection';
  /** A list of `TranscodingHistory` objects. */
  nodes: Array<Maybe<TranscodingHistory>>;
  /** A list of edges which contains the `TranscodingHistory` and cursor to aid in pagination. */
  edges: Array<TranscodingHistoriesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TranscodingHistory` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TranscodingHistory` edge in the connection. */
export type TranscodingHistoriesEdge = {
  __typename?: 'TranscodingHistoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TranscodingHistory` at the end of the edge. */
  node?: Maybe<TranscodingHistory>;
};

/** Methods to use when ordering `TranscodingHistory`. */
export enum TranscodingHistoriesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  VideoIdAsc = 'VIDEO_ID_ASC',
  VideoIdDesc = 'VIDEO_ID_DESC',
  MessageTypeAsc = 'MESSAGE_TYPE_ASC',
  MessageTypeDesc = 'MESSAGE_TYPE_DESC',
  MessageBodyAsc = 'MESSAGE_BODY_ASC',
  MessageBodyDesc = 'MESSAGE_BODY_DESC',
  EnqueuedDateAsc = 'ENQUEUED_DATE_ASC',
  EnqueuedDateDesc = 'ENQUEUED_DATE_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: VIDEO_READER,VIDEO_EDITOR,ADMIN */
export type TranscodingHistory = Node & {
  __typename?: 'TranscodingHistory';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  videoId: Scalars['Int'];
  messageType: Scalars['String'];
  messageBody: Scalars['JSON'];
  enqueuedDate: Scalars['Datetime'];
  createdDate: Scalars['Datetime'];
  /** Reads a single `Video` that is related to this `TranscodingHistory`. */
  video?: Maybe<Video>;
};

/**
 * A condition to be used against `TranscodingHistory` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TranscodingHistoryCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `videoId` field. */
  videoId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `messageType` field. */
  messageType?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `messageBody` field. */
  messageBody?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `enqueuedDate` field. */
  enqueuedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `TranscodingHistory` object types. All fields are combined with a logical ‘and.’ */
export type TranscodingHistoryFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `videoId` field. */
  videoId?: Maybe<IntFilter>;
  /** Filter by the object’s `messageType` field. */
  messageType?: Maybe<StringFilter>;
  /** Filter by the object’s `messageBody` field. */
  messageBody?: Maybe<JsonFilter>;
  /** Filter by the object’s `enqueuedDate` field. */
  enqueuedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `video` relation. */
  video?: Maybe<VideoFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TranscodingHistoryFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TranscodingHistoryFilter>>;
  /** Negates the expression. */
  not?: Maybe<TranscodingHistoryFilter>;
};

/** @permissions: ADMIN */
export type TranscodingProcessingProfile = Node & {
  __typename?: 'TranscodingProcessingProfile';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['String'];
  isValid: Scalars['Boolean'];
  videoStreamExpression?: Maybe<Scalars['String']>;
  audioFileLanguageExpression?: Maybe<Scalars['String']>;
  subtitleFileLanguageExpression?: Maybe<Scalars['String']>;
  captionFileLanguageExpression?: Maybe<Scalars['String']>;
  outputFormat?: Maybe<OutputFormat>;
  drmProtection?: Maybe<DrmProtection>;
  archiving?: Maybe<Archiving>;
  useNativeLanguageNames: Scalars['Boolean'];
  deleteFilesFromSourceWhenDone: Scalars['Boolean'];
  drmApiUrl?: Maybe<Scalars['String']>;
  drmTenantId?: Maybe<Scalars['String']>;
  drmManagementKey?: Maybe<Scalars['String']>;
  drmKeySeed?: Maybe<Scalars['String']>;
  drmThumbprints?: Maybe<Scalars['String']>;
  createdDate: Scalars['Datetime'];
  updatedDate: Scalars['Datetime'];
  createdUser: Scalars['String'];
  updatedUser: Scalars['String'];
  /** Reads and enables pagination through a set of `TranscodingVideoRepresentation`. */
  transcodingVideoRepresentations: TranscodingVideoRepresentationsConnection;
};


/** @permissions: ADMIN */
export type TranscodingProcessingProfileTranscodingVideoRepresentationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TranscodingVideoRepresentationsOrderBy>>;
  condition?: Maybe<TranscodingVideoRepresentationCondition>;
  filter?: Maybe<TranscodingVideoRepresentationFilter>;
};

/**
 * A condition to be used against `TranscodingProcessingProfile` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type TranscodingProcessingProfileCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `title` field.
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `isValid` field. */
  isValid?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `videoStreamExpression` field. */
  videoStreamExpression?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `audioFileLanguageExpression` field. */
  audioFileLanguageExpression?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `subtitleFileLanguageExpression` field. */
  subtitleFileLanguageExpression?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `captionFileLanguageExpression` field. */
  captionFileLanguageExpression?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `outputFormat` field. */
  outputFormat?: Maybe<OutputFormat>;
  /** Checks for equality with the object’s `drmProtection` field. */
  drmProtection?: Maybe<DrmProtection>;
  /** Checks for equality with the object’s `archiving` field. */
  archiving?: Maybe<Archiving>;
  /** Checks for equality with the object’s `useNativeLanguageNames` field. */
  useNativeLanguageNames?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `deleteFilesFromSourceWhenDone` field. */
  deleteFilesFromSourceWhenDone?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `drmApiUrl` field. */
  drmApiUrl?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `drmTenantId` field. */
  drmTenantId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `drmManagementKey` field. */
  drmManagementKey?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `drmKeySeed` field. */
  drmKeySeed?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `drmThumbprints` field. */
  drmThumbprints?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `TranscodingProcessingProfile` object types. All fields are combined with a logical ‘and.’ */
export type TranscodingProcessingProfileFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<StringFilter>;
  /** Filter by the object’s `isValid` field. */
  isValid?: Maybe<BooleanFilter>;
  /** Filter by the object’s `videoStreamExpression` field. */
  videoStreamExpression?: Maybe<StringFilter>;
  /** Filter by the object’s `audioFileLanguageExpression` field. */
  audioFileLanguageExpression?: Maybe<StringFilter>;
  /** Filter by the object’s `subtitleFileLanguageExpression` field. */
  subtitleFileLanguageExpression?: Maybe<StringFilter>;
  /** Filter by the object’s `captionFileLanguageExpression` field. */
  captionFileLanguageExpression?: Maybe<StringFilter>;
  /** Filter by the object’s `outputFormat` field. */
  outputFormat?: Maybe<OutputFormatFilter>;
  /** Filter by the object’s `drmProtection` field. */
  drmProtection?: Maybe<DrmProtectionFilter>;
  /** Filter by the object’s `archiving` field. */
  archiving?: Maybe<ArchivingFilter>;
  /** Filter by the object’s `useNativeLanguageNames` field. */
  useNativeLanguageNames?: Maybe<BooleanFilter>;
  /** Filter by the object’s `deleteFilesFromSourceWhenDone` field. */
  deleteFilesFromSourceWhenDone?: Maybe<BooleanFilter>;
  /** Filter by the object’s `drmApiUrl` field. */
  drmApiUrl?: Maybe<StringFilter>;
  /** Filter by the object’s `drmTenantId` field. */
  drmTenantId?: Maybe<StringFilter>;
  /** Filter by the object’s `drmManagementKey` field. */
  drmManagementKey?: Maybe<StringFilter>;
  /** Filter by the object’s `drmKeySeed` field. */
  drmKeySeed?: Maybe<StringFilter>;
  /** Filter by the object’s `drmThumbprints` field. */
  drmThumbprints?: Maybe<StringFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `transcodingVideoRepresentations` relation. */
  transcodingVideoRepresentations?: Maybe<TranscodingProcessingProfileToManyTranscodingVideoRepresentationFilter>;
  /** Some related `transcodingVideoRepresentations` exist. */
  transcodingVideoRepresentationsExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TranscodingProcessingProfileFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TranscodingProcessingProfileFilter>>;
  /** Negates the expression. */
  not?: Maybe<TranscodingProcessingProfileFilter>;
};

/** An input for mutations affecting `TranscodingProcessingProfile` */
export type TranscodingProcessingProfileInput = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title: Scalars['String'];
  videoStreamExpression?: Maybe<Scalars['String']>;
  audioFileLanguageExpression?: Maybe<Scalars['String']>;
  subtitleFileLanguageExpression?: Maybe<Scalars['String']>;
  captionFileLanguageExpression?: Maybe<Scalars['String']>;
  outputFormat?: Maybe<OutputFormat>;
  drmProtection?: Maybe<DrmProtection>;
  archiving?: Maybe<Archiving>;
  useNativeLanguageNames?: Maybe<Scalars['Boolean']>;
  deleteFilesFromSourceWhenDone?: Maybe<Scalars['Boolean']>;
  drmApiUrl?: Maybe<Scalars['String']>;
  drmTenantId?: Maybe<Scalars['String']>;
  drmManagementKey?: Maybe<Scalars['String']>;
  drmKeySeed?: Maybe<Scalars['String']>;
  drmThumbprints?: Maybe<Scalars['String']>;
};

/** Represents an update to a `TranscodingProcessingProfile`. Fields that are set will be updated. */
export type TranscodingProcessingProfilePatch = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  videoStreamExpression?: Maybe<Scalars['String']>;
  audioFileLanguageExpression?: Maybe<Scalars['String']>;
  subtitleFileLanguageExpression?: Maybe<Scalars['String']>;
  captionFileLanguageExpression?: Maybe<Scalars['String']>;
  outputFormat?: Maybe<OutputFormat>;
  drmProtection?: Maybe<DrmProtection>;
  archiving?: Maybe<Archiving>;
  useNativeLanguageNames?: Maybe<Scalars['Boolean']>;
  deleteFilesFromSourceWhenDone?: Maybe<Scalars['Boolean']>;
  drmApiUrl?: Maybe<Scalars['String']>;
  drmTenantId?: Maybe<Scalars['String']>;
  drmManagementKey?: Maybe<Scalars['String']>;
  drmKeySeed?: Maybe<Scalars['String']>;
  drmThumbprints?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `TranscodingProcessingProfile` values.
 * @permissions: ADMIN
 */
export type TranscodingProcessingProfilesConnection = {
  __typename?: 'TranscodingProcessingProfilesConnection';
  /** A list of `TranscodingProcessingProfile` objects. */
  nodes: Array<Maybe<TranscodingProcessingProfile>>;
  /** A list of edges which contains the `TranscodingProcessingProfile` and cursor to aid in pagination. */
  edges: Array<TranscodingProcessingProfilesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TranscodingProcessingProfile` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TranscodingProcessingProfile` edge in the connection. */
export type TranscodingProcessingProfilesEdge = {
  __typename?: 'TranscodingProcessingProfilesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TranscodingProcessingProfile` at the end of the edge. */
  node?: Maybe<TranscodingProcessingProfile>;
};

/** Methods to use when ordering `TranscodingProcessingProfile`. */
export enum TranscodingProcessingProfilesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  IsValidAsc = 'IS_VALID_ASC',
  IsValidDesc = 'IS_VALID_DESC',
  VideoStreamExpressionAsc = 'VIDEO_STREAM_EXPRESSION_ASC',
  VideoStreamExpressionDesc = 'VIDEO_STREAM_EXPRESSION_DESC',
  AudioFileLanguageExpressionAsc = 'AUDIO_FILE_LANGUAGE_EXPRESSION_ASC',
  AudioFileLanguageExpressionDesc = 'AUDIO_FILE_LANGUAGE_EXPRESSION_DESC',
  SubtitleFileLanguageExpressionAsc = 'SUBTITLE_FILE_LANGUAGE_EXPRESSION_ASC',
  SubtitleFileLanguageExpressionDesc = 'SUBTITLE_FILE_LANGUAGE_EXPRESSION_DESC',
  CaptionFileLanguageExpressionAsc = 'CAPTION_FILE_LANGUAGE_EXPRESSION_ASC',
  CaptionFileLanguageExpressionDesc = 'CAPTION_FILE_LANGUAGE_EXPRESSION_DESC',
  OutputFormatAsc = 'OUTPUT_FORMAT_ASC',
  OutputFormatDesc = 'OUTPUT_FORMAT_DESC',
  DrmProtectionAsc = 'DRM_PROTECTION_ASC',
  DrmProtectionDesc = 'DRM_PROTECTION_DESC',
  ArchivingAsc = 'ARCHIVING_ASC',
  ArchivingDesc = 'ARCHIVING_DESC',
  UseNativeLanguageNamesAsc = 'USE_NATIVE_LANGUAGE_NAMES_ASC',
  UseNativeLanguageNamesDesc = 'USE_NATIVE_LANGUAGE_NAMES_DESC',
  DeleteFilesFromSourceWhenDoneAsc = 'DELETE_FILES_FROM_SOURCE_WHEN_DONE_ASC',
  DeleteFilesFromSourceWhenDoneDesc = 'DELETE_FILES_FROM_SOURCE_WHEN_DONE_DESC',
  DrmApiUrlAsc = 'DRM_API_URL_ASC',
  DrmApiUrlDesc = 'DRM_API_URL_DESC',
  DrmTenantIdAsc = 'DRM_TENANT_ID_ASC',
  DrmTenantIdDesc = 'DRM_TENANT_ID_DESC',
  DrmManagementKeyAsc = 'DRM_MANAGEMENT_KEY_ASC',
  DrmManagementKeyDesc = 'DRM_MANAGEMENT_KEY_DESC',
  DrmKeySeedAsc = 'DRM_KEY_SEED_ASC',
  DrmKeySeedDesc = 'DRM_KEY_SEED_DESC',
  DrmThumbprintsAsc = 'DRM_THUMBPRINTS_ASC',
  DrmThumbprintsDesc = 'DRM_THUMBPRINTS_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  UpdatedDateAsc = 'UPDATED_DATE_ASC',
  UpdatedDateDesc = 'UPDATED_DATE_DESC',
  CreatedUserAsc = 'CREATED_USER_ASC',
  CreatedUserDesc = 'CREATED_USER_DESC',
  UpdatedUserAsc = 'UPDATED_USER_ASC',
  UpdatedUserDesc = 'UPDATED_USER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A filter to be used against many `TranscodingVideoRepresentation` object types.
 * All fields are combined with a logical ‘and.’
 */
export type TranscodingProcessingProfileToManyTranscodingVideoRepresentationFilter = {
  /** Every related `TranscodingVideoRepresentation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TranscodingVideoRepresentationFilter>;
  /** Some related `TranscodingVideoRepresentation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TranscodingVideoRepresentationFilter>;
  /** No related `TranscodingVideoRepresentation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TranscodingVideoRepresentationFilter>;
};

/** @permissions: ADMIN */
export type TranscodingPublishingProfile = Node & {
  __typename?: 'TranscodingPublishingProfile';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['String'];
  isValid: Scalars['Boolean'];
  provider?: Maybe<Scalars['String']>;
  uriPath?: Maybe<Scalars['String']>;
  credentialsName?: Maybe<Scalars['String']>;
  credentialsSecret?: Maybe<Scalars['String']>;
  createdDate: Scalars['Datetime'];
  updatedDate: Scalars['Datetime'];
  createdUser: Scalars['String'];
  updatedUser: Scalars['String'];
};

/**
 * A condition to be used against `TranscodingPublishingProfile` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type TranscodingPublishingProfileCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `title` field.
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `isValid` field. */
  isValid?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `provider` field. */
  provider?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `uriPath` field. */
  uriPath?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `credentialsName` field. */
  credentialsName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `credentialsSecret` field. */
  credentialsSecret?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `TranscodingPublishingProfile` object types. All fields are combined with a logical ‘and.’ */
export type TranscodingPublishingProfileFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<StringFilter>;
  /** Filter by the object’s `isValid` field. */
  isValid?: Maybe<BooleanFilter>;
  /** Filter by the object’s `provider` field. */
  provider?: Maybe<StringFilter>;
  /** Filter by the object’s `uriPath` field. */
  uriPath?: Maybe<StringFilter>;
  /** Filter by the object’s `credentialsName` field. */
  credentialsName?: Maybe<StringFilter>;
  /** Filter by the object’s `credentialsSecret` field. */
  credentialsSecret?: Maybe<StringFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TranscodingPublishingProfileFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TranscodingPublishingProfileFilter>>;
  /** Negates the expression. */
  not?: Maybe<TranscodingPublishingProfileFilter>;
};

/** Represents an update to a `TranscodingPublishingProfile`. Fields that are set will be updated. */
export type TranscodingPublishingProfilePatch = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  uriPath?: Maybe<Scalars['String']>;
  credentialsName?: Maybe<Scalars['String']>;
  credentialsSecret?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `TranscodingPublishingProfile` values.
 * @permissions: ADMIN
 */
export type TranscodingPublishingProfilesConnection = {
  __typename?: 'TranscodingPublishingProfilesConnection';
  /** A list of `TranscodingPublishingProfile` objects. */
  nodes: Array<Maybe<TranscodingPublishingProfile>>;
  /** A list of edges which contains the `TranscodingPublishingProfile` and cursor to aid in pagination. */
  edges: Array<TranscodingPublishingProfilesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TranscodingPublishingProfile` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TranscodingPublishingProfile` edge in the connection. */
export type TranscodingPublishingProfilesEdge = {
  __typename?: 'TranscodingPublishingProfilesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TranscodingPublishingProfile` at the end of the edge. */
  node?: Maybe<TranscodingPublishingProfile>;
};

/** Methods to use when ordering `TranscodingPublishingProfile`. */
export enum TranscodingPublishingProfilesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  IsValidAsc = 'IS_VALID_ASC',
  IsValidDesc = 'IS_VALID_DESC',
  ProviderAsc = 'PROVIDER_ASC',
  ProviderDesc = 'PROVIDER_DESC',
  UriPathAsc = 'URI_PATH_ASC',
  UriPathDesc = 'URI_PATH_DESC',
  CredentialsNameAsc = 'CREDENTIALS_NAME_ASC',
  CredentialsNameDesc = 'CREDENTIALS_NAME_DESC',
  CredentialsSecretAsc = 'CREDENTIALS_SECRET_ASC',
  CredentialsSecretDesc = 'CREDENTIALS_SECRET_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  UpdatedDateAsc = 'UPDATED_DATE_ASC',
  UpdatedDateDesc = 'UPDATED_DATE_DESC',
  CreatedUserAsc = 'CREATED_USER_ASC',
  CreatedUserDesc = 'CREATED_USER_DESC',
  UpdatedUserAsc = 'UPDATED_USER_ASC',
  UpdatedUserDesc = 'UPDATED_USER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export enum TranscodingStatus {
  Waiting = 'WAITING',
  InProgress = 'IN_PROGRESS',
  Ready = 'READY',
  Error = 'ERROR'
}

/** A filter to be used against TranscodingStatus fields. All fields are combined with a logical ‘and.’ */
export type TranscodingStatusFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<TranscodingStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<TranscodingStatus>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<TranscodingStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<TranscodingStatus>;
  /** Included in the specified list. */
  in?: Maybe<Array<TranscodingStatus>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<TranscodingStatus>>;
  /** Less than the specified value. */
  lessThan?: Maybe<TranscodingStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<TranscodingStatus>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<TranscodingStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<TranscodingStatus>;
};

/** @permissions: ADMIN */
export type TranscodingVideoRepresentation = Node & {
  __typename?: 'TranscodingVideoRepresentation';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  transcodingProcessingProfileId: Scalars['Int'];
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  bitrateInKbps: Scalars['Int'];
  /** Reads a single `TranscodingProcessingProfile` that is related to this `TranscodingVideoRepresentation`. */
  transcodingProcessingProfile?: Maybe<TranscodingProcessingProfile>;
};

/**
 * A condition to be used against `TranscodingVideoRepresentation` object types.
 * All fields are tested for equality and combined with a logical ‘and.’
 */
export type TranscodingVideoRepresentationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `transcodingProcessingProfileId` field. */
  transcodingProcessingProfileId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `width` field. */
  width?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `height` field. */
  height?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `bitrateInKbps` field. */
  bitrateInKbps?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `TranscodingVideoRepresentation` object types. All fields are combined with a logical ‘and.’ */
export type TranscodingVideoRepresentationFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `transcodingProcessingProfileId` field. */
  transcodingProcessingProfileId?: Maybe<IntFilter>;
  /** Filter by the object’s `width` field. */
  width?: Maybe<IntFilter>;
  /** Filter by the object’s `height` field. */
  height?: Maybe<IntFilter>;
  /** Filter by the object’s `bitrateInKbps` field. */
  bitrateInKbps?: Maybe<IntFilter>;
  /** Filter by the object’s `transcodingProcessingProfile` relation. */
  transcodingProcessingProfile?: Maybe<TranscodingProcessingProfileFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TranscodingVideoRepresentationFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TranscodingVideoRepresentationFilter>>;
  /** Negates the expression. */
  not?: Maybe<TranscodingVideoRepresentationFilter>;
};

/** An input for mutations affecting `TranscodingVideoRepresentation` */
export type TranscodingVideoRepresentationInput = {
  transcodingProcessingProfileId: Scalars['Int'];
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  bitrateInKbps: Scalars['Int'];
};

/** Represents an update to a `TranscodingVideoRepresentation`. Fields that are set will be updated. */
export type TranscodingVideoRepresentationPatch = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  bitrateInKbps?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `TranscodingVideoRepresentation` values.
 * @permissions: ADMIN
 */
export type TranscodingVideoRepresentationsConnection = {
  __typename?: 'TranscodingVideoRepresentationsConnection';
  /** A list of `TranscodingVideoRepresentation` objects. */
  nodes: Array<Maybe<TranscodingVideoRepresentation>>;
  /** A list of edges which contains the `TranscodingVideoRepresentation` and cursor to aid in pagination. */
  edges: Array<TranscodingVideoRepresentationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TranscodingVideoRepresentation` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TranscodingVideoRepresentation` edge in the connection. */
export type TranscodingVideoRepresentationsEdge = {
  __typename?: 'TranscodingVideoRepresentationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TranscodingVideoRepresentation` at the end of the edge. */
  node?: Maybe<TranscodingVideoRepresentation>;
};

/** Methods to use when ordering `TranscodingVideoRepresentation`. */
export enum TranscodingVideoRepresentationsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TranscodingProcessingProfileIdAsc = 'TRANSCODING_PROCESSING_PROFILE_ID_ASC',
  TranscodingProcessingProfileIdDesc = 'TRANSCODING_PROCESSING_PROFILE_ID_DESC',
  WidthAsc = 'WIDTH_ASC',
  WidthDesc = 'WIDTH_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  BitrateInKbpsAsc = 'BITRATE_IN_KBPS_ASC',
  BitrateInKbpsDesc = 'BITRATE_IN_KBPS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * All input for the `updateTranscodingAcquisitionProfileByNodeId` mutation.
 * @permissions: ADMIN
 */
export type UpdateTranscodingAcquisitionProfileByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TranscodingAcquisitionProfile` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TranscodingAcquisitionProfile` being updated. */
  patch: TranscodingAcquisitionProfilePatch;
};

/**
 * All input for the `updateTranscodingAcquisitionProfile` mutation.
 * @permissions: ADMIN
 */
export type UpdateTranscodingAcquisitionProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TranscodingAcquisitionProfile` being updated. */
  patch: TranscodingAcquisitionProfilePatch;
  id: Scalars['Int'];
};

/** The output of our update `TranscodingAcquisitionProfile` mutation. */
export type UpdateTranscodingAcquisitionProfilePayload = {
  __typename?: 'UpdateTranscodingAcquisitionProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TranscodingAcquisitionProfile` that was updated by this mutation. */
  transcodingAcquisitionProfile?: Maybe<TranscodingAcquisitionProfile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `TranscodingAcquisitionProfile`. May be used by Relay 1. */
  transcodingAcquisitionProfileEdge?: Maybe<TranscodingAcquisitionProfilesEdge>;
};


/** The output of our update `TranscodingAcquisitionProfile` mutation. */
export type UpdateTranscodingAcquisitionProfilePayloadTranscodingAcquisitionProfileEdgeArgs = {
  orderBy?: Maybe<Array<TranscodingAcquisitionProfilesOrderBy>>;
};

/**
 * All input for the `updateTranscodingProcessingProfileByNodeId` mutation.
 * @permissions: ADMIN
 */
export type UpdateTranscodingProcessingProfileByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TranscodingProcessingProfile` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TranscodingProcessingProfile` being updated. */
  patch: TranscodingProcessingProfilePatch;
};

/**
 * All input for the `updateTranscodingProcessingProfile` mutation.
 * @permissions: ADMIN
 */
export type UpdateTranscodingProcessingProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TranscodingProcessingProfile` being updated. */
  patch: TranscodingProcessingProfilePatch;
  id: Scalars['Int'];
};

/** The output of our update `TranscodingProcessingProfile` mutation. */
export type UpdateTranscodingProcessingProfilePayload = {
  __typename?: 'UpdateTranscodingProcessingProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TranscodingProcessingProfile` that was updated by this mutation. */
  transcodingProcessingProfile?: Maybe<TranscodingProcessingProfile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `TranscodingProcessingProfile`. May be used by Relay 1. */
  transcodingProcessingProfileEdge?: Maybe<TranscodingProcessingProfilesEdge>;
};


/** The output of our update `TranscodingProcessingProfile` mutation. */
export type UpdateTranscodingProcessingProfilePayloadTranscodingProcessingProfileEdgeArgs = {
  orderBy?: Maybe<Array<TranscodingProcessingProfilesOrderBy>>;
};

/**
 * All input for the `updateTranscodingPublishingProfileByNodeId` mutation.
 * @permissions: ADMIN
 */
export type UpdateTranscodingPublishingProfileByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TranscodingPublishingProfile` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TranscodingPublishingProfile` being updated. */
  patch: TranscodingPublishingProfilePatch;
};

/**
 * All input for the `updateTranscodingPublishingProfile` mutation.
 * @permissions: ADMIN
 */
export type UpdateTranscodingPublishingProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TranscodingPublishingProfile` being updated. */
  patch: TranscodingPublishingProfilePatch;
  id: Scalars['Int'];
};

/** The output of our update `TranscodingPublishingProfile` mutation. */
export type UpdateTranscodingPublishingProfilePayload = {
  __typename?: 'UpdateTranscodingPublishingProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TranscodingPublishingProfile` that was updated by this mutation. */
  transcodingPublishingProfile?: Maybe<TranscodingPublishingProfile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `TranscodingPublishingProfile`. May be used by Relay 1. */
  transcodingPublishingProfileEdge?: Maybe<TranscodingPublishingProfilesEdge>;
};


/** The output of our update `TranscodingPublishingProfile` mutation. */
export type UpdateTranscodingPublishingProfilePayloadTranscodingPublishingProfileEdgeArgs = {
  orderBy?: Maybe<Array<TranscodingPublishingProfilesOrderBy>>;
};

/**
 * All input for the `updateTranscodingVideoRepresentationByNodeId` mutation.
 * @permissions: ADMIN
 */
export type UpdateTranscodingVideoRepresentationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TranscodingVideoRepresentation` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TranscodingVideoRepresentation` being updated. */
  patch: TranscodingVideoRepresentationPatch;
};

/**
 * All input for the `updateTranscodingVideoRepresentation` mutation.
 * @permissions: ADMIN
 */
export type UpdateTranscodingVideoRepresentationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TranscodingVideoRepresentation` being updated. */
  patch: TranscodingVideoRepresentationPatch;
  id: Scalars['Int'];
};

/** The output of our update `TranscodingVideoRepresentation` mutation. */
export type UpdateTranscodingVideoRepresentationPayload = {
  __typename?: 'UpdateTranscodingVideoRepresentationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TranscodingVideoRepresentation` that was updated by this mutation. */
  transcodingVideoRepresentation?: Maybe<TranscodingVideoRepresentation>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `TranscodingProcessingProfile` that is related to this `TranscodingVideoRepresentation`. */
  transcodingProcessingProfile?: Maybe<TranscodingProcessingProfile>;
  /** An edge for our `TranscodingVideoRepresentation`. May be used by Relay 1. */
  transcodingVideoRepresentationEdge?: Maybe<TranscodingVideoRepresentationsEdge>;
};


/** The output of our update `TranscodingVideoRepresentation` mutation. */
export type UpdateTranscodingVideoRepresentationPayloadTranscodingVideoRepresentationEdgeArgs = {
  orderBy?: Maybe<Array<TranscodingVideoRepresentationsOrderBy>>;
};

/**
 * All input for the `updateVideoByExternalId` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type UpdateVideoByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Video` being updated. */
  patch: VideoPatch;
  externalId: Scalars['String'];
};

/**
 * All input for the `updateVideoByNodeId` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type UpdateVideoByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Video` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Video` being updated. */
  patch: VideoPatch;
};

/**
 * All input for the `updateVideoBySourceLocation` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type UpdateVideoBySourceLocationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Video` being updated. */
  patch: VideoPatch;
  sourceLocation: Scalars['String'];
};

/**
 * All input for the `updateVideo` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type UpdateVideoInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Video` being updated. */
  patch: VideoPatch;
  id: Scalars['Int'];
};

/** The output of our update `Video` mutation. */
export type UpdateVideoPayload = {
  __typename?: 'UpdateVideoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Video` that was updated by this mutation. */
  video?: Maybe<Video>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Video`. May be used by Relay 1. */
  videoEdge?: Maybe<VideosEdge>;
};


/** The output of our update `Video` mutation. */
export type UpdateVideoPayloadVideoEdgeArgs = {
  orderBy?: Maybe<Array<VideosOrderBy>>;
};

/**
 * All input for the `updateVideosTagByNodeId` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type UpdateVideosTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `VideosTag` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `VideosTag` being updated. */
  patch: VideosTagPatch;
};

/**
 * All input for the `updateVideosTag` mutation.
 * @permissions: VIDEO_EDITOR,ADMIN
 */
export type UpdateVideosTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `VideosTag` being updated. */
  patch: VideosTagPatch;
  videoId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `VideosTag` mutation. */
export type UpdateVideosTagPayload = {
  __typename?: 'UpdateVideosTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `VideosTag` that was updated by this mutation. */
  videosTag?: Maybe<VideosTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Video` that is related to this `VideosTag`. */
  video?: Maybe<Video>;
  /** An edge for our `VideosTag`. May be used by Relay 1. */
  videosTagEdge?: Maybe<VideosTagsEdge>;
};


/** The output of our update `VideosTag` mutation. */
export type UpdateVideosTagPayloadVideosTagEdgeArgs = {
  orderBy?: Maybe<Array<VideosTagsOrderBy>>;
};

/** @permissions: VIDEO_READER,VIDEO_EDITOR,ADMIN */
export type Video = Node & {
  __typename?: 'Video';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  jobId?: Maybe<Scalars['String']>;
  drmKeyId?: Maybe<Scalars['String']>;
  isProtected: Scalars['Boolean'];
  sourceFileName?: Maybe<Scalars['String']>;
  sourceFileExtension?: Maybe<Scalars['String']>;
  sourceLocation: Scalars['String'];
  sourceSizeInBytes?: Maybe<Scalars['BigInt']>;
  audioLanguages?: Maybe<Array<Maybe<Scalars['String']>>>;
  subtitleLanguages?: Maybe<Array<Maybe<Scalars['String']>>>;
  captionLanguages?: Maybe<Array<Maybe<Scalars['String']>>>;
  videoBitrates?: Maybe<Array<Maybe<Scalars['Int']>>>;
  transcodingStatus?: Maybe<TranscodingStatus>;
  outputFormat?: Maybe<OutputFormat>;
  qaStatus?: Maybe<QaStatus>;
  qaComment?: Maybe<Scalars['String']>;
  acquisitionProgress?: Maybe<Scalars['Int']>;
  encodingProgress?: Maybe<Scalars['Int']>;
  hlsSizeInBytes?: Maybe<Scalars['BigInt']>;
  dashSizeInBytes?: Maybe<Scalars['BigInt']>;
  cmafSizeInBytes?: Maybe<Scalars['BigInt']>;
  hlsManifestPath?: Maybe<Scalars['String']>;
  dashManifestPath?: Maybe<Scalars['String']>;
  durationInSeconds?: Maybe<Scalars['Int']>;
  isArchived: Scalars['Boolean'];
  finishedDate?: Maybe<Scalars['Datetime']>;
  createdDate: Scalars['Datetime'];
  updatedDate: Scalars['Datetime'];
  createdUser: Scalars['String'];
  updatedUser: Scalars['String'];
  /** Reads and enables pagination through a set of `VideosTag`. */
  videosTags: VideosTagsConnection;
  /** Reads and enables pagination through a set of `TranscodingHistory`. */
  transcodingHistories: TranscodingHistoriesConnection;
  overallProgress: Scalars['Float'];
};


/** @permissions: VIDEO_READER,VIDEO_EDITOR,ADMIN */
export type VideoVideosTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<VideosTagsOrderBy>>;
  condition?: Maybe<VideosTagCondition>;
  filter?: Maybe<VideosTagFilter>;
};


/** @permissions: VIDEO_READER,VIDEO_EDITOR,ADMIN */
export type VideoTranscodingHistoriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TranscodingHistoriesOrderBy>>;
  condition?: Maybe<TranscodingHistoryCondition>;
  filter?: Maybe<TranscodingHistoryFilter>;
};

/** A condition to be used against `Video` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type VideoCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `title` field.
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `externalId` field. */
  externalId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `jobId` field. */
  jobId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `drmKeyId` field. */
  drmKeyId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `isProtected` field. */
  isProtected?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `sourceFileName` field. */
  sourceFileName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `sourceFileExtension` field. */
  sourceFileExtension?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `sourceLocation` field. */
  sourceLocation?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `sourceSizeInBytes` field. */
  sourceSizeInBytes?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `audioLanguages` field. */
  audioLanguages?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `subtitleLanguages` field. */
  subtitleLanguages?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `captionLanguages` field. */
  captionLanguages?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `videoBitrates` field. */
  videoBitrates?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Checks for equality with the object’s `transcodingStatus` field. */
  transcodingStatus?: Maybe<TranscodingStatus>;
  /** Checks for equality with the object’s `outputFormat` field. */
  outputFormat?: Maybe<OutputFormat>;
  /** Checks for equality with the object’s `qaStatus` field. */
  qaStatus?: Maybe<QaStatus>;
  /** Checks for equality with the object’s `qaComment` field. */
  qaComment?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `acquisitionProgress` field. */
  acquisitionProgress?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `encodingProgress` field. */
  encodingProgress?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `hlsSizeInBytes` field. */
  hlsSizeInBytes?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `dashSizeInBytes` field. */
  dashSizeInBytes?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `cmafSizeInBytes` field. */
  cmafSizeInBytes?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `hlsManifestPath` field. */
  hlsManifestPath?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `dashManifestPath` field. */
  dashManifestPath?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `durationInSeconds` field. */
  durationInSeconds?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `isArchived` field. */
  isArchived?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `finishedDate` field. */
  finishedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Video` object types. All fields are combined with a logical ‘and.’ */
export type VideoFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<StringFilter>;
  /** Filter by the object’s `externalId` field. */
  externalId?: Maybe<StringFilter>;
  /** Filter by the object’s `jobId` field. */
  jobId?: Maybe<StringFilter>;
  /** Filter by the object’s `drmKeyId` field. */
  drmKeyId?: Maybe<StringFilter>;
  /** Filter by the object’s `isProtected` field. */
  isProtected?: Maybe<BooleanFilter>;
  /** Filter by the object’s `sourceFileName` field. */
  sourceFileName?: Maybe<StringFilter>;
  /** Filter by the object’s `sourceFileExtension` field. */
  sourceFileExtension?: Maybe<StringFilter>;
  /** Filter by the object’s `sourceLocation` field. */
  sourceLocation?: Maybe<StringFilter>;
  /** Filter by the object’s `sourceSizeInBytes` field. */
  sourceSizeInBytes?: Maybe<BigIntFilter>;
  /** Filter by the object’s `audioLanguages` field. */
  audioLanguages?: Maybe<StringListFilter>;
  /** Filter by the object’s `subtitleLanguages` field. */
  subtitleLanguages?: Maybe<StringListFilter>;
  /** Filter by the object’s `captionLanguages` field. */
  captionLanguages?: Maybe<StringListFilter>;
  /** Filter by the object’s `videoBitrates` field. */
  videoBitrates?: Maybe<IntListFilter>;
  /** Filter by the object’s `transcodingStatus` field. */
  transcodingStatus?: Maybe<TranscodingStatusFilter>;
  /** Filter by the object’s `outputFormat` field. */
  outputFormat?: Maybe<OutputFormatFilter>;
  /** Filter by the object’s `qaStatus` field. */
  qaStatus?: Maybe<QaStatusFilter>;
  /** Filter by the object’s `qaComment` field. */
  qaComment?: Maybe<StringFilter>;
  /** Filter by the object’s `acquisitionProgress` field. */
  acquisitionProgress?: Maybe<IntFilter>;
  /** Filter by the object’s `encodingProgress` field. */
  encodingProgress?: Maybe<IntFilter>;
  /** Filter by the object’s `hlsSizeInBytes` field. */
  hlsSizeInBytes?: Maybe<BigIntFilter>;
  /** Filter by the object’s `dashSizeInBytes` field. */
  dashSizeInBytes?: Maybe<BigIntFilter>;
  /** Filter by the object’s `cmafSizeInBytes` field. */
  cmafSizeInBytes?: Maybe<BigIntFilter>;
  /** Filter by the object’s `hlsManifestPath` field. */
  hlsManifestPath?: Maybe<StringFilter>;
  /** Filter by the object’s `dashManifestPath` field. */
  dashManifestPath?: Maybe<StringFilter>;
  /** Filter by the object’s `durationInSeconds` field. */
  durationInSeconds?: Maybe<IntFilter>;
  /** Filter by the object’s `isArchived` field. */
  isArchived?: Maybe<BooleanFilter>;
  /** Filter by the object’s `finishedDate` field. */
  finishedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `videosTags` relation. */
  videosTags?: Maybe<VideoToManyVideosTagFilter>;
  /** Some related `videosTags` exist. */
  videosTagsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `transcodingHistories` relation. */
  transcodingHistories?: Maybe<VideoToManyTranscodingHistoryFilter>;
  /** Some related `transcodingHistories` exist. */
  transcodingHistoriesExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<VideoFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<VideoFilter>>;
  /** Negates the expression. */
  not?: Maybe<VideoFilter>;
};

/** Represents an update to a `Video`. Fields that are set will be updated. */
export type VideoPatch = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  qaStatus?: Maybe<QaStatus>;
  qaComment?: Maybe<Scalars['String']>;
  isArchived?: Maybe<Scalars['Boolean']>;
};

/**
 * A connection to a list of `Video` values.
 * @permissions: VIDEO_READER,VIDEO_EDITOR,ADMIN
 */
export type VideosConnection = {
  __typename?: 'VideosConnection';
  /** A list of `Video` objects. */
  nodes: Array<Maybe<Video>>;
  /** A list of edges which contains the `Video` and cursor to aid in pagination. */
  edges: Array<VideosEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Video` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Video` edge in the connection. */
export type VideosEdge = {
  __typename?: 'VideosEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Video` at the end of the edge. */
  node?: Maybe<Video>;
};

/** Methods to use when ordering `Video`. */
export enum VideosOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  ExternalIdAsc = 'EXTERNAL_ID_ASC',
  ExternalIdDesc = 'EXTERNAL_ID_DESC',
  JobIdAsc = 'JOB_ID_ASC',
  JobIdDesc = 'JOB_ID_DESC',
  DrmKeyIdAsc = 'DRM_KEY_ID_ASC',
  DrmKeyIdDesc = 'DRM_KEY_ID_DESC',
  IsProtectedAsc = 'IS_PROTECTED_ASC',
  IsProtectedDesc = 'IS_PROTECTED_DESC',
  SourceFileNameAsc = 'SOURCE_FILE_NAME_ASC',
  SourceFileNameDesc = 'SOURCE_FILE_NAME_DESC',
  SourceFileExtensionAsc = 'SOURCE_FILE_EXTENSION_ASC',
  SourceFileExtensionDesc = 'SOURCE_FILE_EXTENSION_DESC',
  SourceLocationAsc = 'SOURCE_LOCATION_ASC',
  SourceLocationDesc = 'SOURCE_LOCATION_DESC',
  SourceSizeInBytesAsc = 'SOURCE_SIZE_IN_BYTES_ASC',
  SourceSizeInBytesDesc = 'SOURCE_SIZE_IN_BYTES_DESC',
  AudioLanguagesAsc = 'AUDIO_LANGUAGES_ASC',
  AudioLanguagesDesc = 'AUDIO_LANGUAGES_DESC',
  SubtitleLanguagesAsc = 'SUBTITLE_LANGUAGES_ASC',
  SubtitleLanguagesDesc = 'SUBTITLE_LANGUAGES_DESC',
  CaptionLanguagesAsc = 'CAPTION_LANGUAGES_ASC',
  CaptionLanguagesDesc = 'CAPTION_LANGUAGES_DESC',
  VideoBitratesAsc = 'VIDEO_BITRATES_ASC',
  VideoBitratesDesc = 'VIDEO_BITRATES_DESC',
  TranscodingStatusAsc = 'TRANSCODING_STATUS_ASC',
  TranscodingStatusDesc = 'TRANSCODING_STATUS_DESC',
  OutputFormatAsc = 'OUTPUT_FORMAT_ASC',
  OutputFormatDesc = 'OUTPUT_FORMAT_DESC',
  QaStatusAsc = 'QA_STATUS_ASC',
  QaStatusDesc = 'QA_STATUS_DESC',
  QaCommentAsc = 'QA_COMMENT_ASC',
  QaCommentDesc = 'QA_COMMENT_DESC',
  AcquisitionProgressAsc = 'ACQUISITION_PROGRESS_ASC',
  AcquisitionProgressDesc = 'ACQUISITION_PROGRESS_DESC',
  EncodingProgressAsc = 'ENCODING_PROGRESS_ASC',
  EncodingProgressDesc = 'ENCODING_PROGRESS_DESC',
  HlsSizeInBytesAsc = 'HLS_SIZE_IN_BYTES_ASC',
  HlsSizeInBytesDesc = 'HLS_SIZE_IN_BYTES_DESC',
  DashSizeInBytesAsc = 'DASH_SIZE_IN_BYTES_ASC',
  DashSizeInBytesDesc = 'DASH_SIZE_IN_BYTES_DESC',
  CmafSizeInBytesAsc = 'CMAF_SIZE_IN_BYTES_ASC',
  CmafSizeInBytesDesc = 'CMAF_SIZE_IN_BYTES_DESC',
  HlsManifestPathAsc = 'HLS_MANIFEST_PATH_ASC',
  HlsManifestPathDesc = 'HLS_MANIFEST_PATH_DESC',
  DashManifestPathAsc = 'DASH_MANIFEST_PATH_ASC',
  DashManifestPathDesc = 'DASH_MANIFEST_PATH_DESC',
  DurationInSecondsAsc = 'DURATION_IN_SECONDS_ASC',
  DurationInSecondsDesc = 'DURATION_IN_SECONDS_DESC',
  IsArchivedAsc = 'IS_ARCHIVED_ASC',
  IsArchivedDesc = 'IS_ARCHIVED_DESC',
  FinishedDateAsc = 'FINISHED_DATE_ASC',
  FinishedDateDesc = 'FINISHED_DATE_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  UpdatedDateAsc = 'UPDATED_DATE_ASC',
  UpdatedDateDesc = 'UPDATED_DATE_DESC',
  CreatedUserAsc = 'CREATED_USER_ASC',
  CreatedUserDesc = 'CREATED_USER_DESC',
  UpdatedUserAsc = 'UPDATED_USER_ASC',
  UpdatedUserDesc = 'UPDATED_USER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: VIDEO_READER,VIDEO_EDITOR,ADMIN */
export type VideosTag = Node & {
  __typename?: 'VideosTag';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  videoId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Video` that is related to this `VideosTag`. */
  video?: Maybe<Video>;
};

/**
 * A condition to be used against `VideosTag` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type VideosTagCondition = {
  /** Checks for equality with the object’s `videoId` field. */
  videoId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `VideosTag` object types. All fields are combined with a logical ‘and.’ */
export type VideosTagFilter = {
  /** Filter by the object’s `videoId` field. */
  videoId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `video` relation. */
  video?: Maybe<VideoFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<VideosTagFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<VideosTagFilter>>;
  /** Negates the expression. */
  not?: Maybe<VideosTagFilter>;
};

/** An input for mutations affecting `VideosTag` */
export type VideosTagInput = {
  videoId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `VideosTag`. Fields that are set will be updated. */
export type VideosTagPatch = {
  videoId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `VideosTag` values.
 * @permissions: VIDEO_READER,VIDEO_EDITOR,ADMIN
 */
export type VideosTagsConnection = {
  __typename?: 'VideosTagsConnection';
  /** A list of `VideosTag` objects. */
  nodes: Array<Maybe<VideosTag>>;
  /** A list of edges which contains the `VideosTag` and cursor to aid in pagination. */
  edges: Array<VideosTagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `VideosTag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `VideosTag` edge in the connection. */
export type VideosTagsEdge = {
  __typename?: 'VideosTagsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `VideosTag` at the end of the edge. */
  node?: Maybe<VideosTag>;
};

/** Methods to use when ordering `VideosTag`. */
export enum VideosTagsOrderBy {
  Natural = 'NATURAL',
  VideoIdAsc = 'VIDEO_ID_ASC',
  VideoIdDesc = 'VIDEO_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type VideoSubscriptionPayload = {
  __typename?: 'VideoSubscriptionPayload';
  id: Scalars['Int'];
  video?: Maybe<Video>;
  event?: Maybe<Scalars['String']>;
};

/** A filter to be used against many `TranscodingHistory` object types. All fields are combined with a logical ‘and.’ */
export type VideoToManyTranscodingHistoryFilter = {
  /** Every related `TranscodingHistory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TranscodingHistoryFilter>;
  /** Some related `TranscodingHistory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TranscodingHistoryFilter>;
  /** No related `TranscodingHistory` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TranscodingHistoryFilter>;
};

/** A filter to be used against many `VideosTag` object types. All fields are combined with a logical ‘and.’ */
export type VideoToManyVideosTagFilter = {
  /** Every related `VideosTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<VideosTagFilter>;
  /** Some related `VideosTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<VideosTagFilter>;
  /** No related `VideosTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<VideosTagFilter>;
};

export type GetAcquisitionProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAcquisitionProfileQuery = (
  { __typename?: 'Query' }
  & { transcodingAcquisitionProfiles?: Maybe<(
    { __typename?: 'TranscodingAcquisitionProfilesConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'TranscodingAcquisitionProfile' }
      & Pick<TranscodingAcquisitionProfile, 'uriPath' | 'rootFolderPath' | 'listCredentialsSecret'>
    )>> }
  )> }
);

export type GetTranscodingProfilesQueryVariables = Exact<{
  processingProfileId: Scalars['Int'];
}>;


export type GetTranscodingProfilesQuery = (
  { __typename?: 'Query' }
  & { transcodingAcquisitionProfiles?: Maybe<(
    { __typename?: 'TranscodingAcquisitionProfilesConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'TranscodingAcquisitionProfile' }
      & Pick<TranscodingAcquisitionProfile, 'provider' | 'uriPath' | 'readCredentialsName' | 'readCredentialsSecret'>
    )>> }
  )>, transcodingPublishingProfiles?: Maybe<(
    { __typename?: 'TranscodingPublishingProfilesConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'TranscodingPublishingProfile' }
      & Pick<TranscodingPublishingProfile, 'provider' | 'uriPath' | 'credentialsName' | 'credentialsSecret'>
    )>> }
  )>, transcodingProcessingProfile?: Maybe<(
    { __typename?: 'TranscodingProcessingProfile' }
    & Pick<TranscodingProcessingProfile, 'videoStreamExpression' | 'audioFileLanguageExpression' | 'subtitleFileLanguageExpression' | 'captionFileLanguageExpression' | 'outputFormat' | 'drmProtection' | 'archiving' | 'useNativeLanguageNames' | 'deleteFilesFromSourceWhenDone' | 'drmApiUrl' | 'drmKeySeed' | 'drmManagementKey' | 'drmTenantId' | 'drmThumbprints'>
    & { transcodingVideoRepresentations: (
      { __typename?: 'TranscodingVideoRepresentationsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'TranscodingVideoRepresentation' }
        & Pick<TranscodingVideoRepresentation, 'width' | 'height' | 'bitrateInKbps'>
      )>> }
    ) }
  )> }
);


export const GetAcquisitionProfileDocument = gql`
    query GetAcquisitionProfile {
  transcodingAcquisitionProfiles(first: 1) {
    nodes {
      uriPath
      rootFolderPath
      listCredentialsSecret
    }
  }
}
    `;
export const GetTranscodingProfilesDocument = gql`
    query GetTranscodingProfiles($processingProfileId: Int!) {
  transcodingAcquisitionProfiles(first: 1) {
    nodes {
      provider
      uriPath
      readCredentialsName
      readCredentialsSecret
    }
  }
  transcodingPublishingProfiles(first: 1) {
    nodes {
      provider
      uriPath
      credentialsName
      credentialsSecret
    }
  }
  transcodingProcessingProfile(id: $processingProfileId) {
    videoStreamExpression
    audioFileLanguageExpression
    subtitleFileLanguageExpression
    captionFileLanguageExpression
    outputFormat
    drmProtection
    archiving
    useNativeLanguageNames
    deleteFilesFromSourceWhenDone
    drmApiUrl
    drmKeySeed
    drmManagementKey
    drmTenantId
    drmThumbprints
    transcodingVideoRepresentations {
      nodes {
        width
        height
        bitrateInKbps
      }
    }
  }
}
    `;