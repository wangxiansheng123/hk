import $ from 'zepto';


//判断用户登录设备代理
export const isMobile = {
    Android() {
        return navigator.userAgent.match(/Android/i);
    },
    AndroidApp() {
        return navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Adr/i);
    },
    BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    iOSApp() {
        return navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    Firefox() {
        return (navigator.userAgent.indexOf("Firefox") > -1)
    },
    QQ() {
        return (navigator.userAgent.indexOf('QQ') > -1);
    },
    WeChat() {
        let isWeChat = navigator.userAgent.match(/MicroMessenger/i);
        return isWeChat
    },
    AlipayChat() {
        let isAlipayChat = navigator.userAgent.match(/AlipayClient/i);
        if (isAlipayChat) {
            store.remove('IS_APP');
        }

        return isAlipayChat
    },
    APP() {
        let isApp = config.setting['is_app'] || store.get('IS_APP');

        let hash = window.location.hash;
        let search = window.location.search;
        let whole = search + hash;

        if (isApp) {
            return isApp;
        } else if (whole.indexOf('platform=android') > -1) {
            store.set('IS_APP', 'android');
            return 'android';
        } else if (whole.indexOf('platform=ios') > -1) {
            store.set('IS_APP', 'ios');
            return 'ios';
        } else {
            return false;
        }
    },

    onlineApp() {
        if (this.APP() && !window.cordova) {
            return true;
        } else {
            return false;
        }
    },

    localApp() {
        if (this.APP() && window.cordova && window.sf) {
            return true;
        } else {
            return false;
        }
    },

    any() {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()) || this.Firefox();
    }
};

//弹窗
export const Tip = (message, time) => {
    let $el = $('<div class="dialog-cart"><div class="dialog-cart-inner"><span>' + message + '</span></div></div>');
    if ($('.dialog-cart').length > 0) {
        return false;
    };
    $(document.body).append($el);
    setTimeout(function () {
        $el.animate({
            opacity: 0
        },300,() => {  $el.remove();})
    }, time || "1500");
};

//格式化时间戳
export const FormatTime = (time) => {
    time = new Date(parseInt(time));
    let year = time.getFullYear();
    let month = time.getMonth() + 1 < 10 ? '0' + ( time.getMonth() + 1) : time.getMonth() + 1 ;
    let date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours() ;
    let minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    let second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
};

//数组去重
export const NoRepeat = (array) => {
    let n = []; //一个新的临时数组
//遍历当前数组
    for (let i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
};

//检查电话号码首字符是否为1,且输入字符只能是数字
export const CheckPhone = (phone) => {
    return /^1\d{10}$/.test(phone);
};

