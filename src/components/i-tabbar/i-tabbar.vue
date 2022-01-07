<template>
	<div class="tabbbar-wrapper">
		<div class="placeholder"></div>
		<div class="i-tabbar">
			<div class="cu-bar tabbar bg-white">
				<div class="action text-green" @click="toggle(0)">
					<div class="cuIcon-homefill"></div>首页
				</div>
				<div class="action text-gray" @click="toggle(1)">
					<div class="cuIcon-similar"></div>分类
				</div>
				<div class="action text-gray add-action" @click="toggle(2)">
					<button class="cu-btn cuIcon-add bg-green shadow"></button>
					发布
				</div>
				<div class="action text-gray" @click="toggle(3)">
					<div class="cuIcon-cart">
						<div class="cu-tag badge">99</div>
					</div>购物车
				</div>
				<div class="action text-gray" @click="toggle(4)">
					<div class="cuIcon-my">
						<div class="cu-tag badge">12</div>
					</div>我的
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
	name: 'MuniTabbar',
	options: {
		virtualHost: true
	},
	components: {},
	data() {
		return {};
	},
	computed: {
		...mapGetters("tabs", ['index'])
	},
	methods: {
		...mapMutations("tabs", ["SET_TAB_INDEX"]),
		toggle(index) {
			this.SET_TAB_INDEX(index);
			console.log(this.index);
		}
	}
}

</script>
 
<style lang="scss" scoped>
.placeholder {
	height: 60px;
}
.i-tabbar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>