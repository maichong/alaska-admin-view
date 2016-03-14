/**
 * index.js
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

import {stringify} from 'qs';
import * as _ from 'lodash';
import api from '../utils/api';
import { createAction, createApiAction, createAsyncAction } from '../utils/action-creator';
import {
  PREFIX,
  NOTICE,
  REFRESH_INFO,
  LOGIN,
  LIST,
  DETAILS,
  SEARCH,
  SAVE,
  REMOVE
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

export const notice = createAction(NOTICE, msg => {
  return {
    msg,
    rand: Math.random()
  };
});

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

export const save = createAsyncAction(SAVE, async (args, dispatch)=> {
  return await api.post(PREFIX + '/api/save?' + stringify(_.omit(args, 'data')), args.data);
});

export const remove = createAsyncAction(REMOVE, async (args, dispatch)=> {
  return await api.post(PREFIX + '/api/remove?' + stringify(_.omit(args, 'id')), { id: args.id });
});
