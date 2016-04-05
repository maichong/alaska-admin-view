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

var _shallowEqual = require('../utils/shallow-equal');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = function (_React$Component) {
  (0, _inherits3.default)(Menu, _React$Component);

  function Menu(props) {
    (0, _classCallCheck3.default)(this, Menu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Menu).call(this, props));

    _this.state = {
      activated: '',
      opened: ''
    };
    return _this;
  }

  (0, _createClass3.default)(Menu, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return state.activated != this.state.activated || state.opened != this.state.opened || !(0, _shallowEqual2.default)(props, this.props);
    }
  }, {
    key: 'createMenuItem',
    value: function createMenuItem(item, level) {
      var subMenu = void 0;
      var me = this;
      var itemId = item.id;
      var activated = this.state.activated == itemId;
      var hasSubs = item.subs && item.subs.length;
      var opened = this.state.opened == itemId;
      if (opened && hasSubs) {
        var onSelect = function onSelect() {
          me.setState({ activated: '' });
        };

        subMenu = _react2.default.createElement(Menu, { items: item.subs, level: level + 1, onSelect: onSelect });
      }

      function onClick() {
        if (item.link) {
          me.context.router.push(item.link);
        }
        if (hasSubs) {
          if (!opened) {
            me.setState({ opened: itemId });
          }
        } else if (!activated) {
          me.props.onSelect && me.props.onSelect(itemId);
          me.setState({ activated: itemId, opened: '' });
        }
      }

      var className = activated ? 'activated' : '';
      if (opened) {
        className = 'opened';
      }
      var icon = item.icon || 'hashtag';
      var subsIcon = !hasSubs ? null : opened ? 'up' : 'down';
      if (subsIcon) {
        subsIcon = _react2.default.createElement('i', { className: 'has-subs-icon fa fa-angle-' + subsIcon });
      }
      var badge = item.badge ? _react2.default.createElement(
        _reactBootstrap.Label,
        { bsStyle: item.badgeStyle },
        item.badge
      ) : null;
      var el = _react2.default.createElement(
        'li',
        { key: item.id, className: className },
        _react2.default.createElement(
          'a',
          { href: 'javascript:void(0)', onClick: onClick },
          _react2.default.createElement('i', { className: 'fa fa-' + icon }),
          item.label,
          badge,
          subsIcon
        ),
        subMenu
      );
      return el;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var level = this.props.level || 0;
      var items = _lodash2.default.map(props.items, function (item) {
        return _this2.createMenuItem(item, level);
      });
      return _react2.default.createElement(
        'ul',
        { id: props.id, className: 'sidebar-menu' },
        items
      );
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
  items: _react2.default.PropTypes.array,
  level: _react2.default.PropTypes.number
};
Menu.contextTypes = {
  views: _react2.default.PropTypes.object,
  router: _react2.default.PropTypes.object
};
exports.default = Menu;