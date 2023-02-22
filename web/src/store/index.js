import { createStore } from 'vuex';
import api from './api';

export default createStore({
  state: {
    tags: [],
    tasks: [],
    configs: [],
    services: {
      menu: 0,
      loading: false
    }
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

    async getTasks({ commit, state }, search) {
      state.services.loading = true;

      let page = 1;
      let taskName = '';

      if (search) {
        if (search.page) page = search.page;
        if (search.taskName) taskName = `&name=${search.taskName}`;
      };
      
      const { data } = await api.get(`tasks?page=${page}${taskName}${!state.services.menu ? '' : '&tag=' + state.services.menu}`);
      commit('setTasks', data);

      state.services.loading = false;
    },
    // ======================================
    

    // ================ POST ================
    async addTask({ dispatch, state }, task) {
      await api.post('tasks', task)
        .then(() => {
          dispatch('getTasks', { page: state.tasks.at(-1).from })
        })
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
    async updateTask({ dispatch, state }, task) {
      await api.put(`tasks/${task.id}`, task)
        .then(() => dispatch('getTasks', { page: state.tasks.at(-1).page }))
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
    async deleteTask({ dispatch, state }, id) {
      await api.delete(`tasks/${id}`)
        .then(() => {
          const currPage = state.tasks.length > 2 ? state.tasks.at(-1).page : state.tasks.at(-2).page;
          dispatch('getTasks', { page: currPage });
        })
        .catch(error => console.log(error));
    }
    // ====================================
  },

  modules: {
  }
})
