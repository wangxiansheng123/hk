webpackJsonp([14],{0:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(1),i=r(o),a=n(31);r(a);n(170),n(171),n(277);var u=n(278),c=document.getElementById("staticPage");(0,a.render)(i.default.createElement(u.StaticPage,null),c)},170:function(e,t){"use strict";!function(e,t){var n=e.documentElement,r="orientationchange"in window?"orientationchange":"resize",o=function(){var e=document.querySelector("body").offsetWidth;e&&(n.style.fontSize=100*(e/750)+"px")};o(),e.addEventListener&&(t.addEventListener(r,o,!1),e.addEventListener("DOMContentLoaded",o,!1))}(document,window)},171:function(e,t){},180:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.MaskLoading=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),l=r(c);n(181);var f=function(e){function t(e){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return a(t,e),u(t,[{key:"render",value:function(){return l.default.createElement("div",{className:"mask-loading"},l.default.createElement("div",{className:"loading-mask"},l.default.createElement("i",null),"数据正在加载中..."))}}]),t}(c.Component);t.MaskLoading=f},181:171,183:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Api=void 0;var o=n(184),i=r(o),a="http://10.1.0.208:80",u=function(e){var t=i.default.Deferred(),n=function(e){t.resolve(e)},r=function(e){t.reject(e)};return e.url.indexOf("http://")>-1?(i.default.ajax({type:e.method,url:e.url,contentType:"application/x-www-form-urlencoded;charset=UTF-8",data:e.params,success:function(e){var t=void 0;try{t=JSON.parse(e)}catch(n){t=e}n(t)},error:function(e){r(e)}}).done(function(e){var t=void 0;try{t=JSON.parse(e)}catch(n){t=e}n(t)}).fail(function(e){r(e)}),t):(i.default.ajax({type:e.method,url:a+e.url,contentType:"application/json;charset=UTF-8",data:e.params,success:function(e){var t=void 0;try{t=JSON.parse(e)}catch(n){t=e}n(t)},error:function(e){r(e)}}).done(function(e){var t=void 0;try{t=JSON.parse(e)}catch(n){t=e}n(t)}).fail(function(e){r(e)}),t)};t.Api=u},187:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.CheckPhone=t.NoRepeat=t.FormatTime=t.Tip=t.isMobile=void 0;var o=n(184),i=r(o);t.isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},AndroidApp:function(){return navigator.userAgent.match(/Android/i)&&navigator.userAgent.match(/Adr/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},iOSApp:function(){return navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},Firefox:function(){return navigator.userAgent.indexOf("Firefox")>-1},QQ:function(){return navigator.userAgent.indexOf("QQ")>-1},WeChat:function(){var e=navigator.userAgent.match(/MicroMessenger/i);return e},AlipayChat:function(){var e=navigator.userAgent.match(/AlipayClient/i);return e&&store.remove("IS_APP"),e},APP:function(){var e=config.setting.is_app||store.get("IS_APP"),t=window.location.hash,n=window.location.search,r=n+t;return e?e:r.indexOf("platform=android")>-1?(store.set("IS_APP","android"),"android"):r.indexOf("platform=ios")>-1&&(store.set("IS_APP","ios"),"ios")},onlineApp:function(){return!(!this.APP()||window.cordova)},localApp:function(){return!!(this.APP()&&window.cordova&&window.sf)},any:function(){return this.Android()||this.BlackBerry()||this.iOS()||this.Opera()||this.Windows()||this.Firefox()}},t.Tip=function(e,t){var n=(0,i.default)('<div class="dialog-cart"><div class="dialog-cart-inner"><span>'+e+"</span></div></div>");return!((0,i.default)(".dialog-cart").length>0)&&((0,i.default)(document.body).append(n),void setTimeout(function(){n.animate({opacity:0},300,function(){n.remove()})},t||"1500"))},t.FormatTime=function(e){e=new Date(parseInt(e));var t=e.getFullYear(),n=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,r=e.getDate()<10?"0"+e.getDate():e.getDate(),o=e.getHours()<10?"0"+e.getHours():e.getHours(),i=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),a=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return t+"-"+n+"-"+r+" "+o+":"+i+":"+a},t.NoRepeat=function(e){for(var t=[],n=0;n<e.length;n++)t.indexOf(e[n])==-1&&t.push(e[n]);return t},t.CheckPhone=function(e){return/^1\d{10}$/.test(e)}},188:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.encription=t.parseQueryString=void 0;var o=n(189),i=r(o);t.parseQueryString=function(e){var t=/^[^\?]+\?([\w\W]+)$/,n=/([^&=]+)=([\w\W]*?)(&|$|#)/g,r=t.exec(e),o={};if(r&&r[1])for(var i=r[1],a=void 0;null!=(a=n.exec(i));)o[a[1]]=decodeURIComponent(a[2]);return o},t.encription=function(e){var t="00BE62201707188DE8A63ZGH66D46yTXNREG1423",n="key="+t+"&body="+JSON.stringify(e);return(0,i.default)(n)}},189:function(e,t,n){var r;!function(o){"use strict";function i(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function a(e,t){return e<<t|e>>>32-t}function u(e,t,n,r,o,u){return i(a(i(i(t,e),i(r,u)),o),n)}function c(e,t,n,r,o,i,a){return u(t&n|~t&r,e,t,o,i,a)}function l(e,t,n,r,o,i,a){return u(t&r|n&~r,e,t,o,i,a)}function f(e,t,n,r,o,i,a){return u(t^n^r,e,t,o,i,a)}function d(e,t,n,r,o,i,a){return u(n^(t|~r),e,t,o,i,a)}function s(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;var n,r,o,a,u,s=1732584193,p=-271733879,v=-1732584194,m=271733878;for(n=0;n<e.length;n+=16)r=s,o=p,a=v,u=m,s=c(s,p,v,m,e[n],7,-680876936),m=c(m,s,p,v,e[n+1],12,-389564586),v=c(v,m,s,p,e[n+2],17,606105819),p=c(p,v,m,s,e[n+3],22,-1044525330),s=c(s,p,v,m,e[n+4],7,-176418897),m=c(m,s,p,v,e[n+5],12,1200080426),v=c(v,m,s,p,e[n+6],17,-1473231341),p=c(p,v,m,s,e[n+7],22,-45705983),s=c(s,p,v,m,e[n+8],7,1770035416),m=c(m,s,p,v,e[n+9],12,-1958414417),v=c(v,m,s,p,e[n+10],17,-42063),p=c(p,v,m,s,e[n+11],22,-1990404162),s=c(s,p,v,m,e[n+12],7,1804603682),m=c(m,s,p,v,e[n+13],12,-40341101),v=c(v,m,s,p,e[n+14],17,-1502002290),p=c(p,v,m,s,e[n+15],22,1236535329),s=l(s,p,v,m,e[n+1],5,-165796510),m=l(m,s,p,v,e[n+6],9,-1069501632),v=l(v,m,s,p,e[n+11],14,643717713),p=l(p,v,m,s,e[n],20,-373897302),s=l(s,p,v,m,e[n+5],5,-701558691),m=l(m,s,p,v,e[n+10],9,38016083),v=l(v,m,s,p,e[n+15],14,-660478335),p=l(p,v,m,s,e[n+4],20,-405537848),s=l(s,p,v,m,e[n+9],5,568446438),m=l(m,s,p,v,e[n+14],9,-1019803690),v=l(v,m,s,p,e[n+3],14,-187363961),p=l(p,v,m,s,e[n+8],20,1163531501),s=l(s,p,v,m,e[n+13],5,-1444681467),m=l(m,s,p,v,e[n+2],9,-51403784),v=l(v,m,s,p,e[n+7],14,1735328473),p=l(p,v,m,s,e[n+12],20,-1926607734),s=f(s,p,v,m,e[n+5],4,-378558),m=f(m,s,p,v,e[n+8],11,-2022574463),v=f(v,m,s,p,e[n+11],16,1839030562),p=f(p,v,m,s,e[n+14],23,-35309556),s=f(s,p,v,m,e[n+1],4,-1530992060),m=f(m,s,p,v,e[n+4],11,1272893353),v=f(v,m,s,p,e[n+7],16,-155497632),p=f(p,v,m,s,e[n+10],23,-1094730640),s=f(s,p,v,m,e[n+13],4,681279174),m=f(m,s,p,v,e[n],11,-358537222),v=f(v,m,s,p,e[n+3],16,-722521979),p=f(p,v,m,s,e[n+6],23,76029189),s=f(s,p,v,m,e[n+9],4,-640364487),m=f(m,s,p,v,e[n+12],11,-421815835),v=f(v,m,s,p,e[n+15],16,530742520),p=f(p,v,m,s,e[n+2],23,-995338651),s=d(s,p,v,m,e[n],6,-198630844),m=d(m,s,p,v,e[n+7],10,1126891415),v=d(v,m,s,p,e[n+14],15,-1416354905),p=d(p,v,m,s,e[n+5],21,-57434055),s=d(s,p,v,m,e[n+12],6,1700485571),m=d(m,s,p,v,e[n+3],10,-1894986606),v=d(v,m,s,p,e[n+10],15,-1051523),p=d(p,v,m,s,e[n+1],21,-2054922799),s=d(s,p,v,m,e[n+8],6,1873313359),m=d(m,s,p,v,e[n+15],10,-30611744),v=d(v,m,s,p,e[n+6],15,-1560198380),p=d(p,v,m,s,e[n+13],21,1309151649),s=d(s,p,v,m,e[n+4],6,-145523070),m=d(m,s,p,v,e[n+11],10,-1120210379),v=d(v,m,s,p,e[n+2],15,718787259),p=d(p,v,m,s,e[n+9],21,-343485551),s=i(s,r),p=i(p,o),v=i(v,a),m=i(m,u);return[s,p,v,m]}function p(e){var t,n="";for(t=0;t<32*e.length;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}function v(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;for(t=0;t<8*e.length;t+=8)n[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return n}function m(e){return p(s(v(e),8*e.length))}function h(e,t){var n,r,o=v(e),i=[],a=[];for(i[15]=a[15]=void 0,o.length>16&&(o=s(o,8*e.length)),n=0;16>n;n+=1)i[n]=909522486^o[n],a[n]=1549556828^o[n];return r=s(i.concat(v(t)),512+8*t.length),p(s(a.concat(r),640))}function g(e){var t,n,r="0123456789abcdef",o="";for(n=0;n<e.length;n+=1)t=e.charCodeAt(n),o+=r.charAt(t>>>4&15)+r.charAt(15&t);return o}function y(e){return unescape(encodeURIComponent(e))}function b(e){return m(y(e))}function w(e){return g(b(e))}function _(e,t){return h(y(e),y(t))}function E(e,t){return g(_(e,t))}function O(e,t,n){return t?n?_(t,e):E(t,e):n?b(e):w(e)}r=function(){return O}.call(t,n,t,e),!(void 0!==r&&(e.exports=r))}(void 0)},190:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.registerNativeFun=t.nativeFun=void 0;var o=n(187),i=n(191),a=r(i),u=function(e){var t=function(e){if(window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)};o.isMobile.Android()?(e=JSON.stringify(e),JSInterface.nativeFunction(e)):o.isMobile.iOS()&&t(function(t){t.callHandler(e.funName,e.params,function(e){console.log("JS received response:",e)})})},c=function(e){var t=function(e){if(window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)};o.isMobile.iOS()&&t(function(t){t.registerHandler(e.funName,function(e){var t=a.default.get("userId");e?t?t!=e.userId&&(a.default.remove("userId"),a.default.set("userId",e.userId),window.location.reload()):(a.default.set("userId",e.userId),window.location.reload()):t&&(a.default.remove("userId"),window.location.reload())})})};t.nativeFun=u,t.registerNativeFun=c},203:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.getUser=void 0;var o=n(184),i=r(o),a=n(191),u=r(a),c=function(){var e=i.default.fn.cookie("userId");if(e){var t={userId:e};return t}var n=u.default.get("userId");if(n){var r={userId:n};return r}};t.getUser=c},218:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.createUrl=t.jumpTo=void 0;var o=n(191),i=r(o),a=n(190),u=function(e){var t=i.default.get("activityList"),n=i.default.get("activityId"),r=i.default.get("activeTitle"),o=i.default.get("description");if(e==t.length){var u={funName:"index_fun",params:{}};return(0,a.nativeFun)(u),!1}1==t[e].activeType?window.location.href="msg.html?activityId="+n+"&sort="+e+"&tip=1":2==t[e].activeType?window.location.href="questionnaire.html?activityId="+n+"&sort="+e+"&description="+encodeURIComponent(o)+"&activeTitle="+encodeURIComponent(r)+"&tip=1":3==t[e].activeType?window.location.href="vote.html?activityId="+n+"&sort="+e+"&description="+encodeURIComponent(o)+"&activeTitle="+encodeURIComponent(r)+"&tip=1":4==t[e].activeType?window.location.href="carousel.html?activityId="+n+"&sort="+e+"&tip=1":5==t[e].activeType&&(window.location.href="upload.html?activityId="+n+"&sort="+e+"&tip=1")},c=function(e){var t=i.default.get("activityList"),n=i.default.get("activityId");if(parseFloat(e)==t.length)return"";var r=window.location.host;return r.indexOf("http://")<0&&(r="http://"+r),1==t[e].activeType?r+"/front/msg.html?activityId="+n+"&sort="+e+"&tip=1":2==t[e].activeType?r+"/front/questionnaire.html?activityId="+n+"&sort="+e+"&tip=1":3==t[e].activeType?r+"/front/vote.html?activityId="+n+"&sort="+e+"&tip=1":4==t[e].activeType?r+"/front/carousel.html?activityId="+n+"&sort="+e+"&tip=1":5==t[e].activeType?r+"/front/upload.html?activityId="+n+"&sort="+e+"&tip=1":void 0};t.jumpTo=u,t.createUrl=c},262:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Banner=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),l=r(c);n(263);t.Banner=function(e){function t(e){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return a(t,e),u(t,[{key:"render",value:function(){var e=this.props.banner;return l.default.createElement("banner",null,l.default.createElement("div",null,l.default.createElement("div",{className:"banner"},l.default.createElement("img",{src:n(264)})),l.default.createElement("div",{className:"title"},l.default.createElement("div",{className:"title-l"},""!==e.title?l.default.createElement("h2",{style:e.center?{textAlign:"center"}:null},this.props.activeTitle):null,l.default.createElement("span",null,e.number))),""!==e.article?l.default.createElement("div",{className:"text"},this.props.description):null))}}]),t}(c.Component)},263:171,264:function(e,t,n){e.exports=n.p+"images/2c339854.banner_02.png"},277:171,278:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.StaticPage=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),l=r(c),f=(n(180),n(262),n(183),n(187),n(203)),d=n(188),s=(n(190),n(218),function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n.user=(0,f.getUser)(),n.query=(0,d.parseQueryString)(window.location.href),n}return a(t,e),u(t,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return l.default.createElement("div",{className:"page"},l.default.createElement("div",{className:"title"},"苹果设备开通海看无限VIP教程"),l.default.createElement("ul",null,l.default.createElement("li",null,l.default.createElement("h2",null,"1.选择套餐,点击开通按钮"),l.default.createElement("img",{src:n(279)})),l.default.createElement("li",null,l.default.createElement("h2",null,"2.输入密码或使用指纹确认购买"),l.default.createElement("img",{src:n(280)})),l.default.createElement("li",null,l.default.createElement("h2",null,"3.你未绑定支付方式,则需要完善APP Store的付款信息"),l.default.createElement("img",{src:n(281)})),l.default.createElement("li",null,l.default.createElement("h2",null,'4.在账户设置中选择"微信支付 "并点击" 前往微信验证'),l.default.createElement("img",{src:n(282)})),l.default.createElement("li",null,l.default.createElement("h2",null,"5.输入密码完成微信免支付验证"),l.default.createElement("img",{src:n(283)})),l.default.createElement("li",null,l.default.createElement("h2",null,'6.回到APP Store完善个人账单信息后点击" 完成 "即可',l.default.createElement("br",null),"继续开通海看无限VIP"),l.default.createElement("img",{src:n(284)})),l.default.createElement("li",null,l.default.createElement("h2",null,"7.成功绑定付款信息后将重新确认购买, 看到设置完成",l.default.createElement("br",null),"的提示就开通成功啦 "),l.default.createElement("img",{src:n(285)})),l.default.createElement("li",null,l.default.createElement("h2",null,"8.若你需要切换绑定的支付方式可在APP Store的快速",l.default.createElement("br",null),"链接中更改"),l.default.createElement("img",{src:n(286)}))))}}]),t}(c.Component));t.StaticPage=s},279:function(e,t,n){e.exports=n.p+"images/743d2ec5.help_icon01.png"},280:function(e,t,n){e.exports=n.p+"images/6e58cf0d.help_icon02.png"},281:function(e,t,n){e.exports=n.p+"images/26e7be35.help_icon03.png"},282:function(e,t,n){e.exports=n.p+"images/bc6c596b.help_icon04.png"},283:function(e,t,n){e.exports=n.p+"images/0b261e9d.help_icon05.png"},284:function(e,t,n){e.exports=n.p+"images/d221dc7f.help_icon06.png"},285:function(e,t,n){e.exports=n.p+"images/a4acf0f3.help_icon07.png"},286:function(e,t,n){e.exports=n.p+"images/7259117e.help_icon08.png"}});