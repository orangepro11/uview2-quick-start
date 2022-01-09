/**
 * 检测当前是否为微信浏览器
 * @returns Boolean 是否微信浏览器
 */
export function isWechat() {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
}
