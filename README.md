# 快速启动

> 该项目基于 vue-cli 创建的 uniapp 项目并使用 uview2 组件库，以及使用 typescript 为**主要**开发语言，项目提供部分开箱即用的目录结构和助手函数，让您能最快速度启动项目。

# 适用于哪些人

uview2 总是因为各种原因安装不成功的，想要尝试使用 ts 开发的，**以 H5 为主要目标平台的**

# 使用方式

1. clone 源码

```shell
git clone https://github.com/orangepro11/uview2-quick-start
```

2. 安装依赖

如果你是使用 npm 的用户

```shell
npm install
```

如果你是使用 yarn 的用户

```shell
yarn
```

如果你是使用 pnpm 的用户

```shell
pnpm install
```

3. 启动项目

```shell
yarn serve
```

4. 把.git 文件夹删除，然后自己整一个

# 关于 TypeScript

你可能为你不熟悉 ts 而担心，但是没有关系，只要不开启严格模式（这已经是默认选项），就完全可以在 ts 文件里写 js 代码而不会引起任何报错，并可以使用 ts 提供的诱人特性。如果你想开启严格模式，需要自行去 tsconfig.json 里配置"strict":true

当然你也可以完全使用 js 开发，需要在 tsconfig.json 中设置"allowJs": true

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "allowJs": true,
    "checkJs": false, // 是否允许js
    "jsx": "preserve",
    "suppressImplicitAnyIndexErrors": true,
    "strict": false, // 是否开启严格模式
    "noImplicitAny": false,
    "noImplicitThis": false,
    "paths": {
      "@/*": ["./src/*"]
    },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

# HTTP 请求

在 src/http 下提供了基于 flyio 的简单 http 请求封装。

baseURL.ts

在这个文件里配置项目 api 的基础路径

```typescript
const url: string = 'https://example.com/api/';

export default url;
```

inedx.ts

```typescript
import { getUserToken, toLoginPage } from '@/helpers/hooks';
import fly from 'flyio';

import baseURL from './baseURL';
declare const uni: any;

fly.interceptors.request.use(request => {
  request['baseURL'] = baseURL;
  request.headers['Accept'] = 'application/json; text/plain; charset=utf-8';
  request.headers['Content-Type'] = 'application/json; charset=utf-8';
  const token = getUserToken(); // 这里获取你的token
  if (token) {
    request.headers['Authorization'] = token;
  }
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    const data = response.data;
    if (!data) {
      return Promise.reject('Internal Server Error');
    } else if (data.status != 1) {
      if (data.msg == '未授权') {
        toLoginPage();
      } else {
        return Promise.reject(data.msg);
      }
    }
    return data.data;
  },
  err => {
    console.log(err);
    } else {
      uni.showModal({
        title: '出错了',
        content: '网络请求异常：' + err.message
      });
    }
  }
);

export default fly;

// 方便以函数的形式调用get方法
export function get(url: string, query?: object): Promise<any> {
  return fly.get(url, query);
}

// 方便以函数的形式调用post方法
// 第三个参数是get参数
export function post(url: string, body: any, query?: any): Promise<any> {
  // convert query object to string and add to url
  if (query) {
    url +=
      '?' +
      Object.keys(query)
        .map(key => key + '=' + encodeURIComponent(query[key]))
        .join('&');
  }
  return fly.post(url, body);
}
```

这里着重解释一下 post 函数的第三个参数：在大多数情况下，你**不需要**传入这个参数，但是在某些场景下，可能部分参数是 get 传递部分参数是 post 传递，那么 get 参数部分就要放到第三个参数里。

## API 集中管理

在 src/api 下集中管理所有 api，而**不要直接在页面中写请求地址**，此为方便解耦合的做法。

```typescript
import { get, post } from '@/http';

export const getUser = () => get('/api/user');
```

你可以直接在页面中引入这个函数，但是更推荐的做法是**在模型层引入**

# 数据模型层

这是解耦合的第二部，把定义数据属性和获取数据的逻辑抽离出来单独管理。

比如定义用户的模型（即用户都有哪些属性）

```typescript
export interface User {
  id: number; // 数据库主键
  name: string; // 姓名/昵称
  username: string; // 用户名
  user_icon: string; // 头像
}
```

然后定义获取用户数据的方法

```typescript
// 标记返回类型为 User,方便代码提示
export async function user_get(): Promise<User> {
  return getUser();
}
```

