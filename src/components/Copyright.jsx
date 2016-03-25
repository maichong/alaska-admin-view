/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import wrap from '../utils/wrap';
export default class Copyright extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    views: React.PropTypes.object,
  };

  render() {
    let views = this.context.views;
    return wrap(views.wrappers.copyright, <div id="copyright">Powered By Alaska</div>, this);
  }
}
