<template>
  <div>
    <i-navbar title="主页" :is-back="false"></i-navbar>
    <muni-poster ref="poster" :width="700" :height="600">
      <template v-slot="{ src }">
        <img :src="src" alt="" style="margin: 0 auto;width: 700px;height: 600px" />
      </template>
    </muni-poster>
    <i-tabbar></i-tabbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      posterImage: '',
      userImage: ''
    };
  },
  async mounted() {
    const { poster } = this.$refs;
    this.userImage = await uni.$m.file.toBase64(require('@/static/logo.png'));
    poster.addImage(this.userImage, 50, 0, 250, 250);
    poster.addText('这是一张海报', 76, 205, 30, 'red', 453, false, 40);

    await poster.draw();
  },
  methods: {
    onFinish(url) {
      console.log(url);
      this.posterImage = url;
    }
  }
});
</script>
<style>
page {
  background-color: var(--page);
}
</style>
<style lang="scss" scoped>
.poster {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #f5f5f5, #fff);
}
.text {
  margin-top: 20rpx;
  color: #fff;
}
.resultImage {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
