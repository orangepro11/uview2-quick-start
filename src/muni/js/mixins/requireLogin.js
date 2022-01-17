let token = '';
let token_expired_at = '';

const checkIsLogin = async () => {
  token = await uni.$m.getStorage('token');
  token_expired_at = await uni.$m.getStorage('token_expired_at');

  if (!token || !token_expired_at || token_expired_at < new Date().getTime()) {
    return false;
  }

  return true;
};

export const setLoginInfo = async (token, expired_at) => {
  await uni.$m.setStorage('token', token);
  await uni.$m.setStorage('token_expired_at', expired_at);
};

export const clearLoginInfo = async () => {
  uni.$m.removeStorage('token');
  uni.$m.removeStorage('token_expired_at');
};

const isEmpty = obj => {
  return (obj && Object.keys(obj).length == 0) || !obj.hasOwnProperty('id') || obj['id'] == 0;
};

// token请在全局http拦截器中设置
const getUserInfo = async () => {
  return {
    id: 1,
    username: '不爱喝橙子汁'
  };
};

export default {
  data() {
    return {};
  },
  methods: {
    async $auth(token, expired_at) {
      if (token && expired_at) {
        await setLoginInfo(token, expired_at || new Date().getTime() + 1000 * 60 * 60 * 24);
      }
      return await checkIsLogin();
    },
    async getUserInfo() {
      if (await this.$auth()) {
        return await getUserInfo();
      } else {
        throw new Error('用户尚未登录，请跳到登录页让用户授权');
      }
    }
  }
};
