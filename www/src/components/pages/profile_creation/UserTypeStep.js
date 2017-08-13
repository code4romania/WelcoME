import React from 'react'
import PropTypes from 'prop-types'
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup'
import {Grid, Row, Col} from 'react-flexbox-grid'
import Divider from 'react-md/lib/Dividers'
import Step from './Step'
import WText from '../../common/WText'
import '../Pages.css'

const UserTypeStep = ({
  userTypes,
  selectedType,
  onChangeKey,
}) => {

  const renderTitle = () => {
    return (
      <div>
        <WText type="h3" text="We are glad to have you on our platform." />
      </div>
    );
  }

  const renderDescription = () => {
    return (
      <div>
        <WText
          type="label"
          text="
            Our goal is to connect communities with refugees and asylum seekers.
            Let's find out a few things about you, so we can guide your through the platform in not time!
          "/>
      </div>
    );
  }

  const renderUserTypeSelection = (userTypes) => {
    return (
      <div>
        <WText
          type="label"
          text="You identify yourself as one of the following:" />
        <SelectionControlGroup
          id="user-type-selection"
          name="user-type-selection"
          type="radio"
          controls={userTypes.map((userType) => ({
            value: userType.value,
            label: <WText type="label" text={userType.label} />
          }))}
          value={selectedType}
          onChange={val => onChangeKey('userType', val)}
          required />
      </div>
    );
  }

  const renderStep = () => {
    return (
      <Grid fluid className='wGrid'>
        <Row className='formRow'>
          <Col xs className='formRowContent'>
            {renderTitle()}
          </Col>
        </Row>
        <Row className='formRow'>
          <Col xs className='formRowContent'>
            {renderDescription()}
          </Col>
        </Row>
        <Row className='formRow'>
          <Col xs className='formRowContent'>
            {renderUserTypeSelection(userTypes)}
          </Col>
        </Row>
      </Grid>
    );
  }

  return (
    <Step>
      {renderStep()}
    </Step>
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
