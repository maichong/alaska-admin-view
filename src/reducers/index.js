/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

import * as _ from 'lodash';
import {
  REFRESH_INFO_COMPLETE,
  LOGIN_COMPLETE,
  LOGIN_ERROR,
  LIST_COMPLETE
} from '../constants';

export function login(state = {}, action) {
  if (action.type == REFRESH_INFO_COMPLETE) {
    console.log(action.payload);
    if (!action.payload.signed) {
      state = _.assign({}, state, {
        show: true
      });
    }
  }

  if (action.type == LOGIN_ERROR) {
    state = _.assign({}, state, {
      errorMsg: action.payload.message
    });
  }
  return state;
}

export function signed(state = false, action) {
  if (action.type == LOGIN_COMPLETE || action.type == REFRESH_INFO_COMPLETE) {
    return action.payload.signed;
  }
  return state;
}

export function access(state = false, action) {
  if (action.type == LOGIN_COMPLETE || action.type == REFRESH_INFO_COMPLETE) {
    return !!action.payload.access;
  }
  return state;
}

export function settings(state = {}, action) {
  if (action.type == LOGIN_COMPLETE || action.type == REFRESH_INFO_COMPLETE) {
    return _.assign({}, action.payload.settings);
  }
  return state;
}

export function list(state = {}, action) {
  if (action.type === LIST_COMPLETE) {
    return _.assign({}, action.meta, action.payload);
  }
  return state;
}

export default function (state = {}, action) {
  return state;
}
