/*
 * 静态页 容器组件
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

class StaticPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        //userId
        this.user = getUser();

        //解析url后的参数
        this.query = parseQueryString(window.location.href);

        //事件绑定

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {
        return (
            <div className="page">
                <div className="title">
                    苹果设备开通海看无限VIP教程
                </div>
                <ul>
                    <li>
                        <h2>1.选择套餐,点击开通按钮</h2>
                        <img src={require('../../images/staticPage/help_icon01.png')}/>
                    </li>
                    <li>
                        <h2>2.输入密码或使用指纹确认购买</h2>
                        <img src={require('../../images/staticPage/help_icon02.png')}/>
                    </li>
                    <li>
                        <h2>3.你未绑定支付方式,则需要完善APP Store的付款信息</h2>
                        <img src={require('../../images/staticPage/help_icon03.png')}/>
                    </li>
                    <li>
                        <h2>4.在账户设置中选择"微信支付 "并点击" 前往微信验证</h2>
                        <img src={require('../../images/staticPage/help_icon04.png')}/>
                    </li>
                    <li>
                        <h2>5.输入密码完成微信免支付验证</h2>
                        <img src={require('../../images/staticPage/help_icon05.png')}/>
                    </li>
                    <li>
                        <h2>6.回到APP Store完善个人账单信息后点击" 完成 "即可<br/>继续开通海看无限VIP</h2>
                        <img src={require('../../images/staticPage/help_icon06.png')}/>
                    </li>
                    <li>
                        <h2>7.成功绑定付款信息后将重新确认购买, 看到设置完成<br/>的提示就开通成功啦 </h2>
                        <img src={require('../../images/staticPage/help_icon07.png')}/>
                    </li>
                    <li>
                        <h2>8.若你需要切换绑定的支付方式可在APP Store的快速<br/>链接中更改</h2>
                        <img src={require('../../images/staticPage/help_icon08.png')}/>
                    </li>
                </ul>
            </div>
        )
    }
}


export {StaticPage}

