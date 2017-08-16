import React, { PureComponent } from 'react';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup'
import './common.css'
import WText from './WText'
import omit from 'object.omit'

export default class WSelectionGroup extends PureComponent {

  render = () => {
    return (
      <SelectionControlGroup
        className="welcome-selection"
        {...omit(this.props, 'controls')}
        controls={this.props.controls.map((control) => ({
          value: control.value,
          label: <WText type="s" text={control.label} />
        }))} />
    );
  }
}
