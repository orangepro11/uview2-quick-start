import { isAmount, isImage } from '@/helpers/erp/validator';

export default {
  preview: [
    {
      required: true,
      asyncValidator: (rule, value, callback) => {
        if (isImage(value)) {
          return callback();
        } else {
          return callback(new Error('请上传图片'));
        }
      }
    }
  ],
  title: [
    {
      required: true,
      type: 'string',
      message: '请输入货品名称'
    }
  ],
  code: [
    {
      required: false,
      type: 'string'
    }
  ],
  unit: [
    {
      required: false,
      type: 'string'
    }
  ],
  price: [
    {
      required: true,
      message: '请输入货品价格'
    },
    {
      asyncValidator: (rule, value, callback) => {
        if (isAmount(value)) {
          return callback();
        } else {
          return callback(new Error('请输入正确的金额'));
        }
      }
    }
  ]
};
