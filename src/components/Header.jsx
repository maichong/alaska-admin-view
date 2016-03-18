/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';

import wrap from '../utils/wrap';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import Avatar from 'material-ui/lib/avatar';
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import FontIcon from 'material-ui/lib/font-icon';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      settings: context.settings,
      open: false,
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
      settings: this.context.settings,
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

  handleRefresh = ()=> {
    this.props.actions.refreshInfo();
    this.setState({
      open: false
    });
  };

  handleLogout = ()=> {
    this.props.actions.logout();
    this.setState({
      open: false
    });
  };

  render() {
    let props = this.props;
    let state = this.state;
    let views = state.views;
    let height = 56;
    let styles = {
      root: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: height
      },
      toolbar: {
        background: '#fff',
        height: height
      },
      logo: {
        height: 56
      },
      img: {
        height: 56
      },
      title: {
        paddingLeft: 20,
        color: '#000'
      },
      list: {
        float: 'right',
        listStyle: 'none',
      }
    };
    let el = (
      <Paper id="header" zDepth={2} style={styles.root}>
        <Toolbar style={styles.toolbar}>

          <ToolbarGroup firstChild={true} float="left">
            <div style={styles.logo}><img style={styles.img} src="static/logo.png"/></div>
          </ToolbarGroup>

          <ToolbarGroup float="right">
            <FlatButton
              onTouchTap={this.handleTouchTap}
              label={props.user.username}
              icon={<Avatar src={props.user.avatar || 'static/avatar.png'} />}
            />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationFromTop}
            >
              <Menu desktop={true}>
                <MenuItem
                  primaryText="Refresh"
                  onTouchTap={this.handleRefresh}
                  leftIcon={
                    <FontIcon className="material-icons">refresh</FontIcon>
                  }
                />
                <MenuItem
                  primaryText="Signout"
                  onTouchTap={this.handleLogout}
                  leftIcon={
                    <FontIcon className="material-icons">exit_to_app</FontIcon>
                  }/>
              </Menu>
            </Popover>

          </ToolbarGroup>

        </Toolbar>

      </Paper>
    );

    return wrap(views.wrappers.header, el);
  }
}

export default connect(({ user }) => ({ user }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(Header);
