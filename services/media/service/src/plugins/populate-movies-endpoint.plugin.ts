import * as faker from 'faker';
import { gql as gqlExtend, makeExtendSchemaPlugin } from 'graphile-utils';
import { PoolClient } from 'pg';

import { config, Logger } from '../common';
import {
  expand,
  flatten,
  insertCasts,
  insertGenres,
  insertImages,
  insertLicenses,
  insertProductionCountries,
  insertTags,
  insertTrailers,
  seedGenres,
  splitCount,
} from './populate-plugin.helpers';
import { JSONify } from '@ax/service-common';

const generateSampleMovie = (): any[] => {
  const values = [];
  values.push(
    faker.random.words().trim() || 'Oh Noooo! Empty String was here!',
  ); //title
  values.push(faker.random.uuid()); //external_id
  values.push(
    faker.random.words().trim() || 'Oh Noooo! Empty String was here!',
  ); //original_title
  values.push(faker.lorem.paragraph(1)); //synopsis
  values.push(faker.lorem.paragraph(5)); //description
  values.push(faker.company.companyName()); //studio
  values.push(faker.date.past()); //released
  values.push(faker.random.number()); //main_video_id
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

export const PopulateMoviesEndpointPlugin = makeExtendSchemaPlugin(build => {
  const logger = new Logger(config, 'populate');
  return {
    typeDefs: gqlExtend`
      input PopulateInput {
        clientMutationId: String
        count: Int!
      }
      type PopulatePayload {
        count: Int!
        query: Query
      }
      extend type Mutation {
        populateMovies(input: PopulateInput!): PopulatePayload
      }
    `,
    resolvers: {
      Mutation: {
        populateMovies: async (query, args, { ownerPool }, resolveInfo) => {
          console.time('populate');
          const count = args.input.count;
          const client: PoolClient = await ownerPool.connect();
          try {
            await client.query('begin');
            // disables all triggers
            await client.query("set session_replication_role = 'replica'");

            const genreIdsResult = await client.query(
              'SELECT id FROM app_public.movie_genres;',
            );
            let genreIds = genreIdsResult.rows.map(r => r.id);
            if (genreIdsResult.rowCount === 0) {
              genreIds = await seedGenres(client, 'movie');
            }

            const batches = splitCount(count);
            for await (const batch of batches) {
              try {
                const elements = [];
                for (let i = 0; i < batch; i++) {
                  elements.push(generateSampleMovie());
                }
                const insertedIds = (
                  await client.query(
                    `INSERT INTO app_public.movies(title, external_id, original_title, synopsis, description, studio, released, main_video_id, publish_status, published_user, published_date, created_user, updated_user, created_date, updated_date)
                  VALUES ${expand(elements.length, elements[0].length)}
                  RETURNING id;`,
                    flatten(elements),
                  )
                ).rows.map(r => r.id);
                for (const movieId of insertedIds) {
                  await insertTrailers(client, movieId, 'movie');
                  await insertTags(client, movieId, 'movie');
                  await insertProductionCountries(client, movieId, 'movie');
                  await insertImages(client, movieId, 'movie');
                  await insertCasts(client, movieId, 'movie');
                  await insertLicenses(client, movieId, 'movie');
                  await insertGenres(
                    client,
                    movieId,
                    genreIds,
                    'movie',
                    'movie',
                  );
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
});
