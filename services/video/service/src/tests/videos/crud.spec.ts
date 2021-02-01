import 'jest-extended';

import { TestGraphQLContext } from '../test-utils';
import { GET_LIST_WITHOUT_VARIABLES } from './gql.constants';

//TODO: Because video creation is now done in context of a custom endpoint, tests stopped working
// Need to find a way to mock vip request function to revive these tests.
describe('Videos GraphQL endpoints', () => {
  let ctx: TestGraphQLContext = null;
  //let sp1 = null;
  //const defaultRequestContext = { user: { sub: 'CMS' } };

  //const createVideo = async (title): Promise<any> => {
  //  const resp = await ctx.gqlQuery(
  //    CREATE,
  //    {
  //      input: {
  //        video: {
  //          title,
  //        },
  //      },
  //    },
  //    defaultRequestContext,
  //  );
  //
  //  return resp.data.createVideo.video;
  //};

  beforeAll(async () => {
    ctx = await TestGraphQLContext.create();
  });

  beforeEach(async () => {
    //sp1 = await createVideo('Video1');
  });

  afterEach(async () => {
    //await ctx.truncate('videos');
  });

  afterAll(async () => {
    await ctx.dispose();
  });

  // describe('createVideo', () => {
  //   it('minimum properties -> valid element', async () => {
  //     // Act
  //     const resp = await ctx.gqlQuery(
  //       CREATE,
  //       {
  //         input: {
  //           video: {
  //             title: 'Valid Title',
  //           },
  //         },
  //       },
  //       defaultRequestContext,
  //     );

  //     // Assert
  //     expect(resp.errors).toBeFalsy();

  //     const video = resp.data.createVideo.video;
  //     expect(video.id).toBeTruthy();
  //     expect(video.nodeId).toBeTruthy();
  //     expect(video.createdDate).toBeTruthy();
  //     expect(video.updatedDate).toBeTruthy();
  //     expect(video.externalId).toBeNull();
  //     expect(video.createdUser).toBe('CMS');
  //     expect(video.updatedUser).toBe('CMS');
  //     expect(video.finishedDate).toBeNull();
  //     expect(video.title).toBe('Valid Title');
  //   });

  //   it('title over 100 characters -> error', async () => {
  //     // Act
  //     const resp = await ctx.gqlQuery(CREATE, {
  //       input: {
  //         video: {
  //           title: 'x'.repeat(101),
  //         },
  //       },
  //     });

  //     // Assert
  //     expect(resp.data.createVideo).toBeFalsy();
  //     expect(resp.errors.length).toBe(1);

  //     const error = resp.errors[0];
  //     toBeIso8601Strict(error.timestamp);
  //     expect(error.message).toBe('The title can only be 100 characters long.');
  //     expect(error.code).toBe('DATABASE_VALIDATION_FAILED');
  //   });

  //   it.each([
  //     '',
  //     ' ',
  //     '  ',
  //     ' Title',
  //     'Title ',
  //     '   Title',
  //     'Title    ',
  //     '    Title   ',
  //   ])('title with invalid whitespaces -> error, value: "%s"', async title => {
  //     // Act
  //     const resp = await ctx.gqlQuery(CREATE, {
  //       input: {
  //         video: {
  //           title,
  //         },
  //       },
  //     });

  //     // Assert
  //     expect(resp.data.createVideo).toBeFalsy();
  //     expect(resp.errors.length).toBe(1);

  //     const error = resp.errors[0];
  //     toBeIso8601Strict(error.timestamp);
  //     expect(error.message).toBe('The title cannot be empty.');
  //     expect(error.code).toBe('DATABASE_VALIDATION_FAILED');
  //   });
  // });

  describe('videos', () => {
    it('empty collection -> 0 elements', async () => {
      // Arrange
      await ctx.truncate('videos');

      // Act
      const resp = await ctx.gqlQuery(GET_LIST_WITHOUT_VARIABLES);

      // Assert
      expect(resp.errors).toBeFalsy();

      expect(resp.data.videos.nodes.length).toBe(0);
    });

    //it('filled collection -> 1 elements', async () => {
    //  // Act
    //  const resp = await ctx.gqlQuery(GET_LIST_WITHOUT_VARIABLES);
    //
    //  // Assert
    //  expect(resp.errors).toBeFalsy();
    //
    //  const videos = resp.data.videos.nodes;
    //
    //  expect(videos.length).toBe(1);
    //  const titles = videos.map(e => e.title);
    //
    //  expect(titles).toContain(sp1.title);
    //});
  });

  // describe('video', () => {
  //   it('existing id -> correct data', async () => {
  //     // Act
  //     const resp = await ctx.gqlQuery(GET_BY_ID, { id: sp1.id });

  //     // Assert
  //     expect(resp.errors).toBeFalsy();

  //     expect(resp.data.video).toEqual(sp1);
  //   });
  // });

  // describe('updateVideo', () => {
  //   it('minimum properties -> valid element', async () => {
  //     // Act
  //     const resp = await ctx.gqlQuery(
  //       UPDATE,
  //       {
  //         input: {
  //           id: sp1.id,
  //           patch: {
  //             title: 'Valid Title',
  //           },
  //         },
  //       },
  //       defaultRequestContext,
  //     );

  //     // Assert
  //     expect(resp.errors).toBeFalsy();

  //     const video = resp.data.updateVideo.video;
  //     expect(video.id).toBeTruthy();
  //     expect(video.id).toBe(sp1.id);
  //     expect(video.nodeId).toBeTruthy();
  //     expect(video.nodeId).toBe(sp1.nodeId);
  //     expect(video.createdDate).toBeTruthy();
  //     expect(video.createdDate).toBe(sp1.createdDate);
  //     expect(video.updatedDate).toBeTruthy();
  //     dateToBeGreaterThan(video.updatedDate, sp1.updatedDate);
  //     expect(video.externalId).toBe(sp1.externalId);
  //     expect(video.createdUser).toBe('CMS');
  //     expect(video.updatedUser).toBe('CMS');
  //     expect(video.finishedDate).toBeNull();
  //     expect(video.title).toBe('Valid Title');
  //   });
  // });

  // describe('deleteVideo', () => {
  //   it('existing id -> deleted asset', async () => {
  //     // Act
  //     const resp = await ctx.gqlQuery(DELETE_BY_ID, { input: { id: sp1.id } });

  //     // Assert
  //     expect(resp.errors).toBeFalsy();

  //     const { video, query } = resp.data.deleteVideo;
  //     expect(video).toEqual(sp1);
  //     expect(query.videos.totalCount).toEqual(0);
  //   });
  // });
});
