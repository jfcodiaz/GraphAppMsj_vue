import { createStore } from 'vuex';
import mutations  from './importAllMutations';
import actions from './importAllActions';
console.log(mutations, actions)
const store = createStore({
  state: {
    page: 1,
    limit: 50,
    startDate: new Date().toISOString(),
    user: null,
    helloMessage: '',
    messages: []
  },
  mutations,
  actions,
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
