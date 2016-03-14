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
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      settings: context.settings,
      open: false
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
      settings: this.context.settings,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.muiTheme) {
      newState.muiTheme = nextContext.muiTheme;
    }
    if (nextContext.views) {
      newState.views = nextContext.views;
    }
    if (nextProps.notice && nextProps.notice.rand != this.rand) {
      newState.open = true;
      this.rand = nextProps.notice.rand;
    }
    this.setState(newState);
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    let props = this.props;
    let state = this.state;
    let views = state.views;
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
              <Sidebar menu={props.settings.menu}/>
              <Content>{props.children}</Content>
            </div>
          )
        }
        {snack}
      </div>
    );
  }
}

export default connect(({ settings, notice }) => ({ settings, notice }))(Manage);
