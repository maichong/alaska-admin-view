/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-25
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import DataTable from './DataTable';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Relationship extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object,
    filters: React.PropTypes.object,
    lists: React.PropTypes.object,
    service: React.PropTypes.string,
    model: React.PropTypes.string,
    path: React.PropTypes.string,
    from: React.PropTypes.string,
    title: React.PropTypes.string,
  };

  static contextTypes = {
    settings: React.PropTypes.object,
    t: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      model: null
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(props) {
    let model = this.state.model;
    if (props.from !== this.props.from) {
      this.setState({
        data: null
      }, () => {
        this.init();
      });
    }
    if (props.lists && props.lists[model.key] !== this.props.lists[model.key]) {
      let list = props.lists[model.key];
      this.setState({
        data: list ? list.results : null
      }, () => {
        this.init();
      });
    }
  }

  shouldComponentUpdate(props, state) {
    return state.data != this.state.data || state.model != this.state.model;
  }

  init() {
    let serviceId = this.props.service;
    let modelName = this.props.model;
    let model = this.context.settings.services[serviceId].models[modelName];
    if (!model) return;
    let list = this.props.lists[model.key];
    if (list && model === this.state.model && this.state.data) return;
    let args = {
      service: serviceId,
      model: modelName,
      key: model.key
    };
    args.filters = Object.assign({}, this.props.filters, {
      [this.props.path]: this.props.from
    });
    this.setState({ model }, () => {
      if (!this.state.data) {
        this.props.actions.list(args);
      }
    });
  }

  render() {
    let { model, data } = this.state;
    if (!model || !data) {
      return <div></div>;
    }
    const t = this.context.t;
    let title = this.props.title ? t(this.props.title, model.service.id) : t('Relationship') + `: ${t(model.label, model.service.id)}`;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
        </div>
        <DataTable model={model} data={data}/>
      </div>
    );
  }
}

export default connect(({ lists }) => ({ lists }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Relationship);
