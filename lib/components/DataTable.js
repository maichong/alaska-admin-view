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

var _table = require('material-ui/lib/table/table');

var _table2 = _interopRequireDefault(_table);

var _tableBody = require('material-ui/lib/table/table-body');

var _tableBody2 = _interopRequireDefault(_tableBody);

var _tableFooter = require('material-ui/lib/table/table-footer');

var _tableFooter2 = _interopRequireDefault(_tableFooter);

var _tableHeader = require('material-ui/lib/table/table-header');

var _tableHeader2 = _interopRequireDefault(_tableHeader);

var _tableHeaderColumn = require('material-ui/lib/table/table-header-column');

var _tableHeaderColumn2 = _interopRequireDefault(_tableHeaderColumn);

var _tableRow = require('material-ui/lib/table/table-row');

var _tableRow2 = _interopRequireDefault(_tableRow);

var _tableRowColumn = require('material-ui/lib/table/table-row-column');

var _tableRowColumn2 = _interopRequireDefault(_tableRowColumn);

var _fontIcon = require('material-ui/lib/font-icon');

var _fontIcon2 = _interopRequireDefault(_fontIcon);

var _iconButton = require('material-ui/lib/icon-button');

var _iconButton2 = _interopRequireDefault(_iconButton);

var _reactRouter = require('react-router');

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
      }
      this.setState(newState, function () {
        _this2.init(_this2.props, _this2.context);
      });
    }
  }, {
    key: 'init',
    value: function init(props, context) {
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
      this.setState({ columns: columns, el: this._render() });
    }
  }, {
    key: '_render',
    value: function _render() {
      console.log('DataTable._render');
      var props = this.props;
      var views = this.context.views;
      var muiTheme = this.context.muiTheme;
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
      var primary1Color = muiTheme.baseTheme.palette.primary1Color;
      var accent1Color = muiTheme.baseTheme.palette.accent1Color;

      var headerRowElement = _react2.default.createElement(
        _tableRow2.default,
        null,
        columns.map(function (col) {
          return _react2.default.createElement(
            _tableHeaderColumn2.default,
            {
              key: col.key,
              tooltip: col.field.tooltip
            },
            col.field.label
          );
        }),
        _react2.default.createElement(_tableHeaderColumn2.default, null)
      );

      var bodyElement = _react2.default.createElement(
        _tableBody2.default,
        null,
        data.map(function (record, index) {
          return (0, _wrap2.default)(views.wrappers.dataTableRow, _react2.default.createElement(
            _tableRow2.default,
            { key: index },
            columns.map(function (col) {
              var key = col.key;
              var CellViewClass = views[col.field.cell];
              if (!CellViewClass) {
                console.warn('Missing : ' + col.field.cell);
                return _react2.default.createElement(
                  _tableRowColumn2.default,
                  { style: { background: '#fcc' }, key: key },
                  record[key]
                );
              }
              return _react2.default.createElement(
                _tableRowColumn2.default,
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
              _tableRowColumn2.default,
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/edit/' + service.id + '/' + model.name + '/' + record._id },
                _react2.default.createElement(
                  _fontIcon2.default,
                  { className: 'material-icons', color: '#666', hoverColor: primary1Color },
                  'create'
                )
              ),
              _react2.default.createElement(
                _iconButton2.default,
                null,
                _react2.default.createElement(
                  _fontIcon2.default,
                  { className: 'material-icons', color: '#666', hoverColor: accent1Color },
                  'clear'
                )
              )
            )
          ));
        })
      );

      var tabelElement = (0, _wrap2.default)(views.wrappers.dataTable, _react2.default.createElement(
        _table2.default,
        { multiSelectable: true },
        (0, _wrap2.default)(views.wrappers.dataTableHeader, _react2.default.createElement(
          _tableHeader2.default,
          null,
          (0, _wrap2.default)(views.wrappers.dataTableHeaderRow, headerRowElement)
        )),
        (0, _wrap2.default)(views.wrappers.dataTableBody, bodyElement)
      ));

      var el = _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(
          _paper2.default,
          { zDepth: 1, style: styles.root },
          (0, _wrap2.default)(views.wrappers.dataTable, tabelElement)
        )
      );
      return (0, _wrap2.default)(views.wrappers.list, el);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.el || _react2.default.createElement('div', null);
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
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
DataTable.mixins = [_contextPure2.default];
exports.default = DataTable;