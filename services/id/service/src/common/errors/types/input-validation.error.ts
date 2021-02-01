import { Ono } from 'ono';
import { ErrorCode } from '../error-code.enum';

class InputValidationError extends Error {
  constructor(message) {
    super(message);
    this.code = ErrorCode.InputValidationFailed;
  }

  private code: ErrorCode;
}

export const inputError = new Ono(InputValidationError, {
  concatMessages: false,
});
