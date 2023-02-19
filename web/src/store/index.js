import { createStore } from 'vuex';
import api from './api';

export default createStore({
  state: {
    tags: [],
    tasks: [],
    menu: { curr: 0 },
    loading: { message: '' }
  },

  getters: {
    tasks: state => state.tasks,
    tags: state => state.tags
  },

  mutations: {
    setTasks: (state, tasks) => state.tasks = tasks,
    setTags: (state, tags) => state.tags = tags
  },

  actions: {
    async getTags({ commit }) {
      const response = await api.get('tags');    
      commit('setTags', response.data);
    },

    async getTasks({ commit, state }) {
      const { data } = await api.get(`tasks${!state.menu.curr ? '' : '?tag=' + state.menu.curr}`);
      commit('setTasks', data);
    },
    
    async addTask({ dispatch }, task) {
        await api.post('tasks', task)
        .then(() => dispatch('getTasks'))
        .catch(error => console.log(error));
    },

    async updateTask({ dispatch }, task) {
        await api.put(`tasks/${task.id}`, task)
          .then(() => dispatch('getTasks', task.currTag))
          .catch(error => console.log(error));
    },
    
    async deleteTask({ dispatch }, id) {
      await api.delete(`tasks/${id}`)
        .then(() => dispatch('getTasks'))
        .catch(error => console.log(error));
    }
  },

  modules: {
  }
})
