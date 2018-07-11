/*
 * 我参与-活动 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'activityCss';


//引入分支ui组件
import {Active} from 'activityJsx';

//render html
let active = document.getElementById('active');
render(<Active/>,
    active
);
