/*
 * 发布 容器组件
 */

import React, {Component} from 'react';

import {MaskLoading} from 'maskloadingJsx';
import {IsLoading} from 'loadingJsx';

import {Api} from 'api';
import {Tip} from 'util';
import $ from 'zepto';
//获取userId和token
import {getUser} from 'getUser';
import {encription, parseQueryString} from 'query';
import {nativeFun} from 'nativeFun';
import {jumpTo} from 'jump';

class PostSth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            filesList: [],
            videoUrl: '',
            type: 1,
            leftNum: 0,
            isUploading: false,
            coverUrl: ''
        };

        this.user = getUser();

        //url解析
        this.query = parseQueryString(window.location.href);

    }

    componentDidMount() {
        let that = this;
        let params = parseQueryString(window.location.href);
        that.setState({
            text: params.title ? '#' + params.title + '#' : '',
            type: params.type
        });
        that.activityId = params.activityId;
        that.title_fun();
    }

    startPostData() {
        let that = this;
        that.setState({
            isUploading: true
        });
        let url = '';
        if (that.state.type == 2) {
            url = that.state.filesList.join(';');
        } else if (that.state.type == 1) {
            url = that.state.videoUrl;
        } else {
            url = ''
        }
        let data = {
            "channelId": 180206,
            "activeId": that.activityId,
            "userId": that.user.userId,
            "type": that.state.type,
            "url": url,
            "description": that.state.text,
            "coverUrl": that.state.coverUrl,
        };
        let params = {
            url: '/mobile-web-activity/ws/mobile/v1/activity/picuploadpublish',
            method: 'post',
            params: JSON.stringify(data),
        };
        Api(params)
            .done((data) => {
                that.setState({
                    isUploading: false
                });
                if (data.code == 0) {
                    Tip('提交成功，正在审核', 3000);
                    window.setTimeout(function () {
                        jumpTo(parseFloat(that.query.sort) + 1);
                    }, 3000);
                } else {
                    Tip('提交失败，请重新提交', 3000);
                }
            })
            .fail((error) => {
                that.setState({
                    isUploading: false
                });
                Tip('服务器错误', 3000)
            });
    }

    //评论内容字数限制
    handleChange(e) {
        let that = this;
        let element = e.currentTarget;

        that.setState({
            text: element.value,
            leftNum: element.value.length
        });
    }

    selectImg(e) {
        let that = this;
        let file = e.target.files[0];
        console.log(file);
        window.alert(JSON.parse(file));
        that.setState({
            text: file,
        })
    }

    //文件上传展示
    handleInputChange(e) {
        let that = this;
        that.setState({
            isUploading: true
        });
        let {filesList} = this.state;
        let formData = new FormData();
        let element = e.currentTarget;
        if (!element.files || !element.files[0]) {
            return false;
        }
        formData.append('uploadfile', element.files[0]);
        $.ajax({
            type: 'post',
            //url: 'http://183.131.159.208:10028/otv/upload',  //测试环境
            url: 'http://upload.hkwx.allook.cn:8095/otv/upload', //正式环境
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                let response = JSON.parse(res);
                if (response.code == 0) {
                    that.setState({
                        filesList: filesList.concat(response.fileUrl),
                        isUploading: false
                    });
                } else {
                    that.setState({
                        isUploading: false
                    });
                    Tip(response.message, 3000);
                }
                formData.delete('uploadfile');
            },
            error: function () {
                that.setState({
                    isUploading: false
                });
                Tip("上传图片失败", 3000);
            }
        })
    }

    handleVideoChange(e) {
        let that = this;
        that.setState({
            isUploading: true
        });
        let formData = new FormData();
        let element = e.currentTarget;
        if (!element.files || !element.files[0]) {
            return false;
        }
        formData.append('uploadfile', element.files[0]);
        $.ajax({
            type: 'post',
            // url: 'http://183.131.159.208:10028/otv/upload',  //测试环境
            url: 'http://upload.hkwx.allook.cn:8095/otv/upload', //正式环境
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                let response = JSON.parse(res);
                if (response.code == 0) {
                    that.setState({
                        videoUrl: response.fileUrl,
                        coverUrl: response.pictureUrl,
                        isUploading: false
                    });
                } else {
                    that.setState({
                        isUploading: false
                    });
                    Tip(response.message, 3000);
                }
                formData.delete('uploadfile');
            },
            error: function (xmlhttprequest, textstatus, errorthrown) {
                that.setState({
                    isUploading: false
                });
                Tip("上传失败", 3000);
            }
        })
    }

    delVideo() {
        this.setState({
            videoUrl: ''
        })
    }

    delImg(index) {
        let that = this;
        const {filesList} = that.state;
        filesList.splice(index, 1);
        that.setState({
            filesList: filesList,
        });
    }

    //native页面标题
    title_fun() {
        let jsonParams = {
            'funName': 'title_fun',
            'params': {
                "title": '上传作品',
            }
        };
        nativeFun(jsonParams);
    }

    render() {
        let that = this;
        return (
            <div className="page">
                <div className="review">
                    <div className="reviewBox">
                        <div className="review-down">
                            <textarea className="reviewtext" maxLength="100" onChange={(e) => this.handleChange(e)}
                                      value={that.state.text}>{that.state.text}</textarea>
                            <div className="count-down"><em>{that.state.leftNum}</em>/100</div>
                        </div>
                    </div>
                    <div className="pictureBox">
                        <ul>
                            {
                                that.state.type == 2 && that.state.filesList.length > 0 ? that.state.filesList.map(function (item, index) {
                                    return (
                                        <li className="pictureBox-item">
                                            <img src={item}/>
                                            <span onClick={that.delImg.bind(that, index)}>X</span>
                                        </li>
                                    )
                                }) : null
                            }
                            {
                                that.state.videoUrl ?
                                    <li className="pictureBox-item">
                                        <video name="media" style={{display: 'none'}}>
                                            <source src={that.state.videoUrl} type="video/mp4"/>
                                        </video>
                                        <img src={that.state.coverUrl}/>
                                        <span onClick={that.delVideo.bind(that)}>X</span>
                                    </li>
                                    :
                                    (that.state.type == 1 ?
                                            <li className="pictureBox-item">
                                                <img src={require('../../images/addVideo.png')}/>
                                                <input className="upload" type="file" name="video" accept="video/*"
                                                       onChange={(e) => this.handleVideoChange(e)}/>
                                            </li> : null
                                    )
                            }
                            {
                                that.state.type == 2 && that.state.filesList.length < 8 ?
                                    <li className="pictureBox-item">
                                        <img src={require('../../images/addTo.png')}/>
                                        <input className="upload" type="file" name="image" accept="image/*" multiple
                                               onChange={(e) => this.handleInputChange(e)}/>
                                    </li> : null
                            }
                        </ul>
                    </div>
                    <div className="item-btns">
                        <a className="btn-login" href="javascript:void(0);"
                           onClick={that.startPostData.bind(that)}>发布</a>
                    </div>
                    {
                        that.state.isUploading ?
                            <MaskLoading/> : null
                    }
                </div>
            </div>
        );
    }
}

export {PostSth}
