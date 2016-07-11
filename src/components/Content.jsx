/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import Node from './Node';

export default class Content extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    let { children } = this.props;
    return (
      <Node id="content">
        <Node id="contentInner">{children}</Node>
      </Node>
    );
  }
}
