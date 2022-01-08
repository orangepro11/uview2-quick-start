import * as storage from './storage';
import * as utils from './utils';
import * as file from './file';
import * as wechat from './wechat';

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
  }
};

uni.$m = muni;

export default {
  install(Vue) {
    Vue.prototype.$m = muni;
  }
};
