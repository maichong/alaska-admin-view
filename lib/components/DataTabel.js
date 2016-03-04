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

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-03
 * @author Liang <liang@maichong.it>
 */

var DataTable = function (_React$Component) {
  (0, _inherits3.default)(DataTable, _React$Component);

  function DataTable(props, context) {
    (0, _classCallCheck3.default)(this, DataTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DataTable).call(this, props));

    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      settings: context.settings,
      data: props.data
    };
    return _this;
  }

  (0, _createClass3.default)(DataTable, [{
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
      if (nextProps.data) {
        newState.data = nextProps.data;
      }
      this.setState(newState, function () {
        _this2._init(_this2.props, _this2.context);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: '_init',
    value: function _init(props, context) {
      var settings = context.settings;
      var serviceName = props.service || this.props.service;
      var modelName = props.model || this.props.model;
      if (!serviceName || !modelName || !settings || !settings.services) {
        return;
      }
      var service = settings.services[serviceName];
      if (!service) {
        return;
      }
      var model = service.models[modelName];
      if (!model) {
        return;
      }
      var title = props.title || this.props.title || model.label;

      var columns = [];

      model.defaultColumns.forEach(function (key) {
        columns.push({
          key: key,
          field: model.fields[key]
        });
      });
      this.setState({ title: title, serviceName: serviceName, modelName: modelName, service: service, model: model, columns: columns });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var _state = this.state;
      var title = _state.title;
      var model = _state.model;
      var views = _state.views;
      var muiTheme = _state.muiTheme;
      var columns = _state.columns;
      var data = _state.data;

      var styles = {
        root: {},
        title: {
          fontSize: 32,
          color: muiTheme.baseTheme.palette.primary1Color,
          marginBottom: 20
        }
      };
      if (!model) {
        return _react2.default.createElement(
          'div',
          { className: 'loading' },
          'Loading...'
        );
      }

      var headerRowElement = _react2.default.createElement(
        _tableRow2.default,
        null,
        columns.map(function (col, index) {
          return _react2.default.createElement(
            _tableHeaderColumn2.default,
            {
              key: col.key,
              tooltip: col.field.tooltip
            },
            col.field.label
          );
        })
      );

      var bodyElement = _react2.default.createElement(
        _tableBody2.default,
        null,
        data.map(function (record, index) {
          return (0, _wrap2.default)(views.wrappers.listTableRow, _react2.default.createElement(
            _tableRow2.default,
            { key: index },
            columns.map(function (col) {
              var key = col.key;
              var CellViewClass = views[col.field.cell];
              if (!CellViewClass) {
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
            })
          ));
        })
      );

      var tabelElement = (0, _wrap2.default)(views.wrappers.listTable, _react2.default.createElement(
        _table2.default,
        null,
        (0, _wrap2.default)(views.wrappers.listTableHeader, _react2.default.createElement(
          _tableHeader2.default,
          null,
          (0, _wrap2.default)(views.wrappers.listTableHeaderRow, headerRowElement)
        )),
        (0, _wrap2.default)(views.wrappers.listTableBody, bodyElement)
      ));

      var el = _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(
          'div',
          { style: styles.title },
          title
        ),
        _react2.default.createElement(
          _paper2.default,
          { zDepth: 1, style: styles.root },
          (0, _wrap2.default)(views.wrappers.listTable, tabelElement)
        )
      );
      return (0, _wrap2.default)(views.wrappers.list, el);
    }
  }]);
  return DataTable;
}(_react2.default.Component);

DataTable.propTypes = {
  children: _react2.default.PropTypes.node,
  service: _react2.default.PropTypes.string,
  model: _react2.default.PropTypes.string
};
DataTable.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
DataTable.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
DataTable.mixins = [_contextPure2.default];
exports.default = DataTable;