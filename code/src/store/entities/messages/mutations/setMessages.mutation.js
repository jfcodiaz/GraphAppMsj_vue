export default (state, messages) => {
  state.page++;
  const sortedMessages = [...messages.data].reverse();
  state.messages = [...sortedMessages, ...state.messages];
};
