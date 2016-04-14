/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-03
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import { Link } from 'react-router';
import { Table } from 'react-bootstrap';
import { shallowEqual } from 'alaska-admin-view';
import wrap from '../utils/wrap';

export default class DataTable extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    model: React.PropTypes.object,
    data: React.PropTypes.array,
  };

  static contextTypes = {
    router: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
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
    if (!model) {
      return;
    }

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
    let props = this.props;
    let views = this.context.views;
    let t = this.context.t;
    let router = this.context.router;
    let {
      columns,
      data
      } = this.state;
    let model = props.model;
    let service = model.service;
    let styles = {
      root: {}
    };
    if (!model || !columns) {
      return <div className="loading">Loading...</div>;
    }

    let headerRowElement = (<tr>
      {
        columns.map(col => {
          return <th
            key={col.key}
            tooltip={col.field.tooltip}
          >{t(col.field.label, service.id)}</th>
        })
      }
      <th></th>
    </tr>);

    let bodyElement = (<tbody>
    {data.map((record, index) => {
      let url = '/edit/' + service.id + '/' + model.name + '/' + record._id;
      return wrap(views.wrappers.dataTableRow,
        <tr key={index} onDoubleClick={() => {router.push(url);console.log(url);}}>
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
          <td>
            <Link to={url}>
              <i className="fa fa-edit"/>
            </Link>
          </td>
        </tr>,
        this);
    })}
    </tbody>);

    return wrap(views.wrappers.dataTable,
      <Table striped bordered hover>
        {wrap(views.wrappers.dataTableHeader,
          <thead>
          {wrap(views.wrappers.dataTableHeaderRow, headerRowElement, this)}
          </thead>,
          this
        )}
        {wrap(views.wrappers.dataTableBody, bodyElement, this)}
      </Table>,
      this
    );
  }
}
