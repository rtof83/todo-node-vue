import api from '../api';

const configsModule = {
  namespaced: true,

  state: {
    configs: []
  },

  getters: {
    configs: state => state.configs
  },

  mutations: {
    setConfigs: (state, configs) => state.configs = configs
  },

  actions: {
    async getConfigs({ commit }) {
      const { data } = await api.get('configs');    
      commit('setConfigs', data);
    },

    async resetConfigs({ dispatch }) {
      await api.post('configs/reset')
        .then(async () => {
          this.dispatch('tagsModule/getTags');
          dispatch('getConfigs');
        })
        .catch(error => console.log(error));
    },

    async updateConfig({ dispatch }, config) {
      await api.put(`configs/${config.id}`, config)
        .then(() => dispatch('getConfigs'))
        .catch(error => console.log(error));
    }
  }
}

export default configsModule
