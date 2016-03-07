'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _getMuiTheme = require('material-ui/lib/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

var _paper = require('material-ui/lib/paper');

var _paper2 = _interopRequireDefault(_paper);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = function (_React$Component) {
  (0, _inherits3.default)(Editor, _React$Component);

  function Editor(props, context) {
    (0, _classCallCheck3.default)(this, Editor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Editor).call(this, props));

    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      settings: context.settings,
      serviceId: props.params.service,
      modelName: props.params.model,
      id: props.params.id
    };

    var service = context.settings.services[_this.state.serviceId];
    if (!service) {
      return (0, _possibleConstructorReturn3.default)(_this);
    }
    _this.state.service = service;
    var model = service.models[_this.state.modelName];
    if (!model) {
      return (0, _possibleConstructorReturn3.default)(_this);
    }
    _this.state.model = model;
    return _this;
  }

  (0, _createClass3.default)(Editor, [{
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
      this._init();
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
      if (nextProps.params) {
        newState.serviceId = nextProps.params.service;
        newState.modelName = nextProps.params.model;
        newState.id = nextProps.params.id;

        var service = this.state.settings.services[newState.serviceId];
        if (service) {
          newState.service = service;
          var model = service.models[newState.modelName];
          if (model) {
            newState.model = model;
          }
        }
      }
      this.setState(newState, function () {
        _this2._init();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: '_init',
    value: function _init() {
      console.log('init', this);
      var props = this.props;
      var state = this.state;
      if (!state.model) {
        return;
      }
      var key = state.model.key;
      if (this.props.details[key] && this.props.details[key][state.id]) {
        this.setState({
          data: this.props.details[key][state.id]
        });
      } else {
        props.actions.details({
          service: state.serviceId,
          model: state.modelName,
          id: state.id
        });
      }
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(key, event) {
      this.setState({
        data: _.assign({}, this.state.data, (0, _defineProperty3.default)({}, key, event.target.value))
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var _state = this.state;
      var id = _state.id;
      var model = _state.model;
      var data = _state.data;
      var muiTheme = _state.muiTheme;
      var views = _state.views;

      console.log('model', model);
      console.log('data', data);
      if (!data) {
        return _react2.default.createElement(
          'div',
          { className: 'loading' },
          'Loading...'
        );
      }
      var styles = {
        root: {},
        titleBar: {
          height: 32,
          overflow: 'hidden',
          position: 'relative',
          marginBottom: 20
        },
        title: {
          fontSize: 32,
          color: muiTheme.baseTheme.palette.primary1Color
        },
        titleId: {
          fontSize: 12,
          color: '#666',
          height: 12,
          position: 'absolute',
          right: 0,
          bottom: 0
        },
        group: {
          marginBottom: 20,
          padding: 10
        },
        groupName: {
          fontSize: 16,
          padding: 5,
          color: muiTheme.baseTheme.palette.primary1Color
        }
      };
      var title = (model.label || model.name) + ' > ';
      if (model.title) {
        title += data[model.title];
      } else {
        title += data._id;
      }
      var groups = {
        _: {
          name: '',
          fields: []
        }
      };

      for (var groupKey in model.groups) {
        var groupName = model.groups[groupKey];
        if ((typeof groupName === 'undefined' ? 'undefined' : (0, _typeof3.default)(groupName)) == 'object') {
          groupName = groupName.name;
        }
        groups[groupKey] = {
          name: groupName,
          fields: []
        };
      }
      for (var key in model.fields) {
        if (key == '_id') {
          continue;
        }
        var cfg = model.fields[key];
        var ViewClass = views[cfg.view];
        if (!ViewClass) {
          console.warn('Missing : ' + cfg.view);
          ViewClass = views.TextFieldView;
        }
        var view = _react2.default.createElement(ViewClass, {
          key: key,
          value: data[key],
          model: model,
          data: data,
          field: cfg,
          onChange: this._handleChange.bind(this, key)
        });
        var group = groups._;
        if (cfg.group && groups[cfg.group]) {
          group = groups[cfg.group];
        }
        group.fields.push(view);
      }
      var groupElements = [];
      for (var groupKey in groups) {
        var group = groups[groupKey];
        if (!group.fields.length) {
          continue;
        }
        var groupNameElement = group.name ? _react2.default.createElement(
          'div',
          { style: styles.groupName },
          group.name
        ) : null;
        groupElements.push(_react2.default.createElement(
          'div',
          { key: groupKey },
          groupNameElement,
          _react2.default.createElement(
            _paper2.default,
            { zDepth: 1, style: styles.group },
            group.fields
          )
        ));
      }
      return _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(
          'div',
          { style: styles.titleBar },
          _react2.default.createElement(
            'div',
            { style: styles.title },
            title
          ),
          _react2.default.createElement(
            'div',
            { style: styles.titleId },
            'ID : ',
            id
          )
        ),
        groupElements
      );
    }
  }]);
  return Editor;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-03-03
                               * @author Liang <liang@maichong.it>
                               */

Editor.propTypes = {
  children: _react2.default.PropTypes.node,
  details: _react2.default.PropTypes.object,
  params: _react2.default.PropTypes.object
};
Editor.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
Editor.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
Editor.mixins = [_contextPure2.default];
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var details = _ref.details;
  return { details: details };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(Editor);