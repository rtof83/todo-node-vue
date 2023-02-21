import { createStore } from 'vuex';
import api from './api';

export default createStore({
  state: {
    tags: [],
    tasks: [],
    configs: [],
    menu: { curr: 0 },
    loading: { message: '' }
  },

  getters: {
    tasks: state => state.tasks,
    tags: state => state.tags,
    configs: state => state.configs
  },

  mutations: {
    setTasks: (state, tasks) => state.tasks = tasks,
    setTags: (state, tags) => state.tags = tags,
    setConfigs: (state, configs) => state.configs = configs
  },

  actions: {
    // ================= GET =================
    async getTags({ commit }) {
      const { data } = await api.get('tags');    
      commit('setTags', data);
    },

    async getConfigs({ commit }) {
      const { data } = await api.get('configs');    
      commit('setConfigs', data);
    },

    async getTasks({ commit, state }) {
      const { data } = await api.get(`tasks${!state.menu.curr ? '' : '?tag=' + state.menu.curr}`);
      if (!data.length) state.loading.message = 'Nenhum registro encontrado'
      commit('setTasks', data);
    },
    // ======================================
    

    // ================ POST ================
    async addTask({ dispatch }, task) {
        await api.post('tasks', task)
        .then(() => dispatch('getTasks'))
        .catch(error => console.log(error));
    },

    async resetConfigs({ dispatch }) {
      await api.post('configs/reset')
        .then(async () => {
          dispatch('getTags');
          dispatch('getConfigs');
        })
        .catch(error => console.log(error));
    },
    // ======================================


    // ================ PUT ================
    async updateTask({ dispatch }, task) {
        await api.put(`tasks/${task.id}`, task)
          .then(() => dispatch('getTasks', task.currTag))
          .catch(error => console.log(error));
    },

    async updateTag({ dispatch }, tag) {
      await api.put(`tags/${tag.id}`, tag)
        .then(() => dispatch('getTags'))
        .catch(error => console.log(error));
    },

    async updateConfig({ dispatch }, config) {
      await api.put(`configs/${config.id}`, config)
        .then(() => dispatch('getConfigs'))
        .catch(error => console.log(error));
    },
    // =====================================


    // ============== DELETE ==============
    async deleteTask({ dispatch }, id) {
      await api.delete(`tasks/${id}`)
        .then(() => dispatch('getTasks'))
        .catch(error => console.log(error));
    }
    // ====================================
  },

  modules: {
  }
})
