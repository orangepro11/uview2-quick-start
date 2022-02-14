/**
 * 此为vue总线实例，你可以通过单独引入这个文件也可以在main.ts中注册并通过Vue.prototype.$bus访问
 */

import Vue from 'vue';

const eventMap: Map<string, any[]> = new Map();
const bus = new Vue({
  methods: {
    /**
     * 往总线注册事件
     * @param event 要注册的事件名字
     * @param [params] 要携带的参数
     * @returns
     */
    emit(event: string, params?: any) {
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
        events.forEach((e) => {
          callback(e);
        });
      }
    },
    off(event: string, callback?: (result: any) => void) {
      const events = eventMap.get(event);
      if (events && events.length > 0) {
        events.forEach((e) => {
          callback && callback(e);
        });
        eventMap.delete(event);
      }
    },
  },
});

type IEvents = NonNullable<Vue['$options']['events']>;

interface IEventConfig {
  // 回调，若是字符串从methods中取
  handler: IEvents[string];
  // 已经运行的次数
  runTimes: number;
  // 最大运行次数
  maxRunTimes: number;
}

type IParent = Record<string, Array<IEventConfig>>;

const defineEventsMergeStrategies = (parent?: IParent, child?: IEvents) => {
  const events = Object.assign({}, parent);
  for (const key in child) {
    const [name, times] = key.split(':');
    if (!events[name]) {
      events[name] = [];
    }
    events[name].push({
      handler: child[key],
      runTimes: 0,
      maxRunTimes: times ? (times === 'once' ? 1 : parseInt(times)) : NaN,
    });
  }
  return events;
};

function created(this: InstanceType<typeof Vue>) {
  const { events, methods } = this.$options;

  /** 若不存在events则不需要进行事件的注册操作 **/
  if (!events || !Object.keys(events).length) {
    return;
  }

  /** 暂存当前组件的events，便于组件销毁时自动解绑 **/
  this.$eventbus = {};

  for (const key in events) {
    this.$eventbus[key] = (args: any[]) => {
      (events[key] as unknown as Array<IEventConfig>).forEach((handlerConfig) => {
        const { handler, runTimes, maxRunTimes } = handlerConfig;
        const originalCb = typeof handler === 'string' ? methods![handler] : handler;
        let cb = originalCb;

        // 若限制了事件的最大执行次数
        if (!isNaN(maxRunTimes)) {
          cb = function (...args) {
            if (runTimes < maxRunTimes) {
              handlerConfig.runTimes++;
              originalCb.call(this, ...args);
            }
          };
        }

        cb.call(this, ...args);
      });
    };
    this.$bus.$on(key, this.$eventbus[key]);
  }
}

function beforeDestroy(this: InstanceType<typeof Vue>) {
  if (this.$eventbus) {
    // 解绑当前组件注册的事件
    for (const key in this.$eventbus) {
      this.$bus.$off(key, this.$eventbus[key]);
    }
  }
}

function $Trigger(this: InstanceType<typeof Vue>, key: string, ...args: any[]) {
  this.$bus.$emit(key, args);
}

function install<T extends typeof Vue>(Vue: T) {
  Vue.config.optionMergeStrategies.events = defineEventsMergeStrategies;
  Vue.prototype.$bus = bus;
  /** Why not used '$trigger'? Because the key word of '$trigger' has been occupy in 'v-uni-view' componet. **/
  Vue.prototype.$Trigger = $Trigger;
  Vue.mixin({ created, beforeDestroy });
}

export { install as default, bus };
