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

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _reactBootstrap = require('react-bootstrap');

var _DataTable = require('./DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function (_React$Component) {
  (0, _inherits3.default)(List, _React$Component);

  function List(props, context) {
    (0, _classCallCheck3.default)(this, List);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(List).call(this, props));

    _this.state = {
      data: null
    };
    return _this;
  }

  (0, _createClass3.default)(List, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init(this.props, this.context);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var _this2 = this;

      var newState = {};
      if (nextProps.list) {
        var list = nextProps.list;
        if (list.service == this.props.params.service && list.model == this.props.params.model) {
          newState.data = list.results;
        }
        this.setState(newState, function () {
          _this2.init(_this2.props);
        });
      }
    }
  }, {
    key: 'init',
    value: function init(props) {
      var settings = this.context.settings;
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
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var _state = this.state;
      var title = _state.title;
      var service = _state.service;
      var model = _state.model;
      var data = _state.data;

      if (!model) {
        return _react2.default.createElement(
          'div',
          { className: 'loading' },
          'Loading...'
        );
      }
      var views = this.context.views;
      var titleBtns = [];
      if (!model.nocreate && model.abilities.create) {
        //判断create权限,显示新建按钮
        var href = '#/edit/' + service.id + '/' + model.name + '/_new';
        titleBtns.push(_react2.default.createElement(
          _reactBootstrap.Button,
          {
            bsStyle: 'success',
            key: 'create',
            href: href
          },
          '新建'
        ));
      }

      return (0, _wrap2.default)(views.wrappers.list, _react2.default.createElement(
        'div',
        { className: 'list-content' },
        _react2.default.createElement(
          'div',
          { className: 'content-header' },
          _react2.default.createElement(
            'h4',
            null,
            title,
            ' ',
            _react2.default.createElement(
              'i',
              null,
              props.list.total,
              '条记录'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'content-header-buttons' },
            titleBtns
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Panel,
          null,
          _react2.default.createElement(_DataTable2.default, { model: model, data: data })
        )
      ), this);
    }
  }]);
  return List;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-03-04
                               * @author Liang <liang@maichong.it>
                               */

List.propTypes = {
  children: _react2.default.PropTypes.node
};
List.contextTypes = {
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var list = _ref.list;
  return { list: list };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(List);