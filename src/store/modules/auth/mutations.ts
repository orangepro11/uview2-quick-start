import * as types from './types';

export default {
  [types.SET_USER_INFO](state, UserInfo) {
    state.UserInfo = UserInfo;
  },
  [types.CLEAR_USER_INFO](state) {
    state.UserInfo = undefined;
  }
};
