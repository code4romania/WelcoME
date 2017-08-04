import React from 'react'
import PropTypes from 'prop-types'
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import SelectField from 'react-md/lib/SelectFields'
import TextField from 'react-md/lib/TextFields'
import FontIcon from 'react-md/lib/FontIcons'
import FileUpload from 'react-md/lib/FileInputs/FileUpload'
import {Grid, Row, Col} from 'react-flexbox-grid'
import Divider from 'react-md/lib/Dividers';
import '../Pages.css'

const UserTypeStep = ({
  userTypes,
  selectedType,
  onChangeKey,
}) => {

  const renderTitle = () => {
    return (
      <div>
        <label className="welcome-def-h3">
          We are glad to have you on our platform.
        </label>
      </div>
    );
  }

  const renderDescription = () => {
    return (
      <div>
        <label className="welcome-def-label">
          Our goal is to connect communities with refugees and asylum seekers.
          Let's find out a few things about you, so we can guide your through the platform in not time!
        </label>
      </div>
    );
  }

  const renderUserTypeSelection = (userTypes) => {
    return (
      <div>
        <div className="welcome-def-label">
          You identify yourself as one of the following:
        </div>
        <div>
          <SelectionControlGroup
            id="user-type-selection"
            name="user-type-selection"
            type="radio"
            controls={userTypes}
            value={selectedType}
            onChange={val => onChangeKey('userType', val)}
            required />
        </div>
      </div>
    );
  }

  return (
    <Grid fluid className='formContainer'>
      <Row className='formRow'>
        <Divider />
        <div className='formRowContent'>
          {renderTitle()}
        </div>
        <Divider />
      </Row>
      <Row className='formRow'>
        <Divider />
        <div className='formRowContent'>
          {renderDescription()}
        </div>
        <Divider />
      </Row>
      <Row className='formRow'>
        <Divider />
        <div className='formRowContent'>
          {renderUserTypeSelection(userTypes)}
        </div>
        <Divider />
      </Row>
    </Grid>
  );
}

UserTypeStep.propTypes = {
  userTypes: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  selectedType: PropTypes.string.isRequired,
  onChangeKey: PropTypes.func.isRequired,
}

export default UserTypeStep;
