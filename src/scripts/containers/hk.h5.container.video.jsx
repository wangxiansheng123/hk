/*
 * 视频播放 容器组件
 */

import React, {Component} from 'react';

import {MaskLoading} from 'maskloadingJsx';

import {Api} from 'api';
import {Tip} from 'util';
//获取userId和token
import {getUser} from 'getUser';
import {encription, parseQueryString} from 'query';
import {nativeFun} from 'nativeFun';

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Playback: false, //播放/暂停
            show: true,  //点赞
        };

        //获取url后的参数
        this.queryAgr = parseQueryString(window.location.href);

        //事件绑定
    }

    componentDidMount() {
        let that = this;
        const {Playback} = this.state;
        let myVideo = document.getElementById("video1");
        if (Playback) {
            myVideo.play();
        } else {
            myVideo.pause();
        }
        that.title_fun();
    }

    componentWillUnmount() {

    }

    componentDidUpdate() {
        const {Playback} = this.state;
        let myVideo = document.getElementById("video1");
        if (Playback) {
            myVideo.play();
        } else {
            myVideo.pause();
        }
    }

    //native页面标题
    title_fun() {
        let jsonParams = {
            'funName': 'title_fun',
            'params': {
                "title": '视频播放',
            }
        };
        nativeFun(jsonParams);
    }

    //播放状态
    PlaybackClick(e) {
        let that = this;
        const {Playback} = this.state;
        let myVideo = document.getElementById("video1");
        this.setState({
            Playback: !Playback,
        }, () => {
            if (!Playback) {
                myVideo.play();
            } else {
                myVideo.pause();
            }
        });
    }

    render() {
        let that = this;
        const {Playback, show} = this.state;
        return (
            <div className="page">
                <div className="shipin">
                    <div className="shipin-item" onClick={(e) => this.PlaybackClick(e)}>
                        <video id="video1" name="media" poster={that.queryAgr.coverurl} preload="none"
                               webkit-playsinline="true">
                            <source src={that.queryAgr.mediaurl} type="video/mp4"/>
                        </video>
                    </div>

                    {!Playback ?
                        <img onClick={(e) => this.PlaybackClick(e)} className="suspend"
                             src={require('../../images/vote/ico80_play@2x.png')}/> : null
                    }
                    <div className="words">
                        <div className="text">{that.queryAgr.content}</div>
                        <div className="star">
                            <em className={show ? 'em-active' : null}>2000</em>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export {Video}
