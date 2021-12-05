<template lang="html">
  <div>
    <erp-navbar title="个人中心" no-back />
    <user-card :User="User" class="user-card" @click="toSettingsPage" />
    <view class="menu-list">
      <menu-card title="供应商管理" :icon="require('@/static/erp/PersonalCenter/supplier.png')" />
      <menu-card title="客户管理" :icon="require('@/static/erp/PersonalCenter/customer.png')" />
      <menu-card title="操作员管理" :icon="require('@/static/erp/PersonalCenter/operator.png')" />
    </view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserCard, MenuCard } from './components';
import { getUser } from '@/model/erp/User';
import { ErpUserInfo } from '@/helpers';
export default Vue.extend({
  components: { UserCard, MenuCard },
  data() {
    return {
      User: <ErpUserInfo>{},
    };
  },
  mounted() {
    this.User = getUser();
  },
  methods: {
    toSettingsPage(): void {
      this.$u.route('/pages/PersonalCenter/settings');
    },
  },
});
</script>

<style>
page {
  background: #f4f4f4;
}
</style>

<style lang="scss" scoped>
.user-card {
  margin: 46rpx 31rpx 0 41rpx;
}
.menu-list {
  margin-top: 62rpx;
  padding: 0 20rpx;
}
</style>