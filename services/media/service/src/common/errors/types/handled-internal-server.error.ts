import { Ono } from 'ono';
import { ErrorCode } from '../error-code.enum';

class HandledInternalServerError extends Error {
  constructor(message) {
    super(message);
    this.code = ErrorCode.HandledInternalServerError;
  }

  private code: ErrorCode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handledError: any = new Ono(HandledInternalServerError, {
  concatMessages: false,
});
