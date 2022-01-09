import Vuex from 'vuex';
import Vue from 'vue';
import createLogger from 'vuex/dist/logger';
Vue.use(Vuex);

const debug = process.env.NODE_ENV == 'development';

import tabs from './modules/tabs';
import auth from './modules/auth';

export const store = new Vuex.Store({
  modules: {
    tabs,
    auth
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

export default {
  install(Vue) {
    Vue.prototype.$store = store;
  }
};
