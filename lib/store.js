'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxPromise = require('redux-promise');

var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _index = require('./reducers/index');

var reducers = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultReducers = reducers.default; /**
                                         * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                         * @date 2016-02-25
                                         * @author Liang <liang@maichong.it>
                                         */

delete reducers.default;
var reducer = (0, _redux.combineReducers)(reducers);

var middlewares = [_reduxThunk2.default, _reduxPromise2.default];

if (process.env.NODE_ENV != 'production') {
  middlewares.push((0, _reduxLogger2.default)());
}

exports.default = (0, _redux.createStore)(function (state, action) {
  return reducer(defaultReducers(state, action), action);
}, _redux.applyMiddleware.apply(undefined, middlewares));