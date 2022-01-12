<template>
  <div>
    <u-navbar></u-navbar>
    <!-- <i-navbar title="主页" :is-back="false"></i-navbar> -->
    <!-- <u-calendar monthNum="12" mode="range" :show="true" :minDate="minDate" :maxDate="maxDate" :defaultDate="defaultDate"></u-calendar> -->

    <i-tabbar></i-tabbar>
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
  async mounted() {},
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
