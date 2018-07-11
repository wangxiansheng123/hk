/*
 * 奖品列表 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'poststhCss';


//引入分支ui组件
import {PostSth} from 'poststhJsx';

//render html
let PostSthWrap = document.getElementById('post-wrap');
render(<PostSth/>,
    PostSthWrap
);
