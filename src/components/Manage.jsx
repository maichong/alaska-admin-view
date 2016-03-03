/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';

import { connect } from 'react-redux';
import wrap from '../utils/wrap';

import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

export default class Manage extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    settings: React.PropTypes.object,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.muiTheme) {
      newState.muiTheme = nextContext.muiTheme;
    }
    if (nextContext.views) {
      newState.views = nextContext.views;
    }
    this.setState(newState);
  }

  componentWillUnmount() {
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
      </div>
    );
  }
}

export default connect(({ settings }) => ({ settings }))(Manage);
