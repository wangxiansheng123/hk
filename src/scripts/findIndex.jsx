/*
 * 发现首页 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'findIndexCss';


//引入分支ui组件
import {FindIndex} from 'findIndexJsx';

//render html
let container = document.getElementById('container');
render(<FindIndex/>,
    container
);
