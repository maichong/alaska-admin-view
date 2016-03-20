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

var _paper = require('material-ui/lib/paper');

var _paper2 = _interopRequireDefault(_paper);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Copyright = require('./Copyright');

var _Copyright2 = _interopRequireDefault(_Copyright);

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sidebar = function (_React$Component) {
  (0, _inherits3.default)(Sidebar, _React$Component);

  function Sidebar() {
    (0, _classCallCheck3.default)(this, Sidebar);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Sidebar).apply(this, arguments));
  }

  (0, _createClass3.default)(Sidebar, [{
    key: 'render',
    value: function render() {
      console.log('Sidebar.render', this);
      var props = this.props;
      var views = this.context.views;
      var styles = {
        root: {
          width: 240,
          top: 56,
          left: 0,
          bottom: 0,
          position: 'fixed',
          background: '#333'
        },
        inner: {
          position: 'relative',
          height: '100%'
        }
      };
      var el = _react2.default.createElement(
        _paper2.default,
        { id: 'sidebar', zDepth: 1, style: styles.root },
        (0, _wrap2.default)(views.wrappers.sidebarInner, _react2.default.createElement(
          'div',
          { id: 'sidebarInner', style: styles.inner },
          _react2.default.createElement(_Menu2.default, { menu: props.menu }),
          _react2.default.createElement(_Copyright2.default, null)
        ))
      );
      return (0, _wrap2.default)(views.wrappers.sidebar, el);
    }
  }]);
  return Sidebar;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-02-29
                               * @author Liang <liang@maichong.it>
                               */

Sidebar.propTypes = {
  children: _react2.default.PropTypes.node,
  menu: _react2.default.PropTypes.array
};
Sidebar.contextTypes = {
  views: _react2.default.PropTypes.object
};
Sidebar.mixins = [_contextPure2.default];
exports.default = Sidebar;