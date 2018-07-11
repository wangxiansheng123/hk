/*
 * 发现首页 容器组件
 */

import React, {Component} from 'react';

//引入公共组件
import {IsLoading} from 'loadingJsx';

//引入js
import {isMobile} from 'util';
import {Api} from 'api';
import {Tip} from 'util';
import {getUser} from 'getUser';
import {nativeFun, registerNativeFun} from 'nativeFun';
import store from 'store';

class FindIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true, //数据正在加载中
            list: [],
            pageIndex: 1, //页面
            pageAmount: 1, //总页数
        };


        //userId
        this.user = getUser();

        //事件绑定
        this.goActivityDetail = this.goActivityDetail.bind(this);

    }

    componentDidMount() {

        //初始化数据
        this.getActivityList();

        //初始化登录状态 ios系统
        if (isMobile.iOS()) {
            this.localStorage();
        }

        //滚动监听
        this.bindScroll();
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
     * @author niwei
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
                that.getActivityList();
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

    //获取数据
    getActivityList() {
        let {pageIndex, list} = this.state;
        let data = {
            toPage: pageIndex,
            pageRows: 10,
        };
        let params = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/getActivityList',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(params)
            .then((data) => {
                if (data.code == 0) {
                    this.setState({
                        list: list.concat(data.response.activityList),
                        pageAmount: data.page.pageAmount,
                        show: data.page.pageAmount == pageIndex ? false : true,
                    })
                }
                else {
                    this.setState({
                        show: false,
                    }, () => {
                        Tip(data.msg);
                    });
                }
            })
            .fail((error) => {
                console.log(error);
            })
    }

    //去活动详情
    goActivityDetail(e, activityId) {
        //阻止事件冒泡
        e.stopPropagation();
        if (!this.user) {
            let jsonParams = {
                'funName': 'login_fun',
                'params': {}
            };
            nativeFun(jsonParams);
            return false;
        }

        //页面跳转
        window.location.href = 'findActivity.html?activityId=' + activityId + '&tip=0';
    }

    componentWillUnmount() {

    }

    render() {

        const {list, show} = this.state;

        return (
            <div className="page">
                <div className="review">
                    <ul className="activity">
                        {
                            list.map((item, index) => {
                                return (
                                    <li className="activity-item" key={index}
                                        onClick={(e) => this.goActivityDetail(e, item.activeId)}>
                                        <div className="pic">
                                            <img src={item.imgUrl}/>
                                            <span>{item.activeStatus == 0 ? '预告' : item.activeStatus == 1 ? '进行中' : '已结束'}</span>
                                        </div>
                                        <div className="down">
                                            <div className="down-l">
                                                <h2>{item.activeTitle}</h2>
                                                <div><img
                                                    src={require('../../images/ico_joined@2x.png')}/>{item.participantNum}
                                                </div>
                                            </div>
                                            <div
                                                className={`down-r${item.activeStatus == 0 || item.activeStatus == 2 ? ' disabled' : ''}`}>
                                                立即参与
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/*数据正在加载中*/}
                {
                    show ? <IsLoading/> : null
                }
            </div>
        )
    }

}

export {FindIndex}
