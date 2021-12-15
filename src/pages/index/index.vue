<template>
  <view>
    恭喜你成功跑起来了~
    <i-firework ref="firework"></i-firework>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'IndexPage',
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
  onReady() {
    this.$refs.firework.start();
  }
});
</script>

<style lang="scss" scoped></style>
