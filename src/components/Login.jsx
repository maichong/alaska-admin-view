/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as _ from 'lodash';

import wrap from '../utils/wrap';
import plugin from '../utils/plugin';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


export default class Login extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
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
      username: '',
      password: ''
    };

    this._handleLogin = this._handleLogin.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
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
    if (nextProps.login && nextProps.login.errorMsg) {
      newState.errorMsg = nextProps.login.errorMsg;
    }
    this.setState(newState);
  }

  render() {
    let props = this.props;
    let state = this.state;
    let views = this.state.views;
    let styles = {
      root: {
        width: 600,
        margin: '80px auto 0',
        padding: 50
      },
      logo: {
        display: 'block',
        width: 200,
        margin: '0 auto 20px'
      },
      form: {
        display: 'block',
        width: 256,
        margin: '10px auto 0'
      },
      button: {
        marginTop: 20
      },
      error: {
        color: state.muiTheme.textField.errorColor,
        fontSize: 14
      }
    };
    let err;
    if (state.errorMsg) {
      err = wrap(views.wrappers.loginError, <p style={styles.error}>{state.errorMsg}</p>);
    }

    let el = (
      <Paper zDepth={2} style={styles.root}>
        { wrap(views.wrappers.loginLogo, <img src="/assets/logo.jpg" style={styles.logo}/>)}
        { wrap(views.wrappers.loginForm, <form style={styles.form}>
          { wrap(views.wrappers.loginField, <div>
            <TextField
              floatingLabelText="用户名"
              errorText={state.nameError}
              ref="name"
            />
            <TextField
              floatingLabelText="密码"
              type="password"
              errorText={state.passError}
              ref="pass"
              onEnterKeyDown={this._handleLogin}
            />
          </div>)}

          { wrap(views.wrappers.loginButton, <RaisedButton
            label="登录"
            fullWidth={true}
            secondary={true}
            style={styles.button}
            onTouchTap={this._handleLogin}
          />)}
          { err }
        </form>)}
      </Paper>
    );

    return wrap(views.wrappers.login, el);
  }

  _handleLogin() {
    let username = this.refs.name.getValue();
    let password = this.refs.pass.getValue();
    let errorMsg = '';
    if (!username) {
      errorMsg = '请输入用户名';
    } else if (!password) {
      errorMsg = '请输入密码';
    }
    this.setState({ errorMsg });
    !errorMsg && this.props.actions.login({ username, password });
  }
}

export default connect(({ login }) => ({ login }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Login);
