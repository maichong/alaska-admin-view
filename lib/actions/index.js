'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.save = exports.details = exports.list = exports.login = exports.logout = exports.refreshInfo = exports.notice = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _qs = require('qs');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _api = require('../utils/api');

var _api2 = _interopRequireDefault(_api);

var _actionCreator = require('../utils/action-creator');

var _constants = require('../constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

var notice = exports.notice = (0, _actionCreator.createAction)(_constants.NOTICE, function (msg) {
  return {
    msg: msg,
    rand: Math.random()
  };
}); /**
     * index.js
     * @copyright Maichong Software Ltd. 2016 http://maichong.it
     * @date 2016-02-24
     * @author Liang <liang@maichong.it>
     */

var refreshInfo = exports.refreshInfo = (0, _actionCreator.createApiAction)(_constants.REFRESH_INFO, _constants.PREFIX + '/api/login/info');

var logout = exports.logout = (0, _actionCreator.createApiAction)(_constants.LOGOUT, _constants.PREFIX + '/api/login/logout');

var login = exports.login = (0, _actionCreator.createApiAction)(_constants.LOGIN, _constants.PREFIX + '/api/login/login');

var list = exports.list = (0, _actionCreator.createAsyncAction)(_constants.LIST, function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(args, dispatch) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _api2.default.post(_constants.PREFIX + '/api/list?' + (0, _qs.stringify)(args));

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
  return function (_x, _x2) {
    return ref.apply(this, arguments);
  };
}());

var details = exports.details = (0, _actionCreator.createAsyncAction)(_constants.DETAILS, function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(args, dispatch) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _api2.default.post(_constants.PREFIX + '/api/details?' + (0, _qs.stringify)(args));

          case 2:
            return _context2.abrupt('return', _context2.sent);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));
  return function (_x3, _x4) {
    return ref.apply(this, arguments);
  };
}());

var save = exports.save = (0, _actionCreator.createAsyncAction)(_constants.SAVE, function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(args, dispatch) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _api2.default.post(_constants.PREFIX + '/api/save?' + (0, _qs.stringify)(_.omit(args, 'data')), args.data);

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));
  return function (_x5, _x6) {
    return ref.apply(this, arguments);
  };
}());

var remove = exports.remove = (0, _actionCreator.createAsyncAction)(_constants.REMOVE, function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(args, dispatch) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _api2.default.post(_constants.PREFIX + '/api/remove?' + (0, _qs.stringify)(_.omit(args, 'id')), { id: args.id });

          case 2:
            return _context4.abrupt('return', _context4.sent);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));
  return function (_x7, _x8) {
    return ref.apply(this, arguments);
  };
}());