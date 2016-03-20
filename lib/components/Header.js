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

var _iconMenu = require('material-ui/lib/menus/icon-menu');

var _iconMenu2 = _interopRequireDefault(_iconMenu);

var _iconButton = require('material-ui/lib/icon-button');

var _iconButton2 = _interopRequireDefault(_iconButton);

var _toolbar = require('material-ui/lib/toolbar/toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _toolbarGroup = require('material-ui/lib/toolbar/toolbar-group');

var _toolbarGroup2 = _interopRequireDefault(_toolbarGroup);

var _toolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');

var _toolbarSeparator2 = _interopRequireDefault(_toolbarSeparator);

var _toolbarTitle = require('material-ui/lib/toolbar/toolbar-title');

var _toolbarTitle2 = _interopRequireDefault(_toolbarTitle);

var _expandMore = require('material-ui/lib/svg-icons/navigation/expand-more');

var _expandMore2 = _interopRequireDefault(_expandMore);

var _avatar = require('material-ui/lib/avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _popover = require('material-ui/lib/popover/popover');

var _popover2 = _interopRequireDefault(_popover);

var _popoverAnimationFromTop = require('material-ui/lib/popover/popover-animation-from-top');

var _popoverAnimationFromTop2 = _interopRequireDefault(_popoverAnimationFromTop);

var _menu = require('material-ui/lib/menus/menu');

var _menu2 = _interopRequireDefault(_menu);

var _menuItem = require('material-ui/lib/menus/menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

var _divider = require('material-ui/lib/divider');

var _divider2 = _interopRequireDefault(_divider);

var _flatButton = require('material-ui/lib/flat-button');

var _flatButton2 = _interopRequireDefault(_flatButton);

var _paper = require('material-ui/lib/paper');

var _paper2 = _interopRequireDefault(_paper);

var _fontIcon = require('material-ui/lib/font-icon');

var _fontIcon2 = _interopRequireDefault(_fontIcon);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      settings: context.settings,
      open: false
    };
    return _this;
  }

  (0, _createClass3.default)(Header, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.context.views,
        settings: this.context.settings
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
      console.log('Header.render', this);
      var props = this.props;
      var state = this.state;
      var views = state.views;
      var height = 56;
      var styles = {
        root: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: height
        },
        toolbar: {
          background: '#fff',
          height: height
        },
        logo: {
          paddingTop: 8,
          paddingLeft: 8
        },
        img: {
          height: 40
        },
        title: {
          paddingLeft: 20,
          color: '#000'
        },
        list: {
          float: 'right',
          listStyle: 'none'
        }
      };
      var el = _react2.default.createElement(
        _paper2.default,
        { id: 'header', zDepth: 2, style: styles.root },
        _react2.default.createElement(
          _toolbar2.default,
          { style: styles.toolbar },
          _react2.default.createElement(
            _toolbarGroup2.default,
            { firstChild: true, float: 'left' },
            _react2.default.createElement(
              'div',
              { style: styles.logo },
              _react2.default.createElement('img', { style: styles.img, src: 'static/logo.png' })
            )
          ),
          _react2.default.createElement(
            _toolbarGroup2.default,
            { float: 'right' },
            _react2.default.createElement(_flatButton2.default, {
              onTouchTap: this.handleTouchTap,
              label: props.user.username,
              icon: _react2.default.createElement(_avatar2.default, { src: props.user.avatar || 'static/avatar.png' })
            }),
            _react2.default.createElement(
              _popover2.default,
              {
                open: this.state.open,
                anchorEl: this.state.anchorEl,
                anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                targetOrigin: { horizontal: 'left', vertical: 'top' },
                onRequestClose: this.handleRequestClose,
                animation: _popoverAnimationFromTop2.default
              },
              _react2.default.createElement(
                _menu2.default,
                { desktop: true },
                _react2.default.createElement(_menuItem2.default, {
                  primaryText: 'Refresh',
                  onTouchTap: this.handleRefresh,
                  leftIcon: _react2.default.createElement(
                    _fontIcon2.default,
                    { className: 'material-icons' },
                    'refresh'
                  )
                }),
                _react2.default.createElement(_menuItem2.default, {
                  primaryText: 'Signout',
                  onTouchTap: this.handleLogout,
                  leftIcon: _react2.default.createElement(
                    _fontIcon2.default,
                    { className: 'material-icons' },
                    'exit_to_app'
                  ) })
              )
            )
          )
        )
      );

      return (0, _wrap2.default)(views.wrappers.header, el, this);
    }
  }]);
  return Header;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-02-29
                               * @author Liang <liang@maichong.it>
                               */

Header.propTypes = {
  children: _react2.default.PropTypes.node
};
Header.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
Header.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
Header.mixins = [_contextPure2.default];
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var user = _ref.user;
  return { user: user };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(Header);