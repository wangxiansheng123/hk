/*
 * 抽奖 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'carouselCss';


//引入分支ui组件
import {Carousel} from 'carouselJsx';

//render html
let container = document.getElementById('container');
render(<Carousel/>,
    container
);
