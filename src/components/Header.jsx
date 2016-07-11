/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import Node from './Node';
import LocaleNav from './LocaleNav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Header extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    user: React.PropTypes.object,
  };

  static contextTypes = {
    actions: React.PropTypes.object,
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
    this.context.actions.refreshInfo();
    this.setState({
      open: false
    });
  };

  handleLogout = () => {
    this.context.actions.logout();
    this.setState({
      open: false
    });
  };

  render() {
    const props = this.props;
    const { t } = this.context;
    return (
      <Node id="header" tag="nav" className="navbar navbar-default">
        <div className="container-fluid">
          <div className="nav menu-toggle">
            <i className="fa fa-bars"/>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <LocaleNav/>
            <NavDropdown eventKey={3} title={props.user.username} id="navUserDropdown">
              <MenuItem eventKey={3.1} onClick={this.handleRefresh}>{t('Refresh')}</MenuItem>
              <MenuItem eventKey={3.2} onClick={this.handleLogout}>{t('Logout')}</MenuItem>
            </NavDropdown>
          </ul>
        </div>
      </Node>
    );
  }
}

export default connect(({ user }) => ({ user }))(Header);
