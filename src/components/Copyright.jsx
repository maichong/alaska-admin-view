/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-02-29
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import wrap from '../utils/wrap';
import ContextPure from 'material-ui/lib/mixins/context-pure';
export default class Copyright extends React.Component {

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
    let views = this.context.views;
    let styles = {
      root: {
        background: '#222',
        textAlign: 'center',
        width: '100%',
        height: 20,
        lineHeight: '20px',
        padding: '20px 0',
        position: 'absolute',
        bottom: 0,
        color: '#999',
        fontSize: 12
      },
      p: {
        marginTop: 5
      }
    };
    return wrap(views.wrappers.copyright, <div style={styles.root}>Powered By Alaska</div>);
  }
}
