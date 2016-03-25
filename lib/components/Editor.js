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

var _FieldGroup = require('./FieldGroup');

var _FieldGroup2 = _interopRequireDefault(_FieldGroup);

var _Relationship = require('./Relationship');

var _Relationship2 = _interopRequireDefault(_Relationship);

var _reactBootstrap = require('react-bootstrap');

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

    _initialiseProps.call(_this);

    console.log('Editor.constructor', props, context);

    _this._r = Math.random();

    _this.state = {
      serviceId: props.params.service,
      modelName: props.params.model,
      id: props.params.id,
      showRemoveDialog: false,
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
    value: function componentWillReceiveProps(nextProps) {
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
            this.context.router.replace(url);
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
          var _url = '/list/' + this.state.serviceId + '/' + this.state.modelName;
          this.context.router.replace(_url);
        }
      }
      this.setState(newState, function () {
        _this2.init();
      });
    }
  }, {
    key: 'init',
    value: function init() {
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
          key: state.model.key,
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
    key: 'render',
    value: function render() {
      var _state = this.state;
      var id = _state.id;
      var model = _state.model;
      var data = _state.data;
      var errors = _state.errors;
      var serviceId = _state.serviceId;
      var modelName = _state.modelName;
      var views = this.context.views;

      if (!data) {
        return _react2.default.createElement(
          'div',
          { className: 'loading' },
          'Loading...'
        );
      }
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
        default: {
          title: '',
          fields: []
        }
      };

      for (var groupKey in model.groups) {
        var group = model.groups[groupKey];
        if (typeof group == 'string') {
          group = { title: group };
        }
        group.fields = [];
        groups[groupKey] = group;
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
            if (!data[cfg.depends]) {
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
        var _group = groups.default;
        if (cfg.group && groups[cfg.group]) {
          _group = groups[cfg.group];
        }
        _group.fields.push(view);
      }
      var groupElements = [];
      for (var _groupKey in groups) {
        var _group2 = groups[_groupKey];
        if (!_group2.fields.length) {
          continue;
        }
        var groupEl = _react2.default.createElement(
          _FieldGroup2.default,
          { key: _groupKey, title: _group2.title, panel: _group2.panel,
            bsStyle: _group2.style },
          _group2.fields
        );
        var path = 'wrappers.' + serviceId + '-' + modelName + '-group-' + _groupKey;
        var wrappers = _.get(views, path);
        if (wrappers) {
          groupEl = (0, _wrap2.default)(wrappers, groupEl, this, { key: _groupKey });
        }
        groupElements.push(groupEl);
      }

      var btnElements = [];
      var removeDialogElement = null;
      if (canSave) {
        btnElements.push(_react2.default.createElement(
          _reactBootstrap.Button,
          {
            bsStyle: 'primary',
            onClick: this.handleSave,
            key: 'save',
            disabled: this.loading
          },
          '保存'
        ));
      }
      if (!model.noremove && id !== '_new' && model.abilities.remove) {
        btnElements.push(_react2.default.createElement(
          _reactBootstrap.Button,
          {
            bsStyle: 'danger',
            onClick: this.remove,
            key: 'remove',
            disabled: this.loading
          },
          '删除'
        ));
        //确认删除
        removeDialogElement = _react2.default.createElement(
          _reactBootstrap.Modal,
          {
            title: '删除记录',
            actions: actions,
            modal: false,
            show: this.state.showRemoveDialog
          },
          _react2.default.createElement(
            _reactBootstrap.Modal.Body,
            null,
            '确定要删除吗? 删除后不可还原!'
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { bsStyle: 'danger', onClick: this.handleRemove },
              '删除'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.handleClose },
              '取消'
            )
          )
        );
      }
      if (!model.nocreate && id !== '_new' && model.abilities.create) {
        btnElements.push(_react2.default.createElement(
          _reactBootstrap.Button,
          {
            onClick: this.handleCreate,
            bsStyle: 'default',
            key: 'create',
            disabled: this.loading
          },
          '新建'
        ));
      }

      var relationships = null;
      if (id != '_new' && model.relationships && model.relationships.length) {
        relationships = _.map(model.relationships, function (r, index) {
          return _react2.default.createElement(_Relationship2.default, { key: index, from: id, path: r.path,
            service: r.service, model: r.ref,
            filters: r.filters, title: r.title });
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'editor-content' },
        _react2.default.createElement(
          'div',
          { className: 'content-header' },
          _react2.default.createElement(
            'h4',
            null,
            title
          ),
          id === '_new' ? null : _react2.default.createElement(
            'div',
            null,
            'ID : ',
            id
          ),
          _react2.default.createElement(
            'div',
            { className: 'content-header-buttons' },
            btnElements
          )
        ),
        groupElements,
        removeDialogElement,
        relationships,
        _react2.default.createElement(
          _reactBootstrap.Navbar,
          { id: 'editorBottomBar', fixedBottom: true, fluid: true },
          _react2.default.createElement(
            _reactBootstrap.Navbar.Form,
            { pullRight: true },
            btnElements
          )
        )
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
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object,
  router: _react2.default.PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleClose = function () {
    console.log('handleClose');
    _this3.setState({ showRemoveDialog: false });
  };

  this.handleCreate = function () {
    var url = '/edit/' + _this3.state.serviceId + '/' + _this3.state.modelName + '/_new';
    _this3.context.router.replace(url);
  };

  this.handleRemove = function () {
    _this3._r = Math.random();
    _this3.props.actions.remove({
      service: _this3.state.serviceId,
      model: _this3.state.modelName,
      id: _this3.state.id,
      _r: _this3._r
    });
    _this3.loading = true;
    _this3.setState({ showRemoveDialog: false });
  };

  this.handleSave = function () {
    var _state2 = _this3.state;
    var data = _state2.data;
    var model = _state2.model;
    var id = _state2.id;

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
    _this3.setState({ errors: errors });
    if (hasError) {
      return;
    }
    _this3._r = Math.random();
    _this3.loading = true;

    _this3.props.actions.save({
      service: model.service.id,
      model: model.name,
      _r: _this3._r,
      data: _.assign({}, data, { id: id == '_new' ? '' : id })
    });
  };

  this.remove = function () {
    _this3.setState({ showRemoveDialog: true });
  };
};

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