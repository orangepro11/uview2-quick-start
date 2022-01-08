import * as storage from './storage';
import * as utils from './utils';
import * as file from './file';

const muni = {
  storage,
  utils,
  file
};

uni.$m = muni;

export default {
  install(Vue) {
    Vue.prototype.$m = muni;
  }
};
