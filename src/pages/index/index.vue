<template>
  <div>
    <i-navbar title="主页" :is-back="false"></i-navbar>
    <u-button text="点我"></u-button>
    <i-tabbar></i-tabbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {};
  },
  async mounted() {

  },
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
      console.log(e); // 
      console.log('在你点击按钮之后触发');
    }
  }
});
</script>
<style>
page {
  background-color: var(--page);
}
</style>
<style lang="scss" scoped>
.poster {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #f5f5f5, #fff);
}
.text {
  margin-top: 20rpx;
  color: #fff;
}
.resultImage {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
