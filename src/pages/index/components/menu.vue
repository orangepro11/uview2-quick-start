<template>
  <div class="menu">
    <div class="item" @click="$u.route('pages/put_order/create')">
      <image src="@/static/erp/index/caigoutubiao.png" class="icon" />
      <div class="title">添加采购</div>
    </div>
    <div class="item">
      <image src="@/static/erp/index/xiaoshoutubiao.png" class="icon" />
      <div class="title">添加销售</div>
    </div>
    <div class="item">
      <image src="@/static/erp/index/tihuochuku.png" class="icon" />
      <div class="title">其他出库</div>
    </div>
    <div class="item">
      <image src="@/static/erp/index/qitaruku.png" class="icon" />
      <div class="title">其他入库</div>
    </div>

    <div class="item">
      <image src="@/static/erp/index/caigoudingdan.png" class="icon" />
      <div class="title">采购订单</div>
    </div>
    <div class="item">
      <image src="@/static/erp/index/xiaoshoujilu.png" class="icon" />
      <div class="title">销售订单</div>
    </div>
    <div class="item">
      <image src="@/static/erp/index/chukujilu.png" class="icon" />
      <div class="title">其他出库记录</div>
    </div>
    <div class="item">
      <image src="@/static/erp/index/rukujilu.png" class="icon" />
      <div class="title">其他入库记录</div>
    </div>

    <div class="item">
      <image src="@/static/erp/index/caigoujilu.png" class="icon" />
      <div class="title">采购记录</div>
    </div>
    <div class="item">
      <image src="@/static/erp/index/xiaoshoujilu2.png" class="icon" />
      <div class="title">销售记录</div>
    </div>
    <div class="item">
      <image src="@/static/erp/index/tianjiapandian.png" class="icon" />
      <div class="title">添加盘点</div>
    </div>
    <div class="item">
      <image src="@/static/erp/index/pandianjilu.png" class="icon" />
      <div class="title">盘点记录</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.menu {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 32rpx 42rpx;
  background: #fff;
  column-gap: 30rpx;
  row-gap: 40rpx;
  margin-top: 20rpx;
  border-radius: 10rpx;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      width: 57rpx;
      height: 54rpx;
    }
    .title {
      font-size: 24rpx;
      margin-top: 27rpx;
      white-space: nowrap;
    }
  }
}
</style>
