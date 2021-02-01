import * as faker from 'faker';
import { PoolClient } from 'pg';

// expand(3, 2) returns "($1, $2), ($3, $4), ($5, $6)"
export const expand = (rowCount, columnCount, startAt = 1): string => {
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
export const flatten = (arr): any[] => {
  const newArr = [];
  arr.forEach(v => v.forEach(p => newArr.push(p)));
  return newArr;
};

export const randomArray = (min, max, getValue) => {
  const len = faker.random.number({ min, max });
  const array = [];

  for (let i = 0; i < len; ++i) {
    const value = getValue(i);
    if (value === undefined) continue;
    if (!array.find(a => a === value)) {
      array.push(value);
    }
  }

  return array;
};

export const splitCount = (totalCount: number, batchSize = 2000): number[] => {
  const count = Math.floor(totalCount / batchSize);
  const array = [];
  for (let i = 1; i <= count; i++) {
    array.push(batchSize);
  }
  const leftover = totalCount % batchSize;
  if (leftover > 0) {
    array.push(leftover);
  }
  return array;
};

export const insertTrailers = async (
  client: PoolClient,
  entityId: number,
  entityName: string,
): Promise<void> => {
  const videoIds = randomArray(0, 4, () => {
    return faker.random.number();
  });
  for await (const videoId of videoIds) {
    await client.query(
      `INSERT INTO app_public.${entityName}s_trailers(${entityName}_id, video_id) VALUES ($1, $2);`,
      [entityId, videoId],
    );
  }
};

export const insertTags = async (
  client: PoolClient,
  entityId: number,
  entityName: string,
): Promise<void> => {
  const tags = randomArray(0, 4, () => {
    return faker.random.word();
  });
  for await (const tag of tags) {
    await client.query(
      `INSERT INTO app_public.${entityName}s_tags(${entityName}_id, name) VALUES ($1, $2);`,
      [entityId, tag],
    );
  }
};

export const insertProductionCountries = async (
  client: PoolClient,
  entityId: number,
  entityName: string,
): Promise<void> => {
  const countries = randomArray(0, 4, () => {
    return faker.address.country();
  });
  for await (const country of countries) {
    await client.query(
      `INSERT INTO app_public.${entityName}s_production_countries(${entityName}_id, name) VALUES ($1, $2);`,
      [entityId, country],
    );
  }
};

export const insertImages = async (
  client: PoolClient,
  entityId: number,
  entityName: string,
): Promise<void> => {
  const imageTypes = randomArray(0, 2, () => {
    return faker.random.arrayElement(['COVER', 'TEASER']);
  });
  for await (const type of imageTypes) {
    await client.query(
      `INSERT INTO app_public.${entityName}s_images(${entityName}_id, image_type, image_id) VALUES ($1, $2, $3);`,
      [entityId, type, faker.random.number()],
    );
  }
};

export const insertCasts = async (
  client: PoolClient,
  entityId: number,
  entityName: string,
): Promise<void> => {
  const actors = randomArray(0, 4, () => {
    return faker.fake('{{name.lastName}} {{name.firstName}}');
  });
  for await (const actor of actors) {
    await client.query(
      `INSERT INTO app_public.${entityName}s_casts(${entityName}_id, name) VALUES ($1, $2);`,
      [entityId, actor],
    );
  }
};

export const generateSampleLicense = (entityId: number): any[] => {
  const values = [];
  values.push(entityId); //entity_id
  values.push(faker.date.recent()); //license_start
  values.push(faker.date.future()); //license_end
  values.push(
    randomArray(0, 8, () => {
      return faker.random.arrayElement([
        'LKA',
        'DEU',
        'EST',
        'USA',
        'FRA',
        'UKR',
        'CHN',
      ]);
    }),
  ); //countries
  values.push(faker.date.recent()); //created_date
  values.push(faker.date.recent()); //updated_date
  values.push(faker.fake('{{name.lastName}}, {{name.firstName}}')); //created_user
  values.push(faker.fake('{{name.lastName}}, {{name.firstName}}')); //updated_user
  return values;
};

export const insertLicenses = async (
  client: PoolClient,
  entityId: number,
  entityName: string,
): Promise<void> => {
  const licensesCount = faker.random.number({ min: 0, max: 10 });
  const elements = [];
  for (let i = 0; i < licensesCount; i++) {
    elements.push(generateSampleLicense(entityId));
  }
  if (elements.length <= 0) return;

  await client.query(
    `INSERT INTO app_public.${entityName}s_licenses(${entityName}_id, license_start, license_end, countries, created_date, updated_date, created_user, updated_user)
        VALUES ${expand(elements.length, elements[0].length)}`,
    flatten(elements),
  );
};

export const generateSampleGenre = (name: string, sortOrder: number): any[] => {
  const values = [];
  values.push(name); //title
  values.push(sortOrder); //sort_order
  values.push(faker.date.recent()); //created_date
  values.push(faker.date.recent()); //updated_date
  values.push(faker.fake('{{name.lastName}}, {{name.firstName}}')); //created_user
  values.push(faker.fake('{{name.lastName}}, {{name.firstName}}')); //updated_user
  return values;
};

export const seedGenres = async (
  client: PoolClient,
  entityName: string,
): Promise<number[]> => {
  const genreNames = [
    'Action',
    'Adventure',
    'Animation',
    'Children’s',
    'Comedy',
    'Documentary',
    'Drama',
    'Education',
    'Faith and Spirituality',
    'Family',
    'Fantasy',
    'Food',
    'Horror',
    'Independent',
    'Instructional',
    'Live Performance',
    'Music Performance',
    'Musical',
    'Mystery',
    'Reality',
    'Romance',
    'Science Fiction',
    'Sports',
    'Thriller',
    'Variety/Talk Show',
    'Western',
    'Miscellaneous',
  ];
  const elements = [];
  for (let i = 0; i < genreNames.length; i++) {
    elements.push(generateSampleGenre(genreNames[i], i));
  }
  return (
    await client.query(
      `INSERT INTO app_public.${entityName}_genres(title, sort_order, created_date, updated_date, created_user, updated_user)
            VALUES ${expand(elements.length, elements[0].length)}
            RETURNING id;`,
      flatten(elements),
    )
  ).rows.map(r => r.id);
};

export const insertGenres = async (
  client: PoolClient,
  entityId: number,
  genreIds: number[],
  entityName: string,
  genreEntityName: string,
): Promise<void> => {
  const genreIdsToInsert = randomArray(0, 5, () => {
    return faker.random.arrayElement(genreIds);
  });
  for await (const genreId of genreIdsToInsert) {
    await client.query(
      `INSERT INTO app_public.${entityName}s_${genreEntityName}_genres(${entityName}_id, ${genreEntityName}_genres_id) VALUES ($1, $2);`,
      [entityId, genreId],
    );
  }
};
