export function WxPay(config) {
	if(!window.WeixinJSBridge) {
		console.error("请在微信浏览器中打开");
		return;
	}
	return new Promise((resolve,reject) => {
		WeixinJSBridge.invoke("getBrandWCPayRequest", config, res => {
			if(res.errMsg != 'get_brand_wcpay_request:ok') {
				reject('支付失败');
			} else {
				resolve();
			}
		});
	})
}
