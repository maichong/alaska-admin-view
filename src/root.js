/**
 * root.js
 * @copyright Maichong Software Ltd. 2015 http://maichong.it
 * @date 2015-12-10
 * @author Liang <liang@maichong.it>
 */

'use strict';

import React from 'react';

const production = process.env.NODE_ENV == 'production';

import { createStore, compose, combineReducers, applyMiddleware, bindActionCreators } from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import createHashHistory from 'history/lib/createHashHistory';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './reducers';
import { Redirect, IndexRoute, Route, Link } from 'react-router';

const defaultReducers = reducers.default;
delete reducers.default;

const initialState = {};

const storeEnhancers = [
  reduxReactRouter({createHistory: createHashHistory})
];
const combinedCreateStore = compose(...storeEnhancers)(createStore);

let middlewares = [thunkMiddleware, promiseMiddleware];

if (!production) {
  middlewares.push(createLogger());
}
const finalCreateStore = applyMiddleware(...middlewares)(combinedCreateStore);

const reducer = combineReducers(Object.assign({
  router: routerStateReducer
}, reducers));

export const store = finalCreateStore((state, action)=>reducer(defaultReducers(state, action), action)
  , initialState);

export default (
  <ReduxRouter>
    <Route component={Login} path="/login"/>
  </ReduxRouter>
);
