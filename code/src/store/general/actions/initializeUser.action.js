export default ({ commit }) => {
  const storedUser = sessionStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    commit('setUser', user);
  }
};
