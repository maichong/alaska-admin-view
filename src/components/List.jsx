/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-04
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import RaisedButton from 'material-ui/lib/raised-button';

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

  componentDidMount() {
    this.init(this.props, this.context);
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
        newState.data = list.results;
      }
    }
    this.setState(newState, () => {
      this.init(this.props, this.context);
    });
  }

  render() {
    console.log('List.render', this);
    let props = this.props;
    let {
      title,
      service,
      model,
      data,
      muiTheme,
      views,
      settings
      } = this.state;
    if (!model) {
      return <div className="loading">Loading...</div>;
    }
    let styles = {
      root: {},
      titleBar: {
        position: 'relative',
        height: 36,
        marginBottom: 20
      },
      title: {
        overflow: 'hidden',
        fontSize: 36,
        height: 36,
        color: muiTheme.baseTheme.palette.primary1Color
      },
      titleNote: {
        color: '#999'
      },
      titleBtns: {
        position: 'absolute',
        right: 0,
        top: 0
      }
    };
    let titleBtns = [];
    if (!model.nocreate && model.abilities.create) {
      //判断create权限,显示新建按钮
      titleBtns.push(<RaisedButton key="create" linkButton={true} href={'#/edit/'+service.id+'/'+model.name+'/_new'}
                                   label="新建" secondary={true}/>);
    }

    return wrap(views.wrappers.list,
      <div style={styles.root}>
        <div style={styles.titleBar}>
          <div style={styles.title}>{title} <span style={styles.titleNote}>{props.list.total}条记录</span></div>
          <div style={styles.titleBtns}>
            {titleBtns}
          </div>
        </div>

        <DataTable model={model} data={data}/>
      </div>,
      this
    );
  }

  init(props, context) {
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
