/**
 * 此为腾讯微信支付接口，不建议直接挂载到全局对象上，在需要的时候直接引入即可 
 * @author 不爱喝橙子汁
 * @version 1.0.0
 */

/**
 * 检测当前是否为微信浏览器
 * @returns Boolean 是否微信浏览器
 */
function isWechat() {
	return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
}


/**
 * 该方法用于在微信浏览器中唤起支付，参数说明如下：
 * appId: 公众号名称，由商户传入
 * timeStamp: 时间戳，自1970年以来的秒数
 * nonceStr: 随机串
 * package: 商品ID，由商户传入
 * signType: 微信签名方式：
 * paySign: 微信签名
 * @param {Object} config 唤起支付所需要的传输，一般由后台传即可
 * @returns {Promise<string>} 支付状态 ok/cancel/fail
 */
export function pay(config) {
	if (!isWechat()) {
		return Promise.reject('请在微信浏览器中打开');
	}

	/**
	 * 闭包函数，用于获取支付状态
	 * @returns {Promise<string>} 支付状态 ok/cancel/fail
	 */
	function onBridgeReady() {
		return new Promise((resolve, reject) => {
			WeixinJSBridge.invoke('getBrandWCPayRequest', config, (res) => {
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					resolve('ok');
				} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
					reject('cancel');
				} else {
					reject('fail');
				}
			});
		});
	}


	if (typeof WeixinJSBridge === 'undefined') {
		// 如果没有WeixinJSBridge，则说明不是在微信中打开的
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if (document.attachEvent) {
			// 如果是IE浏览器，则直接调用onBridgeReady
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		} else {
			// 否则，直接调用onBridgeReady
			return onBridgeReady();
		}
	}
}