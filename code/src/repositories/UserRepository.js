import { gql } from '@apollo/client/core';
import apolloClient from '../apolloClient';

export default {
  async join({ username }) {
    const USER_JOIN = gql`
      mutation ($username: String!) {
        join(username: $username) {
          id
          username
        }
      }
    `;
    const response = await apolloClient.mutate({
      mutation: USER_JOIN,
      variables: { username },
      fetchPolicy: 'network-only',
    });
    const data = response.data.join;
    return {
      id: data.id,
      username: data.username,
    };
  },
};
