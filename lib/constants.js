'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2015 http://maichong.it
 * @date 2015-12-10
 * @author Liang <liang@maichong.it>
 */

var PREFIX = exports.PREFIX = window.PREFIX || '.';

var LOAD = exports.LOAD = 'LOAD';
var LOAD_COMPLETE = exports.LOAD_COMPLETE = 'LOAD_COMPLETE';

var REFRESH_INFO = exports.REFRESH_INFO = 'REFRESH_INFO';
var REFRESH_INFO_COMPLETE = exports.REFRESH_INFO_COMPLETE = 'REFRESH_INFO_COMPLETE';
var REFRESH_INFO_ERROR = exports.REFRESH_INFO_ERROR = 'REFRESH_INFO_ERROR';

var LOGIN = exports.LOGIN = 'LOGIN';
var LOGIN_COMPLETE = exports.LOGIN_COMPLETE = 'LOGIN_COMPLETE';
var LOGIN_ERROR = exports.LOGIN_ERROR = 'LOGIN_ERROR';

var LIST = exports.LIST = 'LIST';
var LIST_COMPLETE = exports.LIST_COMPLETE = 'LIST_COMPLETE';
var LIST_ERROR = exports.LIST_ERROR = 'LIST_ERROR';

var CREATE = exports.CREATE = 'CREATE';
var CREATE_COMPLETE = exports.CREATE_COMPLETE = 'CREATE_COMPLETE';
var CREATE_ERROR = exports.CREATE_ERROR = 'CREATE_ERROR';

var UPDATE = exports.UPDATE = 'UPDATE';
var UPDATE_COMPLETE = exports.UPDATE_COMPLETE = 'UPDATE_COMPLETE';
var UPDATE_ERROR = exports.UPDATE_ERROR = 'UPDATE_ERROR';

var DETAILS = exports.DETAILS = 'DETAILS';
var DETAILS_COMPLETE = exports.DETAILS_COMPLETE = 'DETAILS_COMPLETE';
var DETAILS_ERROR = exports.DETAILS_ERROR = 'DETAILS_ERROR';

var SEARCH = exports.SEARCH = 'SEARCH';
var SEARCH_COMPLETE = exports.SEARCH_COMPLETE = 'SEARCH_COMPLETE';
var SEARCH_ERROR = exports.SEARCH_ERROR = 'SEARCH_ERROR';

var REMOVE = exports.REMOVE = 'REMOVE';
var REMOVE_COMPLETE = exports.REMOVE_COMPLETE = 'REMOVE_COMPLETE';
var REMOVE_ERROR = exports.REMOVE_ERROR = 'REMOVE_ERROR';