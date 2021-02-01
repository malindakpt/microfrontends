import ApolloClient from 'apollo-boost';
import { getCookie } from '../util/helper';

export const apolloClient = () => {
  const token = getCookie('token');
  return new ApolloClient({
    uri: process.env.REACT_APP_APPLICATION_ADMINISTRATION_ENDPOINT,
    headers: token
      ? {
          authorization: 'Bearer ' + token,
        }
      : undefined,
  });
};
