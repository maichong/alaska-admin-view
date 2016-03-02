/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';

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
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

export default class Header extends React.Component {

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
      open: false,
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
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

  componentWillUnmount() {
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    let props = this.props;
    let state = this.state;
    let styles = {
      root: {},
      list: {
        "float": "right",
        "listStyle": "none",
      }
    };
    return (
      <div style={styles.root}>
        <Toolbar >

          <ToolbarGroup firstChild={true} float="left">
            <ToolbarTitle text="Alaska Manager"/>
          </ToolbarGroup>

          <ToolbarGroup float="right">
            <IconMenu
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationExpandMoreIcon />
                </IconButton>
              }
            >
              <MenuItem primaryText="Download"/>
              <MenuItem primaryText="More Info"/>
            </IconMenu>

            <ToolbarSeparator />

            <FlatButton
              onTouchTap={this.handleTouchTap}
              label="Image Avatar"
              icon={<Avatar src="http://www.material-ui.com/images/uxceo-128.jpg" />}
            />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationFromTop}
            >
              <div style={styles.popover}>
                <Menu desktop={true}>
                  <MenuItem primaryText="Refresh"/>
                  <MenuItem primaryText="Edit"/>
                  <MenuItem primaryText="Delete"/>
                  <Divider />
                  <MenuItem primaryText="Signout"/>
                </Menu>
              </div>
            </Popover>

          </ToolbarGroup>

          <ToolbarGroup float="right">
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            >
              <MenuItem primaryText="22222222222"/>
              <MenuItem primaryText="Send feedback"/>
              <MenuItem primaryText="Settings"/>
              <MenuItem primaryText="Help"/>
              <MenuItem primaryText="Sign out"/>
            </IconMenu>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            >
              <MenuItem primaryText="3333333333"/>
              <MenuItem primaryText="Send feedback"/>
              <MenuItem primaryText="Settings"/>
              <MenuItem primaryText="Help"/>
              <MenuItem primaryText="Sign out"/>
            </IconMenu>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            >
              <MenuItem primaryText="4444444444"/>
              <MenuItem primaryText="Send feedback"/>
              <MenuItem primaryText="Settings"/>
              <MenuItem primaryText="Help"/>
              <MenuItem primaryText="Sign out"/>
            </IconMenu>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            >
              <MenuItem primaryText="5555555555"/>
              <MenuItem primaryText="Send feedback"/>
              <MenuItem primaryText="Settings"/>
              <MenuItem primaryText="Help"/>
              <MenuItem primaryText="Sign out"/>
            </IconMenu>
          </ToolbarGroup>

        </Toolbar>

      </div>
    );
  }
}
