<template>
  <view>
    <erp-navbar title="进销存" no-back />
    <view class="HomePage">
      <Statistic />
      <Menu></Menu>
      <view class="mini-nav">
        <div class="title">库存预警</div>
        <div class="more">
          <div class="text">查看更多</div>
          <u-icon name="arrow-right" size="22rpx" style="margin-left: 5rpx;"></u-icon>
        </div>
      </view>
      <erp-store-card>
        <template v-slot:middle>
          <view class="price_and_store">
            <view class="price">¥39.9</view>
            <view class="store">
              <text>剩余</text>
              <view class="val">12个</view>
            </view>
          </view>
        </template>
        <template>
          <div class="wrapper">
            <div class="end_time">到期时间：2021.12.11</div>
            <div class="resuid">
              <text class="text">剩余:</text>
              <div class="value">10天</div>
            </div>
          </div>
        </template>
      </erp-store-card>
      <erp-store-card>
        <template v-slot:middle>
          <view class="price_and_store">
            <view class="price">¥39.9</view>
            <view class="store">
              <text>剩余</text>
              <view class="val">12个</view>
            </view>
          </view>
        </template>
        <template>
          <div class="wrapper">
            <div class="end_time">到期时间：2021.12.11</div>
            <div class="resuid">
              <text class="text">剩余:</text>
              <div class="value">10天</div>
            </div>
          </div>
        </template>
      </erp-store-card>
      <erp-store-card>
        <template v-slot:middle>
          <view class="price_and_store">
            <view class="price">¥39.9</view>
            <view class="store">
              <text>剩余</text>
              <view class="val">12个</view>
            </view>
          </view>
        </template>
        <template>
          <div class="wrapper">
            <div class="end_time">到期时间：2021.12.11</div>
            <div class="resuid">
              <text class="text">剩余:</text>
              <div class="value">10天</div>
            </div>
          </div>
        </template>
      </erp-store-card>

      <view class="mini-nav">
        <div class="title">保质期预警</div>
        <div class="more">
          <div class="text">查看更多</div>
          <u-icon name="arrow-right" size="22rpx" style="margin-left: 5rpx;"></u-icon>
        </div>
      </view>

      <erp-store-card>
        <template v-slot:middle>
          <view class="price_and_store thin">
            <view class="price">¥39.9</view>
            <view class="number">
              <text style="margin-right: 5rpx;">x</text>
              <text class="value">12</text>
            </view>
          </view>
        </template>

        <template v-slot:bottom>
          <view class="wrapper">
            <view class="end_time">到期时间：2021.12.11</view>
            <view class="resuid">
              <text class="text">剩余:</text>
              <text class="value">10天</text>
            </view>
          </view>
        </template>
      </erp-store-card>

      <erp-store-card>
        <template v-slot:middle>
          <view class="price_and_store thin">
            <view class="price">¥39.9</view>
            <view class="number">
              <text style="margin-right: 5rpx;">x</text>
              <text class="value">12</text>
            </view>
          </view>
        </template>

        <template v-slot:bottom>
          <view class="wrapper">
            <view class="end_time">到期时间：2021.12.11</view>
            <view class="resuid">
              <text class="text">剩余:</text>
              <text class="value">10天</text>
            </view>
          </view>
        </template>
      </erp-store-card>

      <erp-store-card>
        <template v-slot:middle>
          <view class="price_and_store thin">
            <view class="price">¥39.9</view>
            <view class="number">
              <text style="margin-right: 5rpx;">x</text>
              <text class="value">12</text>
            </view>
          </view>
        </template>

        <template v-slot:bottom>
          <view class="wrapper">
            <view class="end_time">到期时间：2021.12.11</view>
            <view class="resuid">
              <text class="text">剩余:</text>
              <text class="value">10天</text>
            </view>
          </view>
        </template>
      </erp-store-card>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Statistic from './components/statistic.vue';
import Menu from './components/menu.vue';
export default Vue.extend({
  name: 'HomePage',
  components: { Statistic, Menu },
  data() {
    return {};
  },
  methods: {}
});
</script>

<style>
page {
  background: #f4f4f4;
}
</style>

<style lang="scss" scoped>
.HomePage {
  padding: 20rpx;

  .mini-nav {
    margin-top: 33rpx;
    margin-bottom: 26rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #111111;
    }

    .more {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;

      display: flex;
      align-items: center;
    }
  }

  .price_and_store {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    display: flex;
    justify-content: space-between;
    margin-top: 16rpx;
    &.thin {
      margin-top: 8rpx;
    }
    .price {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }

    .number {
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #111111;
    }

    .store {
      display: flex;
      align-items: center;

      font-size: 22rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ff0000;

      .val {
        font-size: 30rpx;
      }
    }
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .end_time {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }

    .resuid {
      font-family: PingFang SC;
      font-weight: 500;
      color: #ff0000;
      display: flex;
      align-items: center;
      .text {
        font-size: 22rpx;
        margin-right: 5rpx;
      }
      .value {
        font-size: 28rpx;
      }
    }
  }
}
</style>
