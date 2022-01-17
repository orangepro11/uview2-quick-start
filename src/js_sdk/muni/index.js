import * as storage from './storage';
import * as utils from './utils';
import * as file from './file';
import * as wechat from './wechat';
import * as jss from './jss';
import router from './router';
import mixins from './mixins';

function pay(payload) {
  const { platform } = uni.$u;
  if (platform === 'weixin') {
    return wechat.MiniProgramPay(payload);
  }
  if (platform === 'h5') {
    return wechat.H5Pay(payload);
  }
}

const muni = uni.$u.deepMerge(
  {
    storage,
    file,
    pay,
    jss,
    router
  },
  utils
);

uni.$m = muni;

export default {
  install(Vue) {
    Vue.mixin(mixins);
    // Vue.prototype.$m = muni; // 不挂载防止出现性能问题
  }
};
