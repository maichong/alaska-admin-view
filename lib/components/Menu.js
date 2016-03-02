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

var _list = require('material-ui/lib/lists/list');

var _list2 = _interopRequireDefault(_list);

var _listItem = require('material-ui/lib/lists/list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _send = require('material-ui/lib/svg-icons/content/send');

var _send2 = _interopRequireDefault(_send);

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menuData = [{
  id: "userManager",
  label: '用户管理',
  icon: 'user',
  type: 'link',
  path: '/users'
}, {
  id: "systemSetting",
  label: '系统设置',
  icon: 'settings',
  type: 'group',
  subs: [{
    id: "cacheSetting",
    label: '缓存设置',
    icon: 'settings',
    type: 'link',
    path: '/settings/cache'
  }, {
    id: "mailSetting",
    label: '邮件设置',
    icon: 'settings',
    type: 'link',
    path: '/settings/email'
  }]
}, {
  id: "orderManager",
  label: '订单管理',
  icon: 'order',
  type: 'group',
  subs: [{
    id: "priceManager",
    label: '价格管理',
    icon: 'price',
    type: 'link',
    path: '/order/price'
  }]
}]; /**
     * @copyright Maichong Software Ltd. 2016 http://maichong.it
     * @date 2016-02-29
     * @author Liang <liang@maichong.it>
     */

var Menu = function (_React$Component) {
  (0, _inherits3.default)(Menu, _React$Component);

  function Menu(props, context) {
    (0, _classCallCheck3.default)(this, Menu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Menu).call(this, props));

    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      menus: _this.initMenu()
    };
    return _this;
  }

  (0, _createClass3.default)(Menu, [{
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
    key: 'initMenu',
    value: function initMenu() {
      var me = this;
      var menus = menuData.map(function (menu) {
        if (menu.type == "group") {
          var submenus = menu.subs.map(function (submenu) {
            if (submenu.type == "group") {
              var subsubmenus = submenu.subs.map(function (subsubmenu) {
                return me.getActionItem(subsubmenu);
              });
              return me.getNodeItem(submenu.label, subsubmenus);
            } else {
              return me.getActionItem(submenu);
            }
          });
          return me.getNodeItem(menu.label, submenus);
        } else {
          return me.getActionItem(menu);
        }
      });
      return menus;
    }
  }, {
    key: 'getNodeItem',
    value: function getNodeItem(label, subs) {
      return _react2.default.createElement(_listItem2.default, { primaryText: label, leftIcon: _react2.default.createElement(_send2.default, null), nestedItems: subs, primaryTogglesNestedList: true });
    }
  }, {
    key: 'getActionItem',
    value: function getActionItem(obj) {
      return _react2.default.createElement(_listItem2.default, { primaryText: obj.label, leftIcon: _react2.default.createElement(_send2.default, null), onTouchTap: this._itemOnTouchTapHandle.bind(this, obj) });
    }
  }, {
    key: '_itemOnTouchTapHandle',
    value: function _itemOnTouchTapHandle(menuObject) {
      console.log(menuObject.id, menuObject.label);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var views = this.state.views;
      var styles = {
        root: {}
      };
      var el = _react2.default.createElement(
        _list2.default,
        null,
        state.menus
      );
      return (0, _wrap2.default)(views.wrappers.list, el);
    }
  }]);
  return Menu;
}(_react2.default.Component);

Menu.propTypes = {
  children: _react2.default.PropTypes.node
};
Menu.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
Menu.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
Menu.mixins = [_contextPure2.default];
exports.default = Menu;