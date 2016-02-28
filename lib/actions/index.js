'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.refreshInfo = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var refreshInfo = exports.refreshInfo = (0, _actionCreator.createApiAction)(_constants.REFRESH_INFO, _constants.PREFIX + '/info');

//export const login = createApiAction(LOGIN, PREFIX + '/login');

/**
 * index.js
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

var login = exports.login = (0, _actionCreator.createAsyncAction)(_constants.LOGIN, function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(arg, dispatch) {
    var res;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(arg);
            _context.next = 3;
            return _api2.default.post(_constants.PREFIX + '/api/login/login', arg);

          case 3:
            res = _context.sent;

            console.log(res);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })),
      _this = undefined;
  return function (_x, _x2) {
    return ref.apply(_this, arguments);
  };
}());