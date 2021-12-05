import IToast from './toast.vue';
import Vue from 'vue';

function createToast(options?: any) {
  const Toast = Vue.extend(IToast);
  const instance = new Toast({
    el: document.createElement('div'),
    data: options
  });
  document.body.appendChild(instance.$el);
  return instance;
}

export function toast() {
  return createToast();
}

function install() {
  Vue.prototype.$toast = toast();
}

export default install;
