<template>
  <canvas class="fire-canvas" :style="{ width: width + 'px', height: height + 'px', 'z-index': zIndex }" :canvas-id="canvasId" @error="canvasIdErrorCallback"></canvas>
</template>

<script>
/**
 * @description: 礼花组件，通过this.$refs.firework.start()方法启动礼花
 * @props particleCount {Number} 礼花数量，最好小于500，默认150
 * @props angle {Number} 角度，取值范围0-360, 默认90
 * @props spread {Number} 爆炸范围，默认100
 * @props x {Number} 中心点的x坐标
 * @props y {Number} 中心点的y坐标
 */

import props from './props';
import utils from './utils';

export default {
  mixins: [props, utils],

  mounted() {},
  methods: {
    start() {
      this.initCanvas();
    }
  }
};
</script>

<style>
.fire-canvas {
  position: fixed;
  top: 0px;
  left: 0px;
  pointer-events: none;
}
</style>
