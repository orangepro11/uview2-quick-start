export default {
	data() {
		return {
			whether: false,
			flop: '点击翻开',
			implement: 0,
			surplus: false,
			biutin: '点击翻开',
			list: [],
		}
	},
	methods: {
		again(e) {
			if (this.implement == 3 || this.implement == 0) {
				this.whether = false
				this.flop = '点击翻牌'
				this.really = ''
				this.implement = 0
				this.surplus = false
				this.biutin = '点击翻牌'
			} else {
				uni.showToast({
					title: '正在执行抽奖中...',
					icon: 'none',
					duration: 2000,
				})
				return false
			}
		},
		tamin(index) {
			if (this.really == '') {
				this.whether = true
				this.really = index + 1
				this.implement = 1
		
				setTimeout(res => {
					this.flop = ''
				}, 500)
		
				setTimeout(res => {
					this.flop = this.result
					this.implement = 2
				}, 1200)
		
			}
		},
	}
}