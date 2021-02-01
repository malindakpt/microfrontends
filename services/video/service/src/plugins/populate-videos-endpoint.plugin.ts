import * as faker from 'faker';
import { gql, makeExtendSchemaPlugin } from 'graphile-utils';
import { PoolClient } from 'pg';

import { config, Logger } from '../common';
import { VipQueueName } from '../vip';

// expand(3, 2) returns "($1, $2), ($3, $4), ($5, $6)"
const expand = (rowCount, columnCount, startAt = 1): string => {
  let index = startAt;
  return Array(rowCount)
    .fill(0)
    .map(
      v =>
        `(${Array(columnCount)
          .fill(0)
          .map(v => `$${index++}`)
          .join(', ')})`,
    )
    .join(', ');
};

// flatten([[1, 2], [3, 4]]) returns [1, 2, 3, 4]
const flatten = (arr): any[] => {
  const newArr = [];
  arr.forEach(v => v.forEach(p => newArr.push(p)));
  return newArr;
};

const randomArray = (min, max, getValue) => {
  const len = faker.random.number({ min, max });
  const array = [];

  for (let i = 0; i < len; ++i) {
    const value = getValue(i);
    if (!array.find(a => a === value)) {
      array.push(value);
    }
  }

  return array;
};

const generateSampleAsset = (): any[] => {
  const values = [];
  const folderName = `${faker.random.words().trim()}_${faker.random.uuid()}`;
  const externalId = `${faker.random
    .number({ min: 1, max: 999999 })
    .toString()
    .padStart(6, '0')}-${folderName}`;
  values.push(
    faker.random.words().trim() || 'Oh Noooo! Empty String was here!',
  ); //title
  values.push(externalId); //external_id
  const ext = faker.random.arrayElement([
    '.mp4',
    '.wmv',
    '.avi',
    '.mov',
    '.mkv',
  ]);
  const fileName = `${faker.random.words().trim()}${ext}`;
  values.push(fileName); //source_file_name
  values.push(ext); //source_file_extension
  values.push(folderName); //source_location
  values.push(faker.random.number({ min: 10000000000, max: 50000000000 })); //source_size_in_bytes
  const codes = ['de', 'en', 'ru', 'ee', 'ar', 'fr', 'ja', 'zh'];
  values.push(
    randomArray(0, 8, () => {
      return faker.random.arrayElement(codes);
    }),
  ); //audio_languages
  values.push(
    randomArray(0, 8, () => {
      return faker.random.arrayElement(codes);
    }),
  ); //subtitle_languages
  values.push(
    randomArray(0, 8, () => {
      return faker.random.arrayElement(codes);
    }),
  ); //caption_languages
  const status = faker.random.arrayElement([
    'WAITING',
    'IN_PROGRESS',
    'READY',
    'ERROR',
  ]);
  values.push(status); //transcoding_status
  values.push(
    status === 'WAITING' ? 0 : faker.random.number({ min: 0, max: 100 }),
  ); //acquisition_progress
  values.push(
    status === 'WAITING' ? 0 : faker.random.number({ min: 0, max: 100 }),
  ); //encoding_progress
  const approval = faker.random.arrayElement([
    'NOT_PREVIEWED',
    'NOT_APPROVED',
    'APPROVED',
  ]);
  values.push(approval); //qa_status
  values.push(approval === 'NOT_APPROVED' ? faker.lorem.paragraph() : null); //qa_comment
  const outputFormat = faker.random.arrayElement([
    'HLS',
    'DASH',
    'HLS_DASH',
    'CMAF',
  ]);
  values.push(outputFormat); //output_format
  const dashManifest =
    randomArray(0, 1, () => {
      return `https://populate-dummy-storage.blob.core.windows.net/transcoded/${externalId}/dash/manifest.mpd`;
    })?.[0] ?? null;
  values.push(dashManifest); //dash_manifest_path
  const hlsManifest =
    randomArray(0, 1, () => {
      return `https://populate-dummy-storage.blob.core.windows.net/transcoded/${externalId}/hls/manifest.mpd`;
    })?.[0] ?? null;
  values.push(hlsManifest); //hls_manifest_path
  values.push(
    dashManifest
      ? faker.random.number({ min: 10000000000, max: 50000000000 })
      : null,
  ); //dash_size_in_bytes
  values.push(
    hlsManifest
      ? faker.random.number({ min: 10000000000, max: 50000000000 })
      : null,
  ); //hls_size_in_bytes
  const cmafSize =
    randomArray(0, 1, () => {
      return faker.random.number({ min: 10000000000, max: 50000000000 });
    })?.[0] ?? null;
  values.push(cmafSize); //cmaf_size_in_bytes
  const drmKeyId =
    randomArray(0, 1, () => {
      return faker.random.uuid();
    })?.[0] ?? null;
  values.push(drmKeyId); //drm_key_id
  values.push(!!drmKeyId); //is_protected
  values.push(faker.random.uuid()); //job_id
  values.push(faker.random.number({ min: 3600, max: 7200 })); //duration_in_seconds
  values.push(faker.date.recent()); //finished_date
  values.push(
    randomArray(1, 7, () => {
      return faker.random.arrayElement([
        500,
        1000,
        1600,
        2100,
        3000,
        4500,
        6000,
      ]);
    }),
  ); // video_bitrates,
  values.push(faker.random.boolean()); //is_archived
  values.push(faker.fake('{{name.lastName}}, {{name.firstName}}')); //created_user
  values.push(faker.fake('{{name.lastName}}, {{name.firstName}}')); //updated_user
  values.push(faker.date.recent()); //created_date
  values.push(faker.date.recent()); //updated_date
  return values;
};

