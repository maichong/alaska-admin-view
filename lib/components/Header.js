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

var _reactBootstrap = require('react-bootstrap');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

var Header = function (_React$Component) {
  (0, _inherits3.default)(Header, _React$Component);

  function Header(props, context) {
    (0, _classCallCheck3.default)(this, Header);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Header).call(this, props));

    _this.handleTouchTap = function (event) {
      _this.setState({
        open: true,
        anchorEl: event.currentTarget
      });
    };

    _this.handleRequestClose = function () {
      _this.setState({
        open: false
      });
    };

    _this.handleRefresh = function () {
      _this.props.actions.refreshInfo();
      _this.setState({
        open: false
      });
    };

    _this.handleLogout = function () {
      _this.props.actions.logout();
      _this.setState({
        open: false
      });
    };

    _this.state = {
      open: false
    };
    return _this;
  }

  (0, _createClass3.default)(Header, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
      this.setState(newState);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var views = this.context.views;
      var t = this.context.t;
      //let avatar = props.user.avatar || 'static/avatar.png';
      var el = _react2.default.createElement(
        _reactBootstrap.Navbar,
        { id: 'header', fluid: true },
        _react2.default.createElement(
          _reactBootstrap.Navbar.Header,
          null,
          _react2.default.createElement('img', { src: 'static/img/logo.png' })
        ),
        _react2.default.createElement(
          _reactBootstrap.Navbar.Collapse,
          null,
          _react2.default.createElement(
            _reactBootstrap.Nav,
            { pullRight: true },
            _react2.default.createElement(
              _reactBootstrap.NavDropdown,
              { eventKey: 3, title: props.user.username, id: 'basic-nav-dropdown' },
              _react2.default.createElement(
                _reactBootstrap.MenuItem,
                { eventKey: 3.1, onClick: this.handleRefresh },
                t('Refresh')
              ),
              _react2.default.createElement(
                _reactBootstrap.MenuItem,
                { eventKey: 3.2, onClick: this.handleLogout },
                t('Logout')
              )
            )
          )
        )
      );

      return (0, _wrap2.default)(views.wrappers.header, el, this);
    }
  }]);
  return Header;
}(_react2.default.Component);

Header.propTypes = {
  children: _react2.default.PropTypes.node,
  actions: _react2.default.PropTypes.object,
  user: _react2.default.PropTypes.object
};
Header.contextTypes = {
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object,
  t: _react2.default.PropTypes.func
};
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var user = _ref.user;
  return { user: user };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(Header);