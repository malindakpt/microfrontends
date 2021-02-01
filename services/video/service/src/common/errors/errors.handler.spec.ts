import 'jest-extended';

import { axGuardError, ErrorCode, ErrorMessage } from '@ax/id-guard';
import { toBeIso8601Strict } from '@ax/service-common';
import { GraphQLError, Source } from 'graphql';

import { createTestConfig } from '../../tests/test-utils';
import { handledError } from '../errors';
import { handleError } from './handle-errors';

describe('handleError', () => {
  let loggedObject;
  let config;
  beforeAll(async () => {
    config = createTestConfig();
  });

  beforeEach(async () => {
    await jest
      .spyOn(console, 'debug')
      .mockImplementation(obj => (loggedObject = JSON.parse(obj)));
    await jest
      .spyOn(console, 'error')
      .mockImplementation(obj => (loggedObject = JSON.parse(obj)));
    await jest
      .spyOn(console, 'warn')
      .mockImplementation(obj => (loggedObject = JSON.parse(obj)));
    await jest
      .spyOn(console, 'log')
      .mockImplementation(obj => (loggedObject = JSON.parse(obj)));
  });

  afterEach(async () => {
    loggedObject = undefined;
    jest.restoreAllMocks();
  });

  describe('Logs and response generation', () => {
    it('minimal internal server error -> valid response', async () => {
      // Arrange
      const gqlError = new GraphQLError(
        'test',
        null,
        null,
        null,
        null,
        new Error('original'),
        {
          code: 'INTERNAL_SERVER_ERROR',
        },
      );

      // Act
      const formattedError: any = handleError(config, gqlError);

      // Assert
      toBeIso8601Strict(formattedError.timestamp);
      expect(formattedError.message).toBe('test');
      expect(formattedError.code).toBe('INTERNAL_SERVER_ERROR');
      expect(formattedError.path).toBeFalsy();
      expect(formattedError.details).toBeFalsy();
      expect(Object.keys(formattedError).length).toBe(5);

      toBeIso8601Strict(loggedObject.timestamp);
      expect(loggedObject.details.code).toBe('INTERNAL_SERVER_ERROR');
      expect(loggedObject.details.originalCode).toBe('INTERNAL_SERVER_ERROR');
      expect(loggedObject.context).toBe('GraphQLModule');
      expect(loggedObject.level).toBe('ERROR');
      expect(loggedObject.message).toBe('test');
      expect(loggedObject.project).toBe('navy_test');
      expect(loggedObject.component).toBe('navy-video-service_test');
      expect(loggedObject.environment).toBe('test');
      expect(loggedObject.stacktrace).toStartWith('Error: original');
      expect(loggedObject.details.request).toBeFalsy();
      expect(Object.keys(loggedObject).length).toBe(9);
      expect(Object.keys(loggedObject.details).length).toBe(2);

      expect(loggedObject.timestamp).toBe(formattedError.timestamp);
    });

    it.each([
      handledError('original'),
      handledError(new Error('inner'), 'original'),
      handledError(new Error('inner'), { test: 'test-param' }, 'original'),
    ])(
      'minimal handled error -> valid response',
      async (originalError: Error) => {
        // Arrange
        const gqlError = new GraphQLError(
          'test',
          null,
          null,
          null,
          null,
          originalError,
          {
            code: 'TEST_CODE',
          },
        );

        // Act
        const formattedError: any = handleError(config, gqlError);

        // Assert
        toBeIso8601Strict(formattedError.timestamp);
        expect(formattedError.message).toBe('test');
        expect(formattedError.code).toBe('HANDLED_INTERNAL_SERVER_ERROR');
        expect(formattedError.path).toBeFalsy();
        expect(formattedError.details).toBeFalsy();
        expect(Object.keys(formattedError).length).toBe(5);

        toBeIso8601Strict(loggedObject.timestamp);
        expect(loggedObject.details.code).toBe('HANDLED_INTERNAL_SERVER_ERROR');
        expect(loggedObject.details.originalCode).toBe(
          'HANDLED_INTERNAL_SERVER_ERROR',
        );
        expect(loggedObject.context).toBe('GraphQLModule');
        expect(loggedObject.level).toBe('WARN');
        expect(loggedObject.message).toBe('test');
        expect(loggedObject.project).toBe('navy_test');
        expect(loggedObject.component).toBe('navy-video-service_test');
        expect(loggedObject.environment).toBe('test');
        expect(loggedObject.stacktrace).toStartWith('Error: original');
        expect(loggedObject.details.request).toBeFalsy();
        expect(Object.keys(loggedObject).length).toBe(9);
        expect(Object.keys(loggedObject.details).length).toBe(2);

        expect(loggedObject.timestamp).toBe(formattedError.timestamp);
      },
    );

    it('ono with inner error -> valid stack trace', async () => {
      // Arrange
      const innerError = new Error('test-inner-error');
      const onoError = handledError(innerError, 'original');
      const gqlError = new GraphQLError(
        'test',
        null,
        null,
        null,
        null,
        onoError,
        {
          code: 'TEST_CODE',
        },
      );

      // Act
      handleError(config, gqlError);

      // Assert
      expect(loggedObject.stacktrace).toStartWith('Error: original');
      expect(loggedObject.stacktrace).toContain('test-inner-error');
    });

    it('ono with code override -> overridden code', async () => {
      // Arrange
      const innerError = new Error('test-inner-error');
      const onoError = handledError(
        innerError,
        { code: 'CUSTOM_CODE' },
        'original',
      );
      const gqlError = new GraphQLError(
        'test',
        null,
        null,
        null,
        null,
        onoError,
        {
          code: 'TEST_CODE',
        },
      );

      // Act
      const formattedError: any = handleError(config, gqlError);

      // Assert
      expect(formattedError.code).toBe('CUSTOM_CODE');
      expect(loggedObject.details.code).toBe('CUSTOM_CODE');
    });

    it('ono with internal source -> source logged as request', async () => {
      const gqlInternalError = new GraphQLError(
        'internal',
        null,
        new Source('{\n servicePackagesCount\n}'),
        null,
        null,
        null,
        {
          code: 'INTERNAL_CODE',
        },
      );
      const gqlError = new GraphQLError(
        'test',
        null,
        null,
        null,
        null,
        gqlInternalError,
        {
          code: 'TEST_CODE',
        },
      );

      // Act
      const formattedError: any = handleError(config, gqlError);

      // Assert
      expect(loggedObject.details.request).toBe('{\n servicePackagesCount\n}');
      expect(formattedError.code).toBe('TEST_CODE');
      expect(loggedObject.details.code).toBe('TEST_CODE');
    });

    it('ono with graphql source -> source logged as request', async () => {
      // Arrange
      const innerError = new Error('test-inner-error');
      const onoError = handledError(innerError, 'original');
      const gqlError = new GraphQLError(
        'test',
        null,
        new Source('{\n servicePackagesCount\n}'),
        null,
        null,
        onoError,
        {
          code: 'TEST_CODE',
        },
      );

      // Act
      handleError(config, gqlError);

      // Assert
      expect(loggedObject.details.request).toBe('{\n servicePackagesCount\n}');
    });

    it('ono with endpoint path -> path logged as context', async () => {
      // Arrange
      const innerError = new Error('test-inner-error');
      const onoError = handledError(innerError, 'original');
      const gqlError = new GraphQLError(
        'test',
        null,
        new Source('{\n servicePackagesCount\n}'),
        null,
        ['servicePackagesCount'],
        onoError,
        {
          code: 'TEST_CODE',
        },
      );

      // Act
      handleError(config, gqlError);

      // Assert
      expect(loggedObject.context).toBe('servicePackagesCount');
    });

    // happens when variables dto is defined separately from query
    // and some property is not defined
    it('without error and source -> stack logged from extensions', async () => {
      // Arrange
      const gqlError = new GraphQLError(
        'test',
        null,
        null,
        null,
        ['servicePackagesCount'],
        null,
        {
          code: 'TEST_CODE',
          exception: {
            stacktrace: [
              'GraphQLError: Variable "$dto" got invalid value {}; Field title of required type String! was not provided.',
              '   at E:\\somepath\\values.js:114:15',
            ],
          },
        },
      );

      // Act
      handleError(config, gqlError);

      // Assert
      expect(loggedObject.stacktrace).toStartWith(
        'GraphQLError: Variable "$dto"',
      );
      expect(loggedObject.stacktrace).toContain(
        `   at E:\\somepath\\values.js`,
      );
      expect(loggedObject.details.request).toBeFalsy();
    });

    it('only message -> minimum info', async () => {
      // Arrange
      const gqlError = new GraphQLError(
        'test',
        null,
        null,
        null,
        null,
        null,
        null,
      );

      // Act
      const formattedError: any = handleError(config, gqlError);

      // Assert
      toBeIso8601Strict(formattedError.timestamp);
      expect(formattedError.message).toBe('test');
      expect(formattedError.code).toBe('GRAPHQL_VALIDATION_FAILED');
      expect(formattedError.path).toBeFalsy();
      expect(formattedError.details).toBeFalsy();
      expect(Object.keys(formattedError).length).toBe(5);

      toBeIso8601Strict(loggedObject.timestamp);
      expect(loggedObject.details.code).toBe('GRAPHQL_VALIDATION_FAILED');
      expect(loggedObject.details.originalCode).toBe(
        'GRAPHQL_VALIDATION_FAILED',
      );
      expect(loggedObject.context).toBe('GraphQLModule');
      expect(loggedObject.level).toBe('DEBUG');
      expect(loggedObject.message).toBe('test');
      expect(loggedObject.project).toBe('navy_test');
      expect(loggedObject.component).toBe('navy-video-service_test');
      expect(loggedObject.environment).toBe('test');
      expect(loggedObject.stacktrace).toBeFalsy();
      expect(Object.keys(loggedObject).length).toBe(8);
      expect(Object.keys(loggedObject.details).length).toBe(2);
    });

    it('axGuard error with endpoint path -> path and details are returned and logged', async () => {
      // Arrange
      const onoError = axGuardError(
        {
          code: ErrorCode.UserNotAuthorized,
          details: {
            user: 'test-user',
            serviceId: 'test-service-id',
          },
        },
        ErrorMessage.UserNotAuthorized,
      );

      const gqlError = new GraphQLError(
        'test',
        null,
        new Source('{\n servicePackagesCount\n}'),
        null,
        ['servicePackagesCount'],
        onoError,
        {
          code: 'TEST_CODE',
        },
      );

      // Act
      const formattedError = handleError(config, gqlError);

      // Assert
      toBeIso8601Strict(formattedError.timestamp);
      expect(formattedError.message).toBe('test');
      expect(formattedError.code).toBe(ErrorCode.UserNotAuthorized);
      expect(formattedError.path).toEqual(['servicePackagesCount']);
      expect(formattedError.details.user).toBe('test-user');
      expect(formattedError.details.serviceId).toBe('test-service-id');
      expect(Object.keys(formattedError).length).toBe(5);
      expect(Object.keys(formattedError.details).length).toBe(2);

      toBeIso8601Strict(loggedObject.timestamp);
      expect(loggedObject.details.code).toBe(ErrorCode.UserNotAuthorized);
      expect(loggedObject.details.originalCode).toBe(
        ErrorCode.UserNotAuthorized,
      );
      expect(loggedObject.details.user).toBe('test-user');
      expect(loggedObject.details.request).toBe('{\n servicePackagesCount\n}');
      expect(loggedObject.details.serviceId).toBe('test-service-id');
      expect(loggedObject.context).toBe('servicePackagesCount');
      expect(loggedObject.level).toBe('WARN');
      expect(loggedObject.message).toBe('test');
      expect(loggedObject.project).toBe('navy_test');
      expect(loggedObject.component).toBe('navy-video-service_test');
      expect(loggedObject.environment).toBe('test');
      expect(loggedObject.stacktrace).toContain(ErrorMessage.UserNotAuthorized);
      expect(Object.keys(loggedObject).length).toBe(9);
      expect(Object.keys(loggedObject.details).length).toBe(5);
    });
  });

  describe('Hypothetical cases', () => {
    it('ono with inner error -> valid stack trace', async () => {
      // Arrange
      const innerError = new Error('test-inner-error');
      const onoError = handledError(innerError, 'original');
      const gqlError = new GraphQLError(
        'test',
        null,
        null,
        null,
        null,
        onoError,
        {
          code: 'TEST_CODE',
        },
      );

      // Act
      handleError(config, gqlError);

      // Assert
      expect(loggedObject.stacktrace).toStartWith('Error: original');
      expect(loggedObject.stacktrace).toContain('test-inner-error');
    });
  });
});
