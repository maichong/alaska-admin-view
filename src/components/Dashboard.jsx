/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-07-15
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import Node from './Node';

export default class Dashboard extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
      <Node id="dashboard">
        <div className="dashboard-placeholder">Wellcome</div>
      </Node>
    );
  }
}
