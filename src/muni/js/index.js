import * as storage from './storage';
import * as utils from './utils';
import * as file from './file';
import * as wechat from './wechat';
import mixins from './mixins';

// 深度合并若干对象
const deepMergeObjects = (...objs) => {
  const result = {};
  objs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        result[key] = deepMergeObjects(result[key], obj[key]);
      } else {
        result[key] = obj[key];
      }
    });
  });
  return result;
}

function pay(payload) {
  const { platform } = uni.$u;
  if (platform === 'weixin') {
    return wechat.MiniProgramPay(payload);
  }
  if (platform === 'h5') {
    return wechat.H5Pay(payload);
  }
}

const muni = deepMergeObjects(
  storage,
  file,
  pay,
  utils
);

// 挂载到uni上
uni.$m = muni;

export default {
  install(Vue) {
    Vue.mixin(mixins);
    // Vue.prototype.$m = muni; // 不挂载防止出现性能问题
  }
};
