/**
 * index.js
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

import api from '../utils/api';
import { createAction, createApiAction, createAsyncAction } from '../utils/action-creator';
import {
  PREFIX,
  REFRESH_INFO,
  REFRESH_INFO_COMPLETE,
  REFRESH_INFO_ERROR,
  LOGIN
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

//export const login = createApiAction(LOGIN, PREFIX + '/login');

export const login = createAsyncAction(LOGIN, async (arg, dispatch)=> {
  console.log(arg);
  let res = await api.post(PREFIX + '/api/login/login', arg);
  console.log(res);
});
