/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-03
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import { Link } from 'react-router';
import shallowEqual from '../utils/shallow-equal';
import Node from './Node';

export default class DataTable extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    model: React.PropTypes.object,
    data: React.PropTypes.array,
    sort: React.PropTypes.string,
    onSort: React.PropTypes.func
  };

  static contextTypes = {
    router: React.PropTypes.object,
    settings: React.PropTypes.object,
    views: React.PropTypes.object,
    t: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props);
    this.state = {
      data: props.data || []
    };
  }

  componentDidMount() {
    this.init(this.props, this.context);
  }

  componentWillReceiveProps(nextProps) {
    let newState = {};
    if (nextProps.data) {
      newState.data = nextProps.data;
      this.setState(newState, () => {
        if (nextProps.model) {
          this.init(this.props);
        }
      });
    }
  }

  init(props) {
    let model = props.model || this.props.model;
    if (!model) return;

    let columns = [];
    model.defaultColumns.forEach(key => {
      model.fields[key] && columns.push({
        key,
        field: model.fields[key]
      });
    });
    this.setState({ columns });
  }

  shouldComponentUpdate(props, state) {
    if (!state.data || !state.columns) {
      return false;
    }
    return !shallowEqual(state, this.state);
  }

  render() {
    const props = this.props;
    const views = this.context.views;
    const t = this.context.t;
    const router = this.context.router;
    const {
      columns,
      data
      } = this.state;
    const model = props.model;
    const sort = props.sort;
    const onSort = props.onSort;
    const service = model.service;
    if (!model || !columns) {
      return <div className="loading">Loading...</div>;
    }

    let headerRowElement = (<tr>
      {
        columns.map(col => {
          let sortIcon = null;
          let handleClick;
          if (!col.nosort && onSort) {
            if (col.key === sort) {
              sortIcon = <i className="fa fa-sort-asc"></i>;
              handleClick = () => onSort('-' + col.key);
            } else if ('-' + col.key === sort) {
              sortIcon = <i className="fa fa-sort-desc"></i>;
              handleClick = () => onSort(col.key);
            } else {
              handleClick = () => onSort('-' + col.key);
            }
          }
          return <th
            key={col.field.path}
            tooltip={col.field.tooltip}
            onClick={handleClick}
          >{t(col.field.label, service.id)}{sortIcon}</th>;
        })
      }
      <th></th>
    </tr>);

    let bodyElement = (<tbody>
    {data.map((record, index) => {
      let url = '/edit/' + service.id + '/' + model.name + '/' + record._id;
      return <tr key={index} onDoubleClick={() => {router.push(url);console.log(url);}}>
        {columns.map(col => {
          let key = col.key;
          let CellViewClass = views[col.field.cell];
          if (!CellViewClass) {
            console.warn('Missing : ' + col.field.cell);
            return <td style={{background:'#fcc'}} key={key}>{record[key]}</td>;
          }
          return (<td key={key}>
            {React.createElement(CellViewClass, {
              value: record[key],
              model,
              key,
              field: col.field
            })}
          </td>);
        })}
        <td key="_a">
          <Link to={url}>
            <i className="fa fa-edit"/>
          </Link>
        </td>
      </tr>
    })}
    </tbody>);

    return (
      <table className="data-table table table-striped table-bordered table-hover">
        <thead>
        {headerRowElement}
        </thead>
        {bodyElement}
      </table>
    );
  }
}
