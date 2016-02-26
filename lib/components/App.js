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

var _reactRouter = require('react-router');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

var App = function (_React$Component) {
  (0, _inherits3.default)(App, _React$Component);

  function App(props, context) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));

    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views
    };
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.props.views
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var props = this.props;
      if (!props.access && !props.logined && !props.login.show) {
        props.actions.refreshInfo();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
        this.setState(newState);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      if (props.access) {
        return _react2.default.createElement(
          _reactRouter.Router,
          { history: _reactRouter.hashHistory },
          _react2.default.createElement(_reactRouter.Route, { component: RaisedButton, path: '/login' })
        );
      } else {
        if (props.logined) {
          //已登录,但无权限
          return _react2.default.createElement(
            'div',
            null,
            '无权限'
          );
        }

        //未登录
        if (props.login.show) {
          return _react2.default.createElement(_login2.default, null);
        }
        return _react2.default.createElement(
          'div',
          { className: 'boot-loading' },
          'Loading...'
        );
      }
    }
  }]);
  return App;
}(_react2.default.Component);

App.propTypes = {
  children: _react2.default.PropTypes.node,
  views: _react2.default.PropTypes.object.isRequired
};
App.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
App.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
App.mixins = [_contextPure2.default];
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var login = _ref.login;
  var access = _ref.access;
  var logined = _ref.logined;
  return { login: login, access: access, logined: logined };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(App);