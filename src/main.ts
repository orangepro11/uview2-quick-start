import Vue from 'vue';
import App from './App.vue';
import uView from 'uview-ui';
Vue.use(uView);
Vue.config.productionTip = false;

import ErpBus from '@/helpers/erp/bus';
Vue.use(ErpBus);

import Toast from '@/helpers/erp/toast';
Vue.use(Toast);

import alert from '@/helpers/erp/alert';
Vue.use(alert);

new App().$mount();
