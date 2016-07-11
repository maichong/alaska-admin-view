/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { connect } from 'react-redux';
import Node from './Node';

import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

export default class Manage extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    settings: React.PropTypes.object
  };

  render() {
    let { children } = this.props;
    let { settings } = this.context;
    return <Node id="manage">
      <Sidebar menu={settings.menu}/>
      <Node id="body">
        <Header/>
        <Content>{children}</Content>
      </Node>
    </Node>
  }
}

export default connect(({ settings, notice }) => ({ settings, notice }))(Manage);
