/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-25
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import _ from 'lodash';
import DataTable from './DataTable';
import { PREFIX } from '../constants';
import { stringify } from 'qs';
import api from '../utils/api';

export default class Relationship extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    settings: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      model: null
    };
    console.log('Relationship', props);
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(props) {
    if (props.service != this.props.service || props.model != this.props.model || props.from != this.props.from) {
      setTimeout(()=> {
        this.init();
      }, 50);
    }
  }

  shouldComponentUpdate(props, state) {
    return state.data != this.state.data || state.model != this.state.model;
  }

  init() {
    let serviceId = this.props.service;
    let modelName = this.props.model;
    let model = this.context.settings.services[serviceId].models[modelName];
    if (!model || (model == this.state.model && this.state.data.length)) {
      return;
    }
    let args = {
      service: serviceId,
      model: modelName
    };
    args.filters = _.assign({}, this.props.filters, {
      [this.props.path]: this.props.from
    });
    api.post(PREFIX + '/api/list?' + stringify(args)).then(res => {
      if (res.results) {
        this.setState({
          data: res.results
        });
      }
    });
    this.setState({ model });
  }

  render() {
    let {model,data} = this.state;
    if (!model || !data.length) {
      return <div></div>;
    }
    let title = this.props.title || `关联: ${model.label}`;
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
