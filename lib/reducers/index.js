'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.notice = notice;
exports.login = login;
exports.signed = signed;
exports.user = user;
exports.access = access;
exports.settings = settings;
exports.lists = lists;
exports.details = details;
exports.save = save;
exports.remove = remove;

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  return state;
};

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _constants = require('../constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

function notice() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  if (action.type == _constants.NOTICE) {
    return action.payload;
  }
  return state;
}

function login() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  if (action.type == _constants.LOGOUT_COMPLETE) {
    return _.assign({}, state, {
      show: true
    });
  }
  if (action.type == _constants.REFRESH_INFO_COMPLETE) {
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

  if (action.type == _constants.LOGIN_COMPLETE || action.type == _constants.REFRESH_INFO_COMPLETE) {
    return action.payload.signed;
  }
  if (action.type === _constants.LOGOUT_COMPLETE) {
    return false;
  }
  return state;
}

function user() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  if (action.type == _constants.LOGIN_COMPLETE || action.type == _constants.REFRESH_INFO_COMPLETE) {
    return action.payload.user || {};
  }
  if (action.type === _constants.LOGOUT_COMPLETE) {
    return {};
  }
  return state;
}

function access() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var action = arguments[1];

  if (action.type == _constants.LOGIN_COMPLETE || action.type == _constants.REFRESH_INFO_COMPLETE) {
    return !!action.payload.access;
  }
  if (action.type === _constants.LOGOUT_COMPLETE) {
    return false;
  }
  return state;
}

function settings() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  if (action.type == _constants.LOGIN_COMPLETE || action.type == _constants.REFRESH_INFO_COMPLETE) {
    var _settings = action.payload.settings || {};
    for (var i in _settings.services) {
      var service = _settings.services[i];
      if (service && service.models) {
        for (var j in service.models) {
          var model = service.models[j];
          if (model && model.fields) {
            model.service = service;
            var ability = ('admin.' + model.key + '.').toLowerCase();
            model.abilities = {
              read: _settings.abilities[ability + 'read'],
              create: _settings.abilities[ability + 'create'],
              update: _settings.abilities[ability + 'update'],
              remove: _settings.abilities[ability + 'remove']
            };
          }
        }
      }
    }
    return _.assign({}, _settings);
  }
  return state;
}

function lists() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  var key = action.meta ? action.meta.key : '';
  if (key && action.type === _constants.LIST_COMPLETE) {
    var res = action.payload;
    var data = _.assign({}, action.meta, res);
    if (action.payload.page != 1 && state[key]) {
      data.results = state[key].results.concat(data.results);
    }
    return _.assign({}, state, (0, _defineProperty3.default)({}, key, data));
  }
  if (key && state[key] && (action.type === _constants.SAVE_COMPLETE || action.type === _constants.REMOVE_COMPLETE)) {
    return _.omit(state, key);
  }
  return state;
}

function detailsFromList() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  var results = action.payload.results;
  var tmp = {};
  for (var i in results) {
    var record = results[i];
    tmp[record._id] = record;
  }
  return _.assign({}, state, tmp);
}

function details() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  var key = action.meta ? action.meta.key : '';
  if (key && action.type === _constants.LIST_COMPLETE) {
    return _.assign({}, state, (0, _defineProperty3.default)({}, key, detailsFromList(state[key], action)));
  }
  if (key && (action.type == _constants.DETAILS_COMPLETE || action.type == _constants.SAVE_COMPLETE) && action.payload._id) {
    var data = action.payload;
    return _.assign({}, state, (0, _defineProperty3.default)({}, key, _.assign({}, state[key], (0, _defineProperty3.default)({}, data._id, data))));
  }
  return state;
}

function save() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  if (action.type == _constants.SAVE_COMPLETE) {
    //保存后清空搜索缓存
    return _.assign({}, action.meta, {
      res: action.payload,
      error: ''
    });
  } else if (action.type == _constants.SAVE_ERROR) {
    return _.assign({}, action.meta, {
      res: action.payload,
      error: action.payload
    });
  }
  return state;
}

function remove() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  if (action.type == _constants.REMOVE_COMPLETE) {
    //保存后清空搜索缓存
    return _.assign({}, action.meta, {
      res: action.payload,
      error: ''
    });
  } else if (action.type == _constants.REMOVE_ERROR) {
    return _.assign({}, action.meta, {
      res: action.payload,
      error: action.payload
    });
  }
  return state;
}