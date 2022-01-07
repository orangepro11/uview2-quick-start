import * as types from './types';

export default {
	setTabIndex({ commit }, index:number) {
		commit(types.SET_TAB_INDEX, index);
	}
}