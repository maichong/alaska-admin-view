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

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _shallowEqual = require('../utils/shallow-equal');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
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
      settings: context.settings
    };
    return _this;
  }

  (0, _createClass3.default)(Menu, [{
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
      if (nextContext.settings) {
        newState.settings = nextContext.settings;
      }
      this.setState(newState);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return !(0, _shallowEqual2.default)(props, this.props) || !(0, _shallowEqual2.default)(state.settings.menu, this.state.settings.menu);
    }
  }, {
    key: '_itemOnTouchTapHandle',
    value: function _itemOnTouchTapHandle(menuObject) {
      console.log(menuObject.id, menuObject.label);
    }
  }, {
    key: 'createMenuItem',
    value: function createMenuItem(item) {
      var _this2 = this;

      var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      var views = this.state.views;
      var nestedItems = _.map(item.subs, function (sub) {
        return _this2.createMenuItem(sub, level + 1);
      });
      var el = _react2.default.createElement(_listItem2.default, { style: { color: '#aaa' }, key: item.id, nestedItems: nestedItems, primaryText: item.label });
      //let wrappers = _.get(views.wrappers, 'menu-' + item.id.replace(/\./g, '-'));
      //if (wrappers) {
      //  el = wrap(wrappers, el);
      //}
      //el = wrap(views.wrappers.menuItem, el);
      return item.link ? _react2.default.createElement(
        _reactRouter.Link,
        { key: item.id, to: item.link },
        el
      ) : el;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log('menu render');
      var props = this.props;
      var state = this.state;
      var views = this.state.views;
      var styles = {
        root: {
          background: '#333'
        }
      };
      return (0, _wrap2.default)(views.wrappers.menu, _react2.default.createElement(
        _list2.default,
        { id: 'menu', style: styles.root },
        _.map(props.menu, function (item) {
          return _this3.createMenuItem(item);
        })
      ));
    }
  }]);
  return Menu;
}(_react2.default.Component);

Menu.propTypes = {
  children: _react2.default.PropTypes.node,
  menu: _react2.default.PropTypes.array
};
Menu.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
Menu.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
Menu.mixins = [_contextPure2.default];
exports.default = Menu;