/*
 * 奖品列表 容器组件
 */

import React, {Component} from 'react';

//引入公共组件
import {IsLoading} from 'loadingJsx';
import {MaskLoading} from 'maskloadingJsx';

//引入js
import {Api} from 'api';
import {Tip} from 'util';
import {getUser} from 'getUser';
import {nativeFun} from 'nativeFun';
import $ from 'zepto';

class Prize extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true, //数据信息加载状态
            dataShow: false, //数据请求状态
            coverShow: false, //信息展示状态
            prizeList: [],  //奖品列表
            prizeId: null, //当前领取奖品Id
            prizeActivityId: null, //当前领取奖品的活动Id
            information: [],  //提交填写信息
            index: null, //当前被选中的奖品
        };

        //userId
        this.user = getUser();

        //事件绑定
        this.cancel = this.cancel.bind(this);
        this.getPrize = this.getPrize.bind(this);
        this.goSubmit = this.goSubmit.bind(this);

    }

    componentDidMount() {
        //初始化数据
        this.apiRequest();
        this.title_fun();
    }

    //初始化数据
    apiRequest() {
        let data = {
            userId: this.user.userId,
        };
        let params = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/myprize',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(params)
            .done((data) => {
                if (data.code == 0) {
                    this.setState({
                        show: false,
                        prizeList: data.response,
                    })
                }
                else {
                    this.setState({
                        show: false,
                    }, () => {
                        Tip(data.msg);
                    })
                }
            })
            .fail((error) => {
                this.setState({
                    show: false,
                }, () => {
                    Tip('服务器错误');
                })
            })
    }

    //native页面标题
    title_fun() {
        let jsonParams = {
            'funName': 'title_fun',
            'params': {
                "title": '我的奖品',
            }
        };
        nativeFun(jsonParams);
    }

    //取消提交信息
    cancel(e) {
        //阻止事件冒泡
        e.stopPropagation();
        this.setState({coverShow: false});
    }

    //领取奖品
    getPrize(e, prizeId, activityId, index) {
        //阻止事件冒泡
        e.stopPropagation();
        if (e.currentTarget.getAttribute('class').indexOf('p-active') < 0) {
            Tip('已领取');
            return false;
        }
        this.setState({
            dataShow: true,
            prizeId: prizeId,
            prizeActivityId: activityId,
            index: index,
        }, () => {
            let data = {
                luckActiveId: activityId,
            };
            let params = {
                url: '/mobile-web-activity/ws/mobile/v1/activity/getprizeInfo',
                method: 'post',
                params: JSON.stringify(data),
            };
            Api(params)
                .done((data) => {
                    if (data.code == 0) {
                        this.setState({
                            coverShow: true,
                            dataShow: false,
                            information: JSON.parse(data.response),
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
                })
        });
    }

    //提交
    goSubmit(e) {
        //阻止事件冒泡
        e.stopPropagation();
        let {prizeId, prizeActivityId, index} = this.state;
        let element = document.getElementsByClassName('item');
        let info = [];
        for (let i = 0; i < element.length; i++) {
            let childNode = element[i].children[1];
            let Value = childNode.value;
            let isChecked = eval(element[i].getAttribute('data-ischeck').toLowerCase());
            let key, value;
            let infoItem = {};
            if (isChecked) {
                if (Value == '') {
                    Tip(element[i].children[0].innerHTML + '不能为空');
                    return false;
                }
                else {
                    key = element[i].children[0].innerHTML;
                    value = Value;
                }
            }
            else {
                key = element[i].children[0].innerHTML;
                value = Value;
            }
            infoItem[key] = value;
            info.push(infoItem);
        }
        let data = {
            luckActiveId: prizeActivityId,
            prizeId: prizeId,
            userId: this.user.userId,
            prizeInfo: JSON.stringify(info),
        };
        let params = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/getprize',
            method: 'post',
            params: JSON.stringify(data),
        };
        //提交信息初始化
        this.setState({
            coverShow: false,
            dataShow: true,
        }, () => this.clearValue());
        Api(params)
            .done((data) => {
                if (data.code == 0) {
                    this.setState({
                        dataShow: false,
                    }, () => {
                        Tip('领奖成功</br>奖品即将发出');
                        //选中奖品被领取后成已领取状态
                        $('.view-pc').find('li').eq(index).removeClass('p-active');
                        $('.view-pc').find('li').eq(index).find('p').html('已领取');
                    })
                }
            })
            .fail((error) => {
                console.log(error);
            })
    }

    clearValue() {
        let element = document.getElementsByClassName('item');
        for (let i = 0; i < element.length; i++) {
            element[i].children[1].value = '';
        }
    }

    componentWillUnmount() {
    }

    render() {

        const {show, dataShow, coverShow, prizeList, information} = this.state;

        return (
            <div className="page">

                {/*商品列表*/}
                {
                    !show ?
                        <div className="page-content">
                            <ul className="view-pc">
                                {
                                    prizeList.map((item, index) => {
                                        return (
                                            <li className={item.status == 2 ? 'p-active' : ''}
                                                onClick={(e) => this.getPrize(e, item.id, item.prizeActiveid, index)}
                                                key={index}>
                                                <img src={item.prizeImgUrl}/>
                                                <p>{item.status == 2 ? '领取' : '已领取'}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                            {/*阴影层*/}
                            <section className={`cmp-fixed${ coverShow ? ' cover-mask-toggle' : '' }`}
                                     onClick={(e) => this.cancel(e)}></section>

                            {/*填写领奖信息*/}
                            <div className={`popup${coverShow ? ' popup-toggle' : '' }`}>
                                <div className="popup-title">
                                    <h2>填写领奖信息</h2>
                                    <a href="javascript: void (0)" onClick={(e) => this.cancel(e)}><img
                                        src={require('../../images/ico_close.png')}/></a>
                                </div>
                                <ul className="info">
                                    {
                                        information.map((item, index) => {
                                            return (
                                                <li className="item" key={index} data-ischeck={item.ischecked}>
                                                    <span>{item.text}</span>
                                                    <input type="text"/>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="btn" onClick={(e) => this.goSubmit(e)}>提交</div>
                            </div>
                        </div>
                        : null
                }
                {/*数据加载中*/}
                {
                    show ? <IsLoading/> : null
                }
                {/*数据请求加载中*/}
                {
                    dataShow ? <MaskLoading/> : null
                }
                {/*数据加载完并无数据*/}
                {
                    prizeList.length == 0 && !show ?
                        <div className="no-prize"><img src={require('../../images/no_prize.png')}/></div>
                        : null
                }

            </div>
        )
    }
}

export {Prize}
