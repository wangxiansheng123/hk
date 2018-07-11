/**
 * Created by niwei on 2018/3/7.
 * 页面跳转
 */

import store from 'store';
import {nativeFun} from 'nativeFun';

let jumpTo = (sort) => {
    //获取当前活动页在存储活动列表的索引值
    let activityList = store.get('activityList');
    let activityId = store.get('activityId');
    let activeTitle = store.get('activeTitle');
    let description = store.get('description');


    if (sort == activityList.length) {
        let jsonParams = {
            'funName': 'index_fun',
            'params': {}
        };
        nativeFun(jsonParams);
        return false;
    }

    //报名
    if (activityList[sort].activeType == 1) {

        window.location.href = 'msg.html?activityId=' + activityId + '&sort=' + sort + '&tip=1';
    }
    //问卷
    else if (activityList[sort].activeType == 2) {

        window.location.href = 'questionnaire.html?activityId=' + activityId + '&sort=' + sort + '&description=' + encodeURIComponent(description) + '&activeTitle=' + encodeURIComponent(activeTitle) + '&tip=1';
    }
    //投票
    else if (activityList[sort].activeType == 3) {
        window.location.href = 'vote.html?activityId=' + activityId + '&sort=' + sort + '&description=' + encodeURIComponent(description) + '&activeTitle=' + encodeURIComponent(activeTitle) + '&tip=1';
    }
    //抽奖
    else if (activityList[sort].activeType == 4) {
        window.location.href = 'carousel.html?activityId=' + activityId + '&sort=' + sort + '&tip=1';
    }
    //即拍即传
    else if (activityList[sort].activeType == 5) {
        window.location.href = 'upload.html?activityId=' + activityId + '&sort=' + sort + '&tip=1';
    }
};

//下一步按钮url创建
let createUrl = (sort) => {
    //获取当前活动页在存储活动列表的索引值
    let activityList = store.get('activityList');
    let activityId = store.get('activityId');
    if (parseFloat(sort) == activityList.length) {
        return '';
    }
    let url = window.location.host;
    if (url.indexOf('http://') < 0) {
        url = 'http://' + url;
    }
    //报名
    if (activityList[sort].activeType == 1) {
        return url + '/front/msg.html?activityId=' + activityId + '&sort=' + sort + '&tip=1';
    }
    //问卷
    else if (activityList[sort].activeType == 2) {
        return url + '/front/questionnaire.html?activityId=' + activityId + '&sort=' + sort + '&tip=1';
    }
    //投票
    else if (activityList[sort].activeType == 3) {
        return url + '/front/vote.html?activityId=' + activityId + '&sort=' + sort + '&tip=1';
    }
    //抽奖
    else if (activityList[sort].activeType == 4) {
        return url + '/front/carousel.html?activityId=' + activityId + '&sort=' + sort + '&tip=1';
    }
    //即拍即传
    else if (activityList[sort].activeType == 5) {
        return url + '/front/upload.html?activityId=' + activityId + '&sort=' + sort + '&tip=1';
    }
};

export {jumpTo, createUrl}
