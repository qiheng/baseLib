/**
* 常规函数聚合
* @Author   : qh
* @Updated  : 2013-7
* @version  : v1.0
* @mail     : 626726426@qq.com
*/

;(function(win, doc){

	//var doc = win.document;
	
	/**
	* @method 命名空间函数
	* @param { String } 空间名字符串
	* @return { Object } 添加的空间名
	*/
	var MYAPP = {};
	MYAPP.nameSpace = function (ns_str) {
		var parts = ns_str.split('.'),
			parent = this,
			i = 0;
		//去除最前面的冗余全局变量
		if(parts[0] === 'MYAPP'){
			parts = parts.splice(1);
		}
		for(i = 0; i < parts.length; i++){
			//如果它不存在，就创建一个属性
			if(typeof parent[parts[i]] === 'undefined'){
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};
	
	
	/**
	==============================================================
	* @event 事件对象(Event)
	==============================================================
	*/
	
	MYAPP.nameSpace('Event');
	
	/**
	* @method 添加事件监听函数
	* @param { Object } 要添加监听的对象或元素
	* @param { String } 事件名
	* @param { Function } 监听函数
	*/
	MYAPP.Event.addEvent = function(obj, type, fn){
		if(obj.addEventListener){
			obj.addEventListener(type, fn, false);
		}else if(obj.attachEvent){
			obj.attachEvent('on' + type, function(){
				fn.apply(obj);
			});
		}else{
			obj['on' + type] = fn;
		}
	};
	
	/**
	* @method 删除事件监听函数
	* @param { Object } 要删除监听的对象或元素
	* @param { String } 事件名
	* @param { Function } 监听函数
	*/
	MYAPP.Event.removeEvent = function(obj, type, fn){
		if(obj.removeEventListener){
			obj.removeEventListener(type, fn, false);
		}else if(obj.detachEvent){
			obj.detachEvent('on' + type, fn);
		}else{
			obj['on' + type] = null
		}
	};
	
	/**
	* @method 获取事件对象
	* @param { Object } 事件对象
	* @return { Object } 事件对象
	*/
	MYAPP.Event.getEvent = function(e){
		return e ? e : win.event;
	};
	
	/**
	* @method 获取事件的目标
	* @param { Object } 事件对象
	* @return { Object } 触发事件对象的目标元素
	*/
	MYAPP.Event.getTarget = function(event){
		return event.target || event.srcElement;
	};
	
	/**
	* @method 取消默认行为
	* @param { Object } 事件对象
	*/
	MYAPP.Event.preventDefault = function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	};
	
	/**
	* @method 阻止冒泡
	* @param { Object } 事件对象
	*/
	MYAPP.Event.stopPropagation = function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	};
	
	/**
	* @method 相关元素
	* @param { Object } 事件对象
	* @return { Object } 相关元素对象
	*/
	MYAPP.Event.getRelatedTarget = function(event){
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			return event.fromElement;
		}else{
			return null;
		}
	};
	
	
	/**
	==============================================================
	* @DOM 对象
	==============================================================
	*/

	MYAPP.nameSpace('DOM');
	
	/**
	* @method 获取ID元素
	* @param { String || Object } 元素
	* @return { Object } 元素对象
	*/
	MYAPP.DOM.getById = function(vAgr){
		return typeof vAgr === 'string' ? doc.getElementById(vAgr) : vAgr;
	};
	
	/**
	* @method 获取TagName元素
	* @param { String } 元素
	* @param { Object } 元素祖父元素
	* @return { Array } 元素数组
	*/
	MYAPP.DOM.getByTagName = function(ele, oParent){
		return (oParent || doc).getElementsByTagName(ele);
	};
	
	/**
	* @method 获取ClassName元素
	* @param { String } 元素的class
	* @param { Object } 元素祖父元素
	* @param { String } 元素
	* @return { Array } 元素数组
	*/
	MYAPP.DOM.getByClass = function getByClass(className, root, tagNode){
		root = root || doc;
		tagNode = tagNode || '*';
		if(root.getElementsByClassName){
			return root.getElementsByClassName(className);
		}else{
			var result = [],
				eles = [],
				i = 0,
				pattern = new RegExp( '(\\s|^)' + className + '(\\s|$)' );
			eles = root.getElementsByTagName(tagNode);
			for(i = 0;i < eles.length; i++){
				if(pattern.test(eles[i].className)){
					result.push(eles[i]);
				}
			}
			return result;
		}
	};
	
	/**
	* @method 判断元素是否含有指定class，返回布尔值
	* @param { Object } 元素对象
	* @param { String } className
	* @return { Boolean } 布尔值
	*/
	MYAPP.DOM.hasClass = function (ele, strClass){
		return new RegExp('(\\s|^)' + strClass + '(\\s|$)').test(ele.className);
	};
	
	/**
	* @method 为元素添加指定class
	* @param { Object } 元素对象
	* @param { String } className
	*/
	MYAPP.DOM.addClass = function (ele, strClass){
		if(ele.className == ''){
			ele.className = strClass;
		}else if(!MYAPP.DOM.hasClass(ele, strClass)){
			ele.className += ' ' + strClass;
		}
	};
	
	/**
	* @method 为元素删除指定class
	* @param { Object } 元素对象
	* @param { String } className
	*/
	MYAPP.DOM.removeClass = function (ele, strClass){
		if (MYAPP.DOM.hasClass(ele,strClass)){
			if(ele.className == strClass){
				ele.className = '';
			}else{
				ele.className = ele.className.replace(new RegExp('(\\s|^)' + strClass + '(\\s|$)'), ' ');
			}
		}
	};
	
	/**
	* @method 获取元素计算后的样式
	* @param { Object } 元素对象
	* @param { String } 元素的样式属性
	* @return { String } 元素的样式属性值
	*/
	MYAPP.DOM.getStyle = function (ele, attr){
		if(ele.currentStyle){
			return ele.currentStyle[attr];
		}else{
			return getComputedStyle(ele,false)[attr];
		}
	};
	
	
	/**
	==============================================================
	* @BOM 客户端
	==============================================================
	*/
	
	MYAPP.nameSpace('BOM');
	
	/**
	* 判断是IE浏览器
	* @return { Boolean }
	*/
	MYAPP.BOM.isIE = (function(){
		//return !+[1,];  IE8以上返回false;
		//return win.ActiveXObject ? true : false;
		// 使用条件注释的IE嗅探
		return /*@cc_on!@*/false; // IE10-
	})();
	
	/**
	* 获得IE浏览器的版本号
	* @return { Number } 如:IE6 -> 6
	*/
	MYAPP.BOM.getIeVer = (function(){
		if(MYAPP.BOM.isIE){
			var ua = navigator.userAgent,
				//reg = /MSIE ([0-9]{1,}[\.0-9]{0,})/
				reg = /MSIE (\d+.\d+)/;
			return parseInt(ua.match(reg)[1]);
		}
	})();
	
	/**
	* 判断IE浏览器为IE6
	* @return { Boolean }
	*/
	MYAPP.BOM.isIE6 = (function(){
		return MYAPP.BOM.isIE && MYAPP.BOM.getIeVer === 6;
	})();
	
	/**
	* @method 获取页面视口的大小
	* @param { String } 要转换的字符串
	* @return { Object } 页面视口的宽,高
	*/
	MYAPP.BOM.viewPortSize = function(){
		var pageWidth = win.innerWidth,
			pageHeight = win.innerHeight;
		if(typeof pageWidth !== 'number'){
			pageWidth = doc.documentElement.clientWidth || doc.body.clientWidth;
			pageHeight = doc.documentElement.clientHeight || doc.body.clientHeight;
		}
		return {
			pageWidth : pageWidth,
			pageHeight : pageHeight
		}
	};
	
	/**
	* @method 获取页面元素距页面视口的距离
	* @param { Object } DOM元素
	* @return { Number } offsetLeft，offsetTop的值
	*/
	MYAPP.BOM.getOffsetPos = function(ele, pos){
		var sum = 0,
			posStr = '',
			oParent = null;
			
		// posStr = MYAPP.tools.capitalize(pos);
		posStr = {'left': 'Left', 'top': 'Top'}[pos];
		sum = ele['offset' + posStr];
		oParent = ele.offsetParent;
		
		while (!!oParent) {
			sum += oParent['offset' + posStr];
			oParent = oParent.offsetParent;
		}
		
		return sum;
	}
	
	
	
	
	/**
	==============================================================
	* @tools 工具函数(tools)
	==============================================================
	*/
	
	MYAPP.nameSpace('tools');
	
	/**
	* @method 首字母转为大写
	* @param { String } 要转换的字符串
	* @return { String } 转换后的字符，例： top => Top
	*/
	MYAPP.tools.capitalize = function(str){
		var firstChar = str.charAt(0);
		//return firstChar.toUpperCase() + str.replace(firstChar, '');
		return str.replace(firstChar, firstChar.toUpperCase());
	};
	
	/**
	* @method 数组随机排序
	* @param { Array } 随机排序的数组
	* @return { Array } 返回随机排序后的数组
	*/
	MYAPP.tools.randomFn = function (arr) {
		if (arr && Object.prototype.toString.call(arr) === '[object Array]') {
			return arr.sort(function(){
				return (Math.round(Math.random()) - 0.5);
			})
		}
		throw arr + ' is empty or not a Array!';
	}
	
	/**
	* @method 防止 IE6 的 select 穿透
	* @param { Object } DOM 元素
	*/
	MYAPP.tools.addIframe = function(ele){
		var iframe = doc.createElement('iframe');
		iframe.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; opacity:0; z-index:-1; filter:alpha(opacity=0); border:0; _position:absolute;';
		if(!!ele.children[0]){
			ele.insertBefore(iframe, ele.children[0]);
		}else{
			ele.appendChild(iframe);
		}
	};
	
	/**
	* @method 弹出遮罩层
	*/
	MYAPP.tools.addMask = function() {
		
		if(!!MYAPP.DOM.getById('maskWrap')){
			return;
		}
		
		var mask = doc.createElement('div'),
			sCss = 'position:fixed; top:0; left:0; width:100%; height:100%; background:#000; opacity:0.3; z-index:1000; filter:alpha(opacity=30); border:0; _position:absolute;';
			
		mask.id = 'maskWrap';
		mask.style.cssText = sCss;
		doc.body.appendChild(mask);
		
		if(MYAPP.BOM.isIE6){
			doc.documentElement.style.background = 'url(about:blank) fixed';
			doc.body.style.height = '100%';
			mask.style.setExpression('top', 'IE = document.documentElement.scrollTop + "px"');
			//mask.style.height = doc.body.clientHeight + 'px';
			MYAPP.tools.addIframe(mask);
		}
	};
	
	/**
	* @method 设置DOM元素自动居中定位
	* @param { Object } DOM元素
	*/
	MYAPP.tools.toCenter = function(ele){
		var style = ele.style,
			iHeight = ele.offsetHeight,
			iWidth = ele.offsetWidth;
		
		style.position = MYAPP.BOM.isIE6 ? 'absolute' : 'fixed';
		
		if(MYAPP.BOM.isIE6){
			doc.documentElement.style.background = 'url(about:blank) fixed';
			style.setExpression('top', 'IE = document.documentElement.scrollTop + parseInt(document.documentElement.clientHeight / 2) + "px"');
		}else{
			style.top = '50%';
		}
		
		style.left = '50%';
		style.marginLeft = -parseInt(iWidth / 2) + 'px';
		style.marginTop = -parseInt(iHeight / 2) + 'px';
	};
	
	
	/**
	* @method 提示信息层
	* @param { Object } 层的参数
	* @param { Function } 回调函数
	* @param { Function } 回调函数
	*/
	MYAPP.tools.confirm = function(json, fn1, fn2) {
		/*
		json {
			tit: 标题的内容,默认为"提示",
			content: 提示内容,
			noClose: 默认为false不显示; 为true时显示,
			btnPos: 默认不设置为右对齐,设'layout_lt'为左对齐,设'layout_mid'为居中对齐,
			yesBtn: 默认为false不显示; 为true时显示,
			yesTxt: 按钮文字,
			noTxt: 按钮文字
		}
		*/
		var str = '',
			strCloseBtn = '',
			strClass = '',
			fragWidth = 0,
			frag = null,
			yesBtn = null,
			noBtn = null,
			closeBtn = null;
			
		// 控制关闭按钮
		strCloseBtn = (json.noClose && typeof json.noClose === 'boolean') ? '' : '<a href="#" class="layout_close">关闭</a>';
		
		// 控制按钮的位置(默认右对齐)
		switch (json.btnPos) {
			case 'layout_lt' :
			case 'layout_mid' :
				strClass = ' ' + json.btnPos;
				break;
		}
		
		str = '<div class="layout"><div class="layout_hd">' + strCloseBtn + '<h2>' + (json.tit ? json.tit : '提示') + '</h2></div><div class="layout_bd">' + (json.content ? json.content : '') + '</div><div class="layout_btns dib-wrap' + strClass + '">' + (json.yesBtn && typeof json.yesBtn === 'boolean' ? '<a href="#" class="dib yes_btn"><span>' + (json.yesTxt ? json.yesTxt : '确定') + '</span></a>' : '') + '<a href="#" class="dib layout_btn"><span>' + (json.noTxt ? json.noTxt : '取消') + '</span></a></div></div>';
		
		frag = doc.createElement('div');	
		frag.id = 'confirmBox';			
		frag.innerHTML = str;		
		doc.body.appendChild(frag);
		
		MYAPP.tools.posLay(frag);
		
		// 关闭按钮
		closeBtn = MYAPP.DOM.getByClass('layout_close', frag)[0];
		if (!!closeBtn) {
			closeBtn.onclick = function(){
				MYAPP.tools.close(frag);
				return false;
			}
		}
		
		// 确定按钮
		yesBtn = MYAPP.DOM.getByClass('yes_btn', frag)[0];
		if (!!yesBtn) {
			yesBtn.onclick = function() {
				fn1 && (typeof fn1 === 'function') ? fn1() : MYAPP.tools.close(frag);
				return false;
			}
		}
		
		// 取消按钮
		noBtn = MYAPP.DOM.getByClass('layout_btn', frag)[0];
		if (!!noBtn) {
			noBtn.onclick = function() {
				fn2 && (typeof fn2 === 'function') ? fn2() : MYAPP.tools.close(frag);
				return false;
			}
		}
		
	};
	
	/**
	* @method 提示信息层
	* @param { Object } 层的参数
	*/
	MYAPP.tools.dialog = function(json) {
		/*
		json {
			hasTit: 默认为fasle不显示; 为true时显示,
			tit: 标题的内容,默认为"提示",
			content: 提示内容,
			noClose: 默认为false不显示; 为true时显示,
			hasMask: true为有遮罩层, false为无
		}
		*/
		var frag = '',
			str = '',
			timeId = null,
			closeBtn = null;

		str = '<div class="layout">' 
				+ (json.hasTit && typeof json.hasTit === 'boolean' ? '<div class="layout_hd">' + (json.noClose && typeof json.noClose === 'boolean' ? '' : '<a href="#" class="layout_close">关闭</a>') + '<h2>' + (json.tit ? json.tit : '提示') + '</h2></div>' : '') 
				+ '<div class="layout_bd">' + (json.content ? json.content : '') + '</div></div>';
		
		frag = document.createElement('div');
		frag.id = 'dialog';
		frag.innerHTML = str;
		doc.body.appendChild(frag);
		
		MYAPP.tools.posLay(frag, false, function() {
			var _this = this;
			clearTimeout(timeId);
			timeId = setTimeout(function() {
				MYAPP.tools.close(_this);
			}, 3000)
		});
		
		// 关闭按钮
		closeBtn = MYAPP.DOM.getByClass('layout_close', frag)[0];

		if (!!closeBtn) {
			closeBtn.onclick = function(){
				clearTimeout(timeId);
				MYAPP.tools.close(frag);
				return false;
			}
		}

	};
	
	/**
	* @method 定位层
	* @param { Object } DOM元素(定位层对象)
	* @param { Boolean } 确定给定位层对象添加自定义属性判断是否是切换显示隐藏,还是添加到页面
	* @param { Function } 回调函数(函数的作用域为定位层对象)
	*/
	MYAPP.tools.posLay = function (ele, toggle, fn) {
		
			var oMask = MYAPP.DOM.getById('maskWrap'),
				zIndex = 0;
			
			// 添加遮罩层
			if (!oMask) {
				MYAPP.tools.addMask();
				oMask = MYAPP.DOM.getById('maskWrap');
			}
			
			// 遮罩层共用的次数
			oMask.count = oMask.count ? parseInt(oMask.count) + 1 : '1';
			
			zIndex = parseInt(MYAPP.DOM.getStyle(oMask, 'zIndex'));
			ele.style.zIndex = ++zIndex;
		
		// 确定给定位层对象添加自定义属性,判断是否是切换显示隐藏,还是添加到页面
		if (!!toggle && typeof toggle === 'boolean') {
			ele.style.display = 'block';
			!ele.getAttribute('toggle') ? ele.setAttribute('toggle', 'true') : '';
		}else {
			var iWidth = ele.children[0].offsetWidth;
			ele.style.width = iWidth + 'px';
			!ele.getAttribute('toggle') ? ele.setAttribute('toggle', 'false') : '';
		}
		
		// 定位弹框到垂直居中
		MYAPP.tools.toCenter(ele);
		
		fn && (typeof fn === 'function') ? fn.call(ele) : '';
	}
	
	/**
	* @method 关闭层
	* @param { Object } DOM元素(为关闭层对象)
	*/
	MYAPP.tools.close = function (ele) {
		var LayoutBox = typeof ele === 'string' ? MYAPP.DOM.getById(ele) : ele,
			maskWrap = MYAPP.DOM.getById('maskWrap'),
			yesBtn = MYAPP.DOM.getByClass('yes_btn', ele)[0],
			noBtn = MYAPP.DOM.getByClass('layout_btn', ele)[0],
			closeBtn = MYAPP.DOM.getByClass('layout_close', ele)[0],
			attr = '';
			
		// 判断弹框是否是切换显示隐藏,还是添加到页面的自定义属性
		if (!!LayoutBox) {
			attr = LayoutBox.getAttribute('toggle');
			if (attr === 'true') {
				LayoutBox.style.display = 'none';
			}else if (attr === 'false') {
				LayoutBox.parentNode.removeChild(LayoutBox);
			}
		}
		
		// 确定遮罩层被几个弹框共用,为1的话没有共用,可以直接删除遮罩层;大于1为共用，则共用值减1,去除弹框对遮罩层的引用
		if (!!maskWrap) {
			var count = parseInt(maskWrap.count);
			if (count === 1) {
				maskWrap.parentNode.removeChild(maskWrap);
			}else {
				maskWrap.count = --count;
			}
		}
		
		// 释放内存
		yesBtn ? yesBtn.onclick = null : '';
		noBtn ? noBtn.onclick = null : '';
		closeBtn ? closeBtn.onclick = null : '';
		LayoutBox = maskWrap = closeBtn = yesBtn = noBtn = null;
	};
	
	
	/**
	==============================================================
	* @animate 动画
	==============================================================
	*/

	MYAPP.nameSpace('animate');
	
	/**
	* @method 缓冲运动的函数
	* @param { Object } 需要运动的 DOM 元素
	* @param { Object } 运动方式的 json 数据
	* @param { Function }	运动完毕后的回调函数
	*/
	MYAPP.animate.buffer = function(ele, json, callBack){
		clearInterval(ele.timer);
		ele.timer = setInterval(function(){
			var stop = true;
			for(var attr in json){
				var cur = 0;
				if(attr == 'opacity'){
					cur = parseInt(parseFloat(MYAPP.DOM.getStyle(ele, attr)) * 100);
				} else {
					cur = parseInt(MYAPP.DOM.getStyle(ele, attr));
				}

				var speed = (json[attr] - cur) / 8;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

				if(cur != json[attr]){
					stop = false;
				}
				if(attr == 'opacity'){
					ele.style.filter = 'alpha(opacity=' + (cur + speed) + ')';
					ele.style.opacity = (cur + speed) / 100;
				} else {
					ele.style[attr] = cur + speed + 'px';
				}
			}
			if(stop){
				clearInterval(ele.timer);
				if(callBack){
					fn();
				}
			}
		}, 16);
	};

	/**
	* @method 震动函数
	* @param { Object } 元素对象
	* @param { Function } 回调函数
	* @param { Number } 震动的距离,默认为5像素
	* @param { Number } 震动时间,默认为500毫秒
	*/
	MYAPP.animate.shake = function (ele, callBack, distance, time){
	
		ele = typeof ele === 'string' ? MYAPP.DOM.getById(ele) : ele;
		time = time || 500;
		distance = distance || 5;
		
		var originalStyle = ele.style.cssText, //保存elem的原始style
			start = (new Date()).getTime(); //动画开始的时间
			
		ele.style.position = 'relative'; //是elem相对定位
		animate();
		
		function animate(){
			var now = (new Date()).getTime(),
				elapsed = now - start,
				fraction = elapsed / time;
			
			if(fraction < 1){
				var x = distance * Math.sin(fraction * 4 * Math.PI);
				ele.style.left = x + 'px';
				setTimeout(animate,Math.min(25, time - elapsed));
			}else{
				ele.style.cssText = originalStyle;
				if(callBack && typeof callBack === 'function'){
					callBack();
				}
			}
		};
	};
	
	

	//
	win.QH = {
		Event    : MYAPP.Event,
		DOM      : MYAPP.DOM,
		BOM      : MYAPP.BOM,
		tools    : MYAPP.tools,
		animate  : MYAPP.animate
	};
	
})(window, document)
