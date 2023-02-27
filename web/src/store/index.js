import { createStore } from 'vuex';

import tasksModule from './modules/tasks';
import tagsModule from './modules/tags';
import configsModule from './modules/configs';

export default createStore({
  state: {
    services: {
      menu: 0,
      loading: false
    }
  },

  getters: {
  },

  mutations: {
  },

  actions: {
  },

  modules: {
    tasksModule,
    tagsModule,
    configsModule
  }
});
