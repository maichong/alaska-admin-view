/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-07-21
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import shallowEqual from '../utils/shallow-equal';
import _map from 'lodash/map';

const { object, array, func, string } = React.PropTypes;

const NULL = <div></div>;

export default class Action extends React.Component {

  static propTypes = {
    model: object,
    action: object,
    selected: array,
    data: object,
    id: string,
    onRefresh: func
  };

  static contextTypes = {
    views: object,
    t: func
  };

  shouldComponentUpdate(props) {
    return !shallowEqual(props, this.props);
  }

  render() {
    let { model, action, selected, disabled, onClick, onRefresh } = this.props;
    if (action.view) {
      let View = this.context.views[action.view];
      if (!View) {
        console.error(`Action view ${action.view} missing`);
        return NULL;
      }
      return React.createElement(View, { model, action, selected, data, onRefresh });
    }
    if (!model.abilities[action.key]) return NULL;
    if (action.needRecords && (!selected || selected.length < action.needRecords)) {
      disabled = true;
    }
    let title;
    if (action.title) {
      title = this.context.t(action.title, model.service.id);
    }
    return (
      <button
        onClick={onClick}
        className={'btn btn-' + (action.style || 'default')}
        key={action.key}
        disabled={disabled}
      >{action.icon ? <i className={'fa fa-'+action.icon}/> : null} {title}</button>
    );
  }
}
