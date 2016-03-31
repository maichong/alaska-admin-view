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

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _alaskaAdminView = require('alaska-admin-view');

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataTable = function (_React$Component) {
  (0, _inherits3.default)(DataTable, _React$Component);

  function DataTable(props, context) {
    (0, _classCallCheck3.default)(this, DataTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DataTable).call(this, props));

    _this.state = {
      data: props.data || []
    };
    return _this;
  }

  (0, _createClass3.default)(DataTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init(this.props, this.context);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var newState = {};
      if (nextProps.data) {
        newState.data = nextProps.data;
        this.setState(newState, function () {
          if (nextProps.model) {
            _this2.init(_this2.props);
          }
        });
      }
    }
  }, {
    key: 'init',
    value: function init(props) {
      var model = props.model || this.props.model;
      if (!model) {
        return;
      }

      var columns = [];
      model.defaultColumns.forEach(function (key) {
        model.fields[key] && columns.push({
          key: key,
          field: model.fields[key]
        });
      });
      this.setState({ columns: columns });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      if (!state.data || !state.columns) {
        return false;
      }
      return !(0, _alaskaAdminView.shallowEqual)(state, this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = this.props;
      var views = this.context.views;
      var t = this.context.t;
      var _state = this.state;
      var columns = _state.columns;
      var data = _state.data;

      var model = props.model;
      var service = model.service;
      var styles = {
        root: {}
      };
      if (!model || !columns) {
        return _react2.default.createElement(
          'div',
          { className: 'loading' },
          'Loading...'
        );
      }

      var headerRowElement = _react2.default.createElement(
        'tr',
        null,
        columns.map(function (col) {
          return _react2.default.createElement(
            'th',
            {
              key: col.key,
              tooltip: col.field.tooltip
            },
            t(col.field.label, service.id)
          );
        }),
        _react2.default.createElement('th', null)
      );

      var bodyElement = _react2.default.createElement(
        'tbody',
        null,
        data.map(function (record, index) {
          return (0, _wrap2.default)(views.wrappers.dataTableRow, _react2.default.createElement(
            'tr',
            { key: index },
            columns.map(function (col) {
              var key = col.key;
              var CellViewClass = views[col.field.cell];
              if (!CellViewClass) {
                console.warn('Missing : ' + col.field.cell);
                return _react2.default.createElement(
                  'td',
                  { style: { background: '#fcc' }, key: key },
                  record[key]
                );
              }
              return _react2.default.createElement(
                'td',
                { key: key },
                _react2.default.createElement(CellViewClass, {
                  value: record[key],
                  model: model,
                  key: key,
                  field: col.field
                })
              );
            }),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/edit/' + service.id + '/' + model.name + '/' + record._id },
                _react2.default.createElement('i', { className: 'fa fa-edit' })
              )
            )
          ), _this3);
        })
      );

      return (0, _wrap2.default)(views.wrappers.dataTable, _react2.default.createElement(
        _reactBootstrap.Table,
        { striped: true, bordered: true, hover: true },
        (0, _wrap2.default)(views.wrappers.dataTableHeader, _react2.default.createElement(
          'thead',
          null,
          (0, _wrap2.default)(views.wrappers.dataTableHeaderRow, headerRowElement, this)
        ), this),
        (0, _wrap2.default)(views.wrappers.dataTableBody, bodyElement, this)
      ), this);
    }
  }]);
  return DataTable;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-03-03
                               * @author Liang <liang@maichong.it>
                               */

DataTable.propTypes = {
  children: _react2.default.PropTypes.node,
  model: _react2.default.PropTypes.object,
  data: _react2.default.PropTypes.array
};
DataTable.contextTypes = {
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object,
  t: _react2.default.PropTypes.func
};
exports.default = DataTable;