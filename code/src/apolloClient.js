import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client/core';

// Obtener el host actual y construir las URLs dinámicamente
const host = window.location.hostname;
const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
const wsProtocol = protocol === 'https' ? 'wss' : 'ws';

// Obtener los puertos desde variables de entorno
const httpPort = process.env.VUE_APP_GQL_HTTP_PORT || 8035; // Puerto predeterminado 8035 si no se define
const wsPort = process.env.VUE_APP_GQL_WS_PORT || 8035; // Puerto predeterminado 8035 si no se define

// Construir las URLs dinámicamente
const httpLink = new HttpLink({
  uri: `${protocol}://${host}:${httpPort}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${wsProtocol}://${host}:${wsPort}/graphql`,
  })
);

// Separar los enlaces de HTTP y WebSocket en función del tipo de operación
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

// Crear el cliente de Apollo
const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
