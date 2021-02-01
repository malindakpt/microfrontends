export enum PgErrorCode {
  ConstraintValidationError = '23514',
  MaxLengthConstraintError = 'MXLEN',
  MinLengthConstraintError = 'MNLEN',
  InvalidEmptyValueConstraintError = 'EMPTY',
  InvalidRegexPattern = 'PATRN',
}
