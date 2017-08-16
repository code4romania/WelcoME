import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import FileUpload from 'react-md/lib/FileInputs/FileUpload'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Step from './Step'
import '../Pages.css'
import { Text, TextField, SelectionGroup, SelectField } from '../../common/common'

const ProfileCreationStep = ({
  nationalities,
  controlsGender,
  controlsFamily,
  onChangeKey,
  onLoad,
  imageURL
}) => {
  const renderProfilePic = () => {
    return (
      <Grid fluid className='formContainer'>
        <Row>
          <Col xs className='formCenterAlign'>
            <FileUpload
              id="profileImg"
              name="profileImg"
              label="Select profile Image"
              accept="image/*"
              onLoad={onLoad} />
          </Col>
        </Row>
        <Row>
          <Col xs className='formCenterAlign'>
            <img className="avatar" src={imageURL} alt="avatar"/>
          </Col>
        </Row>
      </Grid>
    );
  }

  const renderProfileData = () => {
    return (
      <Grid fluid className="formVerticalAlign">
        <Row>
          <Col xs className="formCenterAlign">
            <TextField
              id="first-name"
              label="Name"
              required
              onChange={val => onChangeKey('firstName', val)}
              errorText="Please enter your name" />
          </Col>
        </Row>
        <Row>
          <Col xs className="formCenterAlign">
            <TextField
              id="last-name"
              label="Surname"
              required
              onChange={val => onChangeKey('lastName', val)}
              errorText="Please enter your name" />
          </Col>
        </Row>
        <Row>
          <Col xs >
            <SelectionGroup
              id="genders"
              name="genders"
              type="radio"
              required
              inline
              controls={controlsGender}
              onChange={val => onChangeKey('gender', val)} />
          </Col>
        </Row>
        <Row>
          <Col xs className="formCenterAlign">
            <DatePicker
              id="birthDate"
              label={'Date of birth'}
              required
              inline
              onChange={val => onChangeKey('birthDay', val)} />
          </Col>
        </Row>
        <Row>
          <Col xs className="formCenterAlign">
            <SelectField
              id="nationality"
              label="Nationality"
              menuItems={nationalities}
              onChange={val => onChangeKey('nationality', val)}
              required
              errorText="A state is required" />
          </Col>
        </Row>
        <Row>
          <Col xs className="formCenterAlign">
            <TextField
              id="phone"
              label="Phone"
              required
              maxLength={10}
              onChange={val => onChangeKey('phoneNumber', val)}
              errorText="Phone number is required" />
          </Col>
        </Row>
        <Row>
          <Col xs className="formCenterAlign">
            <TextField
              id="email"
              label="Email"
              required
              type="email"
              onChange={val => onChangeKey('email', val)}
              errorText="Email is required" />
          </Col>
        </Row>
        <Row>
          <Col xs className="formVerticalAlign" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
              <Text type="s" text=" Are you here with the family?"/>
          </Col>
          <Col xs className="formVerticalAlign">
              <SelectionGroup
                id="withFamily"
                name="withFamily"
                type="radio"
                required
                inline
                controls={controlsFamily}
                onChange={val => onChangeKey('family', val)} />
          </Col>
        </Row>
      </Grid>
    );
  }

  const renderStep = () => {
    return (
      <Grid fluid className='formContainer'>
        <Row className='formRow'>
          <Col xs={4} className="formRowContent">
            {renderProfilePic()}
          </Col>
          <Col xs={8}>
            {renderProfileData()}
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

ProfileCreationStep.propTypes = {
  nationalities: PropTypes.arrayOf(PropTypes.string).isRequired,
  controlsGender: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  controlsFamily: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onChangeKey: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  imageURL: PropTypes.string,
}

export default ProfileCreationStep
