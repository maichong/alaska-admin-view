/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import wrap from '../utils/wrap';

export default class Login extends React.Component {
  static propTypes = {
    login: React.PropTypes.object
  };

  static contextTypes = {
    settings: React.PropTypes.object,
    views: React.PropTypes.object,
    t: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    let newState = {};
    if (nextProps.login && nextProps.login.errorMsg) {
      newState.errorMsg = nextProps.login.errorMsg;
    }
    this.setState(newState);
  }

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = () => {
    let { username, password } = this.state;
    let state = {
      errorMsg: '',
      usernameError: '',
      passwordError: ''
    };
    if (!username) {
      state.usernameError = ' has-error';
    }
    if (!password) {
      state.passwordError = ' has-error';
    }
    this.setState(state);
    if (username && password) {
      this.props.actions.login({ username, password });
    }
  };

  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.handleLogin();
    }
  };

  render() {
    let state = this.state;
    let views = this.context.views;
    let t = this.context.t;
    let err;
    if (state.errorMsg) {
      err = wrap(views.wrappers.loginError, <p className="label label-danger">{state.errorMsg}</p>, this);
    }
    const logo = this.context.settings.logo;

    let el = (
      <div className="panel" id="login">
        { wrap(views.wrappers.loginLogo, <img src={logo || 'static/img/logo.png'} className="logo"/>, this)}
        { wrap(views.wrappers.loginForm,
          <form>
            { wrap(views.wrappers.loginField, <div>
                <div className={'form-group'+state.usernameError}>
                  <div className="input-group">
                    <div className="input-group-addon"><i className="fa fa-user"/></div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t('Username')}
                      onChange={this.handleUsername}
                      value={state.username}
                    />
                  </div>
                </div>
                <div className={'form-group'+state.passwordError}>
                  <div className="input-group">
                    <div className="input-group-addon"><i className="fa fa-key"/></div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder={t('Password')}
                      onChange={this.handlePassword}
                      value={state.password}
                      onEnterKeyDown={this.handleLogin}
                      onKeyPress={this.handleKeyPress}
                    />
                  </div>
                </div>
              </div>,
              this
            )}

            { wrap(views.wrappers.loginButton,
              <a
                className="btn btn-primary btn-block"
                onClick={this.handleLogin}
              >{t('Login')}</a>,
              this
            )}
            { err }
          </form>,
          this
        )}
      </div>
    );

    return wrap(views.wrappers.login, el, this);
  }

}

export default connect(({ login }) => ({ login }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Login);
