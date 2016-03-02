'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('./formdata');

require('whatwg-fetch');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url, options) {
    var res, json, _error, error;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('API ', url, options);
            _context.next = 3;
            return fetch(url, _.assign({
              method: 'GET',
              credentials: 'same-origin'
            }, options));

          case 3:
            res = _context.sent;

            if (!(res.status >= 400)) {
              _context.next = 23;
              break;
            }

            json = undefined;
            _context.prev = 6;
            _context.next = 9;
            return res.json();

          case 9:
            json = _context.sent;
            _context.next = 18;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](6);
            _error = new Error('Network error!');

            _error.status = res.status;
            _error.statusText = res.statusText;
            throw _error;

          case 18:
            error = new Error(json.error);

            if (json.code) {
              error.code = json.code;
            }
            error.status = res.status;
            error.statusText = res.statusText;
            throw error;

          case 23:
            _context.prev = 23;
            _context.next = 26;
            return res.json();

          case 26:
            return _context.abrupt('return', _context.sent);

          case 29:
            _context.prev = 29;
            _context.t1 = _context['catch'](23);
            throw new Error('Network error! Invalid data!');

          case 32:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[6, 12], [23, 29]]);
  }));
  return function api(_x, _x2) {
    return ref.apply(this, arguments);
  };
}(); /**
      * API Client
      * @copyright Maichong Software Ltd. 2016 http://maichong.it
      * @date 2016-02-25
      * @author Liang <liang@maichong.it>
      */

api.post = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(url, data, options) {
    var body;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = (0, _stringify2.default)(data || {});
            return _context2.abrupt('return', api(url, _.assign({
              method: 'POST',
              body: body,
              headers: {
                'Content-Type': 'application/json'
              }
            }, options)));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function (_x3, _x4, _x5) {
    return ref.apply(this, arguments);
  };
}();

api.upload = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(url, data, options) {
    var body;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = new FormData();

            _.each(data, function (value, key) {
              if (_.isArray(value)) {
                for (var i in value) {
                  body.append(key, value[i]);
                }
              } else {
                body.append(key, value);
              }
            });
            return _context3.abrupt('return', api(url, _.assign({
              method: 'POST',
              body: body
            }, options)));

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return function (_x6, _x7, _x8) {
    return ref.apply(this, arguments);
  };
}();

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

exports.default = api;