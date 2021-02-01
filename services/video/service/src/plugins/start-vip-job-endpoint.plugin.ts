import { popUrlSegment } from '@ax/service-common';
import { gql, makeExtendSchemaPlugin } from 'graphile-utils';
import { GraphileHelpers } from 'graphile-utils/node8plus/fieldHelpers';
import { GraphQLSchema } from 'graphql';
import { Build } from 'postgraphile';
import { sql } from 'slonik';

import { handledError } from '../common';
import { PgConstraintNames } from '../common/errors';
import { PgClient } from '../database';
import {
  GetTranscodingProfilesDocument,
  GetTranscodingProfilesQueryVariables,
  Query,
  Video,
} from '../generated/types';
import { IProfilesData, startVipJob } from '../vip';

const getExternalId = (id: number, key: string): string => {
  const paddedId = id.toString().padStart(6, '0');
  return `${paddedId}-${key}`;
};

const getProfiles = async (
  processingProfileId: number,
  build: Build,
  schema: GraphQLSchema,
  context: any,
): Promise<IProfilesData> => {
  const variables: GetTranscodingProfilesQueryVariables = {
    processingProfileId,
  };
  const queryResult = await build.graphql.execute<Query>(
    schema,
    GetTranscodingProfilesDocument,
    undefined,
    context,
    variables,
  );
  const acquisitionProfile =
    queryResult.data?.transcodingAcquisitionProfiles?.nodes[0];
  const publishingProfile =
    queryResult.data?.transcodingPublishingProfiles?.nodes[0];
  const processingProfile = queryResult.data?.transcodingProcessingProfile;

  if (!acquisitionProfile || !publishingProfile || !processingProfile) {
    throw new Error(`Unable to retrieve transcoding profiles data`);
  }

  return {
    acquisitionProfile,
    publishingProfile,
    processingProfile,
  };
};

const getValidationMessages = (error: any): string[] => {
  if (error.response?.body) {
    // Vip validation
    return error.response.body;
  }

  if (error.constraint === PgConstraintNames.SourceLocationIsUnique) {
    return ['Selected source video was already processed.'];
  }

  return [error.message];
};

const getVideoPgField = async (
  videoId: number,
  build: Build,
  graphile: GraphileHelpers<any>,
): Promise<any> => {
  const { pgSql } = build;
  const [row] = await graphile.selectGraphQLResultFromTable(
    pgSql.fragment`app_public.videos`,
    (tableAlias, queryBuilder) => {
      queryBuilder.where(
        pgSql.fragment`${tableAlias}.id = ${pgSql.value(videoId)}`,
      );
    },
  );
  return row;
};

export const StartVipJobEndpointPlugin = makeExtendSchemaPlugin(
  (build, { vipJobUrl, vipAuthHeader, vipServiceBusConnection }) => {
    return {
      typeDefs: gql`
        input StartVipJobInput {
          clientMutationId: String
          videoRelativePath: String!
          processingProfileId: Int!
        }
        type StartVipJobPayload {
          video: Video @pgField
          query: Query
        }
        extend type Mutation {
          startVipJob(input: StartVipJobInput!): StartVipJobPayload
        }
      `,
      resolvers: {
        Mutation: {
          startVipJob: async (query, args, context, { schema, graphile }) => {
            let pgClient: PgClient;
            try {
              pgClient = await PgClient.create(context.ownerPool, {
                'ax.claims.username': context.user?.name || 'Anonymous',
              });

              const videoRelativePath = args.input.videoRelativePath;
              const videoFolderName = popUrlSegment(videoRelativePath);

              const profilesData = await getProfiles(
                args.input.processingProfileId,
                build,
                schema,
                context,
              );

              const video = await pgClient.queryExactlyOne<Video>(
                sql`INSERT INTO app_public.videos(title, output_format, source_location)
                    VALUES (${videoFolderName}, ${profilesData.processingProfile.outputFormat}, ${videoRelativePath})
                    RETURNING id;`,
              );

              const externalId = getExternalId(video.id, videoFolderName);

              const { jobId, keyId } = await startVipJob(
                videoRelativePath,
                externalId,
                profilesData,
                vipServiceBusConnection,
                vipJobUrl,
                vipAuthHeader,
              );

              await pgClient.queryExactlyOne<Video>(
                sql`UPDATE app_public.videos 
                    SET (external_id, job_id, drm_key_id, is_protected) = (${externalId}, ${jobId}, ${keyId}, ${!!keyId}) 
                    WHERE id = ${video.id}`,
              );

              await pgClient.commitTransaction();

              const data = await getVideoPgField(video.id, build, graphile);
              return { data, query: build.$$isQuery };
            } catch (error) {
              await pgClient?.rollbackTransaction();
              throw handledError(
                error,
                {
                  details: {
                    validation: getValidationMessages(error),
                  },
                },
                `Attempt to start VIP processing job has failed`,
              );
            } finally {
              pgClient?.release();
            }
          },
        },
      },
    };
  },
);
