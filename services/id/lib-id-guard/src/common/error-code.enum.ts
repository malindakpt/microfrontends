export enum ErrorCode {
  AccessTokenRequired = 'ACCESS_TOKEN_REQUIRED',
  AccessTokenInvalid = 'ACCESS_TOKEN_INVALID',
  AccessTokenExpired = 'ACCESS_TOKEN_EXPIRED',
  UserNotAuthorized = 'USER_NOT_AUTHORIZED',
}

export enum ErrorMessage {
  AccessTokenRequired = 'Access Token is not provided',
  AccessTokenInvalid = 'Access Token is invalid',
  AccessTokenExpired = 'Access Token is expired',
  UserNotAuthorized = 'User is not authorized to access the endpoint',
}
