let token = '';
let token_expired_at = '';

const checkIsLogin = async () => {
	token = await uni.$m.getStorage('token');
	token_expired_at = await uni.$m.getStorage('token_expired_at');

	if(!token || !token_expired_at || token_expired_at < new Date().getTime()) {
		return false;
	}

	return true;
}


const setLoginInfo = async (token,expired_at) => {
	await uni.$m.setStorage('token', token);
	await uni.$m.setStorage('token_expired_at', token_expired_at);
}

const isEmpty = (obj) => {
  return obj && Object.keys(obj).length == 0 || !obj.hasOwnProperty('id') || obj["id"] == 0;
}


const getUserInfo = async (token) => {
	return {
		id: 1,
		username: '不爱喝橙子汁',
	}
}

export default {
	data() {
		return {

		}
	},
	methods: {
		async $auth(token,expired_at) {
			if(token && expired_at) {
				await setLoginInfo(token, expired_at);
			}
			if(await checkIsLogin()) {
				this.UserInfo = getUserInfo(token);
				return true;
			} else {
				return false;
			}
		},
		async getUserInfo() {
			if(await this.$auth()) {
				return getUserInfo(token);
			} else {
				console.warn('用户尚未登录，请跳到登录页让用户授权,此方法会返回false，可直接作为判断依据');
				return false;
			}
		}
	}
}
