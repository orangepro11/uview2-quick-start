<template>
  <view v-if="loading">
    <view class="mask-api" :style="{ zIndex: zIndex + 990 }" />
    <view class="load" :style="{ zIndex: zIndex + 1 }">
      <div class="square-spin">
        <!-- <image src="@/static/loading/loading.png" /> -->
        <image :src="logo" :style="{ backgroundColor: color }" />
      </div>
      <view class="text">
        {{ text }}
      </view>
    </view>
  </view>
</template>

<script>
/**
 * @description: 加载中的动画，通过this.$refs.loading.show()调用
 * @props {String} text 加载中的文字
 */

import props from './props';

export default {
  name: 'Loading',
  mixins: [props],
  data() {
    return {
      logo: '',
      loading: false
    };
  },
  methods: {
    show() {
      this.loading = true;
    },
    hide() {
      this.loading = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import 'loading.scss';
</style>
