/*
 * 我参与-活动  容器组件
 */

import React, {Component} from 'react';

//引入公共组件
import {IsLoading} from 'loadingJsx';
import {MaskLoading} from 'maskloadingJsx';

//引入js
import {Api} from 'api';
import {Tip, isMobile} from 'util';
import {parseQueryString} from 'query';
import {nativeFun, registerNativeFun} from 'nativeFun';
import {getUser} from 'getUser';


class Active extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true, //数据正在加载中
            list: [],
            pageIndex: 1, //页面
            pageAmount: 0, //总页数
        };

        //userId
        this.user = getUser();

        //解析url后的参数
        this.query = parseQueryString(window.location.href);

        //事件绑定
        this.onJumpClick = this.onJumpClick.bind(this);

    }

    componentDidMount() {
        let that = this;

        //初始化数据
        that.apiRequest();

        //初始化登录状态 ios系统
        if (isMobile.iOS()) {
            this.localStorage();
        }

        //滚动监听
        that.bindScroll();

    }

    componentWillUnmount() {

    }

    //登录状态
    localStorage() {
        let jsonParams = {
            'funName': 'localStronge',
            'params': {}
        };
        registerNativeFun(jsonParams);
    }


    /**
     * @author wangpen
     * @description 初始化上拉加载数据事件
     */
    bindScroll() {
        //监听滚动条事件  //节流阀
        window.onscroll = () => {
            this.addEventScroll();
        }
    };

    addEventScroll() {
        let that = this;
        let range = 400; //距下边界长度/单位px
        let huadong = true;

        let {pageIndex, pageAmount} = this.state;   //init
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let WindowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let DocumentHeight = parseFloat(document.documentElement.offsetHeight || document.body.offsetHeight);

        //当前页面等于总页面不执行
        if (pageIndex >= pageAmount) {
            return false;
        }

        let totalheight = parseFloat(WindowHeight) + parseFloat(scrollTop); //滚动条当前位置距顶部距离+浏览器的高度

        //判断几种下拉发送请求
        if (DocumentHeight == totalheight) {
            that.setState({
                pageIndex: pageIndex + 1
            }, () => {
                that.apiRequest();
            });
        } else {
            if ((DocumentHeight - totalheight) <= range) { //页面底部与滚动条底部的距离<range
                /* if (huadong) {
                           huadong = false;
                           that.setState({
                               pageIndex: pageIndex + 1
                           }, () => {
                               that.getActivityList();
                           });
                       }*/
            } else {
                huadong = true;
            }
        }

    }

    apiRequest() {
        let that = this;
        let {pageIndex, list} = this.state;
        let data = {
            userId: this.user.userId,
            /* userId: 111869,*/
            toPage: pageIndex,
            pageRows: 10,
        };
        let params = {
            url: '/mobile-web-user/ws/mobile/v1/user/myparticipation',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(params)
            .then((data) => {
                if (data.code == 0) {
                    that.setState({
                        list: list.concat(data.response),
                        pageAmount: data.page.pageAmount,
                        show: data.page.pageAmount == pageIndex ? false : true,
                    })
                } else {
                    that.setState({
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


    //跳转活动页
    onJumpClick(e, activeId) {
        window.location.href = 'findActivity.html?activityId=' + activeId;
    }

    render() {
        let that = this;
        const {list, pageAmount, show} = this.state;

        return (
            <div className="page">

                {/*无记录背景*/}
                {
                    pageAmount == 0 ?
                        <div className="noBox">
                            <img src={require('../../images/active/blank.png')}/>
                            <em>暂无内容</em>
                        </div>
                        :
                        <div className="review">
                            <ul className="activity">
                                {
                                    list.map((item, index) => {
                                        return (
                                            <li key={index} className="activity-item">
                                                <h2>{item.description}</h2>
                                                <div className="pic">
                                                    <img src={item.imgUrl}
                                                         onClick={(e) => that.onJumpClick(e, item.activeId)}/>
                                                    <span>{item.activeStatus == 0 ? '预告中' : item.activeStatus == 1 ? '进行中' : item.activeStatus == 2 ? '已结束' : null}</span>
                                                </div>
                                                <div className="down">
                                                    <div className="down-l">
                                                        <img
                                                            src={require('../../images/active/ico_password1.png')}/> {item.participantNum}
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {/*数据正在加载中*/}
                            {
                                show ? <IsLoading/> : null
                            }
                        </div>
                }
            </div>
        )
    }
}

export {Active}
