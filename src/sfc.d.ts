declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'uview-ui' {
  import uViewUI from '@/uview-ui';
  export default uViewUI;
}

// 1. 确保在声明补充的类型之前导入 'vue'
import Vue from 'vue';

// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $u: any;
    $bus: any;
    mescrollInit: any;
    $m: any;
  }
}

declare module '@types/uni-app/lib/uni' {
  interface Uni {
    $u: any;
    $m: any;
  }
}

declare class Uni {
  $u: any;
  $m: any;
}

declare module 'App' {
  import App from './App.vue';
  export default App;
}

declare module 'uni-simple-router' {
  import uniSimpleRouter from 'uni-simple-router';
  export default uniSimpleRouter;
}

declare var window: any;
declare const uni: Uni;
