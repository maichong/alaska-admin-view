/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import Menu from './Menu';
import Copyright from './Copyright';
import Node from './Node';
import Logo from './Logo';

const { array } = React.PropTypes;

export default class Sidebar extends React.Component {

  static propTypes = {
    menu: array
  };

  render() {
    let { menu } = this.props;
    return (
      <Node id="sidebar">
        <Node id="sidebarInner">
          <Logo/>
          <Menu items={menu}/>
          <Copyright />
        </Node>
      </Node>
    );
  }
}
