import React from 'react'
import PropTypes from 'prop-types'
import FileUpload from 'react-md/lib/FileInputs/FileUpload'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Step from './Step'
import '../Pages.css'
import { Text, TextField, SelectionGroup, SelectField, DatePicker } from '../../common/common'

const ProfileCreationStep = ({
  onChangeKey,
  getFormValue,
  email,
  gender,
  nationality,
  family,
  onLoad,
  imageURL,
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
              defaultValue={getFormValue('firstName')}
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
              defaultValue={getFormValue('lastName')}
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
              controls={gender}
              onChange={val => onChangeKey('gender', val)}
              defaultValue={getFormValue('gender')} />
          </Col>
        </Row>
        <Row>
          <Col xs className="formCenterAlign">
            <DatePicker
              id="birthDate"
              label={'Date of birth'}
              onChange={val => onChangeKey('birthday', val)}
              required
              maxDate={new Date()}
              defaultValue={getFormValue('birthday')} />
          </Col>
        </Row>
        <Row>
          <Col xs className="formCenterAlign">
            <SelectField
              id="nationality"
              label="Nationality"
              menuItems={nationality}
              onChange={val => onChangeKey('nationality', val)}
              defaultValue={getFormValue('nationality')}
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
              defaultValue={getFormValue('phoneNumber')}
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
              defaultValue={email.value || getFormValue('email')}
              disabled={email.disabled}
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
                controls={family}
                defaultValue={getFormValue('family')}
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
  onChangeKey: PropTypes.func.isRequired,
  getFormValue: PropTypes.func.isRequired,
  email: PropTypes.shape({
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
  }).isRequired,
  gender: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  nationality: PropTypes.arrayOf(PropTypes.string).isRequired,
  family: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  imageURL: PropTypes.string,
  onLoad: PropTypes.func.isRequired,
}

export default ProfileCreationStep
