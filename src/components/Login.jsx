/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as _ from 'lodash';

import { Button, Input, Panel } from 'react-bootstrap';

import wrap from '../utils/wrap';


export default class Login extends React.Component {
  static propTypes = {
    login: React.PropTypes.object
  };

  static contextTypes = {
    views: React.PropTypes.object,
    t: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    let newState = {};
    if (nextProps.login && nextProps.login.errorMsg) {
      newState.errorMsg = nextProps.login.errorMsg;
    }
    this.setState(newState);
  }

  handleLogin = () => {
    let username = this.refs.name.getValue();
    let password = this.refs.pass.getValue();
    let state = {
      errorMsg: '',
      usernameError: '',
      passwordError: ''
    };
    if (!username) {
      state.usernameError = 'error';
    }
    if (!password) {
      state.passwordError = 'error';
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
    let props = this.props;
    let state = this.state;
    let views = this.context.views;
    let t = this.context.t;
    let err;
    if (state.errorMsg) {
      err = wrap(views.wrappers.loginError, <p className="label label-danger">{state.errorMsg}</p>, this);
    }

    let el = (
      <Panel id="login">
        { wrap(views.wrappers.loginLogo, <img src="static/img/logo.png" className="logo"/>, this)}
        { wrap(views.wrappers.loginForm,
          <form>
            { wrap(views.wrappers.loginField, <div>
                <Input
                  placeholder={t('Username')}
                  bsStyle={state.usernameError}
                  type="text"
                  errorText={state.nameError}
                  ref="name"
                  addonBefore={<i className="fa fa-user"/>}
                />
                <Input
                  placeholder={t('Password')}
                  bsStyle={state.passwordError}
                  type="password"
                  errorText={state.passError}
                  ref="pass"
                  onEnterKeyDown={this.handleLogin}
                  onKeyPress={this.handleKeyPress}
                  addonBefore={<i className="fa fa-key"/>}
                />
              </div>,
              this
            )}

            { wrap(views.wrappers.loginButton,
              <Button
                bsStyle="primary"
                block
                onClick={this.handleLogin}
              >{t('Login')}</Button>,
              this
            )}
            { err }
          </form>,
          this
        )}
      </Panel>
    );

    return wrap(views.wrappers.login, el, this);
  }

}

export default connect(({ login }) => ({ login }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Login);
