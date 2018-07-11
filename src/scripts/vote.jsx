//jsx语法
/*
 * 投票 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'voteCss';


//引入分支ui组件
import {Vote} from 'voteJsx';

//render html
let vote = document.getElementById('vote');
render(<Vote/>,
    vote
);
