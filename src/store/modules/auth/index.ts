import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true, //增加命名空间
  state,
  getters,
  mutations,
  actions
};
