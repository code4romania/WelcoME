import React, { PureComponent } from 'react';
import TextField from 'react-md/lib/TextFields'
import './common.css'
import classnames from 'classnames'

export default class WTextField extends PureComponent {
  getClassNames = () => {
    return this.props.type === 'password'
      ? classnames(
          'welcome-input',
          'welcome-text-field',
          'welcome-text-field-adjusted',
        )
      : classnames('welcome-input', 'welcome-text-field');
  }

  render = () => {
    return (
      <TextField
        {...this.props}
        fullWidth
        className={this.getClassNames()}
        label={this.props.label} />
    );
  }
}
