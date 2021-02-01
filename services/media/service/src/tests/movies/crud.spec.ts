import 'jest-extended';

import { dateToBeGreaterThan, toBeIso8601Strict } from '@ax/service-common';

import { TestGraphQLContext } from '../test-utils';
import {
  CREATE,
  DELETE_BY_ID,
  GET_BY_ID,
  GET_LIST_WITHOUT_VARIABLES,
  UPDATE,
} from './gql.constants';

describe('Movies GraphQL endpoints', () => {
  let ctx: TestGraphQLContext = null;
  let sp1 = null;
  const defaultRequestContext = { user: { sub: 'CMS' } };

  const createMovie = async (title): Promise<any> => {
    const resp = await ctx.runQuery(
      CREATE,
      {
        input: {
          movie: {
            title,
          },
        },
      },
      defaultRequestContext,
    );

    return resp.data.createMovie.movie;
  };

  beforeAll(async () => {
    ctx = await TestGraphQLContext.create();
  });

  beforeEach(async () => {
    sp1 = await createMovie('Movie1');
  });

  afterEach(async () => {
    await ctx.truncate('movies');
  });

  afterAll(async () => {
    await ctx.dispose();
  });

  describe('createMovie', () => {
    it('minimum properties -> valid element', async () => {
      // Act
      const resp = await ctx.runQuery(
        CREATE,
        {
          input: {
            movie: {
              title: 'Valid Title',
            },
          },
        },
        defaultRequestContext,
      );

      // Assert
      expect(resp.errors).toBeFalsy();

      const movie = resp.data.createMovie.movie;
      expect(movie.id).toBeTruthy();
      expect(movie.nodeId).toBeTruthy();
      expect(movie.createdDate).toBeTruthy();
      expect(movie.updatedDate).toBeTruthy();
      expect(movie.externalId).toBeNull();
      expect(movie.createdUser).toBe('CMS');
      expect(movie.updatedUser).toBe('CMS');
      expect(movie.publishStatus).toBe('NOT_PUBLISHED');
      expect(movie.publishedUser).toBeNull();
      expect(movie.publishedDate).toBeNull();
      expect(movie.title).toBe('Valid Title');
      expect(movie.synopsis).toBeNull();
      expect(movie.description).toBeNull();
    });

    it('title over 250 characters -> error', async () => {
      // Act
      const resp = await ctx.runQuery(CREATE, {
        input: {
          movie: {
            title: 'x'.repeat(251),
          },
        },
      });

      // Assert
      expect(resp.data.createMovie).toBeFalsy();
      expect(resp.errors.length).toBe(1);

      const error = resp.errors[0];
      toBeIso8601Strict(error.timestamp);
      expect(error.message).toBe('The title can only be 100 characters long.');
      expect(error.code).toBe('DATABASE_VALIDATION_FAILED');
    });

    it.each([
      '',
      ' ',
      '  ',
      ' Title',
      'Title ',
      '   Title',
      'Title    ',
      '    Title   ',
    ])('title with invalid whitespaces -> error, value: "%s"', async title => {
      // Act
      const resp = await ctx.runQuery(CREATE, {
        input: {
          movie: {
            title,
          },
        },
      });

      // Assert
      expect(resp.data.createMovie).toBeFalsy();
      expect(resp.errors.length).toBe(1);

      const error = resp.errors[0];
      toBeIso8601Strict(error.timestamp);
      expect(error.message).toBe('The title cannot be empty.');
      expect(error.code).toBe('DATABASE_VALIDATION_FAILED');
    });
  });

  describe('movies', () => {
    it('empty collection -> 0 elements', async () => {
      // Arrange
      await ctx.truncate('movies');

      // Act
      const resp = await ctx.runQuery(GET_LIST_WITHOUT_VARIABLES);

      // Assert
      expect(resp.errors).toBeFalsy();

      expect(resp.data.movies.nodes.length).toBe(0);
    });

    it('filled collection -> 1 elements', async () => {
      // Act
      const resp = await ctx.runQuery(GET_LIST_WITHOUT_VARIABLES);

      // Assert
      expect(resp.errors).toBeFalsy();

      const movies = resp.data.movies.nodes;

      expect(movies.length).toBe(1);
      const titles = movies.map(e => e.title);

      expect(titles).toContain(sp1.title);
    });
  });

  describe('movie', () => {
    it('existing id -> correct data', async () => {
      // Act
      const resp = await ctx.runQuery(GET_BY_ID, { id: sp1.id });

      // Assert
      expect(resp.errors).toBeFalsy();

      expect(resp.data.movie).toEqual(sp1);
    });
  });

  describe('updateMovie', () => {
    it('minimum properties -> valid element', async () => {
      // Act
      const resp = await ctx.runQuery(
        UPDATE,
        {
          input: {
            id: sp1.id,
            patch: {
              title: 'Valid Title',
            },
          },
        },
        defaultRequestContext,
      );

      // Assert
      expect(resp.errors).toBeFalsy();

      const movie = resp.data.updateMovie.movie;
      expect(movie.id).toBeTruthy();
      expect(movie.id).toBe(sp1.id);
      expect(movie.nodeId).toBeTruthy();
      expect(movie.nodeId).toBe(sp1.nodeId);
      expect(movie.createdDate).toBeTruthy();
      expect(movie.createdDate).toBe(sp1.createdDate);
      expect(movie.updatedDate).toBeTruthy();
      dateToBeGreaterThan(movie.updatedDate, sp1.updatedDate);
      expect(movie.externalId).toBe(sp1.externalId);
      expect(movie.createdUser).toBe('CMS');
      expect(movie.updatedUser).toBe('CMS');
      expect(movie.publishStatus).toBe('NOT_PUBLISHED');
      expect(movie.publishedUser).toBeNull();
      expect(movie.publishedDate).toBeNull();
      expect(movie.title).toBe('Valid Title');
      expect(movie.synopsis).toBeNull();
      expect(movie.description).toBeNull();
    });
  });

  describe('deleteMovie', () => {
    it('existing id -> deleted asset', async () => {
      // Act
      const resp = await ctx.runQuery(DELETE_BY_ID, { input: { id: sp1.id } });

      // Assert
      expect(resp.errors).toBeFalsy();

      const { movie, query } = resp.data.deleteMovie;
      expect(movie).toEqual(sp1);
      expect(query.movies.totalCount).toEqual(0);
    });
  });
});
