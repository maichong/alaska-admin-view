/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-24
 * @author Liang <liang@maichong.it>
 */

import * as _ from 'lodash';
import {
  NOTICE,
  REFRESH_INFO_COMPLETE,
  LOGIN_COMPLETE,
  LOGIN_ERROR,
  LOGOUT_COMPLETE,
  LIST_COMPLETE,
  DETAILS_COMPLETE,
  SAVE_COMPLETE,
  SAVE_ERROR,
  REMOVE_COMPLETE,
  REMOVE_ERROR
} from '../constants';

export function notice(state = {}, action) {
  if (action.type == NOTICE) {
    return action.payload;
  }
  return state;
}

export function login(state = {}, action) {
  if (action.type == LOGOUT_COMPLETE) {
    return _.assign({}, state, {
      show: true
    });
  }
  if (action.type == REFRESH_INFO_COMPLETE) {
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
    return !!action.payload.signed;
  }
  if (action.type === LOGOUT_COMPLETE) {
    return false;
  }
  return state;
}

export function user(state = {}, action) {
  if (action.type == LOGIN_COMPLETE || action.type == REFRESH_INFO_COMPLETE) {
    return action.payload.user || {};
  }
  if (action.type === LOGOUT_COMPLETE) {
    return {};
  }
  return state;
}

export function access(state = false, action) {
  if (action.type == LOGIN_COMPLETE || action.type == REFRESH_INFO_COMPLETE) {
    return !!action.payload.access;
  }
  if (action.type === LOGOUT_COMPLETE) {
    return false;
  }
  return state;
}

export function settings(state = {}, action) {
  if ((action.type == LOGIN_COMPLETE || action.type == REFRESH_INFO_COMPLETE)) {
    let settings = action.payload.settings || {};
    for (let i in settings.services) {
      let service = settings.services[i];
      if (service && service.models) {
        for (let j in service.models) {
          let model = service.models[j];
          if (model && model.fields) {
            model.service = service;
            let ability = `admin.${model.key}.`.toLowerCase();
            model.abilities = {
              read: settings.abilities[ability + 'read'],
              create: settings.abilities[ability + 'create'],
              update: settings.abilities[ability + 'update'],
              remove: settings.abilities[ability + 'remove'],
            };
          }
        }
      }
    }
    let all = {};
    _.forEach(settings.locales, service => {
      _.forEach(service, (locale, key) => {
        if (!all[key]) {
          all[key] = {};
        }
        _.defaults(all[key], locale);
      });
    });
    settings.locales.all = all;

    return _.assign({}, settings);
  }
  return state;
}

export function lists(state = {}, action) {
  let key = action.meta ? action.meta.key : '';
  if (key && action.type === LIST_COMPLETE) {
    let res = action.payload;
    let data = _.assign({}, action.meta, res);
    if (action.payload.page != 1 && state[key]) {
      data.results = state[key].results.concat(data.results);
    }
    return _.assign({}, state, {
      [key]: data
    });
  }
  if (key && state[key] && (action.type === SAVE_COMPLETE || action.type === REMOVE_COMPLETE)) {
    return _.omit(state, key);
  }
  return state;
}

function detailsFromList(state = {}, action) {
  let results = action.payload.results;
  let tmp = {};
  for (let i in results) {
    let record = results[i];
    tmp[record._id] = record;
  }
  return _.assign({}, state, tmp);
}

export function details(state = {}, action) {
  let key = action.meta ? action.meta.key : '';
  if (key && action.type === LIST_COMPLETE) {
    return _.assign({}, state, {
      [key]: detailsFromList(state[key], action)
    });
  }
  if (key && (action.type == DETAILS_COMPLETE || action.type == SAVE_COMPLETE) && action.payload._id) {
    let data = action.payload;
    return _.assign({}, state, {
      [key]: _.assign({}, state[key], {
        [data._id]: data
      })
    });
  }
  return state;
}

export function save(state = {}, action) {
  if (action.type == SAVE_COMPLETE) {
    //保存后清空搜索缓存
    return _.assign({}, action.meta, {
      res: action.payload,
      error: ''
    });
  } else if (action.type == SAVE_ERROR) {
    return _.assign({}, action.meta, {
      res: action.payload,
      error: action.payload
    });
  }
  return state;
}

export function remove(state = {}, action) {
  if (action.type == REMOVE_COMPLETE) {
    //保存后清空搜索缓存
    return _.assign({}, action.meta, {
      res: action.payload,
      error: ''
    });
  } else if (action.type == REMOVE_ERROR) {
    return _.assign({}, action.meta, {
      res: action.payload,
      error: action.payload
    });
  }
  return state;
}

export default function (state = {}, action) {
  return state;
}
