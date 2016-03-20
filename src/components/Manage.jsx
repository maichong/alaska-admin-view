/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import Snackbar from 'material-ui/lib/snackbar';

import { connect } from 'react-redux';
import wrap from '../utils/wrap';

import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

export default class Manage extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      open: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let newState = {};
    if (nextProps.notice && nextProps.notice.rand != this.rand) {
      newState.open = true;
      this.rand = nextProps.notice.rand;
      this.setState(newState);
    }
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    console.log('Manage.render', this);
    let props = this.props;
    let state = this.state;
    let { views, settings } = this.context;
    let styles = {
      root: {},
      body: {
        marginTop: 56
      }
    };
    let snack = props.notice && state.open && props.notice.msg ? <Snackbar
      open={true}
      message={props.notice.msg}
      onRequestClose={this.handleRequestClose}
    /> : null;
    return wrap(views.wrappers.manage,
      <div id="manage" style={styles.root}>
        <Header/>
        {
          wrap(views.wrappers.body,
            <div id="body" style={styles.body}>
              <Sidebar menu={settings.menu}/>
              <Content>{props.children}</Content>
            </div>,
            this
          )
        }
        {snack}
      </div>,
      this
    );
  }
}

export default connect(({ settings, notice }) => ({ settings, notice }))(Manage);
