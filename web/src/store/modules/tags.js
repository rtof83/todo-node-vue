import api from '../api';

const tagsModule = {
  namespaced: true,

  state: {
    tags: []
  },

  getters: {
    tags: state => state.tags
  },

  mutations: {
    setTags: (state, tags) => state.tags = tags
  },

  actions: {
    async getTags({ commit }) {
      const { data } = await api.get('tags');    
      commit('setTags', data);
    },

    async updateTag({ dispatch }, tag) {
      await api.put(`tags/${tag.id}`, tag)
        .then(() => dispatch('getTags'))
        .catch(error => console.log(error));
    }
  }
}

export default tagsModule
