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

import Login from './login';

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
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.props.views,
    };
  }

  componentDidMount() {
    let props = this.props;
    if (!props.access && !props.logined && !props.login.show) {
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
    if (props.access) {
      return <Router history={hashHistory}>
        <Route component={RaisedButton} path="/login"/>
      </Router>;
    } else {
      if (props.logined) {
        //已登录,但无权限
        return <div>无权限</div>;
      }

      //未登录
      if (props.login.show) {
        return <Login />;
      }
      return <div className="boot-loading">Loading...</div>;
    }
  }
}

export default connect(({ login, access, logined }) => ({ login, access, logined }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(App);
