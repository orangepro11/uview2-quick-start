export default {
	props: {
    jackPot: {
      type: Array,
      default: () => []
    },
    finalResult: {
      type: Object,
      default: () => {}
		},
		title: {
			type: String,
			default: '正在抽奖中'
		}
  }
}