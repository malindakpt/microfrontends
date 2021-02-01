export enum ErrorCode {
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  HandledInternalServerError = 'HANDLED_INTERNAL_SERVER_ERROR',
  GraphQLValidationFailed = 'GRAPHQL_VALIDATION_FAILED',
  InputValidationFailed = 'INPUT_VALIDATION_FAILED',
  GeneralValidationFailed = 'GENERAL_VALIDATION_FAILED',
  DatabaseValidationFailed = 'DATABASE_VALIDATION_FAILED',
  StartupError = 'STARTUP_ERROR',
  ResourceInactive = 'RESOURCE_INACTIVE',

  CredentialsInvalid = 'CREDENTIALS_INVALID,',

  BadRequest = 'BAD_REQUEST',
}
