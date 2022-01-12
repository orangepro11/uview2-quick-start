<template>
  <div class="tabbbar-wrapper">
    <div class="placeholder"></div>
    <div class="i-tabbar">
      <div class="cu-bar tabbar bg-white">
        <div :class="['action', index == 0 ? 'text-green' : 'text-gray']" @click="toggle(0)">
          <div :class="index == 0 ? 'cuIcon-homefill' : 'cuIcon-home'"></div>
          首页
        </div>
        <div class="action text-gray" @click="toggle(1)">
          <div class="cuIcon-similar"></div>
          分类
        </div>
        <div class="action text-gray add-action" @click="toggle(2)">
          <button class="cu-btn cuIcon-add bg-green shadow"></button>
          发布
        </div>
        <div :class="['action', index == 3 ? 'text-green' : 'text-gray']" @click="toggle(3)">
          <div :class="index == 3 ? 'cuIcon-cartfill' : 'cuIcon-cart'">
            <div class="cu-tag badge">99</div>
          </div>
          购物车
        </div>
        <div :class="['action', index == 4 ? 'text-green' : 'text-gray']" @click="toggle(4)">
          <div :class="index == 4 ? 'cuIcon-myfill' : 'cuIcon-my'">
            <div class="cu-tag badge">12</div>
          </div>
          我的
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const List = ['pages/index/index', 'pages/category/category', 'pages/publish/publish', 'pages/cart/cart', 'pages/my/my'];

import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'MuniTabbar',
  options: {
    virtualHost: true
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters('tabs', ['index'])
  },
  methods: {
    toggle(index) {
      this.setTabIndex(index); // 这是全局混入的方法，用来更新tabbar
      uni.redirectTo({
        url: '/' + List[index]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.placeholder {
  height: 60px;
}
.i-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