也许你会觉得这个做法很繁琐，但是请相信我：这样的代码在后期更好维护，严格规定什么操作在哪做，页面只管展示和交互。而且**一般来说前端开发都比后端开发起步要快，大概率你是先写页面再对接口，如果都已经写完了还没有和后端约定返回字段的话，可以在这里做数据字段转换**

# 助手函数

在 src/helpers 下定义项目中用到的所有助手函数，这个目录可定制化的空间非常高，你可以按照你的喜好随意的更改他们。

## 总线

总线主要提供页面间通信的方式。

```typescript
import Vue from 'vue';

const eventMap: Map<string, object[]> = new Map();
const bus = new Vue({
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
      maxRunTimes: times ? (times === 'once' ? 1 : parseInt(times)) : NaN
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
      ((events[key] as unknown) as Array<IEventConfig>).forEach(handlerConfig => {
        const { handler, runTimes, maxRunTimes } = handlerConfig;
        const originalCb = typeof handler === 'string' ? methods![handler] : handler;
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
```

该方法既导出了 install 方法也导出了 bus 实例，使得你既可以通过 import 这个文件引用到它也可以通过 this.\$bus 访问到它。当然你也可以挂载到 uni 实例上。

使用方法一：通过 this.$bus.on监听事件，通过this.$bus.emit 触发事件，通过 this.$bus.off退订事件。
<br/>
使用方法二：在增加events配置项后，便可通过this.$Trigger 触发事件，如下示例。

```vue
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      name: '我是测试组件'
    };
  },
  events: {
    aa() {
      console.log('我是aa', this.name);
    },
    'bb:once'(a, b, c) {
      console.log('我是仅会执行1次的bb', a, b, c);
    },
    'cc:2'() {
      console.log('我是最多会执行2次的cc');
    },
    dd: 'fn'
  },
  methods: {
    fn() {
      console.log('我是dd事件触发的fn');
    }
  },
  created() {
    // events与$Trigger通常是跨组件层级的，这里为便于展示写在了同一组件内
    this.$Trigger('aa');
    this.$Trigger('bb', 1, 2, 3);
    this.$Trigger('bb', 1, 2, 3);
    this.$Trigger('cc');
    this.$Trigger('cc');
    this.$Trigger('cc');
    this.$Trigger('cc');
    this.$Trigger('dd');
  }
});
</script>
```

## 友好提示

在 src/helpers/toast 下提供了友好提示函数，原理是通过 Vue.extends 和 DOM 的 api 动态创建元素。

使用方式：this.$toast.success成功提示，this.$toast.error 错误提示，this.\$toast,loading 加载动画。

# 实用组件

在 src/components 下封装了若干实用(花里胡哨)组件，组件通过 easycom 引入，可在任何地方直接引用到。

## 礼花组件

该组件用于展示礼花特效。

```vue
<template>
  <i-firework ref="firework"></i-firework>
</template>

<script>
export default {
  mounted() {
    // 至少要在mounted生命周期之后才能可靠的获取到ref
    this.$refs.firework.show(); // 主动调用，显示礼花
  }
};
</script>
```

## loading 组件

该组件用于展示加载中特效，较 uni.showLoading 体验较好。

```vue
<template>
  <muni-loading ref="loading"></muni-loading>
</template>

<script>
export default {
  mounted() {
    // 至少要在mounted生命周期之后才能可靠的获取到ref
    this.$refs.loading.show(); // 主动调用，显示loading
    setTimeount(() => {
      this.$refs.loading.hide(); // 主动调用，关闭loading
    }, 3000);
  }
};
</script>
```

## 海报绘制组件

该组件用于满足一般场景下的海报绘制。

```vue
<template>
  <muni-poster ref="poster" :width="750" :height="750">
    <template v-slot="{ src }">
      <image :src="src" style="width: 750rpx;height: 750rpx;"></image>
    </template>
  </muni-poster>
</template>

<script>
export default {
    mounted() {
        let poster = this.$refs.poster;
        uni.showLoading({
            title: "渲染海报中"
        });
        const img = await poster
            .setBackgroundColor("#F4F4F4") //指定渲染图片的背景色
            .addRect(0, 0, 750, 198, "#FEFEFE") // 是个矩形
            .addImage(require("@/static/logo.jpg"), 32, 48, 98, 98, true) // 添加图片
            .addQRCode("http://www.baidu.com", 585, 22, 130, 130)
            .addText("百度一下，你就知道", 581, 159, 20, "#333333")
            .addImage(require("@/static/logo.jpg"), 19, 219, 707, 451) // 不要跨域
            .addRect(0, 690, 750, 158, "#FEFEFE")
            .draw();
            uni.hideLoading();
    }
}
</script>
```

