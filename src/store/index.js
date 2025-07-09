// src/store/index.js

import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    users: [],
    currentUser: null,
  },

  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    updateUserInList(state, updatedUser) {
      const index = state.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) state.users[index] = updatedUser;
      state.currentUser = updatedUser;
    },
    addUserToList(state, newUser) {
      state.users.push(newUser);
    },
  },

  actions: {
    async fetchUsers({ commit }) {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        commit("setUsers", data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    },

    async fetchUserById({ commit }, id) {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        commit("setCurrentUser", data);
      } catch (err) {
        console.error(`Failed to fetch user with ID ${id}:`, err);
      }
    },

    async updateUser({ commit }, user) {
      try {
        const { data } = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          user
        );
        commit("updateUserInList", data);
      } catch (err) {
        console.error("Failed to update user:", err);
      }
    },

    async addUser({ commit }, user) {
      try {
        const { data } = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          user
        );
        commit("addUserToList", data);
      } catch (err) {
        console.error("Failed to add new user:", err);
      }
    },
  },

  getters: {
    getUsers: (state) => state.users,
    getUserById: (state) => (id) =>
      state.users.find((u) => u.id === parseInt(id)) || state.currentUser,
  },
});
