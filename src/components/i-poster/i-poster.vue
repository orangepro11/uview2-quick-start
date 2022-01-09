<template>
  <div>
    <muni-loading ref="loading"></muni-loading>
    <div id="poster" class="render">
      <slot v-if="!isRenderFinish"></slot>
    </div>
    <div class="res">
      <slot class="res" name="res" v-if="isRenderFinish" :src="imageURL"></slot>
    </div>
  </div>
</template>

<script>
/**
 * 该海报组件仅满足H5端的需求，不适用于小程序端
 * 其特点是：简单且快速，只需要传入海报的样式和内容然后通过ref调用draw方法即可
 * 注意图片不能跨域，否则会渲染出错
 * 实现机制是使用html2canvas直接对屏幕内容拍快照
 *
 * @slot poster 海报内容，可以放置任何内容,该区域直接传入不会显示，是不可见的绘图区域
 * @slot image 图片内容，该区域回显绘制的最终内容
 */
export default {
  data() {
    return {
      imageURL: '',
      isRenderFinish: false
    };
  },
  props: {},
  methods: {
    renderPost(base64) {
      console.log(uni.$m);
      this.imageURL = base64;
      this.isRenderFinish = true;
      this.$emit('finish', base64);
    },
    showLoading() {
      this.$refs.loading.show();
    },
    hideLoading() {
      this.$refs.loading.hide();
    }
  }
};
</script>

<script module="renderScript" lang="renderjs">
import html2canvas from 'html2canvas';
const scale = window.devicePixelRatio;

export default {
	data() {
		return {}
	},
  props: {
    width: {
      type: [Number,String],
      default: '750rpx'
    },
    height: {
      type: [Number,String],
      default: '200rpx'
    },
  },
  mounted() {},
	methods: {
		async draw(e) {
      const vm = this.$ownerInstance;
      vm.callMethod('showLoading');
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			})
			const poster = await this.$u.getRect('#poster')
      const $poster = document.querySelector('#poster')
			const canvas = await html2canvas($poster, {
				width: uni.$u.getPx(this.width), //dom 原始宽度
				height: uni.$u.getPx(this.height),
				scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
				scrollX: 0,
				useCORS: true, //支持跨域，但好像没什么用,
				scale: 1, //设置放大倍数
			})
			let base64 = canvas.toDataURL('image/png');
			vm.callMethod('renderPost', base64);
      vm.callMethod('hideLoading');
		}
	}
}
</script>

<style lang="scss" scoped>
.render {
  position: absolute;
  top: -9999px;
  left: 0;
  right: 0;
}
.res {
  width: 750rpx;
}
</style>
