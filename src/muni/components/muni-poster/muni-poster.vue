<template>
  <view>
    <canvas style="width: 256px; height: 256px" class="noSeeCanvas" canvas-id="CANVAS_EWM_DRAWER" id="CANVAS_EWM_DRAWER"></canvas>
    <canvas :style="{ width: width + 'px', height: height + 'px' }" class="noSeeCanvas" canvas-id="CANVAS_DRAWER" id="CANVAS_DRAWER"></canvas>
    <slot :src="src"></slot>
  </view>
</template>

<script>
/**
 * @description 用来绘制海报的组件，通过await this.$refs.poster.draw()来获取绘制完成的图片url
 * @props {Number} width 待绘制的实际图片的宽度
 * @props {Number} height 待绘制的实际图片的高度
 * @example
 * <i-poster :width="750" :height="847">
 * 		<template v-slot="{src}">
 * 			<image :src="src" v-if="src != ''" style="width: 750rpx;height: 847rpx;"></image>
 * 		</template>
 * </i-poster>
 */

import data from './data';
import props from './props';
import hooks from './hooks';
import methods from './methods';

export default {
  name: 'IPoster',
  mixins: [data, props, hooks, methods]
};
</script>

<style scoped>
.noSeeCanvas {
  position: fixed;
  left: 750rpx;
  top: 0rpx;
}
</style>
