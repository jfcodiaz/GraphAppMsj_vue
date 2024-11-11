import { createStore } from 'vuex';
import state from './importAllStates';
import actions from './importAllActions';
import getters from './importAllGetters';
import mutations from './importAllMutations';

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

store.dispatch('initializeUser');

export default store;
