<template>
  <div>
    <i-navbar title="主页" :is-back="false"></i-navbar>
    这是主页
    <button>节流触发</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {};
  },
  async mounted() {
    console.log(this.$m);
  },
  methods: {},
});
</script>

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
