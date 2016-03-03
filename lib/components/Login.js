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

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _paper = require('material-ui/lib/paper');

var _paper2 = _interopRequireDefault(_paper);

var _textField = require('material-ui/lib/text-field');

var _textField2 = _interopRequireDefault(_textField);

var _raisedButton = require('material-ui/lib/raised-button');

var _raisedButton2 = _interopRequireDefault(_raisedButton);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = function (_React$Component) {
  (0, _inherits3.default)(Login, _React$Component);

  function Login(props, context) {
    (0, _classCallCheck3.default)(this, Login);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Login).call(this, props));

    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      username: '',
      password: ''
    };

    _this._handleLogin = _this._handleLogin.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Login, [{
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
      var views = this.state.views;
      var styles = {
        root: {
          width: 600,
          margin: '80px auto 0',
          padding: 50
        },
        logo: {
          display: 'block',
          width: 200,
          margin: '0 auto 20px'
        },
        form: {
          display: 'block',
          width: 256,
          margin: '10px auto 0'
        },
        button: {
          marginTop: 20
        },
        error: {
          color: state.muiTheme.textField.errorColor,
          fontSize: 14
        }
      };
      var err = undefined;
      if (state.errorMsg) {
        err = (0, _wrap2.default)(views.wrappers.loginError, _react2.default.createElement(
          'p',
          { style: styles.error },
          state.errorMsg
        ));
      }

      var el = _react2.default.createElement(
        _paper2.default,
        { zDepth: 2, style: styles.root },
        (0, _wrap2.default)(views.wrappers.loginLogo, _react2.default.createElement('img', { src: '/assets/logo.jpg', style: styles.logo })),
        (0, _wrap2.default)(views.wrappers.loginForm, _react2.default.createElement(
          'form',
          { style: styles.form },
          (0, _wrap2.default)(views.wrappers.loginField, _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_textField2.default, {
              floatingLabelText: '用户名',
              errorText: state.nameError,
              ref: 'name'
            }),
            _react2.default.createElement(_textField2.default, {
              floatingLabelText: '密码',
              type: 'password',
              errorText: state.passError,
              ref: 'pass',
              onEnterKeyDown: this._handleLogin
            })
          )),
          (0, _wrap2.default)(views.wrappers.loginButton, _react2.default.createElement(_raisedButton2.default, {
            label: '登录',
            fullWidth: true,
            secondary: true,
            style: styles.button,
            onTouchTap: this._handleLogin
          })),
          err
        ))
      );

      return (0, _wrap2.default)(views.wrappers.login, el);
    }
  }, {
    key: '_handleLogin',
    value: function _handleLogin() {
      var username = this.refs.name.getValue();
      var password = this.refs.pass.getValue();
      var errorMsg = '';
      if (!username) {
        errorMsg = '请输入用户名';
      } else if (!password) {
        errorMsg = '请输入密码';
      }
      this.setState({ errorMsg: errorMsg });
      !errorMsg && this.props.actions.login({ username: username, password: password });
    }
  }]);
  return Login;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-02-26
                               * @author Liang <liang@maichong.it>
                               */

Login.propTypes = {
  children: _react2.default.PropTypes.node
};
Login.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
Login.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
Login.mixins = [_contextPure2.default];
exports.default = Login;
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var login = _ref.login;
  return { login: login };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(Login);