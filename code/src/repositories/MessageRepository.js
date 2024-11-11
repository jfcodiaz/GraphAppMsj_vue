import { gql } from '@apollo/client/core'
import apolloClient from '../apolloClient'

export default {
  async sendMessage ({ userId, text }) {
    const NEW_MESSAGE = gql`
      mutation(
        $userId: String!
        $text: String!
      ) {
        message(userId: $userId, text: $text) {
          id
        }
      }
    `
    const response = await apolloClient.mutate({
      mutation: NEW_MESSAGE,
      variables: {
        userId,
        text
      },
      fetchPolicy: 'network-only'
    })

    return response.data.message
  },
  async fetchMessages ({ startDate, page, limit }) {
    const GET_MESSAGES = gql`
      query(
        $startDate: String!
        $page: Int!
        $limit: Int!
      ) {
        messages(startDate: $startDate, page: $page, limit: $limit) {
          data {
            id
            userId
            text
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
    `
    const response = await apolloClient.query({
      query: GET_MESSAGES,
      variables: {
        startDate,
        page,
        limit
      },
      fetchPolicy: 'network-only'
    })

    return response.data.messages
  }
}
