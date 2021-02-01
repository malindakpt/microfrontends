export type Maybe<T> = T | null;
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
  /** The day, does not include a time. */
  Date: any;
};

/** @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN */
export type AutomaticCollectionsFilter = Node & {
  __typename?: 'AutomaticCollectionsFilter';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  collectionId: Scalars['Int'];
  entityType: CollectionEntity;
  filterKey: Scalars['String'];
  filterValue?: Maybe<Scalars['String']>;
  /** Reads a single `Collection` that is related to this `AutomaticCollectionsFilter`. */
  collection?: Maybe<Collection>;
};

/**
 * A condition to be used against `AutomaticCollectionsFilter` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type AutomaticCollectionsFilterCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `collectionId` field. */
  collectionId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `entityType` field. */
  entityType?: Maybe<CollectionEntity>;
  /**
   * Checks for equality with the object’s `filterKey` field.
   * @notEmpty()
   */
  filterKey?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `filterValue` field. */
  filterValue?: Maybe<Scalars['String']>;
};

/** A filter to be used against `AutomaticCollectionsFilter` object types. All fields are combined with a logical ‘and.’ */
export type AutomaticCollectionsFilterFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `collectionId` field. */
  collectionId?: Maybe<IntFilter>;
  /** Filter by the object’s `entityType` field. */
  entityType?: Maybe<CollectionEntityFilter>;
  /** Filter by the object’s `filterKey` field. */
  filterKey?: Maybe<StringFilter>;
  /** Filter by the object’s `filterValue` field. */
  filterValue?: Maybe<StringFilter>;
  /** Filter by the object’s `collection` relation. */
  collection?: Maybe<CollectionFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<AutomaticCollectionsFilterFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<AutomaticCollectionsFilterFilter>>;
  /** Negates the expression. */
  not?: Maybe<AutomaticCollectionsFilterFilter>;
};

/** An input for mutations affecting `AutomaticCollectionsFilter` */
export type AutomaticCollectionsFilterInput = {
  id?: Maybe<Scalars['Int']>;
  collectionId: Scalars['Int'];
  entityType: CollectionEntity;
  /** @notEmpty() */
  filterKey: Scalars['String'];
  filterValue?: Maybe<Scalars['String']>;
};

/** Represents an update to a `AutomaticCollectionsFilter`. Fields that are set will be updated. */
export type AutomaticCollectionsFilterPatch = {
  id?: Maybe<Scalars['Int']>;
  collectionId?: Maybe<Scalars['Int']>;
  entityType?: Maybe<CollectionEntity>;
  /** @notEmpty() */
  filterKey?: Maybe<Scalars['String']>;
  filterValue?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `AutomaticCollectionsFilter` values.
 * @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN
 */
export type AutomaticCollectionsFiltersConnection = {
  __typename?: 'AutomaticCollectionsFiltersConnection';
  /** A list of `AutomaticCollectionsFilter` objects. */
  nodes: Array<Maybe<AutomaticCollectionsFilter>>;
  /** A list of edges which contains the `AutomaticCollectionsFilter` and cursor to aid in pagination. */
  edges: Array<AutomaticCollectionsFiltersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AutomaticCollectionsFilter` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `AutomaticCollectionsFilter` edge in the connection. */
export type AutomaticCollectionsFiltersEdge = {
  __typename?: 'AutomaticCollectionsFiltersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AutomaticCollectionsFilter` at the end of the edge. */
  node?: Maybe<AutomaticCollectionsFilter>;
};

/** Methods to use when ordering `AutomaticCollectionsFilter`. */
export enum AutomaticCollectionsFiltersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CollectionIdAsc = 'COLLECTION_ID_ASC',
  CollectionIdDesc = 'COLLECTION_ID_DESC',
  EntityTypeAsc = 'ENTITY_TYPE_ASC',
  EntityTypeDesc = 'ENTITY_TYPE_DESC',
  FilterKeyAsc = 'FILTER_KEY_ASC',
  FilterKeyDesc = 'FILTER_KEY_DESC',
  FilterValueAsc = 'FILTER_VALUE_ASC',
  FilterValueDesc = 'FILTER_VALUE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN */
export type Collection = Node & {
  __typename?: 'Collection';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  collectionType?: Maybe<CollectionType>;
  automaticCollectionSortKey?: Maybe<Scalars['String']>;
  publishStatus?: Maybe<PublishStatus>;
  publishedDate?: Maybe<Scalars['Datetime']>;
  publishedUser?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `AutomaticCollectionsFilter`. */
  automaticCollectionsFilters: AutomaticCollectionsFiltersConnection;
  /** Reads and enables pagination through a set of `CollectionRelation`. */
  collectionRelations: CollectionRelationsConnection;
  /** Reads and enables pagination through a set of `CollectionsTag`. */
  collectionsTags: CollectionsTagsConnection;
  /** Reads and enables pagination through a set of `CollectionsImage`. */
  collectionsImages: CollectionsImagesConnection;
};


/** @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN */
export type CollectionAutomaticCollectionsFiltersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AutomaticCollectionsFiltersOrderBy>>;
  condition?: Maybe<AutomaticCollectionsFilterCondition>;
  filter?: Maybe<AutomaticCollectionsFilterFilter>;
};


/** @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN */
export type CollectionCollectionRelationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionRelationsOrderBy>>;
  condition?: Maybe<CollectionRelationCondition>;
  filter?: Maybe<CollectionRelationFilter>;
};


/** @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN */
export type CollectionCollectionsTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionsTagsOrderBy>>;
  condition?: Maybe<CollectionsTagCondition>;
  filter?: Maybe<CollectionsTagFilter>;
};


/** @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN */
export type CollectionCollectionsImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionsImagesOrderBy>>;
  condition?: Maybe<CollectionsImageCondition>;
  filter?: Maybe<CollectionsImageFilter>;
};

/**
 * A condition to be used against `Collection` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CollectionCondition = {
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
  /** Checks for equality with the object’s `synopsis` field. */
  synopsis?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `collectionType` field. */
  collectionType?: Maybe<CollectionType>;
  /** Checks for equality with the object’s `automaticCollectionSortKey` field. */
  automaticCollectionSortKey?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `publishStatus` field. */
  publishStatus?: Maybe<PublishStatus>;
  /** Checks for equality with the object’s `publishedDate` field. */
  publishedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `publishedUser` field. */
  publishedUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

export enum CollectionEntity {
  Movie = 'MOVIE',
  Tvshow = 'TVSHOW',
  Season = 'SEASON',
  Episode = 'EPISODE'
}

/** A filter to be used against CollectionEntity fields. All fields are combined with a logical ‘and.’ */
export type CollectionEntityFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<CollectionEntity>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<CollectionEntity>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<CollectionEntity>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<CollectionEntity>;
  /** Included in the specified list. */
  in?: Maybe<Array<CollectionEntity>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<CollectionEntity>>;
  /** Less than the specified value. */
  lessThan?: Maybe<CollectionEntity>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<CollectionEntity>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<CollectionEntity>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<CollectionEntity>;
};

/** A filter to be used against `Collection` object types. All fields are combined with a logical ‘and.’ */
export type CollectionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<StringFilter>;
  /** Filter by the object’s `externalId` field. */
  externalId?: Maybe<StringFilter>;
  /** Filter by the object’s `synopsis` field. */
  synopsis?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `collectionType` field. */
  collectionType?: Maybe<CollectionTypeFilter>;
  /** Filter by the object’s `automaticCollectionSortKey` field. */
  automaticCollectionSortKey?: Maybe<StringFilter>;
  /** Filter by the object’s `publishStatus` field. */
  publishStatus?: Maybe<PublishStatusFilter>;
  /** Filter by the object’s `publishedDate` field. */
  publishedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `publishedUser` field. */
  publishedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `automaticCollectionsFilters` relation. */
  automaticCollectionsFilters?: Maybe<CollectionToManyAutomaticCollectionsFilterFilter>;
  /** Some related `automaticCollectionsFilters` exist. */
  automaticCollectionsFiltersExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `collectionRelations` relation. */
  collectionRelations?: Maybe<CollectionToManyCollectionRelationFilter>;
  /** Some related `collectionRelations` exist. */
  collectionRelationsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `collectionsTags` relation. */
  collectionsTags?: Maybe<CollectionToManyCollectionsTagFilter>;
  /** Some related `collectionsTags` exist. */
  collectionsTagsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `collectionsImages` relation. */
  collectionsImages?: Maybe<CollectionToManyCollectionsImageFilter>;
  /** Some related `collectionsImages` exist. */
  collectionsImagesExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CollectionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CollectionFilter>>;
  /** Negates the expression. */
  not?: Maybe<CollectionFilter>;
};

export enum CollectionImageType {
  Cover = 'COVER',
  Teaser = 'TEASER'
}

/** A filter to be used against CollectionImageType fields. All fields are combined with a logical ‘and.’ */
export type CollectionImageTypeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<CollectionImageType>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<CollectionImageType>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<CollectionImageType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<CollectionImageType>;
  /** Included in the specified list. */
  in?: Maybe<Array<CollectionImageType>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<CollectionImageType>>;
  /** Less than the specified value. */
  lessThan?: Maybe<CollectionImageType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<CollectionImageType>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<CollectionImageType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<CollectionImageType>;
};

/** An input for mutations affecting `Collection` */
export type CollectionInput = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  collectionType?: Maybe<CollectionType>;
  automaticCollectionSortKey?: Maybe<Scalars['String']>;
};

/** Represents an update to a `Collection`. Fields that are set will be updated. */
export type CollectionPatch = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  collectionType?: Maybe<CollectionType>;
  automaticCollectionSortKey?: Maybe<Scalars['String']>;
  publishStatus?: Maybe<PublishStatus>;
};

/** @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN */
export type CollectionRelation = Node & {
  __typename?: 'CollectionRelation';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  collectionId: Scalars['Int'];
  sortOrder: Scalars['Int'];
  movieId?: Maybe<Scalars['Int']>;
  tvshowId?: Maybe<Scalars['Int']>;
  seasonId?: Maybe<Scalars['Int']>;
  episodeId?: Maybe<Scalars['Int']>;
  /** Reads a single `Collection` that is related to this `CollectionRelation`. */
  collection?: Maybe<Collection>;
  /** Reads a single `Movie` that is related to this `CollectionRelation`. */
  movie?: Maybe<Movie>;
  /** Reads a single `Tvshow` that is related to this `CollectionRelation`. */
  tvshow?: Maybe<Tvshow>;
  /** Reads a single `Season` that is related to this `CollectionRelation`. */
  season?: Maybe<Season>;
  /** Reads a single `Episode` that is related to this `CollectionRelation`. */
  episode?: Maybe<Episode>;
};

/**
 * A condition to be used against `CollectionRelation` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CollectionRelationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `collectionId` field. */
  collectionId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `sortOrder` field. */
  sortOrder?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `movieId` field. */
  movieId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `tvshowId` field. */
  tvshowId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `seasonId` field. */
  seasonId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `episodeId` field. */
  episodeId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `CollectionRelation` object types. All fields are combined with a logical ‘and.’ */
export type CollectionRelationFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `collectionId` field. */
  collectionId?: Maybe<IntFilter>;
  /** Filter by the object’s `sortOrder` field. */
  sortOrder?: Maybe<IntFilter>;
  /** Filter by the object’s `movieId` field. */
  movieId?: Maybe<IntFilter>;
  /** Filter by the object’s `tvshowId` field. */
  tvshowId?: Maybe<IntFilter>;
  /** Filter by the object’s `seasonId` field. */
  seasonId?: Maybe<IntFilter>;
  /** Filter by the object’s `episodeId` field. */
  episodeId?: Maybe<IntFilter>;
  /** Filter by the object’s `collection` relation. */
  collection?: Maybe<CollectionFilter>;
  /** Filter by the object’s `movie` relation. */
  movie?: Maybe<MovieFilter>;
  /** A related `movie` exists. */
  movieExists?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `tvshow` relation. */
  tvshow?: Maybe<TvshowFilter>;
  /** A related `tvshow` exists. */
  tvshowExists?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `season` relation. */
  season?: Maybe<SeasonFilter>;
  /** A related `season` exists. */
  seasonExists?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `episode` relation. */
  episode?: Maybe<EpisodeFilter>;
  /** A related `episode` exists. */
  episodeExists?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CollectionRelationFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CollectionRelationFilter>>;
  /** Negates the expression. */
  not?: Maybe<CollectionRelationFilter>;
};

/** An input for mutations affecting `CollectionRelation` */
export type CollectionRelationInput = {
  id?: Maybe<Scalars['Int']>;
  collectionId: Scalars['Int'];
  sortOrder: Scalars['Int'];
  movieId?: Maybe<Scalars['Int']>;
  tvshowId?: Maybe<Scalars['Int']>;
  seasonId?: Maybe<Scalars['Int']>;
  episodeId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `CollectionRelation`. Fields that are set will be updated. */
export type CollectionRelationPatch = {
  collectionId?: Maybe<Scalars['Int']>;
  sortOrder?: Maybe<Scalars['Int']>;
  movieId?: Maybe<Scalars['Int']>;
  tvshowId?: Maybe<Scalars['Int']>;
  seasonId?: Maybe<Scalars['Int']>;
  episodeId?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `CollectionRelation` values.
 * @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN
 */
export type CollectionRelationsConnection = {
  __typename?: 'CollectionRelationsConnection';
  /** A list of `CollectionRelation` objects. */
  nodes: Array<Maybe<CollectionRelation>>;
  /** A list of edges which contains the `CollectionRelation` and cursor to aid in pagination. */
  edges: Array<CollectionRelationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CollectionRelation` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CollectionRelation` edge in the connection. */
export type CollectionRelationsEdge = {
  __typename?: 'CollectionRelationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CollectionRelation` at the end of the edge. */
  node?: Maybe<CollectionRelation>;
};

/** Methods to use when ordering `CollectionRelation`. */
export enum CollectionRelationsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CollectionIdAsc = 'COLLECTION_ID_ASC',
  CollectionIdDesc = 'COLLECTION_ID_DESC',
  SortOrderAsc = 'SORT_ORDER_ASC',
  SortOrderDesc = 'SORT_ORDER_DESC',
  MovieIdAsc = 'MOVIE_ID_ASC',
  MovieIdDesc = 'MOVIE_ID_DESC',
  TvshowIdAsc = 'TVSHOW_ID_ASC',
  TvshowIdDesc = 'TVSHOW_ID_DESC',
  SeasonIdAsc = 'SEASON_ID_ASC',
  SeasonIdDesc = 'SEASON_ID_DESC',
  EpisodeIdAsc = 'EPISODE_ID_ASC',
  EpisodeIdDesc = 'EPISODE_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A connection to a list of `Collection` values.
 * @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN
 */
export type CollectionsConnection = {
  __typename?: 'CollectionsConnection';
  /** A list of `Collection` objects. */
  nodes: Array<Maybe<Collection>>;
  /** A list of edges which contains the `Collection` and cursor to aid in pagination. */
  edges: Array<CollectionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Collection` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Collection` edge in the connection. */
export type CollectionsEdge = {
  __typename?: 'CollectionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Collection` at the end of the edge. */
  node?: Maybe<Collection>;
};

/** @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN */
export type CollectionsImage = Node & {
  __typename?: 'CollectionsImage';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  collectionId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: CollectionImageType;
  /** Reads a single `Collection` that is related to this `CollectionsImage`. */
  collection?: Maybe<Collection>;
};

/**
 * A condition to be used against `CollectionsImage` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CollectionsImageCondition = {
  /** Checks for equality with the object’s `collectionId` field. */
  collectionId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageId` field. */
  imageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageType` field. */
  imageType?: Maybe<CollectionImageType>;
};

/** A filter to be used against `CollectionsImage` object types. All fields are combined with a logical ‘and.’ */
export type CollectionsImageFilter = {
  /** Filter by the object’s `collectionId` field. */
  collectionId?: Maybe<IntFilter>;
  /** Filter by the object’s `imageId` field. */
  imageId?: Maybe<IntFilter>;
  /** Filter by the object’s `imageType` field. */
  imageType?: Maybe<CollectionImageTypeFilter>;
  /** Filter by the object’s `collection` relation. */
  collection?: Maybe<CollectionFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CollectionsImageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CollectionsImageFilter>>;
  /** Negates the expression. */
  not?: Maybe<CollectionsImageFilter>;
};

/** An input for mutations affecting `CollectionsImage` */
export type CollectionsImageInput = {
  collectionId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: CollectionImageType;
};

/** Represents an update to a `CollectionsImage`. Fields that are set will be updated. */
export type CollectionsImagePatch = {
  collectionId?: Maybe<Scalars['Int']>;
  imageId?: Maybe<Scalars['Int']>;
  imageType?: Maybe<CollectionImageType>;
};

/**
 * A connection to a list of `CollectionsImage` values.
 * @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN
 */
export type CollectionsImagesConnection = {
  __typename?: 'CollectionsImagesConnection';
  /** A list of `CollectionsImage` objects. */
  nodes: Array<Maybe<CollectionsImage>>;
  /** A list of edges which contains the `CollectionsImage` and cursor to aid in pagination. */
  edges: Array<CollectionsImagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CollectionsImage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CollectionsImage` edge in the connection. */
export type CollectionsImagesEdge = {
  __typename?: 'CollectionsImagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CollectionsImage` at the end of the edge. */
  node?: Maybe<CollectionsImage>;
};

/** Methods to use when ordering `CollectionsImage`. */
export enum CollectionsImagesOrderBy {
  Natural = 'NATURAL',
  CollectionIdAsc = 'COLLECTION_ID_ASC',
  CollectionIdDesc = 'COLLECTION_ID_DESC',
  ImageIdAsc = 'IMAGE_ID_ASC',
  ImageIdDesc = 'IMAGE_ID_DESC',
  ImageTypeAsc = 'IMAGE_TYPE_ASC',
  ImageTypeDesc = 'IMAGE_TYPE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Methods to use when ordering `Collection`. */
export enum CollectionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  ExternalIdAsc = 'EXTERNAL_ID_ASC',
  ExternalIdDesc = 'EXTERNAL_ID_DESC',
  SynopsisAsc = 'SYNOPSIS_ASC',
  SynopsisDesc = 'SYNOPSIS_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  CollectionTypeAsc = 'COLLECTION_TYPE_ASC',
  CollectionTypeDesc = 'COLLECTION_TYPE_DESC',
  AutomaticCollectionSortKeyAsc = 'AUTOMATIC_COLLECTION_SORT_KEY_ASC',
  AutomaticCollectionSortKeyDesc = 'AUTOMATIC_COLLECTION_SORT_KEY_DESC',
  PublishStatusAsc = 'PUBLISH_STATUS_ASC',
  PublishStatusDesc = 'PUBLISH_STATUS_DESC',
  PublishedDateAsc = 'PUBLISHED_DATE_ASC',
  PublishedDateDesc = 'PUBLISHED_DATE_DESC',
  PublishedUserAsc = 'PUBLISHED_USER_ASC',
  PublishedUserDesc = 'PUBLISHED_USER_DESC',
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

/** @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN */
export type CollectionsTag = Node & {
  __typename?: 'CollectionsTag';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  collectionId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Collection` that is related to this `CollectionsTag`. */
  collection?: Maybe<Collection>;
};

/**
 * A condition to be used against `CollectionsTag` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CollectionsTagCondition = {
  /** Checks for equality with the object’s `collectionId` field. */
  collectionId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `CollectionsTag` object types. All fields are combined with a logical ‘and.’ */
export type CollectionsTagFilter = {
  /** Filter by the object’s `collectionId` field. */
  collectionId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `collection` relation. */
  collection?: Maybe<CollectionFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CollectionsTagFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CollectionsTagFilter>>;
  /** Negates the expression. */
  not?: Maybe<CollectionsTagFilter>;
};

/** An input for mutations affecting `CollectionsTag` */
export type CollectionsTagInput = {
  collectionId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `CollectionsTag`. Fields that are set will be updated. */
export type CollectionsTagPatch = {
  collectionId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `CollectionsTag` values.
 * @permissions: COLLECTION_READER,COLLECTION_EDITOR,ADMIN
 */
export type CollectionsTagsConnection = {
  __typename?: 'CollectionsTagsConnection';
  /** A list of `CollectionsTag` objects. */
  nodes: Array<Maybe<CollectionsTag>>;
  /** A list of edges which contains the `CollectionsTag` and cursor to aid in pagination. */
  edges: Array<CollectionsTagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CollectionsTag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CollectionsTag` edge in the connection. */
export type CollectionsTagsEdge = {
  __typename?: 'CollectionsTagsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CollectionsTag` at the end of the edge. */
  node?: Maybe<CollectionsTag>;
};

/** Methods to use when ordering `CollectionsTag`. */
export enum CollectionsTagsOrderBy {
  Natural = 'NATURAL',
  CollectionIdAsc = 'COLLECTION_ID_ASC',
  CollectionIdDesc = 'COLLECTION_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type CollectionSubscriptionPayload = {
  __typename?: 'CollectionSubscriptionPayload';
  id: Scalars['Int'];
  collection?: Maybe<Collection>;
  event?: Maybe<Scalars['String']>;
};

/** A filter to be used against many `AutomaticCollectionsFilter` object types. All fields are combined with a logical ‘and.’ */
export type CollectionToManyAutomaticCollectionsFilterFilter = {
  /** Every related `AutomaticCollectionsFilter` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<AutomaticCollectionsFilterFilter>;
  /** Some related `AutomaticCollectionsFilter` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<AutomaticCollectionsFilterFilter>;
  /** No related `AutomaticCollectionsFilter` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<AutomaticCollectionsFilterFilter>;
};

/** A filter to be used against many `CollectionRelation` object types. All fields are combined with a logical ‘and.’ */
export type CollectionToManyCollectionRelationFilter = {
  /** Every related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<CollectionRelationFilter>;
  /** Some related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<CollectionRelationFilter>;
  /** No related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<CollectionRelationFilter>;
};

/** A filter to be used against many `CollectionsImage` object types. All fields are combined with a logical ‘and.’ */
export type CollectionToManyCollectionsImageFilter = {
  /** Every related `CollectionsImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<CollectionsImageFilter>;
  /** Some related `CollectionsImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<CollectionsImageFilter>;
  /** No related `CollectionsImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<CollectionsImageFilter>;
};

/** A filter to be used against many `CollectionsTag` object types. All fields are combined with a logical ‘and.’ */
export type CollectionToManyCollectionsTagFilter = {
  /** Every related `CollectionsTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<CollectionsTagFilter>;
  /** Some related `CollectionsTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<CollectionsTagFilter>;
  /** No related `CollectionsTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<CollectionsTagFilter>;
};

export enum CollectionType {
  Manual = 'MANUAL',
  Automatic = 'AUTOMATIC'
}

/** A filter to be used against CollectionType fields. All fields are combined with a logical ‘and.’ */
export type CollectionTypeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<CollectionType>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<CollectionType>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<CollectionType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<CollectionType>;
  /** Included in the specified list. */
  in?: Maybe<Array<CollectionType>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<CollectionType>>;
  /** Less than the specified value. */
  lessThan?: Maybe<CollectionType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<CollectionType>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<CollectionType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<CollectionType>;
};

/**
 * All input for the create `AutomaticCollectionsFilter` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type CreateAutomaticCollectionsFilterInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AutomaticCollectionsFilter` to be created by this mutation. */
  automaticCollectionsFilter: AutomaticCollectionsFilterInput;
};

/** The output of our create `AutomaticCollectionsFilter` mutation. */
export type CreateAutomaticCollectionsFilterPayload = {
  __typename?: 'CreateAutomaticCollectionsFilterPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AutomaticCollectionsFilter` that was created by this mutation. */
  automaticCollectionsFilter?: Maybe<AutomaticCollectionsFilter>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `AutomaticCollectionsFilter`. */
  collection?: Maybe<Collection>;
  /** An edge for our `AutomaticCollectionsFilter`. May be used by Relay 1. */
  automaticCollectionsFilterEdge?: Maybe<AutomaticCollectionsFiltersEdge>;
};


/** The output of our create `AutomaticCollectionsFilter` mutation. */
export type CreateAutomaticCollectionsFilterPayloadAutomaticCollectionsFilterEdgeArgs = {
  orderBy?: Maybe<Array<AutomaticCollectionsFiltersOrderBy>>;
};

/**
 * All input for the create `Collection` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type CreateCollectionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Collection` to be created by this mutation. */
  collection: CollectionInput;
};

/** The output of our create `Collection` mutation. */
export type CreateCollectionPayload = {
  __typename?: 'CreateCollectionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Collection` that was created by this mutation. */
  collection?: Maybe<Collection>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Collection`. May be used by Relay 1. */
  collectionEdge?: Maybe<CollectionsEdge>;
};


/** The output of our create `Collection` mutation. */
export type CreateCollectionPayloadCollectionEdgeArgs = {
  orderBy?: Maybe<Array<CollectionsOrderBy>>;
};

/**
 * All input for the create `CollectionRelation` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type CreateCollectionRelationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionRelation` to be created by this mutation. */
  collectionRelation: CollectionRelationInput;
};

/** The output of our create `CollectionRelation` mutation. */
export type CreateCollectionRelationPayload = {
  __typename?: 'CreateCollectionRelationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionRelation` that was created by this mutation. */
  collectionRelation?: Maybe<CollectionRelation>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `CollectionRelation`. */
  collection?: Maybe<Collection>;
  /** Reads a single `Movie` that is related to this `CollectionRelation`. */
  movie?: Maybe<Movie>;
  /** Reads a single `Tvshow` that is related to this `CollectionRelation`. */
  tvshow?: Maybe<Tvshow>;
  /** Reads a single `Season` that is related to this `CollectionRelation`. */
  season?: Maybe<Season>;
  /** Reads a single `Episode` that is related to this `CollectionRelation`. */
  episode?: Maybe<Episode>;
  /** An edge for our `CollectionRelation`. May be used by Relay 1. */
  collectionRelationEdge?: Maybe<CollectionRelationsEdge>;
};


/** The output of our create `CollectionRelation` mutation. */
export type CreateCollectionRelationPayloadCollectionRelationEdgeArgs = {
  orderBy?: Maybe<Array<CollectionRelationsOrderBy>>;
};

/**
 * All input for the create `CollectionsImage` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type CreateCollectionsImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionsImage` to be created by this mutation. */
  collectionsImage: CollectionsImageInput;
};

/** The output of our create `CollectionsImage` mutation. */
export type CreateCollectionsImagePayload = {
  __typename?: 'CreateCollectionsImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionsImage` that was created by this mutation. */
  collectionsImage?: Maybe<CollectionsImage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `CollectionsImage`. */
  collection?: Maybe<Collection>;
  /** An edge for our `CollectionsImage`. May be used by Relay 1. */
  collectionsImageEdge?: Maybe<CollectionsImagesEdge>;
};


/** The output of our create `CollectionsImage` mutation. */
export type CreateCollectionsImagePayloadCollectionsImageEdgeArgs = {
  orderBy?: Maybe<Array<CollectionsImagesOrderBy>>;
};

/**
 * All input for the create `CollectionsTag` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type CreateCollectionsTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionsTag` to be created by this mutation. */
  collectionsTag: CollectionsTagInput;
};

/** The output of our create `CollectionsTag` mutation. */
export type CreateCollectionsTagPayload = {
  __typename?: 'CreateCollectionsTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionsTag` that was created by this mutation. */
  collectionsTag?: Maybe<CollectionsTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `CollectionsTag`. */
  collection?: Maybe<Collection>;
  /** An edge for our `CollectionsTag`. May be used by Relay 1. */
  collectionsTagEdge?: Maybe<CollectionsTagsEdge>;
};


/** The output of our create `CollectionsTag` mutation. */
export type CreateCollectionsTagPayloadCollectionsTagEdgeArgs = {
  orderBy?: Maybe<Array<CollectionsTagsOrderBy>>;
};

/**
 * All input for the create `Episode` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateEpisodeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Episode` to be created by this mutation. */
  episode: EpisodeInput;
};

/** The output of our create `Episode` mutation. */
export type CreateEpisodePayload = {
  __typename?: 'CreateEpisodePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Episode` that was created by this mutation. */
  episode?: Maybe<Episode>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `Episode`. */
  season?: Maybe<Season>;
  /** An edge for our `Episode`. May be used by Relay 1. */
  episodeEdge?: Maybe<EpisodesEdge>;
};


/** The output of our create `Episode` mutation. */
export type CreateEpisodePayloadEpisodeEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesOrderBy>>;
};

/**
 * All input for the create `EpisodesCast` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateEpisodesCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesCast` to be created by this mutation. */
  episodesCast: EpisodesCastInput;
};

/** The output of our create `EpisodesCast` mutation. */
export type CreateEpisodesCastPayload = {
  __typename?: 'CreateEpisodesCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesCast` that was created by this mutation. */
  episodesCast?: Maybe<EpisodesCast>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesCast`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesCast`. May be used by Relay 1. */
  episodesCastEdge?: Maybe<EpisodesCastsEdge>;
};


/** The output of our create `EpisodesCast` mutation. */
export type CreateEpisodesCastPayloadEpisodesCastEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesCastsOrderBy>>;
};

/**
 * All input for the create `EpisodesImage` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateEpisodesImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesImage` to be created by this mutation. */
  episodesImage: EpisodesImageInput;
};

/** The output of our create `EpisodesImage` mutation. */
export type CreateEpisodesImagePayload = {
  __typename?: 'CreateEpisodesImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesImage` that was created by this mutation. */
  episodesImage?: Maybe<EpisodesImage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesImage`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesImage`. May be used by Relay 1. */
  episodesImageEdge?: Maybe<EpisodesImagesEdge>;
};


/** The output of our create `EpisodesImage` mutation. */
export type CreateEpisodesImagePayloadEpisodesImageEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesImagesOrderBy>>;
};

/**
 * All input for the create `EpisodesLicense` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateEpisodesLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesLicense` to be created by this mutation. */
  episodesLicense: EpisodesLicenseInput;
};

/** The output of our create `EpisodesLicense` mutation. */
export type CreateEpisodesLicensePayload = {
  __typename?: 'CreateEpisodesLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesLicense` that was created by this mutation. */
  episodesLicense?: Maybe<EpisodesLicense>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesLicense`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesLicense`. May be used by Relay 1. */
  episodesLicenseEdge?: Maybe<EpisodesLicensesEdge>;
};


/** The output of our create `EpisodesLicense` mutation. */
export type CreateEpisodesLicensePayloadEpisodesLicenseEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesLicensesOrderBy>>;
};

/**
 * All input for the create `EpisodesProductionCountry` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateEpisodesProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesProductionCountry` to be created by this mutation. */
  episodesProductionCountry: EpisodesProductionCountryInput;
};

/** The output of our create `EpisodesProductionCountry` mutation. */
export type CreateEpisodesProductionCountryPayload = {
  __typename?: 'CreateEpisodesProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesProductionCountry` that was created by this mutation. */
  episodesProductionCountry?: Maybe<EpisodesProductionCountry>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesProductionCountry`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesProductionCountry`. May be used by Relay 1. */
  episodesProductionCountryEdge?: Maybe<EpisodesProductionCountriesEdge>;
};


/** The output of our create `EpisodesProductionCountry` mutation. */
export type CreateEpisodesProductionCountryPayloadEpisodesProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesProductionCountriesOrderBy>>;
};

/**
 * All input for the create `EpisodesTag` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateEpisodesTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTag` to be created by this mutation. */
  episodesTag: EpisodesTagInput;
};

/** The output of our create `EpisodesTag` mutation. */
export type CreateEpisodesTagPayload = {
  __typename?: 'CreateEpisodesTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTag` that was created by this mutation. */
  episodesTag?: Maybe<EpisodesTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesTag`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesTag`. May be used by Relay 1. */
  episodesTagEdge?: Maybe<EpisodesTagsEdge>;
};


/** The output of our create `EpisodesTag` mutation. */
export type CreateEpisodesTagPayloadEpisodesTagEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesTagsOrderBy>>;
};

/**
 * All input for the create `EpisodesTrailer` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateEpisodesTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTrailer` to be created by this mutation. */
  episodesTrailer: EpisodesTrailerInput;
};

/** The output of our create `EpisodesTrailer` mutation. */
export type CreateEpisodesTrailerPayload = {
  __typename?: 'CreateEpisodesTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTrailer` that was created by this mutation. */
  episodesTrailer?: Maybe<EpisodesTrailer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesTrailer`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesTrailer`. May be used by Relay 1. */
  episodesTrailerEdge?: Maybe<EpisodesTrailersEdge>;
};


/** The output of our create `EpisodesTrailer` mutation. */
export type CreateEpisodesTrailerPayloadEpisodesTrailerEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesTrailersOrderBy>>;
};

/**
 * All input for the create `EpisodesTvshowGenre` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateEpisodesTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTvshowGenre` to be created by this mutation. */
  episodesTvshowGenre: EpisodesTvshowGenreInput;
};

/** The output of our create `EpisodesTvshowGenre` mutation. */
export type CreateEpisodesTvshowGenrePayload = {
  __typename?: 'CreateEpisodesTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTvshowGenre` that was created by this mutation. */
  episodesTvshowGenre?: Maybe<EpisodesTvshowGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesTvshowGenre`. */
  episode?: Maybe<Episode>;
  /** Reads a single `TvshowGenre` that is related to this `EpisodesTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
  /** An edge for our `EpisodesTvshowGenre`. May be used by Relay 1. */
  episodesTvshowGenreEdge?: Maybe<EpisodesTvshowGenresEdge>;
};


/** The output of our create `EpisodesTvshowGenre` mutation. */
export type CreateEpisodesTvshowGenrePayloadEpisodesTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesTvshowGenresOrderBy>>;
};

/**
 * All input for the create `MovieGenre` mutation.
 * @permissions: SETTINGS_EDITOR,ADMIN
 */
export type CreateMovieGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MovieGenre` to be created by this mutation. */
  movieGenre: MovieGenreInput;
};

/** The output of our create `MovieGenre` mutation. */
export type CreateMovieGenrePayload = {
  __typename?: 'CreateMovieGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MovieGenre` that was created by this mutation. */
  movieGenre?: Maybe<MovieGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `MovieGenre`. May be used by Relay 1. */
  movieGenreEdge?: Maybe<MovieGenresEdge>;
};


/** The output of our create `MovieGenre` mutation. */
export type CreateMovieGenrePayloadMovieGenreEdgeArgs = {
  orderBy?: Maybe<Array<MovieGenresOrderBy>>;
};

/**
 * All input for the create `Movie` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type CreateMovieInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Movie` to be created by this mutation. */
  movie: MovieInput;
};

/** The output of our create `Movie` mutation. */
export type CreateMoviePayload = {
  __typename?: 'CreateMoviePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Movie` that was created by this mutation. */
  movie?: Maybe<Movie>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Movie`. May be used by Relay 1. */
  movieEdge?: Maybe<MoviesEdge>;
};


/** The output of our create `Movie` mutation. */
export type CreateMoviePayloadMovieEdgeArgs = {
  orderBy?: Maybe<Array<MoviesOrderBy>>;
};

/**
 * All input for the create `MoviesCast` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type CreateMoviesCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesCast` to be created by this mutation. */
  moviesCast: MoviesCastInput;
};

/** The output of our create `MoviesCast` mutation. */
export type CreateMoviesCastPayload = {
  __typename?: 'CreateMoviesCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesCast` that was created by this mutation. */
  moviesCast?: Maybe<MoviesCast>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesCast`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesCast`. May be used by Relay 1. */
  moviesCastEdge?: Maybe<MoviesCastsEdge>;
};


/** The output of our create `MoviesCast` mutation. */
export type CreateMoviesCastPayloadMoviesCastEdgeArgs = {
  orderBy?: Maybe<Array<MoviesCastsOrderBy>>;
};

/**
 * All input for the create `MoviesImage` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type CreateMoviesImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesImage` to be created by this mutation. */
  moviesImage: MoviesImageInput;
};

/** The output of our create `MoviesImage` mutation. */
export type CreateMoviesImagePayload = {
  __typename?: 'CreateMoviesImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesImage` that was created by this mutation. */
  moviesImage?: Maybe<MoviesImage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesImage`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesImage`. May be used by Relay 1. */
  moviesImageEdge?: Maybe<MoviesImagesEdge>;
};


/** The output of our create `MoviesImage` mutation. */
export type CreateMoviesImagePayloadMoviesImageEdgeArgs = {
  orderBy?: Maybe<Array<MoviesImagesOrderBy>>;
};

/**
 * All input for the create `MoviesLicense` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type CreateMoviesLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesLicense` to be created by this mutation. */
  moviesLicense: MoviesLicenseInput;
};

/** The output of our create `MoviesLicense` mutation. */
export type CreateMoviesLicensePayload = {
  __typename?: 'CreateMoviesLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesLicense` that was created by this mutation. */
  moviesLicense?: Maybe<MoviesLicense>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesLicense`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesLicense`. May be used by Relay 1. */
  moviesLicenseEdge?: Maybe<MoviesLicensesEdge>;
};


/** The output of our create `MoviesLicense` mutation. */
export type CreateMoviesLicensePayloadMoviesLicenseEdgeArgs = {
  orderBy?: Maybe<Array<MoviesLicensesOrderBy>>;
};

/**
 * All input for the create `MoviesMovieGenre` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type CreateMoviesMovieGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesMovieGenre` to be created by this mutation. */
  moviesMovieGenre: MoviesMovieGenreInput;
};

/** The output of our create `MoviesMovieGenre` mutation. */
export type CreateMoviesMovieGenrePayload = {
  __typename?: 'CreateMoviesMovieGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesMovieGenre` that was created by this mutation. */
  moviesMovieGenre?: Maybe<MoviesMovieGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesMovieGenre`. */
  movie?: Maybe<Movie>;
  /** Reads a single `MovieGenre` that is related to this `MoviesMovieGenre`. */
  movieGenres?: Maybe<MovieGenre>;
  /** An edge for our `MoviesMovieGenre`. May be used by Relay 1. */
  moviesMovieGenreEdge?: Maybe<MoviesMovieGenresEdge>;
};


/** The output of our create `MoviesMovieGenre` mutation. */
export type CreateMoviesMovieGenrePayloadMoviesMovieGenreEdgeArgs = {
  orderBy?: Maybe<Array<MoviesMovieGenresOrderBy>>;
};

/**
 * All input for the create `MoviesProductionCountry` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type CreateMoviesProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesProductionCountry` to be created by this mutation. */
  moviesProductionCountry: MoviesProductionCountryInput;
};

/** The output of our create `MoviesProductionCountry` mutation. */
export type CreateMoviesProductionCountryPayload = {
  __typename?: 'CreateMoviesProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesProductionCountry` that was created by this mutation. */
  moviesProductionCountry?: Maybe<MoviesProductionCountry>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesProductionCountry`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesProductionCountry`. May be used by Relay 1. */
  moviesProductionCountryEdge?: Maybe<MoviesProductionCountriesEdge>;
};


/** The output of our create `MoviesProductionCountry` mutation. */
export type CreateMoviesProductionCountryPayloadMoviesProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<MoviesProductionCountriesOrderBy>>;
};

/**
 * All input for the create `MoviesTag` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type CreateMoviesTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesTag` to be created by this mutation. */
  moviesTag: MoviesTagInput;
};

/** The output of our create `MoviesTag` mutation. */
export type CreateMoviesTagPayload = {
  __typename?: 'CreateMoviesTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesTag` that was created by this mutation. */
  moviesTag?: Maybe<MoviesTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesTag`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesTag`. May be used by Relay 1. */
  moviesTagEdge?: Maybe<MoviesTagsEdge>;
};


/** The output of our create `MoviesTag` mutation. */
export type CreateMoviesTagPayloadMoviesTagEdgeArgs = {
  orderBy?: Maybe<Array<MoviesTagsOrderBy>>;
};

/**
 * All input for the create `MoviesTrailer` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type CreateMoviesTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesTrailer` to be created by this mutation. */
  moviesTrailer: MoviesTrailerInput;
};

/** The output of our create `MoviesTrailer` mutation. */
export type CreateMoviesTrailerPayload = {
  __typename?: 'CreateMoviesTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesTrailer` that was created by this mutation. */
  moviesTrailer?: Maybe<MoviesTrailer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesTrailer`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesTrailer`. May be used by Relay 1. */
  moviesTrailerEdge?: Maybe<MoviesTrailersEdge>;
};


/** The output of our create `MoviesTrailer` mutation. */
export type CreateMoviesTrailerPayloadMoviesTrailerEdgeArgs = {
  orderBy?: Maybe<Array<MoviesTrailersOrderBy>>;
};

/**
 * All input for the create `Season` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateSeasonInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Season` to be created by this mutation. */
  season: SeasonInput;
};

/** The output of our create `Season` mutation. */
export type CreateSeasonPayload = {
  __typename?: 'CreateSeasonPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Season` that was created by this mutation. */
  season?: Maybe<Season>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `Season`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `Season`. May be used by Relay 1. */
  seasonEdge?: Maybe<SeasonsEdge>;
};


/** The output of our create `Season` mutation. */
export type CreateSeasonPayloadSeasonEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsOrderBy>>;
};

/**
 * All input for the create `SeasonsCast` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateSeasonsCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsCast` to be created by this mutation. */
  seasonsCast: SeasonsCastInput;
};

/** The output of our create `SeasonsCast` mutation. */
export type CreateSeasonsCastPayload = {
  __typename?: 'CreateSeasonsCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsCast` that was created by this mutation. */
  seasonsCast?: Maybe<SeasonsCast>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsCast`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsCast`. May be used by Relay 1. */
  seasonsCastEdge?: Maybe<SeasonsCastsEdge>;
};


/** The output of our create `SeasonsCast` mutation. */
export type CreateSeasonsCastPayloadSeasonsCastEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsCastsOrderBy>>;
};

/**
 * All input for the create `SeasonsImage` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateSeasonsImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsImage` to be created by this mutation. */
  seasonsImage: SeasonsImageInput;
};

/** The output of our create `SeasonsImage` mutation. */
export type CreateSeasonsImagePayload = {
  __typename?: 'CreateSeasonsImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsImage` that was created by this mutation. */
  seasonsImage?: Maybe<SeasonsImage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsImage`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsImage`. May be used by Relay 1. */
  seasonsImageEdge?: Maybe<SeasonsImagesEdge>;
};


/** The output of our create `SeasonsImage` mutation. */
export type CreateSeasonsImagePayloadSeasonsImageEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsImagesOrderBy>>;
};

/**
 * All input for the create `SeasonsLicense` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateSeasonsLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsLicense` to be created by this mutation. */
  seasonsLicense: SeasonsLicenseInput;
};

/** The output of our create `SeasonsLicense` mutation. */
export type CreateSeasonsLicensePayload = {
  __typename?: 'CreateSeasonsLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsLicense` that was created by this mutation. */
  seasonsLicense?: Maybe<SeasonsLicense>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsLicense`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsLicense`. May be used by Relay 1. */
  seasonsLicenseEdge?: Maybe<SeasonsLicensesEdge>;
};


/** The output of our create `SeasonsLicense` mutation. */
export type CreateSeasonsLicensePayloadSeasonsLicenseEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsLicensesOrderBy>>;
};

/**
 * All input for the create `SeasonsProductionCountry` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateSeasonsProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsProductionCountry` to be created by this mutation. */
  seasonsProductionCountry: SeasonsProductionCountryInput;
};

/** The output of our create `SeasonsProductionCountry` mutation. */
export type CreateSeasonsProductionCountryPayload = {
  __typename?: 'CreateSeasonsProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsProductionCountry` that was created by this mutation. */
  seasonsProductionCountry?: Maybe<SeasonsProductionCountry>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsProductionCountry`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsProductionCountry`. May be used by Relay 1. */
  seasonsProductionCountryEdge?: Maybe<SeasonsProductionCountriesEdge>;
};


/** The output of our create `SeasonsProductionCountry` mutation. */
export type CreateSeasonsProductionCountryPayloadSeasonsProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsProductionCountriesOrderBy>>;
};

/**
 * All input for the create `SeasonsTag` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateSeasonsTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTag` to be created by this mutation. */
  seasonsTag: SeasonsTagInput;
};

/** The output of our create `SeasonsTag` mutation. */
export type CreateSeasonsTagPayload = {
  __typename?: 'CreateSeasonsTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTag` that was created by this mutation. */
  seasonsTag?: Maybe<SeasonsTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsTag`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsTag`. May be used by Relay 1. */
  seasonsTagEdge?: Maybe<SeasonsTagsEdge>;
};


/** The output of our create `SeasonsTag` mutation. */
export type CreateSeasonsTagPayloadSeasonsTagEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsTagsOrderBy>>;
};

/**
 * All input for the create `SeasonsTrailer` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateSeasonsTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTrailer` to be created by this mutation. */
  seasonsTrailer: SeasonsTrailerInput;
};

/** The output of our create `SeasonsTrailer` mutation. */
export type CreateSeasonsTrailerPayload = {
  __typename?: 'CreateSeasonsTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTrailer` that was created by this mutation. */
  seasonsTrailer?: Maybe<SeasonsTrailer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsTrailer`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsTrailer`. May be used by Relay 1. */
  seasonsTrailerEdge?: Maybe<SeasonsTrailersEdge>;
};


/** The output of our create `SeasonsTrailer` mutation. */
export type CreateSeasonsTrailerPayloadSeasonsTrailerEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsTrailersOrderBy>>;
};

/**
 * All input for the create `SeasonsTvshowGenre` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateSeasonsTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTvshowGenre` to be created by this mutation. */
  seasonsTvshowGenre: SeasonsTvshowGenreInput;
};

/** The output of our create `SeasonsTvshowGenre` mutation. */
export type CreateSeasonsTvshowGenrePayload = {
  __typename?: 'CreateSeasonsTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTvshowGenre` that was created by this mutation. */
  seasonsTvshowGenre?: Maybe<SeasonsTvshowGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsTvshowGenre`. */
  season?: Maybe<Season>;
  /** Reads a single `TvshowGenre` that is related to this `SeasonsTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
  /** An edge for our `SeasonsTvshowGenre`. May be used by Relay 1. */
  seasonsTvshowGenreEdge?: Maybe<SeasonsTvshowGenresEdge>;
};


/** The output of our create `SeasonsTvshowGenre` mutation. */
export type CreateSeasonsTvshowGenrePayloadSeasonsTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsTvshowGenresOrderBy>>;
};

/**
 * All input for the create `TvshowGenre` mutation.
 * @permissions: SETTINGS_EDITOR,ADMIN
 */
export type CreateTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowGenre` to be created by this mutation. */
  tvshowGenre: TvshowGenreInput;
};

/** The output of our create `TvshowGenre` mutation. */
export type CreateTvshowGenrePayload = {
  __typename?: 'CreateTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowGenre` that was created by this mutation. */
  tvshowGenre?: Maybe<TvshowGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `TvshowGenre`. May be used by Relay 1. */
  tvshowGenreEdge?: Maybe<TvshowGenresEdge>;
};


/** The output of our create `TvshowGenre` mutation. */
export type CreateTvshowGenrePayloadTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<TvshowGenresOrderBy>>;
};

/**
 * All input for the create `Tvshow` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateTvshowInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tvshow` to be created by this mutation. */
  tvshow: TvshowInput;
};

/** The output of our create `Tvshow` mutation. */
export type CreateTvshowPayload = {
  __typename?: 'CreateTvshowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tvshow` that was created by this mutation. */
  tvshow?: Maybe<Tvshow>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Tvshow`. May be used by Relay 1. */
  tvshowEdge?: Maybe<TvshowsEdge>;
};


/** The output of our create `Tvshow` mutation. */
export type CreateTvshowPayloadTvshowEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsOrderBy>>;
};

/**
 * All input for the create `TvshowsCast` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateTvshowsCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsCast` to be created by this mutation. */
  tvshowsCast: TvshowsCastInput;
};

/** The output of our create `TvshowsCast` mutation. */
export type CreateTvshowsCastPayload = {
  __typename?: 'CreateTvshowsCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsCast` that was created by this mutation. */
  tvshowsCast?: Maybe<TvshowsCast>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsCast`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsCast`. May be used by Relay 1. */
  tvshowsCastEdge?: Maybe<TvshowsCastsEdge>;
};


/** The output of our create `TvshowsCast` mutation. */
export type CreateTvshowsCastPayloadTvshowsCastEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsCastsOrderBy>>;
};

/**
 * All input for the create `TvshowsImage` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateTvshowsImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsImage` to be created by this mutation. */
  tvshowsImage: TvshowsImageInput;
};

/** The output of our create `TvshowsImage` mutation. */
export type CreateTvshowsImagePayload = {
  __typename?: 'CreateTvshowsImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsImage` that was created by this mutation. */
  tvshowsImage?: Maybe<TvshowsImage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsImage`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsImage`. May be used by Relay 1. */
  tvshowsImageEdge?: Maybe<TvshowsImagesEdge>;
};


/** The output of our create `TvshowsImage` mutation. */
export type CreateTvshowsImagePayloadTvshowsImageEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsImagesOrderBy>>;
};

/**
 * All input for the create `TvshowsLicense` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateTvshowsLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsLicense` to be created by this mutation. */
  tvshowsLicense: TvshowsLicenseInput;
};

/** The output of our create `TvshowsLicense` mutation. */
export type CreateTvshowsLicensePayload = {
  __typename?: 'CreateTvshowsLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsLicense` that was created by this mutation. */
  tvshowsLicense?: Maybe<TvshowsLicense>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsLicense`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsLicense`. May be used by Relay 1. */
  tvshowsLicenseEdge?: Maybe<TvshowsLicensesEdge>;
};


/** The output of our create `TvshowsLicense` mutation. */
export type CreateTvshowsLicensePayloadTvshowsLicenseEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsLicensesOrderBy>>;
};

/**
 * All input for the create `TvshowsProductionCountry` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateTvshowsProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsProductionCountry` to be created by this mutation. */
  tvshowsProductionCountry: TvshowsProductionCountryInput;
};

/** The output of our create `TvshowsProductionCountry` mutation. */
export type CreateTvshowsProductionCountryPayload = {
  __typename?: 'CreateTvshowsProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsProductionCountry` that was created by this mutation. */
  tvshowsProductionCountry?: Maybe<TvshowsProductionCountry>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsProductionCountry`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsProductionCountry`. May be used by Relay 1. */
  tvshowsProductionCountryEdge?: Maybe<TvshowsProductionCountriesEdge>;
};


/** The output of our create `TvshowsProductionCountry` mutation. */
export type CreateTvshowsProductionCountryPayloadTvshowsProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsProductionCountriesOrderBy>>;
};

/**
 * All input for the create `TvshowsTag` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateTvshowsTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTag` to be created by this mutation. */
  tvshowsTag: TvshowsTagInput;
};

/** The output of our create `TvshowsTag` mutation. */
export type CreateTvshowsTagPayload = {
  __typename?: 'CreateTvshowsTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTag` that was created by this mutation. */
  tvshowsTag?: Maybe<TvshowsTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsTag`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsTag`. May be used by Relay 1. */
  tvshowsTagEdge?: Maybe<TvshowsTagsEdge>;
};


/** The output of our create `TvshowsTag` mutation. */
export type CreateTvshowsTagPayloadTvshowsTagEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsTagsOrderBy>>;
};

/**
 * All input for the create `TvshowsTrailer` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateTvshowsTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTrailer` to be created by this mutation. */
  tvshowsTrailer: TvshowsTrailerInput;
};

/** The output of our create `TvshowsTrailer` mutation. */
export type CreateTvshowsTrailerPayload = {
  __typename?: 'CreateTvshowsTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTrailer` that was created by this mutation. */
  tvshowsTrailer?: Maybe<TvshowsTrailer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsTrailer`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsTrailer`. May be used by Relay 1. */
  tvshowsTrailerEdge?: Maybe<TvshowsTrailersEdge>;
};


/** The output of our create `TvshowsTrailer` mutation. */
export type CreateTvshowsTrailerPayloadTvshowsTrailerEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsTrailersOrderBy>>;
};

/**
 * All input for the create `TvshowsTvshowGenre` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type CreateTvshowsTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTvshowGenre` to be created by this mutation. */
  tvshowsTvshowGenre: TvshowsTvshowGenreInput;
};

/** The output of our create `TvshowsTvshowGenre` mutation. */
export type CreateTvshowsTvshowGenrePayload = {
  __typename?: 'CreateTvshowsTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTvshowGenre` that was created by this mutation. */
  tvshowsTvshowGenre?: Maybe<TvshowsTvshowGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsTvshowGenre`. */
  tvshow?: Maybe<Tvshow>;
  /** Reads a single `TvshowGenre` that is related to this `TvshowsTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
  /** An edge for our `TvshowsTvshowGenre`. May be used by Relay 1. */
  tvshowsTvshowGenreEdge?: Maybe<TvshowsTvshowGenresEdge>;
};


/** The output of our create `TvshowsTvshowGenre` mutation. */
export type CreateTvshowsTvshowGenrePayloadTvshowsTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsTvshowGenresOrderBy>>;
};



/** A filter to be used against Date fields. All fields are combined with a logical ‘and.’ */
export type DateFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Date']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Date']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Date']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Date']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Date']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Date']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Date']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Date']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Date']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Date']>;
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
 * All input for the `deleteAutomaticCollectionsFilterByNodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteAutomaticCollectionsFilterByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AutomaticCollectionsFilter` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteAutomaticCollectionsFilter` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteAutomaticCollectionsFilterInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `AutomaticCollectionsFilter` mutation. */
export type DeleteAutomaticCollectionsFilterPayload = {
  __typename?: 'DeleteAutomaticCollectionsFilterPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AutomaticCollectionsFilter` that was deleted by this mutation. */
  automaticCollectionsFilter?: Maybe<AutomaticCollectionsFilter>;
  deletedAutomaticCollectionsFilterNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `AutomaticCollectionsFilter`. */
  collection?: Maybe<Collection>;
  /** An edge for our `AutomaticCollectionsFilter`. May be used by Relay 1. */
  automaticCollectionsFilterEdge?: Maybe<AutomaticCollectionsFiltersEdge>;
};


/** The output of our delete `AutomaticCollectionsFilter` mutation. */
export type DeleteAutomaticCollectionsFilterPayloadAutomaticCollectionsFilterEdgeArgs = {
  orderBy?: Maybe<Array<AutomaticCollectionsFiltersOrderBy>>;
};

/**
 * All input for the `deleteCollectionByExternalId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
};

/**
 * All input for the `deleteCollectionByNodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Collection` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteCollection` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Collection` mutation. */
export type DeleteCollectionPayload = {
  __typename?: 'DeleteCollectionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Collection` that was deleted by this mutation. */
  collection?: Maybe<Collection>;
  deletedCollectionNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Collection`. May be used by Relay 1. */
  collectionEdge?: Maybe<CollectionsEdge>;
};


/** The output of our delete `Collection` mutation. */
export type DeleteCollectionPayloadCollectionEdgeArgs = {
  orderBy?: Maybe<Array<CollectionsOrderBy>>;
};

/**
 * All input for the `deleteCollectionRelationByCollectionIdAndEpisodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionRelationByCollectionIdAndEpisodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  collectionId: Scalars['Int'];
  episodeId: Scalars['Int'];
};

/**
 * All input for the `deleteCollectionRelationByCollectionIdAndMovieId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionRelationByCollectionIdAndMovieIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  collectionId: Scalars['Int'];
  movieId: Scalars['Int'];
};

/**
 * All input for the `deleteCollectionRelationByCollectionIdAndSeasonId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionRelationByCollectionIdAndSeasonIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  collectionId: Scalars['Int'];
  seasonId: Scalars['Int'];
};

/**
 * All input for the `deleteCollectionRelationByCollectionIdAndTvshowId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionRelationByCollectionIdAndTvshowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  collectionId: Scalars['Int'];
  tvshowId: Scalars['Int'];
};

/**
 * All input for the `deleteCollectionRelationByNodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionRelationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CollectionRelation` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteCollectionRelation` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionRelationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `CollectionRelation` mutation. */
export type DeleteCollectionRelationPayload = {
  __typename?: 'DeleteCollectionRelationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionRelation` that was deleted by this mutation. */
  collectionRelation?: Maybe<CollectionRelation>;
  deletedCollectionRelationNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `CollectionRelation`. */
  collection?: Maybe<Collection>;
  /** Reads a single `Movie` that is related to this `CollectionRelation`. */
  movie?: Maybe<Movie>;
  /** Reads a single `Tvshow` that is related to this `CollectionRelation`. */
  tvshow?: Maybe<Tvshow>;
  /** Reads a single `Season` that is related to this `CollectionRelation`. */
  season?: Maybe<Season>;
  /** Reads a single `Episode` that is related to this `CollectionRelation`. */
  episode?: Maybe<Episode>;
  /** An edge for our `CollectionRelation`. May be used by Relay 1. */
  collectionRelationEdge?: Maybe<CollectionRelationsEdge>;
};


/** The output of our delete `CollectionRelation` mutation. */
export type DeleteCollectionRelationPayloadCollectionRelationEdgeArgs = {
  orderBy?: Maybe<Array<CollectionRelationsOrderBy>>;
};

/**
 * All input for the `deleteCollectionsImageByNodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionsImageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CollectionsImage` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteCollectionsImage` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionsImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  collectionId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: CollectionImageType;
};

/** The output of our delete `CollectionsImage` mutation. */
export type DeleteCollectionsImagePayload = {
  __typename?: 'DeleteCollectionsImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionsImage` that was deleted by this mutation. */
  collectionsImage?: Maybe<CollectionsImage>;
  deletedCollectionsImageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `CollectionsImage`. */
  collection?: Maybe<Collection>;
  /** An edge for our `CollectionsImage`. May be used by Relay 1. */
  collectionsImageEdge?: Maybe<CollectionsImagesEdge>;
};


/** The output of our delete `CollectionsImage` mutation. */
export type DeleteCollectionsImagePayloadCollectionsImageEdgeArgs = {
  orderBy?: Maybe<Array<CollectionsImagesOrderBy>>;
};

/**
 * All input for the `deleteCollectionsTagByNodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionsTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CollectionsTag` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteCollectionsTag` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type DeleteCollectionsTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  collectionId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `CollectionsTag` mutation. */
export type DeleteCollectionsTagPayload = {
  __typename?: 'DeleteCollectionsTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionsTag` that was deleted by this mutation. */
  collectionsTag?: Maybe<CollectionsTag>;
  deletedCollectionsTagNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `CollectionsTag`. */
  collection?: Maybe<Collection>;
  /** An edge for our `CollectionsTag`. May be used by Relay 1. */
  collectionsTagEdge?: Maybe<CollectionsTagsEdge>;
};


/** The output of our delete `CollectionsTag` mutation. */
export type DeleteCollectionsTagPayloadCollectionsTagEdgeArgs = {
  orderBy?: Maybe<Array<CollectionsTagsOrderBy>>;
};

/**
 * All input for the `deleteEpisodeByExternalId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodeByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
};

/**
 * All input for the `deleteEpisodeByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Episode` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteEpisode` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Episode` mutation. */
export type DeleteEpisodePayload = {
  __typename?: 'DeleteEpisodePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Episode` that was deleted by this mutation. */
  episode?: Maybe<Episode>;
  deletedEpisodeNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `Episode`. */
  season?: Maybe<Season>;
  /** An edge for our `Episode`. May be used by Relay 1. */
  episodeEdge?: Maybe<EpisodesEdge>;
};


/** The output of our delete `Episode` mutation. */
export type DeleteEpisodePayloadEpisodeEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesOrderBy>>;
};

/**
 * All input for the `deleteEpisodesCastByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesCastByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesCast` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteEpisodesCast` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  episodeId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `EpisodesCast` mutation. */
export type DeleteEpisodesCastPayload = {
  __typename?: 'DeleteEpisodesCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesCast` that was deleted by this mutation. */
  episodesCast?: Maybe<EpisodesCast>;
  deletedEpisodesCastNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesCast`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesCast`. May be used by Relay 1. */
  episodesCastEdge?: Maybe<EpisodesCastsEdge>;
};


/** The output of our delete `EpisodesCast` mutation. */
export type DeleteEpisodesCastPayloadEpisodesCastEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesCastsOrderBy>>;
};

/**
 * All input for the `deleteEpisodesImageByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesImageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesImage` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteEpisodesImage` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  episodeId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: EpisodeImageType;
};

/** The output of our delete `EpisodesImage` mutation. */
export type DeleteEpisodesImagePayload = {
  __typename?: 'DeleteEpisodesImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesImage` that was deleted by this mutation. */
  episodesImage?: Maybe<EpisodesImage>;
  deletedEpisodesImageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesImage`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesImage`. May be used by Relay 1. */
  episodesImageEdge?: Maybe<EpisodesImagesEdge>;
};


/** The output of our delete `EpisodesImage` mutation. */
export type DeleteEpisodesImagePayloadEpisodesImageEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesImagesOrderBy>>;
};

/**
 * All input for the `deleteEpisodesLicenseByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesLicenseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesLicense` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteEpisodesLicense` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `EpisodesLicense` mutation. */
export type DeleteEpisodesLicensePayload = {
  __typename?: 'DeleteEpisodesLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesLicense` that was deleted by this mutation. */
  episodesLicense?: Maybe<EpisodesLicense>;
  deletedEpisodesLicenseNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesLicense`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesLicense`. May be used by Relay 1. */
  episodesLicenseEdge?: Maybe<EpisodesLicensesEdge>;
};


/** The output of our delete `EpisodesLicense` mutation. */
export type DeleteEpisodesLicensePayloadEpisodesLicenseEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesLicensesOrderBy>>;
};

/**
 * All input for the `deleteEpisodesProductionCountryByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesProductionCountryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesProductionCountry` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteEpisodesProductionCountry` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  episodeId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `EpisodesProductionCountry` mutation. */
export type DeleteEpisodesProductionCountryPayload = {
  __typename?: 'DeleteEpisodesProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesProductionCountry` that was deleted by this mutation. */
  episodesProductionCountry?: Maybe<EpisodesProductionCountry>;
  deletedEpisodesProductionCountryNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesProductionCountry`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesProductionCountry`. May be used by Relay 1. */
  episodesProductionCountryEdge?: Maybe<EpisodesProductionCountriesEdge>;
};


/** The output of our delete `EpisodesProductionCountry` mutation. */
export type DeleteEpisodesProductionCountryPayloadEpisodesProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesProductionCountriesOrderBy>>;
};

/**
 * All input for the `deleteEpisodesTagByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesTag` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteEpisodesTag` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  episodeId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `EpisodesTag` mutation. */
export type DeleteEpisodesTagPayload = {
  __typename?: 'DeleteEpisodesTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTag` that was deleted by this mutation. */
  episodesTag?: Maybe<EpisodesTag>;
  deletedEpisodesTagNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesTag`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesTag`. May be used by Relay 1. */
  episodesTagEdge?: Maybe<EpisodesTagsEdge>;
};


/** The output of our delete `EpisodesTag` mutation. */
export type DeleteEpisodesTagPayloadEpisodesTagEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesTagsOrderBy>>;
};

/**
 * All input for the `deleteEpisodesTrailerByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesTrailerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesTrailer` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteEpisodesTrailer` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  episodeId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** The output of our delete `EpisodesTrailer` mutation. */
export type DeleteEpisodesTrailerPayload = {
  __typename?: 'DeleteEpisodesTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTrailer` that was deleted by this mutation. */
  episodesTrailer?: Maybe<EpisodesTrailer>;
  deletedEpisodesTrailerNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesTrailer`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesTrailer`. May be used by Relay 1. */
  episodesTrailerEdge?: Maybe<EpisodesTrailersEdge>;
};


/** The output of our delete `EpisodesTrailer` mutation. */
export type DeleteEpisodesTrailerPayloadEpisodesTrailerEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesTrailersOrderBy>>;
};

/**
 * All input for the `deleteEpisodesTvshowGenreByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesTvshowGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesTvshowGenre` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteEpisodesTvshowGenre` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteEpisodesTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  episodeId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};

/** The output of our delete `EpisodesTvshowGenre` mutation. */
export type DeleteEpisodesTvshowGenrePayload = {
  __typename?: 'DeleteEpisodesTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTvshowGenre` that was deleted by this mutation. */
  episodesTvshowGenre?: Maybe<EpisodesTvshowGenre>;
  deletedEpisodesTvshowGenreNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesTvshowGenre`. */
  episode?: Maybe<Episode>;
  /** Reads a single `TvshowGenre` that is related to this `EpisodesTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
  /** An edge for our `EpisodesTvshowGenre`. May be used by Relay 1. */
  episodesTvshowGenreEdge?: Maybe<EpisodesTvshowGenresEdge>;
};


/** The output of our delete `EpisodesTvshowGenre` mutation. */
export type DeleteEpisodesTvshowGenrePayloadEpisodesTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesTvshowGenresOrderBy>>;
};

/**
 * All input for the `deleteMovieByExternalId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMovieByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
};

/**
 * All input for the `deleteMovieByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMovieByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Movie` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteMovieGenreByNodeId` mutation.
 * @permissions: SETTINGS_EDITOR,ADMIN
 */
export type DeleteMovieGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MovieGenre` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteMovieGenre` mutation.
 * @permissions: SETTINGS_EDITOR,ADMIN
 */
export type DeleteMovieGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `MovieGenre` mutation. */
export type DeleteMovieGenrePayload = {
  __typename?: 'DeleteMovieGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MovieGenre` that was deleted by this mutation. */
  movieGenre?: Maybe<MovieGenre>;
  deletedMovieGenreNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `MovieGenre`. May be used by Relay 1. */
  movieGenreEdge?: Maybe<MovieGenresEdge>;
};


/** The output of our delete `MovieGenre` mutation. */
export type DeleteMovieGenrePayloadMovieGenreEdgeArgs = {
  orderBy?: Maybe<Array<MovieGenresOrderBy>>;
};

/**
 * All input for the `deleteMovie` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMovieInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Movie` mutation. */
export type DeleteMoviePayload = {
  __typename?: 'DeleteMoviePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Movie` that was deleted by this mutation. */
  movie?: Maybe<Movie>;
  deletedMovieNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Movie`. May be used by Relay 1. */
  movieEdge?: Maybe<MoviesEdge>;
};


/** The output of our delete `Movie` mutation. */
export type DeleteMoviePayloadMovieEdgeArgs = {
  orderBy?: Maybe<Array<MoviesOrderBy>>;
};

/**
 * All input for the `deleteMoviesCastByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesCastByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesCast` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteMoviesCast` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  movieId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `MoviesCast` mutation. */
export type DeleteMoviesCastPayload = {
  __typename?: 'DeleteMoviesCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesCast` that was deleted by this mutation. */
  moviesCast?: Maybe<MoviesCast>;
  deletedMoviesCastNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesCast`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesCast`. May be used by Relay 1. */
  moviesCastEdge?: Maybe<MoviesCastsEdge>;
};


/** The output of our delete `MoviesCast` mutation. */
export type DeleteMoviesCastPayloadMoviesCastEdgeArgs = {
  orderBy?: Maybe<Array<MoviesCastsOrderBy>>;
};

/**
 * All input for the `deleteMoviesImageByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesImageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesImage` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteMoviesImage` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  movieId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: MovieImageType;
};

/** The output of our delete `MoviesImage` mutation. */
export type DeleteMoviesImagePayload = {
  __typename?: 'DeleteMoviesImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesImage` that was deleted by this mutation. */
  moviesImage?: Maybe<MoviesImage>;
  deletedMoviesImageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesImage`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesImage`. May be used by Relay 1. */
  moviesImageEdge?: Maybe<MoviesImagesEdge>;
};


/** The output of our delete `MoviesImage` mutation. */
export type DeleteMoviesImagePayloadMoviesImageEdgeArgs = {
  orderBy?: Maybe<Array<MoviesImagesOrderBy>>;
};

/**
 * All input for the `deleteMoviesLicenseByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesLicenseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesLicense` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteMoviesLicense` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `MoviesLicense` mutation. */
export type DeleteMoviesLicensePayload = {
  __typename?: 'DeleteMoviesLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesLicense` that was deleted by this mutation. */
  moviesLicense?: Maybe<MoviesLicense>;
  deletedMoviesLicenseNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesLicense`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesLicense`. May be used by Relay 1. */
  moviesLicenseEdge?: Maybe<MoviesLicensesEdge>;
};


/** The output of our delete `MoviesLicense` mutation. */
export type DeleteMoviesLicensePayloadMoviesLicenseEdgeArgs = {
  orderBy?: Maybe<Array<MoviesLicensesOrderBy>>;
};

/**
 * All input for the `deleteMoviesMovieGenreByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesMovieGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesMovieGenre` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteMoviesMovieGenre` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesMovieGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  movieId: Scalars['Int'];
  movieGenresId: Scalars['Int'];
};

/** The output of our delete `MoviesMovieGenre` mutation. */
export type DeleteMoviesMovieGenrePayload = {
  __typename?: 'DeleteMoviesMovieGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesMovieGenre` that was deleted by this mutation. */
  moviesMovieGenre?: Maybe<MoviesMovieGenre>;
  deletedMoviesMovieGenreNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesMovieGenre`. */
  movie?: Maybe<Movie>;
  /** Reads a single `MovieGenre` that is related to this `MoviesMovieGenre`. */
  movieGenres?: Maybe<MovieGenre>;
  /** An edge for our `MoviesMovieGenre`. May be used by Relay 1. */
  moviesMovieGenreEdge?: Maybe<MoviesMovieGenresEdge>;
};


/** The output of our delete `MoviesMovieGenre` mutation. */
export type DeleteMoviesMovieGenrePayloadMoviesMovieGenreEdgeArgs = {
  orderBy?: Maybe<Array<MoviesMovieGenresOrderBy>>;
};

/**
 * All input for the `deleteMoviesProductionCountryByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesProductionCountryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesProductionCountry` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteMoviesProductionCountry` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  movieId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `MoviesProductionCountry` mutation. */
export type DeleteMoviesProductionCountryPayload = {
  __typename?: 'DeleteMoviesProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesProductionCountry` that was deleted by this mutation. */
  moviesProductionCountry?: Maybe<MoviesProductionCountry>;
  deletedMoviesProductionCountryNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesProductionCountry`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesProductionCountry`. May be used by Relay 1. */
  moviesProductionCountryEdge?: Maybe<MoviesProductionCountriesEdge>;
};


/** The output of our delete `MoviesProductionCountry` mutation. */
export type DeleteMoviesProductionCountryPayloadMoviesProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<MoviesProductionCountriesOrderBy>>;
};

/**
 * All input for the `deleteMoviesTagByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesTag` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteMoviesTag` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  movieId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `MoviesTag` mutation. */
export type DeleteMoviesTagPayload = {
  __typename?: 'DeleteMoviesTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesTag` that was deleted by this mutation. */
  moviesTag?: Maybe<MoviesTag>;
  deletedMoviesTagNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesTag`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesTag`. May be used by Relay 1. */
  moviesTagEdge?: Maybe<MoviesTagsEdge>;
};


/** The output of our delete `MoviesTag` mutation. */
export type DeleteMoviesTagPayloadMoviesTagEdgeArgs = {
  orderBy?: Maybe<Array<MoviesTagsOrderBy>>;
};

/**
 * All input for the `deleteMoviesTrailerByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesTrailerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesTrailer` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteMoviesTrailer` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type DeleteMoviesTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  movieId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** The output of our delete `MoviesTrailer` mutation. */
export type DeleteMoviesTrailerPayload = {
  __typename?: 'DeleteMoviesTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesTrailer` that was deleted by this mutation. */
  moviesTrailer?: Maybe<MoviesTrailer>;
  deletedMoviesTrailerNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesTrailer`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesTrailer`. May be used by Relay 1. */
  moviesTrailerEdge?: Maybe<MoviesTrailersEdge>;
};


/** The output of our delete `MoviesTrailer` mutation. */
export type DeleteMoviesTrailerPayloadMoviesTrailerEdgeArgs = {
  orderBy?: Maybe<Array<MoviesTrailersOrderBy>>;
};

/**
 * All input for the `deleteSeasonByExternalId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
};

/**
 * All input for the `deleteSeasonByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Season` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteSeason` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Season` mutation. */
export type DeleteSeasonPayload = {
  __typename?: 'DeleteSeasonPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Season` that was deleted by this mutation. */
  season?: Maybe<Season>;
  deletedSeasonNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `Season`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `Season`. May be used by Relay 1. */
  seasonEdge?: Maybe<SeasonsEdge>;
};


/** The output of our delete `Season` mutation. */
export type DeleteSeasonPayloadSeasonEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsOrderBy>>;
};

/**
 * All input for the `deleteSeasonsCastByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsCastByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsCast` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteSeasonsCast` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  seasonId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `SeasonsCast` mutation. */
export type DeleteSeasonsCastPayload = {
  __typename?: 'DeleteSeasonsCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsCast` that was deleted by this mutation. */
  seasonsCast?: Maybe<SeasonsCast>;
  deletedSeasonsCastNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsCast`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsCast`. May be used by Relay 1. */
  seasonsCastEdge?: Maybe<SeasonsCastsEdge>;
};


/** The output of our delete `SeasonsCast` mutation. */
export type DeleteSeasonsCastPayloadSeasonsCastEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsCastsOrderBy>>;
};

/**
 * All input for the `deleteSeasonsImageByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsImageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsImage` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteSeasonsImage` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  seasonId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: SeasonImageType;
};

/** The output of our delete `SeasonsImage` mutation. */
export type DeleteSeasonsImagePayload = {
  __typename?: 'DeleteSeasonsImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsImage` that was deleted by this mutation. */
  seasonsImage?: Maybe<SeasonsImage>;
  deletedSeasonsImageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsImage`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsImage`. May be used by Relay 1. */
  seasonsImageEdge?: Maybe<SeasonsImagesEdge>;
};


/** The output of our delete `SeasonsImage` mutation. */
export type DeleteSeasonsImagePayloadSeasonsImageEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsImagesOrderBy>>;
};

/**
 * All input for the `deleteSeasonsLicenseByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsLicenseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsLicense` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteSeasonsLicense` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `SeasonsLicense` mutation. */
export type DeleteSeasonsLicensePayload = {
  __typename?: 'DeleteSeasonsLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsLicense` that was deleted by this mutation. */
  seasonsLicense?: Maybe<SeasonsLicense>;
  deletedSeasonsLicenseNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsLicense`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsLicense`. May be used by Relay 1. */
  seasonsLicenseEdge?: Maybe<SeasonsLicensesEdge>;
};


/** The output of our delete `SeasonsLicense` mutation. */
export type DeleteSeasonsLicensePayloadSeasonsLicenseEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsLicensesOrderBy>>;
};

/**
 * All input for the `deleteSeasonsProductionCountryByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsProductionCountryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsProductionCountry` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteSeasonsProductionCountry` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  seasonId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `SeasonsProductionCountry` mutation. */
export type DeleteSeasonsProductionCountryPayload = {
  __typename?: 'DeleteSeasonsProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsProductionCountry` that was deleted by this mutation. */
  seasonsProductionCountry?: Maybe<SeasonsProductionCountry>;
  deletedSeasonsProductionCountryNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsProductionCountry`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsProductionCountry`. May be used by Relay 1. */
  seasonsProductionCountryEdge?: Maybe<SeasonsProductionCountriesEdge>;
};


/** The output of our delete `SeasonsProductionCountry` mutation. */
export type DeleteSeasonsProductionCountryPayloadSeasonsProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsProductionCountriesOrderBy>>;
};

/**
 * All input for the `deleteSeasonsTagByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsTag` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteSeasonsTag` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  seasonId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `SeasonsTag` mutation. */
export type DeleteSeasonsTagPayload = {
  __typename?: 'DeleteSeasonsTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTag` that was deleted by this mutation. */
  seasonsTag?: Maybe<SeasonsTag>;
  deletedSeasonsTagNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsTag`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsTag`. May be used by Relay 1. */
  seasonsTagEdge?: Maybe<SeasonsTagsEdge>;
};


/** The output of our delete `SeasonsTag` mutation. */
export type DeleteSeasonsTagPayloadSeasonsTagEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsTagsOrderBy>>;
};

/**
 * All input for the `deleteSeasonsTrailerByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsTrailerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsTrailer` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteSeasonsTrailer` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  seasonId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** The output of our delete `SeasonsTrailer` mutation. */
export type DeleteSeasonsTrailerPayload = {
  __typename?: 'DeleteSeasonsTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTrailer` that was deleted by this mutation. */
  seasonsTrailer?: Maybe<SeasonsTrailer>;
  deletedSeasonsTrailerNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsTrailer`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsTrailer`. May be used by Relay 1. */
  seasonsTrailerEdge?: Maybe<SeasonsTrailersEdge>;
};


/** The output of our delete `SeasonsTrailer` mutation. */
export type DeleteSeasonsTrailerPayloadSeasonsTrailerEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsTrailersOrderBy>>;
};

/**
 * All input for the `deleteSeasonsTvshowGenreByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsTvshowGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsTvshowGenre` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteSeasonsTvshowGenre` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteSeasonsTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  seasonId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};

/** The output of our delete `SeasonsTvshowGenre` mutation. */
export type DeleteSeasonsTvshowGenrePayload = {
  __typename?: 'DeleteSeasonsTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTvshowGenre` that was deleted by this mutation. */
  seasonsTvshowGenre?: Maybe<SeasonsTvshowGenre>;
  deletedSeasonsTvshowGenreNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsTvshowGenre`. */
  season?: Maybe<Season>;
  /** Reads a single `TvshowGenre` that is related to this `SeasonsTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
  /** An edge for our `SeasonsTvshowGenre`. May be used by Relay 1. */
  seasonsTvshowGenreEdge?: Maybe<SeasonsTvshowGenresEdge>;
};


/** The output of our delete `SeasonsTvshowGenre` mutation. */
export type DeleteSeasonsTvshowGenrePayloadSeasonsTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsTvshowGenresOrderBy>>;
};

/**
 * All input for the `deleteTvshowByExternalId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
};

/**
 * All input for the `deleteTvshowByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Tvshow` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTvshowGenreByNodeId` mutation.
 * @permissions: SETTINGS_EDITOR,ADMIN
 */
export type DeleteTvshowGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowGenre` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTvshowGenre` mutation.
 * @permissions: SETTINGS_EDITOR,ADMIN
 */
export type DeleteTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `TvshowGenre` mutation. */
export type DeleteTvshowGenrePayload = {
  __typename?: 'DeleteTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowGenre` that was deleted by this mutation. */
  tvshowGenre?: Maybe<TvshowGenre>;
  deletedTvshowGenreNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `TvshowGenre`. May be used by Relay 1. */
  tvshowGenreEdge?: Maybe<TvshowGenresEdge>;
};


/** The output of our delete `TvshowGenre` mutation. */
export type DeleteTvshowGenrePayloadTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<TvshowGenresOrderBy>>;
};

/**
 * All input for the `deleteTvshow` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Tvshow` mutation. */
export type DeleteTvshowPayload = {
  __typename?: 'DeleteTvshowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tvshow` that was deleted by this mutation. */
  tvshow?: Maybe<Tvshow>;
  deletedTvshowNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Tvshow`. May be used by Relay 1. */
  tvshowEdge?: Maybe<TvshowsEdge>;
};


/** The output of our delete `Tvshow` mutation. */
export type DeleteTvshowPayloadTvshowEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsOrderBy>>;
};

/**
 * All input for the `deleteTvshowsCastByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsCastByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsCast` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTvshowsCast` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  tvshowId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `TvshowsCast` mutation. */
export type DeleteTvshowsCastPayload = {
  __typename?: 'DeleteTvshowsCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsCast` that was deleted by this mutation. */
  tvshowsCast?: Maybe<TvshowsCast>;
  deletedTvshowsCastNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsCast`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsCast`. May be used by Relay 1. */
  tvshowsCastEdge?: Maybe<TvshowsCastsEdge>;
};


/** The output of our delete `TvshowsCast` mutation. */
export type DeleteTvshowsCastPayloadTvshowsCastEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsCastsOrderBy>>;
};

/**
 * All input for the `deleteTvshowsImageByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsImageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsImage` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTvshowsImage` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  tvshowId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: TvshowImageType;
};

/** The output of our delete `TvshowsImage` mutation. */
export type DeleteTvshowsImagePayload = {
  __typename?: 'DeleteTvshowsImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsImage` that was deleted by this mutation. */
  tvshowsImage?: Maybe<TvshowsImage>;
  deletedTvshowsImageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsImage`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsImage`. May be used by Relay 1. */
  tvshowsImageEdge?: Maybe<TvshowsImagesEdge>;
};


/** The output of our delete `TvshowsImage` mutation. */
export type DeleteTvshowsImagePayloadTvshowsImageEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsImagesOrderBy>>;
};

/**
 * All input for the `deleteTvshowsLicenseByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsLicenseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsLicense` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTvshowsLicense` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `TvshowsLicense` mutation. */
export type DeleteTvshowsLicensePayload = {
  __typename?: 'DeleteTvshowsLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsLicense` that was deleted by this mutation. */
  tvshowsLicense?: Maybe<TvshowsLicense>;
  deletedTvshowsLicenseNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsLicense`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsLicense`. May be used by Relay 1. */
  tvshowsLicenseEdge?: Maybe<TvshowsLicensesEdge>;
};


/** The output of our delete `TvshowsLicense` mutation. */
export type DeleteTvshowsLicensePayloadTvshowsLicenseEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsLicensesOrderBy>>;
};

/**
 * All input for the `deleteTvshowsProductionCountryByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsProductionCountryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsProductionCountry` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTvshowsProductionCountry` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  tvshowId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `TvshowsProductionCountry` mutation. */
export type DeleteTvshowsProductionCountryPayload = {
  __typename?: 'DeleteTvshowsProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsProductionCountry` that was deleted by this mutation. */
  tvshowsProductionCountry?: Maybe<TvshowsProductionCountry>;
  deletedTvshowsProductionCountryNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsProductionCountry`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsProductionCountry`. May be used by Relay 1. */
  tvshowsProductionCountryEdge?: Maybe<TvshowsProductionCountriesEdge>;
};


/** The output of our delete `TvshowsProductionCountry` mutation. */
export type DeleteTvshowsProductionCountryPayloadTvshowsProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsProductionCountriesOrderBy>>;
};

/**
 * All input for the `deleteTvshowsTagByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsTag` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTvshowsTag` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  tvshowId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our delete `TvshowsTag` mutation. */
export type DeleteTvshowsTagPayload = {
  __typename?: 'DeleteTvshowsTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTag` that was deleted by this mutation. */
  tvshowsTag?: Maybe<TvshowsTag>;
  deletedTvshowsTagNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsTag`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsTag`. May be used by Relay 1. */
  tvshowsTagEdge?: Maybe<TvshowsTagsEdge>;
};


/** The output of our delete `TvshowsTag` mutation. */
export type DeleteTvshowsTagPayloadTvshowsTagEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsTagsOrderBy>>;
};

/**
 * All input for the `deleteTvshowsTrailerByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsTrailerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsTrailer` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTvshowsTrailer` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  tvshowId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** The output of our delete `TvshowsTrailer` mutation. */
export type DeleteTvshowsTrailerPayload = {
  __typename?: 'DeleteTvshowsTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTrailer` that was deleted by this mutation. */
  tvshowsTrailer?: Maybe<TvshowsTrailer>;
  deletedTvshowsTrailerNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsTrailer`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsTrailer`. May be used by Relay 1. */
  tvshowsTrailerEdge?: Maybe<TvshowsTrailersEdge>;
};


/** The output of our delete `TvshowsTrailer` mutation. */
export type DeleteTvshowsTrailerPayloadTvshowsTrailerEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsTrailersOrderBy>>;
};

/**
 * All input for the `deleteTvshowsTvshowGenreByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsTvshowGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsTvshowGenre` to be deleted. */
  nodeId: Scalars['ID'];
};

/**
 * All input for the `deleteTvshowsTvshowGenre` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type DeleteTvshowsTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  tvshowId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};

/** The output of our delete `TvshowsTvshowGenre` mutation. */
export type DeleteTvshowsTvshowGenrePayload = {
  __typename?: 'DeleteTvshowsTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTvshowGenre` that was deleted by this mutation. */
  tvshowsTvshowGenre?: Maybe<TvshowsTvshowGenre>;
  deletedTvshowsTvshowGenreNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsTvshowGenre`. */
  tvshow?: Maybe<Tvshow>;
  /** Reads a single `TvshowGenre` that is related to this `TvshowsTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
  /** An edge for our `TvshowsTvshowGenre`. May be used by Relay 1. */
  tvshowsTvshowGenreEdge?: Maybe<TvshowsTvshowGenresEdge>;
};


/** The output of our delete `TvshowsTvshowGenre` mutation. */
export type DeleteTvshowsTvshowGenrePayloadTvshowsTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsTvshowGenresOrderBy>>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type Episode = Node & {
  __typename?: 'Episode';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  seasonId?: Maybe<Scalars['Int']>;
  index: Scalars['Int'];
  title: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  originalTitle?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
  mainVideoId?: Maybe<Scalars['Int']>;
  publishStatus?: Maybe<PublishStatus>;
  publishedDate?: Maybe<Scalars['Datetime']>;
  publishedUser?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads a single `Season` that is related to this `Episode`. */
  season?: Maybe<Season>;
  /** Reads and enables pagination through a set of `EpisodesTag`. */
  episodesTags: EpisodesTagsConnection;
  /** Reads and enables pagination through a set of `EpisodesCast`. */
  episodesCasts: EpisodesCastsConnection;
  /** Reads and enables pagination through a set of `EpisodesLicense`. */
  episodesLicenses: EpisodesLicensesConnection;
  /** Reads and enables pagination through a set of `EpisodesProductionCountry`. */
  episodesProductionCountries: EpisodesProductionCountriesConnection;
  /** Reads and enables pagination through a set of `EpisodesTvshowGenre`. */
  episodesTvshowGenres: EpisodesTvshowGenresConnection;
  /** Reads and enables pagination through a set of `EpisodesImage`. */
  episodesImages: EpisodesImagesConnection;
  /** Reads and enables pagination through a set of `EpisodesTrailer`. */
  episodesTrailers: EpisodesTrailersConnection;
  /** Reads and enables pagination through a set of `CollectionRelation`. */
  collectionRelations: CollectionRelationsConnection;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodeEpisodesTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesTagsOrderBy>>;
  condition?: Maybe<EpisodesTagCondition>;
  filter?: Maybe<EpisodesTagFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodeEpisodesCastsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesCastsOrderBy>>;
  condition?: Maybe<EpisodesCastCondition>;
  filter?: Maybe<EpisodesCastFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodeEpisodesLicensesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesLicensesOrderBy>>;
  condition?: Maybe<EpisodesLicenseCondition>;
  filter?: Maybe<EpisodesLicenseFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodeEpisodesProductionCountriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesProductionCountriesOrderBy>>;
  condition?: Maybe<EpisodesProductionCountryCondition>;
  filter?: Maybe<EpisodesProductionCountryFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodeEpisodesTvshowGenresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesTvshowGenresOrderBy>>;
  condition?: Maybe<EpisodesTvshowGenreCondition>;
  filter?: Maybe<EpisodesTvshowGenreFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodeEpisodesImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesImagesOrderBy>>;
  condition?: Maybe<EpisodesImageCondition>;
  filter?: Maybe<EpisodesImageFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodeEpisodesTrailersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesTrailersOrderBy>>;
  condition?: Maybe<EpisodesTrailerCondition>;
  filter?: Maybe<EpisodesTrailerFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodeCollectionRelationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionRelationsOrderBy>>;
  condition?: Maybe<CollectionRelationCondition>;
  filter?: Maybe<CollectionRelationFilter>;
};

/** A condition to be used against `Episode` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EpisodeCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `seasonId` field. */
  seasonId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `index` field. */
  index?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `title` field.
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `externalId` field. */
  externalId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `originalTitle` field. */
  originalTitle?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `synopsis` field. */
  synopsis?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `studio` field. */
  studio?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `released` field. */
  released?: Maybe<Scalars['Date']>;
  /** Checks for equality with the object’s `mainVideoId` field. */
  mainVideoId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `publishStatus` field. */
  publishStatus?: Maybe<PublishStatus>;
  /** Checks for equality with the object’s `publishedDate` field. */
  publishedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `publishedUser` field. */
  publishedUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Episode` object types. All fields are combined with a logical ‘and.’ */
export type EpisodeFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `seasonId` field. */
  seasonId?: Maybe<IntFilter>;
  /** Filter by the object’s `index` field. */
  index?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<StringFilter>;
  /** Filter by the object’s `externalId` field. */
  externalId?: Maybe<StringFilter>;
  /** Filter by the object’s `originalTitle` field. */
  originalTitle?: Maybe<StringFilter>;
  /** Filter by the object’s `synopsis` field. */
  synopsis?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `studio` field. */
  studio?: Maybe<StringFilter>;
  /** Filter by the object’s `released` field. */
  released?: Maybe<DateFilter>;
  /** Filter by the object’s `mainVideoId` field. */
  mainVideoId?: Maybe<IntFilter>;
  /** Filter by the object’s `publishStatus` field. */
  publishStatus?: Maybe<PublishStatusFilter>;
  /** Filter by the object’s `publishedDate` field. */
  publishedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `publishedUser` field. */
  publishedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `episodesTags` relation. */
  episodesTags?: Maybe<EpisodeToManyEpisodesTagFilter>;
  /** Some related `episodesTags` exist. */
  episodesTagsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `episodesCasts` relation. */
  episodesCasts?: Maybe<EpisodeToManyEpisodesCastFilter>;
  /** Some related `episodesCasts` exist. */
  episodesCastsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `episodesLicenses` relation. */
  episodesLicenses?: Maybe<EpisodeToManyEpisodesLicenseFilter>;
  /** Some related `episodesLicenses` exist. */
  episodesLicensesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `episodesProductionCountries` relation. */
  episodesProductionCountries?: Maybe<EpisodeToManyEpisodesProductionCountryFilter>;
  /** Some related `episodesProductionCountries` exist. */
  episodesProductionCountriesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `episodesTvshowGenres` relation. */
  episodesTvshowGenres?: Maybe<EpisodeToManyEpisodesTvshowGenreFilter>;
  /** Some related `episodesTvshowGenres` exist. */
  episodesTvshowGenresExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `episodesImages` relation. */
  episodesImages?: Maybe<EpisodeToManyEpisodesImageFilter>;
  /** Some related `episodesImages` exist. */
  episodesImagesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `episodesTrailers` relation. */
  episodesTrailers?: Maybe<EpisodeToManyEpisodesTrailerFilter>;
  /** Some related `episodesTrailers` exist. */
  episodesTrailersExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `collectionRelations` relation. */
  collectionRelations?: Maybe<EpisodeToManyCollectionRelationFilter>;
  /** Some related `collectionRelations` exist. */
  collectionRelationsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `season` relation. */
  season?: Maybe<SeasonFilter>;
  /** A related `season` exists. */
  seasonExists?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EpisodeFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EpisodeFilter>>;
  /** Negates the expression. */
  not?: Maybe<EpisodeFilter>;
};

export enum EpisodeImageType {
  Cover = 'COVER',
  Teaser = 'TEASER'
}

/** A filter to be used against EpisodeImageType fields. All fields are combined with a logical ‘and.’ */
export type EpisodeImageTypeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<EpisodeImageType>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<EpisodeImageType>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<EpisodeImageType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<EpisodeImageType>;
  /** Included in the specified list. */
  in?: Maybe<Array<EpisodeImageType>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<EpisodeImageType>>;
  /** Less than the specified value. */
  lessThan?: Maybe<EpisodeImageType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<EpisodeImageType>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<EpisodeImageType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<EpisodeImageType>;
};

/** An input for mutations affecting `Episode` */
export type EpisodeInput = {
  seasonId?: Maybe<Scalars['Int']>;
  index: Scalars['Int'];
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  originalTitle?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
  mainVideoId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `Episode`. Fields that are set will be updated. */
export type EpisodePatch = {
  seasonId?: Maybe<Scalars['Int']>;
  index?: Maybe<Scalars['Int']>;
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  originalTitle?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
  mainVideoId?: Maybe<Scalars['Int']>;
  publishStatus?: Maybe<PublishStatus>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodesCast = Node & {
  __typename?: 'EpisodesCast';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  episodeId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Episode` that is related to this `EpisodesCast`. */
  episode?: Maybe<Episode>;
};

/**
 * A condition to be used against `EpisodesCast` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EpisodesCastCondition = {
  /** Checks for equality with the object’s `episodeId` field. */
  episodeId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `EpisodesCast` object types. All fields are combined with a logical ‘and.’ */
export type EpisodesCastFilter = {
  /** Filter by the object’s `episodeId` field. */
  episodeId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `episode` relation. */
  episode?: Maybe<EpisodeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EpisodesCastFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EpisodesCastFilter>>;
  /** Negates the expression. */
  not?: Maybe<EpisodesCastFilter>;
};

/** An input for mutations affecting `EpisodesCast` */
export type EpisodesCastInput = {
  episodeId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `EpisodesCast`. Fields that are set will be updated. */
export type EpisodesCastPatch = {
  episodeId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `EpisodesCast` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type EpisodesCastsConnection = {
  __typename?: 'EpisodesCastsConnection';
  /** A list of `EpisodesCast` objects. */
  nodes: Array<Maybe<EpisodesCast>>;
  /** A list of edges which contains the `EpisodesCast` and cursor to aid in pagination. */
  edges: Array<EpisodesCastsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EpisodesCast` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EpisodesCast` edge in the connection. */
export type EpisodesCastsEdge = {
  __typename?: 'EpisodesCastsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EpisodesCast` at the end of the edge. */
  node?: Maybe<EpisodesCast>;
};

/** Methods to use when ordering `EpisodesCast`. */
export enum EpisodesCastsOrderBy {
  Natural = 'NATURAL',
  EpisodeIdAsc = 'EPISODE_ID_ASC',
  EpisodeIdDesc = 'EPISODE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A connection to a list of `Episode` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type EpisodesConnection = {
  __typename?: 'EpisodesConnection';
  /** A list of `Episode` objects. */
  nodes: Array<Maybe<Episode>>;
  /** A list of edges which contains the `Episode` and cursor to aid in pagination. */
  edges: Array<EpisodesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Episode` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Episode` edge in the connection. */
export type EpisodesEdge = {
  __typename?: 'EpisodesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Episode` at the end of the edge. */
  node?: Maybe<Episode>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodesImage = Node & {
  __typename?: 'EpisodesImage';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  episodeId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: EpisodeImageType;
  /** Reads a single `Episode` that is related to this `EpisodesImage`. */
  episode?: Maybe<Episode>;
};

/**
 * A condition to be used against `EpisodesImage` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EpisodesImageCondition = {
  /** Checks for equality with the object’s `episodeId` field. */
  episodeId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageId` field. */
  imageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageType` field. */
  imageType?: Maybe<EpisodeImageType>;
};

/** A filter to be used against `EpisodesImage` object types. All fields are combined with a logical ‘and.’ */
export type EpisodesImageFilter = {
  /** Filter by the object’s `episodeId` field. */
  episodeId?: Maybe<IntFilter>;
  /** Filter by the object’s `imageId` field. */
  imageId?: Maybe<IntFilter>;
  /** Filter by the object’s `imageType` field. */
  imageType?: Maybe<EpisodeImageTypeFilter>;
  /** Filter by the object’s `episode` relation. */
  episode?: Maybe<EpisodeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EpisodesImageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EpisodesImageFilter>>;
  /** Negates the expression. */
  not?: Maybe<EpisodesImageFilter>;
};

/** An input for mutations affecting `EpisodesImage` */
export type EpisodesImageInput = {
  episodeId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: EpisodeImageType;
};

/** Represents an update to a `EpisodesImage`. Fields that are set will be updated. */
export type EpisodesImagePatch = {
  episodeId?: Maybe<Scalars['Int']>;
  imageId?: Maybe<Scalars['Int']>;
  imageType?: Maybe<EpisodeImageType>;
};

/**
 * A connection to a list of `EpisodesImage` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type EpisodesImagesConnection = {
  __typename?: 'EpisodesImagesConnection';
  /** A list of `EpisodesImage` objects. */
  nodes: Array<Maybe<EpisodesImage>>;
  /** A list of edges which contains the `EpisodesImage` and cursor to aid in pagination. */
  edges: Array<EpisodesImagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EpisodesImage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EpisodesImage` edge in the connection. */
export type EpisodesImagesEdge = {
  __typename?: 'EpisodesImagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EpisodesImage` at the end of the edge. */
  node?: Maybe<EpisodesImage>;
};

/** Methods to use when ordering `EpisodesImage`. */
export enum EpisodesImagesOrderBy {
  Natural = 'NATURAL',
  EpisodeIdAsc = 'EPISODE_ID_ASC',
  EpisodeIdDesc = 'EPISODE_ID_DESC',
  ImageIdAsc = 'IMAGE_ID_ASC',
  ImageIdDesc = 'IMAGE_ID_DESC',
  ImageTypeAsc = 'IMAGE_TYPE_ASC',
  ImageTypeDesc = 'IMAGE_TYPE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodesLicense = Node & {
  __typename?: 'EpisodesLicense';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  episodeId: Scalars['Int'];
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads a single `Episode` that is related to this `EpisodesLicense`. */
  episode?: Maybe<Episode>;
};

/**
 * A condition to be used against `EpisodesLicense` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EpisodesLicenseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `episodeId` field. */
  episodeId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `licenseStart` field. */
  licenseStart?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `licenseEnd` field. */
  licenseEnd?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `countries` field. */
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `EpisodesLicense` object types. All fields are combined with a logical ‘and.’ */
export type EpisodesLicenseFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `episodeId` field. */
  episodeId?: Maybe<IntFilter>;
  /** Filter by the object’s `licenseStart` field. */
  licenseStart?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `licenseEnd` field. */
  licenseEnd?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `countries` field. */
  countries?: Maybe<IsoAlphaThreeCountryCodesListFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `episode` relation. */
  episode?: Maybe<EpisodeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EpisodesLicenseFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EpisodesLicenseFilter>>;
  /** Negates the expression. */
  not?: Maybe<EpisodesLicenseFilter>;
};

/** An input for mutations affecting `EpisodesLicense` */
export type EpisodesLicenseInput = {
  episodeId: Scalars['Int'];
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
};

/** Represents an update to a `EpisodesLicense`. Fields that are set will be updated. */
export type EpisodesLicensePatch = {
  episodeId?: Maybe<Scalars['Int']>;
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
};

/**
 * A connection to a list of `EpisodesLicense` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type EpisodesLicensesConnection = {
  __typename?: 'EpisodesLicensesConnection';
  /** A list of `EpisodesLicense` objects. */
  nodes: Array<Maybe<EpisodesLicense>>;
  /** A list of edges which contains the `EpisodesLicense` and cursor to aid in pagination. */
  edges: Array<EpisodesLicensesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EpisodesLicense` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EpisodesLicense` edge in the connection. */
export type EpisodesLicensesEdge = {
  __typename?: 'EpisodesLicensesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EpisodesLicense` at the end of the edge. */
  node?: Maybe<EpisodesLicense>;
};

/** Methods to use when ordering `EpisodesLicense`. */
export enum EpisodesLicensesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  EpisodeIdAsc = 'EPISODE_ID_ASC',
  EpisodeIdDesc = 'EPISODE_ID_DESC',
  LicenseStartAsc = 'LICENSE_START_ASC',
  LicenseStartDesc = 'LICENSE_START_DESC',
  LicenseEndAsc = 'LICENSE_END_ASC',
  LicenseEndDesc = 'LICENSE_END_DESC',
  CountriesAsc = 'COUNTRIES_ASC',
  CountriesDesc = 'COUNTRIES_DESC',
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

/** Methods to use when ordering `Episode`. */
export enum EpisodesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  SeasonIdAsc = 'SEASON_ID_ASC',
  SeasonIdDesc = 'SEASON_ID_DESC',
  IndexAsc = 'INDEX_ASC',
  IndexDesc = 'INDEX_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  ExternalIdAsc = 'EXTERNAL_ID_ASC',
  ExternalIdDesc = 'EXTERNAL_ID_DESC',
  OriginalTitleAsc = 'ORIGINAL_TITLE_ASC',
  OriginalTitleDesc = 'ORIGINAL_TITLE_DESC',
  SynopsisAsc = 'SYNOPSIS_ASC',
  SynopsisDesc = 'SYNOPSIS_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  StudioAsc = 'STUDIO_ASC',
  StudioDesc = 'STUDIO_DESC',
  ReleasedAsc = 'RELEASED_ASC',
  ReleasedDesc = 'RELEASED_DESC',
  MainVideoIdAsc = 'MAIN_VIDEO_ID_ASC',
  MainVideoIdDesc = 'MAIN_VIDEO_ID_DESC',
  PublishStatusAsc = 'PUBLISH_STATUS_ASC',
  PublishStatusDesc = 'PUBLISH_STATUS_DESC',
  PublishedDateAsc = 'PUBLISHED_DATE_ASC',
  PublishedDateDesc = 'PUBLISHED_DATE_DESC',
  PublishedUserAsc = 'PUBLISHED_USER_ASC',
  PublishedUserDesc = 'PUBLISHED_USER_DESC',
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
 * A connection to a list of `EpisodesProductionCountry` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type EpisodesProductionCountriesConnection = {
  __typename?: 'EpisodesProductionCountriesConnection';
  /** A list of `EpisodesProductionCountry` objects. */
  nodes: Array<Maybe<EpisodesProductionCountry>>;
  /** A list of edges which contains the `EpisodesProductionCountry` and cursor to aid in pagination. */
  edges: Array<EpisodesProductionCountriesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EpisodesProductionCountry` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EpisodesProductionCountry` edge in the connection. */
export type EpisodesProductionCountriesEdge = {
  __typename?: 'EpisodesProductionCountriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EpisodesProductionCountry` at the end of the edge. */
  node?: Maybe<EpisodesProductionCountry>;
};

/** Methods to use when ordering `EpisodesProductionCountry`. */
export enum EpisodesProductionCountriesOrderBy {
  Natural = 'NATURAL',
  EpisodeIdAsc = 'EPISODE_ID_ASC',
  EpisodeIdDesc = 'EPISODE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodesProductionCountry = Node & {
  __typename?: 'EpisodesProductionCountry';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  episodeId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Episode` that is related to this `EpisodesProductionCountry`. */
  episode?: Maybe<Episode>;
};

/**
 * A condition to be used against `EpisodesProductionCountry` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type EpisodesProductionCountryCondition = {
  /** Checks for equality with the object’s `episodeId` field. */
  episodeId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `EpisodesProductionCountry` object types. All fields are combined with a logical ‘and.’ */
export type EpisodesProductionCountryFilter = {
  /** Filter by the object’s `episodeId` field. */
  episodeId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `episode` relation. */
  episode?: Maybe<EpisodeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EpisodesProductionCountryFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EpisodesProductionCountryFilter>>;
  /** Negates the expression. */
  not?: Maybe<EpisodesProductionCountryFilter>;
};

/** An input for mutations affecting `EpisodesProductionCountry` */
export type EpisodesProductionCountryInput = {
  episodeId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `EpisodesProductionCountry`. Fields that are set will be updated. */
export type EpisodesProductionCountryPatch = {
  episodeId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodesTag = Node & {
  __typename?: 'EpisodesTag';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  episodeId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Episode` that is related to this `EpisodesTag`. */
  episode?: Maybe<Episode>;
};

/**
 * A condition to be used against `EpisodesTag` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EpisodesTagCondition = {
  /** Checks for equality with the object’s `episodeId` field. */
  episodeId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `EpisodesTag` object types. All fields are combined with a logical ‘and.’ */
export type EpisodesTagFilter = {
  /** Filter by the object’s `episodeId` field. */
  episodeId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `episode` relation. */
  episode?: Maybe<EpisodeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EpisodesTagFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EpisodesTagFilter>>;
  /** Negates the expression. */
  not?: Maybe<EpisodesTagFilter>;
};

/** An input for mutations affecting `EpisodesTag` */
export type EpisodesTagInput = {
  episodeId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `EpisodesTag`. Fields that are set will be updated. */
export type EpisodesTagPatch = {
  episodeId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `EpisodesTag` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type EpisodesTagsConnection = {
  __typename?: 'EpisodesTagsConnection';
  /** A list of `EpisodesTag` objects. */
  nodes: Array<Maybe<EpisodesTag>>;
  /** A list of edges which contains the `EpisodesTag` and cursor to aid in pagination. */
  edges: Array<EpisodesTagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EpisodesTag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EpisodesTag` edge in the connection. */
export type EpisodesTagsEdge = {
  __typename?: 'EpisodesTagsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EpisodesTag` at the end of the edge. */
  node?: Maybe<EpisodesTag>;
};

/** Methods to use when ordering `EpisodesTag`. */
export enum EpisodesTagsOrderBy {
  Natural = 'NATURAL',
  EpisodeIdAsc = 'EPISODE_ID_ASC',
  EpisodeIdDesc = 'EPISODE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodesTrailer = Node & {
  __typename?: 'EpisodesTrailer';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  episodeId: Scalars['Int'];
  videoId: Scalars['Int'];
  /** Reads a single `Episode` that is related to this `EpisodesTrailer`. */
  episode?: Maybe<Episode>;
};

/**
 * A condition to be used against `EpisodesTrailer` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EpisodesTrailerCondition = {
  /** Checks for equality with the object’s `episodeId` field. */
  episodeId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `videoId` field. */
  videoId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `EpisodesTrailer` object types. All fields are combined with a logical ‘and.’ */
export type EpisodesTrailerFilter = {
  /** Filter by the object’s `episodeId` field. */
  episodeId?: Maybe<IntFilter>;
  /** Filter by the object’s `videoId` field. */
  videoId?: Maybe<IntFilter>;
  /** Filter by the object’s `episode` relation. */
  episode?: Maybe<EpisodeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EpisodesTrailerFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EpisodesTrailerFilter>>;
  /** Negates the expression. */
  not?: Maybe<EpisodesTrailerFilter>;
};

/** An input for mutations affecting `EpisodesTrailer` */
export type EpisodesTrailerInput = {
  episodeId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** Represents an update to a `EpisodesTrailer`. Fields that are set will be updated. */
export type EpisodesTrailerPatch = {
  episodeId?: Maybe<Scalars['Int']>;
  videoId?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `EpisodesTrailer` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type EpisodesTrailersConnection = {
  __typename?: 'EpisodesTrailersConnection';
  /** A list of `EpisodesTrailer` objects. */
  nodes: Array<Maybe<EpisodesTrailer>>;
  /** A list of edges which contains the `EpisodesTrailer` and cursor to aid in pagination. */
  edges: Array<EpisodesTrailersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EpisodesTrailer` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EpisodesTrailer` edge in the connection. */
export type EpisodesTrailersEdge = {
  __typename?: 'EpisodesTrailersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EpisodesTrailer` at the end of the edge. */
  node?: Maybe<EpisodesTrailer>;
};

/** Methods to use when ordering `EpisodesTrailer`. */
export enum EpisodesTrailersOrderBy {
  Natural = 'NATURAL',
  EpisodeIdAsc = 'EPISODE_ID_ASC',
  EpisodeIdDesc = 'EPISODE_ID_DESC',
  VideoIdAsc = 'VIDEO_ID_ASC',
  VideoIdDesc = 'VIDEO_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type EpisodesTvshowGenre = Node & {
  __typename?: 'EpisodesTvshowGenre';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  episodeId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
  /** Reads a single `Episode` that is related to this `EpisodesTvshowGenre`. */
  episode?: Maybe<Episode>;
  /** Reads a single `TvshowGenre` that is related to this `EpisodesTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
};

/**
 * A condition to be used against `EpisodesTvshowGenre` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type EpisodesTvshowGenreCondition = {
  /** Checks for equality with the object’s `episodeId` field. */
  episodeId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `tvshowGenresId` field. */
  tvshowGenresId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `EpisodesTvshowGenre` object types. All fields are combined with a logical ‘and.’ */
export type EpisodesTvshowGenreFilter = {
  /** Filter by the object’s `episodeId` field. */
  episodeId?: Maybe<IntFilter>;
  /** Filter by the object’s `tvshowGenresId` field. */
  tvshowGenresId?: Maybe<IntFilter>;
  /** Filter by the object’s `episode` relation. */
  episode?: Maybe<EpisodeFilter>;
  /** Filter by the object’s `tvshowGenres` relation. */
  tvshowGenres?: Maybe<TvshowGenreFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EpisodesTvshowGenreFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EpisodesTvshowGenreFilter>>;
  /** Negates the expression. */
  not?: Maybe<EpisodesTvshowGenreFilter>;
};

/** An input for mutations affecting `EpisodesTvshowGenre` */
export type EpisodesTvshowGenreInput = {
  episodeId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};

/** Represents an update to a `EpisodesTvshowGenre`. Fields that are set will be updated. */
export type EpisodesTvshowGenrePatch = {
  episodeId?: Maybe<Scalars['Int']>;
  tvshowGenresId?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `EpisodesTvshowGenre` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type EpisodesTvshowGenresConnection = {
  __typename?: 'EpisodesTvshowGenresConnection';
  /** A list of `EpisodesTvshowGenre` objects. */
  nodes: Array<Maybe<EpisodesTvshowGenre>>;
  /** A list of edges which contains the `EpisodesTvshowGenre` and cursor to aid in pagination. */
  edges: Array<EpisodesTvshowGenresEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EpisodesTvshowGenre` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EpisodesTvshowGenre` edge in the connection. */
export type EpisodesTvshowGenresEdge = {
  __typename?: 'EpisodesTvshowGenresEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EpisodesTvshowGenre` at the end of the edge. */
  node?: Maybe<EpisodesTvshowGenre>;
};

/** Methods to use when ordering `EpisodesTvshowGenre`. */
export enum EpisodesTvshowGenresOrderBy {
  Natural = 'NATURAL',
  EpisodeIdAsc = 'EPISODE_ID_ASC',
  EpisodeIdDesc = 'EPISODE_ID_DESC',
  TvshowGenresIdAsc = 'TVSHOW_GENRES_ID_ASC',
  TvshowGenresIdDesc = 'TVSHOW_GENRES_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type EpisodeSubscriptionPayload = {
  __typename?: 'EpisodeSubscriptionPayload';
  id: Scalars['Int'];
  episode?: Maybe<Episode>;
  event?: Maybe<Scalars['String']>;
};

/** A filter to be used against many `CollectionRelation` object types. All fields are combined with a logical ‘and.’ */
export type EpisodeToManyCollectionRelationFilter = {
  /** Every related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<CollectionRelationFilter>;
  /** Some related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<CollectionRelationFilter>;
  /** No related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<CollectionRelationFilter>;
};

/** A filter to be used against many `EpisodesCast` object types. All fields are combined with a logical ‘and.’ */
export type EpisodeToManyEpisodesCastFilter = {
  /** Every related `EpisodesCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<EpisodesCastFilter>;
  /** Some related `EpisodesCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<EpisodesCastFilter>;
  /** No related `EpisodesCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<EpisodesCastFilter>;
};

/** A filter to be used against many `EpisodesImage` object types. All fields are combined with a logical ‘and.’ */
export type EpisodeToManyEpisodesImageFilter = {
  /** Every related `EpisodesImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<EpisodesImageFilter>;
  /** Some related `EpisodesImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<EpisodesImageFilter>;
  /** No related `EpisodesImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<EpisodesImageFilter>;
};

/** A filter to be used against many `EpisodesLicense` object types. All fields are combined with a logical ‘and.’ */
export type EpisodeToManyEpisodesLicenseFilter = {
  /** Every related `EpisodesLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<EpisodesLicenseFilter>;
  /** Some related `EpisodesLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<EpisodesLicenseFilter>;
  /** No related `EpisodesLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<EpisodesLicenseFilter>;
};

/** A filter to be used against many `EpisodesProductionCountry` object types. All fields are combined with a logical ‘and.’ */
export type EpisodeToManyEpisodesProductionCountryFilter = {
  /** Every related `EpisodesProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<EpisodesProductionCountryFilter>;
  /** Some related `EpisodesProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<EpisodesProductionCountryFilter>;
  /** No related `EpisodesProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<EpisodesProductionCountryFilter>;
};

/** A filter to be used against many `EpisodesTag` object types. All fields are combined with a logical ‘and.’ */
export type EpisodeToManyEpisodesTagFilter = {
  /** Every related `EpisodesTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<EpisodesTagFilter>;
  /** Some related `EpisodesTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<EpisodesTagFilter>;
  /** No related `EpisodesTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<EpisodesTagFilter>;
};

/** A filter to be used against many `EpisodesTrailer` object types. All fields are combined with a logical ‘and.’ */
export type EpisodeToManyEpisodesTrailerFilter = {
  /** Every related `EpisodesTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<EpisodesTrailerFilter>;
  /** Some related `EpisodesTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<EpisodesTrailerFilter>;
  /** No related `EpisodesTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<EpisodesTrailerFilter>;
};

/** A filter to be used against many `EpisodesTvshowGenre` object types. All fields are combined with a logical ‘and.’ */
export type EpisodeToManyEpisodesTvshowGenreFilter = {
  /** Every related `EpisodesTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<EpisodesTvshowGenreFilter>;
  /** Some related `EpisodesTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<EpisodesTvshowGenreFilter>;
  /** No related `EpisodesTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<EpisodesTvshowGenreFilter>;
};

/** A `CollectionEntity` edge in the connection. */
export type GetCollectionEntityValueEdge = {
  __typename?: 'GetCollectionEntityValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CollectionEntity` at the end of the edge. */
  node?: Maybe<CollectionEntity>;
};

/** A connection to a list of `CollectionEntity` values. */
export type GetCollectionEntityValuesConnection = {
  __typename?: 'GetCollectionEntityValuesConnection';
  /** A list of `CollectionEntity` objects. */
  nodes: Array<Maybe<CollectionEntity>>;
  /** A list of edges which contains the `CollectionEntity` and cursor to aid in pagination. */
  edges: Array<GetCollectionEntityValueEdge>;
  /** The count of *all* `CollectionEntity` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CollectionImageType` edge in the connection. */
export type GetCollectionImageTypeValueEdge = {
  __typename?: 'GetCollectionImageTypeValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CollectionImageType` at the end of the edge. */
  node?: Maybe<CollectionImageType>;
};

/** A connection to a list of `CollectionImageType` values. */
export type GetCollectionImageTypeValuesConnection = {
  __typename?: 'GetCollectionImageTypeValuesConnection';
  /** A list of `CollectionImageType` objects. */
  nodes: Array<Maybe<CollectionImageType>>;
  /** A list of edges which contains the `CollectionImageType` and cursor to aid in pagination. */
  edges: Array<GetCollectionImageTypeValueEdge>;
  /** The count of *all* `CollectionImageType` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CollectionType` edge in the connection. */
export type GetCollectionTypeValueEdge = {
  __typename?: 'GetCollectionTypeValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CollectionType` at the end of the edge. */
  node?: Maybe<CollectionType>;
};

/** A connection to a list of `CollectionType` values. */
export type GetCollectionTypeValuesConnection = {
  __typename?: 'GetCollectionTypeValuesConnection';
  /** A list of `CollectionType` objects. */
  nodes: Array<Maybe<CollectionType>>;
  /** A list of edges which contains the `CollectionType` and cursor to aid in pagination. */
  edges: Array<GetCollectionTypeValueEdge>;
  /** The count of *all* `CollectionType` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EpisodeImageType` edge in the connection. */
export type GetEpisodeImageTypeValueEdge = {
  __typename?: 'GetEpisodeImageTypeValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EpisodeImageType` at the end of the edge. */
  node?: Maybe<EpisodeImageType>;
};

/** A connection to a list of `EpisodeImageType` values. */
export type GetEpisodeImageTypeValuesConnection = {
  __typename?: 'GetEpisodeImageTypeValuesConnection';
  /** A list of `EpisodeImageType` objects. */
  nodes: Array<Maybe<EpisodeImageType>>;
  /** A list of edges which contains the `EpisodeImageType` and cursor to aid in pagination. */
  edges: Array<GetEpisodeImageTypeValueEdge>;
  /** The count of *all* `EpisodeImageType` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `IsoAlphaThreeCountryCodes` edge in the connection. */
export type GetIsoAlphaThreeCountryCodesValueEdge = {
  __typename?: 'GetIsoAlphaThreeCountryCodesValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `IsoAlphaThreeCountryCodes` at the end of the edge. */
  node?: Maybe<IsoAlphaThreeCountryCodes>;
};

/** A connection to a list of `IsoAlphaThreeCountryCodes` values. */
export type GetIsoAlphaThreeCountryCodesValuesConnection = {
  __typename?: 'GetIsoAlphaThreeCountryCodesValuesConnection';
  /** A list of `IsoAlphaThreeCountryCodes` objects. */
  nodes: Array<Maybe<IsoAlphaThreeCountryCodes>>;
  /** A list of edges which contains the `IsoAlphaThreeCountryCodes` and cursor to aid in pagination. */
  edges: Array<GetIsoAlphaThreeCountryCodesValueEdge>;
  /** The count of *all* `IsoAlphaThreeCountryCodes` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MovieImageType` edge in the connection. */
export type GetMovieImageTypeValueEdge = {
  __typename?: 'GetMovieImageTypeValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MovieImageType` at the end of the edge. */
  node?: Maybe<MovieImageType>;
};

/** A connection to a list of `MovieImageType` values. */
export type GetMovieImageTypeValuesConnection = {
  __typename?: 'GetMovieImageTypeValuesConnection';
  /** A list of `MovieImageType` objects. */
  nodes: Array<Maybe<MovieImageType>>;
  /** A list of edges which contains the `MovieImageType` and cursor to aid in pagination. */
  edges: Array<GetMovieImageTypeValueEdge>;
  /** The count of *all* `MovieImageType` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PublishStatus` edge in the connection. */
export type GetPublishStatusValueEdge = {
  __typename?: 'GetPublishStatusValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PublishStatus` at the end of the edge. */
  node?: Maybe<PublishStatus>;
};

/** A connection to a list of `PublishStatus` values. */
export type GetPublishStatusValuesConnection = {
  __typename?: 'GetPublishStatusValuesConnection';
  /** A list of `PublishStatus` objects. */
  nodes: Array<Maybe<PublishStatus>>;
  /** A list of edges which contains the `PublishStatus` and cursor to aid in pagination. */
  edges: Array<GetPublishStatusValueEdge>;
  /** The count of *all* `PublishStatus` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SeasonImageType` edge in the connection. */
export type GetSeasonImageTypeValueEdge = {
  __typename?: 'GetSeasonImageTypeValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SeasonImageType` at the end of the edge. */
  node?: Maybe<SeasonImageType>;
};

/** A connection to a list of `SeasonImageType` values. */
export type GetSeasonImageTypeValuesConnection = {
  __typename?: 'GetSeasonImageTypeValuesConnection';
  /** A list of `SeasonImageType` objects. */
  nodes: Array<Maybe<SeasonImageType>>;
  /** A list of edges which contains the `SeasonImageType` and cursor to aid in pagination. */
  edges: Array<GetSeasonImageTypeValueEdge>;
  /** The count of *all* `SeasonImageType` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TvshowImageType` edge in the connection. */
export type GetTvshowImageTypeValueEdge = {
  __typename?: 'GetTvshowImageTypeValueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TvshowImageType` at the end of the edge. */
  node?: Maybe<TvshowImageType>;
};

/** A connection to a list of `TvshowImageType` values. */
export type GetTvshowImageTypeValuesConnection = {
  __typename?: 'GetTvshowImageTypeValuesConnection';
  /** A list of `TvshowImageType` objects. */
  nodes: Array<Maybe<TvshowImageType>>;
  /** A list of edges which contains the `TvshowImageType` and cursor to aid in pagination. */
  edges: Array<GetTvshowImageTypeValueEdge>;
  /** The count of *all* `TvshowImageType` you could get from the connection. */
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

export enum IsoAlphaThreeCountryCodes {
  Abw = 'ABW',
  Afg = 'AFG',
  Ago = 'AGO',
  Aia = 'AIA',
  Ala = 'ALA',
  Alb = 'ALB',
  And = 'AND',
  Are = 'ARE',
  Arg = 'ARG',
  Arm = 'ARM',
  Asm = 'ASM',
  Ata = 'ATA',
  Atf = 'ATF',
  Atg = 'ATG',
  Aus = 'AUS',
  Aut = 'AUT',
  Aze = 'AZE',
  Bdi = 'BDI',
  Bel = 'BEL',
  Ben = 'BEN',
  Bes = 'BES',
  Bfa = 'BFA',
  Bgd = 'BGD',
  Bgr = 'BGR',
  Bhr = 'BHR',
  Bhs = 'BHS',
  Bih = 'BIH',
  Blm = 'BLM',
  Blr = 'BLR',
  Blz = 'BLZ',
  Bmu = 'BMU',
  Bol = 'BOL',
  Bra = 'BRA',
  Brb = 'BRB',
  Brn = 'BRN',
  Btn = 'BTN',
  Bvt = 'BVT',
  Bwa = 'BWA',
  Caf = 'CAF',
  Can = 'CAN',
  Cck = 'CCK',
  Che = 'CHE',
  Chl = 'CHL',
  Chn = 'CHN',
  Civ = 'CIV',
  Cmr = 'CMR',
  Cod = 'COD',
  Cog = 'COG',
  Cok = 'COK',
  Col = 'COL',
  Com = 'COM',
  Cpv = 'CPV',
  Cri = 'CRI',
  Cub = 'CUB',
  Cuw = 'CUW',
  Cxr = 'CXR',
  Cym = 'CYM',
  Cyp = 'CYP',
  Cze = 'CZE',
  Deu = 'DEU',
  Dji = 'DJI',
  Dma = 'DMA',
  Dnk = 'DNK',
  Dom = 'DOM',
  Dza = 'DZA',
  Ecu = 'ECU',
  Egy = 'EGY',
  Eri = 'ERI',
  Esh = 'ESH',
  Esp = 'ESP',
  Est = 'EST',
  Eth = 'ETH',
  Fin = 'FIN',
  Fji = 'FJI',
  Flk = 'FLK',
  Fra = 'FRA',
  Fro = 'FRO',
  Fsm = 'FSM',
  Gab = 'GAB',
  Gbr = 'GBR',
  Geo = 'GEO',
  Ggy = 'GGY',
  Gha = 'GHA',
  Gib = 'GIB',
  Gin = 'GIN',
  Glp = 'GLP',
  Gmb = 'GMB',
  Gnb = 'GNB',
  Gnq = 'GNQ',
  Grc = 'GRC',
  Grd = 'GRD',
  Grl = 'GRL',
  Gtm = 'GTM',
  Guf = 'GUF',
  Gum = 'GUM',
  Guy = 'GUY',
  Hkg = 'HKG',
  Hmd = 'HMD',
  Hnd = 'HND',
  Hrv = 'HRV',
  Hti = 'HTI',
  Hun = 'HUN',
  Idn = 'IDN',
  Imn = 'IMN',
  Ind = 'IND',
  Iot = 'IOT',
  Irl = 'IRL',
  Irn = 'IRN',
  Irq = 'IRQ',
  Isl = 'ISL',
  Isr = 'ISR',
  Ita = 'ITA',
  Jam = 'JAM',
  Jey = 'JEY',
  Jor = 'JOR',
  Jpn = 'JPN',
  Kaz = 'KAZ',
  Ken = 'KEN',
  Kgz = 'KGZ',
  Khm = 'KHM',
  Kir = 'KIR',
  Kna = 'KNA',
  Kor = 'KOR',
  Kwt = 'KWT',
  Lao = 'LAO',
  Lbn = 'LBN',
  Lbr = 'LBR',
  Lby = 'LBY',
  Lca = 'LCA',
  Lie = 'LIE',
  Lka = 'LKA',
  Lso = 'LSO',
  Ltu = 'LTU',
  Lux = 'LUX',
  Lva = 'LVA',
  Mac = 'MAC',
  Maf = 'MAF',
  Mar = 'MAR',
  Mco = 'MCO',
  Mda = 'MDA',
  Mdg = 'MDG',
  Mdv = 'MDV',
  Mex = 'MEX',
  Mhl = 'MHL',
  Mkd = 'MKD',
  Mli = 'MLI',
  Mlt = 'MLT',
  Mmr = 'MMR',
  Mne = 'MNE',
  Mng = 'MNG',
  Mnp = 'MNP',
  Moz = 'MOZ',
  Mrt = 'MRT',
  Msr = 'MSR',
  Mtq = 'MTQ',
  Mus = 'MUS',
  Mwi = 'MWI',
  Mys = 'MYS',
  Myt = 'MYT',
  Nam = 'NAM',
  Ncl = 'NCL',
  Ner = 'NER',
  Nfk = 'NFK',
  Nga = 'NGA',
  Nic = 'NIC',
  Niu = 'NIU',
  Nld = 'NLD',
  Nor = 'NOR',
  Npl = 'NPL',
  Nru = 'NRU',
  Nzl = 'NZL',
  Omn = 'OMN',
  Pak = 'PAK',
  Pan = 'PAN',
  Pcn = 'PCN',
  Per = 'PER',
  Phl = 'PHL',
  Plw = 'PLW',
  Png = 'PNG',
  Pol = 'POL',
  Pri = 'PRI',
  Prk = 'PRK',
  Prt = 'PRT',
  Pry = 'PRY',
  Pse = 'PSE',
  Pyf = 'PYF',
  Qat = 'QAT',
  Reu = 'REU',
  Rou = 'ROU',
  Rus = 'RUS',
  Rwa = 'RWA',
  Sau = 'SAU',
  Sdn = 'SDN',
  Sen = 'SEN',
  Sgp = 'SGP',
  Sgs = 'SGS',
  Shn = 'SHN',
  Sjm = 'SJM',
  Slb = 'SLB',
  Sle = 'SLE',
  Slv = 'SLV',
  Smr = 'SMR',
  Som = 'SOM',
  Spm = 'SPM',
  Srb = 'SRB',
  Ssd = 'SSD',
  Stp = 'STP',
  Sur = 'SUR',
  Svk = 'SVK',
  Svn = 'SVN',
  Swe = 'SWE',
  Swz = 'SWZ',
  Sxm = 'SXM',
  Syc = 'SYC',
  Syr = 'SYR',
  Tca = 'TCA',
  Tcd = 'TCD',
  Tgo = 'TGO',
  Tha = 'THA',
  Tjk = 'TJK',
  Tkl = 'TKL',
  Tkm = 'TKM',
  Tls = 'TLS',
  Ton = 'TON',
  Tto = 'TTO',
  Tun = 'TUN',
  Tur = 'TUR',
  Tuv = 'TUV',
  Twn = 'TWN',
  Tza = 'TZA',
  Uga = 'UGA',
  Ukr = 'UKR',
  Umi = 'UMI',
  Ury = 'URY',
  Usa = 'USA',
  Uzb = 'UZB',
  Vat = 'VAT',
  Vct = 'VCT',
  Ven = 'VEN',
  Vgb = 'VGB',
  Vir = 'VIR',
  Vnm = 'VNM',
  Vut = 'VUT',
  Wlf = 'WLF',
  Wsm = 'WSM',
  Yem = 'YEM',
  Zaf = 'ZAF',
  Zmb = 'ZMB',
  Zwe = 'ZWE'
}

/** A filter to be used against IsoAlphaThreeCountryCodes List fields. All fields are combined with a logical ‘and.’ */
export type IsoAlphaThreeCountryCodesListFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Contains the specified list of values. */
  contains?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Contained by the specified list of values. */
  containedBy?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Overlaps the specified list of values. */
  overlaps?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Any array item is equal to the specified value. */
  anyEqualTo?: Maybe<IsoAlphaThreeCountryCodes>;
  /** Any array item is not equal to the specified value. */
  anyNotEqualTo?: Maybe<IsoAlphaThreeCountryCodes>;
  /** Any array item is less than the specified value. */
  anyLessThan?: Maybe<IsoAlphaThreeCountryCodes>;
  /** Any array item is less than or equal to the specified value. */
  anyLessThanOrEqualTo?: Maybe<IsoAlphaThreeCountryCodes>;
  /** Any array item is greater than the specified value. */
  anyGreaterThan?: Maybe<IsoAlphaThreeCountryCodes>;
  /** Any array item is greater than or equal to the specified value. */
  anyGreaterThanOrEqualTo?: Maybe<IsoAlphaThreeCountryCodes>;
};

/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type Movie = Node & {
  __typename?: 'Movie';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  originalTitle?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
  mainVideoId?: Maybe<Scalars['Int']>;
  publishStatus?: Maybe<PublishStatus>;
  publishedDate?: Maybe<Scalars['Datetime']>;
  publishedUser?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `MoviesTag`. */
  moviesTags: MoviesTagsConnection;
  /** Reads and enables pagination through a set of `MoviesCast`. */
  moviesCasts: MoviesCastsConnection;
  /** Reads and enables pagination through a set of `MoviesLicense`. */
  moviesLicenses: MoviesLicensesConnection;
  /** Reads and enables pagination through a set of `MoviesProductionCountry`. */
  moviesProductionCountries: MoviesProductionCountriesConnection;
  /** Reads and enables pagination through a set of `MoviesMovieGenre`. */
  moviesMovieGenres: MoviesMovieGenresConnection;
  /** Reads and enables pagination through a set of `MoviesImage`. */
  moviesImages: MoviesImagesConnection;
  /** Reads and enables pagination through a set of `MoviesTrailer`. */
  moviesTrailers: MoviesTrailersConnection;
  /** Reads and enables pagination through a set of `CollectionRelation`. */
  collectionRelations: CollectionRelationsConnection;
};


/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MovieMoviesTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesTagsOrderBy>>;
  condition?: Maybe<MoviesTagCondition>;
  filter?: Maybe<MoviesTagFilter>;
};


/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MovieMoviesCastsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesCastsOrderBy>>;
  condition?: Maybe<MoviesCastCondition>;
  filter?: Maybe<MoviesCastFilter>;
};


/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MovieMoviesLicensesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesLicensesOrderBy>>;
  condition?: Maybe<MoviesLicenseCondition>;
  filter?: Maybe<MoviesLicenseFilter>;
};


/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MovieMoviesProductionCountriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesProductionCountriesOrderBy>>;
  condition?: Maybe<MoviesProductionCountryCondition>;
  filter?: Maybe<MoviesProductionCountryFilter>;
};


/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MovieMoviesMovieGenresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesMovieGenresOrderBy>>;
  condition?: Maybe<MoviesMovieGenreCondition>;
  filter?: Maybe<MoviesMovieGenreFilter>;
};


/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MovieMoviesImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesImagesOrderBy>>;
  condition?: Maybe<MoviesImageCondition>;
  filter?: Maybe<MoviesImageFilter>;
};


/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MovieMoviesTrailersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesTrailersOrderBy>>;
  condition?: Maybe<MoviesTrailerCondition>;
  filter?: Maybe<MoviesTrailerFilter>;
};


/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MovieCollectionRelationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionRelationsOrderBy>>;
  condition?: Maybe<CollectionRelationCondition>;
  filter?: Maybe<CollectionRelationFilter>;
};

/** A condition to be used against `Movie` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MovieCondition = {
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
  /** Checks for equality with the object’s `originalTitle` field. */
  originalTitle?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `synopsis` field. */
  synopsis?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `studio` field. */
  studio?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `released` field. */
  released?: Maybe<Scalars['Date']>;
  /** Checks for equality with the object’s `mainVideoId` field. */
  mainVideoId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `publishStatus` field. */
  publishStatus?: Maybe<PublishStatus>;
  /** Checks for equality with the object’s `publishedDate` field. */
  publishedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `publishedUser` field. */
  publishedUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Movie` object types. All fields are combined with a logical ‘and.’ */
export type MovieFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<StringFilter>;
  /** Filter by the object’s `externalId` field. */
  externalId?: Maybe<StringFilter>;
  /** Filter by the object’s `originalTitle` field. */
  originalTitle?: Maybe<StringFilter>;
  /** Filter by the object’s `synopsis` field. */
  synopsis?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `studio` field. */
  studio?: Maybe<StringFilter>;
  /** Filter by the object’s `released` field. */
  released?: Maybe<DateFilter>;
  /** Filter by the object’s `mainVideoId` field. */
  mainVideoId?: Maybe<IntFilter>;
  /** Filter by the object’s `publishStatus` field. */
  publishStatus?: Maybe<PublishStatusFilter>;
  /** Filter by the object’s `publishedDate` field. */
  publishedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `publishedUser` field. */
  publishedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `moviesTags` relation. */
  moviesTags?: Maybe<MovieToManyMoviesTagFilter>;
  /** Some related `moviesTags` exist. */
  moviesTagsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `moviesCasts` relation. */
  moviesCasts?: Maybe<MovieToManyMoviesCastFilter>;
  /** Some related `moviesCasts` exist. */
  moviesCastsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `moviesLicenses` relation. */
  moviesLicenses?: Maybe<MovieToManyMoviesLicenseFilter>;
  /** Some related `moviesLicenses` exist. */
  moviesLicensesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `moviesProductionCountries` relation. */
  moviesProductionCountries?: Maybe<MovieToManyMoviesProductionCountryFilter>;
  /** Some related `moviesProductionCountries` exist. */
  moviesProductionCountriesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `moviesMovieGenres` relation. */
  moviesMovieGenres?: Maybe<MovieToManyMoviesMovieGenreFilter>;
  /** Some related `moviesMovieGenres` exist. */
  moviesMovieGenresExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `moviesImages` relation. */
  moviesImages?: Maybe<MovieToManyMoviesImageFilter>;
  /** Some related `moviesImages` exist. */
  moviesImagesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `moviesTrailers` relation. */
  moviesTrailers?: Maybe<MovieToManyMoviesTrailerFilter>;
  /** Some related `moviesTrailers` exist. */
  moviesTrailersExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `collectionRelations` relation. */
  collectionRelations?: Maybe<MovieToManyCollectionRelationFilter>;
  /** Some related `collectionRelations` exist. */
  collectionRelationsExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MovieFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MovieFilter>>;
  /** Negates the expression. */
  not?: Maybe<MovieFilter>;
};

/** @permissions: SETTINGS_READER,SETTINGS_EDITOR,ADMIN */
export type MovieGenre = Node & {
  __typename?: 'MovieGenre';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['String'];
  sortOrder: Scalars['Int'];
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `MoviesMovieGenre`. */
  moviesMovieGenresByMovieGenresId: MoviesMovieGenresConnection;
};


/** @permissions: SETTINGS_READER,SETTINGS_EDITOR,ADMIN */
export type MovieGenreMoviesMovieGenresByMovieGenresIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesMovieGenresOrderBy>>;
  condition?: Maybe<MoviesMovieGenreCondition>;
  filter?: Maybe<MoviesMovieGenreFilter>;
};

/**
 * A condition to be used against `MovieGenre` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MovieGenreCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `title` field.
   * @maxLength(50)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `sortOrder` field. */
  sortOrder?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `MovieGenre` object types. All fields are combined with a logical ‘and.’ */
export type MovieGenreFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<StringFilter>;
  /** Filter by the object’s `sortOrder` field. */
  sortOrder?: Maybe<IntFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `moviesMovieGenresByMovieGenresId` relation. */
  moviesMovieGenresByMovieGenresId?: Maybe<MovieGenreToManyMoviesMovieGenreFilter>;
  /** Some related `moviesMovieGenresByMovieGenresId` exist. */
  moviesMovieGenresByMovieGenresIdExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MovieGenreFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MovieGenreFilter>>;
  /** Negates the expression. */
  not?: Maybe<MovieGenreFilter>;
};

/** An input for mutations affecting `MovieGenre` */
export type MovieGenreInput = {
  /**
   * @maxLength(50)
   * @notEmpty()
   */
  title: Scalars['String'];
  sortOrder: Scalars['Int'];
};

/** Represents an update to a `MovieGenre`. Fields that are set will be updated. */
export type MovieGenrePatch = {
  /**
   * @maxLength(50)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `MovieGenre` values.
 * @permissions: SETTINGS_READER,SETTINGS_EDITOR,ADMIN
 */
export type MovieGenresConnection = {
  __typename?: 'MovieGenresConnection';
  /** A list of `MovieGenre` objects. */
  nodes: Array<Maybe<MovieGenre>>;
  /** A list of edges which contains the `MovieGenre` and cursor to aid in pagination. */
  edges: Array<MovieGenresEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MovieGenre` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MovieGenre` edge in the connection. */
export type MovieGenresEdge = {
  __typename?: 'MovieGenresEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MovieGenre` at the end of the edge. */
  node?: Maybe<MovieGenre>;
};

/** Methods to use when ordering `MovieGenre`. */
export enum MovieGenresOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  SortOrderAsc = 'SORT_ORDER_ASC',
  SortOrderDesc = 'SORT_ORDER_DESC',
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

export type MovieGenreSubscriptionPayload = {
  __typename?: 'MovieGenreSubscriptionPayload';
  id: Scalars['Int'];
  movieGenre?: Maybe<MovieGenre>;
  event?: Maybe<Scalars['String']>;
};

/** A filter to be used against many `MoviesMovieGenre` object types. All fields are combined with a logical ‘and.’ */
export type MovieGenreToManyMoviesMovieGenreFilter = {
  /** Every related `MoviesMovieGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<MoviesMovieGenreFilter>;
  /** Some related `MoviesMovieGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<MoviesMovieGenreFilter>;
  /** No related `MoviesMovieGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<MoviesMovieGenreFilter>;
};

export enum MovieImageType {
  Cover = 'COVER',
  Teaser = 'TEASER'
}

/** A filter to be used against MovieImageType fields. All fields are combined with a logical ‘and.’ */
export type MovieImageTypeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<MovieImageType>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<MovieImageType>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<MovieImageType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<MovieImageType>;
  /** Included in the specified list. */
  in?: Maybe<Array<MovieImageType>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<MovieImageType>>;
  /** Less than the specified value. */
  lessThan?: Maybe<MovieImageType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<MovieImageType>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<MovieImageType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<MovieImageType>;
};

/** An input for mutations affecting `Movie` */
export type MovieInput = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  originalTitle?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
  mainVideoId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `Movie`. Fields that are set will be updated. */
export type MoviePatch = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  originalTitle?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
  mainVideoId?: Maybe<Scalars['Int']>;
  publishStatus?: Maybe<PublishStatus>;
};

/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MoviesCast = Node & {
  __typename?: 'MoviesCast';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  movieId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Movie` that is related to this `MoviesCast`. */
  movie?: Maybe<Movie>;
};

/**
 * A condition to be used against `MoviesCast` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MoviesCastCondition = {
  /** Checks for equality with the object’s `movieId` field. */
  movieId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `MoviesCast` object types. All fields are combined with a logical ‘and.’ */
export type MoviesCastFilter = {
  /** Filter by the object’s `movieId` field. */
  movieId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `movie` relation. */
  movie?: Maybe<MovieFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MoviesCastFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MoviesCastFilter>>;
  /** Negates the expression. */
  not?: Maybe<MoviesCastFilter>;
};

/** An input for mutations affecting `MoviesCast` */
export type MoviesCastInput = {
  movieId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `MoviesCast`. Fields that are set will be updated. */
export type MoviesCastPatch = {
  movieId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `MoviesCast` values.
 * @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN
 */
export type MoviesCastsConnection = {
  __typename?: 'MoviesCastsConnection';
  /** A list of `MoviesCast` objects. */
  nodes: Array<Maybe<MoviesCast>>;
  /** A list of edges which contains the `MoviesCast` and cursor to aid in pagination. */
  edges: Array<MoviesCastsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MoviesCast` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MoviesCast` edge in the connection. */
export type MoviesCastsEdge = {
  __typename?: 'MoviesCastsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MoviesCast` at the end of the edge. */
  node?: Maybe<MoviesCast>;
};

/** Methods to use when ordering `MoviesCast`. */
export enum MoviesCastsOrderBy {
  Natural = 'NATURAL',
  MovieIdAsc = 'MOVIE_ID_ASC',
  MovieIdDesc = 'MOVIE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A connection to a list of `Movie` values.
 * @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN
 */
export type MoviesConnection = {
  __typename?: 'MoviesConnection';
  /** A list of `Movie` objects. */
  nodes: Array<Maybe<Movie>>;
  /** A list of edges which contains the `Movie` and cursor to aid in pagination. */
  edges: Array<MoviesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Movie` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Movie` edge in the connection. */
export type MoviesEdge = {
  __typename?: 'MoviesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Movie` at the end of the edge. */
  node?: Maybe<Movie>;
};

/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MoviesImage = Node & {
  __typename?: 'MoviesImage';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  movieId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: MovieImageType;
  /** Reads a single `Movie` that is related to this `MoviesImage`. */
  movie?: Maybe<Movie>;
};

/**
 * A condition to be used against `MoviesImage` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MoviesImageCondition = {
  /** Checks for equality with the object’s `movieId` field. */
  movieId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageId` field. */
  imageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageType` field. */
  imageType?: Maybe<MovieImageType>;
};

/** A filter to be used against `MoviesImage` object types. All fields are combined with a logical ‘and.’ */
export type MoviesImageFilter = {
  /** Filter by the object’s `movieId` field. */
  movieId?: Maybe<IntFilter>;
  /** Filter by the object’s `imageId` field. */
  imageId?: Maybe<IntFilter>;
  /** Filter by the object’s `imageType` field. */
  imageType?: Maybe<MovieImageTypeFilter>;
  /** Filter by the object’s `movie` relation. */
  movie?: Maybe<MovieFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MoviesImageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MoviesImageFilter>>;
  /** Negates the expression. */
  not?: Maybe<MoviesImageFilter>;
};

/** An input for mutations affecting `MoviesImage` */
export type MoviesImageInput = {
  movieId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: MovieImageType;
};

/** Represents an update to a `MoviesImage`. Fields that are set will be updated. */
export type MoviesImagePatch = {
  movieId?: Maybe<Scalars['Int']>;
  imageId?: Maybe<Scalars['Int']>;
  imageType?: Maybe<MovieImageType>;
};

/**
 * A connection to a list of `MoviesImage` values.
 * @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN
 */
export type MoviesImagesConnection = {
  __typename?: 'MoviesImagesConnection';
  /** A list of `MoviesImage` objects. */
  nodes: Array<Maybe<MoviesImage>>;
  /** A list of edges which contains the `MoviesImage` and cursor to aid in pagination. */
  edges: Array<MoviesImagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MoviesImage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MoviesImage` edge in the connection. */
export type MoviesImagesEdge = {
  __typename?: 'MoviesImagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MoviesImage` at the end of the edge. */
  node?: Maybe<MoviesImage>;
};

/** Methods to use when ordering `MoviesImage`. */
export enum MoviesImagesOrderBy {
  Natural = 'NATURAL',
  MovieIdAsc = 'MOVIE_ID_ASC',
  MovieIdDesc = 'MOVIE_ID_DESC',
  ImageIdAsc = 'IMAGE_ID_ASC',
  ImageIdDesc = 'IMAGE_ID_DESC',
  ImageTypeAsc = 'IMAGE_TYPE_ASC',
  ImageTypeDesc = 'IMAGE_TYPE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MoviesLicense = Node & {
  __typename?: 'MoviesLicense';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  movieId: Scalars['Int'];
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads a single `Movie` that is related to this `MoviesLicense`. */
  movie?: Maybe<Movie>;
};

/**
 * A condition to be used against `MoviesLicense` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type MoviesLicenseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `movieId` field. */
  movieId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `licenseStart` field. */
  licenseStart?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `licenseEnd` field. */
  licenseEnd?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `countries` field. */
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `MoviesLicense` object types. All fields are combined with a logical ‘and.’ */
export type MoviesLicenseFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `movieId` field. */
  movieId?: Maybe<IntFilter>;
  /** Filter by the object’s `licenseStart` field. */
  licenseStart?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `licenseEnd` field. */
  licenseEnd?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `countries` field. */
  countries?: Maybe<IsoAlphaThreeCountryCodesListFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `movie` relation. */
  movie?: Maybe<MovieFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MoviesLicenseFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MoviesLicenseFilter>>;
  /** Negates the expression. */
  not?: Maybe<MoviesLicenseFilter>;
};

/** An input for mutations affecting `MoviesLicense` */
export type MoviesLicenseInput = {
  movieId: Scalars['Int'];
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
};

/** Represents an update to a `MoviesLicense`. Fields that are set will be updated. */
export type MoviesLicensePatch = {
  movieId?: Maybe<Scalars['Int']>;
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
};

/**
 * A connection to a list of `MoviesLicense` values.
 * @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN
 */
export type MoviesLicensesConnection = {
  __typename?: 'MoviesLicensesConnection';
  /** A list of `MoviesLicense` objects. */
  nodes: Array<Maybe<MoviesLicense>>;
  /** A list of edges which contains the `MoviesLicense` and cursor to aid in pagination. */
  edges: Array<MoviesLicensesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MoviesLicense` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MoviesLicense` edge in the connection. */
export type MoviesLicensesEdge = {
  __typename?: 'MoviesLicensesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MoviesLicense` at the end of the edge. */
  node?: Maybe<MoviesLicense>;
};

/** Methods to use when ordering `MoviesLicense`. */
export enum MoviesLicensesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MovieIdAsc = 'MOVIE_ID_ASC',
  MovieIdDesc = 'MOVIE_ID_DESC',
  LicenseStartAsc = 'LICENSE_START_ASC',
  LicenseStartDesc = 'LICENSE_START_DESC',
  LicenseEndAsc = 'LICENSE_END_ASC',
  LicenseEndDesc = 'LICENSE_END_DESC',
  CountriesAsc = 'COUNTRIES_ASC',
  CountriesDesc = 'COUNTRIES_DESC',
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

/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MoviesMovieGenre = Node & {
  __typename?: 'MoviesMovieGenre';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  movieId: Scalars['Int'];
  movieGenresId: Scalars['Int'];
  /** Reads a single `Movie` that is related to this `MoviesMovieGenre`. */
  movie?: Maybe<Movie>;
  /** Reads a single `MovieGenre` that is related to this `MoviesMovieGenre`. */
  movieGenres?: Maybe<MovieGenre>;
};

/**
 * A condition to be used against `MoviesMovieGenre` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type MoviesMovieGenreCondition = {
  /** Checks for equality with the object’s `movieId` field. */
  movieId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `movieGenresId` field. */
  movieGenresId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `MoviesMovieGenre` object types. All fields are combined with a logical ‘and.’ */
export type MoviesMovieGenreFilter = {
  /** Filter by the object’s `movieId` field. */
  movieId?: Maybe<IntFilter>;
  /** Filter by the object’s `movieGenresId` field. */
  movieGenresId?: Maybe<IntFilter>;
  /** Filter by the object’s `movie` relation. */
  movie?: Maybe<MovieFilter>;
  /** Filter by the object’s `movieGenres` relation. */
  movieGenres?: Maybe<MovieGenreFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MoviesMovieGenreFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MoviesMovieGenreFilter>>;
  /** Negates the expression. */
  not?: Maybe<MoviesMovieGenreFilter>;
};

/** An input for mutations affecting `MoviesMovieGenre` */
export type MoviesMovieGenreInput = {
  movieId: Scalars['Int'];
  movieGenresId: Scalars['Int'];
};

/** Represents an update to a `MoviesMovieGenre`. Fields that are set will be updated. */
export type MoviesMovieGenrePatch = {
  movieId?: Maybe<Scalars['Int']>;
  movieGenresId?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `MoviesMovieGenre` values.
 * @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN
 */
export type MoviesMovieGenresConnection = {
  __typename?: 'MoviesMovieGenresConnection';
  /** A list of `MoviesMovieGenre` objects. */
  nodes: Array<Maybe<MoviesMovieGenre>>;
  /** A list of edges which contains the `MoviesMovieGenre` and cursor to aid in pagination. */
  edges: Array<MoviesMovieGenresEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MoviesMovieGenre` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MoviesMovieGenre` edge in the connection. */
export type MoviesMovieGenresEdge = {
  __typename?: 'MoviesMovieGenresEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MoviesMovieGenre` at the end of the edge. */
  node?: Maybe<MoviesMovieGenre>;
};

/** Methods to use when ordering `MoviesMovieGenre`. */
export enum MoviesMovieGenresOrderBy {
  Natural = 'NATURAL',
  MovieIdAsc = 'MOVIE_ID_ASC',
  MovieIdDesc = 'MOVIE_ID_DESC',
  MovieGenresIdAsc = 'MOVIE_GENRES_ID_ASC',
  MovieGenresIdDesc = 'MOVIE_GENRES_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Methods to use when ordering `Movie`. */
export enum MoviesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  ExternalIdAsc = 'EXTERNAL_ID_ASC',
  ExternalIdDesc = 'EXTERNAL_ID_DESC',
  OriginalTitleAsc = 'ORIGINAL_TITLE_ASC',
  OriginalTitleDesc = 'ORIGINAL_TITLE_DESC',
  SynopsisAsc = 'SYNOPSIS_ASC',
  SynopsisDesc = 'SYNOPSIS_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  StudioAsc = 'STUDIO_ASC',
  StudioDesc = 'STUDIO_DESC',
  ReleasedAsc = 'RELEASED_ASC',
  ReleasedDesc = 'RELEASED_DESC',
  MainVideoIdAsc = 'MAIN_VIDEO_ID_ASC',
  MainVideoIdDesc = 'MAIN_VIDEO_ID_DESC',
  PublishStatusAsc = 'PUBLISH_STATUS_ASC',
  PublishStatusDesc = 'PUBLISH_STATUS_DESC',
  PublishedDateAsc = 'PUBLISHED_DATE_ASC',
  PublishedDateDesc = 'PUBLISHED_DATE_DESC',
  PublishedUserAsc = 'PUBLISHED_USER_ASC',
  PublishedUserDesc = 'PUBLISHED_USER_DESC',
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
 * A connection to a list of `MoviesProductionCountry` values.
 * @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN
 */
export type MoviesProductionCountriesConnection = {
  __typename?: 'MoviesProductionCountriesConnection';
  /** A list of `MoviesProductionCountry` objects. */
  nodes: Array<Maybe<MoviesProductionCountry>>;
  /** A list of edges which contains the `MoviesProductionCountry` and cursor to aid in pagination. */
  edges: Array<MoviesProductionCountriesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MoviesProductionCountry` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MoviesProductionCountry` edge in the connection. */
export type MoviesProductionCountriesEdge = {
  __typename?: 'MoviesProductionCountriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MoviesProductionCountry` at the end of the edge. */
  node?: Maybe<MoviesProductionCountry>;
};

/** Methods to use when ordering `MoviesProductionCountry`. */
export enum MoviesProductionCountriesOrderBy {
  Natural = 'NATURAL',
  MovieIdAsc = 'MOVIE_ID_ASC',
  MovieIdDesc = 'MOVIE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MoviesProductionCountry = Node & {
  __typename?: 'MoviesProductionCountry';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  movieId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Movie` that is related to this `MoviesProductionCountry`. */
  movie?: Maybe<Movie>;
};

/**
 * A condition to be used against `MoviesProductionCountry` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type MoviesProductionCountryCondition = {
  /** Checks for equality with the object’s `movieId` field. */
  movieId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `MoviesProductionCountry` object types. All fields are combined with a logical ‘and.’ */
export type MoviesProductionCountryFilter = {
  /** Filter by the object’s `movieId` field. */
  movieId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `movie` relation. */
  movie?: Maybe<MovieFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MoviesProductionCountryFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MoviesProductionCountryFilter>>;
  /** Negates the expression. */
  not?: Maybe<MoviesProductionCountryFilter>;
};

/** An input for mutations affecting `MoviesProductionCountry` */
export type MoviesProductionCountryInput = {
  movieId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `MoviesProductionCountry`. Fields that are set will be updated. */
export type MoviesProductionCountryPatch = {
  movieId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MoviesTag = Node & {
  __typename?: 'MoviesTag';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  movieId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Movie` that is related to this `MoviesTag`. */
  movie?: Maybe<Movie>;
};

/**
 * A condition to be used against `MoviesTag` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MoviesTagCondition = {
  /** Checks for equality with the object’s `movieId` field. */
  movieId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `MoviesTag` object types. All fields are combined with a logical ‘and.’ */
export type MoviesTagFilter = {
  /** Filter by the object’s `movieId` field. */
  movieId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `movie` relation. */
  movie?: Maybe<MovieFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MoviesTagFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MoviesTagFilter>>;
  /** Negates the expression. */
  not?: Maybe<MoviesTagFilter>;
};

/** An input for mutations affecting `MoviesTag` */
export type MoviesTagInput = {
  movieId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `MoviesTag`. Fields that are set will be updated. */
export type MoviesTagPatch = {
  movieId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `MoviesTag` values.
 * @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN
 */
export type MoviesTagsConnection = {
  __typename?: 'MoviesTagsConnection';
  /** A list of `MoviesTag` objects. */
  nodes: Array<Maybe<MoviesTag>>;
  /** A list of edges which contains the `MoviesTag` and cursor to aid in pagination. */
  edges: Array<MoviesTagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MoviesTag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MoviesTag` edge in the connection. */
export type MoviesTagsEdge = {
  __typename?: 'MoviesTagsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MoviesTag` at the end of the edge. */
  node?: Maybe<MoviesTag>;
};

/** Methods to use when ordering `MoviesTag`. */
export enum MoviesTagsOrderBy {
  Natural = 'NATURAL',
  MovieIdAsc = 'MOVIE_ID_ASC',
  MovieIdDesc = 'MOVIE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN */
export type MoviesTrailer = Node & {
  __typename?: 'MoviesTrailer';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  movieId: Scalars['Int'];
  videoId: Scalars['Int'];
  /** Reads a single `Movie` that is related to this `MoviesTrailer`. */
  movie?: Maybe<Movie>;
};

/**
 * A condition to be used against `MoviesTrailer` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type MoviesTrailerCondition = {
  /** Checks for equality with the object’s `movieId` field. */
  movieId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `videoId` field. */
  videoId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `MoviesTrailer` object types. All fields are combined with a logical ‘and.’ */
export type MoviesTrailerFilter = {
  /** Filter by the object’s `movieId` field. */
  movieId?: Maybe<IntFilter>;
  /** Filter by the object’s `videoId` field. */
  videoId?: Maybe<IntFilter>;
  /** Filter by the object’s `movie` relation. */
  movie?: Maybe<MovieFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MoviesTrailerFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MoviesTrailerFilter>>;
  /** Negates the expression. */
  not?: Maybe<MoviesTrailerFilter>;
};

/** An input for mutations affecting `MoviesTrailer` */
export type MoviesTrailerInput = {
  movieId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** Represents an update to a `MoviesTrailer`. Fields that are set will be updated. */
export type MoviesTrailerPatch = {
  movieId?: Maybe<Scalars['Int']>;
  videoId?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `MoviesTrailer` values.
 * @permissions: MOVIE_READER,MOVIE_EDITOR,ADMIN
 */
export type MoviesTrailersConnection = {
  __typename?: 'MoviesTrailersConnection';
  /** A list of `MoviesTrailer` objects. */
  nodes: Array<Maybe<MoviesTrailer>>;
  /** A list of edges which contains the `MoviesTrailer` and cursor to aid in pagination. */
  edges: Array<MoviesTrailersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MoviesTrailer` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MoviesTrailer` edge in the connection. */
export type MoviesTrailersEdge = {
  __typename?: 'MoviesTrailersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MoviesTrailer` at the end of the edge. */
  node?: Maybe<MoviesTrailer>;
};

/** Methods to use when ordering `MoviesTrailer`. */
export enum MoviesTrailersOrderBy {
  Natural = 'NATURAL',
  MovieIdAsc = 'MOVIE_ID_ASC',
  MovieIdDesc = 'MOVIE_ID_DESC',
  VideoIdAsc = 'VIDEO_ID_ASC',
  VideoIdDesc = 'VIDEO_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type MovieSubscriptionPayload = {
  __typename?: 'MovieSubscriptionPayload';
  id: Scalars['Int'];
  movie?: Maybe<Movie>;
  event?: Maybe<Scalars['String']>;
};

/** A filter to be used against many `CollectionRelation` object types. All fields are combined with a logical ‘and.’ */
export type MovieToManyCollectionRelationFilter = {
  /** Every related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<CollectionRelationFilter>;
  /** Some related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<CollectionRelationFilter>;
  /** No related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<CollectionRelationFilter>;
};

/** A filter to be used against many `MoviesCast` object types. All fields are combined with a logical ‘and.’ */
export type MovieToManyMoviesCastFilter = {
  /** Every related `MoviesCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<MoviesCastFilter>;
  /** Some related `MoviesCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<MoviesCastFilter>;
  /** No related `MoviesCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<MoviesCastFilter>;
};

/** A filter to be used against many `MoviesImage` object types. All fields are combined with a logical ‘and.’ */
export type MovieToManyMoviesImageFilter = {
  /** Every related `MoviesImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<MoviesImageFilter>;
  /** Some related `MoviesImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<MoviesImageFilter>;
  /** No related `MoviesImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<MoviesImageFilter>;
};

/** A filter to be used against many `MoviesLicense` object types. All fields are combined with a logical ‘and.’ */
export type MovieToManyMoviesLicenseFilter = {
  /** Every related `MoviesLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<MoviesLicenseFilter>;
  /** Some related `MoviesLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<MoviesLicenseFilter>;
  /** No related `MoviesLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<MoviesLicenseFilter>;
};

/** A filter to be used against many `MoviesMovieGenre` object types. All fields are combined with a logical ‘and.’ */
export type MovieToManyMoviesMovieGenreFilter = {
  /** Every related `MoviesMovieGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<MoviesMovieGenreFilter>;
  /** Some related `MoviesMovieGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<MoviesMovieGenreFilter>;
  /** No related `MoviesMovieGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<MoviesMovieGenreFilter>;
};

/** A filter to be used against many `MoviesProductionCountry` object types. All fields are combined with a logical ‘and.’ */
export type MovieToManyMoviesProductionCountryFilter = {
  /** Every related `MoviesProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<MoviesProductionCountryFilter>;
  /** Some related `MoviesProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<MoviesProductionCountryFilter>;
  /** No related `MoviesProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<MoviesProductionCountryFilter>;
};

/** A filter to be used against many `MoviesTag` object types. All fields are combined with a logical ‘and.’ */
export type MovieToManyMoviesTagFilter = {
  /** Every related `MoviesTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<MoviesTagFilter>;
  /** Some related `MoviesTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<MoviesTagFilter>;
  /** No related `MoviesTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<MoviesTagFilter>;
};

/** A filter to be used against many `MoviesTrailer` object types. All fields are combined with a logical ‘and.’ */
export type MovieToManyMoviesTrailerFilter = {
  /** Every related `MoviesTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<MoviesTrailerFilter>;
  /** Some related `MoviesTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<MoviesTrailerFilter>;
  /** No related `MoviesTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<MoviesTrailerFilter>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `AutomaticCollectionsFilter`. */
  createAutomaticCollectionsFilter?: Maybe<CreateAutomaticCollectionsFilterPayload>;
  /** Creates a single `CollectionRelation`. */
  createCollectionRelation?: Maybe<CreateCollectionRelationPayload>;
  /** Creates a single `Collection`. */
  createCollection?: Maybe<CreateCollectionPayload>;
  /** Creates a single `CollectionsImage`. */
  createCollectionsImage?: Maybe<CreateCollectionsImagePayload>;
  /** Creates a single `CollectionsTag`. */
  createCollectionsTag?: Maybe<CreateCollectionsTagPayload>;
  /** Creates a single `Episode`. */
  createEpisode?: Maybe<CreateEpisodePayload>;
  /** Creates a single `EpisodesCast`. */
  createEpisodesCast?: Maybe<CreateEpisodesCastPayload>;
  /** Creates a single `EpisodesImage`. */
  createEpisodesImage?: Maybe<CreateEpisodesImagePayload>;
  /** Creates a single `EpisodesLicense`. */
  createEpisodesLicense?: Maybe<CreateEpisodesLicensePayload>;
  /** Creates a single `EpisodesProductionCountry`. */
  createEpisodesProductionCountry?: Maybe<CreateEpisodesProductionCountryPayload>;
  /** Creates a single `EpisodesTag`. */
  createEpisodesTag?: Maybe<CreateEpisodesTagPayload>;
  /** Creates a single `EpisodesTrailer`. */
  createEpisodesTrailer?: Maybe<CreateEpisodesTrailerPayload>;
  /** Creates a single `EpisodesTvshowGenre`. */
  createEpisodesTvshowGenre?: Maybe<CreateEpisodesTvshowGenrePayload>;
  /** Creates a single `MovieGenre`. */
  createMovieGenre?: Maybe<CreateMovieGenrePayload>;
  /** Creates a single `Movie`. */
  createMovie?: Maybe<CreateMoviePayload>;
  /** Creates a single `MoviesCast`. */
  createMoviesCast?: Maybe<CreateMoviesCastPayload>;
  /** Creates a single `MoviesImage`. */
  createMoviesImage?: Maybe<CreateMoviesImagePayload>;
  /** Creates a single `MoviesLicense`. */
  createMoviesLicense?: Maybe<CreateMoviesLicensePayload>;
  /** Creates a single `MoviesMovieGenre`. */
  createMoviesMovieGenre?: Maybe<CreateMoviesMovieGenrePayload>;
  /** Creates a single `MoviesProductionCountry`. */
  createMoviesProductionCountry?: Maybe<CreateMoviesProductionCountryPayload>;
  /** Creates a single `MoviesTag`. */
  createMoviesTag?: Maybe<CreateMoviesTagPayload>;
  /** Creates a single `MoviesTrailer`. */
  createMoviesTrailer?: Maybe<CreateMoviesTrailerPayload>;
  /** Creates a single `Season`. */
  createSeason?: Maybe<CreateSeasonPayload>;
  /** Creates a single `SeasonsCast`. */
  createSeasonsCast?: Maybe<CreateSeasonsCastPayload>;
  /** Creates a single `SeasonsImage`. */
  createSeasonsImage?: Maybe<CreateSeasonsImagePayload>;
  /** Creates a single `SeasonsLicense`. */
  createSeasonsLicense?: Maybe<CreateSeasonsLicensePayload>;
  /** Creates a single `SeasonsProductionCountry`. */
  createSeasonsProductionCountry?: Maybe<CreateSeasonsProductionCountryPayload>;
  /** Creates a single `SeasonsTag`. */
  createSeasonsTag?: Maybe<CreateSeasonsTagPayload>;
  /** Creates a single `SeasonsTrailer`. */
  createSeasonsTrailer?: Maybe<CreateSeasonsTrailerPayload>;
  /** Creates a single `SeasonsTvshowGenre`. */
  createSeasonsTvshowGenre?: Maybe<CreateSeasonsTvshowGenrePayload>;
  /** Creates a single `TvshowGenre`. */
  createTvshowGenre?: Maybe<CreateTvshowGenrePayload>;
  /** Creates a single `Tvshow`. */
  createTvshow?: Maybe<CreateTvshowPayload>;
  /** Creates a single `TvshowsCast`. */
  createTvshowsCast?: Maybe<CreateTvshowsCastPayload>;
  /** Creates a single `TvshowsImage`. */
  createTvshowsImage?: Maybe<CreateTvshowsImagePayload>;
  /** Creates a single `TvshowsLicense`. */
  createTvshowsLicense?: Maybe<CreateTvshowsLicensePayload>;
  /** Creates a single `TvshowsProductionCountry`. */
  createTvshowsProductionCountry?: Maybe<CreateTvshowsProductionCountryPayload>;
  /** Creates a single `TvshowsTag`. */
  createTvshowsTag?: Maybe<CreateTvshowsTagPayload>;
  /** Creates a single `TvshowsTrailer`. */
  createTvshowsTrailer?: Maybe<CreateTvshowsTrailerPayload>;
  /** Creates a single `TvshowsTvshowGenre`. */
  createTvshowsTvshowGenre?: Maybe<CreateTvshowsTvshowGenrePayload>;
  /** Updates a single `AutomaticCollectionsFilter` using its globally unique id and a patch. */
  updateAutomaticCollectionsFilterByNodeId?: Maybe<UpdateAutomaticCollectionsFilterPayload>;
  /** Updates a single `AutomaticCollectionsFilter` using a unique key and a patch. */
  updateAutomaticCollectionsFilter?: Maybe<UpdateAutomaticCollectionsFilterPayload>;
  /** Updates a single `CollectionRelation` using its globally unique id and a patch. */
  updateCollectionRelationByNodeId?: Maybe<UpdateCollectionRelationPayload>;
  /** Updates a single `CollectionRelation` using a unique key and a patch. */
  updateCollectionRelation?: Maybe<UpdateCollectionRelationPayload>;
  /** Updates a single `CollectionRelation` using a unique key and a patch. */
  updateCollectionRelationByCollectionIdAndMovieId?: Maybe<UpdateCollectionRelationPayload>;
  /** Updates a single `CollectionRelation` using a unique key and a patch. */
  updateCollectionRelationByCollectionIdAndTvshowId?: Maybe<UpdateCollectionRelationPayload>;
  /** Updates a single `CollectionRelation` using a unique key and a patch. */
  updateCollectionRelationByCollectionIdAndSeasonId?: Maybe<UpdateCollectionRelationPayload>;
  /** Updates a single `CollectionRelation` using a unique key and a patch. */
  updateCollectionRelationByCollectionIdAndEpisodeId?: Maybe<UpdateCollectionRelationPayload>;
  /** Updates a single `Collection` using its globally unique id and a patch. */
  updateCollectionByNodeId?: Maybe<UpdateCollectionPayload>;
  /** Updates a single `Collection` using a unique key and a patch. */
  updateCollection?: Maybe<UpdateCollectionPayload>;
  /** Updates a single `Collection` using a unique key and a patch. */
  updateCollectionByExternalId?: Maybe<UpdateCollectionPayload>;
  /** Updates a single `CollectionsImage` using its globally unique id and a patch. */
  updateCollectionsImageByNodeId?: Maybe<UpdateCollectionsImagePayload>;
  /** Updates a single `CollectionsImage` using a unique key and a patch. */
  updateCollectionsImage?: Maybe<UpdateCollectionsImagePayload>;
  /** Updates a single `CollectionsTag` using its globally unique id and a patch. */
  updateCollectionsTagByNodeId?: Maybe<UpdateCollectionsTagPayload>;
  /** Updates a single `CollectionsTag` using a unique key and a patch. */
  updateCollectionsTag?: Maybe<UpdateCollectionsTagPayload>;
  /** Updates a single `Episode` using its globally unique id and a patch. */
  updateEpisodeByNodeId?: Maybe<UpdateEpisodePayload>;
  /** Updates a single `Episode` using a unique key and a patch. */
  updateEpisode?: Maybe<UpdateEpisodePayload>;
  /** Updates a single `Episode` using a unique key and a patch. */
  updateEpisodeByExternalId?: Maybe<UpdateEpisodePayload>;
  /** Updates a single `EpisodesCast` using its globally unique id and a patch. */
  updateEpisodesCastByNodeId?: Maybe<UpdateEpisodesCastPayload>;
  /** Updates a single `EpisodesCast` using a unique key and a patch. */
  updateEpisodesCast?: Maybe<UpdateEpisodesCastPayload>;
  /** Updates a single `EpisodesImage` using its globally unique id and a patch. */
  updateEpisodesImageByNodeId?: Maybe<UpdateEpisodesImagePayload>;
  /** Updates a single `EpisodesImage` using a unique key and a patch. */
  updateEpisodesImage?: Maybe<UpdateEpisodesImagePayload>;
  /** Updates a single `EpisodesLicense` using its globally unique id and a patch. */
  updateEpisodesLicenseByNodeId?: Maybe<UpdateEpisodesLicensePayload>;
  /** Updates a single `EpisodesLicense` using a unique key and a patch. */
  updateEpisodesLicense?: Maybe<UpdateEpisodesLicensePayload>;
  /** Updates a single `EpisodesProductionCountry` using its globally unique id and a patch. */
  updateEpisodesProductionCountryByNodeId?: Maybe<UpdateEpisodesProductionCountryPayload>;
  /** Updates a single `EpisodesProductionCountry` using a unique key and a patch. */
  updateEpisodesProductionCountry?: Maybe<UpdateEpisodesProductionCountryPayload>;
  /** Updates a single `EpisodesTag` using its globally unique id and a patch. */
  updateEpisodesTagByNodeId?: Maybe<UpdateEpisodesTagPayload>;
  /** Updates a single `EpisodesTag` using a unique key and a patch. */
  updateEpisodesTag?: Maybe<UpdateEpisodesTagPayload>;
  /** Updates a single `EpisodesTrailer` using its globally unique id and a patch. */
  updateEpisodesTrailerByNodeId?: Maybe<UpdateEpisodesTrailerPayload>;
  /** Updates a single `EpisodesTrailer` using a unique key and a patch. */
  updateEpisodesTrailer?: Maybe<UpdateEpisodesTrailerPayload>;
  /** Updates a single `EpisodesTvshowGenre` using its globally unique id and a patch. */
  updateEpisodesTvshowGenreByNodeId?: Maybe<UpdateEpisodesTvshowGenrePayload>;
  /** Updates a single `EpisodesTvshowGenre` using a unique key and a patch. */
  updateEpisodesTvshowGenre?: Maybe<UpdateEpisodesTvshowGenrePayload>;
  /** Updates a single `MovieGenre` using its globally unique id and a patch. */
  updateMovieGenreByNodeId?: Maybe<UpdateMovieGenrePayload>;
  /** Updates a single `MovieGenre` using a unique key and a patch. */
  updateMovieGenre?: Maybe<UpdateMovieGenrePayload>;
  /** Updates a single `Movie` using its globally unique id and a patch. */
  updateMovieByNodeId?: Maybe<UpdateMoviePayload>;
  /** Updates a single `Movie` using a unique key and a patch. */
  updateMovie?: Maybe<UpdateMoviePayload>;
  /** Updates a single `Movie` using a unique key and a patch. */
  updateMovieByExternalId?: Maybe<UpdateMoviePayload>;
  /** Updates a single `MoviesCast` using its globally unique id and a patch. */
  updateMoviesCastByNodeId?: Maybe<UpdateMoviesCastPayload>;
  /** Updates a single `MoviesCast` using a unique key and a patch. */
  updateMoviesCast?: Maybe<UpdateMoviesCastPayload>;
  /** Updates a single `MoviesImage` using its globally unique id and a patch. */
  updateMoviesImageByNodeId?: Maybe<UpdateMoviesImagePayload>;
  /** Updates a single `MoviesImage` using a unique key and a patch. */
  updateMoviesImage?: Maybe<UpdateMoviesImagePayload>;
  /** Updates a single `MoviesLicense` using its globally unique id and a patch. */
  updateMoviesLicenseByNodeId?: Maybe<UpdateMoviesLicensePayload>;
  /** Updates a single `MoviesLicense` using a unique key and a patch. */
  updateMoviesLicense?: Maybe<UpdateMoviesLicensePayload>;
  /** Updates a single `MoviesMovieGenre` using its globally unique id and a patch. */
  updateMoviesMovieGenreByNodeId?: Maybe<UpdateMoviesMovieGenrePayload>;
  /** Updates a single `MoviesMovieGenre` using a unique key and a patch. */
  updateMoviesMovieGenre?: Maybe<UpdateMoviesMovieGenrePayload>;
  /** Updates a single `MoviesProductionCountry` using its globally unique id and a patch. */
  updateMoviesProductionCountryByNodeId?: Maybe<UpdateMoviesProductionCountryPayload>;
  /** Updates a single `MoviesProductionCountry` using a unique key and a patch. */
  updateMoviesProductionCountry?: Maybe<UpdateMoviesProductionCountryPayload>;
  /** Updates a single `MoviesTag` using its globally unique id and a patch. */
  updateMoviesTagByNodeId?: Maybe<UpdateMoviesTagPayload>;
  /** Updates a single `MoviesTag` using a unique key and a patch. */
  updateMoviesTag?: Maybe<UpdateMoviesTagPayload>;
  /** Updates a single `MoviesTrailer` using its globally unique id and a patch. */
  updateMoviesTrailerByNodeId?: Maybe<UpdateMoviesTrailerPayload>;
  /** Updates a single `MoviesTrailer` using a unique key and a patch. */
  updateMoviesTrailer?: Maybe<UpdateMoviesTrailerPayload>;
  /** Updates a single `Season` using its globally unique id and a patch. */
  updateSeasonByNodeId?: Maybe<UpdateSeasonPayload>;
  /** Updates a single `Season` using a unique key and a patch. */
  updateSeason?: Maybe<UpdateSeasonPayload>;
  /** Updates a single `Season` using a unique key and a patch. */
  updateSeasonByExternalId?: Maybe<UpdateSeasonPayload>;
  /** Updates a single `SeasonsCast` using its globally unique id and a patch. */
  updateSeasonsCastByNodeId?: Maybe<UpdateSeasonsCastPayload>;
  /** Updates a single `SeasonsCast` using a unique key and a patch. */
  updateSeasonsCast?: Maybe<UpdateSeasonsCastPayload>;
  /** Updates a single `SeasonsImage` using its globally unique id and a patch. */
  updateSeasonsImageByNodeId?: Maybe<UpdateSeasonsImagePayload>;
  /** Updates a single `SeasonsImage` using a unique key and a patch. */
  updateSeasonsImage?: Maybe<UpdateSeasonsImagePayload>;
  /** Updates a single `SeasonsLicense` using its globally unique id and a patch. */
  updateSeasonsLicenseByNodeId?: Maybe<UpdateSeasonsLicensePayload>;
  /** Updates a single `SeasonsLicense` using a unique key and a patch. */
  updateSeasonsLicense?: Maybe<UpdateSeasonsLicensePayload>;
  /** Updates a single `SeasonsProductionCountry` using its globally unique id and a patch. */
  updateSeasonsProductionCountryByNodeId?: Maybe<UpdateSeasonsProductionCountryPayload>;
  /** Updates a single `SeasonsProductionCountry` using a unique key and a patch. */
  updateSeasonsProductionCountry?: Maybe<UpdateSeasonsProductionCountryPayload>;
  /** Updates a single `SeasonsTag` using its globally unique id and a patch. */
  updateSeasonsTagByNodeId?: Maybe<UpdateSeasonsTagPayload>;
  /** Updates a single `SeasonsTag` using a unique key and a patch. */
  updateSeasonsTag?: Maybe<UpdateSeasonsTagPayload>;
  /** Updates a single `SeasonsTrailer` using its globally unique id and a patch. */
  updateSeasonsTrailerByNodeId?: Maybe<UpdateSeasonsTrailerPayload>;
  /** Updates a single `SeasonsTrailer` using a unique key and a patch. */
  updateSeasonsTrailer?: Maybe<UpdateSeasonsTrailerPayload>;
  /** Updates a single `SeasonsTvshowGenre` using its globally unique id and a patch. */
  updateSeasonsTvshowGenreByNodeId?: Maybe<UpdateSeasonsTvshowGenrePayload>;
  /** Updates a single `SeasonsTvshowGenre` using a unique key and a patch. */
  updateSeasonsTvshowGenre?: Maybe<UpdateSeasonsTvshowGenrePayload>;
  /** Updates a single `TvshowGenre` using its globally unique id and a patch. */
  updateTvshowGenreByNodeId?: Maybe<UpdateTvshowGenrePayload>;
  /** Updates a single `TvshowGenre` using a unique key and a patch. */
  updateTvshowGenre?: Maybe<UpdateTvshowGenrePayload>;
  /** Updates a single `Tvshow` using its globally unique id and a patch. */
  updateTvshowByNodeId?: Maybe<UpdateTvshowPayload>;
  /** Updates a single `Tvshow` using a unique key and a patch. */
  updateTvshow?: Maybe<UpdateTvshowPayload>;
  /** Updates a single `Tvshow` using a unique key and a patch. */
  updateTvshowByExternalId?: Maybe<UpdateTvshowPayload>;
  /** Updates a single `TvshowsCast` using its globally unique id and a patch. */
  updateTvshowsCastByNodeId?: Maybe<UpdateTvshowsCastPayload>;
  /** Updates a single `TvshowsCast` using a unique key and a patch. */
  updateTvshowsCast?: Maybe<UpdateTvshowsCastPayload>;
  /** Updates a single `TvshowsImage` using its globally unique id and a patch. */
  updateTvshowsImageByNodeId?: Maybe<UpdateTvshowsImagePayload>;
  /** Updates a single `TvshowsImage` using a unique key and a patch. */
  updateTvshowsImage?: Maybe<UpdateTvshowsImagePayload>;
  /** Updates a single `TvshowsLicense` using its globally unique id and a patch. */
  updateTvshowsLicenseByNodeId?: Maybe<UpdateTvshowsLicensePayload>;
  /** Updates a single `TvshowsLicense` using a unique key and a patch. */
  updateTvshowsLicense?: Maybe<UpdateTvshowsLicensePayload>;
  /** Updates a single `TvshowsProductionCountry` using its globally unique id and a patch. */
  updateTvshowsProductionCountryByNodeId?: Maybe<UpdateTvshowsProductionCountryPayload>;
  /** Updates a single `TvshowsProductionCountry` using a unique key and a patch. */
  updateTvshowsProductionCountry?: Maybe<UpdateTvshowsProductionCountryPayload>;
  /** Updates a single `TvshowsTag` using its globally unique id and a patch. */
  updateTvshowsTagByNodeId?: Maybe<UpdateTvshowsTagPayload>;
  /** Updates a single `TvshowsTag` using a unique key and a patch. */
  updateTvshowsTag?: Maybe<UpdateTvshowsTagPayload>;
  /** Updates a single `TvshowsTrailer` using its globally unique id and a patch. */
  updateTvshowsTrailerByNodeId?: Maybe<UpdateTvshowsTrailerPayload>;
  /** Updates a single `TvshowsTrailer` using a unique key and a patch. */
  updateTvshowsTrailer?: Maybe<UpdateTvshowsTrailerPayload>;
  /** Updates a single `TvshowsTvshowGenre` using its globally unique id and a patch. */
  updateTvshowsTvshowGenreByNodeId?: Maybe<UpdateTvshowsTvshowGenrePayload>;
  /** Updates a single `TvshowsTvshowGenre` using a unique key and a patch. */
  updateTvshowsTvshowGenre?: Maybe<UpdateTvshowsTvshowGenrePayload>;
  /** Deletes a single `AutomaticCollectionsFilter` using its globally unique id. */
  deleteAutomaticCollectionsFilterByNodeId?: Maybe<DeleteAutomaticCollectionsFilterPayload>;
  /** Deletes a single `AutomaticCollectionsFilter` using a unique key. */
  deleteAutomaticCollectionsFilter?: Maybe<DeleteAutomaticCollectionsFilterPayload>;
  /** Deletes a single `CollectionRelation` using its globally unique id. */
  deleteCollectionRelationByNodeId?: Maybe<DeleteCollectionRelationPayload>;
  /** Deletes a single `CollectionRelation` using a unique key. */
  deleteCollectionRelation?: Maybe<DeleteCollectionRelationPayload>;
  /** Deletes a single `CollectionRelation` using a unique key. */
  deleteCollectionRelationByCollectionIdAndMovieId?: Maybe<DeleteCollectionRelationPayload>;
  /** Deletes a single `CollectionRelation` using a unique key. */
  deleteCollectionRelationByCollectionIdAndTvshowId?: Maybe<DeleteCollectionRelationPayload>;
  /** Deletes a single `CollectionRelation` using a unique key. */
  deleteCollectionRelationByCollectionIdAndSeasonId?: Maybe<DeleteCollectionRelationPayload>;
  /** Deletes a single `CollectionRelation` using a unique key. */
  deleteCollectionRelationByCollectionIdAndEpisodeId?: Maybe<DeleteCollectionRelationPayload>;
  /** Deletes a single `Collection` using its globally unique id. */
  deleteCollectionByNodeId?: Maybe<DeleteCollectionPayload>;
  /** Deletes a single `Collection` using a unique key. */
  deleteCollection?: Maybe<DeleteCollectionPayload>;
  /** Deletes a single `Collection` using a unique key. */
  deleteCollectionByExternalId?: Maybe<DeleteCollectionPayload>;
  /** Deletes a single `CollectionsImage` using its globally unique id. */
  deleteCollectionsImageByNodeId?: Maybe<DeleteCollectionsImagePayload>;
  /** Deletes a single `CollectionsImage` using a unique key. */
  deleteCollectionsImage?: Maybe<DeleteCollectionsImagePayload>;
  /** Deletes a single `CollectionsTag` using its globally unique id. */
  deleteCollectionsTagByNodeId?: Maybe<DeleteCollectionsTagPayload>;
  /** Deletes a single `CollectionsTag` using a unique key. */
  deleteCollectionsTag?: Maybe<DeleteCollectionsTagPayload>;
  /** Deletes a single `Episode` using its globally unique id. */
  deleteEpisodeByNodeId?: Maybe<DeleteEpisodePayload>;
  /** Deletes a single `Episode` using a unique key. */
  deleteEpisode?: Maybe<DeleteEpisodePayload>;
  /** Deletes a single `Episode` using a unique key. */
  deleteEpisodeByExternalId?: Maybe<DeleteEpisodePayload>;
  /** Deletes a single `EpisodesCast` using its globally unique id. */
  deleteEpisodesCastByNodeId?: Maybe<DeleteEpisodesCastPayload>;
  /** Deletes a single `EpisodesCast` using a unique key. */
  deleteEpisodesCast?: Maybe<DeleteEpisodesCastPayload>;
  /** Deletes a single `EpisodesImage` using its globally unique id. */
  deleteEpisodesImageByNodeId?: Maybe<DeleteEpisodesImagePayload>;
  /** Deletes a single `EpisodesImage` using a unique key. */
  deleteEpisodesImage?: Maybe<DeleteEpisodesImagePayload>;
  /** Deletes a single `EpisodesLicense` using its globally unique id. */
  deleteEpisodesLicenseByNodeId?: Maybe<DeleteEpisodesLicensePayload>;
  /** Deletes a single `EpisodesLicense` using a unique key. */
  deleteEpisodesLicense?: Maybe<DeleteEpisodesLicensePayload>;
  /** Deletes a single `EpisodesProductionCountry` using its globally unique id. */
  deleteEpisodesProductionCountryByNodeId?: Maybe<DeleteEpisodesProductionCountryPayload>;
  /** Deletes a single `EpisodesProductionCountry` using a unique key. */
  deleteEpisodesProductionCountry?: Maybe<DeleteEpisodesProductionCountryPayload>;
  /** Deletes a single `EpisodesTag` using its globally unique id. */
  deleteEpisodesTagByNodeId?: Maybe<DeleteEpisodesTagPayload>;
  /** Deletes a single `EpisodesTag` using a unique key. */
  deleteEpisodesTag?: Maybe<DeleteEpisodesTagPayload>;
  /** Deletes a single `EpisodesTrailer` using its globally unique id. */
  deleteEpisodesTrailerByNodeId?: Maybe<DeleteEpisodesTrailerPayload>;
  /** Deletes a single `EpisodesTrailer` using a unique key. */
  deleteEpisodesTrailer?: Maybe<DeleteEpisodesTrailerPayload>;
  /** Deletes a single `EpisodesTvshowGenre` using its globally unique id. */
  deleteEpisodesTvshowGenreByNodeId?: Maybe<DeleteEpisodesTvshowGenrePayload>;
  /** Deletes a single `EpisodesTvshowGenre` using a unique key. */
  deleteEpisodesTvshowGenre?: Maybe<DeleteEpisodesTvshowGenrePayload>;
  /** Deletes a single `MovieGenre` using its globally unique id. */
  deleteMovieGenreByNodeId?: Maybe<DeleteMovieGenrePayload>;
  /** Deletes a single `MovieGenre` using a unique key. */
  deleteMovieGenre?: Maybe<DeleteMovieGenrePayload>;
  /** Deletes a single `Movie` using its globally unique id. */
  deleteMovieByNodeId?: Maybe<DeleteMoviePayload>;
  /** Deletes a single `Movie` using a unique key. */
  deleteMovie?: Maybe<DeleteMoviePayload>;
  /** Deletes a single `Movie` using a unique key. */
  deleteMovieByExternalId?: Maybe<DeleteMoviePayload>;
  /** Deletes a single `MoviesCast` using its globally unique id. */
  deleteMoviesCastByNodeId?: Maybe<DeleteMoviesCastPayload>;
  /** Deletes a single `MoviesCast` using a unique key. */
  deleteMoviesCast?: Maybe<DeleteMoviesCastPayload>;
  /** Deletes a single `MoviesImage` using its globally unique id. */
  deleteMoviesImageByNodeId?: Maybe<DeleteMoviesImagePayload>;
  /** Deletes a single `MoviesImage` using a unique key. */
  deleteMoviesImage?: Maybe<DeleteMoviesImagePayload>;
  /** Deletes a single `MoviesLicense` using its globally unique id. */
  deleteMoviesLicenseByNodeId?: Maybe<DeleteMoviesLicensePayload>;
  /** Deletes a single `MoviesLicense` using a unique key. */
  deleteMoviesLicense?: Maybe<DeleteMoviesLicensePayload>;
  /** Deletes a single `MoviesMovieGenre` using its globally unique id. */
  deleteMoviesMovieGenreByNodeId?: Maybe<DeleteMoviesMovieGenrePayload>;
  /** Deletes a single `MoviesMovieGenre` using a unique key. */
  deleteMoviesMovieGenre?: Maybe<DeleteMoviesMovieGenrePayload>;
  /** Deletes a single `MoviesProductionCountry` using its globally unique id. */
  deleteMoviesProductionCountryByNodeId?: Maybe<DeleteMoviesProductionCountryPayload>;
  /** Deletes a single `MoviesProductionCountry` using a unique key. */
  deleteMoviesProductionCountry?: Maybe<DeleteMoviesProductionCountryPayload>;
  /** Deletes a single `MoviesTag` using its globally unique id. */
  deleteMoviesTagByNodeId?: Maybe<DeleteMoviesTagPayload>;
  /** Deletes a single `MoviesTag` using a unique key. */
  deleteMoviesTag?: Maybe<DeleteMoviesTagPayload>;
  /** Deletes a single `MoviesTrailer` using its globally unique id. */
  deleteMoviesTrailerByNodeId?: Maybe<DeleteMoviesTrailerPayload>;
  /** Deletes a single `MoviesTrailer` using a unique key. */
  deleteMoviesTrailer?: Maybe<DeleteMoviesTrailerPayload>;
  /** Deletes a single `Season` using its globally unique id. */
  deleteSeasonByNodeId?: Maybe<DeleteSeasonPayload>;
  /** Deletes a single `Season` using a unique key. */
  deleteSeason?: Maybe<DeleteSeasonPayload>;
  /** Deletes a single `Season` using a unique key. */
  deleteSeasonByExternalId?: Maybe<DeleteSeasonPayload>;
  /** Deletes a single `SeasonsCast` using its globally unique id. */
  deleteSeasonsCastByNodeId?: Maybe<DeleteSeasonsCastPayload>;
  /** Deletes a single `SeasonsCast` using a unique key. */
  deleteSeasonsCast?: Maybe<DeleteSeasonsCastPayload>;
  /** Deletes a single `SeasonsImage` using its globally unique id. */
  deleteSeasonsImageByNodeId?: Maybe<DeleteSeasonsImagePayload>;
  /** Deletes a single `SeasonsImage` using a unique key. */
  deleteSeasonsImage?: Maybe<DeleteSeasonsImagePayload>;
  /** Deletes a single `SeasonsLicense` using its globally unique id. */
  deleteSeasonsLicenseByNodeId?: Maybe<DeleteSeasonsLicensePayload>;
  /** Deletes a single `SeasonsLicense` using a unique key. */
  deleteSeasonsLicense?: Maybe<DeleteSeasonsLicensePayload>;
  /** Deletes a single `SeasonsProductionCountry` using its globally unique id. */
  deleteSeasonsProductionCountryByNodeId?: Maybe<DeleteSeasonsProductionCountryPayload>;
  /** Deletes a single `SeasonsProductionCountry` using a unique key. */
  deleteSeasonsProductionCountry?: Maybe<DeleteSeasonsProductionCountryPayload>;
  /** Deletes a single `SeasonsTag` using its globally unique id. */
  deleteSeasonsTagByNodeId?: Maybe<DeleteSeasonsTagPayload>;
  /** Deletes a single `SeasonsTag` using a unique key. */
  deleteSeasonsTag?: Maybe<DeleteSeasonsTagPayload>;
  /** Deletes a single `SeasonsTrailer` using its globally unique id. */
  deleteSeasonsTrailerByNodeId?: Maybe<DeleteSeasonsTrailerPayload>;
  /** Deletes a single `SeasonsTrailer` using a unique key. */
  deleteSeasonsTrailer?: Maybe<DeleteSeasonsTrailerPayload>;
  /** Deletes a single `SeasonsTvshowGenre` using its globally unique id. */
  deleteSeasonsTvshowGenreByNodeId?: Maybe<DeleteSeasonsTvshowGenrePayload>;
  /** Deletes a single `SeasonsTvshowGenre` using a unique key. */
  deleteSeasonsTvshowGenre?: Maybe<DeleteSeasonsTvshowGenrePayload>;
  /** Deletes a single `TvshowGenre` using its globally unique id. */
  deleteTvshowGenreByNodeId?: Maybe<DeleteTvshowGenrePayload>;
  /** Deletes a single `TvshowGenre` using a unique key. */
  deleteTvshowGenre?: Maybe<DeleteTvshowGenrePayload>;
  /** Deletes a single `Tvshow` using its globally unique id. */
  deleteTvshowByNodeId?: Maybe<DeleteTvshowPayload>;
  /** Deletes a single `Tvshow` using a unique key. */
  deleteTvshow?: Maybe<DeleteTvshowPayload>;
  /** Deletes a single `Tvshow` using a unique key. */
  deleteTvshowByExternalId?: Maybe<DeleteTvshowPayload>;
  /** Deletes a single `TvshowsCast` using its globally unique id. */
  deleteTvshowsCastByNodeId?: Maybe<DeleteTvshowsCastPayload>;
  /** Deletes a single `TvshowsCast` using a unique key. */
  deleteTvshowsCast?: Maybe<DeleteTvshowsCastPayload>;
  /** Deletes a single `TvshowsImage` using its globally unique id. */
  deleteTvshowsImageByNodeId?: Maybe<DeleteTvshowsImagePayload>;
  /** Deletes a single `TvshowsImage` using a unique key. */
  deleteTvshowsImage?: Maybe<DeleteTvshowsImagePayload>;
  /** Deletes a single `TvshowsLicense` using its globally unique id. */
  deleteTvshowsLicenseByNodeId?: Maybe<DeleteTvshowsLicensePayload>;
  /** Deletes a single `TvshowsLicense` using a unique key. */
  deleteTvshowsLicense?: Maybe<DeleteTvshowsLicensePayload>;
  /** Deletes a single `TvshowsProductionCountry` using its globally unique id. */
  deleteTvshowsProductionCountryByNodeId?: Maybe<DeleteTvshowsProductionCountryPayload>;
  /** Deletes a single `TvshowsProductionCountry` using a unique key. */
  deleteTvshowsProductionCountry?: Maybe<DeleteTvshowsProductionCountryPayload>;
  /** Deletes a single `TvshowsTag` using its globally unique id. */
  deleteTvshowsTagByNodeId?: Maybe<DeleteTvshowsTagPayload>;
  /** Deletes a single `TvshowsTag` using a unique key. */
  deleteTvshowsTag?: Maybe<DeleteTvshowsTagPayload>;
  /** Deletes a single `TvshowsTrailer` using its globally unique id. */
  deleteTvshowsTrailerByNodeId?: Maybe<DeleteTvshowsTrailerPayload>;
  /** Deletes a single `TvshowsTrailer` using a unique key. */
  deleteTvshowsTrailer?: Maybe<DeleteTvshowsTrailerPayload>;
  /** Deletes a single `TvshowsTvshowGenre` using its globally unique id. */
  deleteTvshowsTvshowGenreByNodeId?: Maybe<DeleteTvshowsTvshowGenrePayload>;
  /** Deletes a single `TvshowsTvshowGenre` using a unique key. */
  deleteTvshowsTvshowGenre?: Maybe<DeleteTvshowsTvshowGenrePayload>;
  populateMovies?: Maybe<PopulatePayload>;
  populateTvshows?: Maybe<PopulatePayload>;
  populateCollections?: Maybe<PopulatePayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAutomaticCollectionsFilterArgs = {
  input: CreateAutomaticCollectionsFilterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCollectionRelationArgs = {
  input: CreateCollectionRelationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCollectionsImageArgs = {
  input: CreateCollectionsImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCollectionsTagArgs = {
  input: CreateCollectionsTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEpisodeArgs = {
  input: CreateEpisodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEpisodesCastArgs = {
  input: CreateEpisodesCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEpisodesImageArgs = {
  input: CreateEpisodesImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEpisodesLicenseArgs = {
  input: CreateEpisodesLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEpisodesProductionCountryArgs = {
  input: CreateEpisodesProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEpisodesTagArgs = {
  input: CreateEpisodesTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEpisodesTrailerArgs = {
  input: CreateEpisodesTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEpisodesTvshowGenreArgs = {
  input: CreateEpisodesTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMovieGenreArgs = {
  input: CreateMovieGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMovieArgs = {
  input: CreateMovieInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMoviesCastArgs = {
  input: CreateMoviesCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMoviesImageArgs = {
  input: CreateMoviesImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMoviesLicenseArgs = {
  input: CreateMoviesLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMoviesMovieGenreArgs = {
  input: CreateMoviesMovieGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMoviesProductionCountryArgs = {
  input: CreateMoviesProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMoviesTagArgs = {
  input: CreateMoviesTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMoviesTrailerArgs = {
  input: CreateMoviesTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonArgs = {
  input: CreateSeasonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonsCastArgs = {
  input: CreateSeasonsCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonsImageArgs = {
  input: CreateSeasonsImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonsLicenseArgs = {
  input: CreateSeasonsLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonsProductionCountryArgs = {
  input: CreateSeasonsProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonsTagArgs = {
  input: CreateSeasonsTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonsTrailerArgs = {
  input: CreateSeasonsTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSeasonsTvshowGenreArgs = {
  input: CreateSeasonsTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTvshowGenreArgs = {
  input: CreateTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTvshowArgs = {
  input: CreateTvshowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTvshowsCastArgs = {
  input: CreateTvshowsCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTvshowsImageArgs = {
  input: CreateTvshowsImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTvshowsLicenseArgs = {
  input: CreateTvshowsLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTvshowsProductionCountryArgs = {
  input: CreateTvshowsProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTvshowsTagArgs = {
  input: CreateTvshowsTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTvshowsTrailerArgs = {
  input: CreateTvshowsTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTvshowsTvshowGenreArgs = {
  input: CreateTvshowsTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAutomaticCollectionsFilterByNodeIdArgs = {
  input: UpdateAutomaticCollectionsFilterByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAutomaticCollectionsFilterArgs = {
  input: UpdateAutomaticCollectionsFilterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionRelationByNodeIdArgs = {
  input: UpdateCollectionRelationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionRelationArgs = {
  input: UpdateCollectionRelationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionRelationByCollectionIdAndMovieIdArgs = {
  input: UpdateCollectionRelationByCollectionIdAndMovieIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionRelationByCollectionIdAndTvshowIdArgs = {
  input: UpdateCollectionRelationByCollectionIdAndTvshowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionRelationByCollectionIdAndSeasonIdArgs = {
  input: UpdateCollectionRelationByCollectionIdAndSeasonIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionRelationByCollectionIdAndEpisodeIdArgs = {
  input: UpdateCollectionRelationByCollectionIdAndEpisodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionByNodeIdArgs = {
  input: UpdateCollectionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionByExternalIdArgs = {
  input: UpdateCollectionByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionsImageByNodeIdArgs = {
  input: UpdateCollectionsImageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionsImageArgs = {
  input: UpdateCollectionsImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionsTagByNodeIdArgs = {
  input: UpdateCollectionsTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCollectionsTagArgs = {
  input: UpdateCollectionsTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodeByNodeIdArgs = {
  input: UpdateEpisodeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodeArgs = {
  input: UpdateEpisodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodeByExternalIdArgs = {
  input: UpdateEpisodeByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesCastByNodeIdArgs = {
  input: UpdateEpisodesCastByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesCastArgs = {
  input: UpdateEpisodesCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesImageByNodeIdArgs = {
  input: UpdateEpisodesImageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesImageArgs = {
  input: UpdateEpisodesImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesLicenseByNodeIdArgs = {
  input: UpdateEpisodesLicenseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesLicenseArgs = {
  input: UpdateEpisodesLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesProductionCountryByNodeIdArgs = {
  input: UpdateEpisodesProductionCountryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesProductionCountryArgs = {
  input: UpdateEpisodesProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesTagByNodeIdArgs = {
  input: UpdateEpisodesTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesTagArgs = {
  input: UpdateEpisodesTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesTrailerByNodeIdArgs = {
  input: UpdateEpisodesTrailerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesTrailerArgs = {
  input: UpdateEpisodesTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesTvshowGenreByNodeIdArgs = {
  input: UpdateEpisodesTvshowGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpisodesTvshowGenreArgs = {
  input: UpdateEpisodesTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMovieGenreByNodeIdArgs = {
  input: UpdateMovieGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMovieGenreArgs = {
  input: UpdateMovieGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMovieByNodeIdArgs = {
  input: UpdateMovieByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMovieArgs = {
  input: UpdateMovieInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMovieByExternalIdArgs = {
  input: UpdateMovieByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesCastByNodeIdArgs = {
  input: UpdateMoviesCastByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesCastArgs = {
  input: UpdateMoviesCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesImageByNodeIdArgs = {
  input: UpdateMoviesImageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesImageArgs = {
  input: UpdateMoviesImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesLicenseByNodeIdArgs = {
  input: UpdateMoviesLicenseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesLicenseArgs = {
  input: UpdateMoviesLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesMovieGenreByNodeIdArgs = {
  input: UpdateMoviesMovieGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesMovieGenreArgs = {
  input: UpdateMoviesMovieGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesProductionCountryByNodeIdArgs = {
  input: UpdateMoviesProductionCountryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesProductionCountryArgs = {
  input: UpdateMoviesProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesTagByNodeIdArgs = {
  input: UpdateMoviesTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesTagArgs = {
  input: UpdateMoviesTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesTrailerByNodeIdArgs = {
  input: UpdateMoviesTrailerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMoviesTrailerArgs = {
  input: UpdateMoviesTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonByNodeIdArgs = {
  input: UpdateSeasonByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonArgs = {
  input: UpdateSeasonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonByExternalIdArgs = {
  input: UpdateSeasonByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsCastByNodeIdArgs = {
  input: UpdateSeasonsCastByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsCastArgs = {
  input: UpdateSeasonsCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsImageByNodeIdArgs = {
  input: UpdateSeasonsImageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsImageArgs = {
  input: UpdateSeasonsImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsLicenseByNodeIdArgs = {
  input: UpdateSeasonsLicenseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsLicenseArgs = {
  input: UpdateSeasonsLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsProductionCountryByNodeIdArgs = {
  input: UpdateSeasonsProductionCountryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsProductionCountryArgs = {
  input: UpdateSeasonsProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsTagByNodeIdArgs = {
  input: UpdateSeasonsTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsTagArgs = {
  input: UpdateSeasonsTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsTrailerByNodeIdArgs = {
  input: UpdateSeasonsTrailerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsTrailerArgs = {
  input: UpdateSeasonsTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsTvshowGenreByNodeIdArgs = {
  input: UpdateSeasonsTvshowGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSeasonsTvshowGenreArgs = {
  input: UpdateSeasonsTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowGenreByNodeIdArgs = {
  input: UpdateTvshowGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowGenreArgs = {
  input: UpdateTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowByNodeIdArgs = {
  input: UpdateTvshowByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowArgs = {
  input: UpdateTvshowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowByExternalIdArgs = {
  input: UpdateTvshowByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsCastByNodeIdArgs = {
  input: UpdateTvshowsCastByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsCastArgs = {
  input: UpdateTvshowsCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsImageByNodeIdArgs = {
  input: UpdateTvshowsImageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsImageArgs = {
  input: UpdateTvshowsImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsLicenseByNodeIdArgs = {
  input: UpdateTvshowsLicenseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsLicenseArgs = {
  input: UpdateTvshowsLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsProductionCountryByNodeIdArgs = {
  input: UpdateTvshowsProductionCountryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsProductionCountryArgs = {
  input: UpdateTvshowsProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsTagByNodeIdArgs = {
  input: UpdateTvshowsTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsTagArgs = {
  input: UpdateTvshowsTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsTrailerByNodeIdArgs = {
  input: UpdateTvshowsTrailerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsTrailerArgs = {
  input: UpdateTvshowsTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsTvshowGenreByNodeIdArgs = {
  input: UpdateTvshowsTvshowGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTvshowsTvshowGenreArgs = {
  input: UpdateTvshowsTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAutomaticCollectionsFilterByNodeIdArgs = {
  input: DeleteAutomaticCollectionsFilterByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAutomaticCollectionsFilterArgs = {
  input: DeleteAutomaticCollectionsFilterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionRelationByNodeIdArgs = {
  input: DeleteCollectionRelationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionRelationArgs = {
  input: DeleteCollectionRelationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionRelationByCollectionIdAndMovieIdArgs = {
  input: DeleteCollectionRelationByCollectionIdAndMovieIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionRelationByCollectionIdAndTvshowIdArgs = {
  input: DeleteCollectionRelationByCollectionIdAndTvshowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionRelationByCollectionIdAndSeasonIdArgs = {
  input: DeleteCollectionRelationByCollectionIdAndSeasonIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionRelationByCollectionIdAndEpisodeIdArgs = {
  input: DeleteCollectionRelationByCollectionIdAndEpisodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionByNodeIdArgs = {
  input: DeleteCollectionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionArgs = {
  input: DeleteCollectionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionByExternalIdArgs = {
  input: DeleteCollectionByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionsImageByNodeIdArgs = {
  input: DeleteCollectionsImageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionsImageArgs = {
  input: DeleteCollectionsImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionsTagByNodeIdArgs = {
  input: DeleteCollectionsTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCollectionsTagArgs = {
  input: DeleteCollectionsTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodeByNodeIdArgs = {
  input: DeleteEpisodeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodeArgs = {
  input: DeleteEpisodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodeByExternalIdArgs = {
  input: DeleteEpisodeByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesCastByNodeIdArgs = {
  input: DeleteEpisodesCastByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesCastArgs = {
  input: DeleteEpisodesCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesImageByNodeIdArgs = {
  input: DeleteEpisodesImageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesImageArgs = {
  input: DeleteEpisodesImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesLicenseByNodeIdArgs = {
  input: DeleteEpisodesLicenseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesLicenseArgs = {
  input: DeleteEpisodesLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesProductionCountryByNodeIdArgs = {
  input: DeleteEpisodesProductionCountryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesProductionCountryArgs = {
  input: DeleteEpisodesProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesTagByNodeIdArgs = {
  input: DeleteEpisodesTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesTagArgs = {
  input: DeleteEpisodesTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesTrailerByNodeIdArgs = {
  input: DeleteEpisodesTrailerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesTrailerArgs = {
  input: DeleteEpisodesTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesTvshowGenreByNodeIdArgs = {
  input: DeleteEpisodesTvshowGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpisodesTvshowGenreArgs = {
  input: DeleteEpisodesTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMovieGenreByNodeIdArgs = {
  input: DeleteMovieGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMovieGenreArgs = {
  input: DeleteMovieGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMovieByNodeIdArgs = {
  input: DeleteMovieByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMovieArgs = {
  input: DeleteMovieInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMovieByExternalIdArgs = {
  input: DeleteMovieByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesCastByNodeIdArgs = {
  input: DeleteMoviesCastByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesCastArgs = {
  input: DeleteMoviesCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesImageByNodeIdArgs = {
  input: DeleteMoviesImageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesImageArgs = {
  input: DeleteMoviesImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesLicenseByNodeIdArgs = {
  input: DeleteMoviesLicenseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesLicenseArgs = {
  input: DeleteMoviesLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesMovieGenreByNodeIdArgs = {
  input: DeleteMoviesMovieGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesMovieGenreArgs = {
  input: DeleteMoviesMovieGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesProductionCountryByNodeIdArgs = {
  input: DeleteMoviesProductionCountryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesProductionCountryArgs = {
  input: DeleteMoviesProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesTagByNodeIdArgs = {
  input: DeleteMoviesTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesTagArgs = {
  input: DeleteMoviesTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesTrailerByNodeIdArgs = {
  input: DeleteMoviesTrailerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMoviesTrailerArgs = {
  input: DeleteMoviesTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonByNodeIdArgs = {
  input: DeleteSeasonByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonArgs = {
  input: DeleteSeasonInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonByExternalIdArgs = {
  input: DeleteSeasonByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsCastByNodeIdArgs = {
  input: DeleteSeasonsCastByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsCastArgs = {
  input: DeleteSeasonsCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsImageByNodeIdArgs = {
  input: DeleteSeasonsImageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsImageArgs = {
  input: DeleteSeasonsImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsLicenseByNodeIdArgs = {
  input: DeleteSeasonsLicenseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsLicenseArgs = {
  input: DeleteSeasonsLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsProductionCountryByNodeIdArgs = {
  input: DeleteSeasonsProductionCountryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsProductionCountryArgs = {
  input: DeleteSeasonsProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsTagByNodeIdArgs = {
  input: DeleteSeasonsTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsTagArgs = {
  input: DeleteSeasonsTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsTrailerByNodeIdArgs = {
  input: DeleteSeasonsTrailerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsTrailerArgs = {
  input: DeleteSeasonsTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsTvshowGenreByNodeIdArgs = {
  input: DeleteSeasonsTvshowGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSeasonsTvshowGenreArgs = {
  input: DeleteSeasonsTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowGenreByNodeIdArgs = {
  input: DeleteTvshowGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowGenreArgs = {
  input: DeleteTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowByNodeIdArgs = {
  input: DeleteTvshowByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowArgs = {
  input: DeleteTvshowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowByExternalIdArgs = {
  input: DeleteTvshowByExternalIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsCastByNodeIdArgs = {
  input: DeleteTvshowsCastByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsCastArgs = {
  input: DeleteTvshowsCastInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsImageByNodeIdArgs = {
  input: DeleteTvshowsImageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsImageArgs = {
  input: DeleteTvshowsImageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsLicenseByNodeIdArgs = {
  input: DeleteTvshowsLicenseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsLicenseArgs = {
  input: DeleteTvshowsLicenseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsProductionCountryByNodeIdArgs = {
  input: DeleteTvshowsProductionCountryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsProductionCountryArgs = {
  input: DeleteTvshowsProductionCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsTagByNodeIdArgs = {
  input: DeleteTvshowsTagByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsTagArgs = {
  input: DeleteTvshowsTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsTrailerByNodeIdArgs = {
  input: DeleteTvshowsTrailerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsTrailerArgs = {
  input: DeleteTvshowsTrailerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsTvshowGenreByNodeIdArgs = {
  input: DeleteTvshowsTvshowGenreByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTvshowsTvshowGenreArgs = {
  input: DeleteTvshowsTvshowGenreInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationPopulateMoviesArgs = {
  input: PopulateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationPopulateTvshowsArgs = {
  input: PopulateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationPopulateCollectionsArgs = {
  input: PopulateInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
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

export enum PublishStatus {
  NotPublished = 'NOT_PUBLISHED',
  PublishProgress = 'PUBLISH_PROGRESS',
  Published = 'PUBLISHED',
  PublishError = 'PUBLISH_ERROR',
  Changed = 'CHANGED'
}

/** A filter to be used against PublishStatus fields. All fields are combined with a logical ‘and.’ */
export type PublishStatusFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<PublishStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<PublishStatus>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<PublishStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<PublishStatus>;
  /** Included in the specified list. */
  in?: Maybe<Array<PublishStatus>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<PublishStatus>>;
  /** Less than the specified value. */
  lessThan?: Maybe<PublishStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<PublishStatus>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<PublishStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<PublishStatus>;
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
  /** Reads and enables pagination through a set of `AutomaticCollectionsFilter`. */
  automaticCollectionsFilters?: Maybe<AutomaticCollectionsFiltersConnection>;
  /** Reads and enables pagination through a set of `CollectionRelation`. */
  collectionRelations?: Maybe<CollectionRelationsConnection>;
  /** Reads and enables pagination through a set of `Collection`. */
  collections?: Maybe<CollectionsConnection>;
  /** Reads and enables pagination through a set of `CollectionsImage`. */
  collectionsImages?: Maybe<CollectionsImagesConnection>;
  /** Reads and enables pagination through a set of `CollectionsTag`. */
  collectionsTags?: Maybe<CollectionsTagsConnection>;
  /** Reads and enables pagination through a set of `Episode`. */
  episodes?: Maybe<EpisodesConnection>;
  /** Reads and enables pagination through a set of `EpisodesCast`. */
  episodesCasts?: Maybe<EpisodesCastsConnection>;
  /** Reads and enables pagination through a set of `EpisodesImage`. */
  episodesImages?: Maybe<EpisodesImagesConnection>;
  /** Reads and enables pagination through a set of `EpisodesLicense`. */
  episodesLicenses?: Maybe<EpisodesLicensesConnection>;
  /** Reads and enables pagination through a set of `EpisodesProductionCountry`. */
  episodesProductionCountries?: Maybe<EpisodesProductionCountriesConnection>;
  /** Reads and enables pagination through a set of `EpisodesTag`. */
  episodesTags?: Maybe<EpisodesTagsConnection>;
  /** Reads and enables pagination through a set of `EpisodesTrailer`. */
  episodesTrailers?: Maybe<EpisodesTrailersConnection>;
  /** Reads and enables pagination through a set of `EpisodesTvshowGenre`. */
  episodesTvshowGenres?: Maybe<EpisodesTvshowGenresConnection>;
  /** Reads and enables pagination through a set of `MovieGenre`. */
  movieGenres?: Maybe<MovieGenresConnection>;
  /** Reads and enables pagination through a set of `Movie`. */
  movies?: Maybe<MoviesConnection>;
  /** Reads and enables pagination through a set of `MoviesCast`. */
  moviesCasts?: Maybe<MoviesCastsConnection>;
  /** Reads and enables pagination through a set of `MoviesImage`. */
  moviesImages?: Maybe<MoviesImagesConnection>;
  /** Reads and enables pagination through a set of `MoviesLicense`. */
  moviesLicenses?: Maybe<MoviesLicensesConnection>;
  /** Reads and enables pagination through a set of `MoviesMovieGenre`. */
  moviesMovieGenres?: Maybe<MoviesMovieGenresConnection>;
  /** Reads and enables pagination through a set of `MoviesProductionCountry`. */
  moviesProductionCountries?: Maybe<MoviesProductionCountriesConnection>;
  /** Reads and enables pagination through a set of `MoviesTag`. */
  moviesTags?: Maybe<MoviesTagsConnection>;
  /** Reads and enables pagination through a set of `MoviesTrailer`. */
  moviesTrailers?: Maybe<MoviesTrailersConnection>;
  /** Reads and enables pagination through a set of `Season`. */
  seasons?: Maybe<SeasonsConnection>;
  /** Reads and enables pagination through a set of `SeasonsCast`. */
  seasonsCasts?: Maybe<SeasonsCastsConnection>;
  /** Reads and enables pagination through a set of `SeasonsImage`. */
  seasonsImages?: Maybe<SeasonsImagesConnection>;
  /** Reads and enables pagination through a set of `SeasonsLicense`. */
  seasonsLicenses?: Maybe<SeasonsLicensesConnection>;
  /** Reads and enables pagination through a set of `SeasonsProductionCountry`. */
  seasonsProductionCountries?: Maybe<SeasonsProductionCountriesConnection>;
  /** Reads and enables pagination through a set of `SeasonsTag`. */
  seasonsTags?: Maybe<SeasonsTagsConnection>;
  /** Reads and enables pagination through a set of `SeasonsTrailer`. */
  seasonsTrailers?: Maybe<SeasonsTrailersConnection>;
  /** Reads and enables pagination through a set of `SeasonsTvshowGenre`. */
  seasonsTvshowGenres?: Maybe<SeasonsTvshowGenresConnection>;
  /** Reads and enables pagination through a set of `TvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenresConnection>;
  /** Reads and enables pagination through a set of `Tvshow`. */
  tvshows?: Maybe<TvshowsConnection>;
  /** Reads and enables pagination through a set of `TvshowsCast`. */
  tvshowsCasts?: Maybe<TvshowsCastsConnection>;
  /** Reads and enables pagination through a set of `TvshowsImage`. */
  tvshowsImages?: Maybe<TvshowsImagesConnection>;
  /** Reads and enables pagination through a set of `TvshowsLicense`. */
  tvshowsLicenses?: Maybe<TvshowsLicensesConnection>;
  /** Reads and enables pagination through a set of `TvshowsProductionCountry`. */
  tvshowsProductionCountries?: Maybe<TvshowsProductionCountriesConnection>;
  /** Reads and enables pagination through a set of `TvshowsTag`. */
  tvshowsTags?: Maybe<TvshowsTagsConnection>;
  /** Reads and enables pagination through a set of `TvshowsTrailer`. */
  tvshowsTrailers?: Maybe<TvshowsTrailersConnection>;
  /** Reads and enables pagination through a set of `TvshowsTvshowGenre`. */
  tvshowsTvshowGenres?: Maybe<TvshowsTvshowGenresConnection>;
  automaticCollectionsFilter?: Maybe<AutomaticCollectionsFilter>;
  collectionRelation?: Maybe<CollectionRelation>;
  collectionRelationByCollectionIdAndMovieId?: Maybe<CollectionRelation>;
  collectionRelationByCollectionIdAndTvshowId?: Maybe<CollectionRelation>;
  collectionRelationByCollectionIdAndSeasonId?: Maybe<CollectionRelation>;
  collectionRelationByCollectionIdAndEpisodeId?: Maybe<CollectionRelation>;
  collection?: Maybe<Collection>;
  collectionByExternalId?: Maybe<Collection>;
  collectionsImage?: Maybe<CollectionsImage>;
  collectionsTag?: Maybe<CollectionsTag>;
  episode?: Maybe<Episode>;
  episodeByExternalId?: Maybe<Episode>;
  episodesCast?: Maybe<EpisodesCast>;
  episodesImage?: Maybe<EpisodesImage>;
  episodesLicense?: Maybe<EpisodesLicense>;
  episodesProductionCountry?: Maybe<EpisodesProductionCountry>;
  episodesTag?: Maybe<EpisodesTag>;
  episodesTrailer?: Maybe<EpisodesTrailer>;
  episodesTvshowGenre?: Maybe<EpisodesTvshowGenre>;
  movieGenre?: Maybe<MovieGenre>;
  movie?: Maybe<Movie>;
  movieByExternalId?: Maybe<Movie>;
  moviesCast?: Maybe<MoviesCast>;
  moviesImage?: Maybe<MoviesImage>;
  moviesLicense?: Maybe<MoviesLicense>;
  moviesMovieGenre?: Maybe<MoviesMovieGenre>;
  moviesProductionCountry?: Maybe<MoviesProductionCountry>;
  moviesTag?: Maybe<MoviesTag>;
  moviesTrailer?: Maybe<MoviesTrailer>;
  season?: Maybe<Season>;
  seasonByExternalId?: Maybe<Season>;
  seasonsCast?: Maybe<SeasonsCast>;
  seasonsImage?: Maybe<SeasonsImage>;
  seasonsLicense?: Maybe<SeasonsLicense>;
  seasonsProductionCountry?: Maybe<SeasonsProductionCountry>;
  seasonsTag?: Maybe<SeasonsTag>;
  seasonsTrailer?: Maybe<SeasonsTrailer>;
  seasonsTvshowGenre?: Maybe<SeasonsTvshowGenre>;
  tvshowGenre?: Maybe<TvshowGenre>;
  tvshow?: Maybe<Tvshow>;
  tvshowByExternalId?: Maybe<Tvshow>;
  tvshowsCast?: Maybe<TvshowsCast>;
  tvshowsImage?: Maybe<TvshowsImage>;
  tvshowsLicense?: Maybe<TvshowsLicense>;
  tvshowsProductionCountry?: Maybe<TvshowsProductionCountry>;
  tvshowsTag?: Maybe<TvshowsTag>;
  tvshowsTrailer?: Maybe<TvshowsTrailer>;
  tvshowsTvshowGenre?: Maybe<TvshowsTvshowGenre>;
  getCollectionEntityValues: GetCollectionEntityValuesConnection;
  getCollectionImageTypeValues: GetCollectionImageTypeValuesConnection;
  getCollectionTypeValues: GetCollectionTypeValuesConnection;
  getEpisodeImageTypeValues: GetEpisodeImageTypeValuesConnection;
  getIsoAlphaThreeCountryCodesValues: GetIsoAlphaThreeCountryCodesValuesConnection;
  getMovieImageTypeValues: GetMovieImageTypeValuesConnection;
  getPublishStatusValues: GetPublishStatusValuesConnection;
  getSeasonImageTypeValues: GetSeasonImageTypeValuesConnection;
  getTvshowImageTypeValues: GetTvshowImageTypeValuesConnection;
  /** Reads a single `AutomaticCollectionsFilter` using its globally unique `ID`. */
  automaticCollectionsFilterByNodeId?: Maybe<AutomaticCollectionsFilter>;
  /** Reads a single `CollectionRelation` using its globally unique `ID`. */
  collectionRelationByNodeId?: Maybe<CollectionRelation>;
  /** Reads a single `Collection` using its globally unique `ID`. */
  collectionByNodeId?: Maybe<Collection>;
  /** Reads a single `CollectionsImage` using its globally unique `ID`. */
  collectionsImageByNodeId?: Maybe<CollectionsImage>;
  /** Reads a single `CollectionsTag` using its globally unique `ID`. */
  collectionsTagByNodeId?: Maybe<CollectionsTag>;
  /** Reads a single `Episode` using its globally unique `ID`. */
  episodeByNodeId?: Maybe<Episode>;
  /** Reads a single `EpisodesCast` using its globally unique `ID`. */
  episodesCastByNodeId?: Maybe<EpisodesCast>;
  /** Reads a single `EpisodesImage` using its globally unique `ID`. */
  episodesImageByNodeId?: Maybe<EpisodesImage>;
  /** Reads a single `EpisodesLicense` using its globally unique `ID`. */
  episodesLicenseByNodeId?: Maybe<EpisodesLicense>;
  /** Reads a single `EpisodesProductionCountry` using its globally unique `ID`. */
  episodesProductionCountryByNodeId?: Maybe<EpisodesProductionCountry>;
  /** Reads a single `EpisodesTag` using its globally unique `ID`. */
  episodesTagByNodeId?: Maybe<EpisodesTag>;
  /** Reads a single `EpisodesTrailer` using its globally unique `ID`. */
  episodesTrailerByNodeId?: Maybe<EpisodesTrailer>;
  /** Reads a single `EpisodesTvshowGenre` using its globally unique `ID`. */
  episodesTvshowGenreByNodeId?: Maybe<EpisodesTvshowGenre>;
  /** Reads a single `MovieGenre` using its globally unique `ID`. */
  movieGenreByNodeId?: Maybe<MovieGenre>;
  /** Reads a single `Movie` using its globally unique `ID`. */
  movieByNodeId?: Maybe<Movie>;
  /** Reads a single `MoviesCast` using its globally unique `ID`. */
  moviesCastByNodeId?: Maybe<MoviesCast>;
  /** Reads a single `MoviesImage` using its globally unique `ID`. */
  moviesImageByNodeId?: Maybe<MoviesImage>;
  /** Reads a single `MoviesLicense` using its globally unique `ID`. */
  moviesLicenseByNodeId?: Maybe<MoviesLicense>;
  /** Reads a single `MoviesMovieGenre` using its globally unique `ID`. */
  moviesMovieGenreByNodeId?: Maybe<MoviesMovieGenre>;
  /** Reads a single `MoviesProductionCountry` using its globally unique `ID`. */
  moviesProductionCountryByNodeId?: Maybe<MoviesProductionCountry>;
  /** Reads a single `MoviesTag` using its globally unique `ID`. */
  moviesTagByNodeId?: Maybe<MoviesTag>;
  /** Reads a single `MoviesTrailer` using its globally unique `ID`. */
  moviesTrailerByNodeId?: Maybe<MoviesTrailer>;
  /** Reads a single `Season` using its globally unique `ID`. */
  seasonByNodeId?: Maybe<Season>;
  /** Reads a single `SeasonsCast` using its globally unique `ID`. */
  seasonsCastByNodeId?: Maybe<SeasonsCast>;
  /** Reads a single `SeasonsImage` using its globally unique `ID`. */
  seasonsImageByNodeId?: Maybe<SeasonsImage>;
  /** Reads a single `SeasonsLicense` using its globally unique `ID`. */
  seasonsLicenseByNodeId?: Maybe<SeasonsLicense>;
  /** Reads a single `SeasonsProductionCountry` using its globally unique `ID`. */
  seasonsProductionCountryByNodeId?: Maybe<SeasonsProductionCountry>;
  /** Reads a single `SeasonsTag` using its globally unique `ID`. */
  seasonsTagByNodeId?: Maybe<SeasonsTag>;
  /** Reads a single `SeasonsTrailer` using its globally unique `ID`. */
  seasonsTrailerByNodeId?: Maybe<SeasonsTrailer>;
  /** Reads a single `SeasonsTvshowGenre` using its globally unique `ID`. */
  seasonsTvshowGenreByNodeId?: Maybe<SeasonsTvshowGenre>;
  /** Reads a single `TvshowGenre` using its globally unique `ID`. */
  tvshowGenreByNodeId?: Maybe<TvshowGenre>;
  /** Reads a single `Tvshow` using its globally unique `ID`. */
  tvshowByNodeId?: Maybe<Tvshow>;
  /** Reads a single `TvshowsCast` using its globally unique `ID`. */
  tvshowsCastByNodeId?: Maybe<TvshowsCast>;
  /** Reads a single `TvshowsImage` using its globally unique `ID`. */
  tvshowsImageByNodeId?: Maybe<TvshowsImage>;
  /** Reads a single `TvshowsLicense` using its globally unique `ID`. */
  tvshowsLicenseByNodeId?: Maybe<TvshowsLicense>;
  /** Reads a single `TvshowsProductionCountry` using its globally unique `ID`. */
  tvshowsProductionCountryByNodeId?: Maybe<TvshowsProductionCountry>;
  /** Reads a single `TvshowsTag` using its globally unique `ID`. */
  tvshowsTagByNodeId?: Maybe<TvshowsTag>;
  /** Reads a single `TvshowsTrailer` using its globally unique `ID`. */
  tvshowsTrailerByNodeId?: Maybe<TvshowsTrailer>;
  /** Reads a single `TvshowsTvshowGenre` using its globally unique `ID`. */
  tvshowsTvshowGenreByNodeId?: Maybe<TvshowsTvshowGenre>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAutomaticCollectionsFiltersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AutomaticCollectionsFiltersOrderBy>>;
  condition?: Maybe<AutomaticCollectionsFilterCondition>;
  filter?: Maybe<AutomaticCollectionsFilterFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionRelationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionRelationsOrderBy>>;
  condition?: Maybe<CollectionRelationCondition>;
  filter?: Maybe<CollectionRelationFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionsOrderBy>>;
  condition?: Maybe<CollectionCondition>;
  filter?: Maybe<CollectionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionsImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionsImagesOrderBy>>;
  condition?: Maybe<CollectionsImageCondition>;
  filter?: Maybe<CollectionsImageFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionsTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionsTagsOrderBy>>;
  condition?: Maybe<CollectionsTagCondition>;
  filter?: Maybe<CollectionsTagFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesOrderBy>>;
  condition?: Maybe<EpisodeCondition>;
  filter?: Maybe<EpisodeFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesCastsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesCastsOrderBy>>;
  condition?: Maybe<EpisodesCastCondition>;
  filter?: Maybe<EpisodesCastFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesImagesOrderBy>>;
  condition?: Maybe<EpisodesImageCondition>;
  filter?: Maybe<EpisodesImageFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesLicensesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesLicensesOrderBy>>;
  condition?: Maybe<EpisodesLicenseCondition>;
  filter?: Maybe<EpisodesLicenseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesProductionCountriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesProductionCountriesOrderBy>>;
  condition?: Maybe<EpisodesProductionCountryCondition>;
  filter?: Maybe<EpisodesProductionCountryFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesTagsOrderBy>>;
  condition?: Maybe<EpisodesTagCondition>;
  filter?: Maybe<EpisodesTagFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesTrailersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesTrailersOrderBy>>;
  condition?: Maybe<EpisodesTrailerCondition>;
  filter?: Maybe<EpisodesTrailerFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesTvshowGenresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesTvshowGenresOrderBy>>;
  condition?: Maybe<EpisodesTvshowGenreCondition>;
  filter?: Maybe<EpisodesTvshowGenreFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMovieGenresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MovieGenresOrderBy>>;
  condition?: Maybe<MovieGenreCondition>;
  filter?: Maybe<MovieGenreFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesOrderBy>>;
  condition?: Maybe<MovieCondition>;
  filter?: Maybe<MovieFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesCastsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesCastsOrderBy>>;
  condition?: Maybe<MoviesCastCondition>;
  filter?: Maybe<MoviesCastFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesImagesOrderBy>>;
  condition?: Maybe<MoviesImageCondition>;
  filter?: Maybe<MoviesImageFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesLicensesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesLicensesOrderBy>>;
  condition?: Maybe<MoviesLicenseCondition>;
  filter?: Maybe<MoviesLicenseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesMovieGenresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesMovieGenresOrderBy>>;
  condition?: Maybe<MoviesMovieGenreCondition>;
  filter?: Maybe<MoviesMovieGenreFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesProductionCountriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesProductionCountriesOrderBy>>;
  condition?: Maybe<MoviesProductionCountryCondition>;
  filter?: Maybe<MoviesProductionCountryFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesTagsOrderBy>>;
  condition?: Maybe<MoviesTagCondition>;
  filter?: Maybe<MoviesTagFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesTrailersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MoviesTrailersOrderBy>>;
  condition?: Maybe<MoviesTrailerCondition>;
  filter?: Maybe<MoviesTrailerFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsOrderBy>>;
  condition?: Maybe<SeasonCondition>;
  filter?: Maybe<SeasonFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsCastsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsCastsOrderBy>>;
  condition?: Maybe<SeasonsCastCondition>;
  filter?: Maybe<SeasonsCastFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsImagesOrderBy>>;
  condition?: Maybe<SeasonsImageCondition>;
  filter?: Maybe<SeasonsImageFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsLicensesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsLicensesOrderBy>>;
  condition?: Maybe<SeasonsLicenseCondition>;
  filter?: Maybe<SeasonsLicenseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsProductionCountriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsProductionCountriesOrderBy>>;
  condition?: Maybe<SeasonsProductionCountryCondition>;
  filter?: Maybe<SeasonsProductionCountryFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsTagsOrderBy>>;
  condition?: Maybe<SeasonsTagCondition>;
  filter?: Maybe<SeasonsTagFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsTrailersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsTrailersOrderBy>>;
  condition?: Maybe<SeasonsTrailerCondition>;
  filter?: Maybe<SeasonsTrailerFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsTvshowGenresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsTvshowGenresOrderBy>>;
  condition?: Maybe<SeasonsTvshowGenreCondition>;
  filter?: Maybe<SeasonsTvshowGenreFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowGenresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowGenresOrderBy>>;
  condition?: Maybe<TvshowGenreCondition>;
  filter?: Maybe<TvshowGenreFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsOrderBy>>;
  condition?: Maybe<TvshowCondition>;
  filter?: Maybe<TvshowFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsCastsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsCastsOrderBy>>;
  condition?: Maybe<TvshowsCastCondition>;
  filter?: Maybe<TvshowsCastFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsImagesOrderBy>>;
  condition?: Maybe<TvshowsImageCondition>;
  filter?: Maybe<TvshowsImageFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsLicensesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsLicensesOrderBy>>;
  condition?: Maybe<TvshowsLicenseCondition>;
  filter?: Maybe<TvshowsLicenseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsProductionCountriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsProductionCountriesOrderBy>>;
  condition?: Maybe<TvshowsProductionCountryCondition>;
  filter?: Maybe<TvshowsProductionCountryFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsTagsOrderBy>>;
  condition?: Maybe<TvshowsTagCondition>;
  filter?: Maybe<TvshowsTagFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsTrailersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsTrailersOrderBy>>;
  condition?: Maybe<TvshowsTrailerCondition>;
  filter?: Maybe<TvshowsTrailerFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsTvshowGenresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsTvshowGenresOrderBy>>;
  condition?: Maybe<TvshowsTvshowGenreCondition>;
  filter?: Maybe<TvshowsTvshowGenreFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAutomaticCollectionsFilterArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionRelationArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionRelationByCollectionIdAndMovieIdArgs = {
  collectionId: Scalars['Int'];
  movieId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionRelationByCollectionIdAndTvshowIdArgs = {
  collectionId: Scalars['Int'];
  tvshowId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionRelationByCollectionIdAndSeasonIdArgs = {
  collectionId: Scalars['Int'];
  seasonId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionRelationByCollectionIdAndEpisodeIdArgs = {
  collectionId: Scalars['Int'];
  episodeId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionByExternalIdArgs = {
  externalId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionsImageArgs = {
  collectionId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: CollectionImageType;
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionsTagArgs = {
  collectionId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodeArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodeByExternalIdArgs = {
  externalId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesCastArgs = {
  episodeId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesImageArgs = {
  episodeId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: EpisodeImageType;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesLicenseArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesProductionCountryArgs = {
  episodeId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesTagArgs = {
  episodeId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesTrailerArgs = {
  episodeId: Scalars['Int'];
  videoId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesTvshowGenreArgs = {
  episodeId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMovieGenreArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMovieArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMovieByExternalIdArgs = {
  externalId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesCastArgs = {
  movieId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesImageArgs = {
  movieId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: MovieImageType;
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesLicenseArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesMovieGenreArgs = {
  movieId: Scalars['Int'];
  movieGenresId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesProductionCountryArgs = {
  movieId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesTagArgs = {
  movieId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesTrailerArgs = {
  movieId: Scalars['Int'];
  videoId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonByExternalIdArgs = {
  externalId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsCastArgs = {
  seasonId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsImageArgs = {
  seasonId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: SeasonImageType;
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsLicenseArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsProductionCountryArgs = {
  seasonId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsTagArgs = {
  seasonId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsTrailerArgs = {
  seasonId: Scalars['Int'];
  videoId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsTvshowGenreArgs = {
  seasonId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowGenreArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowByExternalIdArgs = {
  externalId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsCastArgs = {
  tvshowId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsImageArgs = {
  tvshowId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: TvshowImageType;
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsLicenseArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsProductionCountryArgs = {
  tvshowId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsTagArgs = {
  tvshowId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsTrailerArgs = {
  tvshowId: Scalars['Int'];
  videoId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsTvshowGenreArgs = {
  tvshowId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGetCollectionEntityValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<CollectionEntityFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetCollectionImageTypeValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<CollectionImageTypeFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetCollectionTypeValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<CollectionTypeFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetEpisodeImageTypeValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<EpisodeImageTypeFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetIsoAlphaThreeCountryCodesValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetMovieImageTypeValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<MovieImageTypeFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetPublishStatusValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<PublishStatusFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetSeasonImageTypeValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<SeasonImageTypeFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetTvshowImageTypeValuesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<TvshowImageTypeFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAutomaticCollectionsFilterByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionRelationByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionsImageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCollectionsTagByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodeByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesCastByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesImageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesLicenseByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesProductionCountryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesTagByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesTrailerByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpisodesTvshowGenreByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMovieGenreByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMovieByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesCastByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesImageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesLicenseByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesMovieGenreByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesProductionCountryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesTagByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMoviesTrailerByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsCastByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsImageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsLicenseByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsProductionCountryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsTagByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsTrailerByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySeasonsTvshowGenreByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowGenreByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsCastByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsImageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsLicenseByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsProductionCountryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsTagByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsTrailerByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTvshowsTvshowGenreByNodeIdArgs = {
  nodeId: Scalars['ID'];
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type Season = Node & {
  __typename?: 'Season';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  tvshowId?: Maybe<Scalars['Int']>;
  index: Scalars['Int'];
  externalId?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
  publishStatus?: Maybe<PublishStatus>;
  publishedDate?: Maybe<Scalars['Datetime']>;
  publishedUser?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads a single `Tvshow` that is related to this `Season`. */
  tvshow?: Maybe<Tvshow>;
  /** Reads and enables pagination through a set of `SeasonsTag`. */
  seasonsTags: SeasonsTagsConnection;
  /** Reads and enables pagination through a set of `SeasonsCast`. */
  seasonsCasts: SeasonsCastsConnection;
  /** Reads and enables pagination through a set of `SeasonsLicense`. */
  seasonsLicenses: SeasonsLicensesConnection;
  /** Reads and enables pagination through a set of `SeasonsProductionCountry`. */
  seasonsProductionCountries: SeasonsProductionCountriesConnection;
  /** Reads and enables pagination through a set of `SeasonsTvshowGenre`. */
  seasonsTvshowGenres: SeasonsTvshowGenresConnection;
  /** Reads and enables pagination through a set of `SeasonsImage`. */
  seasonsImages: SeasonsImagesConnection;
  /** Reads and enables pagination through a set of `SeasonsTrailer`. */
  seasonsTrailers: SeasonsTrailersConnection;
  /** Reads and enables pagination through a set of `Episode`. */
  episodes: EpisodesConnection;
  /** Reads and enables pagination through a set of `CollectionRelation`. */
  collectionRelations: CollectionRelationsConnection;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonSeasonsTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsTagsOrderBy>>;
  condition?: Maybe<SeasonsTagCondition>;
  filter?: Maybe<SeasonsTagFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonSeasonsCastsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsCastsOrderBy>>;
  condition?: Maybe<SeasonsCastCondition>;
  filter?: Maybe<SeasonsCastFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonSeasonsLicensesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsLicensesOrderBy>>;
  condition?: Maybe<SeasonsLicenseCondition>;
  filter?: Maybe<SeasonsLicenseFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonSeasonsProductionCountriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsProductionCountriesOrderBy>>;
  condition?: Maybe<SeasonsProductionCountryCondition>;
  filter?: Maybe<SeasonsProductionCountryFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonSeasonsTvshowGenresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsTvshowGenresOrderBy>>;
  condition?: Maybe<SeasonsTvshowGenreCondition>;
  filter?: Maybe<SeasonsTvshowGenreFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonSeasonsImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsImagesOrderBy>>;
  condition?: Maybe<SeasonsImageCondition>;
  filter?: Maybe<SeasonsImageFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonSeasonsTrailersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsTrailersOrderBy>>;
  condition?: Maybe<SeasonsTrailerCondition>;
  filter?: Maybe<SeasonsTrailerFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonEpisodesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesOrderBy>>;
  condition?: Maybe<EpisodeCondition>;
  filter?: Maybe<EpisodeFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonCollectionRelationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionRelationsOrderBy>>;
  condition?: Maybe<CollectionRelationCondition>;
  filter?: Maybe<CollectionRelationFilter>;
};

/** A condition to be used against `Season` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SeasonCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `tvshowId` field. */
  tvshowId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `index` field. */
  index?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `externalId` field. */
  externalId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `synopsis` field. */
  synopsis?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `studio` field. */
  studio?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `released` field. */
  released?: Maybe<Scalars['Date']>;
  /** Checks for equality with the object’s `publishStatus` field. */
  publishStatus?: Maybe<PublishStatus>;
  /** Checks for equality with the object’s `publishedDate` field. */
  publishedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `publishedUser` field. */
  publishedUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Season` object types. All fields are combined with a logical ‘and.’ */
export type SeasonFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `tvshowId` field. */
  tvshowId?: Maybe<IntFilter>;
  /** Filter by the object’s `index` field. */
  index?: Maybe<IntFilter>;
  /** Filter by the object’s `externalId` field. */
  externalId?: Maybe<StringFilter>;
  /** Filter by the object’s `synopsis` field. */
  synopsis?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `studio` field. */
  studio?: Maybe<StringFilter>;
  /** Filter by the object’s `released` field. */
  released?: Maybe<DateFilter>;
  /** Filter by the object’s `publishStatus` field. */
  publishStatus?: Maybe<PublishStatusFilter>;
  /** Filter by the object’s `publishedDate` field. */
  publishedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `publishedUser` field. */
  publishedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `seasonsTags` relation. */
  seasonsTags?: Maybe<SeasonToManySeasonsTagFilter>;
  /** Some related `seasonsTags` exist. */
  seasonsTagsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `seasonsCasts` relation. */
  seasonsCasts?: Maybe<SeasonToManySeasonsCastFilter>;
  /** Some related `seasonsCasts` exist. */
  seasonsCastsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `seasonsLicenses` relation. */
  seasonsLicenses?: Maybe<SeasonToManySeasonsLicenseFilter>;
  /** Some related `seasonsLicenses` exist. */
  seasonsLicensesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `seasonsProductionCountries` relation. */
  seasonsProductionCountries?: Maybe<SeasonToManySeasonsProductionCountryFilter>;
  /** Some related `seasonsProductionCountries` exist. */
  seasonsProductionCountriesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `seasonsTvshowGenres` relation. */
  seasonsTvshowGenres?: Maybe<SeasonToManySeasonsTvshowGenreFilter>;
  /** Some related `seasonsTvshowGenres` exist. */
  seasonsTvshowGenresExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `seasonsImages` relation. */
  seasonsImages?: Maybe<SeasonToManySeasonsImageFilter>;
  /** Some related `seasonsImages` exist. */
  seasonsImagesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `seasonsTrailers` relation. */
  seasonsTrailers?: Maybe<SeasonToManySeasonsTrailerFilter>;
  /** Some related `seasonsTrailers` exist. */
  seasonsTrailersExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `episodes` relation. */
  episodes?: Maybe<SeasonToManyEpisodeFilter>;
  /** Some related `episodes` exist. */
  episodesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `collectionRelations` relation. */
  collectionRelations?: Maybe<SeasonToManyCollectionRelationFilter>;
  /** Some related `collectionRelations` exist. */
  collectionRelationsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `tvshow` relation. */
  tvshow?: Maybe<TvshowFilter>;
  /** A related `tvshow` exists. */
  tvshowExists?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SeasonFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SeasonFilter>>;
  /** Negates the expression. */
  not?: Maybe<SeasonFilter>;
};

export enum SeasonImageType {
  Cover = 'COVER',
  Teaser = 'TEASER'
}

/** A filter to be used against SeasonImageType fields. All fields are combined with a logical ‘and.’ */
export type SeasonImageTypeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<SeasonImageType>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<SeasonImageType>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<SeasonImageType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<SeasonImageType>;
  /** Included in the specified list. */
  in?: Maybe<Array<SeasonImageType>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<SeasonImageType>>;
  /** Less than the specified value. */
  lessThan?: Maybe<SeasonImageType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<SeasonImageType>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<SeasonImageType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<SeasonImageType>;
};

/** An input for mutations affecting `Season` */
export type SeasonInput = {
  tvshowId?: Maybe<Scalars['Int']>;
  index: Scalars['Int'];
  externalId?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
};

/** Represents an update to a `Season`. Fields that are set will be updated. */
export type SeasonPatch = {
  tvshowId?: Maybe<Scalars['Int']>;
  index?: Maybe<Scalars['Int']>;
  externalId?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
  publishStatus?: Maybe<PublishStatus>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonsCast = Node & {
  __typename?: 'SeasonsCast';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  seasonId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Season` that is related to this `SeasonsCast`. */
  season?: Maybe<Season>;
};

/**
 * A condition to be used against `SeasonsCast` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type SeasonsCastCondition = {
  /** Checks for equality with the object’s `seasonId` field. */
  seasonId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `SeasonsCast` object types. All fields are combined with a logical ‘and.’ */
export type SeasonsCastFilter = {
  /** Filter by the object’s `seasonId` field. */
  seasonId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `season` relation. */
  season?: Maybe<SeasonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SeasonsCastFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SeasonsCastFilter>>;
  /** Negates the expression. */
  not?: Maybe<SeasonsCastFilter>;
};

/** An input for mutations affecting `SeasonsCast` */
export type SeasonsCastInput = {
  seasonId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `SeasonsCast`. Fields that are set will be updated. */
export type SeasonsCastPatch = {
  seasonId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `SeasonsCast` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type SeasonsCastsConnection = {
  __typename?: 'SeasonsCastsConnection';
  /** A list of `SeasonsCast` objects. */
  nodes: Array<Maybe<SeasonsCast>>;
  /** A list of edges which contains the `SeasonsCast` and cursor to aid in pagination. */
  edges: Array<SeasonsCastsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonsCast` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SeasonsCast` edge in the connection. */
export type SeasonsCastsEdge = {
  __typename?: 'SeasonsCastsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SeasonsCast` at the end of the edge. */
  node?: Maybe<SeasonsCast>;
};

/** Methods to use when ordering `SeasonsCast`. */
export enum SeasonsCastsOrderBy {
  Natural = 'NATURAL',
  SeasonIdAsc = 'SEASON_ID_ASC',
  SeasonIdDesc = 'SEASON_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A connection to a list of `Season` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type SeasonsConnection = {
  __typename?: 'SeasonsConnection';
  /** A list of `Season` objects. */
  nodes: Array<Maybe<Season>>;
  /** A list of edges which contains the `Season` and cursor to aid in pagination. */
  edges: Array<SeasonsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Season` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Season` edge in the connection. */
export type SeasonsEdge = {
  __typename?: 'SeasonsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Season` at the end of the edge. */
  node?: Maybe<Season>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonsImage = Node & {
  __typename?: 'SeasonsImage';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  seasonId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: SeasonImageType;
  /** Reads a single `Season` that is related to this `SeasonsImage`. */
  season?: Maybe<Season>;
};

/**
 * A condition to be used against `SeasonsImage` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SeasonsImageCondition = {
  /** Checks for equality with the object’s `seasonId` field. */
  seasonId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageId` field. */
  imageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageType` field. */
  imageType?: Maybe<SeasonImageType>;
};

/** A filter to be used against `SeasonsImage` object types. All fields are combined with a logical ‘and.’ */
export type SeasonsImageFilter = {
  /** Filter by the object’s `seasonId` field. */
  seasonId?: Maybe<IntFilter>;
  /** Filter by the object’s `imageId` field. */
  imageId?: Maybe<IntFilter>;
  /** Filter by the object’s `imageType` field. */
  imageType?: Maybe<SeasonImageTypeFilter>;
  /** Filter by the object’s `season` relation. */
  season?: Maybe<SeasonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SeasonsImageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SeasonsImageFilter>>;
  /** Negates the expression. */
  not?: Maybe<SeasonsImageFilter>;
};

/** An input for mutations affecting `SeasonsImage` */
export type SeasonsImageInput = {
  seasonId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: SeasonImageType;
};

/** Represents an update to a `SeasonsImage`. Fields that are set will be updated. */
export type SeasonsImagePatch = {
  seasonId?: Maybe<Scalars['Int']>;
  imageId?: Maybe<Scalars['Int']>;
  imageType?: Maybe<SeasonImageType>;
};

/**
 * A connection to a list of `SeasonsImage` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type SeasonsImagesConnection = {
  __typename?: 'SeasonsImagesConnection';
  /** A list of `SeasonsImage` objects. */
  nodes: Array<Maybe<SeasonsImage>>;
  /** A list of edges which contains the `SeasonsImage` and cursor to aid in pagination. */
  edges: Array<SeasonsImagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonsImage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SeasonsImage` edge in the connection. */
export type SeasonsImagesEdge = {
  __typename?: 'SeasonsImagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SeasonsImage` at the end of the edge. */
  node?: Maybe<SeasonsImage>;
};

/** Methods to use when ordering `SeasonsImage`. */
export enum SeasonsImagesOrderBy {
  Natural = 'NATURAL',
  SeasonIdAsc = 'SEASON_ID_ASC',
  SeasonIdDesc = 'SEASON_ID_DESC',
  ImageIdAsc = 'IMAGE_ID_ASC',
  ImageIdDesc = 'IMAGE_ID_DESC',
  ImageTypeAsc = 'IMAGE_TYPE_ASC',
  ImageTypeDesc = 'IMAGE_TYPE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonsLicense = Node & {
  __typename?: 'SeasonsLicense';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  seasonId: Scalars['Int'];
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads a single `Season` that is related to this `SeasonsLicense`. */
  season?: Maybe<Season>;
};

/**
 * A condition to be used against `SeasonsLicense` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SeasonsLicenseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `seasonId` field. */
  seasonId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `licenseStart` field. */
  licenseStart?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `licenseEnd` field. */
  licenseEnd?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `countries` field. */
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `SeasonsLicense` object types. All fields are combined with a logical ‘and.’ */
export type SeasonsLicenseFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `seasonId` field. */
  seasonId?: Maybe<IntFilter>;
  /** Filter by the object’s `licenseStart` field. */
  licenseStart?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `licenseEnd` field. */
  licenseEnd?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `countries` field. */
  countries?: Maybe<IsoAlphaThreeCountryCodesListFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `season` relation. */
  season?: Maybe<SeasonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SeasonsLicenseFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SeasonsLicenseFilter>>;
  /** Negates the expression. */
  not?: Maybe<SeasonsLicenseFilter>;
};

/** An input for mutations affecting `SeasonsLicense` */
export type SeasonsLicenseInput = {
  seasonId: Scalars['Int'];
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
};

/** Represents an update to a `SeasonsLicense`. Fields that are set will be updated. */
export type SeasonsLicensePatch = {
  seasonId?: Maybe<Scalars['Int']>;
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
};

/**
 * A connection to a list of `SeasonsLicense` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type SeasonsLicensesConnection = {
  __typename?: 'SeasonsLicensesConnection';
  /** A list of `SeasonsLicense` objects. */
  nodes: Array<Maybe<SeasonsLicense>>;
  /** A list of edges which contains the `SeasonsLicense` and cursor to aid in pagination. */
  edges: Array<SeasonsLicensesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonsLicense` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SeasonsLicense` edge in the connection. */
export type SeasonsLicensesEdge = {
  __typename?: 'SeasonsLicensesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SeasonsLicense` at the end of the edge. */
  node?: Maybe<SeasonsLicense>;
};

/** Methods to use when ordering `SeasonsLicense`. */
export enum SeasonsLicensesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  SeasonIdAsc = 'SEASON_ID_ASC',
  SeasonIdDesc = 'SEASON_ID_DESC',
  LicenseStartAsc = 'LICENSE_START_ASC',
  LicenseStartDesc = 'LICENSE_START_DESC',
  LicenseEndAsc = 'LICENSE_END_ASC',
  LicenseEndDesc = 'LICENSE_END_DESC',
  CountriesAsc = 'COUNTRIES_ASC',
  CountriesDesc = 'COUNTRIES_DESC',
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

/** Methods to use when ordering `Season`. */
export enum SeasonsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TvshowIdAsc = 'TVSHOW_ID_ASC',
  TvshowIdDesc = 'TVSHOW_ID_DESC',
  IndexAsc = 'INDEX_ASC',
  IndexDesc = 'INDEX_DESC',
  ExternalIdAsc = 'EXTERNAL_ID_ASC',
  ExternalIdDesc = 'EXTERNAL_ID_DESC',
  SynopsisAsc = 'SYNOPSIS_ASC',
  SynopsisDesc = 'SYNOPSIS_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  StudioAsc = 'STUDIO_ASC',
  StudioDesc = 'STUDIO_DESC',
  ReleasedAsc = 'RELEASED_ASC',
  ReleasedDesc = 'RELEASED_DESC',
  PublishStatusAsc = 'PUBLISH_STATUS_ASC',
  PublishStatusDesc = 'PUBLISH_STATUS_DESC',
  PublishedDateAsc = 'PUBLISHED_DATE_ASC',
  PublishedDateDesc = 'PUBLISHED_DATE_DESC',
  PublishedUserAsc = 'PUBLISHED_USER_ASC',
  PublishedUserDesc = 'PUBLISHED_USER_DESC',
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
 * A connection to a list of `SeasonsProductionCountry` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type SeasonsProductionCountriesConnection = {
  __typename?: 'SeasonsProductionCountriesConnection';
  /** A list of `SeasonsProductionCountry` objects. */
  nodes: Array<Maybe<SeasonsProductionCountry>>;
  /** A list of edges which contains the `SeasonsProductionCountry` and cursor to aid in pagination. */
  edges: Array<SeasonsProductionCountriesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonsProductionCountry` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SeasonsProductionCountry` edge in the connection. */
export type SeasonsProductionCountriesEdge = {
  __typename?: 'SeasonsProductionCountriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SeasonsProductionCountry` at the end of the edge. */
  node?: Maybe<SeasonsProductionCountry>;
};

/** Methods to use when ordering `SeasonsProductionCountry`. */
export enum SeasonsProductionCountriesOrderBy {
  Natural = 'NATURAL',
  SeasonIdAsc = 'SEASON_ID_ASC',
  SeasonIdDesc = 'SEASON_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonsProductionCountry = Node & {
  __typename?: 'SeasonsProductionCountry';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  seasonId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Season` that is related to this `SeasonsProductionCountry`. */
  season?: Maybe<Season>;
};

/**
 * A condition to be used against `SeasonsProductionCountry` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type SeasonsProductionCountryCondition = {
  /** Checks for equality with the object’s `seasonId` field. */
  seasonId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `SeasonsProductionCountry` object types. All fields are combined with a logical ‘and.’ */
export type SeasonsProductionCountryFilter = {
  /** Filter by the object’s `seasonId` field. */
  seasonId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `season` relation. */
  season?: Maybe<SeasonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SeasonsProductionCountryFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SeasonsProductionCountryFilter>>;
  /** Negates the expression. */
  not?: Maybe<SeasonsProductionCountryFilter>;
};

/** An input for mutations affecting `SeasonsProductionCountry` */
export type SeasonsProductionCountryInput = {
  seasonId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `SeasonsProductionCountry`. Fields that are set will be updated. */
export type SeasonsProductionCountryPatch = {
  seasonId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonsTag = Node & {
  __typename?: 'SeasonsTag';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  seasonId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Season` that is related to this `SeasonsTag`. */
  season?: Maybe<Season>;
};

/**
 * A condition to be used against `SeasonsTag` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type SeasonsTagCondition = {
  /** Checks for equality with the object’s `seasonId` field. */
  seasonId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `SeasonsTag` object types. All fields are combined with a logical ‘and.’ */
export type SeasonsTagFilter = {
  /** Filter by the object’s `seasonId` field. */
  seasonId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `season` relation. */
  season?: Maybe<SeasonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SeasonsTagFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SeasonsTagFilter>>;
  /** Negates the expression. */
  not?: Maybe<SeasonsTagFilter>;
};

/** An input for mutations affecting `SeasonsTag` */
export type SeasonsTagInput = {
  seasonId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `SeasonsTag`. Fields that are set will be updated. */
export type SeasonsTagPatch = {
  seasonId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `SeasonsTag` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type SeasonsTagsConnection = {
  __typename?: 'SeasonsTagsConnection';
  /** A list of `SeasonsTag` objects. */
  nodes: Array<Maybe<SeasonsTag>>;
  /** A list of edges which contains the `SeasonsTag` and cursor to aid in pagination. */
  edges: Array<SeasonsTagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonsTag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SeasonsTag` edge in the connection. */
export type SeasonsTagsEdge = {
  __typename?: 'SeasonsTagsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SeasonsTag` at the end of the edge. */
  node?: Maybe<SeasonsTag>;
};

/** Methods to use when ordering `SeasonsTag`. */
export enum SeasonsTagsOrderBy {
  Natural = 'NATURAL',
  SeasonIdAsc = 'SEASON_ID_ASC',
  SeasonIdDesc = 'SEASON_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonsTrailer = Node & {
  __typename?: 'SeasonsTrailer';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  seasonId: Scalars['Int'];
  videoId: Scalars['Int'];
  /** Reads a single `Season` that is related to this `SeasonsTrailer`. */
  season?: Maybe<Season>;
};

/**
 * A condition to be used against `SeasonsTrailer` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SeasonsTrailerCondition = {
  /** Checks for equality with the object’s `seasonId` field. */
  seasonId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `videoId` field. */
  videoId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `SeasonsTrailer` object types. All fields are combined with a logical ‘and.’ */
export type SeasonsTrailerFilter = {
  /** Filter by the object’s `seasonId` field. */
  seasonId?: Maybe<IntFilter>;
  /** Filter by the object’s `videoId` field. */
  videoId?: Maybe<IntFilter>;
  /** Filter by the object’s `season` relation. */
  season?: Maybe<SeasonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SeasonsTrailerFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SeasonsTrailerFilter>>;
  /** Negates the expression. */
  not?: Maybe<SeasonsTrailerFilter>;
};

/** An input for mutations affecting `SeasonsTrailer` */
export type SeasonsTrailerInput = {
  seasonId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** Represents an update to a `SeasonsTrailer`. Fields that are set will be updated. */
export type SeasonsTrailerPatch = {
  seasonId?: Maybe<Scalars['Int']>;
  videoId?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `SeasonsTrailer` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type SeasonsTrailersConnection = {
  __typename?: 'SeasonsTrailersConnection';
  /** A list of `SeasonsTrailer` objects. */
  nodes: Array<Maybe<SeasonsTrailer>>;
  /** A list of edges which contains the `SeasonsTrailer` and cursor to aid in pagination. */
  edges: Array<SeasonsTrailersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonsTrailer` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SeasonsTrailer` edge in the connection. */
export type SeasonsTrailersEdge = {
  __typename?: 'SeasonsTrailersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SeasonsTrailer` at the end of the edge. */
  node?: Maybe<SeasonsTrailer>;
};

/** Methods to use when ordering `SeasonsTrailer`. */
export enum SeasonsTrailersOrderBy {
  Natural = 'NATURAL',
  SeasonIdAsc = 'SEASON_ID_ASC',
  SeasonIdDesc = 'SEASON_ID_DESC',
  VideoIdAsc = 'VIDEO_ID_ASC',
  VideoIdDesc = 'VIDEO_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type SeasonsTvshowGenre = Node & {
  __typename?: 'SeasonsTvshowGenre';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  seasonId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
  /** Reads a single `Season` that is related to this `SeasonsTvshowGenre`. */
  season?: Maybe<Season>;
  /** Reads a single `TvshowGenre` that is related to this `SeasonsTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
};

/**
 * A condition to be used against `SeasonsTvshowGenre` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SeasonsTvshowGenreCondition = {
  /** Checks for equality with the object’s `seasonId` field. */
  seasonId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `tvshowGenresId` field. */
  tvshowGenresId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `SeasonsTvshowGenre` object types. All fields are combined with a logical ‘and.’ */
export type SeasonsTvshowGenreFilter = {
  /** Filter by the object’s `seasonId` field. */
  seasonId?: Maybe<IntFilter>;
  /** Filter by the object’s `tvshowGenresId` field. */
  tvshowGenresId?: Maybe<IntFilter>;
  /** Filter by the object’s `season` relation. */
  season?: Maybe<SeasonFilter>;
  /** Filter by the object’s `tvshowGenres` relation. */
  tvshowGenres?: Maybe<TvshowGenreFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SeasonsTvshowGenreFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SeasonsTvshowGenreFilter>>;
  /** Negates the expression. */
  not?: Maybe<SeasonsTvshowGenreFilter>;
};

/** An input for mutations affecting `SeasonsTvshowGenre` */
export type SeasonsTvshowGenreInput = {
  seasonId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};

/** Represents an update to a `SeasonsTvshowGenre`. Fields that are set will be updated. */
export type SeasonsTvshowGenrePatch = {
  seasonId?: Maybe<Scalars['Int']>;
  tvshowGenresId?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `SeasonsTvshowGenre` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type SeasonsTvshowGenresConnection = {
  __typename?: 'SeasonsTvshowGenresConnection';
  /** A list of `SeasonsTvshowGenre` objects. */
  nodes: Array<Maybe<SeasonsTvshowGenre>>;
  /** A list of edges which contains the `SeasonsTvshowGenre` and cursor to aid in pagination. */
  edges: Array<SeasonsTvshowGenresEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SeasonsTvshowGenre` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SeasonsTvshowGenre` edge in the connection. */
export type SeasonsTvshowGenresEdge = {
  __typename?: 'SeasonsTvshowGenresEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SeasonsTvshowGenre` at the end of the edge. */
  node?: Maybe<SeasonsTvshowGenre>;
};

/** Methods to use when ordering `SeasonsTvshowGenre`. */
export enum SeasonsTvshowGenresOrderBy {
  Natural = 'NATURAL',
  SeasonIdAsc = 'SEASON_ID_ASC',
  SeasonIdDesc = 'SEASON_ID_DESC',
  TvshowGenresIdAsc = 'TVSHOW_GENRES_ID_ASC',
  TvshowGenresIdDesc = 'TVSHOW_GENRES_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type SeasonSubscriptionPayload = {
  __typename?: 'SeasonSubscriptionPayload';
  id: Scalars['Int'];
  season?: Maybe<Season>;
  event?: Maybe<Scalars['String']>;
};

/** A filter to be used against many `CollectionRelation` object types. All fields are combined with a logical ‘and.’ */
export type SeasonToManyCollectionRelationFilter = {
  /** Every related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<CollectionRelationFilter>;
  /** Some related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<CollectionRelationFilter>;
  /** No related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<CollectionRelationFilter>;
};

/** A filter to be used against many `Episode` object types. All fields are combined with a logical ‘and.’ */
export type SeasonToManyEpisodeFilter = {
  /** Every related `Episode` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<EpisodeFilter>;
  /** Some related `Episode` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<EpisodeFilter>;
  /** No related `Episode` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<EpisodeFilter>;
};

/** A filter to be used against many `SeasonsCast` object types. All fields are combined with a logical ‘and.’ */
export type SeasonToManySeasonsCastFilter = {
  /** Every related `SeasonsCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<SeasonsCastFilter>;
  /** Some related `SeasonsCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<SeasonsCastFilter>;
  /** No related `SeasonsCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<SeasonsCastFilter>;
};

/** A filter to be used against many `SeasonsImage` object types. All fields are combined with a logical ‘and.’ */
export type SeasonToManySeasonsImageFilter = {
  /** Every related `SeasonsImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<SeasonsImageFilter>;
  /** Some related `SeasonsImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<SeasonsImageFilter>;
  /** No related `SeasonsImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<SeasonsImageFilter>;
};

/** A filter to be used against many `SeasonsLicense` object types. All fields are combined with a logical ‘and.’ */
export type SeasonToManySeasonsLicenseFilter = {
  /** Every related `SeasonsLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<SeasonsLicenseFilter>;
  /** Some related `SeasonsLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<SeasonsLicenseFilter>;
  /** No related `SeasonsLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<SeasonsLicenseFilter>;
};

/** A filter to be used against many `SeasonsProductionCountry` object types. All fields are combined with a logical ‘and.’ */
export type SeasonToManySeasonsProductionCountryFilter = {
  /** Every related `SeasonsProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<SeasonsProductionCountryFilter>;
  /** Some related `SeasonsProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<SeasonsProductionCountryFilter>;
  /** No related `SeasonsProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<SeasonsProductionCountryFilter>;
};

/** A filter to be used against many `SeasonsTag` object types. All fields are combined with a logical ‘and.’ */
export type SeasonToManySeasonsTagFilter = {
  /** Every related `SeasonsTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<SeasonsTagFilter>;
  /** Some related `SeasonsTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<SeasonsTagFilter>;
  /** No related `SeasonsTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<SeasonsTagFilter>;
};

/** A filter to be used against many `SeasonsTrailer` object types. All fields are combined with a logical ‘and.’ */
export type SeasonToManySeasonsTrailerFilter = {
  /** Every related `SeasonsTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<SeasonsTrailerFilter>;
  /** Some related `SeasonsTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<SeasonsTrailerFilter>;
  /** No related `SeasonsTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<SeasonsTrailerFilter>;
};

/** A filter to be used against many `SeasonsTvshowGenre` object types. All fields are combined with a logical ‘and.’ */
export type SeasonToManySeasonsTvshowGenreFilter = {
  /** Every related `SeasonsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<SeasonsTvshowGenreFilter>;
  /** Some related `SeasonsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<SeasonsTvshowGenreFilter>;
  /** No related `SeasonsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<SeasonsTvshowGenreFilter>;
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

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Triggered when a MovieGenre is mutated (insert, update or delete).  */
  movieGenreMutated?: Maybe<MovieGenreSubscriptionPayload>;
  /** Triggered when a TvshowGenre is mutated (insert, update or delete).  */
  tvshowGenreMutated?: Maybe<TvshowGenreSubscriptionPayload>;
  /** Triggered when a Movie is mutated (insert, update or delete).  */
  movieMutated?: Maybe<MovieSubscriptionPayload>;
  /** Triggered when a Tvshow is mutated (insert, update or delete).  */
  tvshowMutated?: Maybe<TvshowSubscriptionPayload>;
  /** Triggered when a Season is mutated (insert, update or delete).  */
  seasonMutated?: Maybe<SeasonSubscriptionPayload>;
  /** Triggered when a Episode is mutated (insert, update or delete).  */
  episodeMutated?: Maybe<EpisodeSubscriptionPayload>;
  /** Triggered when a Collection is mutated (insert, update or delete).  */
  collectionMutated?: Maybe<CollectionSubscriptionPayload>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type Tvshow = Node & {
  __typename?: 'Tvshow';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  originalTitle?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
  publishStatus?: Maybe<PublishStatus>;
  publishedDate?: Maybe<Scalars['Datetime']>;
  publishedUser?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `TvshowsTag`. */
  tvshowsTags: TvshowsTagsConnection;
  /** Reads and enables pagination through a set of `TvshowsCast`. */
  tvshowsCasts: TvshowsCastsConnection;
  /** Reads and enables pagination through a set of `TvshowsLicense`. */
  tvshowsLicenses: TvshowsLicensesConnection;
  /** Reads and enables pagination through a set of `TvshowsProductionCountry`. */
  tvshowsProductionCountries: TvshowsProductionCountriesConnection;
  /** Reads and enables pagination through a set of `TvshowsTvshowGenre`. */
  tvshowsTvshowGenres: TvshowsTvshowGenresConnection;
  /** Reads and enables pagination through a set of `TvshowsImage`. */
  tvshowsImages: TvshowsImagesConnection;
  /** Reads and enables pagination through a set of `TvshowsTrailer`. */
  tvshowsTrailers: TvshowsTrailersConnection;
  /** Reads and enables pagination through a set of `Season`. */
  seasons: SeasonsConnection;
  /** Reads and enables pagination through a set of `CollectionRelation`. */
  collectionRelations: CollectionRelationsConnection;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowTvshowsTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsTagsOrderBy>>;
  condition?: Maybe<TvshowsTagCondition>;
  filter?: Maybe<TvshowsTagFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowTvshowsCastsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsCastsOrderBy>>;
  condition?: Maybe<TvshowsCastCondition>;
  filter?: Maybe<TvshowsCastFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowTvshowsLicensesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsLicensesOrderBy>>;
  condition?: Maybe<TvshowsLicenseCondition>;
  filter?: Maybe<TvshowsLicenseFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowTvshowsProductionCountriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsProductionCountriesOrderBy>>;
  condition?: Maybe<TvshowsProductionCountryCondition>;
  filter?: Maybe<TvshowsProductionCountryFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowTvshowsTvshowGenresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsTvshowGenresOrderBy>>;
  condition?: Maybe<TvshowsTvshowGenreCondition>;
  filter?: Maybe<TvshowsTvshowGenreFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowTvshowsImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsImagesOrderBy>>;
  condition?: Maybe<TvshowsImageCondition>;
  filter?: Maybe<TvshowsImageFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowTvshowsTrailersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsTrailersOrderBy>>;
  condition?: Maybe<TvshowsTrailerCondition>;
  filter?: Maybe<TvshowsTrailerFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowSeasonsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsOrderBy>>;
  condition?: Maybe<SeasonCondition>;
  filter?: Maybe<SeasonFilter>;
};


/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowCollectionRelationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CollectionRelationsOrderBy>>;
  condition?: Maybe<CollectionRelationCondition>;
  filter?: Maybe<CollectionRelationFilter>;
};

/** A condition to be used against `Tvshow` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TvshowCondition = {
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
  /** Checks for equality with the object’s `originalTitle` field. */
  originalTitle?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `synopsis` field. */
  synopsis?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `studio` field. */
  studio?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `released` field. */
  released?: Maybe<Scalars['Date']>;
  /** Checks for equality with the object’s `publishStatus` field. */
  publishStatus?: Maybe<PublishStatus>;
  /** Checks for equality with the object’s `publishedDate` field. */
  publishedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `publishedUser` field. */
  publishedUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Tvshow` object types. All fields are combined with a logical ‘and.’ */
export type TvshowFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<StringFilter>;
  /** Filter by the object’s `externalId` field. */
  externalId?: Maybe<StringFilter>;
  /** Filter by the object’s `originalTitle` field. */
  originalTitle?: Maybe<StringFilter>;
  /** Filter by the object’s `synopsis` field. */
  synopsis?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `studio` field. */
  studio?: Maybe<StringFilter>;
  /** Filter by the object’s `released` field. */
  released?: Maybe<DateFilter>;
  /** Filter by the object’s `publishStatus` field. */
  publishStatus?: Maybe<PublishStatusFilter>;
  /** Filter by the object’s `publishedDate` field. */
  publishedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `publishedUser` field. */
  publishedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `tvshowsTags` relation. */
  tvshowsTags?: Maybe<TvshowToManyTvshowsTagFilter>;
  /** Some related `tvshowsTags` exist. */
  tvshowsTagsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `tvshowsCasts` relation. */
  tvshowsCasts?: Maybe<TvshowToManyTvshowsCastFilter>;
  /** Some related `tvshowsCasts` exist. */
  tvshowsCastsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `tvshowsLicenses` relation. */
  tvshowsLicenses?: Maybe<TvshowToManyTvshowsLicenseFilter>;
  /** Some related `tvshowsLicenses` exist. */
  tvshowsLicensesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `tvshowsProductionCountries` relation. */
  tvshowsProductionCountries?: Maybe<TvshowToManyTvshowsProductionCountryFilter>;
  /** Some related `tvshowsProductionCountries` exist. */
  tvshowsProductionCountriesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `tvshowsTvshowGenres` relation. */
  tvshowsTvshowGenres?: Maybe<TvshowToManyTvshowsTvshowGenreFilter>;
  /** Some related `tvshowsTvshowGenres` exist. */
  tvshowsTvshowGenresExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `tvshowsImages` relation. */
  tvshowsImages?: Maybe<TvshowToManyTvshowsImageFilter>;
  /** Some related `tvshowsImages` exist. */
  tvshowsImagesExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `tvshowsTrailers` relation. */
  tvshowsTrailers?: Maybe<TvshowToManyTvshowsTrailerFilter>;
  /** Some related `tvshowsTrailers` exist. */
  tvshowsTrailersExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `seasons` relation. */
  seasons?: Maybe<TvshowToManySeasonFilter>;
  /** Some related `seasons` exist. */
  seasonsExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `collectionRelations` relation. */
  collectionRelations?: Maybe<TvshowToManyCollectionRelationFilter>;
  /** Some related `collectionRelations` exist. */
  collectionRelationsExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TvshowFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TvshowFilter>>;
  /** Negates the expression. */
  not?: Maybe<TvshowFilter>;
};

/** @permissions: SETTINGS_READER,SETTINGS_EDITOR,ADMIN */
export type TvshowGenre = Node & {
  __typename?: 'TvshowGenre';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['String'];
  sortOrder: Scalars['Int'];
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `TvshowsTvshowGenre`. */
  tvshowsTvshowGenresByTvshowGenresId: TvshowsTvshowGenresConnection;
  /** Reads and enables pagination through a set of `SeasonsTvshowGenre`. */
  seasonsTvshowGenresByTvshowGenresId: SeasonsTvshowGenresConnection;
  /** Reads and enables pagination through a set of `EpisodesTvshowGenre`. */
  episodesTvshowGenresByTvshowGenresId: EpisodesTvshowGenresConnection;
};


/** @permissions: SETTINGS_READER,SETTINGS_EDITOR,ADMIN */
export type TvshowGenreTvshowsTvshowGenresByTvshowGenresIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TvshowsTvshowGenresOrderBy>>;
  condition?: Maybe<TvshowsTvshowGenreCondition>;
  filter?: Maybe<TvshowsTvshowGenreFilter>;
};


/** @permissions: SETTINGS_READER,SETTINGS_EDITOR,ADMIN */
export type TvshowGenreSeasonsTvshowGenresByTvshowGenresIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SeasonsTvshowGenresOrderBy>>;
  condition?: Maybe<SeasonsTvshowGenreCondition>;
  filter?: Maybe<SeasonsTvshowGenreFilter>;
};


/** @permissions: SETTINGS_READER,SETTINGS_EDITOR,ADMIN */
export type TvshowGenreEpisodesTvshowGenresByTvshowGenresIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EpisodesTvshowGenresOrderBy>>;
  condition?: Maybe<EpisodesTvshowGenreCondition>;
  filter?: Maybe<EpisodesTvshowGenreFilter>;
};

/**
 * A condition to be used against `TvshowGenre` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TvshowGenreCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `title` field.
   * @maxLength(50)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `sortOrder` field. */
  sortOrder?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `TvshowGenre` object types. All fields are combined with a logical ‘and.’ */
export type TvshowGenreFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `title` field. */
  title?: Maybe<StringFilter>;
  /** Filter by the object’s `sortOrder` field. */
  sortOrder?: Maybe<IntFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `tvshowsTvshowGenresByTvshowGenresId` relation. */
  tvshowsTvshowGenresByTvshowGenresId?: Maybe<TvshowGenreToManyTvshowsTvshowGenreFilter>;
  /** Some related `tvshowsTvshowGenresByTvshowGenresId` exist. */
  tvshowsTvshowGenresByTvshowGenresIdExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `seasonsTvshowGenresByTvshowGenresId` relation. */
  seasonsTvshowGenresByTvshowGenresId?: Maybe<TvshowGenreToManySeasonsTvshowGenreFilter>;
  /** Some related `seasonsTvshowGenresByTvshowGenresId` exist. */
  seasonsTvshowGenresByTvshowGenresIdExist?: Maybe<Scalars['Boolean']>;
  /** Filter by the object’s `episodesTvshowGenresByTvshowGenresId` relation. */
  episodesTvshowGenresByTvshowGenresId?: Maybe<TvshowGenreToManyEpisodesTvshowGenreFilter>;
  /** Some related `episodesTvshowGenresByTvshowGenresId` exist. */
  episodesTvshowGenresByTvshowGenresIdExist?: Maybe<Scalars['Boolean']>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TvshowGenreFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TvshowGenreFilter>>;
  /** Negates the expression. */
  not?: Maybe<TvshowGenreFilter>;
};

/** An input for mutations affecting `TvshowGenre` */
export type TvshowGenreInput = {
  /**
   * @maxLength(50)
   * @notEmpty()
   */
  title: Scalars['String'];
  sortOrder: Scalars['Int'];
};

/** Represents an update to a `TvshowGenre`. Fields that are set will be updated. */
export type TvshowGenrePatch = {
  /**
   * @maxLength(50)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `TvshowGenre` values.
 * @permissions: SETTINGS_READER,SETTINGS_EDITOR,ADMIN
 */
export type TvshowGenresConnection = {
  __typename?: 'TvshowGenresConnection';
  /** A list of `TvshowGenre` objects. */
  nodes: Array<Maybe<TvshowGenre>>;
  /** A list of edges which contains the `TvshowGenre` and cursor to aid in pagination. */
  edges: Array<TvshowGenresEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TvshowGenre` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TvshowGenre` edge in the connection. */
export type TvshowGenresEdge = {
  __typename?: 'TvshowGenresEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TvshowGenre` at the end of the edge. */
  node?: Maybe<TvshowGenre>;
};

/** Methods to use when ordering `TvshowGenre`. */
export enum TvshowGenresOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  SortOrderAsc = 'SORT_ORDER_ASC',
  SortOrderDesc = 'SORT_ORDER_DESC',
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

export type TvshowGenreSubscriptionPayload = {
  __typename?: 'TvshowGenreSubscriptionPayload';
  id: Scalars['Int'];
  tvshowGenre?: Maybe<TvshowGenre>;
  event?: Maybe<Scalars['String']>;
};

/** A filter to be used against many `EpisodesTvshowGenre` object types. All fields are combined with a logical ‘and.’ */
export type TvshowGenreToManyEpisodesTvshowGenreFilter = {
  /** Every related `EpisodesTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<EpisodesTvshowGenreFilter>;
  /** Some related `EpisodesTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<EpisodesTvshowGenreFilter>;
  /** No related `EpisodesTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<EpisodesTvshowGenreFilter>;
};

/** A filter to be used against many `SeasonsTvshowGenre` object types. All fields are combined with a logical ‘and.’ */
export type TvshowGenreToManySeasonsTvshowGenreFilter = {
  /** Every related `SeasonsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<SeasonsTvshowGenreFilter>;
  /** Some related `SeasonsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<SeasonsTvshowGenreFilter>;
  /** No related `SeasonsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<SeasonsTvshowGenreFilter>;
};

/** A filter to be used against many `TvshowsTvshowGenre` object types. All fields are combined with a logical ‘and.’ */
export type TvshowGenreToManyTvshowsTvshowGenreFilter = {
  /** Every related `TvshowsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TvshowsTvshowGenreFilter>;
  /** Some related `TvshowsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TvshowsTvshowGenreFilter>;
  /** No related `TvshowsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TvshowsTvshowGenreFilter>;
};

export enum TvshowImageType {
  Cover = 'COVER',
  Teaser = 'TEASER'
}

/** A filter to be used against TvshowImageType fields. All fields are combined with a logical ‘and.’ */
export type TvshowImageTypeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<TvshowImageType>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<TvshowImageType>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<TvshowImageType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<TvshowImageType>;
  /** Included in the specified list. */
  in?: Maybe<Array<TvshowImageType>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<TvshowImageType>>;
  /** Less than the specified value. */
  lessThan?: Maybe<TvshowImageType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<TvshowImageType>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<TvshowImageType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<TvshowImageType>;
};

/** An input for mutations affecting `Tvshow` */
export type TvshowInput = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  originalTitle?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
};

/** Represents an update to a `Tvshow`. Fields that are set will be updated. */
export type TvshowPatch = {
  /**
   * @maxLength(100)
   * @notEmpty()
   */
  title?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  originalTitle?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  studio?: Maybe<Scalars['String']>;
  released?: Maybe<Scalars['Date']>;
  publishStatus?: Maybe<PublishStatus>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowsCast = Node & {
  __typename?: 'TvshowsCast';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  tvshowId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Tvshow` that is related to this `TvshowsCast`. */
  tvshow?: Maybe<Tvshow>;
};

/**
 * A condition to be used against `TvshowsCast` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TvshowsCastCondition = {
  /** Checks for equality with the object’s `tvshowId` field. */
  tvshowId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `TvshowsCast` object types. All fields are combined with a logical ‘and.’ */
export type TvshowsCastFilter = {
  /** Filter by the object’s `tvshowId` field. */
  tvshowId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `tvshow` relation. */
  tvshow?: Maybe<TvshowFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TvshowsCastFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TvshowsCastFilter>>;
  /** Negates the expression. */
  not?: Maybe<TvshowsCastFilter>;
};

/** An input for mutations affecting `TvshowsCast` */
export type TvshowsCastInput = {
  tvshowId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `TvshowsCast`. Fields that are set will be updated. */
export type TvshowsCastPatch = {
  tvshowId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `TvshowsCast` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type TvshowsCastsConnection = {
  __typename?: 'TvshowsCastsConnection';
  /** A list of `TvshowsCast` objects. */
  nodes: Array<Maybe<TvshowsCast>>;
  /** A list of edges which contains the `TvshowsCast` and cursor to aid in pagination. */
  edges: Array<TvshowsCastsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TvshowsCast` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TvshowsCast` edge in the connection. */
export type TvshowsCastsEdge = {
  __typename?: 'TvshowsCastsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TvshowsCast` at the end of the edge. */
  node?: Maybe<TvshowsCast>;
};

/** Methods to use when ordering `TvshowsCast`. */
export enum TvshowsCastsOrderBy {
  Natural = 'NATURAL',
  TvshowIdAsc = 'TVSHOW_ID_ASC',
  TvshowIdDesc = 'TVSHOW_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A connection to a list of `Tvshow` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type TvshowsConnection = {
  __typename?: 'TvshowsConnection';
  /** A list of `Tvshow` objects. */
  nodes: Array<Maybe<Tvshow>>;
  /** A list of edges which contains the `Tvshow` and cursor to aid in pagination. */
  edges: Array<TvshowsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tvshow` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Tvshow` edge in the connection. */
export type TvshowsEdge = {
  __typename?: 'TvshowsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Tvshow` at the end of the edge. */
  node?: Maybe<Tvshow>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowsImage = Node & {
  __typename?: 'TvshowsImage';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  tvshowId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: TvshowImageType;
  /** Reads a single `Tvshow` that is related to this `TvshowsImage`. */
  tvshow?: Maybe<Tvshow>;
};

/**
 * A condition to be used against `TvshowsImage` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TvshowsImageCondition = {
  /** Checks for equality with the object’s `tvshowId` field. */
  tvshowId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageId` field. */
  imageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `imageType` field. */
  imageType?: Maybe<TvshowImageType>;
};

/** A filter to be used against `TvshowsImage` object types. All fields are combined with a logical ‘and.’ */
export type TvshowsImageFilter = {
  /** Filter by the object’s `tvshowId` field. */
  tvshowId?: Maybe<IntFilter>;
  /** Filter by the object’s `imageId` field. */
  imageId?: Maybe<IntFilter>;
  /** Filter by the object’s `imageType` field. */
  imageType?: Maybe<TvshowImageTypeFilter>;
  /** Filter by the object’s `tvshow` relation. */
  tvshow?: Maybe<TvshowFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TvshowsImageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TvshowsImageFilter>>;
  /** Negates the expression. */
  not?: Maybe<TvshowsImageFilter>;
};

/** An input for mutations affecting `TvshowsImage` */
export type TvshowsImageInput = {
  tvshowId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: TvshowImageType;
};

/** Represents an update to a `TvshowsImage`. Fields that are set will be updated. */
export type TvshowsImagePatch = {
  tvshowId?: Maybe<Scalars['Int']>;
  imageId?: Maybe<Scalars['Int']>;
  imageType?: Maybe<TvshowImageType>;
};

/**
 * A connection to a list of `TvshowsImage` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type TvshowsImagesConnection = {
  __typename?: 'TvshowsImagesConnection';
  /** A list of `TvshowsImage` objects. */
  nodes: Array<Maybe<TvshowsImage>>;
  /** A list of edges which contains the `TvshowsImage` and cursor to aid in pagination. */
  edges: Array<TvshowsImagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TvshowsImage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TvshowsImage` edge in the connection. */
export type TvshowsImagesEdge = {
  __typename?: 'TvshowsImagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TvshowsImage` at the end of the edge. */
  node?: Maybe<TvshowsImage>;
};

/** Methods to use when ordering `TvshowsImage`. */
export enum TvshowsImagesOrderBy {
  Natural = 'NATURAL',
  TvshowIdAsc = 'TVSHOW_ID_ASC',
  TvshowIdDesc = 'TVSHOW_ID_DESC',
  ImageIdAsc = 'IMAGE_ID_ASC',
  ImageIdDesc = 'IMAGE_ID_DESC',
  ImageTypeAsc = 'IMAGE_TYPE_ASC',
  ImageTypeDesc = 'IMAGE_TYPE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowsLicense = Node & {
  __typename?: 'TvshowsLicense';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  tvshowId: Scalars['Int'];
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  createdDate?: Maybe<Scalars['Datetime']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdUser?: Maybe<Scalars['String']>;
  updatedUser?: Maybe<Scalars['String']>;
  /** Reads a single `Tvshow` that is related to this `TvshowsLicense`. */
  tvshow?: Maybe<Tvshow>;
};

/**
 * A condition to be used against `TvshowsLicense` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TvshowsLicenseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `tvshowId` field. */
  tvshowId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `licenseStart` field. */
  licenseStart?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `licenseEnd` field. */
  licenseEnd?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `countries` field. */
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdUser` field. */
  createdUser?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedUser` field. */
  updatedUser?: Maybe<Scalars['String']>;
};

/** A filter to be used against `TvshowsLicense` object types. All fields are combined with a logical ‘and.’ */
export type TvshowsLicenseFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `tvshowId` field. */
  tvshowId?: Maybe<IntFilter>;
  /** Filter by the object’s `licenseStart` field. */
  licenseStart?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `licenseEnd` field. */
  licenseEnd?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `countries` field. */
  countries?: Maybe<IsoAlphaThreeCountryCodesListFilter>;
  /** Filter by the object’s `createdDate` field. */
  createdDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedDate` field. */
  updatedDate?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdUser` field. */
  createdUser?: Maybe<StringFilter>;
  /** Filter by the object’s `updatedUser` field. */
  updatedUser?: Maybe<StringFilter>;
  /** Filter by the object’s `tvshow` relation. */
  tvshow?: Maybe<TvshowFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TvshowsLicenseFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TvshowsLicenseFilter>>;
  /** Negates the expression. */
  not?: Maybe<TvshowsLicenseFilter>;
};

/** An input for mutations affecting `TvshowsLicense` */
export type TvshowsLicenseInput = {
  tvshowId: Scalars['Int'];
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
};

/** Represents an update to a `TvshowsLicense`. Fields that are set will be updated. */
export type TvshowsLicensePatch = {
  tvshowId?: Maybe<Scalars['Int']>;
  licenseStart?: Maybe<Scalars['Datetime']>;
  licenseEnd?: Maybe<Scalars['Datetime']>;
  countries?: Maybe<Array<Maybe<IsoAlphaThreeCountryCodes>>>;
};

/**
 * A connection to a list of `TvshowsLicense` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type TvshowsLicensesConnection = {
  __typename?: 'TvshowsLicensesConnection';
  /** A list of `TvshowsLicense` objects. */
  nodes: Array<Maybe<TvshowsLicense>>;
  /** A list of edges which contains the `TvshowsLicense` and cursor to aid in pagination. */
  edges: Array<TvshowsLicensesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TvshowsLicense` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TvshowsLicense` edge in the connection. */
export type TvshowsLicensesEdge = {
  __typename?: 'TvshowsLicensesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TvshowsLicense` at the end of the edge. */
  node?: Maybe<TvshowsLicense>;
};

/** Methods to use when ordering `TvshowsLicense`. */
export enum TvshowsLicensesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TvshowIdAsc = 'TVSHOW_ID_ASC',
  TvshowIdDesc = 'TVSHOW_ID_DESC',
  LicenseStartAsc = 'LICENSE_START_ASC',
  LicenseStartDesc = 'LICENSE_START_DESC',
  LicenseEndAsc = 'LICENSE_END_ASC',
  LicenseEndDesc = 'LICENSE_END_DESC',
  CountriesAsc = 'COUNTRIES_ASC',
  CountriesDesc = 'COUNTRIES_DESC',
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

/** Methods to use when ordering `Tvshow`. */
export enum TvshowsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  ExternalIdAsc = 'EXTERNAL_ID_ASC',
  ExternalIdDesc = 'EXTERNAL_ID_DESC',
  OriginalTitleAsc = 'ORIGINAL_TITLE_ASC',
  OriginalTitleDesc = 'ORIGINAL_TITLE_DESC',
  SynopsisAsc = 'SYNOPSIS_ASC',
  SynopsisDesc = 'SYNOPSIS_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  StudioAsc = 'STUDIO_ASC',
  StudioDesc = 'STUDIO_DESC',
  ReleasedAsc = 'RELEASED_ASC',
  ReleasedDesc = 'RELEASED_DESC',
  PublishStatusAsc = 'PUBLISH_STATUS_ASC',
  PublishStatusDesc = 'PUBLISH_STATUS_DESC',
  PublishedDateAsc = 'PUBLISHED_DATE_ASC',
  PublishedDateDesc = 'PUBLISHED_DATE_DESC',
  PublishedUserAsc = 'PUBLISHED_USER_ASC',
  PublishedUserDesc = 'PUBLISHED_USER_DESC',
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
 * A connection to a list of `TvshowsProductionCountry` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type TvshowsProductionCountriesConnection = {
  __typename?: 'TvshowsProductionCountriesConnection';
  /** A list of `TvshowsProductionCountry` objects. */
  nodes: Array<Maybe<TvshowsProductionCountry>>;
  /** A list of edges which contains the `TvshowsProductionCountry` and cursor to aid in pagination. */
  edges: Array<TvshowsProductionCountriesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TvshowsProductionCountry` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TvshowsProductionCountry` edge in the connection. */
export type TvshowsProductionCountriesEdge = {
  __typename?: 'TvshowsProductionCountriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TvshowsProductionCountry` at the end of the edge. */
  node?: Maybe<TvshowsProductionCountry>;
};

/** Methods to use when ordering `TvshowsProductionCountry`. */
export enum TvshowsProductionCountriesOrderBy {
  Natural = 'NATURAL',
  TvshowIdAsc = 'TVSHOW_ID_ASC',
  TvshowIdDesc = 'TVSHOW_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowsProductionCountry = Node & {
  __typename?: 'TvshowsProductionCountry';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  tvshowId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Tvshow` that is related to this `TvshowsProductionCountry`. */
  tvshow?: Maybe<Tvshow>;
};

/**
 * A condition to be used against `TvshowsProductionCountry` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type TvshowsProductionCountryCondition = {
  /** Checks for equality with the object’s `tvshowId` field. */
  tvshowId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `TvshowsProductionCountry` object types. All fields are combined with a logical ‘and.’ */
export type TvshowsProductionCountryFilter = {
  /** Filter by the object’s `tvshowId` field. */
  tvshowId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `tvshow` relation. */
  tvshow?: Maybe<TvshowFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TvshowsProductionCountryFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TvshowsProductionCountryFilter>>;
  /** Negates the expression. */
  not?: Maybe<TvshowsProductionCountryFilter>;
};

/** An input for mutations affecting `TvshowsProductionCountry` */
export type TvshowsProductionCountryInput = {
  tvshowId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `TvshowsProductionCountry`. Fields that are set will be updated. */
export type TvshowsProductionCountryPatch = {
  tvshowId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowsTag = Node & {
  __typename?: 'TvshowsTag';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  tvshowId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `Tvshow` that is related to this `TvshowsTag`. */
  tvshow?: Maybe<Tvshow>;
};

/**
 * A condition to be used against `TvshowsTag` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TvshowsTagCondition = {
  /** Checks for equality with the object’s `tvshowId` field. */
  tvshowId?: Maybe<Scalars['Int']>;
  /**
   * Checks for equality with the object’s `name` field.
   * @notEmpty()
   */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `TvshowsTag` object types. All fields are combined with a logical ‘and.’ */
export type TvshowsTagFilter = {
  /** Filter by the object’s `tvshowId` field. */
  tvshowId?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `tvshow` relation. */
  tvshow?: Maybe<TvshowFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TvshowsTagFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TvshowsTagFilter>>;
  /** Negates the expression. */
  not?: Maybe<TvshowsTagFilter>;
};

/** An input for mutations affecting `TvshowsTag` */
export type TvshowsTagInput = {
  tvshowId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** Represents an update to a `TvshowsTag`. Fields that are set will be updated. */
export type TvshowsTagPatch = {
  tvshowId?: Maybe<Scalars['Int']>;
  /** @notEmpty() */
  name?: Maybe<Scalars['String']>;
};

/**
 * A connection to a list of `TvshowsTag` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type TvshowsTagsConnection = {
  __typename?: 'TvshowsTagsConnection';
  /** A list of `TvshowsTag` objects. */
  nodes: Array<Maybe<TvshowsTag>>;
  /** A list of edges which contains the `TvshowsTag` and cursor to aid in pagination. */
  edges: Array<TvshowsTagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TvshowsTag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TvshowsTag` edge in the connection. */
export type TvshowsTagsEdge = {
  __typename?: 'TvshowsTagsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TvshowsTag` at the end of the edge. */
  node?: Maybe<TvshowsTag>;
};

/** Methods to use when ordering `TvshowsTag`. */
export enum TvshowsTagsOrderBy {
  Natural = 'NATURAL',
  TvshowIdAsc = 'TVSHOW_ID_ASC',
  TvshowIdDesc = 'TVSHOW_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowsTrailer = Node & {
  __typename?: 'TvshowsTrailer';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  tvshowId: Scalars['Int'];
  videoId: Scalars['Int'];
  /** Reads a single `Tvshow` that is related to this `TvshowsTrailer`. */
  tvshow?: Maybe<Tvshow>;
};

/**
 * A condition to be used against `TvshowsTrailer` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TvshowsTrailerCondition = {
  /** Checks for equality with the object’s `tvshowId` field. */
  tvshowId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `videoId` field. */
  videoId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `TvshowsTrailer` object types. All fields are combined with a logical ‘and.’ */
export type TvshowsTrailerFilter = {
  /** Filter by the object’s `tvshowId` field. */
  tvshowId?: Maybe<IntFilter>;
  /** Filter by the object’s `videoId` field. */
  videoId?: Maybe<IntFilter>;
  /** Filter by the object’s `tvshow` relation. */
  tvshow?: Maybe<TvshowFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TvshowsTrailerFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TvshowsTrailerFilter>>;
  /** Negates the expression. */
  not?: Maybe<TvshowsTrailerFilter>;
};

/** An input for mutations affecting `TvshowsTrailer` */
export type TvshowsTrailerInput = {
  tvshowId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** Represents an update to a `TvshowsTrailer`. Fields that are set will be updated. */
export type TvshowsTrailerPatch = {
  tvshowId?: Maybe<Scalars['Int']>;
  videoId?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `TvshowsTrailer` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type TvshowsTrailersConnection = {
  __typename?: 'TvshowsTrailersConnection';
  /** A list of `TvshowsTrailer` objects. */
  nodes: Array<Maybe<TvshowsTrailer>>;
  /** A list of edges which contains the `TvshowsTrailer` and cursor to aid in pagination. */
  edges: Array<TvshowsTrailersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TvshowsTrailer` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TvshowsTrailer` edge in the connection. */
export type TvshowsTrailersEdge = {
  __typename?: 'TvshowsTrailersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TvshowsTrailer` at the end of the edge. */
  node?: Maybe<TvshowsTrailer>;
};

/** Methods to use when ordering `TvshowsTrailer`. */
export enum TvshowsTrailersOrderBy {
  Natural = 'NATURAL',
  TvshowIdAsc = 'TVSHOW_ID_ASC',
  TvshowIdDesc = 'TVSHOW_ID_DESC',
  VideoIdAsc = 'VIDEO_ID_ASC',
  VideoIdDesc = 'VIDEO_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN */
export type TvshowsTvshowGenre = Node & {
  __typename?: 'TvshowsTvshowGenre';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  tvshowId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
  /** Reads a single `Tvshow` that is related to this `TvshowsTvshowGenre`. */
  tvshow?: Maybe<Tvshow>;
  /** Reads a single `TvshowGenre` that is related to this `TvshowsTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
};

/**
 * A condition to be used against `TvshowsTvshowGenre` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TvshowsTvshowGenreCondition = {
  /** Checks for equality with the object’s `tvshowId` field. */
  tvshowId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `tvshowGenresId` field. */
  tvshowGenresId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `TvshowsTvshowGenre` object types. All fields are combined with a logical ‘and.’ */
export type TvshowsTvshowGenreFilter = {
  /** Filter by the object’s `tvshowId` field. */
  tvshowId?: Maybe<IntFilter>;
  /** Filter by the object’s `tvshowGenresId` field. */
  tvshowGenresId?: Maybe<IntFilter>;
  /** Filter by the object’s `tvshow` relation. */
  tvshow?: Maybe<TvshowFilter>;
  /** Filter by the object’s `tvshowGenres` relation. */
  tvshowGenres?: Maybe<TvshowGenreFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TvshowsTvshowGenreFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TvshowsTvshowGenreFilter>>;
  /** Negates the expression. */
  not?: Maybe<TvshowsTvshowGenreFilter>;
};

/** An input for mutations affecting `TvshowsTvshowGenre` */
export type TvshowsTvshowGenreInput = {
  tvshowId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};

/** Represents an update to a `TvshowsTvshowGenre`. Fields that are set will be updated. */
export type TvshowsTvshowGenrePatch = {
  tvshowId?: Maybe<Scalars['Int']>;
  tvshowGenresId?: Maybe<Scalars['Int']>;
};

/**
 * A connection to a list of `TvshowsTvshowGenre` values.
 * @permissions: TVSHOW_READER,TVSHOW_EDITOR,ADMIN
 */
export type TvshowsTvshowGenresConnection = {
  __typename?: 'TvshowsTvshowGenresConnection';
  /** A list of `TvshowsTvshowGenre` objects. */
  nodes: Array<Maybe<TvshowsTvshowGenre>>;
  /** A list of edges which contains the `TvshowsTvshowGenre` and cursor to aid in pagination. */
  edges: Array<TvshowsTvshowGenresEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TvshowsTvshowGenre` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TvshowsTvshowGenre` edge in the connection. */
export type TvshowsTvshowGenresEdge = {
  __typename?: 'TvshowsTvshowGenresEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TvshowsTvshowGenre` at the end of the edge. */
  node?: Maybe<TvshowsTvshowGenre>;
};

/** Methods to use when ordering `TvshowsTvshowGenre`. */
export enum TvshowsTvshowGenresOrderBy {
  Natural = 'NATURAL',
  TvshowIdAsc = 'TVSHOW_ID_ASC',
  TvshowIdDesc = 'TVSHOW_ID_DESC',
  TvshowGenresIdAsc = 'TVSHOW_GENRES_ID_ASC',
  TvshowGenresIdDesc = 'TVSHOW_GENRES_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type TvshowSubscriptionPayload = {
  __typename?: 'TvshowSubscriptionPayload';
  id: Scalars['Int'];
  tvshow?: Maybe<Tvshow>;
  event?: Maybe<Scalars['String']>;
};

/** A filter to be used against many `CollectionRelation` object types. All fields are combined with a logical ‘and.’ */
export type TvshowToManyCollectionRelationFilter = {
  /** Every related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<CollectionRelationFilter>;
  /** Some related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<CollectionRelationFilter>;
  /** No related `CollectionRelation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<CollectionRelationFilter>;
};

/** A filter to be used against many `Season` object types. All fields are combined with a logical ‘and.’ */
export type TvshowToManySeasonFilter = {
  /** Every related `Season` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<SeasonFilter>;
  /** Some related `Season` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<SeasonFilter>;
  /** No related `Season` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<SeasonFilter>;
};

/** A filter to be used against many `TvshowsCast` object types. All fields are combined with a logical ‘and.’ */
export type TvshowToManyTvshowsCastFilter = {
  /** Every related `TvshowsCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TvshowsCastFilter>;
  /** Some related `TvshowsCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TvshowsCastFilter>;
  /** No related `TvshowsCast` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TvshowsCastFilter>;
};

/** A filter to be used against many `TvshowsImage` object types. All fields are combined with a logical ‘and.’ */
export type TvshowToManyTvshowsImageFilter = {
  /** Every related `TvshowsImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TvshowsImageFilter>;
  /** Some related `TvshowsImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TvshowsImageFilter>;
  /** No related `TvshowsImage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TvshowsImageFilter>;
};

/** A filter to be used against many `TvshowsLicense` object types. All fields are combined with a logical ‘and.’ */
export type TvshowToManyTvshowsLicenseFilter = {
  /** Every related `TvshowsLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TvshowsLicenseFilter>;
  /** Some related `TvshowsLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TvshowsLicenseFilter>;
  /** No related `TvshowsLicense` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TvshowsLicenseFilter>;
};

/** A filter to be used against many `TvshowsProductionCountry` object types. All fields are combined with a logical ‘and.’ */
export type TvshowToManyTvshowsProductionCountryFilter = {
  /** Every related `TvshowsProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TvshowsProductionCountryFilter>;
  /** Some related `TvshowsProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TvshowsProductionCountryFilter>;
  /** No related `TvshowsProductionCountry` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TvshowsProductionCountryFilter>;
};

/** A filter to be used against many `TvshowsTag` object types. All fields are combined with a logical ‘and.’ */
export type TvshowToManyTvshowsTagFilter = {
  /** Every related `TvshowsTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TvshowsTagFilter>;
  /** Some related `TvshowsTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TvshowsTagFilter>;
  /** No related `TvshowsTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TvshowsTagFilter>;
};

/** A filter to be used against many `TvshowsTrailer` object types. All fields are combined with a logical ‘and.’ */
export type TvshowToManyTvshowsTrailerFilter = {
  /** Every related `TvshowsTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TvshowsTrailerFilter>;
  /** Some related `TvshowsTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TvshowsTrailerFilter>;
  /** No related `TvshowsTrailer` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TvshowsTrailerFilter>;
};

/** A filter to be used against many `TvshowsTvshowGenre` object types. All fields are combined with a logical ‘and.’ */
export type TvshowToManyTvshowsTvshowGenreFilter = {
  /** Every related `TvshowsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: Maybe<TvshowsTvshowGenreFilter>;
  /** Some related `TvshowsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: Maybe<TvshowsTvshowGenreFilter>;
  /** No related `TvshowsTvshowGenre` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: Maybe<TvshowsTvshowGenreFilter>;
};

/**
 * All input for the `updateAutomaticCollectionsFilterByNodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateAutomaticCollectionsFilterByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AutomaticCollectionsFilter` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `AutomaticCollectionsFilter` being updated. */
  patch: AutomaticCollectionsFilterPatch;
};

/**
 * All input for the `updateAutomaticCollectionsFilter` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateAutomaticCollectionsFilterInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `AutomaticCollectionsFilter` being updated. */
  patch: AutomaticCollectionsFilterPatch;
  id: Scalars['Int'];
};

/** The output of our update `AutomaticCollectionsFilter` mutation. */
export type UpdateAutomaticCollectionsFilterPayload = {
  __typename?: 'UpdateAutomaticCollectionsFilterPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AutomaticCollectionsFilter` that was updated by this mutation. */
  automaticCollectionsFilter?: Maybe<AutomaticCollectionsFilter>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `AutomaticCollectionsFilter`. */
  collection?: Maybe<Collection>;
  /** An edge for our `AutomaticCollectionsFilter`. May be used by Relay 1. */
  automaticCollectionsFilterEdge?: Maybe<AutomaticCollectionsFiltersEdge>;
};


/** The output of our update `AutomaticCollectionsFilter` mutation. */
export type UpdateAutomaticCollectionsFilterPayloadAutomaticCollectionsFilterEdgeArgs = {
  orderBy?: Maybe<Array<AutomaticCollectionsFiltersOrderBy>>;
};

/**
 * All input for the `updateCollectionByExternalId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Collection` being updated. */
  patch: CollectionPatch;
  externalId: Scalars['String'];
};

/**
 * All input for the `updateCollectionByNodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Collection` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Collection` being updated. */
  patch: CollectionPatch;
};

/**
 * All input for the `updateCollection` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Collection` being updated. */
  patch: CollectionPatch;
  id: Scalars['Int'];
};

/** The output of our update `Collection` mutation. */
export type UpdateCollectionPayload = {
  __typename?: 'UpdateCollectionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Collection` that was updated by this mutation. */
  collection?: Maybe<Collection>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Collection`. May be used by Relay 1. */
  collectionEdge?: Maybe<CollectionsEdge>;
};


/** The output of our update `Collection` mutation. */
export type UpdateCollectionPayloadCollectionEdgeArgs = {
  orderBy?: Maybe<Array<CollectionsOrderBy>>;
};

/**
 * All input for the `updateCollectionRelationByCollectionIdAndEpisodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionRelationByCollectionIdAndEpisodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CollectionRelation` being updated. */
  patch: CollectionRelationPatch;
  collectionId: Scalars['Int'];
  episodeId: Scalars['Int'];
};

/**
 * All input for the `updateCollectionRelationByCollectionIdAndMovieId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionRelationByCollectionIdAndMovieIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CollectionRelation` being updated. */
  patch: CollectionRelationPatch;
  collectionId: Scalars['Int'];
  movieId: Scalars['Int'];
};

/**
 * All input for the `updateCollectionRelationByCollectionIdAndSeasonId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionRelationByCollectionIdAndSeasonIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CollectionRelation` being updated. */
  patch: CollectionRelationPatch;
  collectionId: Scalars['Int'];
  seasonId: Scalars['Int'];
};

/**
 * All input for the `updateCollectionRelationByCollectionIdAndTvshowId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionRelationByCollectionIdAndTvshowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CollectionRelation` being updated. */
  patch: CollectionRelationPatch;
  collectionId: Scalars['Int'];
  tvshowId: Scalars['Int'];
};

/**
 * All input for the `updateCollectionRelationByNodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionRelationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CollectionRelation` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `CollectionRelation` being updated. */
  patch: CollectionRelationPatch;
};

/**
 * All input for the `updateCollectionRelation` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionRelationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CollectionRelation` being updated. */
  patch: CollectionRelationPatch;
  id: Scalars['Int'];
};

/** The output of our update `CollectionRelation` mutation. */
export type UpdateCollectionRelationPayload = {
  __typename?: 'UpdateCollectionRelationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionRelation` that was updated by this mutation. */
  collectionRelation?: Maybe<CollectionRelation>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `CollectionRelation`. */
  collection?: Maybe<Collection>;
  /** Reads a single `Movie` that is related to this `CollectionRelation`. */
  movie?: Maybe<Movie>;
  /** Reads a single `Tvshow` that is related to this `CollectionRelation`. */
  tvshow?: Maybe<Tvshow>;
  /** Reads a single `Season` that is related to this `CollectionRelation`. */
  season?: Maybe<Season>;
  /** Reads a single `Episode` that is related to this `CollectionRelation`. */
  episode?: Maybe<Episode>;
  /** An edge for our `CollectionRelation`. May be used by Relay 1. */
  collectionRelationEdge?: Maybe<CollectionRelationsEdge>;
};


/** The output of our update `CollectionRelation` mutation. */
export type UpdateCollectionRelationPayloadCollectionRelationEdgeArgs = {
  orderBy?: Maybe<Array<CollectionRelationsOrderBy>>;
};

/**
 * All input for the `updateCollectionsImageByNodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionsImageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CollectionsImage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `CollectionsImage` being updated. */
  patch: CollectionsImagePatch;
};

/**
 * All input for the `updateCollectionsImage` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionsImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CollectionsImage` being updated. */
  patch: CollectionsImagePatch;
  collectionId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: CollectionImageType;
};

/** The output of our update `CollectionsImage` mutation. */
export type UpdateCollectionsImagePayload = {
  __typename?: 'UpdateCollectionsImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionsImage` that was updated by this mutation. */
  collectionsImage?: Maybe<CollectionsImage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `CollectionsImage`. */
  collection?: Maybe<Collection>;
  /** An edge for our `CollectionsImage`. May be used by Relay 1. */
  collectionsImageEdge?: Maybe<CollectionsImagesEdge>;
};


/** The output of our update `CollectionsImage` mutation. */
export type UpdateCollectionsImagePayloadCollectionsImageEdgeArgs = {
  orderBy?: Maybe<Array<CollectionsImagesOrderBy>>;
};

/**
 * All input for the `updateCollectionsTagByNodeId` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionsTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CollectionsTag` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `CollectionsTag` being updated. */
  patch: CollectionsTagPatch;
};

/**
 * All input for the `updateCollectionsTag` mutation.
 * @permissions: COLLECTION_EDITOR,ADMIN
 */
export type UpdateCollectionsTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CollectionsTag` being updated. */
  patch: CollectionsTagPatch;
  collectionId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `CollectionsTag` mutation. */
export type UpdateCollectionsTagPayload = {
  __typename?: 'UpdateCollectionsTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CollectionsTag` that was updated by this mutation. */
  collectionsTag?: Maybe<CollectionsTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Collection` that is related to this `CollectionsTag`. */
  collection?: Maybe<Collection>;
  /** An edge for our `CollectionsTag`. May be used by Relay 1. */
  collectionsTagEdge?: Maybe<CollectionsTagsEdge>;
};


/** The output of our update `CollectionsTag` mutation. */
export type UpdateCollectionsTagPayloadCollectionsTagEdgeArgs = {
  orderBy?: Maybe<Array<CollectionsTagsOrderBy>>;
};

/**
 * All input for the `updateEpisodeByExternalId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodeByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Episode` being updated. */
  patch: EpisodePatch;
  externalId: Scalars['String'];
};

/**
 * All input for the `updateEpisodeByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Episode` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Episode` being updated. */
  patch: EpisodePatch;
};

/**
 * All input for the `updateEpisode` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Episode` being updated. */
  patch: EpisodePatch;
  id: Scalars['Int'];
};

/** The output of our update `Episode` mutation. */
export type UpdateEpisodePayload = {
  __typename?: 'UpdateEpisodePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Episode` that was updated by this mutation. */
  episode?: Maybe<Episode>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `Episode`. */
  season?: Maybe<Season>;
  /** An edge for our `Episode`. May be used by Relay 1. */
  episodeEdge?: Maybe<EpisodesEdge>;
};


/** The output of our update `Episode` mutation. */
export type UpdateEpisodePayloadEpisodeEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesOrderBy>>;
};

/**
 * All input for the `updateEpisodesCastByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesCastByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesCast` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `EpisodesCast` being updated. */
  patch: EpisodesCastPatch;
};

/**
 * All input for the `updateEpisodesCast` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EpisodesCast` being updated. */
  patch: EpisodesCastPatch;
  episodeId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `EpisodesCast` mutation. */
export type UpdateEpisodesCastPayload = {
  __typename?: 'UpdateEpisodesCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesCast` that was updated by this mutation. */
  episodesCast?: Maybe<EpisodesCast>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesCast`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesCast`. May be used by Relay 1. */
  episodesCastEdge?: Maybe<EpisodesCastsEdge>;
};


/** The output of our update `EpisodesCast` mutation. */
export type UpdateEpisodesCastPayloadEpisodesCastEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesCastsOrderBy>>;
};

/**
 * All input for the `updateEpisodesImageByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesImageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesImage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `EpisodesImage` being updated. */
  patch: EpisodesImagePatch;
};

/**
 * All input for the `updateEpisodesImage` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EpisodesImage` being updated. */
  patch: EpisodesImagePatch;
  episodeId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: EpisodeImageType;
};

/** The output of our update `EpisodesImage` mutation. */
export type UpdateEpisodesImagePayload = {
  __typename?: 'UpdateEpisodesImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesImage` that was updated by this mutation. */
  episodesImage?: Maybe<EpisodesImage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesImage`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesImage`. May be used by Relay 1. */
  episodesImageEdge?: Maybe<EpisodesImagesEdge>;
};


/** The output of our update `EpisodesImage` mutation. */
export type UpdateEpisodesImagePayloadEpisodesImageEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesImagesOrderBy>>;
};

/**
 * All input for the `updateEpisodesLicenseByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesLicenseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesLicense` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `EpisodesLicense` being updated. */
  patch: EpisodesLicensePatch;
};

/**
 * All input for the `updateEpisodesLicense` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EpisodesLicense` being updated. */
  patch: EpisodesLicensePatch;
  id: Scalars['Int'];
};

/** The output of our update `EpisodesLicense` mutation. */
export type UpdateEpisodesLicensePayload = {
  __typename?: 'UpdateEpisodesLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesLicense` that was updated by this mutation. */
  episodesLicense?: Maybe<EpisodesLicense>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesLicense`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesLicense`. May be used by Relay 1. */
  episodesLicenseEdge?: Maybe<EpisodesLicensesEdge>;
};


/** The output of our update `EpisodesLicense` mutation. */
export type UpdateEpisodesLicensePayloadEpisodesLicenseEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesLicensesOrderBy>>;
};

/**
 * All input for the `updateEpisodesProductionCountryByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesProductionCountryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesProductionCountry` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `EpisodesProductionCountry` being updated. */
  patch: EpisodesProductionCountryPatch;
};

/**
 * All input for the `updateEpisodesProductionCountry` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EpisodesProductionCountry` being updated. */
  patch: EpisodesProductionCountryPatch;
  episodeId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `EpisodesProductionCountry` mutation. */
export type UpdateEpisodesProductionCountryPayload = {
  __typename?: 'UpdateEpisodesProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesProductionCountry` that was updated by this mutation. */
  episodesProductionCountry?: Maybe<EpisodesProductionCountry>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesProductionCountry`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesProductionCountry`. May be used by Relay 1. */
  episodesProductionCountryEdge?: Maybe<EpisodesProductionCountriesEdge>;
};


/** The output of our update `EpisodesProductionCountry` mutation. */
export type UpdateEpisodesProductionCountryPayloadEpisodesProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesProductionCountriesOrderBy>>;
};

/**
 * All input for the `updateEpisodesTagByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesTag` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `EpisodesTag` being updated. */
  patch: EpisodesTagPatch;
};

/**
 * All input for the `updateEpisodesTag` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EpisodesTag` being updated. */
  patch: EpisodesTagPatch;
  episodeId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `EpisodesTag` mutation. */
export type UpdateEpisodesTagPayload = {
  __typename?: 'UpdateEpisodesTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTag` that was updated by this mutation. */
  episodesTag?: Maybe<EpisodesTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesTag`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesTag`. May be used by Relay 1. */
  episodesTagEdge?: Maybe<EpisodesTagsEdge>;
};


/** The output of our update `EpisodesTag` mutation. */
export type UpdateEpisodesTagPayloadEpisodesTagEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesTagsOrderBy>>;
};

/**
 * All input for the `updateEpisodesTrailerByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesTrailerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesTrailer` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `EpisodesTrailer` being updated. */
  patch: EpisodesTrailerPatch;
};

/**
 * All input for the `updateEpisodesTrailer` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EpisodesTrailer` being updated. */
  patch: EpisodesTrailerPatch;
  episodeId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** The output of our update `EpisodesTrailer` mutation. */
export type UpdateEpisodesTrailerPayload = {
  __typename?: 'UpdateEpisodesTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTrailer` that was updated by this mutation. */
  episodesTrailer?: Maybe<EpisodesTrailer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesTrailer`. */
  episode?: Maybe<Episode>;
  /** An edge for our `EpisodesTrailer`. May be used by Relay 1. */
  episodesTrailerEdge?: Maybe<EpisodesTrailersEdge>;
};


/** The output of our update `EpisodesTrailer` mutation. */
export type UpdateEpisodesTrailerPayloadEpisodesTrailerEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesTrailersOrderBy>>;
};

/**
 * All input for the `updateEpisodesTvshowGenreByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesTvshowGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EpisodesTvshowGenre` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `EpisodesTvshowGenre` being updated. */
  patch: EpisodesTvshowGenrePatch;
};

/**
 * All input for the `updateEpisodesTvshowGenre` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateEpisodesTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EpisodesTvshowGenre` being updated. */
  patch: EpisodesTvshowGenrePatch;
  episodeId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};

/** The output of our update `EpisodesTvshowGenre` mutation. */
export type UpdateEpisodesTvshowGenrePayload = {
  __typename?: 'UpdateEpisodesTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EpisodesTvshowGenre` that was updated by this mutation. */
  episodesTvshowGenre?: Maybe<EpisodesTvshowGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Episode` that is related to this `EpisodesTvshowGenre`. */
  episode?: Maybe<Episode>;
  /** Reads a single `TvshowGenre` that is related to this `EpisodesTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
  /** An edge for our `EpisodesTvshowGenre`. May be used by Relay 1. */
  episodesTvshowGenreEdge?: Maybe<EpisodesTvshowGenresEdge>;
};


/** The output of our update `EpisodesTvshowGenre` mutation. */
export type UpdateEpisodesTvshowGenrePayloadEpisodesTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<EpisodesTvshowGenresOrderBy>>;
};

/**
 * All input for the `updateMovieByExternalId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMovieByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Movie` being updated. */
  patch: MoviePatch;
  externalId: Scalars['String'];
};

/**
 * All input for the `updateMovieByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMovieByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Movie` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Movie` being updated. */
  patch: MoviePatch;
};

/**
 * All input for the `updateMovieGenreByNodeId` mutation.
 * @permissions: SETTINGS_EDITOR,ADMIN
 */
export type UpdateMovieGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MovieGenre` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MovieGenre` being updated. */
  patch: MovieGenrePatch;
};

/**
 * All input for the `updateMovieGenre` mutation.
 * @permissions: SETTINGS_EDITOR,ADMIN
 */
export type UpdateMovieGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MovieGenre` being updated. */
  patch: MovieGenrePatch;
  id: Scalars['Int'];
};

/** The output of our update `MovieGenre` mutation. */
export type UpdateMovieGenrePayload = {
  __typename?: 'UpdateMovieGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MovieGenre` that was updated by this mutation. */
  movieGenre?: Maybe<MovieGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `MovieGenre`. May be used by Relay 1. */
  movieGenreEdge?: Maybe<MovieGenresEdge>;
};


/** The output of our update `MovieGenre` mutation. */
export type UpdateMovieGenrePayloadMovieGenreEdgeArgs = {
  orderBy?: Maybe<Array<MovieGenresOrderBy>>;
};

/**
 * All input for the `updateMovie` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMovieInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Movie` being updated. */
  patch: MoviePatch;
  id: Scalars['Int'];
};

/** The output of our update `Movie` mutation. */
export type UpdateMoviePayload = {
  __typename?: 'UpdateMoviePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Movie` that was updated by this mutation. */
  movie?: Maybe<Movie>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Movie`. May be used by Relay 1. */
  movieEdge?: Maybe<MoviesEdge>;
};


/** The output of our update `Movie` mutation. */
export type UpdateMoviePayloadMovieEdgeArgs = {
  orderBy?: Maybe<Array<MoviesOrderBy>>;
};

/**
 * All input for the `updateMoviesCastByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesCastByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesCast` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MoviesCast` being updated. */
  patch: MoviesCastPatch;
};

/**
 * All input for the `updateMoviesCast` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MoviesCast` being updated. */
  patch: MoviesCastPatch;
  movieId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `MoviesCast` mutation. */
export type UpdateMoviesCastPayload = {
  __typename?: 'UpdateMoviesCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesCast` that was updated by this mutation. */
  moviesCast?: Maybe<MoviesCast>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesCast`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesCast`. May be used by Relay 1. */
  moviesCastEdge?: Maybe<MoviesCastsEdge>;
};


/** The output of our update `MoviesCast` mutation. */
export type UpdateMoviesCastPayloadMoviesCastEdgeArgs = {
  orderBy?: Maybe<Array<MoviesCastsOrderBy>>;
};

/**
 * All input for the `updateMoviesImageByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesImageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesImage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MoviesImage` being updated. */
  patch: MoviesImagePatch;
};

/**
 * All input for the `updateMoviesImage` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MoviesImage` being updated. */
  patch: MoviesImagePatch;
  movieId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: MovieImageType;
};

/** The output of our update `MoviesImage` mutation. */
export type UpdateMoviesImagePayload = {
  __typename?: 'UpdateMoviesImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesImage` that was updated by this mutation. */
  moviesImage?: Maybe<MoviesImage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesImage`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesImage`. May be used by Relay 1. */
  moviesImageEdge?: Maybe<MoviesImagesEdge>;
};


/** The output of our update `MoviesImage` mutation. */
export type UpdateMoviesImagePayloadMoviesImageEdgeArgs = {
  orderBy?: Maybe<Array<MoviesImagesOrderBy>>;
};

/**
 * All input for the `updateMoviesLicenseByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesLicenseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesLicense` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MoviesLicense` being updated. */
  patch: MoviesLicensePatch;
};

/**
 * All input for the `updateMoviesLicense` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MoviesLicense` being updated. */
  patch: MoviesLicensePatch;
  id: Scalars['Int'];
};

/** The output of our update `MoviesLicense` mutation. */
export type UpdateMoviesLicensePayload = {
  __typename?: 'UpdateMoviesLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesLicense` that was updated by this mutation. */
  moviesLicense?: Maybe<MoviesLicense>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesLicense`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesLicense`. May be used by Relay 1. */
  moviesLicenseEdge?: Maybe<MoviesLicensesEdge>;
};


/** The output of our update `MoviesLicense` mutation. */
export type UpdateMoviesLicensePayloadMoviesLicenseEdgeArgs = {
  orderBy?: Maybe<Array<MoviesLicensesOrderBy>>;
};

/**
 * All input for the `updateMoviesMovieGenreByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesMovieGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesMovieGenre` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MoviesMovieGenre` being updated. */
  patch: MoviesMovieGenrePatch;
};

/**
 * All input for the `updateMoviesMovieGenre` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesMovieGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MoviesMovieGenre` being updated. */
  patch: MoviesMovieGenrePatch;
  movieId: Scalars['Int'];
  movieGenresId: Scalars['Int'];
};

/** The output of our update `MoviesMovieGenre` mutation. */
export type UpdateMoviesMovieGenrePayload = {
  __typename?: 'UpdateMoviesMovieGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesMovieGenre` that was updated by this mutation. */
  moviesMovieGenre?: Maybe<MoviesMovieGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesMovieGenre`. */
  movie?: Maybe<Movie>;
  /** Reads a single `MovieGenre` that is related to this `MoviesMovieGenre`. */
  movieGenres?: Maybe<MovieGenre>;
  /** An edge for our `MoviesMovieGenre`. May be used by Relay 1. */
  moviesMovieGenreEdge?: Maybe<MoviesMovieGenresEdge>;
};


/** The output of our update `MoviesMovieGenre` mutation. */
export type UpdateMoviesMovieGenrePayloadMoviesMovieGenreEdgeArgs = {
  orderBy?: Maybe<Array<MoviesMovieGenresOrderBy>>;
};

/**
 * All input for the `updateMoviesProductionCountryByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesProductionCountryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesProductionCountry` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MoviesProductionCountry` being updated. */
  patch: MoviesProductionCountryPatch;
};

/**
 * All input for the `updateMoviesProductionCountry` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MoviesProductionCountry` being updated. */
  patch: MoviesProductionCountryPatch;
  movieId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `MoviesProductionCountry` mutation. */
export type UpdateMoviesProductionCountryPayload = {
  __typename?: 'UpdateMoviesProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesProductionCountry` that was updated by this mutation. */
  moviesProductionCountry?: Maybe<MoviesProductionCountry>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesProductionCountry`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesProductionCountry`. May be used by Relay 1. */
  moviesProductionCountryEdge?: Maybe<MoviesProductionCountriesEdge>;
};


/** The output of our update `MoviesProductionCountry` mutation. */
export type UpdateMoviesProductionCountryPayloadMoviesProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<MoviesProductionCountriesOrderBy>>;
};

/**
 * All input for the `updateMoviesTagByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesTag` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MoviesTag` being updated. */
  patch: MoviesTagPatch;
};

/**
 * All input for the `updateMoviesTag` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MoviesTag` being updated. */
  patch: MoviesTagPatch;
  movieId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `MoviesTag` mutation. */
export type UpdateMoviesTagPayload = {
  __typename?: 'UpdateMoviesTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesTag` that was updated by this mutation. */
  moviesTag?: Maybe<MoviesTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesTag`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesTag`. May be used by Relay 1. */
  moviesTagEdge?: Maybe<MoviesTagsEdge>;
};


/** The output of our update `MoviesTag` mutation. */
export type UpdateMoviesTagPayloadMoviesTagEdgeArgs = {
  orderBy?: Maybe<Array<MoviesTagsOrderBy>>;
};

/**
 * All input for the `updateMoviesTrailerByNodeId` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesTrailerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MoviesTrailer` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MoviesTrailer` being updated. */
  patch: MoviesTrailerPatch;
};

/**
 * All input for the `updateMoviesTrailer` mutation.
 * @permissions: MOVIE_EDITOR,ADMIN
 */
export type UpdateMoviesTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MoviesTrailer` being updated. */
  patch: MoviesTrailerPatch;
  movieId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** The output of our update `MoviesTrailer` mutation. */
export type UpdateMoviesTrailerPayload = {
  __typename?: 'UpdateMoviesTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MoviesTrailer` that was updated by this mutation. */
  moviesTrailer?: Maybe<MoviesTrailer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Movie` that is related to this `MoviesTrailer`. */
  movie?: Maybe<Movie>;
  /** An edge for our `MoviesTrailer`. May be used by Relay 1. */
  moviesTrailerEdge?: Maybe<MoviesTrailersEdge>;
};


/** The output of our update `MoviesTrailer` mutation. */
export type UpdateMoviesTrailerPayloadMoviesTrailerEdgeArgs = {
  orderBy?: Maybe<Array<MoviesTrailersOrderBy>>;
};

/**
 * All input for the `updateSeasonByExternalId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Season` being updated. */
  patch: SeasonPatch;
  externalId: Scalars['String'];
};

/**
 * All input for the `updateSeasonByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Season` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Season` being updated. */
  patch: SeasonPatch;
};

/**
 * All input for the `updateSeason` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Season` being updated. */
  patch: SeasonPatch;
  id: Scalars['Int'];
};

/** The output of our update `Season` mutation. */
export type UpdateSeasonPayload = {
  __typename?: 'UpdateSeasonPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Season` that was updated by this mutation. */
  season?: Maybe<Season>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `Season`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `Season`. May be used by Relay 1. */
  seasonEdge?: Maybe<SeasonsEdge>;
};


/** The output of our update `Season` mutation. */
export type UpdateSeasonPayloadSeasonEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsOrderBy>>;
};

/**
 * All input for the `updateSeasonsCastByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsCastByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsCast` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SeasonsCast` being updated. */
  patch: SeasonsCastPatch;
};

/**
 * All input for the `updateSeasonsCast` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SeasonsCast` being updated. */
  patch: SeasonsCastPatch;
  seasonId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `SeasonsCast` mutation. */
export type UpdateSeasonsCastPayload = {
  __typename?: 'UpdateSeasonsCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsCast` that was updated by this mutation. */
  seasonsCast?: Maybe<SeasonsCast>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsCast`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsCast`. May be used by Relay 1. */
  seasonsCastEdge?: Maybe<SeasonsCastsEdge>;
};


/** The output of our update `SeasonsCast` mutation. */
export type UpdateSeasonsCastPayloadSeasonsCastEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsCastsOrderBy>>;
};

/**
 * All input for the `updateSeasonsImageByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsImageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsImage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SeasonsImage` being updated. */
  patch: SeasonsImagePatch;
};

/**
 * All input for the `updateSeasonsImage` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SeasonsImage` being updated. */
  patch: SeasonsImagePatch;
  seasonId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: SeasonImageType;
};

/** The output of our update `SeasonsImage` mutation. */
export type UpdateSeasonsImagePayload = {
  __typename?: 'UpdateSeasonsImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsImage` that was updated by this mutation. */
  seasonsImage?: Maybe<SeasonsImage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsImage`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsImage`. May be used by Relay 1. */
  seasonsImageEdge?: Maybe<SeasonsImagesEdge>;
};


/** The output of our update `SeasonsImage` mutation. */
export type UpdateSeasonsImagePayloadSeasonsImageEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsImagesOrderBy>>;
};

/**
 * All input for the `updateSeasonsLicenseByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsLicenseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsLicense` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SeasonsLicense` being updated. */
  patch: SeasonsLicensePatch;
};

/**
 * All input for the `updateSeasonsLicense` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SeasonsLicense` being updated. */
  patch: SeasonsLicensePatch;
  id: Scalars['Int'];
};

/** The output of our update `SeasonsLicense` mutation. */
export type UpdateSeasonsLicensePayload = {
  __typename?: 'UpdateSeasonsLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsLicense` that was updated by this mutation. */
  seasonsLicense?: Maybe<SeasonsLicense>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsLicense`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsLicense`. May be used by Relay 1. */
  seasonsLicenseEdge?: Maybe<SeasonsLicensesEdge>;
};


/** The output of our update `SeasonsLicense` mutation. */
export type UpdateSeasonsLicensePayloadSeasonsLicenseEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsLicensesOrderBy>>;
};

/**
 * All input for the `updateSeasonsProductionCountryByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsProductionCountryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsProductionCountry` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SeasonsProductionCountry` being updated. */
  patch: SeasonsProductionCountryPatch;
};

/**
 * All input for the `updateSeasonsProductionCountry` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SeasonsProductionCountry` being updated. */
  patch: SeasonsProductionCountryPatch;
  seasonId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `SeasonsProductionCountry` mutation. */
export type UpdateSeasonsProductionCountryPayload = {
  __typename?: 'UpdateSeasonsProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsProductionCountry` that was updated by this mutation. */
  seasonsProductionCountry?: Maybe<SeasonsProductionCountry>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsProductionCountry`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsProductionCountry`. May be used by Relay 1. */
  seasonsProductionCountryEdge?: Maybe<SeasonsProductionCountriesEdge>;
};


/** The output of our update `SeasonsProductionCountry` mutation. */
export type UpdateSeasonsProductionCountryPayloadSeasonsProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsProductionCountriesOrderBy>>;
};

/**
 * All input for the `updateSeasonsTagByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsTag` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SeasonsTag` being updated. */
  patch: SeasonsTagPatch;
};

/**
 * All input for the `updateSeasonsTag` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SeasonsTag` being updated. */
  patch: SeasonsTagPatch;
  seasonId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `SeasonsTag` mutation. */
export type UpdateSeasonsTagPayload = {
  __typename?: 'UpdateSeasonsTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTag` that was updated by this mutation. */
  seasonsTag?: Maybe<SeasonsTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsTag`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsTag`. May be used by Relay 1. */
  seasonsTagEdge?: Maybe<SeasonsTagsEdge>;
};


/** The output of our update `SeasonsTag` mutation. */
export type UpdateSeasonsTagPayloadSeasonsTagEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsTagsOrderBy>>;
};

/**
 * All input for the `updateSeasonsTrailerByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsTrailerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsTrailer` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SeasonsTrailer` being updated. */
  patch: SeasonsTrailerPatch;
};

/**
 * All input for the `updateSeasonsTrailer` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SeasonsTrailer` being updated. */
  patch: SeasonsTrailerPatch;
  seasonId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** The output of our update `SeasonsTrailer` mutation. */
export type UpdateSeasonsTrailerPayload = {
  __typename?: 'UpdateSeasonsTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTrailer` that was updated by this mutation. */
  seasonsTrailer?: Maybe<SeasonsTrailer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsTrailer`. */
  season?: Maybe<Season>;
  /** An edge for our `SeasonsTrailer`. May be used by Relay 1. */
  seasonsTrailerEdge?: Maybe<SeasonsTrailersEdge>;
};


/** The output of our update `SeasonsTrailer` mutation. */
export type UpdateSeasonsTrailerPayloadSeasonsTrailerEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsTrailersOrderBy>>;
};

/**
 * All input for the `updateSeasonsTvshowGenreByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsTvshowGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SeasonsTvshowGenre` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SeasonsTvshowGenre` being updated. */
  patch: SeasonsTvshowGenrePatch;
};

/**
 * All input for the `updateSeasonsTvshowGenre` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateSeasonsTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SeasonsTvshowGenre` being updated. */
  patch: SeasonsTvshowGenrePatch;
  seasonId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};

/** The output of our update `SeasonsTvshowGenre` mutation. */
export type UpdateSeasonsTvshowGenrePayload = {
  __typename?: 'UpdateSeasonsTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SeasonsTvshowGenre` that was updated by this mutation. */
  seasonsTvshowGenre?: Maybe<SeasonsTvshowGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Season` that is related to this `SeasonsTvshowGenre`. */
  season?: Maybe<Season>;
  /** Reads a single `TvshowGenre` that is related to this `SeasonsTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
  /** An edge for our `SeasonsTvshowGenre`. May be used by Relay 1. */
  seasonsTvshowGenreEdge?: Maybe<SeasonsTvshowGenresEdge>;
};


/** The output of our update `SeasonsTvshowGenre` mutation. */
export type UpdateSeasonsTvshowGenrePayloadSeasonsTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<SeasonsTvshowGenresOrderBy>>;
};

/**
 * All input for the `updateTvshowByExternalId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowByExternalIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Tvshow` being updated. */
  patch: TvshowPatch;
  externalId: Scalars['String'];
};

/**
 * All input for the `updateTvshowByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Tvshow` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Tvshow` being updated. */
  patch: TvshowPatch;
};

/**
 * All input for the `updateTvshowGenreByNodeId` mutation.
 * @permissions: SETTINGS_EDITOR,ADMIN
 */
export type UpdateTvshowGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowGenre` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TvshowGenre` being updated. */
  patch: TvshowGenrePatch;
};

/**
 * All input for the `updateTvshowGenre` mutation.
 * @permissions: SETTINGS_EDITOR,ADMIN
 */
export type UpdateTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TvshowGenre` being updated. */
  patch: TvshowGenrePatch;
  id: Scalars['Int'];
};

/** The output of our update `TvshowGenre` mutation. */
export type UpdateTvshowGenrePayload = {
  __typename?: 'UpdateTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowGenre` that was updated by this mutation. */
  tvshowGenre?: Maybe<TvshowGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `TvshowGenre`. May be used by Relay 1. */
  tvshowGenreEdge?: Maybe<TvshowGenresEdge>;
};


/** The output of our update `TvshowGenre` mutation. */
export type UpdateTvshowGenrePayloadTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<TvshowGenresOrderBy>>;
};

/**
 * All input for the `updateTvshow` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Tvshow` being updated. */
  patch: TvshowPatch;
  id: Scalars['Int'];
};

/** The output of our update `Tvshow` mutation. */
export type UpdateTvshowPayload = {
  __typename?: 'UpdateTvshowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tvshow` that was updated by this mutation. */
  tvshow?: Maybe<Tvshow>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Tvshow`. May be used by Relay 1. */
  tvshowEdge?: Maybe<TvshowsEdge>;
};


/** The output of our update `Tvshow` mutation. */
export type UpdateTvshowPayloadTvshowEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsOrderBy>>;
};

/**
 * All input for the `updateTvshowsCastByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsCastByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsCast` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TvshowsCast` being updated. */
  patch: TvshowsCastPatch;
};

/**
 * All input for the `updateTvshowsCast` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsCastInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TvshowsCast` being updated. */
  patch: TvshowsCastPatch;
  tvshowId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `TvshowsCast` mutation. */
export type UpdateTvshowsCastPayload = {
  __typename?: 'UpdateTvshowsCastPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsCast` that was updated by this mutation. */
  tvshowsCast?: Maybe<TvshowsCast>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsCast`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsCast`. May be used by Relay 1. */
  tvshowsCastEdge?: Maybe<TvshowsCastsEdge>;
};


/** The output of our update `TvshowsCast` mutation. */
export type UpdateTvshowsCastPayloadTvshowsCastEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsCastsOrderBy>>;
};

/**
 * All input for the `updateTvshowsImageByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsImageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsImage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TvshowsImage` being updated. */
  patch: TvshowsImagePatch;
};

/**
 * All input for the `updateTvshowsImage` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsImageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TvshowsImage` being updated. */
  patch: TvshowsImagePatch;
  tvshowId: Scalars['Int'];
  imageId: Scalars['Int'];
  imageType: TvshowImageType;
};

/** The output of our update `TvshowsImage` mutation. */
export type UpdateTvshowsImagePayload = {
  __typename?: 'UpdateTvshowsImagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsImage` that was updated by this mutation. */
  tvshowsImage?: Maybe<TvshowsImage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsImage`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsImage`. May be used by Relay 1. */
  tvshowsImageEdge?: Maybe<TvshowsImagesEdge>;
};


/** The output of our update `TvshowsImage` mutation. */
export type UpdateTvshowsImagePayloadTvshowsImageEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsImagesOrderBy>>;
};

/**
 * All input for the `updateTvshowsLicenseByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsLicenseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsLicense` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TvshowsLicense` being updated. */
  patch: TvshowsLicensePatch;
};

/**
 * All input for the `updateTvshowsLicense` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsLicenseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TvshowsLicense` being updated. */
  patch: TvshowsLicensePatch;
  id: Scalars['Int'];
};

/** The output of our update `TvshowsLicense` mutation. */
export type UpdateTvshowsLicensePayload = {
  __typename?: 'UpdateTvshowsLicensePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsLicense` that was updated by this mutation. */
  tvshowsLicense?: Maybe<TvshowsLicense>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsLicense`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsLicense`. May be used by Relay 1. */
  tvshowsLicenseEdge?: Maybe<TvshowsLicensesEdge>;
};


/** The output of our update `TvshowsLicense` mutation. */
export type UpdateTvshowsLicensePayloadTvshowsLicenseEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsLicensesOrderBy>>;
};

/**
 * All input for the `updateTvshowsProductionCountryByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsProductionCountryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsProductionCountry` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TvshowsProductionCountry` being updated. */
  patch: TvshowsProductionCountryPatch;
};

/**
 * All input for the `updateTvshowsProductionCountry` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsProductionCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TvshowsProductionCountry` being updated. */
  patch: TvshowsProductionCountryPatch;
  tvshowId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `TvshowsProductionCountry` mutation. */
export type UpdateTvshowsProductionCountryPayload = {
  __typename?: 'UpdateTvshowsProductionCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsProductionCountry` that was updated by this mutation. */
  tvshowsProductionCountry?: Maybe<TvshowsProductionCountry>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsProductionCountry`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsProductionCountry`. May be used by Relay 1. */
  tvshowsProductionCountryEdge?: Maybe<TvshowsProductionCountriesEdge>;
};


/** The output of our update `TvshowsProductionCountry` mutation. */
export type UpdateTvshowsProductionCountryPayloadTvshowsProductionCountryEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsProductionCountriesOrderBy>>;
};

/**
 * All input for the `updateTvshowsTagByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsTagByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsTag` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TvshowsTag` being updated. */
  patch: TvshowsTagPatch;
};

/**
 * All input for the `updateTvshowsTag` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TvshowsTag` being updated. */
  patch: TvshowsTagPatch;
  tvshowId: Scalars['Int'];
  /** @notEmpty() */
  name: Scalars['String'];
};

/** The output of our update `TvshowsTag` mutation. */
export type UpdateTvshowsTagPayload = {
  __typename?: 'UpdateTvshowsTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTag` that was updated by this mutation. */
  tvshowsTag?: Maybe<TvshowsTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsTag`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsTag`. May be used by Relay 1. */
  tvshowsTagEdge?: Maybe<TvshowsTagsEdge>;
};


/** The output of our update `TvshowsTag` mutation. */
export type UpdateTvshowsTagPayloadTvshowsTagEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsTagsOrderBy>>;
};

/**
 * All input for the `updateTvshowsTrailerByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsTrailerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsTrailer` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TvshowsTrailer` being updated. */
  patch: TvshowsTrailerPatch;
};

/**
 * All input for the `updateTvshowsTrailer` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsTrailerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TvshowsTrailer` being updated. */
  patch: TvshowsTrailerPatch;
  tvshowId: Scalars['Int'];
  videoId: Scalars['Int'];
};

/** The output of our update `TvshowsTrailer` mutation. */
export type UpdateTvshowsTrailerPayload = {
  __typename?: 'UpdateTvshowsTrailerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTrailer` that was updated by this mutation. */
  tvshowsTrailer?: Maybe<TvshowsTrailer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsTrailer`. */
  tvshow?: Maybe<Tvshow>;
  /** An edge for our `TvshowsTrailer`. May be used by Relay 1. */
  tvshowsTrailerEdge?: Maybe<TvshowsTrailersEdge>;
};


/** The output of our update `TvshowsTrailer` mutation. */
export type UpdateTvshowsTrailerPayloadTvshowsTrailerEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsTrailersOrderBy>>;
};

/**
 * All input for the `updateTvshowsTvshowGenreByNodeId` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsTvshowGenreByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TvshowsTvshowGenre` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TvshowsTvshowGenre` being updated. */
  patch: TvshowsTvshowGenrePatch;
};

/**
 * All input for the `updateTvshowsTvshowGenre` mutation.
 * @permissions: TVSHOW_EDITOR,ADMIN
 */
export type UpdateTvshowsTvshowGenreInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TvshowsTvshowGenre` being updated. */
  patch: TvshowsTvshowGenrePatch;
  tvshowId: Scalars['Int'];
  tvshowGenresId: Scalars['Int'];
};

/** The output of our update `TvshowsTvshowGenre` mutation. */
export type UpdateTvshowsTvshowGenrePayload = {
  __typename?: 'UpdateTvshowsTvshowGenrePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `TvshowsTvshowGenre` that was updated by this mutation. */
  tvshowsTvshowGenre?: Maybe<TvshowsTvshowGenre>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tvshow` that is related to this `TvshowsTvshowGenre`. */
  tvshow?: Maybe<Tvshow>;
  /** Reads a single `TvshowGenre` that is related to this `TvshowsTvshowGenre`. */
  tvshowGenres?: Maybe<TvshowGenre>;
  /** An edge for our `TvshowsTvshowGenre`. May be used by Relay 1. */
  tvshowsTvshowGenreEdge?: Maybe<TvshowsTvshowGenresEdge>;
};


/** The output of our update `TvshowsTvshowGenre` mutation. */
export type UpdateTvshowsTvshowGenrePayloadTvshowsTvshowGenreEdgeArgs = {
  orderBy?: Maybe<Array<TvshowsTvshowGenresOrderBy>>;
};
