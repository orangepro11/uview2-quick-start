<template>
  <div class="UserCardWrapper">
    <u-avatar :src="User.user_icon"></u-avatar>
    <view class="info">
      <view class="nickname">{{ User.name }}</view>
      <view class="expired_at">到期时间:{{ User.expired_at }}</view>
    </view>
    <view class="operation" @click="$emit('click')">
      <image style="width: 35rpx;height:35rpx" src="@/static/erp/PersonalCenter/settings.png" />
    </view>
  </div>
</template>

<script lang="ts">
import { ErpUserInfo } from '@/helpers';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'UserCard',
  props: {
    User: {
      type: Object as PropType<ErpUserInfo>
    }
  }
});
</script>

<style lang="scss" scoped>
.UserCardWrapper {
  display: flex;
  align-items: center;
  .info {
    margin-left: 40rpx;
    flex: 1;
    .nickname {
      font-size: 32rpx;
      font-weight: bold;
      color: #111111;
    }
    .expired_at {
      font-size: 26rpx;
      font-weight: normal;
      color: #333333;
      margin-top: 4rpx;
    }
  }
}
</style>
