/*
 * 抽奖 容器组件
 */

import React, {Component} from 'react';

//
import '../../css/GB-canvas-turntable.css';

//引入公共组件
import {IsLoading} from 'loadingJsx';

//引入js
import {Api} from 'api';
import {Tip} from 'util';
import {getUser} from 'getUser';
import {parseQueryString} from 'query';
import {nativeFun} from 'nativeFun';
import gbTurntable from '../lib/GB-canvas-turntable';
import {createUrl} from 'jump';

class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true, //页面正在加载中
            successShow: false, //抽中奖
            prizeImg: '', //中奖商品图片
            prizeName: '',//中奖商品名称
            faileShow: false, //谢谢参与
            description: '', //抽奖描述
            prizeList: [], //抽奖大转盘奖品信息
            recordList: [], //中奖信息名单
        };

        //userId
        this.user = getUser();

        //url解析
        this.query = parseQueryString(window.location.href);

        //事件绑定
        this.goPrize = this.goPrize.bind(this);
        this.clocseTip = this.clocseTip.bind(this);

    }

    componentDidMount() {
        //初始化数据
        this.apiRequest();
    }

    //native页面标题
    title_fun(title) {
        let jsonParams = {
            'funName': 'title_fun',
            'params': {
                "title": title,
            }
        };
        nativeFun(jsonParams);
    }

    apiRequest() {
        let data = {
            luckActiveId: this.query.activityId,
            userId: this.user.userId,
        };
        let params = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/getLuckActivity',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(params)
            .done((data) => {
                if (data.code == 0) {
                    this.setState({
                        show: false,
                        description: data.response.description,
                        prizeList: data.response.prizeList,
                        recordList: data.response.recordList,
                    }, () => {
                        this.title_fun(data.response.prizeTitle);
                        if (data.response.recordList.length > 3) {
                            this.scrollZhongjiangjilu();
                        }
                        //数据
                        this.initPrize(data.response.prizeList);
                    })
                } else {
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

    initPrize(data) {
        let that = this;
        gbTurntable.init({
            id: 'turntable',
            config: function (callback) {
                // 获取奖品信息
                callback && callback(data);
            },
            getPrize: function (callback) {
                let data = {
                    userId: that.user.userId,
                    luckActiveId: that.query.activityId,
                };
                let params = {
                    url: '/mobile-web-activity/ws/mobile/v1/activity/drawLuck',
                    method: 'post',
                    params: JSON.stringify(data),
                };
                Api(params)
                    .done((data) => {
                        if (data.code == 0) {
                            callback && callback([that.matchPrize(data.response.prizeId)]);
                        }
                        else if (data.code == 1500002) {
                            Tip(data.msg);
                        }
                        else {
                            Tip(data.msg);
                        }
                    })
                    .fail((error) => {
                        Tip('服务器错误');
                    });
            },
            gotBack: function (data) {
                if (data.prizeName.indexOf('谢谢') > -1) {
                    that.setState({
                        faileShow: true,
                    })
                } else {
                    that.setState({
                        successShow: true,
                        prizeName: data.prizeName,
                        prizeImg: data.prizeImgUrl,
                    })
                }
                that.nextBtn(createUrl(parseFloat(that.query.sort) + 1));
            }
        });
    }

    //匹配抽中的商品id
    matchPrize(prizeId) {
        const {prizeList} = this.state;
        for (let i = 0; i < prizeList.length; i++) {
            if (prizeList[i].id == prizeId) {
                return i;
            }
        }
    }

    //下一步按钮
    nextBtn(url) {
        let jsonParams = {
            'funName': 'jump_fun',
            'params': {
                "url": url,
            }
        };
        nativeFun(jsonParams);
    }

    //去我的奖品
    goPrize(e) {
        //阻止事件冒泡
        e.stopPropagation();
        window.location.href = 'prize.html';
    }

    //点击提示窗消失
    clocseTip(e) {
        //阻止事件冒泡
        e.stopPropagation();

        this.setState({
            successShow: false,
            faileShow: false,
        })
    }

    //滚动中奖信息列表
    scrollZhongjiangjilu() {
        /*信息滚动*/
        let $this = $(".record-list");
        let scrollTimer = setInterval(function () {
            scrollNews($this);
        }, 2000);

        function scrollNews(obj) {
            let $self = obj.find("ul");
            let lineHeight = $self.find("li").eq(0).height();
            $self.animate({
                "margin-top": -lineHeight + "px"
            }, 600, function () {
                $self.css({
                    "margin-top": "0px"
                }).find("li").eq(0).appendTo($self);
            })
        }
    }

    componentWillUnmount() {

    }

    render() {

        const {show, coverShow, faileShow, successShow, prizeImg, prizeName, description, recordList} = this.state;

        return (
            <div className="page">

                {
                    !show ?
                        <div className="page-content">
                            {/*banner*/}
                            <div className="carousel-banner">
                                <img src={require('../../images/bg_top_banner.png')}/>
                            </div>
                            {/*抽奖信息描述*/}
                            <p className="carousel-des">
                                {description}
                            </p>
                            {/*抽奖大转盘*/}
                            <section className="carousel-content gb-turntable" id="turntable">
                                <div className="carousel-turnplate gb-turntable-container">
                                    <canvas className="gb-turntable-canvas" width="300" height="300">抱歉！浏览器不支持。</canvas>
                                </div>
                                <a href="javascript: void (0)" className="pointer gb-turntable-btn"></a>
                            </section>
                            {/*我的奖品*/}
                            <a href="javascript: void (0)" className="my-carousel" onClick={(e) => this.goPrize(e)}>
                            </a>
                            {/*获奖信息*/}
                            <div className="record-list">
                                <p>中奖名单</p>
                                <div className="record-msg-box">
                                    <ul>
                                        {
                                            recordList.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span>
                                                            <b>{item.mobile}</b>
                                                            <i>{item.createTime}</i>
                                                        </span>
                                                        <em>{item.prizeName}</em>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            {/*底部*/}
                            <div className="footer"></div>
                        </div>
                        : null
                }
                {/*页面正在加载中*/}
                {
                    show ? <IsLoading/> : null
                }
                {/*阴影层*/}
                <section className={`cmp-fixed${ successShow || faileShow ? ' cover-mask-toggle' : '' }`}></section>
                {/*中奖*/}
                {
                    successShow ?
                        <div className="carousel-item carousel-success">
                            <i><img src={prizeImg}/></i>
                            <span>{prizeName}</span>
                            <a href="javascript: void (0)" className="close" onClick={(e) => this.clocseTip(e)}></a>
                        </div>
                        : null
                }

                {/*无中奖*/}
                {
                    faileShow ?
                        <div className="carousel-item carousel-fail">
                            <span>再接再厉哦~</span>
                            <a href="javascript: void (0)" className="close" onClick={(e) => this.clocseTip(e)}></a>
                        </div>
                        : null
                }
            </div>
        )
    }

}

export {Carousel}
