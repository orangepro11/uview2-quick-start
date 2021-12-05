<template>
  <div>
    <erp-navbar title="库存预警" no-back />
    <div class="alert-list">
      <alert-card />
      <alert-card />
      <alert-card />
      <alert-card />
      <alert-card />
      <alert-card />
    </div>
    <u-loadmore :status="status" />
  </div>
</template>

<script lang="ts">
import { isLastPage } from '@/helpers';
import { getStores } from '@/model/erp/Store';
import Vue from 'vue';
import AlertCard from './components/alert-card.vue';
export default Vue.extend({
  components: { AlertCard },
  name: 'StoreManagerPage',
  data() {
    return {
      status: 'loadmore',
      stores: []
    };
  },
  mounted() {
    getStores().then(({ data, current_page, last_page }) => {
      this.stores = data;
      this.status = isLastPage(current_page, last_page) ? 'nomore' : 'loadmore';
    });
  }
});
</script>

<style>
page {
  background: #f4f4f4;
}
</style>

<style lang="scss" scoped>
.alert-list {
  padding: 0 22rpx;
  margin-top: 20rpx;
}
</style>
