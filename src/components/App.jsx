/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import IntlMessageFormat from 'intl-messageformat';
import { Router, Route, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import qs from 'qs';

import Node from './Node';
import Login from './Login';
import Locked from './Locked';
import Manage from './Manage';
import Editor from './Editor';
import List from './List';

const ReactToastr = require('react-toastr');
const { ToastContainer } = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const createAppHistory = useRouterHistory(createHashHistory);
const history = createAppHistory({
  parseQueryString: qs.parse,
  stringifyQuery: qs.stringify
});

class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    views: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    actions: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
    t: React.PropTypes.func,
    toast: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props);
    this.state = {};
    this._messageCache = {};
  }

  getChildContext() {
    return {
      views: this.props.views,
      actions: this.props.actions,
      settings: this.props.settings,
      t: this.t,
      toast: this.toast
    };
  }

  componentDidMount() {
    let props = this.props;
    if (!props.access && !props.signed && !props.login.show) {
      props.actions.refreshInfo();
    }
  }

  toast = (method, title, body, options) => {
    if (typeof body === 'object') {
      options = body;
      body = '';
    }
    options = options || {};
    if (options.closeButton !== false) {
      options.closeButton = true;
    }
    if (!options.showAnimation) {
      options.showAnimation = 'fadeIn';
    }
    if (!options.hideAnimation) {
      options.hideAnimation = 'fadeOut';
    }
    if (!options.timeOut) {
      options.timeOut = 10000;
    }
    this.refs.container[method](title, body, options);
  };

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
      el = <Router history={history}>
        <Route component={Manage} path="/">
          <Route component={List} path="list/:service/:model"/>
          <Route component={Editor} path="edit/:service/:model/:id"/>
          {
            (views.routes || []).map((item, index) => {
              return <Route key={index} component={item.component} path={item.path}/>
            })
          }
        </Route>
      </Router>
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

    return ( <Node id="app">
      {el}
      <ToastContainer
        ref="container"
        toastMessageFactory={ToastMessageFactory}
        className="toast-top-right"/>
    </Node>);
  }
}

export default connect(({ login, access, signed, settings }) => ({
  login,
  access,
  signed,
  settings
}), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(App);
