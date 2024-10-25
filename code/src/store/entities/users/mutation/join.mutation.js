export default (state, user) => {
  state.user = user;
  state.startDate = new Date().toISOString()
}
