import { gql } from '@apollo/client/core';
import apolloClient from '../apolloClient';

export default {
  async sendMessage({userId, text}) {
    const NEW_MESSAGE = gql`
      mutation(
        $userId: String!
        $text: String!
      ) {
        message(userId: $userId, text: $text) {
          id
          userId
          text
        }
      }
    `;
    const response = await apolloClient.mutate({
        mutation: NEW_MESSAGE,
        variables: { 
            userId,
            text
        },
        fetchPolicy: 'network-only' 
    });

    return response.data.message;
  }
};
