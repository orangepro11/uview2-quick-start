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
    return {};
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
    }
  }
});

interface IEventConfig {
  // 回调，若是字符串从methods中取
  handler: Function | string;
  // 已经运行的次数
  runTimes: number;
  // 最大运行次数
  maxRunTimes: number;
}

const registerTrigger = (Vue: any) => {
  /** 自定义events的合并规则 **/
  // @ts-ignore
  Vue.config.optionMergeStrategies.events = function(parent, child) {
    const events = Object.assign({}, parent);
    for (const key in child) {
      const [name, times] = key.split(':');
      if (!events[name]) {
        events[name] = [];
      }
      events[name].push({
        handler: child[key],
        runTimes: 0,
        maxRunTimes: times ? (times === 'once' ? 1 : parseInt(times)) : NaN
      });
    }
    return events;
  };

  Vue.mixin({
    created() {
      const { events, methods } = this.$options;

      /** 若不存在events则不需要进行事件的注册操作 **/
      if (!events || !Object.keys(events).length) {
        return;
      }

      /** 暂存当前组件的events，便于组件销毁时解绑 **/
      this.$eventbus = {};

      for (const key in events) {
        this.$eventbus[key] = args => {
          events[key].forEach((handlerConfig: IEventConfig) => {
            const { handler, runTimes, maxRunTimes } = handlerConfig;
            const originalCb = typeof handler === 'string' ? methods[handler] : handler;
            let cb = originalCb;

            // 若限制了事件的最大执行次数
            if (!isNaN(maxRunTimes)) {
              cb = function(...args) {
                if (runTimes < maxRunTimes) {
                  handlerConfig.runTimes++;
                  originalCb.call(this, ...args);
                }
              };
            }

            cb.call(this, ...args);
          });
        };
        bus.$on(key, this.$eventbus[key]);
      }
    },
    beforeDestroy() {
      if (this.$eventbus) {
        // 解绑当前组件注册的事件
        for (const key in this.$eventbus) {
          bus.$off(key, this.$eventbus[key]);
        }
      }
    }
  });
  // @ts-ignore
  Vue.prototype.$Trigger = (key: string, ...args: any[]) => {
    bus.$emit(key, args);
  };
};

function install(Vue: any) {
  // @ts-ignore
  Vue.prototype.$bus = bus;
  registerTrigger(Vue);
}

export { bus };

export default { install };
