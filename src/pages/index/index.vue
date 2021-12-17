<template>
  <view>
    <i-loading ref="loading"></i-loading>
    <i-firework ref="firework"></i-firework>
    <i-list v-model="List" :init="getData" :loadmore="loadmore">
      <template v-slot="{ item }">
        <div>{{ item.name }}</div>
      </template>
    </i-list>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import { pay } from '@js/wechat/pay';
export default Vue.extend({
  name: 'IndexPage',
  components: {},
  data() {
    return {
      List: []
    };
  },
  methods: {
    async getData() {
      await this.$u.sleep(1000);
      return {
        data: [
          {
            id: 1,
            name: '张三'
          },
          {
            id: 2,
            name: '李四'
          }
        ],
        last_page: 1,
      }
    },
    async loadmore() {
      await this.$u.sleep(5000);
      return {
        data: [
          {
            id: 1,
            name: '张三'
          },
          {
            id: 2,
            name: '李四'
          }
        ],
        last_page: 1,
      }
    }
  },
  computed: {},
  mounted() {

  },
  onReady() {
    this.$refs.firework.start();
    this.$refs.loading.show();
    this.$u.sleep(200).then(() => {
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
