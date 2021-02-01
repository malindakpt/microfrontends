import { createIdentityServiceClient } from '@ax/id-link';
import { TokenResponse, TokenResponseCode } from '@ax/id-link';
import ApolloClient from 'apollo-boost';

import { identityServiceConfig } from '../id-service.config';

const idServiceClient = createIdentityServiceClient(identityServiceConfig);
let tokenResponse: TokenResponse | null;

export const apolloClient: ApolloClient<{}> = new ApolloClient({
  uri: `${process.env.REACT_APP_ACCESS_MANAGEMENT_ENDPOINT}`,

  request: async operation => {
    if (!tokenResponse || tokenResponse.code !== TokenResponseCode.SUCCESS) {
      tokenResponse = await idServiceClient.getToken();

      if (
        tokenResponse.code === TokenResponseCode.SUCCESS &&
        tokenResponse.user
      ) {
        setTimeout(() => {
          tokenResponse = null;
        }, (tokenResponse.user.token.expiresIn - 60) * 1000); // 1 minute before expiration
      }
    }

    if (
      tokenResponse.code === TokenResponseCode.SUCCESS &&
      tokenResponse.user
    ) {
      const token = `Bearer ${tokenResponse.user.token.accessToken}`;
      operation.setContext({
        headers: {
          Authorization: token,
        },
      });
    }
  },
});
