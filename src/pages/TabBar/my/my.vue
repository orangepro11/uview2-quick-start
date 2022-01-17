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
import requireLogin from '@/muni/js/mixins/requireLogin';
import requireUpload from '@/muni/js/mixins/requireUpload';

export default Vue.extend({
  data() {
    return {};
  },
  mixins: [requireLogin, requireUpload],
  async mounted() {
    console.log(await this.getUserInfo())
  },
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
