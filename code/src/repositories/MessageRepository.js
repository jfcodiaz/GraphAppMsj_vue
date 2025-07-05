import { gql } from '@apollo/client/core';
import apolloClient from '../apolloClient';

export default {
  async sendMessage({ userId, text, images = [] }) {
    const NEW_MESSAGE = gql`
      mutation ($userId: String!, $text: String!, $images: [String!]) {
        message(userId: $userId, text: $text, images: $images) {
          id
        }
      }
    `;
    const response = await apolloClient.mutate({
      mutation: NEW_MESSAGE,
      variables: {
        userId,
        text,
        images,
      },
      fetchPolicy: 'network-only',
    });

    return response.data.message;
  },
  async fetchMessages({ startDate, page, limit }) {
    const GET_MESSAGES = gql`
      query ($startDate: String!, $page: Int!, $limit: Int!) {
        messages(startDate: $startDate, page: $page, limit: $limit) {
          data {
            id
            userId
            text
            images
            createdAt
            user {
              id
              username
            }
          }
          total
          totalPages
        }
      }
    `;
    const response = await apolloClient.query({
      query: GET_MESSAGES,
      variables: {
        startDate,
        page,
        limit,
      },
      fetchPolicy: 'network-only',
    });

    return response.data.messages;
  },
};