const generateVideosData = (count: number): any[] => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(generateSampleAsset());
  }
  return result;
};

const splitCount = (totalLength: number): number[] => {
  const batchCount = 2000;
  const count = Math.floor(totalLength / batchCount);
  const array = [];
  for (let i = 1; i <= count; i++) {
    array.push(batchCount);
  }
  const leftover = totalLength % batchCount;
  if (leftover > 0) {
    array.push(leftover);
  }
  return array;
};

const insertTags = async (
  client: PoolClient,
  videoId: number,
): Promise<void> => {
  const tags = randomArray(0, 4, () => {
    return faker.random.word();
  });
  for await (const tag of tags) {
    await client.query(
      `INSERT INTO app_public.videos_tags(video_id, name) VALUES ($1, $2);`,
      [videoId, tag],
    );
  }
};

const insertHistory = async (
  client: PoolClient,
  videoId: number,
  status: string,
): Promise<void> => {
  const messageNames = Object.keys(VipQueueName)
    .map(x => x.replace('Queue', ''))
    .filter(value => value !== 'JobSuccess' && value !== 'FinalError');
  const messages = randomArray(0, 10, () => {
    return faker.random.arrayElement(messageNames);
  });
  const progressCount = faker.random.number({ min: 0, max: 10 });
  for (let index = 0; index < progressCount; index++) {
    messages.push('EncodingProgress');
  }
  switch (status) {
    case 'WAITING':
      return;
    case 'READY':
      messages.push('JobSuccess');
      break;
    case 'ERROR':
      messages.push('FinalError');
      break;
  }
  for await (const message of messages) {
    await client.query(
      `INSERT INTO app_public.transcoding_histories(video_id, message_type, message_body, enqueued_date) VALUES ($1, $2, $3, $4);`,
      [videoId, message, '{"test": "test"}', faker.date.recent()],
    );
  }
};

export const PopulateVideosEndpointPlugin = makeExtendSchemaPlugin(build => {
  const logger = new Logger(config, 'populate');
  return {
    typeDefs: gql`
      input PopulateInput {
        clientMutationId: String
        count: Int!
      }
      type PopulatePayload {
        count: Int!
        query: Query
      }
      extend type Mutation {
        populateVideos(input: PopulateInput!): PopulatePayload
      }
    `,
    resolvers: {
      Mutation: {
        populateVideos: async (query, args, { ownerPool }, resolveInfo) => {
          console.time('populate');
          const count = args.input.count;
          const client: PoolClient = await ownerPool.connect();
          try {
            await client.query('begin');

            // disables all triggers
            await client.query("set session_replication_role = 'replica'");

            const batches = splitCount(count);
            for await (const batch of batches) {
              try {
                const elements = generateVideosData(batch);
                const insertedVideos = (
                  await client.query(
                    `INSERT INTO app_public.videos(title, 
                                                   external_id, 
                                                   source_file_name, 
                                                   source_file_extension, 
                                                   source_location, 
                                                   source_size_in_bytes, 
                                                   audio_languages, 
                                                   subtitle_languages, 
                                                   caption_languages, 
                                                   transcoding_status, 
                                                   acquisition_progress,
                                                   encoding_progress,
                                                   qa_status, 
                                                   qa_comment,
                                                   output_format, 
                                                   dash_manifest_path, 
                                                   hls_manifest_path,
                                                   dash_size_in_bytes,
                                                   hls_size_in_bytes,
                                                   cmaf_size_in_bytes,
                                                   drm_key_id, 
                                                   is_protected, 
                                                   job_id,
                                                   duration_in_seconds, 
                                                   finished_date, 
                                                   video_bitrates, 
                                                   is_archived, 
                                                   created_user, 
                                                   updated_user, 
                                                   created_date, 
                                                   updated_date)
                  VALUES ${expand(elements.length, elements[0].length)}
                  RETURNING id, transcoding_status;`,
                    flatten(elements),
                  )
                ).rows.map(r => ({ id: r.id, status: r.transcoding_status }));
                for (const video of insertedVideos) {
                  await insertTags(client, video.id);
                  await insertHistory(client, video.id, video.status);
                }
              } catch (error) {
                logger.error(error);
              }
            }
          } finally {
            await client.query("set session_replication_role = 'origin'");
            await client.query('commit');
            await client.release();
            console.timeEnd('populate');
            logger.debug('Execution finished!');
            return {
              count,
              query: build.$$isQuery,
            };
          }
        },
      },
    },
  };
});
