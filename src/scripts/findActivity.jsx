/*
 * 活动参与 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'findActivityCss';


//引入分支ui组件
import {FindActivity} from 'findActivityJsx';

//render html
let container = document.getElementById('container');
render(<FindActivity/>,
    container
);
