// 这个文件是个示例，你可以任意的修改或删除它们

import { curry } from 'lodash-es';

/**
 * 剪切指定长度的字符串，如果超出将在末尾添加省略号
 * @param str 原始字符串
 * @param len 长度
 */
export function cutString(str: string, len: number): string {
  if (str.length <= len) {
    return str;
  }
  return str.slice(0, len) + '...';
}

/**
 * 柯里化后的匹配函数
 * 柯里化指的是将多个参数的函数转换成一个新的函数
 * 即函数可以接收一个或多个参数，但是只有最后一个参数是函数时，才能接收函数
 * @param reg 正则表达式
 * @param str 要匹配的字符串
 * @example match(/\d+/g)('123abc') => ['123']
 */
export const match = curry(function(reg, str) {
  return str.match(reg);
});

/**
 * 这是一个获取简单uuid的函数，你可以使用uuidV4库代替它
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
