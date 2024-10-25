import HelloRepository from '../../repositories/HelloRepository';

export default async({ commit }) => {
  const message = await HelloRepository.fetchHello();

  commit('setHelloMessage', message); 
}