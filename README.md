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



# 实用组件

在src/components下封装了若干实用(花里胡哨)组件，组件通过easycom引入，可在任何地方直接引用到。



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
}
</script>
```



## loading组件

该组件用于展示加载中特效，较uni.showLoading体验较好。

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
        }, 3000)
    }
}
</script>
```



## 海报绘制组件

该组件用于满足一般场景下的海报绘制。

```vue
<template>
	<muni-poster ref="poster" :width="750" :height="750">
        <template v-slot="{src}">
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



# uni.$m对象

这个是对一些常用操作的全局封装，它们有的是uni原生api的二次封装，有的是脱胎于实际场景的方法。



## 类型检测typeOf

这个是对内置的typeof关键字的增强，用来弥补无法准确判断null，Date等类型的不足，类型为**全小写**。



### 示例

```js
uni.$m.typeOf(new Date()) // date
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
| htmlcollection   | DOM集合    |
| html[xxx]element | DOM对象    |
| set              | 集合       |
| map              | 哈希表     |
| array            | 数组       |



> typeOf几乎涵盖了所有可能的类型，推荐在所有需要进行类型判断的场景下优先使用它。



## 面向切面的程序设计 

在vm下的$m里封装了一些暴露函数切面的方法，有before，after和chain



### 前置执行函数before

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
        },
    }
}
</script>
```



### 后置执行函数

场景：一般不会用到，如果你在执行函数A以后还要做一些收尾工作则可以考虑用。

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
        },
    }
}
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



> before和after在某些情况下可以互换，只要你逻辑转的过来。



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
}
</script>
```



注意事项：同上。



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

该项目基于uview2.0.19非稳定版，后续会持续更新。
