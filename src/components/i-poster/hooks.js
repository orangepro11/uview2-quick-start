export default {
	mounted() {
		this.context = uni.createCanvasContext(this.id, this);
		this.context_ewm = uni.createCanvasContext(this.ewm_id, this);
	},
}