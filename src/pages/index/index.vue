<template>
  <view>
    恭喜你成功跑起来了~
    <i-loading ref="loading"></i-loading>
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
    this.$refs.loading.show();
    this.$u.sleep(2000).then(() => {
      this.$refs.loading.hide();
    });
  }
});
</script>
<style>
page {
  background-color: #fff;
}
</style>
<style lang="scss" scoped></style>
