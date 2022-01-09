/**
 * 异步设置缓存数据
 * @param {*} key 缓存中的key值
 * @param {*} value 缓存中的value值
 */
export function set(key, value) {
  return new Promise((resolve, reject) => {
    uni.setStorage({
      key,
      data: value,
      success: resolve,
      fail: reject
    });
  });
}

/**
 * 异步从缓存中读值
 * @param {*} key 缓存中的key值
 */
export function get(key) {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key,
      success: ({ data }) => {
        resolve(data);
      },
      fail: reject
    });
  });
}

export function remove(key) {
  return new Promise((resolve, reject) => {
    uni.removeStorage({
      key,
      success: resolve,
      fail: reject
    });
  });
}

export function clear() {
  return new Promise((resolve, reject) => {
    uni.clearStorage({
      success: resolve,
      fail: reject
    });
  });
}
