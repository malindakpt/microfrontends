import 'jest-extended';

import { testIsNullOrWhitespaceArray } from '@ax/service-common';
import { sql } from 'slonik';

import {
  DrmProtection,
  TranscodingProcessingProfile,
} from '../../generated/types';
import { TestGraphQLContext } from '../test-utils';
import {
  PROCESSING_PROFILES_WITHOUT_VARIABLES,
  UPDATE_PROCESSING_PROFILE,
} from './gql.constants';

describe('Processing Profiles GraphQL endpoints', () => {
  let ctx: TestGraphQLContext = null;
  let validProfile: TranscodingProcessingProfile = null;
  let invalidProfile: TranscodingProcessingProfile = null;
  let validDrmProfile: TranscodingProcessingProfile = null;
  const defaultRequestContext = { user: { name: 'CMS' } };

  beforeAll(async () => {
    ctx = await TestGraphQLContext.create();
  });

  beforeEach(async () => {
    invalidProfile = await ctx.queryExactlyOne<
      TranscodingProcessingProfile
    >(sql`
      INSERT INTO app_public.transcoding_processing_profiles (title)
      VALUES ('INVALID')
      RETURNING *;`);
    validProfile = await ctx.queryExactlyOne<TranscodingProcessingProfile>(sql`
      INSERT INTO app_public.transcoding_processing_profiles (title, video_stream_expression, audio_file_language_expression, subtitle_file_language_expression, caption_file_language_expression)
      VALUES ('VALID', '^.*\\.(mp4|avi|mov|wma|mkv|webm|ts)$', '^[^-]*-([a-zA-Z0-9\\-]+).(aac|ac3|flac|mp2|mp3|ogg|wav|wma|aiff)$', '^[^-]*-sub-([a-zA-Z0-9\\-]+).(vtt|srt|ttml|pac|mp4)$', '^[^-]*-cc-([a-zA-Z0-9\\-]+).(vtt|ttml|srt)$')
      RETURNING *;`);
    validDrmProfile = await ctx.queryExactlyOne<
      TranscodingProcessingProfile
    >(sql`
      INSERT INTO app_public.transcoding_processing_profiles (title, video_stream_expression, audio_file_language_expression, subtitle_file_language_expression, caption_file_language_expression, drm_protection, drm_api_url, drm_tenant_id, drm_management_key, drm_key_seed, drm_thumbprints)
      VALUES ('VALID', '^.*\.(mp4|avi|mov|wma|mkv|webm|ts)$', '^[^-]*-([a-zA-Z0-9\-]+).(aac|ac3|flac|mp2|mp3|ogg|wav|wma|aiff)$', '^[^-]*-sub-([a-zA-Z0-9\\-]+).(vtt|srt|ttml|pac|mp4)$', '^[^-]*-cc-([a-zA-Z0-9\\-]+).(vtt|ttml|srt)$', 'MANAGED', 'https://some-key-server.axtest.net/api', 'NotEmptyValue', 'dGVzdA==', 'dGVzdA==', 'dGVzdA==')
      RETURNING *;`);
  });

  afterEach(async () => {
    await ctx.truncate('transcoding_processing_profiles');
  });

  afterAll(async () => {
    await ctx.dispose();
  });

  describe('transcodingProcessingProfiles', () => {
    it('default profiles -> expected is_valid value', async () => {
      // Act
      const resp = await ctx.gqlQuery(PROCESSING_PROFILES_WITHOUT_VARIABLES);

      // Assert
      expect(resp.errors).toBeFalsy();

      const profiles = resp.data.transcodingProcessingProfiles.nodes;
      expect(profiles.length).toBe(3);
      expect(profiles[0].isValid).toBe(false);
      expect(profiles[0].isValid).toBe(invalidProfile.isValid);
      expect(profiles[1].isValid).toBe(true);
      expect(profiles[1].isValid).toBe(validProfile.isValid);
      expect(profiles[2].isValid).toBe(true);
      expect(profiles[2].isValid).toBe(validDrmProfile.isValid);
    });
  });

  describe('updateTranscodingProcessingProfile', () => {
    it.each([
      ...testIsNullOrWhitespaceArray('^.*\\.(mp4|avi|mov|wma|mkv|webm|ts)$'),
    ])(
      'video_stream_expression with invalid values -> isValid is false, value: "%s"',
      async videoStreamExpression => {
        // Act
        const resp = await ctx.gqlQuery(
          UPDATE_PROCESSING_PROFILE,
          {
            input: {
              id: validProfile.id,
              patch: { videoStreamExpression },
            },
          },
          defaultRequestContext,
        );

        // Assert
        expect(resp.errors).toBeFalsy();

        const updated: TranscodingProcessingProfile =
          resp.data.updateTranscodingProcessingProfile
            .transcodingProcessingProfile;
        expect(updated.isValid).toBe(false);
        expect(validProfile.isValid).not.toBe(updated.isValid);
      },
    );

    it('switching from NONE to MANAGED drm_protection -> isValid is false', async () => {
      // Act
      const resp = await ctx.gqlQuery(
        UPDATE_PROCESSING_PROFILE,
        {
          input: {
            id: validProfile.id,
            patch: { drmProtection: DrmProtection.Managed },
          },
        },
        defaultRequestContext,
      );

      // Assert
      expect(resp.errors).toBeFalsy();

      const updated: TranscodingProcessingProfile =
        resp.data.updateTranscodingProcessingProfile
          .transcodingProcessingProfile;
      expect(updated.isValid).toBe(false);
      expect(validProfile.isValid).not.toBe(updated.isValid);
    });
  });
});
