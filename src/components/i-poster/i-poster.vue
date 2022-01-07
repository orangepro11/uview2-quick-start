<template>
	<div id="poster">
		<div class="render">
			<slot></slot>
		</div>
	</div>
</template>

<script>
/**
 * 该海报组件仅满足H5端的需求，不适用于小程序端
 * 其特点是：简单且快速，只需要传入海报的样式和内容然后通过ref调用draw方法即可
 */
export default {
	data() {
		return {
			imageURL: '',
		}
	},
	methods: {
		renderPost(base64) {
			this.imageURL = base64;
			const file = this.convetToFile(base64)
			this.$emit('finish', file);
		},
		convetToFile(base64) {
			let arr = base64.split(',');
			let mime = arr[0].match(/:(.*?);/)[1];
			let bstr = atob(arr[1]);
			let n = bstr.length;
			let u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new File([u8arr], '', {
				type: mime
			});
		}
	}
}
</script>

<script module="renderScript" lang="renderjs">
import html2canvas from 'html2canvas';
const scale = window.devicePixelRatio;

export default {
	data() {
		return {}
	},
	methods: {
		async draw(e, vm) {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			})
			const poster = document.getElementById('poster')
			const canvas = await html2canvas(poster, {
				width: poster.clientWidth, //dom 原始宽度
				height: poster.clientHeight,
				scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
				scrollX: 0,
				useCORS: true, //支持跨域，但好像没什么用,
				scale: scale, //设置放大倍数
			})
			let base64 = canvas.toDataURL('image/png');
			this.$ownerInstance.callMethod('renderPost', base64);
		}
	}
}
</script>

<style lang="scss" scoped>
</style>