/**
 * index.js
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

import {stringify} from 'qs';
import api from '../utils/api';
import { createAction, createApiAction, createAsyncAction } from '../utils/action-creator';
import {
  PREFIX,
  REFRESH_INFO,
  REFRESH_INFO_COMPLETE,
  REFRESH_INFO_ERROR,
  LOGIN,
  LIST,
  DETAILS,
  SEARCH
} from '../constants';


//export const load = createAsyncAction(REFRESH_INFO, async (arg, dispatch)=> {
//  try {
//    let res = await api(PREFIX + '/info');
//    console.log(res);
//  } catch (error) {
//    console.error(error.stack);
//    throw error;
//  }
//});

export const refreshInfo = createApiAction(REFRESH_INFO, PREFIX + '/api/login/info');

export const login = createApiAction(LOGIN, PREFIX + '/api/login/login');

export const list = createAsyncAction(LIST, async (args, dispatch)=> {
  return await api.post(PREFIX + '/api/list?' + stringify(args));
});

export const details = createAsyncAction(DETAILS, async (args, dispatch)=> {
  return await api.post(PREFIX + '/api/details?' + stringify(args));
});

export const search = createAsyncAction(SEARCH, async (args, dispatch)=> {
  return await api.post(PREFIX + '/api/search?' + stringify(args));
});

//
//export const create = (args, data) => (dispatch) => {
//  dispatch({ type: CREATE + '_START', meta: args });
//};
