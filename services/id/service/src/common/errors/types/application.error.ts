import { ErrorCode } from '../error-code.enum';

export class ApplicationErrorInfo {
  code?: ErrorCode;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: { [key: string]: any };
}

export class ApplicationError extends Error {
  constructor(info: ApplicationErrorInfo) {
    super(info.message);

    this.code = info.code || ErrorCode.GeneralValidationFailed;
    this.details = info.details;
  }

  private code: ErrorCode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private details: any;
}
