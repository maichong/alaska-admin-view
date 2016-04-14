/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import wrap from '../utils/wrap';
import shallowEqual from '../utils/shallow-equal';
import _ from 'lodash';
import { Label } from 'react-bootstrap';

export default class Menu extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    items: React.PropTypes.array,
    level: React.PropTypes.number,
  };

  static contextTypes = {
    views: React.PropTypes.object,
    t: React.PropTypes.func,
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      activated: '',
      opened: '',
    };
  }

  shouldComponentUpdate(props, state) {
    return state.activated != this.state.activated || state.opened != this.state.opened || !shallowEqual(props, this.props);
  }

  createMenuItem(item, level) {
    const t = this.context.t;
    let subMenu;
    let me = this;
    let itemId = item.id;
    let activated = this.state.activated == itemId;
    let hasSubs = item.subs && item.subs.length;
    let opened = this.state.opened == itemId;
    if (opened && hasSubs) {
      function onSelect() {
        me.setState({ activated: '' });
      }

      subMenu = <Menu items={item.subs} level={level + 1} onSelect={onSelect}/>
    }

    function onClick() {
      if (item.link) {
        me.context.router.push(item.link);
      }
      if (hasSubs) {
        if (!opened) {
          me.setState({ opened: itemId });
        }
      } else if (!activated) {
        me.props.onSelect && me.props.onSelect(itemId);
        me.setState({ activated: itemId, opened: '' });
      }
    }

    let className = activated ? 'activated' : '';
    if (opened) {
      className = 'opened';
    }
    let icon = item.icon || 'hashtag';
    let subsIcon = !hasSubs ? null : opened ? 'up' : 'down';
    if (subsIcon) {
      subsIcon = <i className={'has-subs-icon fa fa-angle-'+subsIcon}/>;
    }
    let badge = item.badge ? <Label bsStyle={item.badgeStyle}>{item.badge}</Label> : null;
    let el = (
      <li key={item.id} className={className}>
        <a href="javascript:void(0)" onClick={onClick}>
          <i className={'fa fa-'+icon}/>
          {t(item.label, item.service)}
          {badge}
          {subsIcon}
        </a>
        {subMenu}
      </li>
    );
    return el;
  }

  render() {
    let props = this.props;
    let level = this.props.level || 0;
    let items = _.map(props.items, item => this.createMenuItem(item, level));
    return <ul id={props.id} className="sidebar-menu">
      { items }
    </ul>;
  }
}
