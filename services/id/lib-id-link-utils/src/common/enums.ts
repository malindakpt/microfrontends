export enum IdentityProvider {
  AX_AUTH,
  AZURE_AD,
  GOOGLE,
}

export enum TokenResponseCode {
  SUCCESS,
  NEEDS_LOGIN,
  ACCOUNT_NOT_ACTIVE,
  ERROR,
}

export enum LogoutResponseCode {
  SUCCESS,
  ERROR,
}

export enum ConfigStatusResponseCode {
  SUCCESS,
  MISCONFIGURATION,
  ERROR,
}
