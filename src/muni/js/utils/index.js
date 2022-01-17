// 这个文件是个示例，你可以任意的修改或删除它们

import { curry } from 'lodash-es';

/**
 * 剪切指定长度的字符串，如果超出将在末尾添加省略号
 * @param str 原始字符串
 * @param len 长度
 */
export function cut(str, len) {
  if (str.length <= len) {
    return str;
  }
  return str.slice(0, len) + '...';
}

/**
 * 柯里化后的匹配函数
 * 柯里化指的是将多个参数的函数转换成一个新的函数
 * 即函数可以接收一个或多个参数，但是只有最后一个参数是函数时，才能接收函数
 * @param reg 正则表达式
 * @param str 要匹配的字符串
 * @example match(/\d+/g)('123abc') => ['123']
 */
export const match = curry(function (reg, str) {
  return str.match(reg);
});

/**
 * 这是一个获取简单uuid的函数，你可以使用uuidV4库代替它
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}



export function getPage() {
  const pages = getCurrentPages();
  if (pages.length <= 0) {
    return '';
  }
  return pages[pages.length - 1];
}

export function alert(content, showCancel) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '温馨提示',
      content,
      showCancel,
      success: ({ confirm }) => {
        confirm ? resolve('ok') : reject('cancel');
      },
      fail: () => {
        reject('fail');
      }
    });
  });
}

export function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

// 在fn函数执行前执行beforeFn
export const before = curry(function (fn, beforeFn) {
  return function () {
    const flag = beforeFn.apply(this, arguments); // 是否继续往下执行
    if (flag === false) {
      return;
    }
    return fn.apply(this, arguments);
  }
})

// 在fn函数执行后执行afterFn
export function after(fn, afterFn) {
  return function () {
    const result = fn.apply(this, arguments);
    afterFn.apply(this, arguments);
    return result;
  }
}


// 接受不定数量的参数，依次执行
export function compose(...fns) {
  return function (...args) {
    return fns.reduce((prev, curr) => {
      return curr(prev);
    }, args);
  }
}

export function objectToQuery(obj = {}) {
  return Object.keys(obj).map(key => {
    return `${key}=${obj[key]}`;
  }).join('&');
}

export function open(url, params = {}) {
  return new Promise((resolve, reject) => {
    if (!url.startsWith('/')) {
      url = `/${url}`;
    }
    uni.navigateTo({
      url: `${url}?${objectToQuery(params)}`,
      success: () => {
        return resolve();
      },
      fail: ({ errMsg }) => {
        if (errMsg.indexOf('not found') > -1) {
          return reject('该页面不存在，请检查pages.json的配置');
        }
        return reject();
      }
    })
  });
}