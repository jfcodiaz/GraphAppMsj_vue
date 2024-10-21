import { createStore } from 'vuex';
import UserRepository from '@/repositories/UserRepository';
import HelloRepository from '../repositories/HelloRepository';
import MessageRepository from '@/repositories/MessageRepository';

const store = createStore({
  state: {
    page: 1,
    limit: 10,
    startDate: new Date().toISOString(),
    user: {
      id: "6715373aa0274817ff381213",
      username: 'John Doe'
    },
    helloMessage: '',
    messages: []
  },
  mutations: {
    join(state, user) {
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
    },
    setMessages(state, messages) {
      const sortedMessages = [...messages.data].reverse();
      state.messages=[ ...sortedMessages, ...state.messages];
    }
  },
  actions: {
    async fetchMessages({ commit }) {
      const messages = await MessageRepository.fetchMessages({
        startDate: this.state.startDate,
        page: this.state.page, 
        limit: this.state.limit
      });
      commit('setMessages', messages);
    },
    async join({ commit }, {username}) {
        const user = await UserRepository.join({
            username
        });        
        commit('join', user);
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
