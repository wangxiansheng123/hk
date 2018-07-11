/*
 * 图片放大 容器组件
 */

import React, {Component} from 'react';

import {MaskLoading} from 'maskloadingJsx';

import {Api} from 'api';
import {Tip} from 'util';
//获取userId和token
import {getUser} from 'getUser';
import {encription, parseQueryString} from 'query';
import {nativeFun} from 'nativeFun';
//轮播组件
import Swiper from 'swiperJs';
import 'swiper';


class Picture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideNum: "1", //slide切换数
            picNum: [],//图片地址数据
            show: true,
        };

        //获取url后的参数
        this.queryAgr = parseQueryString(window.location.href);
    }

    componentDidMount() {
        let that = this;
        let picArr = (this.queryAgr.mediaurl).split(";");
        for (let i = 0; i < picArr.length; i++) {
            that.state.picNum.push(picArr[i]);
            that.setState({
                picNum: that.state.picNum,
            }, () => {
                that.swiper = new Swiper('.swiper-container', {
                    onTransitionEnd: function (swiper) {
                        that.setState({
                            slideNum: swiper.activeIndex + 1,
                        });
                    },
                });
            });
        }
        that.title_fun();
    }

    componentWillUnmount() {

    }


    //native页面标题
    title_fun() {
        let jsonParams = {
            'funName': 'title_fun',
            'params': {
                "title": '图片放大',
            }
        };
        nativeFun(jsonParams);
    }

    render() {
        let that = this;
        const {slideNum, picNum, show} = this.state;

        return (
            <div className="page">
                <div className="pic">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {
                                picNum.length > 0 ?
                                    picNum.map((item, index) => {
                                        return (
                                            <div key={index} className="swiper-slide"><img src={item}/></div>
                                        )
                                    })
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div className="words">
                    <div className="text">{that.queryAgr.content}</div>
                    <div className="star">
                        {picNum.length != 0 ? <span>{slideNum}/{picNum.length}</span> : null}
                        <em className={show ? 'em-active' : null}>{that.queryAgr.ballot}</em>
                    </div>
                </div>
            </div>
        )
    }
}


export {Picture}
