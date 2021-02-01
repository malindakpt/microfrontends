import { Request } from 'express';

import { Logger } from '../../../common';
import { ApplicationErrorInfo, ErrorCode } from '../../../common/errors';

export function applicationError(
  req: Request,
  message: string,
  logger: Logger = new Logger('auth-endpoint'),
  logError = true,
  code: ErrorCode = ErrorCode.BadRequest,
): ApplicationErrorInfo {
  const error: ApplicationErrorInfo = {
    code,
    message,
    details: {
      tenantId: req.params.tenantId || '',
      applicationId: req.params.applicationId || '',
      providerId: req.query.providerId || '',
      originUrl: req.query.originUrl || '',
    },
  };
  if (logError) logger.error(error);

  return error;
}
