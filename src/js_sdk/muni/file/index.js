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
