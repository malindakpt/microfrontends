import { IdentityProvider } from '../../../generated/graphql.types';

// DTO Class defined here since UserToken is not exposed to PostGraphile, and therefore won't exist in graphql.types
export class UserToken {
  id: string;
  userId: string;
  idpId: IdentityProvider;
  idpSubjectId: string;
  idpAccessToken: string;
  idpRefreshToken: string;
  idpAccessTokenExpiresAt: Date;
  axinomIamToken: string;
  expiresAt: Date;
  tenantId: string;
  applicationId: string;
  createdAt: Date;
  updatedAt: Date;
}
