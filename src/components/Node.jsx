/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-07-11
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import _reduce from 'lodash/reduce';

export default class Node extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    tag: React.PropTypes.string,
    id: React.PropTypes.string,
    wrapper: React.PropTypes.string,
  };

  static contextTypes = {
    views: React.PropTypes.object
  };

  render() {
    let { tag, id, children, wrapper, ...others } = this.props;
    wrapper = wrapper || id;
    if (wrapper) {
      const wrappers = this.context.views.wrappers;
      if (wrappers[wrapper] && wrappers[wrapper].length) {
        children = _reduce(wrappers[wrapper], (el, Wrapper) => React.createElement(Wrapper, {}, el), children);
      }
    }
    tag = tag || 'div';
    return React.createElement(
      tag,
      {
        id,
        ...others
      },
      children
    );
  }
}
