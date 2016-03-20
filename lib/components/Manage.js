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

var _snackbar = require('material-ui/lib/snackbar');

var _snackbar2 = _interopRequireDefault(_snackbar);

var _reactRedux = require('react-redux');

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Sidebar = require('./Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Content = require('./Content');

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Manage = function (_React$Component) {
  (0, _inherits3.default)(Manage, _React$Component);

  function Manage(props) {
    (0, _classCallCheck3.default)(this, Manage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Manage).call(this, props));

    _this.handleRequestClose = _this.handleRequestClose.bind(_this);
    _this.state = {
      open: false
    };
    return _this;
  }

  (0, _createClass3.default)(Manage, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var newState = {};
      if (nextProps.notice && nextProps.notice.rand != this.rand) {
        newState.open = true;
        this.rand = nextProps.notice.rand;
        this.setState(newState);
      }
    }
  }, {
    key: 'handleRequestClose',
    value: function handleRequestClose() {
      this.setState({ open: false });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('Manage.render', this);
      var props = this.props;
      var state = this.state;
      var _context = this.context;
      var views = _context.views;
      var settings = _context.settings;

      var styles = {
        root: {},
        body: {
          marginTop: 56
        }
      };
      var snack = props.notice && state.open && props.notice.msg ? _react2.default.createElement(_snackbar2.default, {
        open: true,
        message: props.notice.msg,
        onRequestClose: this.handleRequestClose
      }) : null;
      return (0, _wrap2.default)(views.wrappers.manage, _react2.default.createElement(
        'div',
        { id: 'manage', style: styles.root },
        _react2.default.createElement(_Header2.default, null),
        (0, _wrap2.default)(views.wrappers.body, _react2.default.createElement(
          'div',
          { id: 'body', style: styles.body },
          _react2.default.createElement(_Sidebar2.default, { menu: settings.menu }),
          _react2.default.createElement(
            _Content2.default,
            null,
            props.children
          )
        ), this),
        snack
      ), this);
    }
  }]);
  return Manage;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-02-29
                               * @author Liang <liang@maichong.it>
                               */

Manage.propTypes = {
  children: _react2.default.PropTypes.node
};
Manage.contextTypes = {
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
Manage.mixins = [_contextPure2.default];
exports.default = Manage;
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var settings = _ref.settings;
  var notice = _ref.notice;
  return { settings: settings, notice: notice };
})(Manage);