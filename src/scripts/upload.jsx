/*
 * 奖品列表 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'uploadCss';


//引入分支ui组件
import {Upload} from 'uploadJsx';

//render html
let uploadWrap = document.getElementById('upload-wrap');
render(<Upload/>,
    uploadWrap
);
