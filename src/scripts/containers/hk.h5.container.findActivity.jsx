/*
 * 活动参与 容器组件
 */

import React, {Component} from 'react';

//引入公共组件
import {IsLoading} from 'loadingJsx';
import {MaskLoading} from 'maskloadingJsx';

//引入js
import {Api} from 'api';
import {Tip} from 'util';
import {parseQueryString} from 'query';
import {nativeFun} from 'nativeFun';
import store from 'store';
import {getUser} from 'getUser';
import {jumpTo} from 'jump';

class FindActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true, //数据正在加载中
            dataShow: false, //请求数据加载中
            coverShow: false, //阴影层
            buyShow: false, //购买状态
            activityDetail: {},// 活动数据
        };

        //解析url后的参数
        this.query = parseQueryString(window.location.href);

        //userId
        this.user = getUser();

        //事件绑定
        this.shareActivity = this.shareActivity.bind(this);
        this.goJoin = this.goJoin.bind(this);
        this.goCancel = this.goCancel.bind(this);
        this.goBuy = this.goBuy.bind(this);

    }

    componentDidMount() {

        //初始化数据
        this.apiRequest();

    }

    apiRequest() {
        let data = {
             userId: this.user.userId,
            /* userId: 111869,*/
            activeId: this.query.activityId,
        };
        let params = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/getActivityDetail',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(params)
            .then((data) => {
                if (data.code == 0) {
                    this.setState({
                        show: false,
                        activityDetail: data.response.activityDetail,
                    }, () => {
                        //删除之前的重新塞数据
                        store.remove('activeTitle');
                        store.remove('description');
                        store.set('activeTitle', data.response.activityDetail.activeTitle);
                        store.set('description', data.response.activityDetail.description);

                        this.title_fun(data.response.activityDetail.activeTitle);
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
    title_fun(activeTitle) {
        let jsonParams = {
            'funName': 'title_fun',
            'params': {
                "title": activeTitle,
            }
        };
        nativeFun(jsonParams);
    }

    //点击分享
    shareActivity(e) {
        let jsonParams = {
            'funName': 'share_fun',
            'params': {
                "shareUrl": 'http://106.14.132.17/haikan_JSClient_project/jcs/index1.html?channelId=180206 ',
            }
        };
        nativeFun(jsonParams);
    }

    //点击参与
    goJoin(e, activityId) {
        let element = e.currentTarget;
        if (element.getAttribute('class').indexOf('btn-disabled') > -1) {
            return false;
        }
        this.setState({dataShow: true});
        let data = {
            userId: this.user.userId,
            /*userId: 111869,*/
            activeId: activityId,
        };
        let params = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/participate',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(params)
            .done((data) => {
                //成功
                if (data.code == 0) {
                    this.setState({
                        dataShow: false,
                    }, () => {
                        //删除之前的重新塞数据
                        store.remove('activityList');
                        store.remove('activityId');
                        store.set('activityList', data.response);
                        store.set('activityId', activityId);

                        //调到第一个活动页面
                        jumpTo(0);
                    })
                }
                else if (data.code == 100000038) {
                    this.setState({
                        dataShow: false,
                        coverShow: true,
                    })
                }
                else {
                    this.setState({
                        dataShow: false,
                    }, () => {
                        Tip(data.msg);
                    })
                }
                ;
            })
            .fail((error) => {
                this.setState({
                    dataShow: false,
                }, () => {
                    Tip('服务器错误');
                })
            })
    }

    //取消购买
    goCancel(e) {
        //阻止事件冒泡
        e.stopPropagation();
        this.setState({
            coverShow: false,
        });
    }

    //立即购买
    goBuy(e) {
        //阻止事件冒泡
        e.stopPropagation();
        this.setState({
            coverShow: false,
        }, () => {
            let jsonParams = {
                'funName': 'member_pay_fun',
                'params': {}
            };
            nativeFun(jsonParams);
        })
    }

    componentWillUnmount() {

    }

    render() {

        const {show, coverShow, dataShow, buyShow, activityDetail} = this.state;

        return (
            <div className="page">

                {
                    !show ?
                        <div className="page-content">
                            {/*header banner*/}
                            <div className="banner">
                                <img
                                    src={activityDetail.imgUrl ? activityDetail.imgUrl : require('../../images/big_goods_back.png')}/>
                            </div>

                            <div className="title">
                                <div className="title-l">
                                    <h2>{activityDetail.activeTitle ? activityDetail.activeTitle : ''}</h2>
                                    <span>{activityDetail.participantNum ? activityDetail.participantNum : 0}人参与</span>
                                </div>
                                {/*分享*/}
                                {/*<div className="title-r" onClick={(e) => this.shareActivity(e)}>*/}
                                {/*<img src={require('../../images/ico_share.png')}/>*/}
                                {/*</div>*/}
                            </div>

                            <div className="text">
                                {
                                    activityDetail.description ? activityDetail.description : ''
                                }
                            </div>

                            <div className="date">
                                <em>开始时间：&nbsp;{activityDetail.beginTime ? activityDetail.beginTime : ''}</em>
                                <em>截止时间：&nbsp;{activityDetail.endTime ? activityDetail.endTime : ''}</em>
                            </div>

                            {
                                activityDetail.activeStatus ?
                                    <a className={`btn${(activityDetail.activeStatus == 0 || activityDetail.activeStatus == 2) || activityDetail.isParticipanted == 1 ? ' btn-disabled' : ''}`}
                                       onClick={(e) => this.goJoin(e, activityDetail.activeId)}>立即参与</a>
                                    : null
                            }

                        </div>
                        : null
                }

                {/*数据正在加载中*/}
                {
                    show ? <IsLoading/> : null
                }

                {/*立即购买弹窗*/}
                {
                    coverShow ?
                        <div className="popup-window">
                            <span className="popup-window-title">您还不是VIP，快去充值吧~</span>
                            <div className="popup-window-submit fixed">
                                <a href="javascript: void (0)" className="cancel"
                                   onClick={(e) => this.goCancel(e)}>取消</a>
                                <a href="javascript: void (0)" className="go" onClick={(e) => this.goBuy(e)}>立即购买</a>
                            </div>
                        </div>
                        : null
                }

                {/*请求数据加载中*/}
                {
                    dataShow ? <MaskLoading/> : null
                }

                {/*阴影成*/}
                <section className={`cmp-fixed${ coverShow ? ' cover-mask-toggle' : '' }`}></section>

            </div>
        )
    }
}

export {FindActivity}
