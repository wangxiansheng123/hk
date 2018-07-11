//jsx语法
/*
 * 编辑地址 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


//引入CSS
import 'rem';
import 'commonCss';
import 'questionnaireCss';


//引入分支ui组件
import {Questionnaire} from 'questionnaireJsx';

//render html
let questionnaire = document.getElementById('questionnaire');
render(<Questionnaire/>,
    questionnaire
);
