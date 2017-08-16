import React, { PureComponent } from 'react';
import SelectField from 'react-md/lib/SelectFields'
import './common.css'

export default class WSelectField extends PureComponent {
  render = () => {
    return (
      <SelectField
        {...this.props}
        className={'welcome-select'}
        label={this.props.label}
        fullWidth />
    );
  }
}
