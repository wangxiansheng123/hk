/*
 * 我的发布 容器组件
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


class Release extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Switch: 1,    //切换状态
            Selected: true,//选中状态
            allSelected: true,//全选状态
            show: true,//展示状态

        };
        //时间戳
        this.timeStamp = Date.parse(new Date());
        this.queryAgr = parseQueryString(window.location.href);

        //事件绑定
        this.tabClick = this.tabClick.bind(this);
        this.selectClick = this.selectClick.bind(this);
        this.radioClick = this.radioClick.bind(this);
        this.allSelectedClick = this.allSelectedClick.bind(this);
    }

    componentDidMount() {
        let that = this;
        that.title_fun();
    }

    componentWillUnmount() {

    }

    //native页面标题
    title_fun() {
        let jsonParams = {
            'funName': 'title_fun',
            'params': {
                "title": '我的发布',
            }
        };
        nativeFun(jsonParams);
    }

    tabClick(e, index) {
        let that = this;
        const {Switch} = that.state;
        that.setState({
            Switch: index,
        });
    }

    //编辑/完成
    selectClick(e) {
        let that = this;
        const {Selected} = that.state;
        that.setState({
            Selected: !Selected
        });
    }

    //单选
    radioClick(e) {
        let that = this;
        const {allSelected} = this.state;
        that.setState({
            allSelected: !allSelected
        });
    }

    //全选
    allSelectedClick(e) {
        let that = this;
        const {allSelected} = this.state;
        that.setState({
            allSelected: !allSelected
        });
    }

    //删除
    deleteonClick(e) {
        let that = this;

    }

    render() {
        const {Switch, Selected, allSelected, show} = this.state;
        return (
            <div className="page">

                <div className="title">
                    <ul id="tit">
                        <li onClick={(e) => this.tabClick(e, 1)}>
                            <em className={Switch == 1 ? 'em-select' : null}>上传</em>
                            <span className={Switch == 1 ? 'span-select' : null}></span>
                        </li>
                        <li onClick={(e) => this.tabClick(e, 2)}>
                            <em className={Switch == 2 ? 'em-select' : null}>审核</em>
                            <span className={Switch == 2 ? 'span-select' : null}></span>
                        </li>
                        <li onClick={(e) => this.tabClick(e, 3)}>
                            <em className={Switch == 3 ? 'em-select' : null}>发布</em>
                            <span className={Switch == 3 ? 'span-select' : null}></span>
                        </li>
                    </ul>
                    <img onClick={(e) => this.selectClick(e)}
                         src={Selected ? require('../../images/release/ico_edit@1.5x.png') : require('../../images/release/ico_close@1.5x.png')}/>
                </div>
                <ul id="con">
                    {Switch == 1 ? <li>
                        <ul className="pic-box">
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r"> 上传中</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r"> 上传中</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r"> 上传中</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r"> 上传中</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r"> 上传中</div>
                                        </div>
                                    </div>
                                </div>
                            </li>


                        </ul>
                    </li> : null
                    }
                    {Switch == 2 ? <li>
                        <ul className="pic-box">
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r">审核中</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r">审核中</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r">审核中</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span className={show ? 'span-f-active' : null}>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r">审核中</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li> : null}
                    {Switch == 3 ? <li>
                        <ul className="pic-box">
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r">已发布</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r">已发布</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {!Selected ?
                                    <img className="pic-select"
                                         src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/> : null}
                                <div className={`play${ Selected ? ' play-active' : '' }`}>
                                    <div className="pic">
                                        <img src={require('../../images/release/goods_02.jpg')}/>
                                    </div>
                                    <div className={`pic-r${ !Selected ? ' pic-r-active' : '' }`}>
                                        <p>方式发大水发送发的啥撒旦飞洒地方撒旦案发地方撒打法是否沙发撒的发大水法萨芬士大夫撒范德萨发沙发沙发舒服萨芬撒飞洒地方撒法法师的法师法法师法师法师发斯蒂芬啊收到范德萨发发法法阿萨德发的萨芬</p>
                                        <div className="pic-down">
                                            <div className="pic-down-l">
                                                <span>20</span>
                                                <em>300</em>
                                            </div>
                                            <div className="pic-down-r">已发布</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li> : null}
                    {!Selected ? <div className="msg">
                        <div><img onClick={(e) => this.allSelectedClick(e)}
                                  src={allSelected ? require('../../images/release/0127_70.png') : require('../../images/release/0127_71.png')}/>全选
                        </div>
                        <div className="delect" onClick={(e) => this.deleteonClick(e)}>删除</div>
                    </div> : null}
                </ul>
            </div>
        )
    }
}


export {Release}
