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

import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import _forEach from 'lodash/forEach';
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _without from 'lodash/without';
import _size from 'lodash/size';

class List extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
    t: React.PropTypes.func,
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    let query = props.location.query || {};
    this.state = {
      data: null,
      search: query.search || '',
      filters: query.filters || {},
      page: 0,
      list: {},
      sort: query.sort || '',
      filterItems: [],
      filterViews: [],
      filterViewsMap: {},
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
    if (!serviceId || !modelName || !settings || !settings.services) return;
    let service = settings.services[serviceId];
    if (!service) return;
    let model = service.models[modelName];
    if (!model) return;
    const t = this.context.t;
    let title = props.title || this.props.title || model.label;
    let data = this.state.data;
    let sort = this.state.sort;
    let search = this.state.search;
    let filters = this.state.filters;
    let filterViews = this.state.filterViews;
    let filterViewsMap = this.state.filterViewsMap;
    let filterItems = [];
    if (this.state.model && this.state.model.name !== model.name) {
      //更新了model
      data = null;
      filters = {};
      filterViews = [];
      filterViewsMap = {};
      sort = '';
      search = '';
    }
    _forEach(model.fields, field => {
      if (!field._label) {
        field._label = field.label;
        field.label = t(field.label, serviceId);
      }
      if (!field.filter) return;
      filterItems.push(<MenuItem key={field.path} eventKey={field.path}>{field.label}</MenuItem>);
    });
    if (!sort) {
      sort = model.defaultSort.split(' ')[0];
    }
    this.setState({
      service,
      model,
      title,
      data: data || [],
      search,
      sort,
      filterItems,
      filters,
      filterViews,
      filterViewsMap
    }, () => {
      _forEach(filters, (value, key)=> {
        if (!filterViewsMap[key]) {
          this.handleFilter(key);
        }
      });
      if (!data) {
        this.refresh();
      }
    });
  }

  handleSearch = (search) => {
    this.setState({ search, data: [] }, () => {
      this.refresh();
      this.updateQuery();
    });
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

  handleScroll = () => {
    let body = document.body;
    if (body.scrollTop + document.documentElement.clientHeight >= body.scrollHeight) {
      if (!this.state.list.next || this._loading) return;
      this.loadMore();
    }
  };

  handleSort = (sort) => {
    this.setState({ sort, data: null }, () => {
      this.refresh();
      this.updateQuery();
    });
  };

  handleFilter = (eventKey) => {
    const { filters, filterViews, filterViewsMap, model } = this.state;
    if (filterViewsMap[eventKey]) return;
    const field = model.fields[eventKey];
    const views = this.context.views;
    let FilterView = views[field.filter];
    let view;
    const onChange = filter => {
      let filters = _assign({}, this.state.filters, { [field.path]: filter });
      this.setState({ filters, data: null, page: 0 }, () => {
        this.loadMore();
        this.updateQuery();
      });
    };
    const onClose = () => {
      let filters = _omit(this.state.filters, field.path);
      let filterViews = _without(this.state.filterViews, view);
      let filterViewsMap = _omit(this.state.filterViewsMap, field.path);
      this.setState({ filters, filterViews, filterViewsMap, data: null, page: 0 }, () => {
        this.loadMore();
        this.updateQuery();
      });
    };
    view = filterViewsMap[eventKey] =
      <FilterView key={field.path} field={field} onChange={onChange} onClose={onClose} value={filters[eventKey]}/>;
    filterViews.push(view);
    this.setState({ filterViews, filterViewsMap });
  };

  updateQuery() {
    let query = { t: Date.now() };
    const { filters, sort, search } = this.state;
    if (search) {
      query.search = search;
    }
    if (sort) {
      query.sort = sort;
    }
    if (_size(filters)) {
      query.filters = filters;
    }
    let pathname = this.props.location.pathname;
    let state = this.props.location.state;
    this.context.router.replace({ pathname, query, state });
  }

  render() {
    let props = this.props;
    let {
      search,
      title,
      service,
      model,
      data,
      list,
      sort,
      filterItems,
      filterViews
      } = this.state;
    if (!model) {
      return <div className="loading">Loading...</div>;
    }
    let views = this.context.views;
    let t = this.context.t;
    let titleBtns = [];

    if (filterItems.length) {
      titleBtns.push(<DropdownButton title={t('Filter')} onSelect={this.handleFilter}>{filterItems}</DropdownButton>);
    }

    if (!model.nocreate && model.abilities.create) {
      //判断create权限,显示新建按钮
      let href = '#/edit/' + service.id + '/' + model.name + '/_new';
      titleBtns.push(<a
        className="btn btn-success"
        key="create"
        href={href}
      >{t('Create')}</a>);
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
        <div>{filterViews}</div>
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
