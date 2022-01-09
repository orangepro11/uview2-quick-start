import * as types from './types';

export default {
  setUserInfo({ commit }, UserInfo: any) {
    commit(types.SET_USER_INFO, UserInfo);
  },
  clearUserInfo({commit}) {
    commit(types.CLEAR_USER_INFO);
  }
};
