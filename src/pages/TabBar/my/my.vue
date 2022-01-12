<template>
  <div>
    <i-navbar title="个人中心" :is-back="false"></i-navbar>
    <u-cell-group custom-style="margin-top: 20px;padding: 0 20rpx">
      <u-cell custom-style="background: #fff" size="large" title="清除缓存" @click="onClearStorage"></u-cell>
    </u-cell-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {};
  },
  mounted() {},
  methods: {
    async onClearStorage() {
      // @ts-ignore
      await uni.$m.alert('确定要清空所有缓存吗?');
      // @ts-ignore
      uni.$m.storage.clear(); // 清除本地缓存
      this.$logout(); // 可选，让用户重新登录
    }
  }
});
</script>
