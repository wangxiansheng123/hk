/*
 * 问卷 容器组件
 */

import React, {Component} from 'react';

import {MaskLoading} from 'maskloadingJsx';
import {Banner} from 'bannerJsx';

import {Api} from 'api';
import {Tip} from 'util';
//获取userId和token
import {getUser} from 'getUser';
import {parseQueryString} from 'query';
import {nativeFun} from 'nativeFun';
import {jumpTo} from 'jump';


class Questionnaire extends Component {
    static defaultProps = {
        banner: {
            title: '#过一个有意义的春节#',
            number: '',
            article: '',
            center: true,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            receiveDataArray: "", //  本地接收数据
            receiveData: "",//本地列表接收数据
            channelId: "",//
            optionId: "",
            questionId: "",
            answer: "",
            show: [1, 0, 0, 0],//选中状态
        };

        //设置userId
        this.user = getUser();

        //解析url后的参数
        this.query = parseQueryString(window.location.href);

        //事件绑定
        this.imgonClick = this.imgonClick.bind(this);
        this.btnonClick = this.btnonClick.bind(this);
        this.textonClick = this.textonClick.bind(this);
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
                "title": '问卷',
            }
        };
        nativeFun(jsonParams);
    }

    apiRequest() {
        let that = this;
        let data = {
            "activeId": that.query.activityId
        };
        let param = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/getaskActivity',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(param)
            .done((data) => {
                if (data.code == 0) {
                    that.setState({
                        receiveDataArray: data.response,
                        receiveData: eval(data.response.detail),
                    });
                    that.state.optionId = 0;
                    that.state.questionId = data.response.id;
                    let answerText = JSON.parse(data.response.detail);
                    for (let i = 0; i < answerText.length; i++) {
                        if (i == 0) {
                            that.state.answer = answerText[i].answer;
                        }
                    }
                } else {
                    Tip(data.msg);
                }
                that.title_fun();
            })
            .fail((error) => {
                Tip('服务器错误');
            })
    }

    //点击选择
    imgonClick(e, index, answer) {
        let that = this;
        that.state.optionId = index;

        if (index !== 3) {
            that.state.answer = answer;
        }
        const {show, receiveData} = this.state;
        for (let i = 0; i < show.length; i++) {
            if (i == index) {
                show[i] = 1;
            } else {
                show[i] = 0;
            }
        }
        that.setState({
            show: show,
            receiveData: receiveData,
        });
    }

    //文字输入显示
    textonClick(e) {
        let that = this;
        let answ = document.querySelector(".other-text").value;
        that.state.answer = answ;
        that.setState({
            show: [0, 0, 0, 1],//选中状态
        });
    }

    //点击提交
    btnonClick(e) {
        let that = this;
        let data = {
            userId: that.user.userId,
            // "userId": that.user.userId,
            answerparam: JSON.stringify([{
                "optionId": that.state.optionId,
                "questionId": that.state.questionId,
                "answer": that.state.answer
            }]),
        };

        let param = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/askCommit',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(param)
            .done((data) => {
                if (data.code == 0) {
                    Tip("提交成功", 3000);
                    setTimeout(() => {
                        jumpTo(parseFloat(this.query.sort) + 1);
                    }, 3000);
                } else {
                    Tip(data.msg, 3000);
                }
            })
            .fail((error) => {
                Tip('服务器错误');
            })
    }

    render() {
        const {receiveDataArray, receiveData, show} = this.state;
        const {banner} = this.props;
        return (
            <div className="page">
                {/*公共部分*/}
                <Banner banner={banner} activeTitle={this.query.activeTitle} description={this.query.description}/>
                <div className="content">
                    <h2>{receiveDataArray.question}</h2>
                    <ul>
                        {
                            receiveData.length > 0 ?
                                receiveData.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <span>{item.answer}</span>
                                            <img onClick={(e) => this.imgonClick(e, index, item.answer)}
                                                 src={require(show[index] == 1 ? '../../images/0127_70.png' : '../../images/0127_71.png')}/>
                                        </li>
                                    )
                                })
                                : null
                        }
                        <div className="other">
                            <textarea onChange={(e) => this.textonClick(e)} className="other-text" name="" rows=""
                                      cols="" maxlength="200"></textarea>
                        </div>
                    </ul>

                </div>
                <div className="btn" onClick={(e) => this.btnonClick(e)}>提交</div>
            </div>
        )
    }
}


export {Questionnaire}
