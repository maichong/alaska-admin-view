/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

'use strict';

require('core-js/shim');

require('normalize.css');

require('../style.less');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

!function (c) {
  c && c.log('\n%c 脉冲软件 %c http://maichong.it \n%c 心跳不止 脉冲不息', 'font-weight:bold;font-size:60px;color:#2963cf', 'font-size:12px;color:#999;', 'font-size:32px;color:#999;');
  c && c.log('欢迎加入脉冲软件\n请将您的简历发送至 %c hr@maichong.it', 'color:red');
}(self.console);

require('react-tap-event-plugin')();

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _root.store },
  _root2.default
), document.getElementById('app'));