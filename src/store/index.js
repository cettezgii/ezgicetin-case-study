import { createStore } from 'vuex';

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    }
  },
  getters: {
    getCount: state => state.count
  }
});