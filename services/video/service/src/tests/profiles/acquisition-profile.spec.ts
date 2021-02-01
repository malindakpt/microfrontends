import 'jest-extended';

import { testIsNullOrWhitespaceArray } from '@ax/service-common';
import { sql } from 'slonik';

import { TranscodingAcquisitionProfile } from '../../generated/types';
import { TestGraphQLContext } from '../test-utils';
import {
  ACQUISITION_PROFILES_WITHOUT_VARIABLES,
  UPDATE_ACQUISITION_PROFILE,
} from './gql.constants';

describe('Acquisition Profiles GraphQL endpoints', () => {
  let ctx: TestGraphQLContext = null;
  let validProfile: TranscodingAcquisitionProfile = null;
  let invalidProfile: TranscodingAcquisitionProfile = null;
  const defaultRequestContext = { user: { name: 'CMS' } };

  beforeAll(async () => {
    ctx = await TestGraphQLContext.create();
  });

  beforeEach(async () => {
    invalidProfile = await ctx.queryExactlyOne<
      TranscodingAcquisitionProfile
    >(sql`
      INSERT INTO app_public.transcoding_acquisition_profiles (title, provider)
      VALUES ('INVALID', 'AzureBlob')
      RETURNING *;`);
    validProfile = await ctx.queryExactlyOne<TranscodingAcquisitionProfile>(sql`
      INSERT INTO app_public.transcoding_acquisition_profiles (title, provider, uri_path, read_credentials_name, read_credentials_secret, list_credentials_secret)
      VALUES ('VALID', 'AzureBlob', 'https://test-blob-storage.blob.core.windows.net/source', 'test-blob-storage', 'dGVzdA==', '?sv=2019-10-10&ss=b&srt=c&sp=l&se=2021-06-01T19:40:53Z&st=2020-06-01T11:40:53Z&spr=https&sig=kabXKIxh6w%2BfI4LQRI98Yvo0D0SnNc1lmqSX1hFzj6I%3D')
      RETURNING *;`);
  });

  afterEach(async () => {
    await ctx.truncate('transcoding_acquisition_profiles'); //TODO:
  });

  afterAll(async () => {
    await ctx.dispose();
  });

  describe('transcodingAcquisitionProfiles', () => {
    it('default profiles -> expected is_valid value', async () => {
      // Act
      const resp = await ctx.gqlQuery(ACQUISITION_PROFILES_WITHOUT_VARIABLES);

      // Assert
      expect(resp.errors).toBeFalsy();

      const profiles = resp.data.transcodingAcquisitionProfiles.nodes;
      expect(profiles.length).toBe(2);
      expect(profiles[0].isValid).toBe(false);
      expect(profiles[0].isValid).toBe(invalidProfile.isValid);
      expect(profiles[1].isValid).toBe(true);
      expect(profiles[1].isValid).toBe(validProfile.isValid);
    });
  });

  describe('updateTranscodingAcquisitionProfile', () => {
    it.each([
      'test-blob-storage.blob.core.windows.net/source',
      ...testIsNullOrWhitespaceArray(
        'https://test-blob-storage.blob.core.windows.net/source',
      ),
    ])(
      'uri_path with invalid values -> isValid is false, value: "%s"',
      async uriPath => {
        // Act
        const resp = await ctx.gqlQuery(
          UPDATE_ACQUISITION_PROFILE,
          {
            input: {
              id: validProfile.id,
              patch: { uriPath },
            },
          },
          defaultRequestContext,
        );

        // Assert
        expect(resp.errors).toBeFalsy();

        const updated: TranscodingAcquisitionProfile =
          resp.data.updateTranscodingAcquisitionProfile
            .transcodingAcquisitionProfile;
        expect(updated.isValid).toBe(false);
        expect(validProfile.isValid).not.toBe(updated.isValid);
      },
    );

    it.each(testIsNullOrWhitespaceArray('test-blob-storage'))(
      'read_credentials_name with invalid values -> isValid is false, value: "%s"',
      async readCredentialsName => {
        // Act
        const resp = await ctx.gqlQuery(
          UPDATE_ACQUISITION_PROFILE,
          {
            input: {
              id: validProfile.id,
              patch: { readCredentialsName },
            },
          },
          defaultRequestContext,
        );

        // Assert
        expect(resp.errors).toBeFalsy();

        const updated: TranscodingAcquisitionProfile =
          resp.data.updateTranscodingAcquisitionProfile
            .transcodingAcquisitionProfile;
        expect(updated.isValid).toBe(false);
        expect(validProfile.isValid).not.toBe(updated.isValid);
      },
    );

    it.each([
      'NotAValidBase64String',
      ...testIsNullOrWhitespaceArray('dGVzdA=='),
    ])(
      'read_credentials_secret with invalid values -> isValid is false, value: "%s"',
      async readCredentialsSecret => {
        // Act
        const resp = await ctx.gqlQuery(
          UPDATE_ACQUISITION_PROFILE,
          {
            input: {
              id: validProfile.id,
              patch: { readCredentialsSecret },
            },
          },
          defaultRequestContext,
        );

        // Assert
        expect(resp.errors).toBeFalsy();

        const updated: TranscodingAcquisitionProfile =
          resp.data.updateTranscodingAcquisitionProfile
            .transcodingAcquisitionProfile;
        expect(updated.isValid).toBe(false);
        expect(validProfile.isValid).not.toBe(updated.isValid);
      },
    );

    it.each([
      'NotAValidSASString',
      ...testIsNullOrWhitespaceArray('?sv=2019-10-10'),
    ])(
      'list_credentials_secret with invalid values -> isValid is false, value: "%s"',
      async listCredentialsSecret => {
        // Act
        const resp = await ctx.gqlQuery(
          UPDATE_ACQUISITION_PROFILE,
          {
            input: {
              id: validProfile.id,
              patch: { listCredentialsSecret },
            },
          },
          defaultRequestContext,
        );

        // Assert
        expect(resp.errors).toBeFalsy();

        const updated: TranscodingAcquisitionProfile =
          resp.data.updateTranscodingAcquisitionProfile
            .transcodingAcquisitionProfile;
        expect(updated.isValid).toBe(false);
        expect(validProfile.isValid).not.toBe(updated.isValid);
      },
    );
  });
});
