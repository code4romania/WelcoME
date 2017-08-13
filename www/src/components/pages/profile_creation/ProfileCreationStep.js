import React from 'react'
import PropTypes from 'prop-types'
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import SelectField from 'react-md/lib/SelectFields'
import TextField from 'react-md/lib/TextFields'
import FileUpload from 'react-md/lib/FileInputs/FileUpload'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Step from './Step'
import WText from '../../common/WText'
import '../Pages.css'

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
        <Row className='formRow'>
          <Col xs className='formRowContent'>
            <FileUpload
              id="profileImg"
              name="profileImg"
              label="Select profile Image"
              accept="image/*"
              onLoad={onLoad} />
          </Col>
        </Row>
        <Row>
          <Col xs className='formRowContent'>
            <img className="avatar" src={imageURL} alt="avatar"/>
          </Col>
        </Row>
      </Grid>
    );
  }

  const renderProfileData = () => {
    return (
      <Grid fluid className='formContainer'>
        <Row>
          <Col xs >
            <SelectionControlGroup
              id="genders"
              name="genders"
              type="radio"
              required
              inline
              controls={controlsGender.map((gender) => ({
                value: gender.value,
                label: <WText type="label" text={gender.label} />
              }))}
              onChange={val => onChangeKey('gender', val)} />
          </Col>
        </Row>
        <Row  className='formRowContent'>
          <Col xs className='formRowContent'>
            <DatePicker
              id="birthDate"
              label={<WText type="label" text="Date of birth" />}
              required
              inline
              onChange={val => onChangeKey('birthDay', val)} />
          </Col>
        </Row>
        <Row className='formRowContent'>
          <Col xs className='formRowContent'>
            <SelectField
              id="nationality"
              label={<WText type="label" text="Nationality" />}
              menuItems={nationalities}
              onChange={val => onChangeKey('nationality', val)}
              required
              errorText="A state is required"
              className="md-cell"
              style={{width: '100%', textAlign: 'left', margin: '0'}} />
          </Col>
        </Row>
        <Row  className='formRowContent'>
          <Col xs className='formRowContent'>
          <TextField
            id="phone"
            label={<WText type="label" text="Phone" />}
            required
            maxLength={10}
            onChange={val => onChangeKey('phoneNumber', val)}
            errorText="Phone number is required" />
          </Col>
        </Row>
        <Row className='formRowContent'>
          <Col xs className='formRowContent'>
            <TextField
              id="email"
              label={<WText type="label" text="Email" />}
              required
              type="email"
              onChange={val => onChangeKey('email', val)}
              errorText="Email is required" />
          </Col>
        </Row>
        <Row className='formRowContent'>
          <Col xs className='formVerticalAlign'>
            <div>
              <WText type="label" text=" Are you here with the family?" />
            </div>
          </Col>
          <Col xs className='formVerticalAlign'>
            <div>
              <SelectionControlGroup
                id="withFamily"
                name="withFamily"
                type="radio"
                required
                inline
                controls={controlsFamily.map((family) => ({
                  value: family.value,
                  label: <WText type="label" text={family.label} />
                }))}
                onChange={val => onChangeKey('family', val)} />
            </div>
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
