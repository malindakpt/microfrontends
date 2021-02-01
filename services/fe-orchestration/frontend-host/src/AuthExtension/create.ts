// import * as actions from './actions';
import { Extend } from 'piral-core';
import { User } from '@ax/core';
import { IdentityServiceClient, TokenResponseCode } from '@ax/id-link';

declare module 'piral-core/lib/types/custom' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PiletCustomApi extends AuthApi {}
}

export interface AuthApi {
  /**
   * Gets the currently authenticated user, if any.
   */
  getToken(): Promise<User | undefined>;
}

/**
 * Creates new Pilet API extensions for enabling authentication support.
 */
export function createAuthApi(client: IdentityServiceClient): Extend<AuthApi> {
  return () => {
    return {
      async getToken() {
        const response = await client.getToken();
        return response.code === TokenResponseCode.SUCCESS
          ? response.user
          : undefined;
      },
    };
  };
}
