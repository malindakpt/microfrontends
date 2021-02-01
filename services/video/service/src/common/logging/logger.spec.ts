import 'jest-extended';

import { dateToBeInRange, toBeIso8601Strict } from '@ax/service-common';

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
  let logger: Logger;
  let loggerWithoutContext: Logger;
  let consoleOverride: jest.SpyInstance;
  let loggedObject: any;
  let timestampBeforeTest: Date;

  beforeAll(() => {
    const config = createTestConfig();
    logger = new Logger(config, 'LoggerTests');
    loggerWithoutContext = new Logger(config);
  });

  beforeEach(() => {
    timestampBeforeTest = new Date();
    consoleOverride = jest
      .spyOn(console, 'error')
      .mockImplementation(obj => (loggedObject = JSON.parse(obj)));
  });

  afterEach(() => {
    loggedObject = undefined;
    jest.restoreAllMocks();
  });

  it('log error without parameters -> valid log object', () => {
    // Act
    logger.error();

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'ERROR',
      message: 'Log attempt is made without a message.',
      context: 'LoggerTests',
      project: 'navy_test',
      component: 'navy-video-service_test',
      environment: 'test',
    });

    expect(Object.keys(loggedObject).length).toBe(7);
  });

  it('log without message and context -> valid log object', () => {
    // Act
    loggerWithoutContext.error(undefined);

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'ERROR',
      message: 'Log attempt is made without a message.',
      project: 'navy_test',
      component: 'navy-video-service_test',
      environment: 'test',
    });

    expect(Object.keys(loggedObject).length).toBe(6);
  });

  it('log empty object with explicit context -> valid log object', () => {
    // Act
    logger.error({}, { context: 'ErrorContext' });

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'ERROR',
      message: 'Log attempt is made without a message.',
      context: 'ErrorContext',
      project: 'navy_test',
      component: 'navy-video-service_test',
      environment: 'test',
    });

    expect(Object.keys(loggedObject).length).toBe(7);
  });

  it('log error message -> valid log object', () => {
    // Act
    logger.error('test message');

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'ERROR',
      message: 'test message',
      context: 'LoggerTests',
      project: 'navy_test',
      component: 'navy-video-service_test',
      environment: 'test',
    });

    expect(Object.keys(loggedObject).length).toBe(7);
  });

  it('log error -> valid log object', () => {
    // Arrange
    const error = new Error('test message');

    // Act
    logger.error(error);

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject.stacktrace).toStartWith('Error: test message\n');
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'ERROR',
      message: 'test message',
      context: 'LoggerTests',
      project: 'navy_test',
      component: 'navy-video-service_test',
      environment: 'test',
      stacktrace: loggedObject.stacktrace,
    });

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
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject.stacktrace).toStartWith('Error: test message\n');
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'ERROR',
      message: 'test message',
      context: 'LoggerTests',
      project: 'navy_test',
      component: 'navy-video-service_test',
      environment: 'test',
      stacktrace: loggedObject.stacktrace,
      details: { code: ErrorCode.HandledInternalServerError },
    });

    expect(Object.keys(loggedObject).length).toBe(9);
    expect(Object.keys(loggedObject.details).length).toBe(1);
  });

  it('log ono error with explicit message -> valid log object', () => {
    // Arrange
    const error = handledError('original message');

    // Act
    logger.error(error, {
      message:
        "Something went wrong, but we don't want to show you original error message",
      // In actual code explicit `errorMessage` property should not be used, as this value will be overridden by original message and will not be logged
      errorMessage: 'secondary message',
    });

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject.stacktrace).toStartWith('Error: original message\n');
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'ERROR',
      message:
        "Something went wrong, but we don't want to show you original error message",
      context: 'LoggerTests',
      project: 'navy_test',
      component: 'navy-video-service_test',
      environment: 'test',
      stacktrace: loggedObject.stacktrace,
      details: {
        code: ErrorCode.HandledInternalServerError,
        errorMessage: 'original message',
      },
    });

    expect(Object.keys(loggedObject).length).toBe(9);
    expect(Object.keys(loggedObject.details).length).toBe(2);
  });

  it('log ono error with inner error with explicit message -> valid log object', () => {
    // Arrange
    const innerError = new Error('inner message');
    const error = handledError(innerError, 'original message');

    // Act
    logger.error(error, {
      message:
        "Something went wrong, but we don't want to show you original error message",
    });

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject.stacktrace).toStartWith('Error: original message\n');
    expect(loggedObject.stacktrace).toContain('inner message\n');
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'ERROR',
      message:
        "Something went wrong, but we don't want to show you original error message",
      context: 'LoggerTests',
      project: 'navy_test',
      component: 'navy-video-service_test',
      environment: 'test',
      stacktrace: loggedObject.stacktrace,
      details: {
        code: ErrorCode.HandledInternalServerError,
        errorMessage: 'original message',
      },
    });

    expect(Object.keys(loggedObject).length).toBe(9);
    expect(Object.keys(loggedObject.details).length).toBe(2);
  });

  it('log ono error with inner error, custom properties and explicit message -> valid log object', () => {
    // Arrange
    const innerError = new Error('inner message');
    const error = handledError(
      innerError,
      {
        user: 'some user name',
        serviceId: 'some user id',
        validation: ['validation message1', 'validation message2'],
      },
      'original message',
    );

    // Act
    logger.error(error, {
      message:
        "Something went wrong, but we don't want to show you original error message",
    });

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject.stacktrace).toStartWith('Error: original message\n');
    expect(loggedObject.stacktrace).toContain('inner message\n');
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'ERROR',
      message:
        "Something went wrong, but we don't want to show you original error message",
      context: 'LoggerTests',
      project: 'navy_test',
      component: 'navy-video-service_test',
      environment: 'test',
      stacktrace: loggedObject.stacktrace,
      details: {
        code: ErrorCode.HandledInternalServerError,
        errorMessage: 'original message',
        user: 'some user name',
        serviceId: 'some user id',
        validation: ['validation message1', 'validation message2'],
      },
    });

    expect(Object.keys(loggedObject).length).toBe(9);
    expect(Object.keys(loggedObject.details).length).toBe(5);
  });

  it.each([
    '2020-01-31T23:59:59.000Z',
    '2020-01-31T23:59:59.000+00:00',
    '2020-02-01T00:59:59.000+01:00',
    '2020-01-31T23:59:59',
    '2020-01-31T22:59:59.000-01:00',
    new Date('2020-01-31T23:59:59.000Z'),
  ])(
    'log error object with timestamp -> valid log object, value: "%s"',
    timestamp => {
      // Arrange
      const error = {
        message: 'test',
        validation: ['This is a validation message'],
        timestamp: timestamp,
      };

      // Act
      logger.error(error, { context: 'ErrorContext' });

      // Assert
      expect(consoleOverride).toBeCalledTimes(1);

      expect(loggedObject).toEqual({
        timestamp: '2020-01-31T23:59:59.000Z',
        level: 'ERROR',
        message: 'test',
        context: 'ErrorContext',
        project: 'navy_test',
        component: 'navy-video-service_test',
        environment: 'test',
        details: { validation: error.validation },
      });

      expect(Object.keys(loggedObject).length).toBe(8);
      expect(Object.keys(loggedObject.details).length).toBe(1);
    },
  );

  it.each([undefined, null, '', '0000-00-00T00:00:00.000Z', 'invalid-value'])(
    'log error object with invalid timestamp -> valid log object, value: "%s"',
    timestamp => {
      // Arrange
      const error = {
        message: 'test',
        validation: ['This is a validation message'],
        timestamp: timestamp,
      };

      // Act
      logger.error(error, { context: 'ErrorContext' });

      // Assert
      expect(consoleOverride).toBeCalledTimes(1);

      toBeIso8601Strict(loggedObject.timestamp);
      dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
      expect(loggedObject).toEqual({
        timestamp: loggedObject.timestamp,
        level: 'ERROR',
        message: 'test',
        context: 'ErrorContext',
        project: 'navy_test',
        component: 'navy-video-service_test',
        environment: 'test',
        details: { validation: error.validation },
      });

      expect(Object.keys(loggedObject).length).toBe(8);
      expect(Object.keys(loggedObject.details).length).toBe(1);
    },
  );

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
      dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
      expect(loggedObject).toEqual({
        timestamp: loggedObject.timestamp,
        level: logLevel,
        message: 'test',
        context: 'LoggerTests',
        project: 'navy_test',
        component: 'navy-video-service_test',
        environment: 'prod',
      });

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
      dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
      expect(loggedObject).toEqual({
        timestamp: loggedObject.timestamp,
        level: logLevel,
        message: 'test',
        context: 'LoggerTests',
        project: 'navy_test',
        component: 'navy-video-service_test',
        environment: 'test',
      });

      expect(Object.keys(loggedObject).length).toBe(7);
    },
  );

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
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'INFO',
      message: 'test',
      context: 'LoggerTests',
    });

    expect(Object.keys(loggedObject).length).toBe(4);
  });

  it('logs with env not set -> fallback value used', () => {
    // Arrange
    const config = createTestConfig({
      environment: undefined,
      logProject: undefined,
      serviceId: undefined,
    });
    logger = new Logger(config, 'LoggerTests');

    // Act
    logger.error('test');

    // Assert
    expect(consoleOverride).toBeCalledTimes(1);

    toBeIso8601Strict(loggedObject.timestamp);
    dateToBeInRange(loggedObject.timestamp, timestampBeforeTest);
    expect(loggedObject).toEqual({
      timestamp: loggedObject.timestamp,
      level: 'ERROR',
      message: 'test',
      context: 'LoggerTests',
      project: 'Undefined',
      component: 'Undefined',
      environment: 'Undefined',
    });

    expect(Object.keys(loggedObject).length).toBe(7);
  });

  it.each`
    level        | written                                         | skipped
    ${'DEBUG'}   | ${['debug', 'verbose', 'log', 'warn', 'error']} | ${[]}
    ${'VERBOSE'} | ${['verbose', 'log', 'warn', 'error']}          | ${['debug']}
    ${'LOG'}     | ${['log', 'warn', 'error']}                     | ${['debug', 'verbose']}
    ${'WARN'}    | ${['warn', 'error']}                            | ${['debug', 'verbose', 'log']}
    ${'ERROR'}   | ${['error']}                                    | ${['debug', 'verbose', 'log', 'warn']}
  `(
    '$level log level configured with prod env -> written logs: $written; skipped logs: $skipped',
    ({ level, written, skipped }) => {
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
