//jsx语法
/*
 * 投票 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'pictureCss';


//引入分支ui组件
import {Picture} from 'pictureJsx';

//render html
let picture = document.getElementById('picture');
render(<Picture/>,
    picture
);
