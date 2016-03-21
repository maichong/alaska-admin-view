/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import wrap from '../utils/wrap';

export default class Locked extends React.Component {

  static contextTypes = {
    views: React.PropTypes.object,
  };

  render() {
    let style = {
      fontSize: 32,
      textAlign: 'center',
      paddingTop: 100,
      color: '#b55'
    };
    return wrap(this.context.views.wrappers.locked, <h1 style={style}>无权访问</h1>, this);
  }
}
