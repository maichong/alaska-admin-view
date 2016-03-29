/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import wrap from '../utils/wrap';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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
    //let avatar = props.user.avatar || 'static/avatar.png';
    let el = (
      <Navbar id="header" fluid={true}>

        <Navbar.Header>
          <img src="static/img/logo.png"/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={3} title={props.user.username} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} onClick={this.handleRefresh}>刷新</MenuItem>
              <MenuItem eventKey={3.2} onClick={this.handleLogout}>退出登录</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );

    return wrap(views.wrappers.header, el, this);
  }
}

export default connect(({ user }) => ({ user }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Header);
