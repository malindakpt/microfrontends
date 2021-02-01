import { Ono } from 'ono';

import { ErrorCode } from './error-code.enum';

export class AxGuardErrorInfo {
  code: ErrorCode;
  message: string;
  originalError?: Error;
  details?: { [key: string]: any };
}

export const axGuardError = new Ono(Error, {
  concatMessages: false,
});
