import { gql } from '@apollo/client/core';
import apolloClient from '../apolloClient';

export default {
  async fetchHello() {
    const GET_HELLO = gql`
      query {
        hello
      }
    `;
    const response = await apolloClient.query({ query: GET_HELLO, fetchPolicy: 'network-only' });
    return response.data.hello;
  }
};
