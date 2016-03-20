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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = function (_React$Component) {
  (0, _inherits3.default)(Menu, _React$Component);

  function Menu() {
    (0, _classCallCheck3.default)(this, Menu);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Menu).apply(this, arguments));
  }

  (0, _createClass3.default)(Menu, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props) {
      return !(0, _shallowEqual2.default)(props, this.props);
    }
  }, {
    key: 'createMenuItem',
    value: function createMenuItem(item) {
      var _this2 = this;

      var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      //let views = this.state.views;
      var nestedItems = _.map(item.subs, function (sub) {
        return _this2.createMenuItem(sub, level + 1);
      });
      var me = this;
      var onTouchTap = item.link ? function () {
        me.context.router.push(item.link);
      } : null;
      var el = _react2.default.createElement(_listItem2.default, {
        onTouchTap: onTouchTap,
        style: { color: '#aaa' },
        key: item.id,
        nestedItems: nestedItems,
        primaryText: item.label
      });
      //let wrappers = _.get(views.wrappers, 'menu-' + item.id.replace(/\./g, '-'));
      //if (wrappers) {
      //  el = wrap(wrappers, el);
      //}
      //el = wrap(views.wrappers.menuItem, el);
      return el;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log('Menu.render', this);
      var props = this.props;
      var views = this.context.views;
      var styles = {
        root: {
          background: '#333'
        }
      };
      var el = _react2.default.createElement(
        _list2.default,
        { id: 'menu', style: styles.root },
        _.map(props.menu, function (item) {
          return _this3.createMenuItem(item);
        })
      );
      return (0, _wrap2.default)(views.wrappers.menu, el);
    }
  }]);
  return Menu;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-02-29
                               * @author Liang <liang@maichong.it>
                               */

Menu.propTypes = {
  children: _react2.default.PropTypes.node,
  menu: _react2.default.PropTypes.array
};
Menu.contextTypes = {
  views: _react2.default.PropTypes.object,
  router: _react2.default.PropTypes.object
};
Menu.mixins = [_contextPure2.default];
exports.default = Menu;