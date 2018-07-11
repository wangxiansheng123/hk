/*
 * 即拍即传 容器组件
 */

import React, {Component} from 'react';

import {MaskLoading} from 'maskloadingJsx';
import {IsLoading} from 'loadingJsx';


import {Api} from 'api';
import {Tip} from 'util';

//获取userId和token
import {getUser} from 'getUser';
import {encription, parseQueryString} from 'query';
import {nativeFun} from 'nativeFun';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1, //1视频，2图片，3文字
            videoSort: 0,//0全部，1热门，
            imgSort: 0,//0全部，1热门，
            textSort: 0,//0全部，1热门，
            isLoading: true,
            maskLoading: true,
            baseData: {},
            videoDataAll: [],
            videoDataHot: [],
            imgDataAll: [],
            imgDataHot: [],
            textDataAll: [],
            textDataHot: [],
            showDialog: false,
            activityTitle: ''
        };

        this.user = getUser();
        this.hasSetTitle = false;

        //url解析
        this.query = parseQueryString(window.location.href);

        //事件绑定
        this.piconClick = this.piconClick.bind(this);
        this.videoonClick = this.videoonClick.bind(this);
    }

    //native页面标题
    title_fun(title) {
        if (!title) {
            title = '即拍即传'
        }
        console.log(title);
        let jsonParams = {
            'funName': 'title_fun',
            'params': {
                "title": title,
            }
        };
        nativeFun(jsonParams);
    }

    doRequest() {
        let that = this;
        let sortType = that.state.current === 1 ? that.state.videoSort : (that.state.current === 2 ? that.state.imgSort : (that.state.current === 3 ? that.state.textSort : 0));
        let data = {
            "channelId": 180206,
            "activeId": that.activityId,
            /*"activeId": 5,*/
            "activeType": sortType,
            "mediatype": that.state.current,
            "toPage": 1,
            "pageRows": "10",
        };
        let params = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/getpicUploadActivity',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(params)
            .done((data) => {
                console.log(data);
                if (data.code == 0) {
                    that.setState({
                        baseData: data.response,
                        activityTitle: data.response.uploadTitle
                    });
                    if (!that.hasSetTitle) {
                        that.title_fun(data.response.uploadTitle);
                        that.hasSetTitle = true;
                    }
                    if (that.state.current === 1) {
                        if (that.state.videoSort === 0) {
                            that.setState({
                                videoDataAll: data.response.list
                            });
                        } else {
                            that.setState({
                                videoDataHot: data.response.list
                            });
                        }
                    } else if (that.state.current === 2) {
                        if (that.state.imgSort === 0) {
                            that.setState({
                                imgDataAll: data.response.list
                            });
                        } else {
                            that.setState({
                                imgDataHot: data.response.list
                            });
                        }
                    } else if (that.state.current === 3) {
                        if (that.state.textSort === 0) {
                            that.setState({
                                textDataAll: data.response.list
                            });
                        } else {
                            that.setState({
                                textDataHot: data.response.list
                            });
                        }
                    }
                } else {
                    Tip(data.msg);
                }
            })
            .fail((error) => {
                Tip('服务器错误')
            });
    }

    componentDidMount() {
        let params = parseQueryString(window.location.href);
        this.activityId = params.activityId;
        this.doRequest();
    }

    uploadBtn() {
        this.setState({
            showDialog: !this.state.showDialog
        })
    }

    switchMediaTabs(current) {
        this.setState({
            current: current
        }, function () {
            this.doRequest();
        })
    }

    switchSortTabs(sortType) {
        if (this.state.current === 1) {
            this.setState({
                videoSort: sortType
            }, function () {
                this.doRequest();
            })
        } else if (this.state.current === 2) {
            this.setState({
                imgSort: sortType
            }, function () {
                this.doRequest();
            })
        } else if (this.state.current === 3) {
            this.setState({
                textSort: sortType,
            }, function () {
                this.doRequest();
            })
        }
    }

    redUrl(type) {
        this.setState({
            showDialog: false
        });
        window.location.href = 'postSth.html?type=' + type + '&title=' + this.state.activityTitle + '&activityId=' + this.activityId + '&sort=' + this.query.sort;
    }

    //调转图片
    videoonClick(e, mediaurl, coverurl, content) {
        window.location.href = 'video.html?mediaurl=' + mediaurl + "&coverurl=" + coverurl + "&content=" + encodeURIComponent(content);
    }

    //调转图片
    piconClick(e, mediaurl, content, ballot) {
        window.location.href = 'picture.html?mediaurl=' + mediaurl + "&ballot=" + ballot + "&content=" + encodeURIComponent(content);
    }

    render() {
        let that = this;

        return (
            <div className="page">
                <div className="banner" style={{display: 'none'}}>
                    <img src={require('../../images/banner_02.png')}/>
                </div>
                <div className="title">
                    <div className="title-l">
                        <h2>{that.state.baseData.uploadTitle}</h2>
                        <span>{that.state.baseData.uploadTimes}人参与</span>
                    </div>
                    {/*<div className="title-r">
                        <img src={require('../../images/active/share_05.png')}/>
                    </div>*/}
                </div>
                <div className="text">
                    {that.state.baseData.uploadDes}
                </div>
                <div className="tab">
                    <div className="title-text">
                        <ul id="tit">
                            <li onClick={that.switchMediaTabs.bind(that, 1)}>
                                <em className={that.state.current === 1 ? "em-select" : ""}>视频</em>
                                <span className={that.state.current === 1 ? "span-select" : ""}></span>
                            </li>
                            <li onClick={that.switchMediaTabs.bind(that, 2)}>
                                <em className={that.state.current === 2 ? "em-select" : ""}>图片</em>
                                <span className={that.state.current === 2 ? "span-select" : ""}></span>
                            </li>
                            <li onClick={that.switchMediaTabs.bind(that, 3)}>
                                <em className={that.state.current === 3 ? "em-select" : ""}>文字</em>
                                <span className={that.state.current === 3 ? "span-select" : ""}></span>
                            </li>
                        </ul>
                    </div>
                    <ul id="con">
                        <li style={that.state.current === 1 ? {display: 'block'} : {display: 'none'}}>
                            <div className="item-tab">
                                <ul className="item-tit">
                                    <li onClick={that.switchSortTabs.bind(that, 0)}
                                        id={that.state.videoSort === 0 ? "first" : ""}
                                        className={that.state.videoSort === 0 ? "li-active" : ""}>全部
                                    </li>
                                    <li onClick={that.switchSortTabs.bind(that, 1)}
                                        id={that.state.videoSort === 1 ? "two" : ""}
                                        className={that.state.videoSort === 1 ? "li-active" : ""}>热门
                                    </li>
                                </ul>
                                <ul className="item-con">

                                    <li style={that.state.videoSort === 0 ? {display: 'block'} : {display: 'none'}}>
                                        <div className="video">
                                            <ul>
                                                {
                                                    that.state.videoDataAll.length > 0 ? that.state.videoDataAll.map(function (item, index) {
                                                        return (
                                                            <li key={item.id}
                                                                onClick={(e) => that.videoonClick(e, item.mediaurl, item.coverurl, item.content)}>
                                                                <img src={item.coverurl}/>
                                                                <em className="em-active-video">{item.ballot}</em>
                                                            </li>
                                                        )
                                                    }) : null
                                                }
                                            </ul>
                                        </div>
                                    </li>

                                    <li style={that.state.videoSort === 1 ? {display: 'block'} : {display: 'none'}}>
                                        <div className="video">
                                            <ul>
                                                {
                                                    that.state.videoDataHot.length > 0 ? that.state.videoDataHot.map(function (item, index) {
                                                        return (
                                                            <li onClick={(e) => that.videoonClick(e, item.mediaurl, item.coverurl, item.content)}>
                                                                <img src={item.coverurl}/>
                                                                <em className="em-active-video">{item.ballot}</em>
                                                            </li>
                                                        )
                                                    }) : null
                                                }
                                            </ul>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </li>

                        <li style={that.state.current === 2 ? {display: 'block'} : {display: 'none'}}>
                            <div className="item-tab">
                                <ul className="item-tit">
                                    <li onClick={that.switchSortTabs.bind(that, 0)}
                                        id={that.state.imgSort === 0 ? "first" : ""}
                                        className={that.state.imgSort === 0 ? "li-active" : ""}>全部
                                    </li>
                                    <li onClick={that.switchSortTabs.bind(that, 1)}
                                        id={that.state.imgSort === 1 ? "two" : ""}
                                        className={that.state.imgSort === 1 ? "li-active" : ""}>热门
                                    </li>
                                </ul>
                                <ul className="item-con">
                                    <li style={that.state.imgSort === 0 ? {display: 'block'} : {display: 'none'}}>
                                        <div className="video">
                                            <ul>
                                                {
                                                    that.state.imgDataAll.length > 0 ? that.state.imgDataAll.map(function (item, index) {
                                                        return (
                                                            <li onClick={(e) => that.piconClick(e, item.mediaurl, item.content, item.ballot)}>
                                                                <img src={(item.mediaurl.split(";"))[0]}/>
                                                                <em className="em-active-video">{item.ballot}</em>
                                                            </li>
                                                        )
                                                    }) : null
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                    <li style={that.state.imgSort === 1 ? {display: 'block'} : {display: 'none'}}>
                                        <div className="video">
                                            <ul>
                                                {
                                                    that.state.imgDataHot.length > 0 ? that.state.imgDataHot.map(function (item, index) {
                                                        return (
                                                            <li onClick={(e) => that.piconClick(e, item.mediaurl, item.content)}>
                                                                <img src={item.mediaurl}/>
                                                                <em className="em-active-video">{item.ballot}</em>
                                                            </li>
                                                        )
                                                    }) : null
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li style={that.state.current === 3 ? {display: 'block'} : {display: 'none'}}>
                            <div className="item-tab">
                                <ul className="item-tit">
                                    <li onClick={that.switchSortTabs.bind(that, 0)}
                                        id={that.state.textSort === 0 ? "first" : ""}
                                        className={that.state.textSort === 0 ? "li-active" : ""}>全部
                                    </li>
                                    <li onClick={that.switchSortTabs.bind(that, 1)}
                                        id={that.state.textSort === 1 ? "two" : ""}
                                        className={that.state.textSort === 1 ? "li-active" : ""}>热门
                                    </li>
                                </ul>
                                <ul className="item-con">
                                    <li style={that.state.textSort === 0 ? {display: 'block'} : {display: 'none'}}>
                                        <div className="words">
                                            <ul>
                                                {
                                                    that.state.textDataAll.length > 0 ? that.state.textDataAll.map(function (item, index) {
                                                        return (
                                                            <li>
                                                                <img src={item.avatar}/>
                                                                <div className="words-cont">
                                                                    <div className="words-header">
                                                                        <div className="words-header-l">
                                                                            <h2>{item.nickName}</h2>
                                                                            <span>{item.createTime}</span>
                                                                        </div>
                                                                        <div
                                                                            className="words-header-r">{item.ballot}</div>
                                                                    </div>
                                                                    <p>{item.content}</p>
                                                                </div>
                                                            </li>
                                                        )
                                                    }) : null
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                    <li style={that.state.textSort === 1 ? {display: 'block'} : {display: 'none'}}>
                                        <div className="words">
                                            <ul>
                                                {
                                                    that.state.textDataHot.length > 0 ? that.state.textDataHot.map(function (item, index) {
                                                        return (
                                                            <li>
                                                                <img src={item.avatar}/>
                                                                <div className="words-cont">
                                                                    <div className="words-header">
                                                                        <div className="words-header-l">
                                                                            <h2>{item.nickName}</h2>
                                                                            <span>{item.createTime}</span>
                                                                        </div>
                                                                        <div
                                                                            className="words-header-r">{item.ballot}</div>
                                                                    </div>
                                                                    <p>{item.content}</p>
                                                                </div>
                                                            </li>
                                                        )
                                                    }) : null
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="btn" onClick={that.uploadBtn.bind(that)}>上传作品</div>
                {/*阴影成*/}
                <section className={`cmp-fixed${  that.state.showDialog ? ' cover-mask-toggle' : '' }`}></section>
                <div className="msg" style={that.state.showDialog ? {} : {display: 'none'}}>
                    <div className="box">
                        <ul>
                            <li onClick={that.redUrl.bind(that, 1)}>
                                <img src={require('../../images/up-video.png')}/>
                                <span>视频</span>
                            </li>
                            <li onClick={that.redUrl.bind(that, 2)}>
                                <img src={require('../../images/up-img.png')}/>
                                <span>图片</span>
                            </li>
                            <li onClick={that.redUrl.bind(that, 3)}>
                                <img src={require('../../images/up-text.png')}/>
                                <span>文字</span>
                            </li>
                        </ul>
                    </div>
                    <div className="cancel" onClick={that.uploadBtn.bind(that)}>取消</div>
                </div>
            </div>

        );
    }
}

export {Upload}
