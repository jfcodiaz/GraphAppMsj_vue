import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client/core';

const httpLink = new HttpLink({
  uri: 'http://localhost:8035/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:8035/graphql',
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: splitLink, 
  cache: new InMemoryCache()
});

export default apolloClient;
