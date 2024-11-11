import MessageRepository from '@/repositories/MessageRepository'

export default async ({ commit, state }) => {
  const messages = await MessageRepository.fetchMessages({
    startDate: state.startDate,
    page: state.page,
    limit: state.limit
  })

  commit('setMessages', messages)
}
