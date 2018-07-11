/*
 *   地址选择组件 初始化传入地址
 *   使用方法 父组件调用changeArea方法传递城市参数
 *   btnarea回调函数对父组件的state做属性处理
 * */

import React, {Component} from 'react';

import 'areasCss';

import {provinceList} from 'area';
import {Tip} from 'util';

class Area extends Component {

    constructor(props) {
        super(props);

        this.state = {
            provincial: '',
            city: '',
            area: '',
            chooseProvincial: false,
            chooseCity: false,
            chooseArea: false,
            _provincialList: [],  //省
            _cityList: [],  //市
            _areaList: [],  // 区、县
            _position: 0,  //x轴位移
            provinceId: null, //省id
            cityId: null,   //城市id
            areaId: null,  //区域id
         };

        //屏幕宽度
        this.windowWidth = window.screen.width;

        //事件绑定
        this._provincialList = this._provincialList.bind(this);
        this._cityList = this._cityList.bind(this);
        this._areaList = this._areaList.bind(this);
        this.swithPro = this.swithPro.bind(this);
        this.swithCity = this.swithCity.bind(this);
        this.swithArea = this.swithArea.bind(this);
        this.btnarea = this.btnarea.bind(this);
        this.changeArea = this.changeArea.bind(this);
    }

    componentDidMount() {

    }

    //改变父组件属性
    btnarea(){
        let { provincial, city , area , provinceId, cityId, areaId  } = this.state;
        if(provincial == '' || provincial == '请选择'){
            Tip('请选择省会');
            return false;
        }
        if(city == '' || city == '请选择'){
            Tip('请选择城市');
            return false;
        }
        if(area == '' || area == '请选择'){
            Tip('请选择区域');
            return false;
        }
        this.props.btnarea(provincial, city , area, provinceId, cityId, areaId);
    }

    changeArea(...arg) {
        let that = this;
        //初始化数据
        this.setState({
            provincial: arg[0] || '请选择',
            city: arg[1] || '',
            area: arg[2] || '',
        });

        if (arg.length > 0) {
            that.setState({
                _position: that.windowWidth * (arg.length - 1)
            })
        }
        else {
            that.setState({
                _position: 0
            })
        }

        if(!arg[0]){
            that.setState({
                chooseProvincial: true,
                chooseCity: false,
                chooseArea: false,
            })
        }
        else if(arg[1] && !arg[2]){
            that.setState({
                chooseProvincial: false,
                chooseCity: true,
                chooseArea: false,
            })
        }
        else {
            that.setState({
                chooseProvincial: false,
                chooseCity: false,
                chooseArea: true,
            })
        }

        //初始化省
        provinceList.map((item, index) => {
            if (arg[0] == item.regionName) {
               that.setState({
                   _cityList : provinceList[index].region,
               });
                if (provinceList[index].region) {
                    let cityList = provinceList[index].region;
                    cityList.map((item, index) => {
                        this.setState({cityId: item.id});
                        if (arg[1] == item.regionName) {
                            that.setState({
                                _areaList: item.region
                            })
                        }
                    })
                }
            }
        })
    }

    //匹配省
    matePro(arg){

        provinceList.map((item, index) => {
            if (arg == item.regionName) {
                this.setState({
                    _cityList: provinceList[index].region,
                    provinceId: item.id,
                });
            }
        })

    }

    //匹配城市
    matchCity(arg){

        let { _cityList } = this.state;

        _cityList.map((item, index) => {
            if (arg == item.regionName) {
                this.setState({
                    _areaList: item.region,
                    cityId: item.id,
                });
            }
        })

    }

    //匹配区域
    matchArea(arg){

        let { _areaList } = this.state;

        _areaList.map((item, index) => {
            if (arg == item.regionName) {
                this.setState({
                    area: arg,
                    areaId: item.id,
                });
            }
        })
    }

    //区域选择列表
    _provincialList(event) {

        let element = event.currentTarget;

        let _HTML = element.innerHTML;
        this.setState({
            provincial: _HTML,
            city: '请选择',
            area: '',
        });

        this.setState({
            _position: this.windowWidth * 1,
            chooseProvincial: false,
            chooseCity: true,
            chooseArea: false,
        })

        this.matePro(_HTML);

    }

