webpackJsonp([1],{0:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var i=n(1),o=r(i),a=n(31);r(a);n(170),n(171),n(206);var u=n(215),c=document.getElementById("container");(0,a.render)(o.default.createElement(u.Carousel,null),c)},170:function(e,t){"use strict";!function(e,t){var n=e.documentElement,r="orientationchange"in window?"orientationchange":"resize",i=function(){var e=document.querySelector("body").offsetWidth;e&&(n.style.fontSize=100*(e/750)+"px")};i(),e.addEventListener&&(t.addEventListener(r,i,!1),e.addEventListener("DOMContentLoaded",i,!1))}(document,window)},171:function(e,t){},177:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.IsLoading=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),s=r(c);n(178);var l=function(e){function t(e){return i(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return a(t,e),u(t,[{key:"render",value:function(){return s.default.createElement("div",{className:"is-loading"},s.default.createElement("em",null),s.default.createElement("span",null,"加载中...."))}}]),t}(c.Component);t.IsLoading=l},178:171,183:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Api=void 0;var i=n(184),o=r(i),a="http://10.1.0.208:80",u=function(e){var t=o.default.Deferred(),n=function(e){t.resolve(e)},r=function(e){t.reject(e)};return e.url.indexOf("http://")>-1?(o.default.ajax({type:e.method,url:e.url,contentType:"application/x-www-form-urlencoded;charset=UTF-8",data:e.params,success:function(e){var t=void 0;try{t=JSON.parse(e)}catch(n){t=e}n(t)},error:function(e){r(e)}}).done(function(e){var t=void 0;try{t=JSON.parse(e)}catch(n){t=e}n(t)}).fail(function(e){r(e)}),t):(o.default.ajax({type:e.method,url:a+e.url,contentType:"application/json;charset=UTF-8",data:e.params,success:function(e){var t=void 0;try{t=JSON.parse(e)}catch(n){t=e}n(t)},error:function(e){r(e)}}).done(function(e){var t=void 0;try{t=JSON.parse(e)}catch(n){t=e}n(t)}).fail(function(e){r(e)}),t)};t.Api=u},187:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.CheckPhone=t.NoRepeat=t.FormatTime=t.Tip=t.isMobile=void 0;var i=n(184),o=r(i);t.isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},AndroidApp:function(){return navigator.userAgent.match(/Android/i)&&navigator.userAgent.match(/Adr/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},iOSApp:function(){return navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},Firefox:function(){return navigator.userAgent.indexOf("Firefox")>-1},QQ:function(){return navigator.userAgent.indexOf("QQ")>-1},WeChat:function(){var e=navigator.userAgent.match(/MicroMessenger/i);return e},AlipayChat:function(){var e=navigator.userAgent.match(/AlipayClient/i);return e&&store.remove("IS_APP"),e},APP:function(){var e=config.setting.is_app||store.get("IS_APP"),t=window.location.hash,n=window.location.search,r=n+t;return e?e:r.indexOf("platform=android")>-1?(store.set("IS_APP","android"),"android"):r.indexOf("platform=ios")>-1&&(store.set("IS_APP","ios"),"ios")},onlineApp:function(){return!(!this.APP()||window.cordova)},localApp:function(){return!!(this.APP()&&window.cordova&&window.sf)},any:function(){return this.Android()||this.BlackBerry()||this.iOS()||this.Opera()||this.Windows()||this.Firefox()}},t.Tip=function(e,t){var n=(0,o.default)('<div class="dialog-cart"><div class="dialog-cart-inner"><span>'+e+"</span></div></div>");return!((0,o.default)(".dialog-cart").length>0)&&((0,o.default)(document.body).append(n),void setTimeout(function(){n.animate({opacity:0},300,function(){n.remove()})},t||"1500"))},t.FormatTime=function(e){e=new Date(parseInt(e));var t=e.getFullYear(),n=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,r=e.getDate()<10?"0"+e.getDate():e.getDate(),i=e.getHours()<10?"0"+e.getHours():e.getHours(),o=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),a=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return t+"-"+n+"-"+r+" "+i+":"+o+":"+a},t.NoRepeat=function(e){for(var t=[],n=0;n<e.length;n++)t.indexOf(e[n])==-1&&t.push(e[n]);return t},t.CheckPhone=function(e){return/^1\d{10}$/.test(e)}},188:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.encription=t.parseQueryString=void 0;var i=n(189),o=r(i);t.parseQueryString=function(e){var t=/^[^\?]+\?([\w\W]+)$/,n=/([^&=]+)=([\w\W]*?)(&|$|#)/g,r=t.exec(e),i={};if(r&&r[1])for(var o=r[1],a=void 0;null!=(a=n.exec(o));)i[a[1]]=decodeURIComponent(a[2]);return i},t.encription=function(e){var t="00BE62201707188DE8A63ZGH66D46yTXNREG1423",n="key="+t+"&body="+JSON.stringify(e);return(0,o.default)(n)}},189:function(e,t,n){var r;!function(i){"use strict";function o(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function a(e,t){return e<<t|e>>>32-t}function u(e,t,n,r,i,u){return o(a(o(o(t,e),o(r,u)),i),n)}function c(e,t,n,r,i,o,a){return u(t&n|~t&r,e,t,i,o,a)}function s(e,t,n,r,i,o,a){return u(t&r|n&~r,e,t,i,o,a)}function l(e,t,n,r,i,o,a){return u(t^n^r,e,t,i,o,a)}function d(e,t,n,r,i,o,a){return u(n^(t|~r),e,t,i,o,a)}function f(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;var n,r,i,a,u,f=1732584193,p=-271733879,v=-1732584194,m=271733878;for(n=0;n<e.length;n+=16)r=f,i=p,a=v,u=m,f=c(f,p,v,m,e[n],7,-680876936),m=c(m,f,p,v,e[n+1],12,-389564586),v=c(v,m,f,p,e[n+2],17,606105819),p=c(p,v,m,f,e[n+3],22,-1044525330),f=c(f,p,v,m,e[n+4],7,-176418897),m=c(m,f,p,v,e[n+5],12,1200080426),v=c(v,m,f,p,e[n+6],17,-1473231341),p=c(p,v,m,f,e[n+7],22,-45705983),f=c(f,p,v,m,e[n+8],7,1770035416),m=c(m,f,p,v,e[n+9],12,-1958414417),v=c(v,m,f,p,e[n+10],17,-42063),p=c(p,v,m,f,e[n+11],22,-1990404162),f=c(f,p,v,m,e[n+12],7,1804603682),m=c(m,f,p,v,e[n+13],12,-40341101),v=c(v,m,f,p,e[n+14],17,-1502002290),p=c(p,v,m,f,e[n+15],22,1236535329),f=s(f,p,v,m,e[n+1],5,-165796510),m=s(m,f,p,v,e[n+6],9,-1069501632),v=s(v,m,f,p,e[n+11],14,643717713),p=s(p,v,m,f,e[n],20,-373897302),f=s(f,p,v,m,e[n+5],5,-701558691),m=s(m,f,p,v,e[n+10],9,38016083),v=s(v,m,f,p,e[n+15],14,-660478335),p=s(p,v,m,f,e[n+4],20,-405537848),f=s(f,p,v,m,e[n+9],5,568446438),m=s(m,f,p,v,e[n+14],9,-1019803690),v=s(v,m,f,p,e[n+3],14,-187363961),p=s(p,v,m,f,e[n+8],20,1163531501),f=s(f,p,v,m,e[n+13],5,-1444681467),m=s(m,f,p,v,e[n+2],9,-51403784),v=s(v,m,f,p,e[n+7],14,1735328473),p=s(p,v,m,f,e[n+12],20,-1926607734),f=l(f,p,v,m,e[n+5],4,-378558),m=l(m,f,p,v,e[n+8],11,-2022574463),v=l(v,m,f,p,e[n+11],16,1839030562),p=l(p,v,m,f,e[n+14],23,-35309556),f=l(f,p,v,m,e[n+1],4,-1530992060),m=l(m,f,p,v,e[n+4],11,1272893353),v=l(v,m,f,p,e[n+7],16,-155497632),p=l(p,v,m,f,e[n+10],23,-1094730640),f=l(f,p,v,m,e[n+13],4,681279174),m=l(m,f,p,v,e[n],11,-358537222),v=l(v,m,f,p,e[n+3],16,-722521979),p=l(p,v,m,f,e[n+6],23,76029189),f=l(f,p,v,m,e[n+9],4,-640364487),m=l(m,f,p,v,e[n+12],11,-421815835),v=l(v,m,f,p,e[n+15],16,530742520),p=l(p,v,m,f,e[n+2],23,-995338651),f=d(f,p,v,m,e[n],6,-198630844),m=d(m,f,p,v,e[n+7],10,1126891415),v=d(v,m,f,p,e[n+14],15,-1416354905),p=d(p,v,m,f,e[n+5],21,-57434055),f=d(f,p,v,m,e[n+12],6,1700485571),m=d(m,f,p,v,e[n+3],10,-1894986606),v=d(v,m,f,p,e[n+10],15,-1051523),p=d(p,v,m,f,e[n+1],21,-2054922799),f=d(f,p,v,m,e[n+8],6,1873313359),m=d(m,f,p,v,e[n+15],10,-30611744),v=d(v,m,f,p,e[n+6],15,-1560198380),p=d(p,v,m,f,e[n+13],21,1309151649),f=d(f,p,v,m,e[n+4],6,-145523070),m=d(m,f,p,v,e[n+11],10,-1120210379),v=d(v,m,f,p,e[n+2],15,718787259),p=d(p,v,m,f,e[n+9],21,-343485551),f=o(f,r),p=o(p,i),v=o(v,a),m=o(m,u);return[f,p,v,m]}function p(e){var t,n="";for(t=0;t<32*e.length;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}function v(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;for(t=0;t<8*e.length;t+=8)n[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return n}function m(e){return p(f(v(e),8*e.length))}function g(e,t){var n,r,i=v(e),o=[],a=[];for(o[15]=a[15]=void 0,i.length>16&&(i=f(i,8*e.length)),n=0;16>n;n+=1)o[n]=909522486^i[n],a[n]=1549556828^i[n];return r=f(o.concat(v(t)),512+8*t.length),p(f(a.concat(r),640))}function h(e){var t,n,r="0123456789abcdef",i="";for(n=0;n<e.length;n+=1)t=e.charCodeAt(n),i+=r.charAt(t>>>4&15)+r.charAt(15&t);return i}function y(e){return unescape(encodeURIComponent(e))}function b(e){return m(y(e))}function w(e){return h(b(e))}function _(e,t){return g(y(e),y(t))}function E(e,t){return h(_(e,t))}function I(e,t,n){return t?n?_(t,e):E(t,e):n?b(e):w(e)}r=function(){return I}.call(t,n,t,e),!(void 0!==r&&(e.exports=r))}(void 0)},190:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.registerNativeFun=t.nativeFun=void 0;var i=n(187),o=n(191),a=r(o),u=function(e){var t=function(e){if(window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)};i.isMobile.Android()?(e=JSON.stringify(e),JSInterface.nativeFunction(e)):i.isMobile.iOS()&&t(function(t){t.callHandler(e.funName,e.params,function(e){console.log("JS received response:",e)})})},c=function(e){var t=function(e){if(window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)};i.isMobile.iOS()&&t(function(t){t.registerHandler(e.funName,function(e){var t=a.default.get("userId");e?t?t!=e.userId&&(a.default.remove("userId"),a.default.set("userId",e.userId),window.location.reload()):(a.default.set("userId",e.userId),window.location.reload()):t&&(a.default.remove("userId"),window.location.reload())})})};t.nativeFun=u,t.registerNativeFun=c},203:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.getUser=void 0;var i=n(184),o=r(i),a=n(191),u=r(a),c=function(){var e=o.default.fn.cookie("userId");if(e){var t={userId:e};return t}var n=u.default.get("userId");if(n){var r={userId:n};return r}};t.getUser=c},206:171,215:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Carousel=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),s=r(c);n(216);var l=n(177),d=n(183),f=n(187),p=n(203),v=n(188),m=n(190),g=n(217),h=r(g),y=n(218),b=function(e){function t(e){i(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={show:!0,successShow:!1,prizeImg:"",prizeName:"",faileShow:!1,description:"",prizeList:[],recordList:[]},n.user=(0,p.getUser)(),n.query=(0,v.parseQueryString)(window.location.href),n.goPrize=n.goPrize.bind(n),n.clocseTip=n.clocseTip.bind(n),n}return a(t,e),u(t,[{key:"componentDidMount",value:function(){this.apiRequest()}},{key:"title_fun",value:function(e){var t={funName:"title_fun",params:{title:e}};(0,m.nativeFun)(t)}},{key:"apiRequest",value:function(){var e=this,t={luckActiveId:this.query.activityId,userId:this.user.userId},n={url:"/mobile-web-activity/ws/mobile/v1/activity/getLuckActivity",method:"post",params:JSON.stringify(t)};(0,d.Api)(n).done(function(t){0==t.code?e.setState({show:!1,description:t.response.description,prizeList:t.response.prizeList,recordList:t.response.recordList},function(){e.title_fun(t.response.prizeTitle),t.response.recordList.length>3&&e.scrollZhongjiangjilu(),e.initPrize(t.response.prizeList)}):e.setState({show:!1},function(){(0,f.Tip)(t.msg)})}).fail(function(t){e.setState({show:!1},function(){(0,f.Tip)("服务器错误")})})}},{key:"initPrize",value:function(e){var t=this;h.default.init({id:"turntable",config:function(t){t&&t(e)},getPrize:function(e){var n={userId:t.user.userId,luckActiveId:t.query.activityId},r={url:"/mobile-web-activity/ws/mobile/v1/activity/drawLuck",method:"post",params:JSON.stringify(n)};(0,d.Api)(r).done(function(n){0==n.code?e&&e([t.matchPrize(n.response.prizeId)]):1500002==n.code?(0,f.Tip)(n.msg):(0,f.Tip)(n.msg)}).fail(function(e){(0,f.Tip)("服务器错误")})},gotBack:function(e){e.prizeName.indexOf("谢谢")>-1?t.setState({faileShow:!0}):t.setState({successShow:!0,prizeName:e.prizeName,prizeImg:e.prizeImgUrl}),t.nextBtn((0,y.createUrl)(parseFloat(t.query.sort)+1))}})}},{key:"matchPrize",value:function(e){for(var t=this.state.prizeList,n=0;n<t.length;n++)if(t[n].id==e)return n}},{key:"nextBtn",value:function(e){var t={funName:"jump_fun",params:{url:e}};(0,m.nativeFun)(t)}},{key:"goPrize",value:function(e){e.stopPropagation(),window.location.href="prize.html"}},{key:"clocseTip",value:function(e){e.stopPropagation(),this.setState({successShow:!1,faileShow:!1})}},{key:"scrollZhongjiangjilu",value:function(){function e(e){var t=e.find("ul"),n=t.find("li").eq(0).height();t.animate({"margin-top":-n+"px"},600,function(){t.css({"margin-top":"0px"}).find("li").eq(0).appendTo(t)})}var t=$(".record-list");setInterval(function(){e(t)},2e3)}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var e=this,t=this.state,r=t.show,i=(t.coverShow,t.faileShow),o=t.successShow,a=t.prizeImg,u=t.prizeName,c=t.description,d=t.recordList;return s.default.createElement("div",{className:"page"},r?null:s.default.createElement("div",{className:"page-content"},s.default.createElement("div",{className:"carousel-banner"},s.default.createElement("img",{src:n(219)})),s.default.createElement("p",{className:"carousel-des"},c),s.default.createElement("section",{className:"carousel-content gb-turntable",id:"turntable"},s.default.createElement("div",{className:"carousel-turnplate gb-turntable-container"},s.default.createElement("canvas",{className:"gb-turntable-canvas",width:"300",height:"300"},"抱歉！浏览器不支持。")),s.default.createElement("a",{href:"javascript: void (0)",className:"pointer gb-turntable-btn"})),s.default.createElement("a",{href:"javascript: void (0)",className:"my-carousel",onClick:function(t){return e.goPrize(t)}}),s.default.createElement("div",{className:"record-list"},s.default.createElement("p",null,"中奖名单"),s.default.createElement("div",{className:"record-msg-box"},s.default.createElement("ul",null,d.map(function(e,t){return s.default.createElement("li",{key:t},s.default.createElement("span",null,s.default.createElement("b",null,e.mobile),s.default.createElement("i",null,e.createTime)),s.default.createElement("em",null,e.prizeName))})))),s.default.createElement("div",{className:"footer"})),r?s.default.createElement(l.IsLoading,null):null,s.default.createElement("section",{className:"cmp-fixed"+(o||i?" cover-mask-toggle":"")}),o?s.default.createElement("div",{className:"carousel-item carousel-success"},s.default.createElement("i",null,s.default.createElement("img",{src:a})),s.default.createElement("span",null,u),s.default.createElement("a",{href:"javascript: void (0)",className:"close",onClick:function(t){return e.clocseTip(t)}})):null,i?s.default.createElement("div",{className:"carousel-item carousel-fail"},s.default.createElement("span",null,"再接再厉哦~"),s.default.createElement("a",{href:"javascript: void (0)",className:"close",onClick:function(t){return e.clocseTip(t)}})):null)}}]),t}(c.Component);t.Carousel=b},216:171,217:function(e,t,n){var r,i;!function(){function n(e){return N?N+e:e.toLowerCase()}function o(e){return e=e.toLowerCase(),T?T+e:e}function a(e){O=e.getPrize,P=e.gotBack,e.config(function(t){_=e.prizes=t,w=_.length,u(e)}),l()}function u(e){if(e=e||{},e.id&&w>>>0!==0){var t=e.id,n=360/w/2+90,r=void 0,i=document.createElement("ul"),o=1/w,a=[];if(h=g(t),b=h.querySelector(".gb-turntable-canvas"),y=h.querySelector(".gb-turntable-container"),E=h.querySelector(".gb-turntable-btn"),!b.getContext)return void c("抱歉！浏览器不支持。");r=b.getContext("2d");for(var u=0;u<w;u++)r.save(),r.beginPath(),r.translate(150,150),r.moveTo(0,0),r.rotate((360/w*u-n)*Math.PI/180),r.arc(0,0,150,0,2*Math.PI/w,!1),u%2==0?r.fillStyle="#fbf5ac":r.fillStyle="#fae48e",r.fill(),r.lineWidth=.5,r.strokeStyle="#e4370e",r.stroke(),r.restore(),a.push('<li class="gb-turntable-item"><span style="'+j+": rotate("+u*o+'turn)">'+e.prizes[u].prizeName+(""==e.prizes[u].prizeImgUrl?"":'<img src="'+e.prizes[u].prizeImgUrl+'" />')+"</span></li>"),u+1===w&&(i.className="gb-turntalbe-list",y.appendChild(i),i.innerHTML=a.join(""))}}function c(e){alert(e)}function s(e){y.style[j]="rotate("+e+"deg)"}function l(){f(E,"click",function(){v(E,"disabled"),O(function(e){S={prizeId:e[0]},I=I||0,I=I+(360-I%360)+(3600-e[0]*(360/w)),s(I)}),f(y,z,d)})}function d(){m(E,"disabled"),P(_[S.prizeId])}function f(e,t,n){"function"==typeof addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)}function p(e,t){return!(!e||!t)&&(e.classList?e.classList.contains(t):e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)")))}function v(e,t){e.classList?e.classList.add(t):p(e,t)||(e.className+=""+t)}function m(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+className.split(" ").join("|")+"(\\b|$)","gi")," ")}var g=void 0,h=void 0,y=void 0,b=void 0,w=void 0,_=void 0,E=void 0,I=0,O=void 0,P=void 0,S=void 0,T=void 0,N=void 0,A={"":"",Webkit:"webkit",Moz:"",O:"o",ms:"ms"},k=document.createElement("p"),C={};Object.keys(A).some(function(e){if(void 0!==k.style[e+(e?"T":"t")+"ransitionProperty"])return T=e?"-"+e.toLowerCase()+"-":"",N=A[e],!0}),C={cssPrefix:T,transform:o("Transform"),transitionEnd:n("TransitionEnd")};var j=C.transform,z=C.transitionEnd;g=function(e){return document.getElementById(e)};var M={init:function(e){return a(e)}};void 0===window.gbTurntable&&(window.gbTurntable=M),r=[],i=function(){return M}.apply(t,r),!(void 0!==i&&(e.exports=i))}()},218:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.createUrl=t.jumpTo=void 0;var i=n(191),o=r(i),a=n(190),u=function(e){var t=o.default.get("activityList"),n=o.default.get("activityId"),r=o.default.get("activeTitle"),i=o.default.get("description");if(e==t.length){var u={funName:"index_fun",params:{}};return(0,a.nativeFun)(u),!1}1==t[e].activeType?window.location.href="msg.html?activityId="+n+"&sort="+e+"&tip=1":2==t[e].activeType?window.location.href="questionnaire.html?activityId="+n+"&sort="+e+"&description="+encodeURIComponent(i)+"&activeTitle="+encodeURIComponent(r)+"&tip=1":3==t[e].activeType?window.location.href="vote.html?activityId="+n+"&sort="+e+"&description="+encodeURIComponent(i)+"&activeTitle="+encodeURIComponent(r)+"&tip=1":4==t[e].activeType?window.location.href="carousel.html?activityId="+n+"&sort="+e+"&tip=1":5==t[e].activeType&&(window.location.href="upload.html?activityId="+n+"&sort="+e+"&tip=1")},c=function(e){var t=o.default.get("activityList"),n=o.default.get("activityId");if(parseFloat(e)==t.length)return"";var r=window.location.host;return r.indexOf("http://")<0&&(r="http://"+r),1==t[e].activeType?r+"/front/msg.html?activityId="+n+"&sort="+e+"&tip=1":2==t[e].activeType?r+"/front/questionnaire.html?activityId="+n+"&sort="+e+"&tip=1":3==t[e].activeType?r+"/front/vote.html?activityId="+n+"&sort="+e+"&tip=1":4==t[e].activeType?r+"/front/carousel.html?activityId="+n+"&sort="+e+"&tip=1":5==t[e].activeType?r+"/front/upload.html?activityId="+n+"&sort="+e+"&tip=1":void 0};t.jumpTo=u,t.createUrl=c},219:function(e,t,n){e.exports=n.p+"images/161cb126.bg_top_banner.png"}});