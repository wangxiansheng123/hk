//jsx语法
/*
 * 静态页 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'staticPageCss';


//引入分支ui组件
import {StaticPage} from 'staticPageJsx';

//render html
let staticPage = document.getElementById('staticPage');
render(<StaticPage/>,
    staticPage
);
