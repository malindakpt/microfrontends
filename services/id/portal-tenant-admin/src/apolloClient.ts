import ApolloClient from "apollo-boost";

export const apolloClient = (token: string) =>
  new ApolloClient({
    uri: process.env.REACT_APP_TENANT_ADMINISTRATION_ENDPOINT,
    headers: token
      ? {
          authorization: "Bearer " + token
        }
      : undefined
  });
