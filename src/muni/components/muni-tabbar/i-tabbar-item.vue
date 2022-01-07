<template>
	<div>
		<div class="action text-green">
			<div class="cuIcon-homefill"></div>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "ITabbarItem",
	data() {
		return {};
	},
	methods: {}

})

</script>