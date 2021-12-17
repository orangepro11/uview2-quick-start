<template>
	<div>
		<mescroll-uni
			ref="scroll"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
			:down="downOption"
			:up="upOption"
		>
			<template v-for="(item) in dataList">
				<div :key="item.id">
					<slot :item="item"></slot>
				</div>
			</template>
		</mescroll-uni>
	</div>
</template>

<script>
import MescrollMixin from "../scroll/mescroll-uni/mescroll-mixins"; // 非uni_modules版本
import MescrollUni from "../scroll/mescroll-uni/mescroll-uni.vue"; // 非uni_modules版本
export default {
	components: {
		MescrollUni
	},
	mixins: [MescrollMixin],
	computed: {

	},
	props: {
		init: {
			type: Function,
			required: true,
			default: () => { }
		},
		loadmore: {
			type: Function,
			required: true,
			default: () => { }
		}
	},
	data() {
		return {
			dataList: [],
			upOption: {
				page: {
					size: 15,
				},
				noMoreSize: 5,
				empty: {
					tip: "暂无数据",
				}
			},
			downOption: {},
		}
	},
	methods: {
		/**
		 * 上拉加载的回调
		 */
		async upCallback({ num }) {
			const { data, last_page } = await this.loadmore.call(num);
			if (num == 1) {
				this.dataList = data;
			} else {
				this.dataList = this.dataList.concat(data);
			}
			this.mescroll.endByPage(data.length, last_page);
		},
		/** 
		 * 下拉刷新的回调
		*/
		async downCallback() {
			const { data, last_page } = await this.init.call();
			this.dataList = data;
			this.mescroll.endByPage(data.length, last_page);
		},
	}
}
</script>

<style lang="scss" scoped>
</style>