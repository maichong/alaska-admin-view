/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import * as _ from 'lodash';

export default function wrap(wrappers, element, parent, props) {
  if (!parent) {
    console.error('parent is required');
  }
  if (!wrappers || !wrappers.length) {
    return element;
  }
  return _.reduce(wrappers, (el, Wrapper) => React.createElement(Wrapper, _.assign({ parent }, props), el), element);
}
