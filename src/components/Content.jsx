/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import wrap from '../utils/wrap';

export default class Content extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    views: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  render() {
    let props = this.props;
    let views = this.context.views;
    let styles = {
      root: {
        marginLeft: 240
      },
      inner: {
        padding: 20
      }
    };
    return wrap(views.wrappers.content,
      <div id="content" style={styles.root}>
        {
          wrap(views.wrappers.contentInner, <div id="contentInner" style={styles.inner}>{props.children}</div>, this)
        }
      </div>,
      this
    );
  }
}
