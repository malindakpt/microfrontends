/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorCode as GuardErrorCode } from '@ax/id-guard';
import { isNullOrWhitespace, removeEmptyProperties } from '@ax/service-common';
import { GraphQLError } from 'graphql';

import { Logger } from '../logging';
import { ErrorCode } from './error-code.enum';
import { GraphQLErrorEnhanced } from './error.enhanced';
import { PgErrorCode } from './pg-error-code.enum';

const getCode = (error: GraphQLError): any => {
  const originalError = error.originalError as any;

  if (!originalError || originalError instanceof TypeError) {
    return ErrorCode.GraphQLValidationFailed;
  }

  return originalError.code || error.extensions?.code;
};

const getDetails = (error: GraphQLError): any => {
  const originalError = error.originalError as any;
  return originalError?.details;
};

const getStatus = (error: GraphQLError): any => {
  const originalError = error.originalError as any;
  return originalError?.status;
};

const extractMessage = (messageOrObject: any): string => {
  const defaultMessage = 'Error without a message has occurred.';

  if (isNullOrWhitespace(messageOrObject)) {
    return defaultMessage;
  }

  if (typeof messageOrObject === 'string') {
    return messageOrObject;
  }

  if (typeof messageOrObject === 'object' && messageOrObject.message) {
    return extractMessage(messageOrObject.message);
  }

  return defaultMessage;
};

const processPgError = (message: string, code: string): any => {
  let pgMessage = undefined;
  let pgCode = undefined;
  //TODO: move somewhere more appropriate when error message handling approach stabilizes
  switch (code) {
    case PgErrorCode.ConstraintValidationError:
      pgMessage = 'Unrecognized database validation error occurred.';
      pgCode = ErrorCode.DatabaseValidationFailed;
      break;
    case PgErrorCode.MaxLengthConstraintError:
    case PgErrorCode.MinLengthConstraintError:
    case PgErrorCode.InvalidEmptyValueConstraintError:
      pgMessage = message;
      pgCode = ErrorCode.DatabaseValidationFailed;
      break;

    default:
      break;
  }

  return { pgMessage, pgCode };
};

const getFormattedError = (
  error: GraphQLError,
  originalCode?: ErrorCode,
  details?: any,
  status?: number,
): GraphQLErrorEnhanced => {
  const message = extractMessage(error.message);
  const { pgMessage, pgCode } = processPgError(message, originalCode);

  return {
    timestamp: new Date().toISOString(),
    code: pgCode || originalCode,
    status,
    message: pgMessage || message,
    path: error.path,
    details,
  } as GraphQLErrorEnhanced;
};

const getFormattedLog = (
  error: GraphQLError,
  formattedError: GraphQLErrorEnhanced,
  originalCode: string,
): any => {
  const originalError = error.originalError as any;
  const request = error.source?.body || originalError?.source?.body;
  const stack =
    originalError?.stack ||
    error.extensions?.exception?.stacktrace?.join('\r\n');

  const { details, ...errorInfo } = formattedError;
  return removeEmptyProperties({
    ...details,
    ...errorInfo,
    request,
    stack,
    originalCode,
  });
};

const writeLog = (path: string[], formattedLog: any): void => {
  const context = path?.length ? path[0] : undefined;
  const logger = new Logger(context?.toString() || 'GraphQLModule');

  switch (formattedLog.code) {
    case ErrorCode.InternalServerError:
      logger.error(formattedLog);
      break;

    case ErrorCode.HandledInternalServerError:
    case GuardErrorCode.UserNotAuthorized:
    case GuardErrorCode.AccessTokenRequired:
    case GuardErrorCode.AccessTokenInvalid:
    case GuardErrorCode.AccessTokenExpired:
      logger.warn(formattedLog);
      break;

    case ErrorCode.InputValidationFailed:
      logger.verbose(formattedLog);
      break;

    case ErrorCode.GraphQLValidationFailed:
      logger.debug(formattedLog);
      break;

    default:
      logger.log(formattedLog);
      break;
  }
};

export const handleError = (error: GraphQLError): GraphQLErrorEnhanced => {
  const originalCode = getCode(error);
  const details = getDetails(error);
  const status = getStatus(error);
  const formatterError = getFormattedError(
    error,
    originalCode,
    details,
    status,
  );
  const { path, ...log } = getFormattedLog(error, formatterError, originalCode);

  writeLog(path, log);

  return formatterError;
};

export const handleErrors = (
  errors: readonly GraphQLError[],
): GraphQLErrorEnhanced[] => {
  return errors.map(error => {
    return handleError(error);
  });
};
