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
  LIST_COMPLETE,
  DETAILS_COMPLETE,
  SEARCH_COMPLETE
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
  if ((action.type == LOGIN_COMPLETE || action.type == REFRESH_INFO_COMPLETE) && action.payload.access) {
    let settings = action.payload.settings;
    for (let i in settings.services) {
      let service = settings.services[i];
      if (service && service.models) {
        for (let j in service.models) {
          let model = service.models[j];
          if (model && model.fields) {
            model.service = service;
            model.key = service.id + '-' + model.name;
            let ability = `admin.${service.id}.${model.name}.`.toLowerCase();
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
    return _.assign({}, settings);
  }
  return state;
}

export function list(state = {}, action) {
  if (action.type === LIST_COMPLETE) {
    return _.assign({}, action.meta, action.payload);
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
  if (action.type === LIST_COMPLETE) {
    let meta = action.meta;
    let key = meta.service + '-' + meta.model;
    return _.assign({}, state, {
      [key]: detailsFromList(state[key], action)
    });
  }
  if (action.type == DETAILS_COMPLETE && action.payload._id) {
    let meta = action.meta;
    let key = meta.service + '-' + meta.model;
    let data = action.payload;
    return _.assign({}, state, {
      [key]: _.assign({}, state[key], {
        [data._id]: data
      })
    });
  }
  return state;
}

export function search(state = {}, action) {
  if (action.type == SEARCH_COMPLETE) {
    let meta = action.meta;
    let key = meta.service + '-' + meta.model;
    return _.assign({}, state, {
      [key]: _.assign({}, state[key], {
        [meta.keyword]: action.payload.results
      })
    });
  }
  return state;
}

export default function (state = {}, action) {
  return state;
}
