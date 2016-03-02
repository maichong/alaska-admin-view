'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.signed = signed;
exports.access = access;

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  return state;
};

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _constants = require('../constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

function login() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  if (action.type == _constants.REFRESH_INFO_COMPLETE) {
    console.log(action.payload);
    if (!action.payload.signed) {
      state = _.assign({}, state, {
        show: true
      });
    }
  }

  if (action.type == _constants.LOGIN_ERROR) {
    state = _.assign({}, state, {
      errorMsg: action.payload.message
    });
  }
  return state;
}

function signed() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var action = arguments[1];

  if (action.type === _constants.LOGIN_COMPLETE) {
    return true;
  }
  return state;
}

function access() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var action = arguments[1];

  return state;
}