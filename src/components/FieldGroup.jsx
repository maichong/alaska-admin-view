/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-21
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

export default class FieldGroup extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    let props = this.props
    let el = props.children;
    if (props.form !== false) {
      el = <form className="form-horizontal">
        {el}
      </form>;
    }
    if (props.panel !== false) {
      let heading = props.title ? <div className="panel-heading">{props.title}</div> : null;
      el = <div className="panel panel-default">
        {heading}
        <div className="panel-body">{el}</div>
      </div>;
    }
    return el;
  }
}
