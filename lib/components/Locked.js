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
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var views = this.state.views;
      var styles = {
        root: {
          position: "fixed",
          height: 450,
          width: "100%",
          marginTop: 0,
          marginLeft: 0
        },
        textStyle: {
          "text-align": "center"
        }
      };
      var el = _react2.default.createElement(
        'div',
        { style: styles.root },
        (0, _wrap2.default)(views.wrappers.lockedImg, _react2.default.createElement('img', { width: '100%', height: '100%', src: '/assets/lockedImage.jpg' })),
        _react2.default.createElement(
          'div',
          { style: styles.textStyle },
          (0, _wrap2.default)(views.wrappers.lockedTitle, _react2.default.createElement(
            'h1',
            null,
            props.title
          )),
          (0, _wrap2.default)(views.wrappers.lockedContent, _react2.default.createElement(
            'p',
            null,
            props.content
          ))
        )
      );
      return (0, _wrap2.default)(views.wrappers.lockedTitle, el);
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