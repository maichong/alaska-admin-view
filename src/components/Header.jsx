/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import wrap from '../utils/wrap';

import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    actions: React.PropTypes.object,
    user: React.PropTypes.object,
  };

  static contextTypes = {
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
    t: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    this.setState(newState);
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  handleRefresh = () => {
    this.props.actions.refreshInfo();
    this.setState({
      open: false
    });
  };

  handleLogout = () => {
    this.props.actions.logout();
    this.setState({
      open: false
    });
  };

  render() {
    let props = this.props;
    let views = this.context.views;
    let t = this.context.t;
    //let avatar = props.user.avatar || 'static/avatar.png';
    let el = (
      <nav id="header" className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <img src="static/img/logo.png"/>
          </div>
          <div className="navbar-collapse collapse">
            <nav className="nav navbar-nav navbar-right">
              <NavDropdown eventKey={3} title={props.user.username} id="basic-nav-dropdown">
                <MenuItem eventKey={3.1} onClick={this.handleRefresh}>{t('Refresh')}</MenuItem>
                <MenuItem eventKey={3.2} onClick={this.handleLogout}>{t('Logout')}</MenuItem>
              </NavDropdown>
            </nav>
          </div>
        </div>
      </nav>
    );

    return wrap(views.wrappers.header, el, this);
  }
}

export default connect(({ user }) => ({ user }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Header);
