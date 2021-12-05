import Vue from 'vue';

export function alert(content: any, showCancel?: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    uni.showModal({
      title: '温馨提示',
      content,
      showCancel,
      success: ({ confirm }) => {
        confirm ? resolve('ok') : null;
      },
      fail: () => {
        reject('error');
      }
    });
  });
}

function install() {
  Vue.prototype.$alert = alert;
}

export default install;
