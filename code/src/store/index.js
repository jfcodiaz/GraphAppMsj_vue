import { createStore } from 'vuex';
import UserRepository from '@/repositories/UserRepository';
import HelloRepository from '../repositories/HelloRepository';
import MessageRepository from '@/repositories/MessageRepository';

const store = createStore({
  state: {
    page: 1,
    limit: 50,
    startDate: new Date().toISOString(),
    user: null,
    helloMessage: '',
    messages: []
  },
  mutations: {
    join(state, user) {
      state.user = user;
      state.startDate = new Date().toISOString()
    },
    setHelloMessage(state, message) {
      state.helloMessage = message;
    },
    setUser(state, user) {
      state.user = user;
    },
    setMessages(state, messages) {
      state.page++;
      const sortedMessages = [...messages.data].reverse();
      state.messages = [ ...sortedMessages, ...state.messages];
    },
    clean(state) {
      state.page = 1;
      state.startDate = null;
      state.user = null;
      state.messages = [];
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
    async join({ commit }, { username }) {
      const user = await UserRepository.join({ username });
      commit('join', user);
      sessionStorage.setItem('user', JSON.stringify(user));
    },
    async clean({ commit } ) {
      commit('clean');
      sessionStorage.removeItem('user');
    },
    async sendMessage(_, text) {
      await MessageRepository.sendMessage({
        userId: this.state.user.id, 
        text
      });
    },
    async fetchHello({ commit }) {
      const message = await HelloRepository.fetchHello();
      commit('setHelloMessage', message); 
    },
    initializeUser({ commit }) {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        commit('setUser', user);
      }
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

store.dispatch('initializeUser');

export default store;
