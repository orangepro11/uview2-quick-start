/**
 * 这里定义你获取token的逻辑，它可能来自于本地存储/vuex/服务器请求
 * @returns {string} token
 */
export function getUserToken():string {
  return uni.getStorageSync('token');
}

export function toLoginPage() {
  uni.reLaunch({
    url: '/pages/Login/Login'
  });
}