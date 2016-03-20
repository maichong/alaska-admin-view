/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import wrap from '../utils/wrap';
import shallowEqual from '../utils/shallow-equal';

export default class Menu extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    menu: React.PropTypes.array,
  };

  static contextTypes = {
    views: React.PropTypes.object,
    router: React.PropTypes.object
  };

  static mixins = [
    ContextPure
  ];

  shouldComponentUpdate(props) {
    return !shallowEqual(props, this.props);
  }

  createMenuItem(item, level = 0) {
    //let views = this.state.views;
    let nestedItems = _.map(item.subs, sub => this.createMenuItem(sub, level + 1));
    let me = this;
    let onTouchTap = item.link ? function () {
      me.context.router.push(item.link);
    } : null;
    let el = <ListItem
      onTouchTap={onTouchTap}
      style={{color:'#aaa'}}
      key={item.id}
      nestedItems={nestedItems}
      primaryText={item.label}
    />;
    //let wrappers = _.get(views.wrappers, 'menu-' + item.id.replace(/\./g, '-'));
    //if (wrappers) {
    //  el = wrap(wrappers, el);
    //}
    //el = wrap(views.wrappers.menuItem, el);
    return el;
  }

  render() {
    console.log('Menu.render', this);
    let props = this.props;
    let views = this.context.views;
    let styles = {
      root: {
        background: '#333'
      }
    };
    let el = <List id="menu" style={styles.root}>
      { _.map(props.menu, item => this.createMenuItem(item))}
    </List>;
    return wrap(views.wrappers.menu, el);
  }
}
