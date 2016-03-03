'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.refreshInfo = undefined;

var _api = require('../utils/api');

var _api2 = _interopRequireDefault(_api);

var _actionCreator = require('../utils/action-creator');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//export const load = createAsyncAction(REFRESH_INFO, async (arg, dispatch)=> {
//  try {
//    let res = await api(PREFIX + '/info');
//    console.log(res);
//  } catch (error) {
//    console.error(error.stack);
//    throw error;
//  }
//});

var refreshInfo = exports.refreshInfo = (0, _actionCreator.createApiAction)(_constants.REFRESH_INFO, _constants.PREFIX + '/api/login/info'); /**
                                                                                                                                              * index.js
                                                                                                                                              * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                              * @date 2016-02-24
                                                                                                                                              * @author Liang <liang@maichong.it>
                                                                                                                                              */

var login = exports.login = (0, _actionCreator.createApiAction)(_constants.LOGIN, _constants.PREFIX + '/api/login/login');