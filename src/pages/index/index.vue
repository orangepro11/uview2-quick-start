<template>
  <div>
    <i-navbar title="主页" :is-back="false"></i-navbar>
    <i-tabbar></i-tabbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {};
  },
  mounted() { },
  methods: {}
});
</script>
<style>
page {
  background-color: var(--page);
}
</style>
<style lang="scss" scoped></style>
