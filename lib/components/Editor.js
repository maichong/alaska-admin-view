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

var _raisedButton = require('material-ui/lib/raised-button');

var _raisedButton2 = _interopRequireDefault(_raisedButton);

var _dialog = require('material-ui/lib/dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _flatButton = require('material-ui/lib/flat-button');

var _flatButton2 = _interopRequireDefault(_flatButton);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions2 = require('../actions');

var actions = _interopRequireWildcard(_actions2);

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-03
 * @author Liang <liang@maichong.it>
 */

var Editor = function (_React$Component) {
  (0, _inherits3.default)(Editor, _React$Component);

  function Editor(props, context) {
    (0, _classCallCheck3.default)(this, Editor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Editor).call(this, props));

    console.log('Editor.constructor', props, context);

    _this.handleSave = _this.handleSave.bind(_this);
    _this.remove = _this.remove.bind(_this);
    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleRemove = _this.handleRemove.bind(_this);
    _this._r = Math.random();

    _this.state = {
      serviceId: props.params.service,
      modelName: props.params.model,
      id: props.params.id,
      removeDialogOpen: false,
      errors: {}
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
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var _this2 = this;

      var newState = {};
      if (nextProps.params) {
        newState.serviceId = nextProps.params.service;
        newState.modelName = nextProps.params.model;
        newState.id = nextProps.params.id;

        var service = this.context.settings.services[newState.serviceId];
        if (service) {
          newState.service = service;
          var model = service.models[newState.modelName];
          if (model) {
            newState.model = model;
          }
        }
      }
      if (nextProps.save && nextProps.save._r == this._r) {
        this.loading = false;
        if (nextProps.save.error) {
          //保存失败
          this.props.actions.notice('保存失败:' + nextProps.save.error.message);
        } else {
          this.props.actions.notice('保存成功!');
          if (this.state.id == '_new') {
            var url = '/edit/' + this.state.serviceId + '/' + this.state.modelName + '/' + nextProps.save.res._id;
            this.props.history.replaceState(null, url);
          }
        }
      }
      if (nextProps.remove && nextProps.remove._r == this._r) {
        this.loading = false;
        if (nextProps.remove.error) {
          //保存失败
          this.props.actions.notice('删除失败:' + nextProps.remove.error.message);
        } else {
          this.props.actions.notice('删除成功!');
          var url = '/list/' + this.state.serviceId + '/' + this.state.modelName;
          this.props.history.replaceState(null, url);
        }
      }
      this.setState(newState, function () {
        _this2.init();
      });
    }
  }, {
    key: 'init',
    value: function init() {
      console.log('init', this);
      var props = this.props;
      var state = this.state;
      if (!state.model) {
        return;
      }
      var id = state.id;
      if (id === '_new') {
        this.setState({ data: {} });
        return;
      }
      var key = state.model.key;
      if (this.props.details[key] && this.props.details[key][id]) {
        this.setState({
          data: this.props.details[key][id]
        });
      } else {
        props.actions.details({
          service: state.serviceId,
          model: state.modelName,
          id: id
        });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(key, value) {
      this.setState({
        data: _.assign({}, this.state.data, (0, _defineProperty3.default)({}, key, value))
      });
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      console.log('handleClose');
      this.setState({ removeDialogOpen: false });
    }
  }, {
    key: 'handleRemove',
    value: function handleRemove() {
      this._r = Math.random();
      this.props.actions.remove({
        service: this.state.serviceId,
        model: this.state.modelName,
        id: this.state.id,
        _r: this._r
      });
      this.loading = true;
      this.setState({ removeDialogOpen: false });
    }
  }, {
    key: 'handleSave',
    value: function handleSave() {
      var _state = this.state;
      var data = _state.data;
      var model = _state.model;
      var id = _state.id;

      var fields = model.fields;
      var errors = {};
      var hasError = false;
      for (var key in fields) {
        var field = fields[key];
        if (field.required && !data[key]) {
          if (field.required === true || typeof field.required === 'string' && data[field.required] || (0, _typeof3.default)(field.required) === 'object' && _.every(field.required, function (value, k) {
            return data[k] === value;
          })) {
            errors[key] = 'required';
            hasError = true;
          }
        }
      }
      this.setState({ errors: errors });
      if (hasError) {
        return;
      }
      this._r = Math.random();
      this.loading = true;

      this.props.actions.save({
        service: model.service.id,
        model: model.name,
        _r: this._r,
        data: _.assign({}, data, { id: id == '_new' ? '' : id })
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      console.log('remove', this.state.id);
      this.setState({ removeDialogOpen: true });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('Editor.render', this);
      var _state2 = this.state;
      var id = _state2.id;
      var model = _state2.model;
      var data = _state2.data;
      var errors = _state2.errors;
      var _context = this.context;
      var views = _context.views;
      var muiTheme = _context.muiTheme;

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
        },
        button: {
          marginRight: 10
        }
      };
      var canSave = id === '_new' && model.abilities.create || id !== '_new' && model.abilities.update && !model.noedit;
      var title = (model.label || model.name) + ' > ';
      if (id == '_new') {
        title += '新建';
      } else if (model.title) {
        title += data[model.title];
      } else {
        title += id;
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
        var cfg = model.fields[key];
        if (cfg.hidden) {
          continue;
        }
        if (!cfg.view) {
          continue;
        }
        if (cfg.depends) {
          if (typeof cfg.depends === 'string') {
            if (!data[key]) {
              continue;
            }
          } else if (!_.every(cfg.depends, function (value, k) {
            return data[k] === value;
          })) {
            //没有全部匹配
            continue;
          }
        }
        var ViewClass = views[cfg.view];
        if (!ViewClass) {
          console.warn('Missing : ' + cfg.view);
          ViewClass = views.TextFieldView;
        }

        var disabled = false;
        if (model.noedit || this.loading || !canSave) {
          disabled = true;
        } else if (cfg.disabled) {
          if (cfg.disabled === true) {
            disabled = true;
          } else if (typeof cfg.disabled === 'string') {
            if (data[cfg.disabled]) {
              disabled = true;
            }
          } else if (_.every(cfg.disabled, function (value, k) {
            return data[k] === value;
          })) {
            //全部匹配
            disabled = true;
          }
        }

        var fieldProps = {
          key: key,
          value: data[key],
          model: model,
          data: data,
          field: cfg,
          disabled: disabled,
          errorText: errors[key],
          onChange: this.handleChange.bind(this, key)
        };

        var view = _react2.default.createElement(ViewClass, fieldProps);
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

      var btnElements = [];
      var removeDialogElement = null;
      if (canSave) {
        btnElements.push(_react2.default.createElement(_raisedButton2.default, {
          onMouseDown: this.handleSave,
          key: 'save',
          secondary: true,
          label: '保存',
          disabled: this.loading,
          style: styles.button
        }));
      }
      if (!model.noremove && id !== '_new' && model.abilities.remove) {
        btnElements.push(_react2.default.createElement(_raisedButton2.default, {
          onMouseDown: this.remove,
          key: 'remove',
          primary: true,
          label: '删除',
          disabled: this.loading,
          style: styles.button
        }));
        //确认删除
        var _actions = [_react2.default.createElement(_flatButton2.default, {
          label: '取消',
          secondary: true,
          onTouchTap: this.handleClose
        }), _react2.default.createElement(_flatButton2.default, {
          label: '删除',
          primary: true,
          keyboardFocused: true,
          onTouchTap: this.handleRemove
        })];
        removeDialogElement = _react2.default.createElement(
          _dialog2.default,
          {
            title: '删除记录',
            actions: _actions,
            modal: false,
            open: this.state.removeDialogOpen
          },
          '确定要删除吗? 删除后不可还原!'
        );
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
          id === '_new' ? null : _react2.default.createElement(
            'div',
            { style: styles.titleId },
            'ID : ',
            id
          )
        ),
        groupElements,
        btnElements,
        removeDialogElement
      );
    }
  }]);
  return Editor;
}(_react2.default.Component);

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
Editor.mixins = [_contextPure2.default];
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var details = _ref.details;
  var save = _ref.save;
  var remove = _ref.remove;
  return { details: details, save: save, remove: remove };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actions, dispatch)
  };
})(Editor);