import * as storage from './storage';
import * as utils from './utils';
import * as file from './file';
import * as wechat from './wechat';

import mixins from './mixins';

const muni = {
  storage,
  utils,
  file,
  pay(payload) {
    const { platform } = uni.$u;
    if (platform === 'weixin') {
      return wechat.MiniProgramPay(payload);
    }
    if (platform === 'h5') {
      return wechat.H5Pay(payload);
    }
  },
  page: utils.page,
  alert: utils.alert,
};

uni.$m = muni;

export default {
  install(Vue) {
    Vue.mixin(mixins);
    Vue.prototype.$m = muni;
  }
};
