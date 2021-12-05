<template>
  <div class="MenuCardWrapper" :style="[border]" @click="MenuCardClick">
    <view class="left">
      <view class="icon">
        <image :src="icon" alt="" class="image" />
      </view>
      <view class="title">
        {{ title }}
      </view>
    </view>
    <view class="right">
      <u-icon name="arrow-right" size="20"></u-icon>
    </view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'MenuCard',
  props: {
    borderTopRadius: {
      type: Boolean,
      required: false,
      default: false,
    },
    borderBottomRadius: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: true,
      default: '货品分类管理'
    },
    icon: {
      type: String,
      required: true,
      default: '',
    },
    url: {
      type: String,
      required: false,
      default: '',
    },
    disableUrl: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  computed: {
    border(): Object {
      if(this.borderTopRadius) {
        return {
          'border-radius': '10rpx 10rpx 0 0'
        }
      } else if (this.borderBottomRadius) {
        return {
          'border-radius': '0 0 10rpx 10rpx'
        }
      } else {
        return {
        }
      }
    }
  },
  methods: {
    MenuCardClick() {
      if(!this.disableUrl) {
        this.$u.route('/pages/' + this.url);
      } else {
        this.$emit('click', this.url);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
  .MenuCardWrapper {
    border-radius: 10rpx;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 36rpx 23rpx 38rpx 22rpx;
    margin-bottom: 30rpx;
    .icon {
      margin-right: 10rpx;
      display: flex;
      align-items:center;
      .image {
        width: 26rpx;
        height: 26rpx;
      }
    }
   
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .title {
        font-size: 28rpx;
        font-weight: normal;
        color: #111111;
      }
    }
  }
</style>