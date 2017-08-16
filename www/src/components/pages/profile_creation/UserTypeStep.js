import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col} from 'react-flexbox-grid'
import Step from './Step'
import { Text, SelectionGroup } from '../../common/common'
import '../Pages.css'

const UserTypeStep = ({
  userTypes,
  selectedType,
  onChangeKey,
}) => {

  const renderTitle = () => {
    return (
      <Text type="h2" text="We are glad to have you on our platform." />
    );
  }

  const renderDescription = () => {
    return (
      <div>
      <Text type="p" text="Our goal is to connect communities with refugees and asylum seekers. "/>
      <Text type="p" text="Let's find out a few things about you, so we can guide your through the platform in not time!"/>
      </div>
  );
  }

  const renderUserTypeSelection = (userTypes) => {
    return (
      <div>
        <Text type="p" text="You identify yourself as one of the following:" />
        <div className='formCenterAlign'>
          <SelectionGroup
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

  const renderStep = () => {
    return (
      <Grid fluid className='formContainer'>
        <Row>
          <Col xs className='formVerticalAlign'>
            {renderTitle()}
          </Col>
        </Row>
        <Row>
          <Col xs className='formVerticalAlign'>
            {renderDescription()}
          </Col>
        </Row>
        <Row>
          <Col xs className='formVerticalAlign'>
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
