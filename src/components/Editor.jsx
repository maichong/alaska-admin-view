/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-03
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import FieldGroup from './FieldGroup';
import Relationship from './Relationship';

import Modal from 'react-bootstrap/lib/Modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import wrap from '../utils/wrap';
import _forEach from 'lodash/forEach';
import _every from 'lodash/every';
import _get from 'lodash/get';
import _map from 'lodash/map';

function checkDepends(depends, data) {
  if (typeof depends === 'string') {
    if (!data[depends]) {
      return false;
    }
  } else if (!_every(depends, (value, k) => data[k] === value)) {
    //没有全部匹配
    return false;
  }
  return true;
}

class Editor extends React.Component {

  static propTypes = {
    details: React.PropTypes.object,
    params: React.PropTypes.object,
    actions: React.PropTypes.object,
  };

  static contextTypes = {
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
    t: React.PropTypes.func,
    router: React.PropTypes.object,
    toast: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props);

    this._r = Math.random();

    this.state = {
      serviceId: props.params.service,
      modelName: props.params.model,
      id: props.params.id,
      showRemoveDialog: false,
      errors: {}
    };

    let service = context.settings.services[this.state.serviceId];
    if (!service) return;
    this.state.service = service;
    let model = service.models[this.state.modelName];
    if (!model) return;
    this.state.model = model;
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    const toast = this.context.toast;
    let newState = {};
    if (nextProps.params) {
      newState.serviceId = nextProps.params.service;
      newState.modelName = nextProps.params.model;
      newState.id = nextProps.params.id;
      if (newState.id === '_new' && this.state.id && this.state.id !== '_new') {
        //新建时候清空表单
        newState.data = {};
      }

      let service = this.context.settings.services[newState.serviceId];
      if (service) {
        newState.service = service;
        let model = service.models[newState.modelName];
        if (model) {
          newState.model = model;
        }
      }
    }
    if (nextProps.save && nextProps.save._r == this._r) {
      this._r = Math.random();
      let t = this.context.t;
      this.loading = false;
      if (nextProps.save.error) {
        //保存失败
        toast('error', t('Save failed'), nextProps.save.error.message);
      } else {
        toast('success', t('Saved successfully'));
        if (this.state.id === '_new') {
          let url = '/edit/' + this.state.serviceId + '/' + this.state.modelName + '/' + nextProps.save.res._id;
          this.context.router.replace(url);
        }
      }
    }
    if (nextProps.remove && nextProps.remove._r == this._r) {
      this._r = Math.random();
      let t = this.context.t;
      this.loading = false;
      if (nextProps.remove.error) {
        //保存失败
        toast('error', t('Remove failed'), nextProps.remove.error.message);
      } else {
        toast('success', t('Removed successfully'));
        let url = '/list/' + this.state.serviceId + '/' + this.state.modelName;
        this.context.router.replace(url);
      }
    }
    if (nextProps.action && nextProps.action._r == this._r) {
      this._r = Math.random();
      let t = this.context.t;
      this.loading = false;
      if (nextProps.action.error) {
        //保存失败
        toast('error', t('Failed'), nextProps.action.error.message);
      } else {
        toast('success', t('Successfully'));
        if (nextProps.action.res._id) {
          if (this.state.id === '_new') {
            let url = '/edit/' + this.state.serviceId + '/' + this.state.modelName + '/' + nextProps.action.res._id;
            this.context.router.replace(url);
          }
        } else {
          let url = '/list/' + this.state.serviceId + '/' + this.state.modelName;
          this.context.router.replace(url);
        }
      }
    }
    this.setState(newState, () => {
      this.init();
    });
  }

  init() {
    let props = this.props;
    let state = this.state;
    if (!state.model) return;
    let id = state.id;
    if (id === '_new') {
      let data = state.data || {};
      let newData = {};
      _forEach(state.model.fields, field => {
        if (data[field.path] !== undefined) {
          newData[field.path] = data[field.path];
        } else if (field.default !== undefined) {
          newData[field.path] = field.default;
        }
      });
      this.setState({ data: newData });
      return;
    }
    let key = state.model.key;
    if (this.props.details[key] && this.props.details[key][id]) {
      this.setState({
        data: this.props.details[key][id]
      });
    } else {
      props.actions.details({
        service: state.serviceId,
        model: state.modelName,
        key: state.model.key,
        id
      });
    }
  }

  handleChange(key, value) {
    this.setState({
      data: Object.assign({}, this.state.data, {
        [key]: value
      })
    });
  }

  handleClose = () => {
    console.log('handleClose');
    this.setState({ showRemoveDialog: false });
  };

  handleCreate = () => {
    let url = '/edit/' + this.state.serviceId + '/' + this.state.modelName + '/_new';
    this.context.router.replace(url);
  };

  handleRemove = () => {
    this._r = Math.random();
    this.props.actions.remove({
      service: this.state.serviceId,
      model: this.state.modelName,
      id: this.state.id,
      _r: this._r
    });
    this.loading = true;
    this.setState({ showRemoveDialog: false });
  };

  handleSave = () => {
    let {
      data,
      model,
      id
      } = this.state;
    let fields = model.fields;
    let errors = {};
    let hasError = false;
    const t = this.context.t;
    for (let key in fields) {
      let field = fields[key];

      if (field.required && !data[key]) {
        if (field.required === true || checkDepends(field.required, data)) {
          errors[key] = t('This field is required!');
          hasError = true;
        }
      }
    }
    this.setState({ errors });
    if (hasError) return;
    this._r = Math.random();
    this.loading = true;

    this.props.actions.save({
      service: model.service.id,
      model: model.name,
      key: model.key,
      _r: this._r,
      data: Object.assign({}, data, { id: id == '_new' ? '' : id })
    });
  };

  handleAction(action) {
    let {
      data,
      model,
      id
      } = this.state;
    this._r = Math.random();
    this.loading = true;

    this.props.actions.action({
      service: model.service.id,
      model: model.name,
      key: model.key,
      action,
      _r: this._r,
      data: Object.assign({}, data, { id: id == '_new' ? '' : id })
    });
  }

  remove = () => {
    this.setState({ showRemoveDialog: true });
  };

  render() {
    let {
      id,
      model,
      data,
      errors,
      serviceId,
      modelName
      } = this.state;
    const { views, t } = this.context;
    if (!data) {
      return <div className="loading">Loading...</div>;
    }
    let canSave = (id === '_new' && model.abilities.create) || (id !== '_new' && model.abilities.update && !model.noedit);
    let title = t(model.label || model.name, serviceId) + ' > ';
    if (id == '_new') {
      title += t('Create');
    } else if (model.title) {
      title += t(data[model.title], serviceId);
    } else {
      title += id;
    }
    let groups = {
      default: {
        title: '',
        fields: []
      }
    };

    for (let groupKey in model.groups) {
      let group = model.groups[groupKey];
      if (typeof group == 'string') {
        group = { title: group };
      }
      if (!group._title) {
        group._title = group.title;
        group.title = t(group.title, serviceId);
      }
      group.fields = [];
      groups[groupKey] = group;
    }
    for (let key in model.fields) {
      let cfg = model.fields[key];
      if (cfg.hidden) continue;
      if (!cfg.view) continue;
      if (cfg.depends && !checkDepends(cfg.depends, data)) continue;
      let ViewClass = views[cfg.view];
      if (!ViewClass) {
        console.warn('Missing : ' + cfg.view);
        ViewClass = views.TextFieldView;
      }

      let disabled = false;
      if (model.noedit || this.loading || !canSave) {
        disabled = true;
      } else if (cfg.disabled) {
        if (cfg.disabled === true) {
          disabled = true;
        } else {
          disabled = checkDepends(cfg.disabled, data);
        }
      }

      if (!cfg._label) {
        cfg._label = cfg.label;
        cfg.label = t(cfg.label, serviceId);
      }
      if (cfg.help && !cfg._help) {
        cfg._help = cfg.help;
        cfg.help = t(cfg.help, serviceId);
      }

      let fieldProps = {
        key,
        value: data[key],
        model,
        data,
        field: cfg,
        disabled,
        errorText: errors[key],
        onChange: this.handleChange.bind(this, key)
      };

      let view = React.createElement(ViewClass, fieldProps);
      let group = groups.default;
      if (cfg.group && groups[cfg.group]) {
        group = groups[cfg.group];
      }
      group.fields.push(view);
    }
    let groupElements = [];
    for (let groupKey in groups) {
      let group = groups[groupKey];
      if (!group.fields.length) {
        continue;
      }
      let groupEl = <FieldGroup key={groupKey} title={group.title} panel={group.panel}
                                bsStyle={group.style}>{group.fields}</FieldGroup>;
      let path = `wrappers.${serviceId}-${modelName}-group-${groupKey}`;
      let wrappers = _get(views, path);
      if (wrappers) {
        groupEl = wrap(wrappers, groupEl, this, { key: groupKey });
      }
      groupElements.push(groupEl);
    }

    let btnElements = [];
    let removeDialogElement = null;

    if (canSave && model.actions.save && model.actions.save.depends && !checkDepends(model.actions.save.depends, data)) {
      canSave = false;
    }
    if (canSave && model.actions.save !== false) {
      btnElements.push(<button
        className="btn btn-primary"
        onClick={this.handleSave}
        key="save"
        disabled={this.loading}
      >{t('Save')}</button>);
    }
    let canRemove = true;
    if (model.actions.remove && model.actions.remove.depends && !checkDepends(model.actions.remove.depends, data)) {
      canRemove = false;
    }
    if (canRemove && !model.noremove && id !== '_new' && model.abilities.remove && model.actions.remove !== false) {
      btnElements.push(<button
        className="btn btn-danger"
        onClick={this.remove}
        key="remove"
        disabled={this.loading}
      >{t('Remove')}</button>);
      //确认删除
      if (this.state.showRemoveDialog) {
        removeDialogElement = (<Modal show={true}>
          <div className="modal-header">{t('Remove Record')}</div>
          <div className="modal-body">
            {t('confirm remove record')}
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={this.handleRemove}>{t('Remove')}</button>
            <button className="btn" onClick={this.handleClose}>{t('Cancel')}</button>
          </div>
        </Modal>);
      }
    }

    let canCreate = true;
    if (model.actions.create && model.actions.create.depends && !checkDepends(model.actions.create.depends, data)) {
      canCreate = false;
    }
    if (canCreate && !model.nocreate && id !== '_new' && model.abilities.create) {
      btnElements.push(<button
        onClick={this.handleCreate}
        className="btn btn-default"
        key="create"
        disabled={this.loading}
      >{t('Create')}</button>);
    }

    //扩展动作按钮
    _forEach(model.actions, (action, key)=> {
      if (!action.sled || ['create', 'save', 'remove'].indexOf(key) > -1) return;
      if (!model.abilities[key]) return;
      if (action.depends && !checkDepends(action.depends, data)) return;
      let className = 'btn btn-' + (action.style || 'default');
      btnElements.push(<button
        onClick={() => this.handleAction(key)}
        className={className}
        key={key}
        disabled={this.loading}
      >{t(action.title)}</button>);
    });

    let relationships = null;
    if (id != '_new' && model.relationships) {
      relationships = _map(model.relationships, (r, index) => <Relationship key={index} from={id} path={r.path}
                                                                            service={r.service} model={r.ref}
                                                                            filters={r.filters} title={r.title}/>);
    }

    return (
      <div className="editor-content">
        <div className="content-header">
          <h4>{title}</h4>
          {
            id === '_new' ? null : <div >ID : {id}</div>
          }
          <div className="content-header-buttons">{btnElements}</div>
        </div>
        {groupElements}
        {removeDialogElement}
        {relationships}
        <nav className="navbar navbar-fixed-bottom bottom-bar">
          <div className="container-fluid">
            <div className="navbar-form navbar-right">
              {btnElements}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(({ details, save, remove, action }) => ({ details, save, remove, action }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Editor);
