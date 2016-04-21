/**
 * API Client
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-25
 * @author Liang <liang@maichong.it>
 */

import './formdata';
import 'whatwg-fetch';
import _isObject from 'lodash/isObject';
import _forEach from 'lodash/forEach';
import _assign from 'lodash/assign';

async function api(url, options) {
  console.log('API ', url, options);
  let res = await fetch(url, _assign({
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
  if (hasFile(data)) {
    let body = new FormData();
    _forEach(data, (value, key)=> {
      if (Array.isArray(value)) {
        for (let i in value) {
          body.append(key, value[i]);
        }
      } else {
        body.append(key, value);
      }
    });
    return api(url, _assign({
      method: 'POST',
      body
    }, options));
  }
  return api(url, _assign({
    method: 'POST',
    body: JSON.stringify(data || {}),
    headers: {
      'Content-Type': 'application/json'
    }
  }, options));
};

api.del = function (url, options) {
  return api(url, _assign({
    method: 'DELETE'
  }, options));
};

api.put = function (url, data, options) {
  return api(url, _assign({
    method: 'PUT',
    body: data
  }, options));
};

api.get = api;

export default api;

function hasFile(data) {
  if (!data) {
    return false;
  }
  if (_isObject(data) || Array.isArray(data)) {
    for (let i in data) {
      if (data[i] instanceof File) {
        return true;
      }
      if (_isObject(data[i]) || Array.isArray(data[i])) {
        if (hasFile(data[i])) {
          return true;
        }
      }
    }
  }
  return false;
}
