/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

'use strict';

require('core-js/shim');

require('normalize.css');

require('../style.less');

require('react-tap-event-plugin')();

exports.App = require('./components/App').default;
exports.store = require('./store').default;
exports.wrap = require('./utils/wrap').default;
exports.api = require('./utils/api').default;
exports.actions = require('./actions');