'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plguin;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-26
 * @author Liang <liang@maichong.it>
 */

function plguin(plguins, element) {
  console.log(element);
  return _.map(plguins, function (Plguin, index) {
    return _react2.default.createElement(Plguin, _.assign({}, element.props, { key: index }));
  });
}