/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
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

  render() {
    let props = this.props;
    let views = this.context.views;
    let el = (
      <div id="sidebar">
        {
          wrap(views.wrappers.sidebarInner,
            <div id="sidebarInner">
              <Menu id="menu" items={props.menu}/>
              <Copyright />
            </div>,
            this
          )
        }
      </div>
    );
    return wrap(views.wrappers.sidebar, el, this);
  }
}
