import Vuex from 'vuex';
import Vue from 'vue';
// #ifdef H5
import createLogger from 'vuex/dist/logger';
// #endif
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
  // #ifdef H5
  plugins: debug ? [createLogger()] : []
  // #endif
});

export default {
  install(Vue) {
    Vue.prototype.$store = store;
  }
};
