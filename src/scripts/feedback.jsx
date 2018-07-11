/*
 * 编辑地址 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'feedbackCss';


//引入分支ui组件
import {Feedback} from 'feedbackJsx';

//render html
let feedback = document.getElementById('feedback');
render(<Feedback/>,
    feedback
);
