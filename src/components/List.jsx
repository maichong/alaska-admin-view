/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-04
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import wrap from '../utils/wrap';

import DataTable from './DataTable';
import SearchField from './SearchField';

class List extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
    t: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props);
    this.state = {
      data: null,
      search: '',
      filters: {},
      page: 0,
      list: {},
      sort: ''
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
    if (nextProps.params.model !== this.props.params.model) {
      this.init(nextProps);
    }
    if (nextProps.lists && nextProps.lists !== this.props.lists) {
      let lists = nextProps.lists;
      let model = this.state.model;
      if (lists[model.key]) {
        newState.list = lists[model.key];
        newState.data = lists[model.key].results;
      }
      this.setState(newState, () => {
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
    let sort = this.state.sort;
    if (this.state.model && this.state.model.name != model.name) {
      //更新了model
      data = null;
    }
    sort = model.defaultSort.split(' ')[0];
    this.setState({ service, model, title, data: data || [], search: '', sort }, ()=> {
      if (!data) {
        this.refresh();
      }
    });
  }

  handleSearch = (search) => {
    this.setState({ search, data: [] }, () => this.refresh());
  };

  refresh() {
    this.setState({ page: 0 }, () => this.loadMore());
  }

  loadMore() {
    this._loading = true;
    let props = this.props;
    let state = this.state;
    let service = props.params.service;
    let model = props.params.model;
    let page = (state.page || 0) + 1;
    let filters = state.filters;
    let search = state.search;
    let sort = state.sort;
    props.actions.list({ service, model, page, filters, search, key: state.model.key, sort });
    this.setState({ page });
  }

  handleScroll = ()=> {
    let body = document.body;
    if (body.scrollTop + document.documentElement.clientHeight >= body.scrollHeight) {
      if (!this.state.list.next || this._loading) {
        return;
      }
      this.loadMore();
    }
  };

  handleSort = (sort) => {
    this.setState({ sort, data: null }, () => this.refresh());
  };

  render() {
    let props = this.props;
    let {
      search,
      title,
      service,
      model,
      data,
      list,
      sort
      } = this.state;
    if (!model) {
      return <div className="loading">Loading...</div>;
    }
    let views = this.context.views;
    let t = this.context.t;
    let titleBtns = [];
    if (!model.nocreate && model.abilities.create) {
      //判断create权限,显示新建按钮
      let href = '#/edit/' + service.id + '/' + model.name + '/_new';
      titleBtns.push(<button
        className="btn btn-success"
        key="create"
        href={href}
      >{t('Create')}</button>);
    }

    let searchInput = model.searchFields.length ?
      <SearchField placeholder={t('Search')} onChange={this.handleSearch} value={search}/> : null;

    return wrap(views.wrappers.list,
      <div className="list-content">
        <div className="content-header">
          <h4>{t(title, service.id)} <i>{t('total records', { total: list.total })}</i></h4>
          <div className="content-header-buttons">
            {titleBtns}
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body">
            <DataTable model={model} data={data} sort={sort} onSort={this.handleSort}/>
          </div>
        </div>
        <nav className="navbar navbar-fixed-bottom bottom-bar">
          <div className="container-fluid">
            <div className="navbar-form navbar-right">
              <div className="form-group">
                {searchInput}
              </div>
            </div>
          </div>
        </nav>
      </div>,
      this
    );
  }
}

export default connect(({ lists }) => ({ lists }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(List);
