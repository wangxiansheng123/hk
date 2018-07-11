/*
 * 投票 容器组件
 */

import React, {Component} from 'react';

import {MaskLoading} from 'maskloadingJsx';
import {Banner} from 'bannerJsx';

import {Api} from 'api';
import {Tip} from 'util';
//获取userId和token
import {getUser} from 'getUser';
import {encription, parseQueryString} from 'query';
import {nativeFun} from 'nativeFun';
import {createUrl} from 'jump';

class Vote extends Component {
    static defaultProps = {
        banner: {
            title: '#过一个有意义的春节#',
            number: '49人参与',
            article: '"益暖中华"--谷歌杯中国大学生公益创意大赛是由谷歌（GOOLGE）发起，通过征集公益创意，资助获奖项目的形式，以促进社会公益事业发展，倡导大学生积极投身社会公益事业覆盖部分的三个部分的失落感理发店，两个是范德萨的范德萨范德萨发生反倒是说的范德萨是非得失东方闪电发的所发生的发按时发达发送',
            center: true,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            voteId: "",//活动id
            imgDetailList: "",//图片请求数据
            imgDetailListArray: [],//存放图片本地处理数据
            textDetailList: "",  //文字请求数据
            textDetailListArray: [],//存放文字本地处理数据
        };

        //userId
        this.user = getUser();

        //解析url后的参数
        this.query = parseQueryString(window.location.href);

        //事件绑定
        this.emonClick = this.emonClick.bind(this);
    }

    componentDidMount() {
        //页面初始化数据
        this.apiRequest();
    }

    componentWillUnmount() {

    }

    //native页面标题
    title_fun() {
        let jsonParams = {
            'funName': 'title_fun',
            'params': {
                "title": '投票',
            }
        };
        nativeFun(jsonParams);
    }

    apiRequest() {
        let that = this;
        let {imgDetailListArray, textDetailListArray} = this.state;
        let data = {
            "activeId": this.query.activityId
        };

        let param = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/getVoteActivity',
            method: 'post',
            params: JSON.stringify(data),
        };

        Api(param)
            .done((data) => {
                if (data.code == 0) {
                    data.response.imgDetailList.forEach(function (value, index, array) {
                        let obj = {};
                        obj["data"] = value;
                        obj["show"] = false;
                        imgDetailListArray.push(obj);
                    });
                    that.setState({
                        voteId: data.response.id,
                        imgDetailList: imgDetailListArray,
                        textDetailList: imgDetailListArray,
                        textDetailList: textDetailListArray,
                    })
                } else {
                    Tip(data.msg);
                }
                that.title_fun();
            })
            .fail((error) => {
                Tip('服务器错误');
            })

    }

    emonClick(e, index, count, voteOptionId) {
        let that = this;
        const {imgDetailListArray, voteId} = this.state;
        let data = {
            "userId": that.user.userId,
            "voteId": voteId,
            "optionId": voteOptionId,
        };

        let param = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/voteCommit',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(param)
            .done((data) => {
                if (data.code == 0) {
                    if (data.response.sumCount > 0) {
                        imgDetailListArray[index].show = true;
                        imgDetailListArray[index].data.count = (imgDetailListArray[index].data.count) + 1;
                        that.setState({
                            imgDetailList: imgDetailListArray,
                        });
                    }
                    that.nextBtn(createUrl(parseFloat(that.query.sort) + 1));
                } else if (data.code == 300001) {
                    Tip(data.msg);
                    that.nextBtn(createUrl(parseFloat(that.query.sort) + 1));
                }
                else {
                    Tip(data.msg);
                }
            })
            .fail((error) => {
                Tip('服务器错误');
            })
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

    render() {
        const {imgDetailList, textDetailList,} = this.state;
        const {banner} = this.props;
        return (
            <div className="page">
                {/*公共部分*/}
                <Banner banner={banner} activeTitle={this.query.activeTitle} description={this.query.description}/>
                <div className="view">
                    <h2 className="view-title">以下看法你支持哪一个</h2>
                    <div className="view-content">
                        <ul className="view-pc">
                            {
                                imgDetailList.length > 0 ?
                                    imgDetailList.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <img src={item.data.voteUrl}/>
                                                <span>{index + 1}</span>
                                                <em className={item.show ? 'em-active' : ''}
                                                    onClick={(e) => this.emonClick(e, index, item.data.count, item.data.voteOptionId)}>{item.data.count}</em>
                                            </li>
                                        )
                                    })
                                    : null
                            }
                        </ul>
                        <ul className="view-text">
                            {
                                textDetailList.length > 0 ?
                                    textDetailList.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="num">
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="text-content">
                                                    <p>{item.data.voteTitle}</p>
                                                    <div className="text-bown">
                                                        <em className={item.show ? 'em-active-text' : ''}
                                                            onClick={(e) => this.emonClick(e, index, item.data.count, item.data.voteOptionId)}>{item.data.count}</em>
                                                        {item.data.voteTitle <= 120 ?
                                                            <span className="browse">浏览全文</span> : null
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                    : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export {Vote}
