export default async ({ commit } ) => {
  commit('clean');

  sessionStorage.removeItem('user');
};