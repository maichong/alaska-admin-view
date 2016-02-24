/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

'use strict';

!function (c) {
  c && c.log('\n%c 脉冲软件 %c http://maichong.it \n%c 心跳不止 脉冲不息', 'font-weight:bold;font-size:60px;color:#2963cf', 'font-size:12px;color:#999;', 'font-size:32px;color:#999;');
  c && c.log('欢迎加入脉冲软件\n请将您的简历发送至 %c hr@maichong.it', 'color:red');
}(self.console);

import 'core-js/shim';
import 'normalize.css';
import '../style.less';

import ReactDOM from 'react-dom';
import React from 'react';

import { Provider } from 'react-redux';

import Root, {store} from './root';

require('react-tap-event-plugin')();

ReactDOM.render(
  <Provider store={store}>
    {Root}
  </Provider>
  , document.getElementById('app')
);
