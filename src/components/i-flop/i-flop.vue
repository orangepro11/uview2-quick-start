<template>
  <view class="curin-index" v-if="show_page">
    <view @click="tamin(index)" v-for="(item, index) in jackPot" :key="index" class="currin" :class="[really == index + 1 ? 'animt' : '', really != index + 1 && surplus ? 'animt' : '', really == '' ? 'cinton' + (index + 1) : '', really == index + 1 && implement > 1 ? 'selected' : 'un-selected']"> {{ really == index + 1 ? flop : '' }}{{ really != index + 1 && really != '' ? biutin : '' }}{{ really == '' ? '点击翻开' : '' }} </view>
  </view>
</template>

<script>
/**
 * @description 抽奖组件，待完善
 */

import props from './props';
import utils from './utils';

export default {
  mixins: [props, utils]
};
</script>

<style lang="scss" scoped>
@import 'flop.scss';
</style>
