/**
 * @copyright Maichong Software Ltd. 2015 http://maichong.it
 * @date 2015-12-10
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { Router, Redirect, IndexRoute, Route, Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';

import ContextPure from 'material-ui/lib/mixins/context-pure';
import Context from './components/mixins/context';

import Paper from 'material-ui/lib/paper';
import Login from './components/login';

class Root extends React.Component {
  static mixins = [
    ContextPure,
    Context
  ];

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(props) {
  }

  componentDidMount() {
    let props = this.props;
    if (!props.access && !props.logined && !props.login.show) {
      props.actions.refreshInfo();
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
}))(Root);
