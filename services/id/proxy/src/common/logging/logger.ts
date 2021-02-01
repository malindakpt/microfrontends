/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { config as defaultConfig, Config } from '../config';
import {
  isEmptyObject,
  isNullOrWhitespace,
  removeEmptyProperties,
} from '../helpers';
import { JsonObject } from '../types';
import { LogLevel } from './log-level.enum';

export class Logger {
  private readonly logLevel: LogLevel;

  constructor(
    private readonly loggerContext?: string,
    private readonly config: Config = defaultConfig,
  ) {
    this.logLevel = this.setLogLevel();
  }

  private setLogLevel(): LogLevel {
    const configValue = (process.env.LOG_LEVEL ?? '').toUpperCase();
    const level = LogLevel[configValue];

    if (level === undefined || typeof level === 'string') {
      return LogLevel.INFO;
    }

    return level;
  }

  public error(message: any, trace?: string, context?: string): any {
    console.error(this.format(LogLevel.ERROR, message, context, trace));
  }

  public warn(message: any, context?: string): any {
    const level = LogLevel.WARN;
    if (this.skipLog(level)) {
      return;
    }

    console.warn(this.format(level, message, context));
  }

  public log(message: any, context?: string): any {
    const level = LogLevel.INFO;
    if (this.skipLog(level)) {
      return;
    }

    console.log(this.format(level, message, context));
  }

  public verbose?(message: any, context?: string): any {
    const level = LogLevel.VERBOSE;
    if (this.skipLog(level)) {
      return;
    }

    console.log(this.format(level, message, context));
  }

  public debug?(message: any, context?: string): any {
    const level = LogLevel.DEBUG;
    if (this.skipLog(level)) {
      return;
    }

    console.debug(this.format(level, message, context));
  }

  private skipLog(level: LogLevel): boolean {
    return level > this.logLevel;
  }

  private format(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ): string | JsonObject {
    if (isNullOrWhitespace(message) || isEmptyObject(message)) {
      message = 'Log attempt is made without a message.';
    }

    const messageData = typeof message === 'string' ? { message } : message;
    const { message: msg, timestamp, stack, ...other } = messageData;
    const details = !isEmptyObject(other) ? other : undefined;
    let log: JsonObject = {
      timestamp: timestamp || new Date().toISOString(),
      level: LogLevel[level],
      message: msg,
      context: context || this.loggerContext,
      details,
      stacktrace: trace || stack,
    };

    log = removeEmptyProperties(log);
    if (this.config.isDev()) {
      return log;
    }

    const fallbackValue = 'Undefined';
    log.component = this.config.serviceId || fallbackValue;
    log.environment = this.config.environment || fallbackValue;

    return JSON.stringify(log);
  }
}
