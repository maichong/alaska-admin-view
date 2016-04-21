/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import _assign from 'lodash/assign';
import _reduce from 'lodash/reduce';

export default function wrap(wrappers, element, parent, props) {
  if (!parent) {
    console.error('parent is required');
  }
  if (!wrappers || !wrappers.length) {
    return element;
  }
  return _reduce(wrappers, (el, Wrapper) => React.createElement(Wrapper, _assign({ parent }, props), el), element);
}
