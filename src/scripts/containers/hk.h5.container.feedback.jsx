/*
 * 帮助反馈 容器组件
 */

import React, {Component} from 'react';

import {MaskLoading} from 'maskloadingJsx';

import {Api} from 'api';
import {CheckPhone, Tip} from 'util';
//获取userId 
import {getUser} from 'getUser';
import {encription, parseQueryString} from 'query';
import $ from 'zepto';


class Feedback extends Component {
    static defaultProps = {
        header: {
            title: '帮助反馈',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            problemData: [],//问题数据
            Select: 0,//默认选中
            id: "",//默认id
            fbDescription: "", //反馈描述
            mobileNumber: "", //电话号码默认值
            orderHandleArray: [],//存放图片地址
            singlePoint: false//单点控制
        };
        //时间戳
        this.timeStamp = Date.parse(new Date());

        //事件绑定
        this.handleFeedBack = this.handleFeedBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePaoneChange = this.handlePaoneChange.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
    }

    componentDidMount() {
        let that = this;
        that.doRequest();
    }

    componentWillUnmount() {

    }

    //获取反馈问题数据
    doRequest() {
        let that = this;
        let data = {
            "channelId": 180206,
        };
        let params = {
            //url: 'http://ceshi-106.otvcloud.com/haikan/helepFeedback/getQuestionClassificationList',  //测试环境
            url: 'http://api.hkwx.allook.cn:8091/haikan_api-3.2/helepFeedback/getQuestionClassificationList',  //正式环境
            method: 'get',
            params: data,
        };

        Api(params)
            .done((data) => {
                if (data.code == 0) {
                    that.setState({
                        problemData: data.data,
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

    //反馈问题操作
    handleFeedBack(e, index, id) {
        let that = this;
        that.setState({
            Select: index,
            id: id,
        })
    }

    //评论内容字数限制
    handleChange(e) {
        let that = this;
        let element = e.currentTarget;
        if (element.value.length <= 0) {
            element.parentNode.lastElementChild.style.display = "block";
        } else {
            element.parentNode.lastElementChild.style.display = "none";
            if (element.value.length >= 300) {
                element.value = element.value.substr(0, 300);
            }
        }
        that.setState({
            fbDescription: element.value,
        });
    }

    //图片上传展示
    handleInputChange(e) {
        let that = this;
        let {orderHandleArray} = this.state;
        let formData = new FormData();
        let element = e.currentTarget;
        if (!element.files || !element.files[0]) {
            return false;
        }
        formData.append('uploadfile', element.files[0]);
        $.ajax({
            type: 'post',
            //url: 'http://183.131.159.208:10028/otv/upload', //测试环境
            url: 'http://upload.hkwx.allook.cn:8081/otv/upload', //正式环境
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                that.setState({
                    orderHandleArray: orderHandleArray.concat(JSON.parse(res).fileUrl),
                });
                formData.delete('uploadfile');
            },
            error: function () {
                Tip("上传图片失败");
            }
        })
    }

    //删除图片
    delete(e, indexx) {
        let that = this;
        const {orderHandleArray} = that.state;
        orderHandleArray.splice(indexx, 1);
        that.setState({
            orderHandleArray: orderHandleArray,
        });
    }

    //电话号码获取
    handlePaoneChange(e) {
        let that = this;
        let element = e.currentTarget;
        that.setState({
            mobileNumber: element.value,
        });
    }

    //点击发布
    handlePublish() {
        let that = this;
        const {fbDescription, mobileNumber,} = that.state;

        if (fbDescription.length < 5) {
            Tip("评论内容不能少于5个字");
            return false;
        }

        if (mobileNumber.length == 0) {
            Tip("手机号码不能为空!");
            return false;
        }
        if (!that.checkmobile(mobileNumber)) {
            Tip("手机号码格式错误!");
            return false;
        }

        that.rdercComment();
    }

    checkmobile(mobile) {
        if (!mobile) {
            return false;
        }
        return /^1[34578]\d{9}$/.test(mobile);
    }

    //报错反馈求助接口
    rdercComment() {
        let that = this;
        const {id, fbDescription, mobileNumber, orderHandleArray} = that.state;
        //单点控制singlePoint
        that.setState({
            singlePoint: true,
        });
        let data = {
            channelId: 180206,
            mobileNumber: mobileNumber,
            classificationId: id,
            fbDescription: fbDescription,
            fbImgUrls: orderHandleArray,
        };
        let param = {
            //url: 'http://ceshi-106.otvcloud.com/haikan/helepFeedback/saveUserFeed', //测试环境
            url: 'http://api.hkwx.allook.cn:8091/haikan_api-3.2/helepFeedback/saveUserFeed', //正式环境
            method: 'get',
            params: data,
        };
        Api(param)
            .done((data) => {
                if (data.code == 0) {
                    this.setState({
                        singlePoint: false,
                    });
                    Tip("提交成功", 3000);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } else {
                    Tip(data.msg);
                }
            })
            .fail((error) => {
                Tip('服务器错误!');
            });
    }


    render() {
        const {problemData, Select, orderHandleArray, singlePoint} = this.state;
        console.log("orderHandleArray" + orderHandleArray);
        return (
            <div className="hy-mask">
                {/*content*/}
                <section className="cart-page">
                    <div className="review">
                        <div className="review-up">请选择你的问题</div>
                        <ul className="Choice">
                            {
                                problemData && problemData.length > 0 ?
                                    problemData.map((item, index) => {
                                        return (
                                            <li key={index} data-id={item.id}
                                                onClick={(e) => this.handleFeedBack(e, index, item.id)}>
                                                <span>{item.name}</span>
                                                <img
                                                    src={require(Select == index ? '../../images/feedback/0127_70.png' : '../../images/feedback/0127_71.png')}/>
                                            </li>
                                        )
                                    }) : null
                            }
                        </ul>
                        <div className="reviewBox">
                            <div className="review-down">
                                <textarea className="reviewtext" name="" rows="" cols="" maxlength="300"
                                          onChange={(e) => this.handleChange(e)}>
                                 </textarea>
                                <div className="hintText">请详细描述你的问题</div>
                            </div>
                        </div>
                        <div className="pictureBox">
                            <div className="picture-title">图片</div>
                            <div className="backPic">
                                {
                                    orderHandleArray && orderHandleArray.length > 0 ?
                                        orderHandleArray.map((itemx, indexx) => {
                                            return (
                                                <div className="localPic"><img src={itemx} key={indexx}/>
                                                    <span className="close"
                                                          onClick={(e) => this.delete(e, indexx)}>
                                                     </span>
                                                </div>
                                            )
                                        }) : null
                                }
                                {
                                    orderHandleArray && orderHandleArray.length < 3 ?
                                        <div className="pictureBox-item">
                                            <img src={require('../../images/feedback/addTo.png')}/>
                                            <input className="upload" type="file" name="image"
                                                   accept="image/*"
                                                   onChange={(e) => this.handleInputChange(e)}/>
                                        </div> : null
                                }
                            </div>
                        </div>
                        <div className="phone">
                            <input type="tel" pattern="\d*" maxlength="11" placeholder="请留下你的联系方式"
                                   onChange={(e) => this.handlePaoneChange(e)}/>
                        </div>
                        {
                            singlePoint ? <div className="item item-btns">
                                <a className="btn-login" href="javascript:void(0);">提交</a>
                            </div> : <div className="item item-btns">
                                <a className="btn-login" href="javascript:void(0);"
                                   onClick={this.handlePublish}>提交</a>
                            </div>
                        }
                    </div>
                </section>
            </div>
        )
    }
}


export {Feedback}















