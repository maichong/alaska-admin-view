/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';

import { Router, Redirect, IndexRoute, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import wrap from '../utils/wrap';

import Login from './Login';
import Locked from './Locked';
import Manage from './Manage';
import Editor from './Editor';
import List from './List';

class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    views: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
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
    let muiTheme = props.muiTheme || context.muiTheme || getMuiTheme();
    this.state = {
      muiTheme: muiTheme,
      views: props.views
    };
    if (!muiTheme.fieldNote) {
      muiTheme.fieldNote = {
        fontSize: 12,
        color: '#999'
      };
      muiTheme.fieldNoteInline = {
        display: 'inline-block',
        paddingLeft: 10,
        fontSize: 12,
        color: '#999'
      };
    }
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.props.views,
      settings: this.props.settings,
    };
  }

  componentDidMount() {
    let props = this.props;
    if (!props.access && !props.signed && !props.login.show) {
      props.actions.refreshInfo();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.muiTheme) {
      newState.muiTheme = nextContext.muiTheme;
      this.setState(newState);
    }
  }

  render() {
    let props = this.props;
    let state = this.state;
    let views = state.views;
    let el;

    //有权限
    if (props.access) {
      el = wrap(views.wrappers.router,
        <Router history={hashHistory}>
          {
            wrap(views.wrappers.routes,
              <Route component={Manage} path="/">
                <Route component={List} path="list/:service/:model"></Route>
                <Route component={Editor} path="edit/:service/:model/:id"></Route>
                {state.routes}
              </Route>
            )
          }
        </Router>
      );
    }

    //已登录,但无权限
    else if (props.signed) {
      el = <Locked/>;
    }

    //未登录
    else if (props.login.show) {
      el = <Login />;
    } else {
      el = <div className="boot-loading">Loading...</div>;
    }

    return wrap(views.wrappers.app, el);
  }
}

export default connect(({ login, access, signed, settings }) => ({ login, access, signed, settings }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(App);
