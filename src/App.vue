<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  mpType: 'app',
  globalData: {},
  onLaunch(options) {
    if (process.env.NODE_ENV == 'development') {
      uni.redirectTo({
        url: '/pages/index/index'
      });
    }
  },
  onShow() {},
  onHide() {}
});
</script>

<style>
page {
  background: #f4f4f4;
}
</style>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/uview-ui/index.scss';
</style>
