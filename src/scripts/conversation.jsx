/*
 * 我参与-活动 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'conversationCss';


//引入分支ui组件
import {Conversation} from 'conversationJsx';

//render html
let conversation = document.getElementById('conversation');
render(<Conversation/>,
    conversation
);
