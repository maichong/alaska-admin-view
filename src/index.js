/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

import '../less/style.less';

exports.App = require('./components/App').default;
exports.store = require('./store').default;
exports.api = require('./utils/api').default;
exports.shallowEqual = require('./utils/shallow-equal').default;
exports.actions = require('./actions');

const constants = require('./constants');

for (let key in constants) {
  exports[key] = constants[key];
}
