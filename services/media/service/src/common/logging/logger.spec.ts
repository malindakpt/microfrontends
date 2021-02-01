import 'jest-extended';

import { toBeIso8601Strict, toSerializeEqual } from '@ax/service-common';

import { createTestConfig } from '../../tests/test-utils';
import { ErrorCode, handledError } from '../errors';
import { Logger } from './logger';

declare type ConsoleMethodsType = 'error' | 'warn' | 'log' | 'debug';

const getConsoleMethod = (loggerMethod: string): ConsoleMethodsType => {
  switch (loggerMethod) {
    case 'verbose':
      return 'log';

    default:
      return loggerMethod as ConsoleMethodsType;
  }
};

describe('Logger', () => {
  let logger;
  let consoleOverride;
  let loggedObject;

  beforeAll(() => {
    const config = createTestConfig();
    logger = new Logger(config, 'LoggerTests');
  });

  beforeEach(() => {
    consoleOverride = jest
      .spyOn(console, 'error')
      .mockImplementation(obj => (loggedObject = JSON.parse(obj)));
  });

  afterEach(() => {
    loggedObject = undefined;
    jest.restoreAllMocks();
  });

  it('log error without stack -> valid log object', () => {
    // Act
    logger.error('test message');

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    expect(loggedObject.context).toBe('LoggerTests');
    expect(loggedObject.level).toBe('ERROR');
    expect(loggedObject.message).toBe('test message');
    expect(loggedObject.project).toBe('navy_test');
    expect(loggedObject.component).toBe('navy-media-service_test');
    expect(loggedObject.environment).toBe('test');
    expect(loggedObject.stacktrace).toBeFalsy();
    expect(Object.keys(loggedObject).length).toBe(7);
  });

  it('log error with stack -> valid log object', () => {
    // Arrange
    const error = new Error('test message');

    // Act
    logger.error(error.message, error.stack, 'ErrorContext');

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    expect(loggedObject.level).toBe('ERROR');
    expect(loggedObject.context).toBe('ErrorContext');
    expect(loggedObject.message).toBe('test message');
    expect(loggedObject.project).toBe('navy_test');
    expect(loggedObject.component).toBe('navy-media-service_test');
    expect(loggedObject.environment).toBe('test');
    expect(loggedObject.stacktrace).toBeTruthy();
    expect(Object.keys(loggedObject).length).toBe(8);
  });

  it('log error -> valid log object', () => {
    // Arrange
    const error = new Error('test message');

    // Act
    logger.error(error);

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    expect(loggedObject.level).toBe('ERROR');
    expect(loggedObject.context).toBe('LoggerTests');
    expect(loggedObject.message).toBe('test message');
    expect(loggedObject.project).toBe('navy_test');
    expect(loggedObject.component).toBe('navy-media-service_test');
    expect(loggedObject.environment).toBe('test');
    expect(loggedObject.stacktrace).toStartWith('Error: test message\n');
    expect(Object.keys(loggedObject).length).toBe(8);
  });

  it('log ono error -> valid log object', () => {
    // Arrange
    const error = handledError('test message');

    // Act
    logger.error(error);

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    expect(loggedObject.level).toBe('ERROR');
    expect(loggedObject.context).toBe('LoggerTests');
    expect(loggedObject.message).toBe('test message');
    expect(loggedObject.project).toBe('navy_test');
    expect(loggedObject.component).toBe('navy-media-service_test');
    expect(loggedObject.environment).toBe('test');
    expect(loggedObject.stacktrace).toStartWith('Error: test message\n');
    expect(loggedObject.details.code).toBe(
      ErrorCode.HandledInternalServerError,
    );
    expect(Object.keys(loggedObject.details).length).toBe(1);
    expect(Object.keys(loggedObject).length).toBe(9);
  });

  it('log error object -> valid log object', () => {
    // Arrange
    const error = {
      message: 'test',
      validation: ['This is a validation message'],
      timestamp: '2020-01-31T23:59:59.001Z',
    };

    // Act
    logger.error(error, null, 'ErrorContext');

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    expect(loggedObject.timestamp).toBe(error.timestamp);
    expect(loggedObject.level).toBe('ERROR');
    expect(loggedObject.context).toBe('ErrorContext');
    expect(loggedObject.message).toBe('test');
    expect(loggedObject.project).toBe('navy_test');
    expect(loggedObject.component).toBe('navy-media-service_test');
    expect(loggedObject.environment).toBe('test');
    expect(loggedObject.stacktrace).toBeFalsy();
    toSerializeEqual(loggedObject.details.validation, error.validation);
    expect(Object.keys(loggedObject.details).length).toBe(1);
    expect(Object.keys(loggedObject).length).toBe(8);
  });

  //TODO: Change to original approach when a better template string example appears in the project
  it.each`
    loggerFunction | logLevel
    ${'verbose'}   | ${'VERBOSE'}
    ${'debug'}     | ${'DEBUG'}
  `(
    '$loggerFunction log call with prod env and debug config level -> valid log object with $logLevel logged level',
    ({ loggerFunction, logLevel }) => {
      // Arrange
      const config = createTestConfig({
        logLevel: 'debug',
        environment: 'prod',
      });
      logger = new Logger(config, 'LoggerTests');

      const logOverride = jest
        .spyOn(console, getConsoleMethod(loggerFunction))
        .mockImplementation(obj => (loggedObject = JSON.parse(obj)));

      // Act
      logger[loggerFunction]('test');

      // Assert
      expect(logOverride).toBeCalledTimes(1);

      toBeIso8601Strict(loggedObject.timestamp);
      expect(loggedObject.level).toBe(logLevel);
      expect(loggedObject.context).toBe('LoggerTests');
      expect(loggedObject.message).toBe('test');
      expect(loggedObject.project).toBe('navy_test');
      expect(loggedObject.component).toBe('navy-media-service_test');
      expect(loggedObject.environment).toBe('prod');
      expect(loggedObject.stacktrace).toBeFalsy();
      expect(Object.keys(loggedObject).length).toBe(7);
    },
  );

  it.each([
    undefined,
    null,
    'Invalid value that is replaced by a log level value depending on NODE_ENV value',
    '0',
    '4',
  ])(
    'debug log call with prod env and invalid config level -> log ignored, value: "%s"',
    level => {
      // Arrange
      const config = createTestConfig({
        logLevel: level,
        environment: 'prod',
      });
      logger = new Logger(config, 'LoggerTests');

      const logOverride = jest
        .spyOn(console, 'debug')
        .mockImplementation(obj => (loggedObject = JSON.parse(obj)));

      // Act
      logger.debug('test');

      // Assert
      expect(logOverride).toBeCalledTimes(0);

      expect(loggedObject).toBeFalsy();
    },
  );

  it.each([
    ['verbose', 'VERBOSE'],
    ['debug', 'DEBUG'],
    ['log', 'INFO'],
    ['warn', 'WARN'],
    ['error', 'ERROR'],
  ])(
    '%s log call with non-prod env and debug config level -> valid log with %s level',
    (loggerFunction, logLevel) => {
      // Arrange
      const config = createTestConfig({ logLevel: 'debug' });
      logger = new Logger(config, 'LoggerTests');

      const logOverride = jest
        .spyOn(console, getConsoleMethod(loggerFunction))
        .mockImplementation(obj => (loggedObject = JSON.parse(obj)));

      // Act
      logger[loggerFunction]('test');

      // Assert
      expect(logOverride).toBeCalledTimes(1);

      toBeIso8601Strict(loggedObject.timestamp);
      expect(loggedObject.level).toBe(logLevel);
      expect(loggedObject.context).toBe('LoggerTests');
      expect(loggedObject.message).toBe('test');
      expect(loggedObject.project).toBe('navy_test');
      expect(loggedObject.component).toBe('navy-media-service_test');
      expect(loggedObject.environment).toBe('test');
      expect(loggedObject.stacktrace).toBeFalsy();
      expect(Object.keys(loggedObject).length).toBe(7);
    },
  );

  it('log empty object -> valid log object', () => {
    // Arrange
    const message = {};

    // Act
    logger.error(message, null, 'ErrorContext');

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    expect(loggedObject.level).toBe('ERROR');
    expect(loggedObject.context).toBe('ErrorContext');
    expect(loggedObject.message).toBe('Log attempt is made without a message.');
    expect(loggedObject.project).toBe('navy_test');
    expect(loggedObject.component).toBe('navy-media-service_test');
    expect(loggedObject.environment).toBe('test');
    expect(loggedObject.stacktrace).toBeFalsy();
    expect(Object.keys(loggedObject).length).toBe(7);
  });

  it('log without message and context -> valid log object', () => {
    // Arrange
    const message = undefined;
    const config = createTestConfig();
    const loggerWithoutContext = new Logger(config);

    // Act
    loggerWithoutContext.error(message);

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    expect(loggedObject.level).toBe('ERROR');
    expect(loggedObject.context).toBeFalsy();
    expect(loggedObject.message).toBe('Log attempt is made without a message.');
    expect(loggedObject.project).toBe('navy_test');
    expect(loggedObject.component).toBe('navy-media-service_test');
    expect(loggedObject.environment).toBe('test');
    expect(loggedObject.stacktrace).toBeFalsy();
    expect(Object.keys(loggedObject).length).toBe(6);
  });

  it('logs with dev env -> properties ignored', () => {
    // Arrange
    const config = createTestConfig({ environment: 'dev' });
    logger = new Logger(config, 'LoggerTests');

    const logOverride = jest
      .spyOn(console, 'log')
      .mockImplementation(obj => (loggedObject = obj));

    // Act
    logger.log('test');

    // Assert
    expect(logOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    expect(loggedObject.level).toBe('INFO');
    expect(loggedObject.context).toBe('LoggerTests');
    expect(loggedObject.message).toBe('test');
    expect(loggedObject.details).toBeUndefined();
    expect(loggedObject.project).toBeFalsy();
    expect(loggedObject.component).toBeFalsy();
    expect(loggedObject.environment).toBeFalsy();
    expect(loggedObject.stacktrace).toBeFalsy();
    expect(Object.keys(loggedObject).length).toBe(4);
  });

  it('logs with env not set -> fallback value used', () => {
    // Arrange
    const config = createTestConfig({ environment: undefined });
    logger = new Logger(config, 'LoggerTests');

    // Act
    logger.error('test');

    // Assert
    toBeIso8601Strict(loggedObject.timestamp);
    expect(loggedObject.level).toBe('ERROR');
    expect(loggedObject.context).toBe('LoggerTests');
    expect(loggedObject.message).toBe('test');
    expect(loggedObject.project).toBe('navy_test');
    expect(loggedObject.component).toBe('navy-media-service_test');
    expect(loggedObject.environment).toBe('Undefined');
    expect(loggedObject.stacktrace).toBeFalsy();
    expect(Object.keys(loggedObject).length).toBe(7);
  });

  it.each([
    ['DEBUG', ['debug', 'verbose', 'log', 'warn', 'error'], []],
    ['VERBOSE', ['verbose', 'log', 'warn', 'error'], ['debug']],
    ['LOG', ['log', 'warn', 'error'], ['debug', 'verbose']],
    ['WARN', ['warn', 'error'], ['debug', 'verbose', 'log']],
    ['ERROR', ['error'], ['debug', 'verbose', 'log', 'warn']],
  ])(
    '%s log level configured with prod env -> written logs: %j; skipped logs: %j',
    (level, written, skipped) => {
      // Arrange
      const config = createTestConfig({
        environment: 'prod',
        logLevel: level,
      });
      logger = new Logger(config, 'LoggerTests');

      for (const log of written) {
        const logOverride = jest
          .spyOn(console, getConsoleMethod(log))
          .mockImplementation(obj => (loggedObject = JSON.parse(obj)));

        // Act
        logger[log]('test');

        // Assert
        expect(logOverride).toBeCalledTimes(1);
        expect(loggedObject).toBeTruthy();

        // Cleanup
        logOverride.mockClear();
        loggedObject = null;
      }

      for (const log of skipped) {
        const logOverride = jest.spyOn(console, getConsoleMethod(log));

        // Act
        logger[log]('test');

        // Assert
        expect(logOverride).toBeCalledTimes(0);
        expect(loggedObject).toBeFalsy();

        // Cleanup
        logOverride.mockClear();
        loggedObject = null;
      }
    },
  );
});
