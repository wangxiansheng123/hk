/*
 * 奖品列表 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'prizeCss';


//引入分支ui组件
import {Prize} from 'prizeJsx';

//render html
let container = document.getElementById('container');
render(<Prize/>,
    container
);
