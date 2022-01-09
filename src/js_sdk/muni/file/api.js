import { pathToBase64 } from '.';
/**
 *
 * @param {*} url 后台地址
 * @param {*} fileURL 文件的临时路径
 * @param {*} payload 额外载荷
 */
export function uploadFile(url, fileURL, payload) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url,
      filePath: fileURL,
      formData: payload,
      success: resolve,
      fail: reject
    });
  });
}

/**
 * 从网络上下载文件
 * @param {*} url 资源的路径
 */
export function downloadFile(url) {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url,
      success: resolve,
      fail: reject
    });
  });
}

export function toBase64(img) {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: img,
      success: async image => {
        const base64 = await pathToBase64(image.path);
        resolve(base64);
      },
      fail: err => {
        reject('将本地图片转为base 64报错:', err);
      }
    });
  });
}


/**
 * Base64转文件对象
 */
export function convertToFile(base64) {
  let arr = base64.split(',');
  let mime = arr[0].match(/:(.*?);/)[1]; // 获取文件的mime类型
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n); // 字节流数组
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n); // 逐字节编码
  }
  return new File([u8arr], '', {
    type: mime
  }); // 返回文件对象
}