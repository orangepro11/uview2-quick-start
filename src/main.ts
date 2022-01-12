import Vue from 'vue';
import App from './App.vue';
import uView from '@/uview-ui';
Vue.use(uView);

import muni from '@/js_sdk/muni';
Vue.use(muni);

Vue.config.productionTip = false;

import store from './store';
Vue.use(store);
// 挂载总线实例
// 通过this.$bus访问
import Bus from '@/helpers/bus';
Vue.use(Bus);

// 挂载toast友好提示实例
// 通过this.$toast.success('成功')/error('错误')/loading('加载中')来调用
// 仅支持H5平台
// #ifdef H5
import Toast from '@/helpers/toast';
Vue.use(Toast);
// #endif

// 挂载模态警告框实例
// 通过this.$alert()来调用
import alert from '@/helpers/alert';
Vue.use(alert);

new App().$mount();
