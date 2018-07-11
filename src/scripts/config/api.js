/*
 *  api请求服务端数据
 * */


import $ from 'zepto';


/*let env_url = 'http://183.131.159.208:10027'; //测试环境*/
/*let env_url = 'http://biz.hkwx.allook.cn:8084'; //正式环境*/
let env_url = 'http://10.1.0.208:80'; //正式环境


let Api = function (params) {

    let def = $.Deferred();

    let successCallback = function (response) {
        def.resolve(response);
    };

    let failCallback = function (error) {
        def.reject(error);
    };
    if ((params.url).indexOf('http://') > -1) {
        $.ajax({
            type: params.method,
            url: params.url,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",//表单数据格式
            data: params.params,
            success:
                function (data) {
                    let _data;
                    try {
                        _data = JSON.parse(data);
                    }
                    catch (error) {
                        _data = data;
                    }
                    successCallback(_data);
                }

            ,
            error: function (error) {
                failCallback(error);
            }

        })
            .done(function (data) {
                let _data;
                try {
                    _data = JSON.parse(data);
                }
                catch (error) {
                    _data = data;
                }
                successCallback(_data);
            })
            .fail(function (error) {
                failCallback(error);
            });

        return def
    } else {
        $.ajax({
            type: params.method,
            url: env_url + params.url,
            contentType: "application/json;charset=UTF-8",//json数据格式
            data: params.params,
            success:
                function (data) {
                    let _data;
                    try {
                        _data = JSON.parse(data);
                    }
                    catch (error) {
                        _data = data;
                    }
                    successCallback(_data);
                }

            ,
            error: function (error) {
                failCallback(error);
            }

        })
            .done(function (data) {
                let _data;
                try {
                    _data = JSON.parse(data);
                }
                catch (error) {
                    _data = data;
                }
                successCallback(_data);
            })
            .fail(function (error) {
                failCallback(error);
            });

        return def
    }


};


export {Api};

