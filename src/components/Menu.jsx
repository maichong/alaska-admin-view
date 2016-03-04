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

import { Link } from 'react-router';

export default class Menu extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    menu: React.PropTypes.array,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      settings: context.settings,
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
      settings: this.context.settings,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.muiTheme) {
      newState.muiTheme = nextContext.muiTheme;
    }
    if (nextContext.views) {
      newState.views = nextContext.views;
    }
    this.setState(newState);
  }

  componentWillUnmount() {
  }


  _itemOnTouchTapHandle(menuObject) {
    console.log(menuObject.id, menuObject.label);
  }

  _createMenuItem(item, level = 0) {
    let views = this.state.views;
    let nestedItems = _.map(item.subs, sub => this._createMenuItem(sub, level + 1));
    let el = <ListItem style={{color:'#aaa'}} key={item.id} nestedItems={nestedItems} primaryText={item.label}/>;
    let wrappers = _.get(views.wrappers, 'menu-' + item.id.replace(/\./g, '-'));
    if (wrappers) {
      el = wrap(wrappers, el);
    }
    el = wrap(views.wrappers.menuItem, el);
    return item.link ? (<Link key={item.id} to={item.link}>{el}</Link>) : el;
  }

  render() {
    let props = this.props;
    let state = this.state;
    let views = this.state.views;
    let styles = {
      root: {
        background: '#333'
      }
    };
    return wrap(views.wrappers.menu, <List id="menu" style={styles.root}>
      { _.map(props.menu, item => this._createMenuItem(item))}
    </List>);
  }
}
