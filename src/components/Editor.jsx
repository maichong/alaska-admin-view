/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-03
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

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
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
    details: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);

    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      settings: context.settings,
      serviceId: props.params.service,
      modelName: props.params.model,
      id: props.params.id,
      removeDialogOpen: false
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

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
      settings: this.context.settings,
      details: this.props.details,
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
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

      let service = this.state.settings.services[newState.serviceId];
      if (service) {
        newState.service = service;
        let model = service.models[newState.modelName];
        if (model) {
          newState.model = model;
        }
      }
    }
    this.setState(newState, () => {
      this.init();
    });
  }

  init() {
    console.log('init', this);
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

  handleClose() {
    console.log('handleClose');
    this.setState({ removeDialogOpen: false });
  }

  handleRemove() {
    this.setState({ removeDialogOpen: false });
    //TODO remove
  }

  save() {
    let {
      data,
      model
      } = this.state;
    console.log(data);
  }

  remove() {
    console.log('remove', this.state.id);
    this.setState({ removeDialogOpen: true });
  }

  render() {
    let props = this.props;
    let {
      id,
      model,
      data,
      muiTheme,
      views,
      settings
      } = this.state;
    console.log('model', model);
    console.log('data', data);
    if (!data) {
      return <div className="loading">Loading...</div>;
    }
    let styles = {
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
    let title = (model.label || model.name) + ' > ';
    if (id == '_new') {
      title += '新建';
    } else if (model.title) {
      title += data[model.title];
    } else {
      title += id;
    }
    let groups = {
      _: {
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
      if (key == '_id') {
        continue;
      }
      let cfg = model.fields[key];
      if (cfg.hidden) {
        continue;
      }
      if (cfg.depends) {
        if (typeof cfg.depends === 'string') {
          if (!data[key]) {
            continue;
          }
        } else if (_.find(cfg.depends, (value, k) => data[k] === value) === undefined) {
          continue;
        }
      }
      let ViewClass = views[cfg.view];
      if (!ViewClass) {
        console.warn('Missing : ' + cfg.view);
        ViewClass = views.TextFieldView;
      }

      let fieldProps = {
        key,
        value: data[key],
        model,
        data,
        field: cfg,
        onChange: this.handleChange.bind(this, key)
      };

      let view = React.createElement(ViewClass, fieldProps);
      let group = groups._;
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
      let groupNameElement = group.name ? <div style={styles.groupName}>{group.name}</div> : null;
      groupElements.push(
        <div key={groupKey}>{groupNameElement}<Paper zDepth={1} style={styles.group}>{group.fields}</Paper></div>
      );
    }

    let btnElements = [];
    let removeDialogElement = null;
    if ((id === '_new' && model.abilities.create) || (id !== '_new' && model.abilities.update)) {
      btnElements.push(<RaisedButton
        onMouseDown={this.save}
        key="save"
        secondary={true}
        label="保存"
        style={styles.button}
      />);
    }
    if (!model.noremove && id !== '_new' && model.abilities.remove) {
      btnElements.push(<RaisedButton
        onMouseDown={this.remove}
        key="remove"
        primary={true}
        label="删除"
        style={styles.button}
      />);
      //确认删除
      const actions = [
        <FlatButton
          label="取消"
          secondary={true}
          onTouchTap={this.handleClose}
        />,
        <FlatButton
          label="删除"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleRemove}
        />,
      ];
      removeDialogElement = (<Dialog
        title="删除记录"
        actions={actions}
        modal={false}
        open={this.state.removeDialogOpen}
      >
        确定要删除吗? 删除后不可还原!
      </Dialog>);
    }
    return (
      <div style={styles.root}>
        <div style={styles.titleBar}>
          <div style={styles.title}>{title}</div>
          {
            id === '_new' ? null : <div style={styles.titleId}>ID : {id}</div>
          }
        </div>
        {groupElements}
        {btnElements}
        {removeDialogElement}
      </div>
    );
  }
}

export default connect(({ details }) => ({ details }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Editor);
