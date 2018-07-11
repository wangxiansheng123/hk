/*
 * 我参与-话题  容器组件
 */

import React, {Component} from 'react';

//引入公共组件
import {IsLoading} from 'loadingJsx';

//引入js
import {Api} from 'api';
import {jumpTo} from 'jump';
import {getUser} from 'getUser';
import {Tip, isMobile} from 'util';
import {parseQueryString} from 'query';
import {nativeFun, registerNativeFun} from 'nativeFun';


class Conversation extends Component {
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
        this.jumpDetails = this.jumpDetails.bind(this);
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

    //登录状态
    localStorage() {
        let jsonParams = {
            'funName': 'localStronge',
            'params': {}
        };
        registerNativeFun(jsonParams);
    }

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
            "channelId": 180206,
            "userId": that.user.userId,
            /*"userId": 107468,*/
            "pageSize": 20,
            "currentPage": pageIndex,
            "orderType": '',
        };
        let params = {
            //url: 'http://ceshi-106.otvcloud.com/haikan/hkTopic/list',   //测试环境
            url: 'http://api.hkwx.allook.cn:8091/haikan_api-3.2/hkTopic/list',  //正式环境
            method: 'get',
            params: data,
        };

        Api(params)
            .done((data) => {
                if (data.code == 0) {
                    that.setState({
                        list: list.concat(data.data.topics),
                        pageAmount: data.data.pageNum,
                        show: data.data.pageNum == pageIndex ? false : true,

                    })
                } else {
                    Tip(data.msg)
                }
            })
            .fail((error) => {
                this.setState({
                    show: false,
                }, () => {
                    Tip('服务器错误!')
                });
            });
    }

    componentWillUnmount() {

    }

    //跳转详情
    jumpDetails(e, id, type) {
        let that = this;

        that.details_fun(id, type);
    }

    //native页面传参
    details_fun(id, type) {
        let jsonParams = {
            'funName': 'details_fun',
            'params': {
                "id": id,
                "type": type,
            }
        };
        nativeFun(jsonParams);
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
                                            <li key={index} className="activity-item"
                                                onClick={(e) => that.jumpDetails(e, item.id, item.type,)}>
                                                <div className="activity-item-title">
                                                    <div className="activity-item-title-l">
                                                        <h2>{item.name}</h2>
                                                        <span> {item.joins}万人参加话题</span>
                                                    </div>
                                                    {/*  <div className="activity-item-title-r">...</div>*/}
                                                </div>
                                                <div className="activity-item-content">
                                                    <ul className="w"
                                                        style={(item.images.length >= 3 ? {width: '10.6rem'} : {width: 'auto'})}>
                                                        {
                                                            item.images.slice(0, 3).map((itemt, indext) => {
                                                                return (
                                                                    <li key={indext} className="li-item">
                                                                        <img src={itemt}/>
                                                                        {
                                                                            item.type == 1 ?
                                                                                <span>视频</span> : item.type == 2 ?
                                                                                <span>图片</span> : item.type == 3 ?
                                                                                    <span> 混合</span> : null
                                                                        }
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            item.images.length >= 3 ?
                                                                <li className="more">
                                                                    <img
                                                                        src={require('../../images/ico36_videoplay@1.5x.png')}/>
                                                                    <em>发现更多</em>
                                                                </li> : null
                                                        }
                                                    </ul>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {
                                show ? <IsLoading/> : null
                            }
                        </div>
                }
            </div>
        )
    }
}

export {Conversation}
