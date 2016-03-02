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
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import wrap from "../utils/wrap"
const menuData =[{
  id:"userManager",
  label: '用户管理',
  icon: 'user',
  type: 'link',
  path: '/users'
}, {
  id:"systemSetting",
  label: '系统设置',
  icon: 'settings',
  type: 'group',
  subs: [{
    id:"cacheSetting",
    label: '缓存设置',
    icon: 'settings',
    type: 'link',
    path: '/settings/cache'
  }, {
    id:"mailSetting",
    label: '邮件设置',
    icon: 'settings',
    type: 'link',
    path: '/settings/email'
  }]
},{
  id:"orderManager",
  label: '订单管理',
  icon: 'order',
  type: 'group',
  subs:[{
    id:"priceManager",
    label: '价格管理',
    icon: 'price',
    type: 'link',
    path: '/order/price'
  }]
}];
export default class Menu extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      menus:this.initMenu()
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
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
  initMenu(){
    let me = this;
    let menus = menuData.map(function (menu){
      if(menu.type == "group"){
        let submenus = menu.subs.map(function (submenu){
          if(submenu.type == "group"){
            let subsubmenus = submenu.subs.map(function (subsubmenu){
              return me.getActionItem(subsubmenu);
            });
            return me.getNodeItem(submenu.label,subsubmenus);
          }else{
            return me.getActionItem(submenu);
          }
        });
        return me.getNodeItem(menu.label,submenus);
      }else {
        return me.getActionItem(menu);
      }
    });
    return menus;
  }
  getNodeItem(label,subs){
    return <ListItem primaryText={label} leftIcon={<ContentSend />} nestedItems={subs} primaryTogglesNestedList={true}/>
  }
  getActionItem(obj){
    return <ListItem primaryText={obj.label} leftIcon={<ContentSend />} onTouchTap={this._itemOnTouchTapHandle.bind(this,obj)}/>
  }
  _itemOnTouchTapHandle(menuObject){
    console.log(menuObject.id,menuObject.label);
  }
  render() {
    let props = this.props;
    let state = this.state;
    let views = this.state.views;
    let styles = {
      root: {}
    };
    let el=( <List>{state.menus}</List>);
    return wrap(views.wrappers.list,el);
  }
}
