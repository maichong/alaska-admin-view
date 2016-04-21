/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import IntlMessageFormat from 'intl-messageformat';
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

  static childContextTypes = {
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
    t: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props);
    this.state = {};
    this._messageCache = {};
  }

  getChildContext() {
    return {
      views: this.props.views,
      settings: this.props.settings,
      t: this.t
    };
  }

  componentDidMount() {
    let props = this.props;
    if (!props.access && !props.signed && !props.login.show) {
      props.actions.refreshInfo();
    }
  }

  t = (message, serviceId, values, formats) => {
    if (typeof serviceId === 'object') {
      formats = values;
      values = serviceId;
      serviceId = 'alaska-admin';
    }
    if (!serviceId) {
      serviceId = 'alaska-admin';
    }
    let all = this.props.settings.locales.all;
    let locales = this.props.settings.locales[serviceId];
    let locale = this.props.settings.locale;
    if (!locales || !locales[locale]) {
      //没有找到特定模块的特定翻译

      locales = all;
      if (!locales || !locales[locale]) {
        //没有找到所有模块翻译
        return message;
      }
    }

    let messages = locales[locale];
    let messageTemp = messages[message];
    if (!messageTemp) {
      if (all[locale]) {
        messages = all[locale];
        messageTemp = messages[message];
      }
      if (!messageTemp) {
        //没有找到所有模块翻译
        return message;
      }
    }
    if (!values) {
      return messageTemp;
    }

    if (!this._messageCache[locale]) {
      this._messageCache[locale] = {};
    }

    if (!this._messageCache[locale][message]) {
      this._messageCache[locale][message] = new IntlMessageFormat(messageTemp, locale, formats);
    }
    return this._messageCache[locale][message].format(values);
  };

  render() {
    let props = this.props;
    let state = this.state;
    let views = props.views;
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
                {
                  (views.routes || []).map((item, index) => {
                    return <Route key={index} component={item.component} path={item.path}></Route>
                  })
                }
              </Route>,
              this
            )
          }
        </Router>,
        this
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

    return wrap(views.wrappers.app, el, this);
  }
}

export default connect(({ login, access, signed, settings }) => ({ login, access, signed, settings }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(App);
