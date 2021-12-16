export default {
	data() {
		return {
			id: 'CANVAS_DRAWER', //这个ID是死的，不能在页面上使用:canvas-id设置canvas-id否则在小程序中会出现空白canvas问题。
			ewm_id: 'CANVAS_EWM_DRAWER', //这个ID是死的，不能在页面上使用:canvas-id设置canvas-id否则在小程序中会出现空白canvas问题。
			src: '', //当且仅当draw方法成功调用时此属性才会为canvas当前的url。
			context: null, //当前canvas对象的CanvasContext对象，在组件加载成功后会自动赋值。
			context_ewm: null,
			backgroundColor: '', //背景色，请使用setBackgroundColor方法设置。如果该值为空，则表示该canvas没有画背景色。
			waitingList: [], //所有待渲染数据。只有在调用draw方法时才会进行渲染。
			imageCachePool: [] //图片缓存库，存储图片的信息以避免图片的二次加载
		};
	},
}