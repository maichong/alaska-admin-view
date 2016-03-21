/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import wrap from '../utils/wrap';

export default class Content extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    views: React.PropTypes.object,
  };

  render() {
    let props = this.props;
    let views = this.context.views;
    return wrap(views.wrappers.content,
      <div id="content">
        {
          wrap(views.wrappers.contentInner, <div id="contentInner">{props.children}</div>, this)
        }
      </div>,
      this
    );
  }
}
