<template>
  <div>
    <erp-navbar title="修改货品" @back="onBack" />
    <div class="form-wrapper">
      <u-form class="form" labelPosition="left" :model="form" :rules="rules" ref="uForm" labelWidth="140" error-type="toast">
        <u-form-item label="货品图片" prop="preview" borderBottom ref="item1">
          <image :src="form.preview || require('@/static/erp/goods/upload.png')" class="upload-image" @click="showPopUp = true" />
        </u-form-item>

        <u-popup :show="showPopUp" @close="showPopUp = false" :round="true" borderRadius="20">
          <erp-upload @upload="onUploadPreview" />
        </u-popup>

        <u-form-item label="货品名称" prop="title" borderBottom>
          <div class="choose-goods">
            <u-input border="none" v-model="form.title" placeholder="请输入货品名称" input-align="center"></u-input>
            <image src="@/static/erp/goods/scan.png" class="scan" />
          </div>
        </u-form-item>

        <u-form-item label="货品编码" prop="code" borderBottom>
          <u-input placeholder="可选" border="none" input-align="right"></u-input>
        </u-form-item>

        <u-form-item label="单位" prop="title" borderBottom>
          <u-input v-model="form.unit" placeholder="请选择单位,默认 个" border="none" input-align="right"></u-input>
        </u-form-item>

        <u-form-item label="当前市场价格(¥)" prop="title" borderBottom>
          <u-input v-model="form.price" placeholder="请输入市场单价" border="none" input-align="right"></u-input>
        </u-form-item>
      </u-form>

      <erp-fixed-bottom>
        <view style="padding: 10rpx 20rpx 10rpx">
          <erp-button @click="onSubmit">确定</erp-button>
        </view>
      </erp-fixed-bottom>
    </div>
  </div>
</template>

<script lang="ts">
import { Create, Get, Update } from '@/model/erp/Goods';
import Vue from 'vue';
import validator from './validator';
export default Vue.extend({
  name: 'CreateGoodsPage',
  components: {},
  onLoad({ id }: any) {
    this.goods_id = id;
  },
  data() {
    return {
      form: {
        preview: '',
        title: '',
        code: '',
        unit: '',
        price: 0
      },
      rules: validator,
      showPopUp: false,
      goods_id: 0
    };
  },
  methods: {
    onUploadPreview(url): void {
      this.form.preview = url;
      this.showPopUp = false;
      this.$toast.success('上传成功');
    },
    onSubmit() {
      if (this.form.unit === '') {
        this.form.unit = '个';
      }
      const { uForm } = this.$refs;
      uForm &&
        uForm
          .validate()
          .then(Update(this.form))
          .then(() => this.$toast.success('修改商品成功'))
          .then(() => uni.navigateBack())
          .catch(e => this.$toast.error(e || '请求失败'));
    },
    onBack() {
      this.$alert('放弃所有修改并返回吗')
        .then(uni.navigateBack)
        .catch(Function.prototype);
    }
  },
  computed: {},
  mounted() {
    Get(this.goods_id).then(res => {
      this.form = res;
    });
  },
  onReady() {
    this.$nextTick(() => {
      const { uForm } = this.$refs;
      uForm && uForm.setRules(this.rules);
    });
  },
  onPullDownRefresh() {
    Get(this.goods_id).then(res => {
      this.form = res;
      uni.stopPullDownRefresh();
    });
  }
});
</script>

<style>
page {
  background: #f4f4f4;
}
</style>

<style lang="scss" scoped>
.form-wrapper {
  padding: 20rpx;
  .form {
    background: #fff;

    .u-form-item {
      padding-right: 20rpx;
      ::v-deep .u-form-item__body__right__content__slot {
        justify-content: flex-end;
      }
      ::v-deep .u-form-item__body__left__content__label {
        padding-left: 20rpx;
        font-size: 30rpx;
        font-weight: bold;
        color: #111111;
      }
    }

    .upload-image {
      width: 70rpx;
      height: 70rpx;
    }
    .choose-goods {
      display: flex;
      .tips {
        font-size: 26rpx;
        font-weight: normal;
        color: #999999;
      }
      .scan {
        width: 45rpx;
        height: 45rpx;
        margin-left: 20rpx;
      }
    }
  }
}
</style>
