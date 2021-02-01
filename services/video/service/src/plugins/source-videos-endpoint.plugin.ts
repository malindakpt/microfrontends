import { BlobServiceClient } from '@azure/storage-blob';
import { gql, makeExtendSchemaPlugin } from 'graphile-utils';
import { GraphQLSchema } from 'graphql';
import { Build } from 'postgraphile';
import * as urljoin from 'url-join';

import { handledError } from '../common';
import {
  GetAcquisitionProfileDocument,
  Query,
  TranscodingAcquisitionProfile,
} from '../generated/types';

const getAcquisitionProfile = async (
  build: Build,
  schema: GraphQLSchema,
  context: any,
): Promise<TranscodingAcquisitionProfile> => {
  const queryResult = await build.graphql.execute<Query>(
    schema,
    GetAcquisitionProfileDocument,
    undefined,
    context,
  );
  const acquisitionProfile =
    queryResult.data?.transcodingAcquisitionProfiles?.nodes?.[0];

  if (!acquisitionProfile) {
    throw new Error(`Unable to retrieve transcoding acquisition profile data`);
  }

  return acquisitionProfile;
};

export const getFilterPrefix = (
  rootFolderPath: string,
  startsWith: string,
): string => {
  const filter = startsWith?.split('/')[0] ?? '';
  let result = urljoin(rootFolderPath ?? '', filter);
  if (rootFolderPath && !filter) {
    result += '/';
  }
  return result;
};

export const SourceVideosEndpointPlugin = makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      type SourceVideoPageInfo {
        hasNextPage: Boolean!
        endCursor: Cursor
      }
      input SourceVideoStringFilter {
        startsWith: String
      }
      input SourceVideoFilter {
        path: SourceVideoStringFilter
      }
      input SourceVideoInput {
        after: String
        first: Int
        filter: SourceVideoFilter
      }
      type SourceVideo {
        path: String!
      }
      type SourceVideoPayload {
        nodes: [SourceVideo]!
        pageInfo: SourceVideoPageInfo
        query: Query
      }
      extend type Query {
        sourceVideos(input: SourceVideoInput): SourceVideoPayload
      }
    `,
    resolvers: {
      Query: {
        sourceVideos: async (query, args, context, { schema }) => {
          try {
            const profile = await getAcquisitionProfile(build, schema, context);

            const continuationToken = args?.input?.after;
            const maxPageSize = args?.input?.first;
            const prefix = getFilterPrefix(
              profile.rootFolderPath,
              args?.input?.filter?.path?.startsWith,
            );
            const sasUrl = urljoin(
              profile.uriPath,
              profile.listCredentialsSecret,
            );
            const blobClient = new BlobServiceClient(sasUrl);
            const containerClient = blobClient.getContainerClient('');
            const { value } = await containerClient
              .listBlobsByHierarchy('/', { prefix })
              .byPage({ maxPageSize, continuationToken })
              .next();
            const nodes = value.segment.blobPrefixes.map(p => ({
              path: p.name.replace(/\/+$/g, ''),
            }));

            return {
              nodes,
              pageInfo: {
                hasNextPage: !!value.continuationToken,
                endCursor: value.continuationToken,
              },
              query: build.$$isQuery,
            };
          } catch (error) {
            throw handledError(
              error,
              `Attempt to retrieve source videos metadata from storage has failed.`,
            );
          }
        },
      },
    },
  };
});
