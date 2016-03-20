/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-03
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import Paper from 'material-ui/lib/paper';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import { Link } from 'react-router';
import wrap from '../utils/wrap';

export default class DataTable extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    model: React.PropTypes.object,
    data: React.PropTypes.array,
  };

  static contextTypes = {
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
    }
    this.setState(newState, () => {
      this.init(this.props, this.context);
    });
  }

  init(props, context) {
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
    this.setState({ columns, el: this._render() });
  }

  _render() {
    console.log('DataTable._render');
    let props = this.props;
    let views = this.context.views;
    let muiTheme = this.context.muiTheme;
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
    let primary1Color = muiTheme.baseTheme.palette.primary1Color;
    let accent1Color = muiTheme.baseTheme.palette.accent1Color;

    let headerRowElement = <TableRow>
      {
        columns.map(col => {
          return <TableHeaderColumn
            key={col.key}
            tooltip={col.field.tooltip}
          >{col.field.label}</TableHeaderColumn>
        })
      }
      <TableHeaderColumn></TableHeaderColumn>
    </TableRow>;

    let bodyElement = <TableBody>
      {data.map((record, index) => wrap(views.wrappers.dataTableRow, <TableRow key={index}>
        {columns.map(col => {
          let key = col.key;
          let CellViewClass = views[col.field.cell];
          if (!CellViewClass) {
            console.warn('Missing : ' + col.field.cell);
            return <TableRowColumn style={{background:'#fcc'}} key={key}>{record[key]}</TableRowColumn>;
          }
          return (<TableRowColumn key={key}>
            {React.createElement(CellViewClass, {
              value: record[key],
              model,
              key,
              field: col.field
            })}
          </TableRowColumn>);
        })}
        <TableRowColumn>
          <Link to={'/edit/'+service.id+'/'+model.name+'/'+record._id}>
            <FontIcon className="material-icons" color="#666" hoverColor={primary1Color}>create</FontIcon>
          </Link>
          <IconButton>
            <FontIcon className="material-icons" color="#666" hoverColor={accent1Color}>clear</FontIcon>
          </IconButton>
        </TableRowColumn>
      </TableRow>))}
    </TableBody>;

    let tabelElement = wrap(views.wrappers.dataTable,
      <Table multiSelectable={true}>
        {wrap(views.wrappers.dataTableHeader,
          <TableHeader>
            {wrap(views.wrappers.dataTableHeaderRow, headerRowElement)}
          </TableHeader>
        )}
        {wrap(views.wrappers.dataTableBody, bodyElement)}
      </Table>
    );

    let el = (
      <div style={styles.root}>
        <Paper zDepth={1} style={styles.root}>
          {wrap(views.wrappers.dataTable, tabelElement)}
        </Paper>
      </div>
    );
    return wrap(views.wrappers.list, el);
  }

  render() {
    return this.state.el || <div></div>;
  }
}
