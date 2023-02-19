import { createStore } from 'vuex';
import api from './api';

export default createStore({
  state: {
    tags: [],
    tasks: [],
    // listMenu: [],
    loading: { message: '' }
  },

  getters: {
    tags: (state) => { return state.tags },
    tasks: (state) => { return state.tasks }
  },

  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags;
    },

    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    }
  },

  actions: {
    async getTags({ commit }) {
      await api.get('tags')
        .then(({ data }) => {
          commit('SET_TAGS', data);
        })
        .catch(error => {
          console.log(error)
        })
    },

    async getTasks({ commit }, query) {
      if (!query) query = '';

      await api.get(`tasks${query}`)
        .then(({ data }) => {
          commit('SET_TASKS', data);

          if (!data.length)
            this.loading.message = 'Nenhum registro encontrado'
        })
        .catch(error => this.loading = error.message);
    }
  },

  modules: {
  }
})
