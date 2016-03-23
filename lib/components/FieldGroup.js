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

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-21
 * @author Liang <liang@maichong.it>
 */

var FieldGroup = function (_React$Component) {
  (0, _inherits3.default)(FieldGroup, _React$Component);

  function FieldGroup() {
    (0, _classCallCheck3.default)(this, FieldGroup);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(FieldGroup).apply(this, arguments));
  }

  (0, _createClass3.default)(FieldGroup, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var el = props.children;
      if (props.form !== false) {
        el = _react2.default.createElement(
          'form',
          { className: 'form-horizontal' },
          el
        );
      }
      if (props.panel !== false) {
        el = _react2.default.createElement(
          _reactBootstrap.Panel,
          { header: props.title },
          el
        );
      }
      return el;
    }
  }]);
  return FieldGroup;
}(_react2.default.Component);

FieldGroup.propTypes = {
  children: _react2.default.PropTypes.node
};
exports.default = FieldGroup;