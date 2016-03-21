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

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _reactBootstrap = require('react-bootstrap');

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = function (_React$Component) {
  (0, _inherits3.default)(Login, _React$Component);

  function Login(props) {
    (0, _classCallCheck3.default)(this, Login);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Login).call(this, props));

    _this.handleLogin = function () {
      var username = _this.refs.name.getValue();
      var password = _this.refs.pass.getValue();
      var state = {
        errorMsg: '',
        usernameError: '',
        passwordError: ''
      };
      if (!username) {
        state.usernameError = 'error';
      }
      if (!password) {
        state.passwordError = 'error';
      }
      _this.setState(state);
      if (username && password) {
        _this.props.actions.login({ username: username, password: password });
      }
    };

    _this.handleKeyPress = function (e) {
      if (e.key == 'Enter') {
        _this.handleLogin();
      }
    };

    _this.state = {
      username: '',
      password: ''
    };
    return _this;
  }

  (0, _createClass3.default)(Login, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var newState = {};
      if (nextProps.login && nextProps.login.errorMsg) {
        newState.errorMsg = nextProps.login.errorMsg;
      }
      this.setState(newState);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var views = this.context.views;
      var err = void 0;
      if (state.errorMsg) {
        err = (0, _wrap2.default)(views.wrappers.loginError, _react2.default.createElement(
          'p',
          { className: 'label label-danger' },
          state.errorMsg
        ), this);
      }

      var el = _react2.default.createElement(
        _reactBootstrap.Panel,
        { id: 'login' },
        (0, _wrap2.default)(views.wrappers.loginLogo, _react2.default.createElement('img', { src: 'static/logo.png', className: 'logo' }), this),
        (0, _wrap2.default)(views.wrappers.loginForm, _react2.default.createElement(
          'form',
          null,
          (0, _wrap2.default)(views.wrappers.loginField, _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactBootstrap.Input, {
              placeholder: '用户名',
              bsStyle: state.usernameError,
              type: 'text',
              errorText: state.nameError,
              ref: 'name',
              addonBefore: _react2.default.createElement('i', { className: 'fa fa-user' })
            }),
            _react2.default.createElement(_reactBootstrap.Input, {
              placeholder: '密码',
              bsStyle: state.passwordError,
              type: 'password',
              errorText: state.passError,
              ref: 'pass',
              onEnterKeyDown: this.handleLogin,
              onKeyPress: this.handleKeyPress,
              addonBefore: _react2.default.createElement('i', { className: 'fa fa-key' })
            })
          ), this),
          (0, _wrap2.default)(views.wrappers.loginButton, _react2.default.createElement(
            _reactBootstrap.Button,
            {
              bsStyle: 'primary',
              block: true,
              onClick: this.handleLogin
            },
            '登录'
          ), this),
          err
        ), this)
      );

      return (0, _wrap2.default)(views.wrappers.login, el, this);
    }
  }]);
  return Login;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-02-26
                               * @author Liang <liang@maichong.it>
                               */

Login.propTypes = {
  login: _react2.default.PropTypes.object
};
Login.contextTypes = {
  views: _react2.default.PropTypes.object
};
exports.default = Login;
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var login = _ref.login;
  return { login: login };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(Login);