import { ApolloClient, InMemoryCache } from '@apollo/client/core';


const apolloClient = new ApolloClient({
  uri: 'http://localhost:8035/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;
