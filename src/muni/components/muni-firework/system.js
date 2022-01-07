const minBrowserRefreshTime =
  (window && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame)) ||
  function(t) {
    setTimeout(t, 1e3 / 60);
  };
const systemInfo = uni.getSystemInfoSync();

export {
	minBrowserRefreshTime,
	systemInfo
}