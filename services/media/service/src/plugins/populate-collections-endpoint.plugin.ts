import { JSONify } from '@ax/service-common';
import * as faker from 'faker';
import { gql, makeExtendSchemaPlugin } from 'graphile-utils';
import { PoolClient } from 'pg';

import { config, Logger } from '../common';
import {
  expand,
  flatten,
  insertImages,
  insertTags,
  randomArray,
  splitCount,
} from './populate-plugin.helpers';

const generateSampleFilter = (collectionId: number): any[] => {
  const values = [];
  values.push(collectionId); //collection_id
  values.push(
    faker.random.arrayElement(['MOVIE', 'TVSHOW', 'SEASON', 'EPISODE']),
  ); //entity_type
  values.push(
    faker.random.arrayElement([
      'title',
      'external_id',
      'original_title',
      'released',
      'studio',
    ]),
  ); //filter_key
  values.push(faker.random.words().trim()); //filter_value
  return values;
};

const insertRelations = async (
  client: PoolClient,
  collectionId: number,
  movieIds: number[],
  tvShowIds: number[],
  seasonIds: number[],
  episodeIds: number[],
): Promise<void> => {
  const movieIdsToInsert = randomArray(0, 50, () => {
    return faker.random.arrayElement(movieIds);
  });
  const tvshowIdsToInsert = randomArray(0, 50, () => {
    return faker.random.arrayElement(tvShowIds);
  });
  const seasonIdsToInsert = randomArray(0, 50, () => {
    return faker.random.arrayElement(seasonIds);
  });
  const episodeIdsToInsert = randomArray(0, 50, () => {
    return faker.random.arrayElement(episodeIds);
  });
  let sortOrder = 0;
  for await (const movieId of movieIdsToInsert) {
    await client.query(
      `INSERT INTO app_public.collection_relations(collection_id, sort_order, movie_id) VALUES ($1, $2, $3);`,
      [collectionId, sortOrder++, movieId],
    );
  }
  for await (const tvshowId of tvshowIdsToInsert) {
    await client.query(
      `INSERT INTO app_public.collection_relations(collection_id, sort_order, tvshow_id) VALUES ($1, $2, $3);`,
      [collectionId, sortOrder++, tvshowId],
    );
  }
  for await (const seasonId of seasonIdsToInsert) {
    await client.query(
      `INSERT INTO app_public.collection_relations(collection_id, sort_order, season_id) VALUES ($1, $2, $3);`,
      [collectionId, sortOrder++, seasonId],
    );
  }
  for await (const episodeId of episodeIdsToInsert) {
    await client.query(
      `INSERT INTO app_public.collection_relations(collection_id, sort_order, episode_id) VALUES ($1, $2, $3);`,
      [collectionId, sortOrder++, episodeId],
    );
  }
};

const insertFilters = async (
  client: PoolClient,
  collectionId: number,
): Promise<void> => {
  const filtersCount = faker.random.number({ min: 0, max: 10 });
  const elements = [];
  for (let i = 0; i < filtersCount; i++) {
    elements.push(generateSampleFilter(collectionId));
  }
  if (elements.length === 0) return;

  await client.query(
    `INSERT INTO app_public.automatic_collections_filters(collection_id, entity_type, filter_key, filter_value)
     VALUES ${expand(elements.length, elements[0].length)}`,
    flatten(elements),
  );
};

const generateSampleCollection = (): any[] => {
  const values = [];
  values.push(
    faker.random.words().trim() || 'Oh Noooo! Empty String was here!',
  ); //title
  values.push(faker.random.uuid()); //external_id
  values.push(faker.lorem.paragraph(1)); //synopsis
  values.push(faker.lorem.paragraph(5)); //description
  const collectionType = faker.random.arrayElement(['MANUAL', 'AUTOMATIC']);
  values.push(collectionType); //collection_type
  const sortKey =
    collectionType === 'MANUAL'
      ? null
      : faker.random.arrayElement([
          'title',
          'external_id',
          'original_title',
          'released',
          'studio',
        ]);
  values.push(sortKey); //automatic_collection_sort_key
  values.push(
    faker.random.arrayElement([
      'NOT_PUBLISHED',
      'PUBLISH_PROGRESS',
      'PUBLISHED',
      'PUBLISH_ERROR',
      'CHANGED',
    ]),
  ); //publish_status
  values.push(faker.fake('{{name.lastName}}, {{name.firstName}}')); //published_user
  values.push(faker.date.recent()); //published_date
  values.push(faker.fake('{{name.lastName}}, {{name.firstName}}')); //created_user
  values.push(faker.fake('{{name.lastName}}, {{name.firstName}}')); //updated_user
  values.push(faker.date.recent()); //created_date
  values.push(faker.date.recent()); //updated_date
  return values;
};

export const PopulateCollectionsEndpointPlugin = makeExtendSchemaPlugin(
  build => {
    const logger = new Logger(config, 'populate');
    return {
      typeDefs: gql`
        extend type Mutation {
          populateCollections(input: PopulateInput!): PopulatePayload
        }
      `,
      resolvers: {
        Mutation: {
          populateCollections: async (
            query,
            args,
            { ownerPool },
            resolveInfo,
          ) => {
            console.time('populate');
            const count = args.input.count;
            const client: PoolClient = await ownerPool.connect();
            try {
              await client.query('begin');
              // disables all triggers
              await client.query("set session_replication_role = 'replica'");
              const movieIds = (
                await client.query('SELECT id FROM app_public.movies;')
              ).rows.map(r => r.id);
              const tvshowIds = (
                await client.query('SELECT id FROM app_public.tvshows;')
              ).rows.map(r => r.id);
              const seasonIds = (
                await client.query('SELECT id FROM app_public.seasons;')
              ).rows.map(r => r.id);
              const episodeIds = (
                await client.query('SELECT id FROM app_public.episodes;')
              ).rows.map(r => r.id);

              const batches = splitCount(count);
              for await (const batch of batches) {
                try {
                  const elements = [];
                  for (let i = 0; i < batch; i++) {
                    elements.push(generateSampleCollection());
                  }
                  const insertedCollections = (
                    await client.query(
                      `INSERT INTO app_public.collections(title, external_id, synopsis, description, collection_type, automatic_collection_sort_key, publish_status, published_user, published_date, created_user, updated_user, created_date, updated_date)
                  VALUES ${expand(elements.length, elements[0].length)}
                  RETURNING id, collection_type;`,
                      flatten(elements),
                    )
                  ).rows.map(r => ({ id: r.id, type: r.collection_type }));
                  for (const collection of insertedCollections) {
                    await insertTags(client, collection.id, 'collection');
                    await insertImages(client, collection.id, 'collection');
                    if (collection.type === 'MANUAL') {
                      await insertRelations(
                        client,
                        collection.id,
                        movieIds,
                        tvshowIds,
                        seasonIds,
                        episodeIds,
                      );
                    } else {
                      await insertFilters(client, collection.id);
                    }
                  }
                } catch (error) {
                  logger.warn(JSONify(error));
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
  },
);
