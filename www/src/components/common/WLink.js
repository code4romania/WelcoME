import React, { PureComponent } from 'react';
import './common.css'

export default class Link extends PureComponent {
  render = (props) => {
    return (
      <p className="welcome-p">
        {this.props.preLinkText}
        &nbsp;
        <a
          href="#"
          onClick={this.props.onClick}
          className="welcome-a">
          {this.props.linkText}
        </a>
        &nbsp;
        {this.props.postLinkText}
      </p>
    );
  }
}
