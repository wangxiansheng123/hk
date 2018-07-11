/*
 * 报名 容器组件
 */

import React, {Component} from 'react';

//引入公共组件
import {IsLoading} from 'loadingJsx';
import {MaskLoading} from 'maskloadingJsx';

//引入js
import {Api} from 'api';
import {Tip, CheckPhone} from 'util';
import {getUser} from 'getUser';
import {nativeFun} from 'nativeFun';
import {parseQueryString} from 'query';
import {jumpTo} from 'jump';

class Msg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true,  //数据正在加载中
            coverShow: false, //阴影层
            dataShow: false, //数据请求状态
            payStyle: 0, //支付方式
            information: [],  //提交信息
            free: false, //是否缴费
            payMoney: 0, //费用
        };

        this.user = getUser();

        //url解析
        this.query = parseQueryString(window.location.href);

        //事件绑定
        this.sumbit = this.sumbit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changePayStyle = this.changePayStyle.bind(this);
        this.goPay = this.goPay.bind(this);

    }

    componentDidMount() {
        //初始化数据
        this.apiRequest()
    }

    apiRequest() {
        let data = {
            activeId: this.query.activityId,
        };
        let params = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/getEnrollActivity',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(params)
            .done((data) => {
                if (data.code == 0) {
                    this.setState({
                        show: false,
                        information: JSON.parse(data.response.options),
                        free: data.response.fee == 0 ? false : true,
                        payMoney: data.response.fee,
                    }, () => {
                        this.title_fun(data.response.title);
                    })
                }
                else {
                    this.setState({
                        show: false,
                    }, () => Tip(data.msg))
                }
            })
            .fail((error) => {
                this.setState({
                    show: false,
                }, () => Tip('服务器错误'))
            })
    }

    //native页面标题
    title_fun(activeTitle) {
        let jsonParams = {
            'funName': 'title_fun',
            'params': {
                "title": activeTitle,
            }
        };
        nativeFun(jsonParams);
    }

    //提交
    sumbit(e) {
        //阻止事件冒泡
        e.stopPropagation();
        let {free, payMoney} = this.state;
        //循环遍历数据，然后根据必填字段来给出提示
        let element = document.getElementsByClassName('item');
        let info = [];
        for (let i = 0; i < element.length; i++) {
            let childNode = element[i].children[1];
            let Value = childNode.value;
            let isChecked = eval(element[i].getAttribute('data-ischeck').toLowerCase());
            let infoItem = {};
            if (isChecked) {
                if (Value == '') {
                    Tip(element[i].children[0].innerHTML + '不能为空');
                    return false;
                }
                else {
                    infoItem.index = i;
                    infoItem.content = Value;
                }
            }
            else {
                infoItem.index = i;
                infoItem.content = Value;
            }
            info.push(infoItem);
        }
        //提交信息初始化
        this.setState({
            coverShow: false,
            dataShow: true,
        }, () => this.clearValue());
        let data = {
            activeId: this.query.activityId,
            userId: this.user.userId,
            fillContents: info,
            payMethod: 0,
        };
        let params = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/enrollCommit',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(params)
            .done((data) => {
                if (data.code == 0) {
                    this.setState({
                        dataShow: false,
                    }, () => {
                        if (free) {
                            this.setState({
                                coverShow: true,
                            })
                        } else {
                            Tip('报名成功', 3000);
                            window.setTimeout(function () {
                                jumpTo(parseFloat(that.query.sort) + 1);
                            }, 3000);
                        }
                    })
                }
                else {
                    this.setState({
                        dataShow: false,
                    }, () => {
                        Tip(data.msg);
                    })
                }
            })
            .fail((error) => {
                this.setState({
                    dataShow: false,
                }, () => {
                    Tip('服务器错误');
                })
            });
    }

    //clear input value
    clearValue() {
        let element = document.getElementsByClassName('item');
        for (let i = 0; i < element.length; i++) {
            element[i].children[1].value = '';
        }
    }

    //选择支付方式
    changePayStyle(e, index) {
        //阻止事件冒泡
        e.stopPropagation();
        this.setState({
            payStyle: index,
        })
    }

    //取消支付
    cancel(e) {
        //阻止事件冒泡
        e.stopPropagation();
        this.setState({coverShow: false, payStyle: 0});
    }

    //去支付
    goPay(e) {
        //阻止事件冒泡
        e.stopPropagation();
        Tip('服务</br>212121', 3000);
    }

    componentWillUnmount() {

    }

    render() {

        const {show, coverShow, dataShow, payStyle, information, free, payMoney} = this.state;

        return (
            <div className="page">

                {
                    !show ?
                        <div className="page-content">
                            {/*填写信息*/}
                            <ul className="content">
                                {
                                    information.map((item, index) => {
                                        return (
                                            <li className="item" key={index} data-ischeck={item.ischecked}>
                                                <span>{item.text}</span>
                                                <input type="text" maxLength={30}/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                            {/*是否需要报名费*/}
                            {
                                free ?
                                    <div className="signUp">
                                        <div className="signUp-top">
                                            <span>报名费:</span>
                                            <p>${payMoney}</p>
                                        </div>
                                        <div className="data">
                                            <h2 className="data-title">资料说明</h2>
                                            <div>资料说明&nbsp;项目说明收费标准&nbsp;投放部分资金&nbsp;充值手续费&nbsp;充值金额的0.2%,由平台垫付&nbsp;提现手续费&nbsp;
                                                每月享有3次免费提现机会,3次以外的提现2元/笔收取管理费暗示法v的发生大幅度是撒旦法法师法师法师法师法法师 法法师的法师法 法法师发顺丰三
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }


                            {/*提交*/}
                            <a className="btn btn-color" onClick={(e) => this.sumbit(e)}>提交</a>
                        </div>
                        : null
                }

                {/*阴影成*/}
                <section className={`cmp-fixed${ coverShow ? ' cover-mask-toggle' : '' }`}
                         onClick={(e) => this.cancel(e)}></section>

                {/*支付方式*/}
                <div className={`pay-style${ coverShow ? ' fourth-cover-toggle' : ''}`}>
                    <div className="pay-header">
                        请选择支付方式
                        <a href="javascript: void (0)" class="close"></a>
                    </div>
                    {/*支付方式*/}
                    <ul>
                        <li onClick={(e) => this.changePayStyle(e, 1)} className={payStyle == 1 ? 'active' : ''}>
                            <span><img src={require('../../images/ico44_weixin.png')}/>微信</span>
                            <i></i>
                        </li>
                        <li onClick={(e) => this.changePayStyle(e, 2)} className={payStyle == 2 ? 'active' : ''}>
                            <span><img src={require('../../images/ico44_weixin.png')}/>支付宝</span>
                            <i></i>
                        </li>
                    </ul>
                    {/*支付金额*/}
                    <p>支付金额￥{payMoney}</p>
                    {/*确认支付*/}
                    <a href="javascript: void (0)" className="pay-btn btn-color" onClick={(e) => this.goPay(e)}>确认支付</a>
                </div>

                {/*数据正在加载中*/}
                {
                    show ? <IsLoading/> : null
                }
                {/*数据请求加载中*/}
                {
                    dataShow ? <MaskLoading/> : null
                }

            </div>
        )
    }

}

export {Msg}
