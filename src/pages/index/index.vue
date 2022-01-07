<template>
  <div>
    <i-navbar title="主页" :is-back="false"></i-navbar>
    <i-poster ref="poster" @finish="onFinish">
      <div>
        <image
          src="https://images.unsplash.com/photo-1641499303764-a9e3a93a72e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
        />
      </div>
    </i-poster>
    <i-tabbar></i-tabbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {};
  },
  mounted() {
    this.$refs.poster.draw();
  },
  methods: {
    onFinish(url) {
      console.log(url);
    }
  }
});
</script>
<style>
page {
  background-color: var(--page);
}
</style>
<style lang="scss" scoped></style>
