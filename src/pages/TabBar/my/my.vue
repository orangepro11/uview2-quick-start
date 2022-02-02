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
    try {
      await this['getUserInfo']();
    } catch (e) {
      this.$router.to('/pages/Login/Login');
    }
  },
  methods: {
    async onClearStorage() {
      await uni['$m'].alert('确定要清空所有缓存吗?');
      uni['$m'].clearStorage();
      this['$logout']();
    },
  },
});
</script>
