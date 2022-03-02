import * as storage from './storage';
import * as utils from './utils';
import { WxPay } from './wechat';
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

const muni = deepMergeObjects(storage, utils, { router }, { WxPay }, { callPrevMethod: router.callPrevMethod });

// 挂载到uni上
uni.$m = muni;

export default {
  install(Vue) {
    Vue.mixin(mixins);
  }
};
