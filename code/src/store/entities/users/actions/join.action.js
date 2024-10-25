import UserRepository from '@/repositories/UserRepository';

export default async ({ commit }, { username }) => {
  const user = await UserRepository.join({ username });
  commit('join', user);
  sessionStorage.setItem('user', JSON.stringify(user));
}