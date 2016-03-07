/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-03
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import Paper from 'material-ui/lib/paper';

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
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);

    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      settings: context.settings,
      serviceId: props.params.service,
      modelName: props.params.model,
      id: props.params.id,
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
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this._init();
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
      this._init();
    });
  }

  componentWillUnmount() {
  }

  _init() {
    console.log('init', this);
    let props = this.props;
    let state = this.state;
    if (!state.model) {
      return;
    }
    let key = state.model.key;
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

  _handleChange(key, event) {
    this.setState({
      data: _.assign({}, this.state.data, {
        [key]: event.target.value
      })
    });
  }

  render() {
    let props = this.props;
    let {
      id,
      model,
      data,
      muiTheme,
      views
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
      }
    };
    let title = (model.label || model.name) + ' > ';
    if (model.title) {
      title += data[model.title];
    } else {
      title += data._id;
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
      let ViewClass = views[cfg.view];
      if (!ViewClass) {
        console.warn('Missing : ' + cfg.view);
        ViewClass = views.TextFieldView;
      }
      let view = React.createElement(ViewClass, {
        key,
        value: data[key],
        model,
        data,
        field: cfg,
        onChange: this._handleChange.bind(this, key)
      });
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
    return (
      <div style={styles.root}>
        <div style={styles.titleBar}>
          <div style={styles.title}>{title}</div>
          <div style={styles.titleId}>ID : {id}</div>
        </div>
        {groupElements}
      </div>
    );
  }
}

export default connect(({ details }) => ({ details }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Editor);
