<template>
	<div class="i-tabbar">
		<div class="cu-bar tabbar bg-white">
			<div class="action text-green">
				<div class="cuIcon-homefill"></div>首页
			</div>
			<div class="action text-gray">
				<div class="cuIcon-similar"></div>分类
			</div>
			<div class="action text-gray add-action">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				发布
			</div>
			<div class="action text-gray">
				<div class="cuIcon-cart">
					<div class="cu-tag badge">99</div>
				</div>购物车
			</div>
			<div class="action text-gray">
				<div class="cuIcon-my">
					<div class="cu-tag badge">12</div>
				</div>我的
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { TabbarItem } from './types';
export default {
	name: 'ITabbar',
	options: {
		virtualHost: true
	},
	props: {
		List: {
			type: Array as PropType<TabbarItem[]>,
			required: true
		}
	},
	components: {},
	data() {
		return {};
	},
	methods: {

	}
}

</script>
 
<style lang="scss" scoped>
.i-tabbar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>