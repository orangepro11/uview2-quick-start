# 快速启动



> 该项目基于vue-cli创建的uniapp项目并使用uview2组件库，以及使用typescript为**主要**开发语言，项目提供部分开箱即用的目录结构和助手函数，让您能最快速度启动项目。



# 适用于哪些人

uview2总是因为各种原因安装不成功的，想要尝试使用ts开发的，**以H5为主要目标平台的**



# 使用方式

1. clone源码

```shell
git clone https://github.com/orangepro11/uview2-quick-start
```

2. 安装依赖

如果你是使用npm的用户

```shell
npm install
```

如果你是使用yarn的用户

```shell
yarn
```

如果你是使用pnpm的用户

```shell
pnpm install
```

3. 启动项目

```shell
yarn serve
```

4. 把.git文件夹删除，然后自己整一个



# 关于TypeScript

你可能为你不熟悉ts而担心，但是没有关系，只要不开启严格模式（这已经是默认选项），就完全可以在ts文件里写js代码而不会引起任何报错，并可以使用ts提供的诱人特性。如果你想开启严格模式，需要自行去tsconfig.json里配置"strict":true

当然你也可以完全使用js开发，需要在tsconfig.json中设置"allowJs": true
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



# HTTP请求

在src/http下提供了基于flyio的简单http请求封装。



baseURL.ts

在这个文件里配置项目api的基础路径

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
  } else {
    // 让用户去登录
    toLoginPage();
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
    if (err.message == '未授权') {
      // @ts-ignore
      uni.showModal({
        title: '出错了',
        content: '登录失效，请重新登录'
      });
      uni.removeStorageSync('token');
      toLoginPage();
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



这里着重解释一下post函数的第三个参数：在大多数情况下，你**不需要**传入这个参数，但是在某些场景下，可能部分参数是get传递部分参数是post传递，那么get参数部分就要放到第三个参数里。



## API集中管理

在src/api下集中管理所有api，而**不要直接在页面中写请求地址**，此为方便解耦合的做法。 



```typescript
import { get, post } from "@/http";

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
	username: string;// 用户名
	user_icon: string; // 头像
}
```



然后定义获取用户数据的方法

```typescript
// 标记返回类型为 User,方便代码提示
export async function user_get():Promise<User> {
	return getUser();
}
```

也许你会觉得这个做法很繁琐，但是请相信我：这样的代码在后期更好维护，严格规定什么操作在哪做，页面只管展示和交互。而且**一般来说前端开发都比后端开发起步要快，大概率你是先写页面再对接口，如果都已经写完了还没有和后端约定返回字段的话，可以在这里做数据字段转换**



# 助手函数

在src/helpers下定义项目中用到的所有助手函数，这个目录可定制化的空间非常高，你可以按照你的喜好随意的更改他们。



## 总线

总线主要提供页面间通信的方式。



```typescript
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
```



该方法既导出了install方法也导出了bus实例，使得你既可以通过import这个文件引用到它也可以通过this.$bus访问到它。当然你也可以挂载到uni实例上。



使用方法：通过this.$bus.on监听事件，通过this,$bus.emit触发事件，通过this,$bus.off退订事件。



## 友好提示

在src/helpers/toast下提供了友好提示函数，原理是通过Vue.extends和DOM的api动态创建元素。

使用方式：this.$toast.success成功提示，this.$toast.error错误提示，this.$toast,loading加载动画。



## 警告框

通过src/helpers/alert下提供了模态警告框，在执行危险操作时警告用户。



# 全局样式

在src/styles下提供全局样式，包括变量，混入等等。



# 关于依赖



## flyio

[GitHub地址](https://github.com/wendux/fly)

------

## momentjs

[官方文档](https://momentjs.com/)

-------

## lodash-es

[中文文档 ](https://www.lodashjs.com/)



## uuid

[npm仓库](https://www.npmjs.com/package/uuid)



# 关于uview2版本

该项目基于uview2.0.9非稳定版，后续会持续更新。
