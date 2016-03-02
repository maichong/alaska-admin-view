/**
 * @copyright Maichong Software Ltd. 2015 http://maichong.it
 * @date 2015-12-11
 * @author Liang <liang@maichong.it>
 */

import api from './api';

export { createAction } from 'redux-actions';

export const createAsyncAction = (type, asyncFn) => (arg) => (dispatch) => {
  dispatch({ type: type + '_START', meta: arg });
  return {
    type,
    payload: asyncFn(arg, dispatch).then(
      res => {
        dispatch({ type: type + '_COMPLETE', payload: res, meta: arg });
      },
      err => {
        dispatch({ type: type + '_ERROR', payload: err, meta: arg, error: true });
      }
    )
  };
};

export const createApiAction = (type, url) => (data = {}, options = {}) => (dispatch) => {
  dispatch({ type: type + '_START', meta: options });
  return {
    type,
    payload: api.post(url, data, options).then(
      res => {
        dispatch({ type: type + '_COMPLETE', payload: res, meta: options });
      },
      err => {
        dispatch({ type: type + '_ERROR', payload: err, meta: options, error: true });
      }
    )
  };
};
