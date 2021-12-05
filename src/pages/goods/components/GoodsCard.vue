<template>
  <div class="goods-card" style="height: 150rpx">
    <u-image class="preview" width="150rpx" height="150rpx" :src="goods.preview"></u-image>
    <div class="right">
      <div class="content">
        <div class="item">
          <div class="tips">货品名称:</div>
          <div class="value">{{ goods.title }}</div>
        </div>
        <div class="item">
          <div class="tips">编码:</div>
          <div class="value">{{ goods.code }}</div>
        </div>
        <div class="item">
          <div class="tips">价格(元):</div>
          <div class="value">{{ goods.price / 100 }}</div>
        </div>
      </div>
      <div class="option">
        <div class="edit" @click="$emit('edit')">修改</div>
        <div class="delete" @click="$emit('delete')">删除</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Goods } from '@/model/erp/Goods';
import Vue, { PropType } from 'vue';
export default Vue.extend({
  name: '',
  components: {},
  props: {
    goods: {
      type: Object as PropType<Goods>,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {}
});
</script>

<style lang="scss" scoped>
.goods-card {
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 10rpx;
  padding: 17rpx 14rpx;
  margin-bottom: 20rpx;
  .preview {
    flex-shrink: 0;
  }
  .right {
    margin-left: 18rpx;
    flex: 1;
    display: flex;
    flex-direction: row;
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .item {
        display: flex;
        font-size: 26rpx;
        height: 100%;
        .tips {
          color: #111111;
          font-weight: bold;
        }
        .value {
          color: #333333;
          font-weight: normal;
          margin-left: 13rpx;
        }
      }
    }

    .option {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-top: 20rpx;
      .edit {
        @include dashed-button(#1c97ff);
      }
      .delete {
        @include dashed-button(#ff0000);
        margin-top: 22rpx;
      }
    }
  }
}
</style>
