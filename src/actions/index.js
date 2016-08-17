/**
 * index.js
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

import qs from 'qs';
import _omit from 'lodash/omit';
import api from '../utils/api';
import { createApiAction, createAsyncAction } from '../utils/action-creator';
import createAction from 'redux-actions/lib/createAction';
import {
  PREFIX,
  REFRESH_INFO,
  LOGIN,
  LOGOUT,
  LIST,
  DETAILS,
  SAVE,
  REMOVE,
  REFRESH,
  LAYOUT
} from '../constants';

let loading = {};

export const refreshInfo = createApiAction(REFRESH_INFO, PREFIX + '/api/login/info');

export const refresh = () => dispatch => {
  loading = {};
  dispatch(refreshInfo());
  dispatch({ type: REFRESH });
};

export const logout = createApiAction(LOGOUT, PREFIX + '/api/login/logout');

export const login = createApiAction(LOGIN, PREFIX + '/api/login/login');

export const list = createAsyncAction(LIST, async (args, dispatch) => {
  return await api.post(PREFIX + '/api/list?' + qs.stringify(args));
});

export const details = createAsyncAction(DETAILS, async (args, dispatch) => {
  let key = JSON.stringify(args);
  loading[key] = true;
  let res = await api.post(PREFIX + '/api/details?' + qs.stringify(args));
  delete loading[key];
  return res;
});

export function detailsIfNeed(args) {
  let key = JSON.stringify(args);
  if (loading[key]) {
    return { type: 'NO_NEED' };
  }
  return details(args);
}

export const save = createAsyncAction(SAVE, async (args, dispatch) => {
  return await api.post(PREFIX + '/api/save?' + qs.stringify(_omit(args, 'data')), args.data);
});

export const remove = createAsyncAction(REMOVE, async (args, dispatch) => {
  return await api.post(PREFIX + '/api/remove?' + qs.stringify(_omit(args, 'id')), { id: args.id });
});

export const layout = createAction(LAYOUT);
