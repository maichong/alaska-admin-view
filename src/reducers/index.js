/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

import * as _ from 'lodash';
import {
  REFRESH_INFO_COMPLETE,
  LOGIN_ERROR
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
  //for test
  if (action.type == LOGIN_ERROR) {
    return true;
  }
  return state;
}

export function access(state = false, action) {
  //for test
  if (action.type == LOGIN_ERROR) {
    return true;
  }
  return state;
}

export default function (state = {}, action) {
  return state;
}
