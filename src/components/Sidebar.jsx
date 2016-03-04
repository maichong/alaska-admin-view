/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import Paper from 'material-ui/lib/paper';
import Menu from './Menu';
import Copyright from './Copyright';
import wrap from '../utils/wrap';


export default class Sidebar extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    menu: React.PropTypes.array,
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
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
      settings: this.context.settings,
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

  render() {
    let props = this.props;
    let state = this.state;
    let views = this.state.views;
    let styles = {
      root: {
        width: 240,
        top: 56,
        left: 0,
        bottom: 0,
        position: 'fixed',
        background: '#333'
      },
      inner: {
        position: 'relative',
        height: '100%',
      }
    };
    let el = (
      <Paper id="sidebar" zDepth={1} style={styles.root}>
        {
          wrap(views.wrappers.sidebarInner,
            <div id="sidebarInner" style={styles.inner}>
              <Menu menu={props.menu}/>
              <Copyright />
            </div>
          )
        }
      </Paper>
    );
    return wrap(views.wrappers.sidebar, el);
  }
}
