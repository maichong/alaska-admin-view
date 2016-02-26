/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import * as _ from 'lodash';

export default function plguin(plguins, element) {
  console.log(element);
  return _.map(plguins, (Plguin, index) => React.createElement(Plguin, _.assign({}, element.props, { key: index })));
}
