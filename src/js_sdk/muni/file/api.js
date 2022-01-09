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
