/**
 * root.js
 * @copyright Maichong Software Ltd. 2015 http://maichong.it
 * @date 2015-12-10
 * @author Liang <liang@maichong.it>
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reduxRouter = require('redux-router');

var _createHashHistory = require('history/lib/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _reduxPromise = require('redux-promise');

var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reducers = require('./reducers');

var reducers = _interopRequireWildcard(_reducers);

var _reactRouter = require('react-router');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var production = process.env.NODE_ENV == 'production';

var defaultReducers = reducers.default;
delete reducers.default;

var initialState = {};

var storeEnhancers = [(0, _reduxRouter.reduxReactRouter)({ createHistory: _createHashHistory2.default })];
var combinedCreateStore = _redux.compose.apply(undefined, storeEnhancers)(_redux.createStore);

var middlewares = [_reduxThunk2.default, _reduxPromise2.default];

if (!production) {
  middlewares.push((0, _reduxLogger2.default)());
}
var finalCreateStore = _redux.applyMiddleware.apply(undefined, middlewares)(combinedCreateStore);

var reducer = (0, _redux.combineReducers)((0, _assign2.default)({
  router: _reduxRouter.routerStateReducer
}, reducers));

var store = exports.store = finalCreateStore(function (state, action) {
  return reducer(defaultReducers(state, action), action);
}, initialState);

exports.default = _react2.default.createElement(
  _reduxRouter.ReduxRouter,
  null,
  _react2.default.createElement(_reactRouter.Route, { component: Login, path: '/login' })
);