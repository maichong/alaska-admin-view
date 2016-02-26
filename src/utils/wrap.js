/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import * as _ from 'lodash';

export default function wrap(wrappers, element) {
  return _.reduce(wrappers, (el, Wrapper) => React.createElement(Wrapper, element.props, el), element);
}
