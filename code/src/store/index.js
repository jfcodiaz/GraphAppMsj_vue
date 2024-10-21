import { createStore } from 'vuex';
import HelloRepository from '../repositories/HelloRepository';
import UserRepository from '@/repositories/UserRepository';
import MessageRepository from '@/repositories/MessageRepository';

const store = createStore({
  state: {
    user: {
      id: "6714af8ea84730b964a92b4f",
      username: 'John Doe'
    },
    helloMessage: '',
    messages: [
      {
        id: 1,
        text: 'Hello World',
        idUser: 1
      },
      {
        id: 1,
        text: 'Hello World',
        idUser: 1
      },
      {
        id: 1,
        text: 'Hello World',
        idUser: 1
      }
    ]
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
    async sendMessage({ commit }, text) {
      const msj = await MessageRepository.sendMessage({
        userId: this.state.user.id, 
        text
      });
      commit('addMessage', msj);
    },
    async fetchHello({ commit }) {
        const message = await HelloRepository.fetchHello();
        commit('setHelloMessage', message); 
    }
  },

  getters: {
    messages: (state) => state.messages,
    getUser: (state) => state.user,
    getHelloMessage(state) {
        return state.helloMessage;
    }
  }
});

export default store;
