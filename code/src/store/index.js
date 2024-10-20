import { createStore } from 'vuex';
import HelloRepository from '../repositories/HelloRepository';
import UserRepository from '@/repositories/UserRepository';

const store = createStore({
  state: {
    user: null,
    helloMessage: '',
    messages: []
  },
  
  mutations: {
    join(state, user) {
        console.log("Join Mutation");
      state.user = user;
    },
    setHelloMessage(state, message) {
      state.helloMessage = message;
    },
    setUser(state, user) {
      state.user = user;
    },
    addMessage(state, message) {
      state.messages.push(message);
    }
  },

  actions: {
    async join({ commit }, {username}) {
        const user = await UserRepository.join({
            username
        });        
        commit('join', user);
    },
    login({ commit }, user) {
      commit('setUser', user);
    },
    sendMessage({ commit }, message) {
      commit('addMessage', message);
    },
    async fetchHello({ commit }) {
        const message = await HelloRepository.fetchHello();
        commit('setHelloMessage', message); 
    }
  },

  getters: {
    getUser: (state) => state.user,
    getMessages: (state) => state.messages,
    getHelloMessage(state) {
        return state.helloMessage;
    }
  }
});

export default store;
