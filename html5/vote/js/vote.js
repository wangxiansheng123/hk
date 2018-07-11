//JS动态设置根Html值
((doc, win) => {
	const docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = () => {
			let clientWidth = document.documentElement.offsetWidth ? document.documentElement.offsetWidth : document.body.offsetWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		};
	//首次加载执行方法
	recalc();
	if(!doc.addEventListener) return;
	//监听变化
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
	//当dom加载完成时，或者 屏幕垂直、水平方向有改变进行html的根元素计算
})(document, window);