import api from '../api';

const tasksModule = {
  namespaced: true,

  state: {
    tasks: []
  },

  getters: {
    tasks: state => state.tasks
  },

  mutations: {
    setTasks: (state, tasks) => state.tasks = tasks
  },

  actions: {
    async getTasks({ commit }, search) {
      this.state.services.loading = true;
  
      let page = 1;
      let taskName = '';
  
      if (search) {
        if (search.page) page = search.page;
        if (search.taskName) taskName = `&name=${search.taskName}`;
      };
        
      const { data } = await api.get(`tasks?page=${page}${taskName}${!this.state.services.menu ? '' : '&tag=' + this.state.services.menu}`);
      commit('setTasks', data);
  
      this.state.services.loading = false;
    },

    async addTask({ dispatch, state }, task) {
      await api.post('tasks', task)
        .then(() => {
          dispatch('getTasks', { page: state.tasks.at(-1).from })
        })
        .catch(error => console.log(error));
    },

    async updateTask({ dispatch, state }, task) {
      await api.put(`tasks/${task.id}`, task)
        .then(() => dispatch('getTasks', { page: state.tasks.at(-1).page }))
        .catch(error => console.log(error));
    },

    async deleteTask({ dispatch, state }, id) {
      await api.delete(`tasks/${id}`)
        .then(() => {
          const currPage = state.tasks.length > 2 ? state.tasks.at(-1).page : state.tasks.at(-2).page;
          dispatch('getTasks', { page: currPage });
        })
        .catch(error => console.log(error));
    }
  }
}

export default tasksModule
