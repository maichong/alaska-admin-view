/**
 * API Client
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-25
 * @author Liang <liang@maichong.it>
 */

import './formdata';
import 'whatwg-fetch';
import * as _ from 'lodash';

async function api(url, options) {
  console.log('API ', url, options);
  let res = await fetch(url, _.assign({
    method: 'GET',
    credentials: 'same-origin'
  }, options));
  if (res.status >= 400) {
    let json;
    try {
      json = await res.json();
    } catch (e) {
      let error = new Error('Network error!');
      error.status = res.status;
      error.statusText = res.statusText;
      throw error;
    }
    let error = new Error(json.error);
    if (json.code) {
      error.code = json.code;
    }
    error.status = res.status;
    error.statusText = res.statusText;
    throw error;
  }
  try {
    return await res.json();
  } catch (error) {
    throw new Error('Network error! Invalid data!');
  }
}

api.post = async function (url, data, options) {
  let body = JSON.stringify(data || {});
  return api(url, _.assign({
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json'
    }
  }, options));
};

api.upload = async function (url, data, options) {
  let body = new FormData();
  _.each(data, (value, key)=> {
    if (_.isArray(value)) {
      for (let i in value) {
        body.append(key, value[i]);
      }
    } else {
      body.append(key, value);
    }
  });
  return api(url, _.assign({
    method: 'POST',
    body
  }, options));
};

api.del = function (url, options) {
  return api(url, _.assign({
    method: 'DELETE'
  }, options));
};

api.put = function (url, data, options) {
  return api(url, _.assign({
    method: 'PUT',
    body: data
  }, options));
};

api.get = api;

export default api;