/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-04
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';
import wrap from '../utils/wrap';

import {Button, Panel} from 'react-bootstrap';

import DataTable from './DataTable';

class List extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    this.state = {
      data: null,
      filters: {},
      page: 0,
      list: {}
    };

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    this.init(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextProps.lists && nextProps.lists !== this.props.list) {
      let lists = nextProps.lists;
      let model = this.state.model;
      if (lists[model.key]) {
        newState.list = lists[model.key];
        newState.data = lists[model.key].results;
      }
      this.setState(newState, () => {
        this.init(this.props);
      });
      this._loading = false;
    }
  }

  init(props) {
    let settings = this.context.settings;
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
    this.setState({ service, model, title, data: data || [] }, ()=> {
      if (!data) {
        this.refresh();
      }
    });
  }

  refresh() {
    this.setState({ page: 0 }, ()=>this.loadMore());
  }

  loadMore() {
    this._loading = true;
    let props = this.props;
    let state = this.state;
    let service = props.params.service;
    let model = props.params.model;
    let page = (state.page || 0) + 1;
    let filters = state.filters;
    props.actions.list({ service, model, page, filters, key: state.model.key });
    this.setState({ page });
  }

  handleScroll = ()=> {
    let body = document.body;
    if (body.scrollTop + document.documentElement.clientHeight >= body.scrollHeight) {
      if (!this.props.list.next || this._loading) {
        return;
      }
      this.loadMore();
    }
  };

  render() {
    let props = this.props;
    let {
      title,
      service,
      model,
      data,
      list
      } = this.state;
    if (!model) {
      return <div className="loading">Loading...</div>;
    }
    let views = this.context.views;
    let titleBtns = [];
    if (!model.nocreate && model.abilities.create) {
      //判断create权限,显示新建按钮
      let href = '#/edit/' + service.id + '/' + model.name + '/_new';
      titleBtns.push(<Button
        bsStyle="success"
        key="create"
        href={href}
      >新建</Button>);
    }

    return wrap(views.wrappers.list,
      <div className="list-content">
        <div className="content-header">
          <h4>{title} <i>{list.total}条记录</i></h4>
          <div className="content-header-buttons">
            {titleBtns}
          </div>
        </div>
        <Panel>
          <DataTable model={model} data={data}/>
        </Panel>
      </div>,
      this
    );
  }
}

export default connect(({ lists }) => ({ lists }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(List);
