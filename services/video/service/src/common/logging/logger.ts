/* eslint-disable no-console */
import {
  isEmptyObject,
  isNullOrWhitespace,
  JSONify,
  removeEmptyProperties,
} from '@ax/service-common';
import * as moment from 'moment';

import { Config } from '../config';
import { JsonObject } from '../types';
import { LogLevel } from './log-level.enum';

interface ILog {
  message?: string;
  timestamp?: string | Date;
  stack?: string;
  context?: string;
  [key: string]: any;
}

export class Logger {
  private readonly maxLevel: LogLevel;
  constructor(
    private readonly config: Config,
    private readonly loggerContext?: string,
  ) {
    this.maxLevel = this.setMaxLogLevel();
  }

  private setMaxLogLevel(): LogLevel {
    const configValue = (this.config.logLevel ?? '').toUpperCase();
    const level = LogLevel[configValue];

    if (level === undefined || typeof level === 'string') {
      return this.config.isProd() ? LogLevel.INFO : LogLevel.DEBUG;
    }

    return level;
  }

  public error(error: string | ILog = {}, message?: string | ILog): void {
    console.error(this.format(LogLevel.ERROR, message, error));
  }

  public warn(message: string | ILog): void {
    const level = LogLevel.WARN;
    if (this.skipLog(level)) return;

    console.warn(this.format(level, message));
  }

  public log(message: string | ILog): void {
    const level = LogLevel.INFO;
    if (this.skipLog(level)) return;

    console.log(this.format(level, message));
  }

  public verbose?(message: string | ILog): void {
    const level = LogLevel.VERBOSE;
    if (this.skipLog(level)) return;

    console.log(this.format(level, message));
  }

  public debug?(message: string | ILog): void {
    const level = LogLevel.DEBUG;
    if (this.skipLog(level)) return;

    console.debug(this.format(level, message));
  }

  private skipLog(level: LogLevel): boolean {
    return level > this.maxLevel;
  }

  private parseTimestamp(timestamp: string | Date): string {
    const now = new Date().toISOString();
    //TODO: Github issue - https://github.com/moment/moment/issues/5629
    const m = (moment as unknown) as { suppressDeprecationWarnings: boolean };
    const oldSuppress = m.suppressDeprecationWarnings;
    try {
      m.suppressDeprecationWarnings = true;
      return timestamp ? moment.utc(timestamp).toISOString() ?? now : now;
    } catch {
      return now;
    } finally {
      m.suppressDeprecationWarnings = oldSuppress;
    }
  }

  private format(
    level: LogLevel,
    message: string | ILog,
    error: string | ILog = {},
  ): string | JsonObject {
    const messageObj: ILog =
      typeof message === 'string' ? { message } : message;
    const errorObj: ILog =
      typeof error === 'string' ? { message: error } : JSONify(error);

    let logObj: ILog;
    if (
      !isNullOrWhitespace(errorObj?.message) &&
      !isNullOrWhitespace(messageObj?.message)
    ) {
      // message is taken from message object and error message is written to dedicated property
      const { message: errorMessage, ...other } = errorObj;
      logObj = { ...other, ...messageObj, errorMessage };
    } else {
      // message is specified only in one object
      logObj = { ...errorObj, ...messageObj };
    }

    const { message: msg, timestamp, stack, context, ...other } = logObj;
    const details = isEmptyObject(other) ? undefined : other;
    const log: JsonObject = {
      timestamp: this.parseTimestamp(timestamp),
      level: LogLevel[level],
      message: msg || 'Log attempt is made without a message.',
      context: context || this.loggerContext,
      details,
      stacktrace: stack,
    };

    if (this.config.isDev()) {
      return removeEmptyProperties(log);
    }

    const fallbackValue = 'Undefined';
    log.project = this.config.logProject || fallbackValue;
    log.component = this.config.serviceId || fallbackValue;
    log.environment = this.config.environment || fallbackValue;

    return JSON.stringify(log);
  }
}
