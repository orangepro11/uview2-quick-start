<template>
  <div>
    <erp-navbar title="货品管理" no-back />
    <div class="goods-card-list">
      <goods-card v-for="goods in GoodsList" :key="goods.id" :goods="goods" @edit="toEditPage(goods.id)" @delete="onDelete(goods.id)" />
      <u-loadmore :status="status"></u-loadmore>
    </div>
    <erp-fixed-bottom is-tab>
      <view style="padding: 10rpx 20rpx 20rpx">
        <erp-button @click="toCreatePage">添加货品</erp-button>
      </view>
    </erp-fixed-bottom>
  </div>
</template>

<script lang="ts">
import { deleteGoods } from '@/api/erp/goods';
import { isLastPage } from '@/helpers/erp/pagination';
import { List, Goods } from '@/model/erp/Goods';
import Vue from 'vue';
import GoodsCard from './components/GoodsCard.vue';
export default Vue.extend({
  name: 'GoodsManagerPage',
  components: { GoodsCard },
  data() {
    return {
      current_page: 0,
      status: 'loading',
      GoodsList: <Goods[]>[]
    };
  },
  methods: {
    toEditPage(id: number): void {
      this.$u.route('/pages/goods/edit', { id });
    },
    toCreatePage(): void {
      this.$u.route('/pages/goods/create', {});
    },
    onDelete(id: number): void {
      this.$alert('删除此条商品数据?')
        .then(() => deleteGoods(id))
        .then(() => {
          this.$toast.success('删除成功');
          this.GoodsList = this.GoodsList.filter(goods => goods.id !== id);
        })
        .catch(e => this.$toast.error(e || '删除失败'));
    },
    async init() {
      try {
        const { current_page, last_page, data } = await List({ page: 1, title: '', code: '' });
        this.GoodsList = data;
        this.current_page = current_page;
        this.status = isLastPage(current_page, last_page) ? 'nomore' : 'loadmore';
      } catch (e) {
        this.$toast.error(e || '请求失败');
      }
    }
  },
  onShow() {
    this.init();
  },
  onPullDownRefresh() {
    this.init().then(uni.stopPullDownRefresh);
  }
});
</script>

<style>
page {
  background: #f4f4f4;
}
</style>

<style lang="scss" scoped>
.goods-card-list {
  margin-top: 20rpx;
}
</style>
