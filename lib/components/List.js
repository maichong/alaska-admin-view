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

var _raisedButton = require('material-ui/lib/raised-button');

var _raisedButton2 = _interopRequireDefault(_raisedButton);

var _reactRouter = require('react-router');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _DataTable = require('./DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-04
 * @author Liang <liang@maichong.it>
 */

var List = function (_React$Component) {
  (0, _inherits3.default)(List, _React$Component);

  function List(props, context) {
    (0, _classCallCheck3.default)(this, List);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(List).call(this, props));

    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      settings: context.settings,
      data: null
    };
    return _this;
  }

  (0, _createClass3.default)(List, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.context.views,
        settings: this.context.settings
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._init(this.props, this.context);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var _this2 = this;

      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
      }
      if (nextContext.views) {
        newState.views = nextContext.views;
      }
      if (nextProps.list) {
        var list = nextProps.list;
        if (list.service == this.props.params.service && list.model == this.props.params.model) {
          newState.data = list.results;
        }
      }
      this.setState(newState, function () {
        _this2._init(_this2.props, _this2.context);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var _state = this.state;
      var title = _state.title;
      var service = _state.service;
      var model = _state.model;
      var data = _state.data;
      var muiTheme = _state.muiTheme;
      var views = _state.views;
      var settings = _state.settings;

      if (!model) {
        return _react2.default.createElement(
          'div',
          { className: 'loading' },
          'Loading...'
        );
      }
      var styles = {
        root: {},
        titleBar: {
          position: 'relative',
          height: 36,
          marginBottom: 20
        },
        title: {
          overflow: 'hidden',
          fontSize: 36,
          height: 36,
          color: muiTheme.baseTheme.palette.primary1Color
        },
        titleNote: {
          color: '#999'
        },
        titleBtns: {
          position: 'absolute',
          right: 0,
          top: 0
        }
      };
      var titleBtns = [];
      if (!model.nocreate && model.abilities.create) {
        //判断create权限,显示新建按钮
        titleBtns.push(_react2.default.createElement(_raisedButton2.default, { key: 'create', linkButton: true, href: '#/edit/' + service.id + '/' + model.name + '/_new',
          label: '新建', secondary: true }));
      }

      return (0, _wrap2.default)(views.wrappers.list, _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(
          'div',
          { style: styles.titleBar },
          _react2.default.createElement(
            'div',
            { style: styles.title },
            title,
            ' ',
            _react2.default.createElement(
              'span',
              { style: styles.titleNote },
              props.list.total,
              '条记录'
            )
          ),
          _react2.default.createElement(
            'div',
            { style: styles.titleBtns },
            titleBtns
          )
        ),
        _react2.default.createElement(_DataTable2.default, { model: model, data: data })
      ));
    }
  }, {
    key: '_init',
    value: function _init(props, context) {
      var settings = context.settings;
      var serviceId = props.params.service;
      var modelName = props.params.model;
      if (!serviceId || !modelName || !settings || !settings.services) {
        return;
      }
      var service = settings.services[serviceId];
      if (!service) {
        return;
      }
      var model = service.models[modelName];
      if (!model) {
        return;
      }
      var title = props.title || this.props.title || model.label;
      var data = this.state.data;
      if (this.state.model && this.state.model.name != model.name) {
        data = null;
      }
      if (!data) {
        this.refresh();
      }
      this.setState({ service: service, model: model, title: title, data: data || [] });
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var props = this.props;
      var service = props.params.service;
      var model = props.params.model;
      var page = this.state.page;
      var filters = this.state.filters;
      var perPage = this.state.perPage;
      props.actions.list({ service: service, model: model, page: page, filters: filters, perPage: perPage });
    }
  }]);
  return List;
}(_react2.default.Component);

List.propTypes = {
  children: _react2.default.PropTypes.node
};
List.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
List.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
List.mixins = [_contextPure2.default];
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var list = _ref.list;
  return { list: list };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(List);