    _cityList(event) {
        let element = event.currentTarget;

        let _HTML = element.innerHTML;

        this.setState({
            city: _HTML,
            area: '请选择',
        });

        this.setState({
            _position: this.windowWidth * 2,
            chooseProvincial: false,
            chooseCity: false,
            chooseArea: true,
        })

        this.matchCity(_HTML);
    }

    _areaList(event){

        let element = event.currentTarget;

        let _HTML = element.innerHTML;

        this.matchArea(_HTML);
    }

    //切换tab
    swithPro(event){
        event.stopPropagation();
        let value = event.currentTarget.innerHTML;
        if(value == ""){
            return false;
        }

        this.setState({
            _position: this.windowWidth * 0,
            chooseProvincial: true,
            chooseCity: false,
            chooseArea: false,
        })
    }

    swithCity(event){
        event.stopPropagation();
        let value = event.currentTarget.innerHTML;
        if(value == ""){
            return false;
        }

        this.setState({
            _position: this.windowWidth * 1,
            chooseProvincial: false,
            chooseCity: true,
            chooseArea: false,
        })
    }

    swithArea(event){
        event.stopPropagation();
        let value = event.currentTarget.innerHTML;
        if(value == ""){
            return false;
        }

        this.setState({
            _position: this.windowWidth * 2,
            chooseProvincial: false,
            chooseCity: false,
            chooseArea: true,
        })
    }

    render() {

        const {provincial, city, area, chooseProvincial, chooseCity, chooseArea, _provincialList, _cityList, _areaList, _position } = this.state;

        return (
            <div>
                <div className="cmp-nav hy-block">

                    <div className="cmp-nav-title of">地址选择</div>
                    <a href="javascript: void (0)" className="btn-confirm" onClick={this.btnarea}>确定</a>
                </div>

                <section className="content-address overtouch">
                    <div className="hy-tab choose">
                        <ul className="hy-tab-nav wbox">
                            <li onClick={(e) => this.swithPro(e)} className={`${chooseProvincial ? 'current' : ''}`}>{ provincial }</li>
                            <li onClick={(e) => this.swithCity(e)} className={`${chooseCity ? 'current' : ''}`}>{ city }</li>
                            <li onClick={(e) => this.swithArea(e)} className={`${chooseArea ? 'current' : ''}`}>{ area }</li>
                        </ul>
                    </div>
                    <div className="hy-tab-content wbox"
                         style={{
                             width: '300%',
                             transform: 'translate(-' + _position + 'px, 0px) translateZ(0px)',
                             transition: '-webkit-transform 0.3s cubic-bezier(0.333333, 0.666667, 0.666667, 1)',
                         }}>

                        <div className="hy-tab-box wbox-flex">
                            <ul className="city-list" id="provincial">
                                {
                                    _provincialList ? provinceList.map((item, index) => {
                                        return (
                                            <li data-id={item.id} key={index} className={`${provincial == item.regionName ? 'cur' : ''}`}
                                                onClick={this._provincialList}>{ item.regionName }</li>
                                        )
                                    }) : null
                                }
                            </ul>
                        </div>

                        <div className="hy-tab-box wbox-flex">
                            <ul className="city-list" id="city">
                                {
                                    _cityList && _cityList.length > 0 ? _cityList.map((item, index) => {
                                        return (
                                            <li data-id={item.id} key={index} className={`${city == item.regionName ? 'cur' : ''}`}
                                                onClick={this._cityList}>{ item.regionName }</li>
                                        )
                                    }) : null
                                }
                            </ul>
                        </div>

                        <div className="hy-tab-box wbox-flex">
                            <ul className="city-list" id="area">
                                {
                                    _areaList && _areaList.length > 0 ? _areaList.map((item, index) => {
                                        return (
                                            <li data-id={item.id} key={index} onClick={this._areaList} className={`${area == item.regionName ? 'cur' : ''}`}>{item.regionName}</li>
                                        )
                                    }) : null
                                }
                            </ul>
                        </div>

                    </div>

                </section>
            </div>
        )
    }

}

export {Area}