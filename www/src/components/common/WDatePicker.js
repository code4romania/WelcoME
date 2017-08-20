import React, { PureComponent } from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import WButton from './WButton'
import './common.css'
import classnames from 'classnames'

export default class WDatePicker extends PureComponent {
  render = () => {
    return (
      <DatePicker
        {...this.props}
        className={classnames('welcome-input', 'welcome-date-picker')}
        okLabel={
          <WButton label="Ok" buttonHeight={30} />
        }
        cancelLabel={
          <WButton label="Cancel" primary={false} buttonHeight={30} />
        }
        cancelPrimary={true}
        autoOk
        placeholder={'dd/mm/yy'}
        defaultCalendarMode={'year'}
        readOnly={false}
        inline />
    );
  }
}
