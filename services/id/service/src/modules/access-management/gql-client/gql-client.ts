import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import fetch from 'cross-fetch';

import { config, Logger } from '../../../common';
import {
  GetServiceTokenDocument,
  GetServiceTokenMutation,
  GetServiceTokenMutationVariables,
} from '../../../generated/graphql.types';

const logger = new Logger('gql-client');

let serviceAccountAccessToken = null;

export const gqlClientAnonymous = (
  endpoint: string,
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: ApolloLink.from([
      new HttpLink({
        uri: endpoint,
        fetch,
      }),
    ]),
    cache: new InMemoryCache(),
  });
};

export const gqlClient = (
  authEndpoint: string,
): ApolloClient<NormalizedCacheObject> => {
  const authTokenLink = setContext(async (_, { headers }) => {
    if (!serviceAccountAccessToken) {
      const client = gqlClientAnonymous(
        `http://localhost:${config.accessManagementPort}/graphql`,
      );

      const result = await client.mutate<
        GetServiceTokenMutation,
        GetServiceTokenMutationVariables
      >({
        mutation: GetServiceTokenDocument,
        variables: {
          clientId: config.managedServiceClientId,
          clientSecret: config.managedServiceClientSecret,
        },
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      });

      if (!result.errors) {
        const tokenResponse = result.data.authenticateManagedServiceAccount;
        serviceAccountAccessToken = tokenResponse.accessToken;

        // Token auto-renewal trigger - 1 minute before expiry
        setTimeout(() => {
          serviceAccountAccessToken = null;
        }, (tokenResponse.expiresIn - 60) * 1000);
      } else {
        logger.error(result.errors);
      }
    }

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${serviceAccountAccessToken}`,
      },
    };
  });

  return new ApolloClient({
    link: ApolloLink.from([
      authTokenLink,
      new HttpLink({
        uri: authEndpoint,
        fetch,
      }),
    ]),
    cache: new InMemoryCache(),
  });
};
