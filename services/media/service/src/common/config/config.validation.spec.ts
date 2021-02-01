import { rejectionOf, toBeIso8601Strict } from '@ax/service-common';

import { createTestConfig } from '../../tests/test-utils';
import { ErrorCode } from '../errors';
import { validateConfig } from './';

describe('Config Validation', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('validateConfig', () => {
    it.each([
      undefined,
      null,
      '',
      ' ',
      'CRITICAL',
      'warning',
      'Silly',
      '0',
      '-1',
      'Something random',
    ])(
      'invalid logLevel "%s" -> no error, warning log written',
      async logLevel => {
        // Arrange
        let loggedObject;
        const consoleOverride = jest
          .spyOn(console, 'warn')
          .mockImplementation(obj => (loggedObject = JSON.parse(obj)));
        const config = createTestConfig({ logLevel });

        // Act
        await validateConfig(config);

        // Assert
        expect(consoleOverride).toBeCalledTimes(1);

        toBeIso8601Strict(loggedObject.timestamp);
        expect(loggedObject.level).toBe('WARN');
        expect(loggedObject.context).toBe('validateLogLevel');
        expect(loggedObject.message).toBe(
          `LOG_LEVEL '${logLevel}' is not valid. Please use one of the following values: ERROR, WARN, INFO, VERBOSE, DEBUG`,
        );
        expect(loggedObject.details.code).toBe(ErrorCode.StartupError);
        expect(loggedObject.component).toBe('navy-media-service_test');
        expect(loggedObject.environment).toBe('test');
        expect(loggedObject.project).toBe('navy_test');
        expect(Object.keys(loggedObject.details).length).toBe(1);
        expect(Object.keys(loggedObject).length).toBe(8);
      },
    );

    it.each(['DEBUG', 'verbose', 'Info', 'WaRn', 'ERROR'])(
      'valid logLevel "%s" -> no error, warning log not written',
      async logLevel => {
        // Arrange
        let loggedObject;
        const consoleOverride = jest
          .spyOn(console, 'warn')
          .mockImplementation(obj => (loggedObject = JSON.parse(obj)));
        const config = createTestConfig({ logLevel });

        // Act
        await validateConfig(config);

        // Assert
        expect(consoleOverride).toBeCalledTimes(0);
        expect(loggedObject).toBeFalsy();
      },
    );

    it('invalid environment -> error with single message', async () => {
      // Arrange
      const config = createTestConfig({ environment: 'stage' });

      // Act
      const error = await rejectionOf(validateConfig(config));

      // Assert
      expect(error.message).toBe(
        'Error occurred during validation of configuration values.',
      );
      expect(error.validation).toBeTruthy();
      expect(error.validation.length).toBe(1);
      expect(error.validation[0]).toBe(
        'environment must be one of the following values: dev, prod, test',
      );
    });

    it('invalid environment and port -> error with multiple messages', async () => {
      // Arrange
      const config = createTestConfig({ environment: 'stage', port: -1 });

      // Act
      const error = await rejectionOf(validateConfig(config));

      // Assert
      expect(error.message).toBe(
        'Error occurred during validation of configuration values.',
      );
      expect(error.validation).toBeTruthy();
      expect(error.validation.length).toBe(2);
      expect(error.validation).toContain(
        'environment must be one of the following values: dev, prod, test',
      );
      expect(error.validation).toContain('port must be a positive number');
    });

    //TODO: Add more tests to cover validation of other properties
  });
});
