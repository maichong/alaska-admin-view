/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-07-11
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import Node from './Node';

const { object } = React.PropTypes;

export default class Logo extends React.Component {

  static contextTypes = {
    settings: object
  };

  render() {
    let logo = this.context.settings.logo || 'static/img/logo.png';
    return (
      <Node id="logo">
        <img src={logo}/>
      </Node>
    );
  }
}
