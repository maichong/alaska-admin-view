/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-21
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import { Panel } from 'react-bootstrap';

export default class FieldGroup extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    let props = this.props;
    return (
      <Panel header={props.name}>
        <form className="form-horizontal">
          {props.children}
        </form>
      </Panel>
    );
  }
}
