'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _DataTable = require('./DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

var _constants = require('../constants');

var _qs = require('qs');

var _api = require('../utils/api');

var _api2 = _interopRequireDefault(_api);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Relationship = function (_React$Component) {
  (0, _inherits3.default)(Relationship, _React$Component);

  function Relationship(props) {
    (0, _classCallCheck3.default)(this, Relationship);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Relationship).call(this, props));

    _this.state = {
      data: null,
      model: null
    };
    return _this;
  }

  (0, _createClass3.default)(Relationship, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      var model = this.state.model;
      if (props.lists && props.lists[model.key] !== this.props.lists[model.key]) {
        var list = props.lists[model.key];
        this.setState({
          data: list ? list.results : null
        }, function () {
          _this2.init();
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return state.data != this.state.data || state.model != this.state.model;
    }
  }, {
    key: 'init',
    value: function init() {
      var _this3 = this;

      var serviceId = this.props.service;
      var modelName = this.props.model;
      var model = this.context.settings.services[serviceId].models[modelName];
      if (!model) {
        return;
      }
      var list = this.props.lists[model.key];
      if (list) {
        if (model === this.state.model && this.state.data) {
          return;
        }
      }
      var args = {
        service: serviceId,
        model: modelName,
        key: model.key
      };
      args.filters = _lodash2.default.assign({}, this.props.filters, (0, _defineProperty3.default)({}, this.props.path, this.props.from));
      this.setState({ model: model }, function () {
        if (!_this3.state.data) {
          _this3.props.actions.list(args);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var model = _state.model;
      var data = _state.data;

      if (!model || !data) {
        return _react2.default.createElement('div', null);
      }
      var t = this.context.t;
      var title = this.props.title ? t(this.props.title, model.service.id) : t('Relationship') + (': ' + t(model.label, model.service.id));
      return _react2.default.createElement(
        'div',
        { className: 'panel panel-default' },
        _react2.default.createElement(
          'div',
          { className: 'panel-heading' },
          _react2.default.createElement(
            'h3',
            { className: 'panel-title' },
            title
          )
        ),
        _react2.default.createElement(_DataTable2.default, { model: model, data: data })
      );
    }
  }]);
  return Relationship;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-03-25
                               * @author Liang <liang@maichong.it>
                               */

Relationship.propTypes = {
  children: _react2.default.PropTypes.node
};
Relationship.contextTypes = {
  settings: _react2.default.PropTypes.object,
  t: _react2.default.PropTypes.func
};
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var lists = _ref.lists;
  return { lists: lists };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(Relationship);