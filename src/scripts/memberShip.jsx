//jsx语法
/*
 * 投票 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'memberShipCss';


//引入分支ui组件
import {MemberShip} from 'memberShipJsx';

//render html
let memberShip = document.getElementById('memberShip');
render(<MemberShip/>,
    memberShip
);
