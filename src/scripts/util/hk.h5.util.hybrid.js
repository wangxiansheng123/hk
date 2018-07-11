import {isMobile} from 'util';

import store from 'store';

let nativeFun = function (params) {
    let setupWebViewJavascriptBridge = function (callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0);
    };

    if (isMobile.Android()) {
        params = JSON.stringify(params);
        JSInterface.nativeFunction(params);
    } else if (isMobile.iOS()) {
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler(params.funName, params.params, function responseCallback(responseData) {
                    // alert("调用新版本bridge成功");
                    console.log("JS received response:", responseData)
                })
        });
    }
};

let registerNativeFun = function (params) {
    let setupWebViewJavascriptBridge = function (callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0);
    };
    if (isMobile.iOS()) {
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.registerHandler(params.funName, function responseCallback(responseData) {
                let user = store.get('userId');
                if (responseData) {
                    if (!user) {
                        store.set("userId", responseData.userId);
                        window.location.reload();
                    } else {
                        if (user != responseData.userId) {
                            store.remove("userId");
                            store.set("userId", responseData.userId);
                            window.location.reload();
                        }
                    }
                }
                else {
                    if (user) {
                        store.remove("userId");
                        window.location.reload();
                    }
                }
            })
        });
    }
};



export {nativeFun, registerNativeFun}
