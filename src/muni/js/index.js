import * as storage from './storage';
import * as utils from './utils';
import * as file from './file';
import * as wechat from './wechat';
import * as jss from './jss';
import router from './router';
import mixins from './mixins';

// 深度合并若干对象
const deepMergeObjects = (...objs) => {
  const result = {};
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
          result[key] = deepMergeObjects(result[key], obj[key]);
        } else {
          result[key] = obj[key];
        }
      });
    }
  });
  return result;
};

function pay(payload) {
  const { platform } = uni.$u;
  if (platform === 'weixin') {
    return wechat.MiniProgramPay(payload);
  }
  if (platform === 'h5') {
    return wechat.H5Pay(payload);
  }
}

const muni = deepMergeObjects(storage, file, utils, { router }, { pay });

// 挂载到uni上
uni.$m = muni;

console.log(uni.$m);

export default {
  install(Vue) {
    Vue.mixin(mixins);
    // #ifdef H5
    Vue.prototype.$m = muni; // 仅在H5平台挂载，
    // #endif
  }
};
