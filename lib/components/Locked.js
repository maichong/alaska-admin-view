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

var _getMuiTheme = require('material-ui/lib/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

var Locked = function (_React$Component) {
  (0, _inherits3.default)(Locked, _React$Component);

  function Locked(props, context) {
    (0, _classCallCheck3.default)(this, Locked);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Locked).call(this, props));

    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views
    };
    return _this;
  }

  (0, _createClass3.default)(Locked, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.context.views
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
      }
      if (nextContext.views) {
        newState.views = nextContext.views;
      }
      this.setState(newState);
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        fontSize: 32,
        textAlign: 'center',
        paddingTop: 100,
        color: '#b55'
      };
      return (0, _wrap2.default)(this.state.views.wrappers.locked, _react2.default.createElement(
        'h1',
        { style: style },
        '无权访问'
      ));
    }
  }]);
  return Locked;
}(_react2.default.Component);

Locked.propTypes = {
  children: _react2.default.PropTypes.node
};
Locked.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
Locked.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
Locked.mixins = [_contextPure2.default];
exports.default = Locked;