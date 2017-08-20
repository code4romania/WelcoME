import React, { PureComponent } from 'react';
import SelectField from 'react-md/lib/SelectFields'
import './common.css'
import classnames from 'classnames'

export default class WSelectField extends PureComponent {
  render = () => {
    return (
      <SelectField
        {...this.props}
        className={classnames('welcome-input', 'welcome-select')}
        fullWidth />
    );
  }
}
