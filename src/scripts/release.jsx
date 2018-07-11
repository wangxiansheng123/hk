//jsx语法
/*
 * 投票 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'releaseCss';


//引入分支ui组件
import {Release} from 'releaseJsx';

//render html
let release = document.getElementById('release');
render(<Release/>,
    release
);
