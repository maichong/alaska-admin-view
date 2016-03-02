/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import wrap from "../utils/wrap"
export default class Locked extends React.Component {

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
      views: context.views
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

  render() {
    let props = this.props;
    let state = this.state;
    let views = this.state.views;
    let styles = {
      root: {
        position:"fixed",
        height:450,
        width:"100%",
        marginTop:0,
        marginLeft:0
      },
      textStyle:{
        "text-align":"center"
      }
    };
    let el = (

    <div style={styles.root}>
      {wrap(views.wrappers.lockedImg,<img width="100%" height="100%" src="/assets/lockedImage.jpg"/>)}
      <div style={styles.textStyle}>
        {wrap(views.wrappers.lockedTitle,<h1>{props.title}</h1>)}
        {wrap(views.wrappers.lockedContent,<p>{props.content}</p>)}
      </div>
    </div>
    );
    return wrap(views.wrappers.lockedTitle,el);
  }
}
