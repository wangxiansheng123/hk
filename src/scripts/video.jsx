//jsx语法
/*
 * 投票 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'videoCss';


//引入分支ui组件
import {Video} from 'videoJsx';

//render html
let video = document.getElementById('video');
render(<Video/>,
    video
);
