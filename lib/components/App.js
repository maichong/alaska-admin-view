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

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _Locked = require('./Locked');

var _Locked2 = _interopRequireDefault(_Locked);

var _Manage = require('./Manage');

var _Manage2 = _interopRequireDefault(_Manage);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_React$Component) {
  (0, _inherits3.default)(App, _React$Component);

  function App(props, context) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));

    var muiTheme = context.muiTheme || (0, _getMuiTheme2.default)();
    _this.state = {
      muiTheme: muiTheme
    };
    if (!muiTheme.fieldNote) {
      muiTheme.fieldNote = {
        fontSize: 12,
        color: '#999'
      };
      muiTheme.fieldNoteInline = {
        display: 'inline-block',
        paddingLeft: 10,
        fontSize: 12,
        color: '#999'
      };
    }
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.props.views,
        settings: this.props.settings
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var props = this.props;
      if (!props.access && !props.signed && !props.login.show) {
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
      console.log('App.render', this);
      var props = this.props;
      var state = this.state;
      var views = props.views;
      var el = void 0;

      //有权限
      if (props.access) {
        el = (0, _wrap2.default)(views.wrappers.router, _react2.default.createElement(
          _reactRouter.Router,
          { history: _reactRouter.hashHistory },
          (0, _wrap2.default)(views.wrappers.routes, _react2.default.createElement(
            _reactRouter.Route,
            { component: _Manage2.default, path: '/' },
            _react2.default.createElement(_reactRouter.Route, { component: _List2.default, path: 'list/:service/:model' }),
            _react2.default.createElement(_reactRouter.Route, { component: _Editor2.default, path: 'edit/:service/:model/:id' }),
            state.routes
          ), this)
        ), this);
      }

      //已登录,但无权限
      else if (props.signed) {
          el = _react2.default.createElement(_Locked2.default, null);
        }

        //未登录
        else if (props.login.show) {
            el = _react2.default.createElement(_Login2.default, null);
          } else {
            el = _react2.default.createElement(
              'div',
              { className: 'boot-loading' },
              'Loading...'
            );
          }

      return (0, _wrap2.default)(views.wrappers.app, el, this);
    }
  }]);
  return App;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-02-26
                               * @author Liang <liang@maichong.it>
                               */

App.propTypes = {
  children: _react2.default.PropTypes.node,
  views: _react2.default.PropTypes.object.isRequired
};
App.contextTypes = {
  muiTheme: _react2.default.PropTypes.object
};
App.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
App.mixins = [_contextPure2.default];
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var login = _ref.login;
  var access = _ref.access;
  var signed = _ref.signed;
  var settings = _ref.settings;
  return { login: login, access: access, signed: signed, settings: settings };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(App);