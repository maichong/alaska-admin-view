/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-03
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import FieldGroup from './FieldGroup';

import { Button, Modal } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import wrap from '../utils/wrap';
import * as _ from 'lodash';

class Editor extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    details: React.PropTypes.object,
    params: React.PropTypes.object,
  };

  static contextTypes = {
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    console.log('Editor.constructor', props, context);

    this._r = Math.random();

    this.state = {
      serviceId: props.params.service,
      modelName: props.params.model,
      id: props.params.id,
      showRemoveDialog: false,
      errors: {}
    };

    let service = context.settings.services[this.state.serviceId];
    if (!service) {
      return;
    }
    this.state.service = service;
    let model = service.models[this.state.modelName];
    if (!model) {
      return;
    }
    this.state.model = model;
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    let newState = {};
    if (nextProps.params) {
      newState.serviceId = nextProps.params.service;
      newState.modelName = nextProps.params.model;
      newState.id = nextProps.params.id;

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
      this.loading = false;
      if (nextProps.save.error) {
        //保存失败
        this.props.actions.notice('保存失败:' + nextProps.save.error.message);
      } else {
        this.props.actions.notice('保存成功!');
        if (this.state.id == '_new') {
          let url = '/edit/' + this.state.serviceId + '/' + this.state.modelName + '/' + nextProps.save.res._id;
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
        let url = '/list/' + this.state.serviceId + '/' + this.state.modelName;
        this.context.router.replace(url);
      }
    }
    this.setState(newState, () => {
      this.init();
    });
  }

  init() {
    let props = this.props;
    let state = this.state;
    if (!state.model) {
      return;
    }
    let id = state.id;
    if (id === '_new') {
      this.setState({ data: {} });
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
        id
      });
    }
  }

  handleChange(key, value) {
    this.setState({
      data: _.assign({}, this.state.data, {
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
    for (let key in fields) {
      let field = fields[key];
      if (field.required && !data[key]) {
        if (field.required === true
          || (typeof field.required === 'string' && data[field.required])
          || (typeof field.required === 'object' && _.every(field.required, (value, k) => data[k] === value))
        ) {
          errors[key] = 'required';
          hasError = true;
        }
      }
    }
    this.setState({ errors });
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
  };

  remove = () => {
    this.setState({ showRemoveDialog: true });
  };

  render() {
    console.log('Editor.render', this);
    let {
      id,
      model,
      data,
      errors,
      serviceId,
      modelName
      } = this.state;
    let { views } = this.context;
    if (!data) {
      return <div className="loading">Loading...</div>;
    }
    let canSave = (id === '_new' && model.abilities.create) || (id !== '_new' && model.abilities.update && !model.noedit);
    let title = (model.label || model.name) + ' > ';
    if (id == '_new') {
      title += '新建';
    } else if (model.title) {
      title += data[model.title];
    } else {
      title += id;
    }
    let groups = {
      default: {
        name: '',
        fields: []
      }
    };

    for (let groupKey in model.groups) {
      let groupName = model.groups[groupKey];
      if (typeof groupName == 'object') {
        groupName = groupName.name;
      }
      groups[groupKey] = {
        name: groupName,
        fields: []
      };
    }
    for (let key in model.fields) {
      let cfg = model.fields[key];
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
        } else if (!_.every(cfg.depends, (value, k) => data[k] === value)) {
          //没有全部匹配
          continue;
        }
      }
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
        } else if (typeof cfg.disabled === 'string') {
          if (data[cfg.disabled]) {
            disabled = true;
          }
        } else if (_.every(cfg.disabled, (value, k) => data[k] === value)) {
          //全部匹配
          disabled = true;
        }
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
      let groupEl = <FieldGroup key={groupKey} name={group.name}>{group.fields}</FieldGroup>;
      let path = `wrappers.${serviceId}-${modelName}-group-${groupKey}`;
      let wrappers = _.get(views, path);
      if (wrappers) {
        groupEl = wrap(wrappers, groupEl, this, { key: path });
      }
      groupElements.push(groupEl);
    }

    let btnElements = [];
    let removeDialogElement = null;
    if (canSave) {
      btnElements.push(<Button
        bsStyle="primary"
        onClick={this.handleSave}
        key="save"
        disabled={this.loading}
      >保存</Button>);
    }
    if (!model.noremove && id !== '_new' && model.abilities.remove) {
      btnElements.push(<Button
        bsStyle="danger"
        onClick={this.remove}
        key="remove"
        disabled={this.loading}
      >删除</Button>);
      //确认删除
      removeDialogElement = (<Modal
        title="删除记录"
        actions={actions}
        modal={false}
        show={this.state.showRemoveDialog}
      >
        <Modal.Body>
          确定要删除吗? 删除后不可还原!
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.handleRemove}>删除</Button>
          <Button onClick={this.handleClose}>取消</Button>
        </Modal.Footer>
      </Modal>);
    }
    if (!model.nocreate && id !== '_new' && model.abilities.create) {
      btnElements.push(<Button
        onClick={this.handleCreate}
        bsStyle="link"
        key="create"
        disabled={this.loading}
      >新建</Button>);
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
        <div className="editor-action-buttons">{btnElements}</div>
        {removeDialogElement}
      </div>
    );
  }
}

export default connect(({ details, save, remove }) => ({ details, save, remove }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Editor);
