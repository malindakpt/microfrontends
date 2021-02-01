import { Ono } from 'ono';
import { ErrorCode } from '../error-code.enum';

class HandledInternalServerError extends Error {
  constructor(message) {
    super(message);
    this.code = ErrorCode.HandledInternalServerError;
  }

  private code: ErrorCode;
}

export const handledError = new Ono(HandledInternalServerError, {
  concatMessages: false,
});
