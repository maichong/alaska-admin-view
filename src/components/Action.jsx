/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-07-21
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import shallowEqual from '../utils/shallow-equal';
import _map from 'lodash/map';

const { bool, object, array, func, string } = React.PropTypes;

const NULL = <div></div>;

export default class Action extends React.Component {

  static propTypes = {
    model: object,
    action: object,
    selected: array,
    disabled: bool,
    data: object,
    id: string,
    onClick: func,
    onRefresh: func,
  };

  static contextTypes = {
    views: object,
    t: func
  };

  shouldComponentUpdate(props) {
    return !shallowEqual(props, this.props);
  }

  render() {
    let { model, action, data, selected, disabled, onClick, onRefresh } = this.props;
    const { t } = this.context;
    if (action.view) {
      let View = this.context.views[action.view];
      if (!View) {
        console.error(`Action view ${action.view} missing`);
        return NULL;
      }
      return React.createElement(View, { model, action, selected, data, onRefresh });
    }
    if (!model.abilities[action.key]) return NULL;
    if (!disabled && !data && action.needRecords && (!selected || selected.length < action.needRecords)) {
      disabled = true;
    }
    let title;
    if (action.title) {
      title = t(action.title, model.service.id);
    }
    let el = (
      <button
        onClick={onClick}
        className={'btn btn-' + (action.style || 'default')}
        key={action.key}
        disabled={disabled}
      >{action.icon ? <i className={'fa fa-'+action.icon}/> : null} {title}</button>
    );
    if (action.tooltip) {
      return <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip">{t(action.tooltip)}</Tooltip>}
      >{el}</OverlayTrigger>;
    }
    return el;
  }
}
