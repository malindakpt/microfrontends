import { JSONify } from '@ax/service-common';
import * as faker from 'faker';
import { gql, makeExtendSchemaPlugin } from 'graphile-utils';
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

const generateSampleTvShow = (): any[] => {
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

const generateSampleSeason = (tvshowId: number): any[] => {
  const values = [];
  values.push(tvshowId); //tvshow_id
  values.push(faker.random.number({ min: 0, max: 15 })); //index
  values.push(faker.random.uuid()); //external_id
  values.push(faker.lorem.paragraph(1)); //synopsis
  values.push(faker.lorem.paragraph(5)); //description
  values.push(faker.company.companyName()); //studio
  values.push(faker.date.past()); //released
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

const generateSampleEpisode = (seasonId: number): any[] => {
  const values = [];
  values.push(seasonId); //season_id
  values.push(faker.random.number({ min: 0, max: 15 })); //index
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

const insertEpisodes = async (
  client: PoolClient,
  seasonId: number,
  genreIds: number[],
): Promise<void> => {
  const episodesCount = faker.random.number({ min: 0, max: 50 });
  if (episodesCount === 0) return;

  const elements = [];
  for (let i = 0; i < episodesCount; i++) {
    elements.push(generateSampleEpisode(seasonId));
  }

  const insertedIds = (
    await client.query(
      `INSERT INTO app_public.episodes(season_id, index, title, external_id, original_title, synopsis, description, studio, released, main_video_id, publish_status, published_user, published_date, created_user, updated_user, created_date, updated_date)
        VALUES ${expand(elements.length, elements[0].length)}
        RETURNING id;`,
      flatten(elements),
    )
  ).rows.map(r => r.id);
  for (const episodeId of insertedIds) {
    await insertTrailers(client, episodeId, 'episode');
    await insertTags(client, episodeId, 'episode');
    await insertProductionCountries(client, episodeId, 'episode');
    await insertImages(client, episodeId, 'episode');
    await insertCasts(client, episodeId, 'episode');
    await insertLicenses(client, episodeId, 'episode');
    await insertGenres(client, episodeId, genreIds, 'episode', 'tvshow');
  }
};

const insertSeasons = async (
  client: PoolClient,
  tvshowId: number,
  genreIds: number[],
): Promise<void> => {
  const seasonsCount = faker.random.number({ min: 0, max: 15 });
  if (seasonsCount === 0) return;

  const elements = [];
  for (let i = 0; i < seasonsCount; i++) {
    elements.push(generateSampleSeason(tvshowId));
  }

  const insertedIds = (
    await client.query(
      `INSERT INTO app_public.seasons(tvshow_id, index, external_id, synopsis, description, studio, released, publish_status, published_user, published_date, created_user, updated_user, created_date, updated_date)
        VALUES ${expand(elements.length, elements[0].length)}
        RETURNING id;`,
      flatten(elements),
    )
  ).rows.map(r => r.id);
  for (const seasonId of insertedIds) {
    await insertTrailers(client, seasonId, 'season');
    await insertTags(client, seasonId, 'season');
    await insertProductionCountries(client, seasonId, 'season');
    await insertImages(client, seasonId, 'season');
    await insertCasts(client, seasonId, 'season');
    await insertLicenses(client, seasonId, 'season');
    await insertGenres(client, seasonId, genreIds, 'season', 'tvshow');
    await insertEpisodes(client, seasonId, genreIds);
  }
};

export const PopulateTvshowsEndpointPlugin = makeExtendSchemaPlugin(build => {
  const logger = new Logger(config, 'populate');
  return {
    typeDefs: gql`
      extend type Mutation {
        populateTvshows(input: PopulateInput!): PopulatePayload
      }
    `,
    resolvers: {
      Mutation: {
        populateTvshows: async (query, args, { ownerPool }, resolveInfo) => {
          console.time('populate');
          const count = args.input.count;
          const client: PoolClient = await ownerPool.connect();
          try {
            await client.query('begin');

            // disables all triggers
            await client.query("set session_replication_role = 'replica'");

            const genreIdsResult = await client.query(
              'SELECT id FROM app_public.tvshow_genres;',
            );
            let genreIds = genreIdsResult.rows.map(r => r.id);
            if (genreIdsResult.rowCount === 0) {
              genreIds = await seedGenres(client, 'tvshow');
            }

            const batches = splitCount(count);
            for await (const batch of batches) {
              try {
                const elements = [];
                for (let i = 0; i < batch; i++) {
                  elements.push(generateSampleTvShow());
                }

                const insertedIds = (
                  await client.query(
                    `INSERT INTO app_public.tvshows(title, external_id, original_title, synopsis, description, studio, released, publish_status, published_user, published_date, created_user, updated_user, created_date, updated_date)
                  VALUES ${expand(elements.length, elements[0].length)}
                  RETURNING id;`,
                    flatten(elements),
                  )
                ).rows.map(r => r.id);

                for (const tvshowId of insertedIds) {
                  await insertTrailers(client, tvshowId, 'tvshow');
                  await insertTags(client, tvshowId, 'tvshow');
                  await insertProductionCountries(client, tvshowId, 'tvshow');
                  await insertImages(client, tvshowId, 'tvshow');
                  await insertCasts(client, tvshowId, 'tvshow');
                  await insertLicenses(client, tvshowId, 'tvshow');
                  await insertGenres(
                    client,
                    tvshowId,
                    genreIds,
                    'tvshow',
                    'tvshow',
                  );
                  await insertSeasons(client, tvshowId, genreIds);
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
