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
    views: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  render() {
    console.log('Sidebar.render', this);
    let props = this.props;
    let views = this.context.views;
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
