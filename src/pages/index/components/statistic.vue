<template>
  <view class="card">
    <div class="top">统计：</div>
    <div class="content">
      <view class="item">
        <view class="top">36410</view>
        <view class="bottom">采购总额(元)</view>
      </view>
      <view class="item">
        <view class="top">36410</view>
        <view class="bottom">采购总额(元)</view>
      </view>
      <view class="item">
        <view class="top">36410</view>
        <view class="bottom">采购总额(元)</view>
      </view>
    </div>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: '',
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {}
});
</script>

<style lang="scss" scoped>
.card {
  @include gradient;
  height: 232rpx;
  border-radius: 10rpx;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 29rpx;
  padding-left: 24rpx;

  > .top {
    font-size: 34rpx;
    font-family: PingFang SC;
    font-weight: bold;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-right: 24rpx;
    height: 100%;
    align-items: center;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      > .top {
      }

      .bottom {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        margin-top: 15rpx;
      }
    }
  }
}
</style>
