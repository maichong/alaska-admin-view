/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-04
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import wrap from '../utils/wrap';

import DataTable from './DataTable';

class List extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
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
      data: null
    };
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
    this._init(this.props, this.context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.muiTheme) {
      newState.muiTheme = nextContext.muiTheme;
    }
    if (nextContext.views) {
      newState.views = nextContext.views;
    }
    if (nextProps.list) {
      let list = nextProps.list;
      if (list.service == this.props.params.service && list.model == this.props.params.model) {
        console.log(list);
        newState.data = list.results;
      }
    }
    this.setState(newState, () => {
      this._init(this.props, this.context);
    });
  }

  componentWillUnmount() {
  }

  render() {
    let props = this.props;
    let state = this.state;
    let title = state.title;
    let muiTheme = state.muiTheme;
    let styles = {
      root: {},
      title: {
        fontSize: 32,
        color: muiTheme.baseTheme.palette.primary1Color,
        marginBottom: 20
      }
    };
    return wrap(state.views.wrappers.list,
      <div style={styles.root}>
        <div style={styles.title}>{title}</div>
        <DataTable model={state.model} data={state.data}/>
      </div>
    );
  }

  _init(props, context) {
    let settings = context.settings;
    let serviceId = props.params.service;
    let modelName = props.params.model;
    if (!serviceId || !modelName || !settings || !settings.services) {
      return;
    }
    let service = settings.services[serviceId];
    if (!service) {
      return;
    }
    let model = service.models[modelName];
    if (!model) {
      return;
    }
    let title = props.title || this.props.title || model.label;
    let data = this.state.data;
    if (this.state.model && this.state.model.name != model.name) {
      data = null;
    }
    if (!data) {
      this.refresh();
    }
    this.setState({ service, model, title, data: data || [] });
  }

  refresh() {
    let props = this.props;
    let service = props.params.service;
    let model = props.params.model;
    let page = this.state.page;
    let filters = this.state.filters;
    let perPage = this.state.perPage;
    props.actions.list({ service, model, page, filters, perPage });
  }
}

export default connect(({ list }) => ({ list }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(List);
