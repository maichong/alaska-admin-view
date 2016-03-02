'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApiAction = exports.createAsyncAction = exports.createAction = undefined;

var _reduxActions = require('redux-actions');

Object.defineProperty(exports, 'createAction', {
  enumerable: true,
  get: function get() {
    return _reduxActions.createAction;
  }
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createAsyncAction = exports.createAsyncAction = function createAsyncAction(type, asyncFn) {
  return function (arg) {
    return function (dispatch) {
      dispatch({ type: type + '_START', meta: arg });
      return {
        type: type,
        payload: asyncFn(arg, dispatch).then(function (res) {
          dispatch({ type: type + '_COMPLETE', payload: res, meta: arg });
        }, function (err) {
          dispatch({ type: type + '_ERROR', payload: err, meta: arg, error: true });
        })
      };
    };
  };
};

var createApiAction = exports.createApiAction = function createApiAction(type, url) {
  return function () {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return function (dispatch) {
      dispatch({ type: type + '_START', meta: options });
      return {
        type: type,
        payload: _api2.default.post(url, data, options).then(function (res) {
          dispatch({ type: type + '_COMPLETE', payload: res, meta: options });
        }, function (err) {
          dispatch({ type: type + '_ERROR', payload: err, meta: options, error: true });
        })
      };
    };
  };
};