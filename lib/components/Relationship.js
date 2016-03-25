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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-25
 * @author Liang <liang@maichong.it>
 */

var Relationship = function (_React$Component) {
  (0, _inherits3.default)(Relationship, _React$Component);

  function Relationship(props) {
    (0, _classCallCheck3.default)(this, Relationship);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Relationship).call(this, props));

    _this.state = {
      data: [],
      model: null
    };
    console.log('Relationship', props);
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

      if (props.service != this.props.service || props.model != this.props.model || props.from != this.props.from) {
        setTimeout(function () {
          _this2.init();
        }, 50);
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
      if (!model || model == this.state.model && this.state.data.length) {
        return;
      }
      var args = {
        service: serviceId,
        model: modelName
      };
      args.filters = _lodash2.default.assign({}, this.props.filters, (0, _defineProperty3.default)({}, this.props.path, this.props.from));
      _api2.default.post(_constants.PREFIX + '/api/list?' + (0, _qs.stringify)(args)).then(function (res) {
        if (res.results) {
          _this3.setState({
            data: res.results
          });
        }
      });
      this.setState({ model: model });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var model = _state.model;
      var data = _state.data;

      if (!model || !data.length) {
        return _react2.default.createElement('div', null);
      }
      var title = this.props.title || '关联: ' + model.label;
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
}(_react2.default.Component);

Relationship.propTypes = {
  children: _react2.default.PropTypes.node
};
Relationship.contextTypes = {
  settings: _react2.default.PropTypes.object
};
exports.default = Relationship;