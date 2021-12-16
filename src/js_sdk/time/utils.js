import dayjs from "dayjs";

/**
 * 获取当前时间戳
 * @returns 当前时间戳
 */
export function now() {
	return Number(new Date());
}

/**
 * 
 * @param {*} date Date对象
 * @param {*} format  格式化字符串
 * @returns 
 * @example format(new Date(), '{YYYY} MM-DDTHH:mm:ss SSS [Z] A')
 */
export function format(date, format) {
	return dayjs(date).format(format);
}

export default {
	now,
	format
}