# uni.\$m 对象

这个是对一些常用操作的全局封装，它们有的是 uni 原生 api 的二次封装，有的是脱胎于实际场景的方法。

## 类型检测 typeOf

这个是对内置的 typeof 关键字的增强，用来弥补无法准确判断 null，Date 等类型的不足，类型为**全小写**。

### 示例

```js
uni.$m.typeOf(new Date()); // date
```

### 可能的返回值

| 返回值           | 说明       |
| ---------------- | ---------- |
| number           | 数字类型   |
| string           | 字符串类型 |
| object           | 对象       |
| null             | 空         |
| undefined        | 尚未定义   |
| date             | 日期类型   |
| htmlcollection   | DOM 集合   |
| html[xxx]element | DOM 对象   |
| set              | 集合       |
| map              | 哈希表     |
| array            | 数组       |

> typeOf 几乎涵盖了所有可能的类型，推荐在所有需要进行类型判断的场景下优先使用它。

## 面向切面的程序设计

在 vm 下的\$m 里封装了一些暴露函数切面的方法，有 before，after 和 chain

### 前置执行函数 before

应用场景：用于在提交表单之前需要校验参数等场景

```vue
<template>
  <button @click="$m.before(onClick, beforeOnClick)(123)">点我</button>
</template>

<script>
export default {
  methods: {
    onClick(e) {
      console.log(e); // 123
      console.log('你点击了按钮');
    },
    beforeOnClick() {
      console.log('在你点击按钮之前触发');
      // return false; // 如果return false，则不会往下执行下面的函数
    }
  }
};
</script>
```

### 后置执行函数

场景：一般不会用到，如果你在执行函数 A 以后还要做一些收尾工作则可以考虑用。

```vue
<template>
  <button @click="$m.after(onClick, afterOnClick)(123)">点我</button>
</template>

<script>
export default {
  methods: {
    onClick(e) {
      console.log(e); // 123
      console.log('你点击了按钮');
    },
    afterOnClick() {
      console.log('在你点击按钮之后触发');
    }
  }
};
</script>
```

注意事项：以下写法不会执行：

```vue
<button @click="$m.after(onClick, afterOnClick)">点我</button> // 不会执行
```

一定要至少空执行：

```vue
<button @click="$m.after(onClick, afterOnClick)()">点我</button> // 会执行，但没有参数
```

如果需要接受参数:

```vue
<button @click="$m.after(onClick, afterOnClick)($event)">点我</button> // 会执行，也有参数。完美
```

> before 和 after 在某些情况下可以互换，只要你逻辑转的过来。

### 函数链接

这是面向切面编程的最终方案，可以让你专心于单一职责函数的实现，最后用它组合起来流程。

```vue
<template>
  <button @click="$m.chain(beforeOnClick, onClick, afterOnClick)(1)">点我</button>
</template>

<script>
export default {
  methods: {
    beforeOnClick(e) {
      console.log(e); // [1]，注意是个数组
      console.log('在你点击按钮之前触发');
      return e[0] + 1; // 传给下一个函数的参数
    },
    onClick(e) {
      console.log(e); // 这时候就不是数组了，上一个函数return什么就是什么
      console.log('你点击了按钮');
      return e + 1; // 传给下一个函数的参数
    },
    afterOnClick(e) {
      console.log(e); // 上一个函数return什么就是什么
      console.log('在你点击按钮之后触发');
    }
  }
};
</script>
```

注意事项：同上。

# 关于路由

在 muni/js/router/index 下封装了若干路由相关的方法。

# 全局样式

在 src/styles 下提供全局样式，包括变量，混入等等。

# 关于依赖

## flyio

[GitHub 地址](https://github.com/wendux/fly)

---

## momentjs

[官方文档](https://momentjs.com/)

---

## lodash-es

[中文文档 ](https://www.lodashjs.com/)

## uuid

[npm 仓库](https://www.npmjs.com/package/uuid)

# 关于 uview2 版本

该项目基于 uview2.0.19 非稳定版，后续会持续更新。
