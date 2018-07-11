/*
 * 报名 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'msgCss';


//引入分支ui组件
import {Msg} from 'msgJsx';

//render html
let container = document.getElementById('container');
render(<Msg/>,
    container
);
