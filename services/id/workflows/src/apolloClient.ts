import ApolloClient, { Operation } from 'apollo-boost';
import { PiletApi } from 'frontend-host';

export const initializeApolloClient = (
  getToken: PiletApi['getToken'],
): void => {
  client = new ApolloClient({
    uri: process.env.ACCESS_MANAGEMENT_ENDPOINT,

    request: async (operation: Operation) => {
      const token = await getToken();

      if (token) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token.token.accessToken}`,
          },
        });
      } else {
        // Logout?
      }
    },
  });
};

export let client: ApolloClient<object>;
