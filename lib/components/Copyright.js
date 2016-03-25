'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

var Copyright = function (_React$Component) {
  (0, _inherits3.default)(Copyright, _React$Component);

  function Copyright() {
    (0, _classCallCheck3.default)(this, Copyright);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Copyright).apply(this, arguments));
  }

  (0, _createClass3.default)(Copyright, [{
    key: 'render',
    value: function render() {
      var views = this.context.views;
      return (0, _wrap2.default)(views.wrappers.copyright, _react2.default.createElement(
        'div',
        { id: 'copyright' },
        'Powered By Alaska'
      ), this);
    }
  }]);
  return Copyright;
}(_react2.default.Component);

Copyright.propTypes = {
  children: _react2.default.PropTypes.node
};
Copyright.contextTypes = {
  views: _react2.default.PropTypes.object
};
exports.default = Copyright;