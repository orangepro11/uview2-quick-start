// 此为vue总线实例，你可以通过单独引入这个文件也可以在main.js中注册并通过Vue.prototype.$bus访问

import Vue from 'vue';
declare const uni: any;
const eventMap: Map<string, object[]> = new Map();
/**
 * 总线
 */
const bus = new Vue({
  /**
   * 迷你的vuex，全局共享
   * @returns
   */
  data() {
    return {
      
    };
  },
  methods: {
    /**
     * 往总线注册事件
     * @param event 要注册的事件名字
     * @param [params] 要携带的参数
     * @returns
     */
    emit(event: string, params?: object) {
      const existedEvent = eventMap.get(event);
      if (existedEvent && existedEvent.length > 0) {
        params && existedEvent.push(params);
        return;
      }
      eventMap.set(event, [params!]);
    },
    /**
     * 捕获总线上注册的事件
     * @param event
     * @param callback
     */
    on(event: string, callback: (result: any) => void) {
      const events = eventMap.get(event);
      if (events) {
        events.forEach(e => {
          callback(e);
        });
      }
    },
    off(event: string, callback?: (result: any) => void) {
      const events = eventMap.get(event);
      if (events && events.length > 0) {
        events.forEach(e => {
          callback && callback(e);
        });
        eventMap.delete(event);
      }
    },

  }
});

function install(Vue: any) {
  Vue.prototype.$bus = bus;
}

export { bus };

export default { install };
