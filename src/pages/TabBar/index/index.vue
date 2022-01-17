<template>
  <div>
    <i-navbar title="主页" :is-back="false"></i-navbar>
    <!-- <u-calendar monthNum="12" mode="range" :show="true" :minDate="minDate" :maxDate="maxDate" :defaultDate="defaultDate"></u-calendar> -->
    这是主页
    <u-button text="点我跳转" @click="$router.to('/pages/TabBar/my/my')"></u-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      minDate: Number(new Date('2018-01-01')),
      maxDate: Number(new Date('2022-12-31')),
      defaultDate: ['2018-08-01'],
      test: [
        {
          sort: 1,
          color: 'red'
        },
        {
          sort: 3,
          color: 'blue'
        },
        {
          sort: 2,
          color: 'green'
        },
        {
          sort: 4,
          color: 'yellow'
        }
      ]
    };
  },
  async mounted() {
    console.log(this.$router);
  },
  methods: {}
});
</script>

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
