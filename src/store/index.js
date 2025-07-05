import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    count: 0,
    users: [],
    currentUser: null
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
      state.currentUser = updatedUser;
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
    async fetchUsers({ commit }) {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      commit('setUsers', response.data);
    },
    async fetchUserById({ commit }, id) {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      commit('setCurrentUser', response.data);
    },
    async updateUser({ commit }, user) {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
      commit('updateUser', response.data);
    }
  },
  getters: {
    getCount: state => state.count,
    getUsers: state => state.users,
    getUserById: state => id => state.users.find(user => user.id === parseInt(id)) || state.currentUser
  }
});