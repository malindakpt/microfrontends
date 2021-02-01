export enum ErrorCode {
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  HandledInternalServerError = 'HANDLED_INTERNAL_SERVER_ERROR',
  DatabaseValidationFailed = 'DATABASE_VALIDATION_FAILED',
  GraphQLValidationFailed = 'GRAPHQL_VALIDATION_FAILED',
  InputValidationFailed = 'INPUT_VALIDATION_FAILED',
  StartupError = 'STARTUP_ERROR',
}
