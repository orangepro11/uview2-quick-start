<template>
  <view>
    <erp-navbar title="设置" rightText="修改" @back="onBack" />
    <view style="padding: 20rpx">
      <view class="item">
        <view class="title">头像</view>
        <view class="avatar-wrapper">
          <u-avatar class="avatar" :src="User.user_icon" />
          <view class="mask" @click="onSelectAvatar"></view>
          <image class="edit" src="@/static/erp/PersonalCenter/pen.png" />
        </view>
      </view>
      <u-popup :show="showPopUp" @close="showPopUp = false" :round="true" borderRadius="20">
        <erp-upload @upload="onUploadAvatar" />
      </u-popup>
      <view class="item">
        <view class="title">昵称</view>
        <view class="content">{{ User.name }}</view>
      </view>

      <view class="item">
        <view class="title">手机号</view>
        <view class="content">{{ User.username }}</view>
      </view>
    </view>
    <erp-fixed-bottom>
      <view style="padding: 9rpx 20rpx">
        <erp-button @click="onConfirm">确定</erp-button>
      </view>
    </erp-fixed-bottom>
  </view>
</template>

<script lang="ts">
import { ErpUserInfo } from '@/helpers';
import { uploadFile } from '@/helpers/erp/hooks';
import { getUser } from '@/model/erp/User';
import Vue from 'vue';

export default Vue.extend({
  name: 'Settings',
  data() {
    return {
      User: <ErpUserInfo>{},
      showPopUp: false
    };
  },
  methods: {
    onSelectAvatar(): void {
      this.showPopUp = true;
    },
    onConfirm(): void {
      console.log('confirm');
    },
    onBack(): void {
      this.$u.route({ type: 'back' });
    },
    onUploadAvatar(file: Blob): void {
      this.showPopUp = false;
      // @ts-ignore
      uploadFile(file).then(url => {
        this.User.user_icon = url;
      });
    }
  },
  mounted() {
    this.User = getUser();
  }
});
</script>

<style>
page {
  background: #f4f4f4;
}
</style>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 28rpx;
  height: 100rpx;
  border-radius: 10rpx;
  margin-bottom: 20rpx;

  .title {
    font-size: 32rpx;
    font-weight: bold;
    color: #111111;
  }

  .avatar {
    width: 80rpx;
    height: 80rpx;
  }

  .avatar-wrapper {
    display: flex;
    align-items: center;
    position: relative;

    .edit {
      position: absolute;
      width: 28rpx;
      height: 28rpx;
      left: 30%;
    }

    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  .content {
    font-size: 28rpx;
    font-weight: 500;
    color: #666;
  }
}
</style>
