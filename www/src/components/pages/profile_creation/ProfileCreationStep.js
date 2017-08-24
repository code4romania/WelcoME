import React from 'react'
import PropTypes from 'prop-types'
import FileUpload from 'react-md/lib/FileInputs/FileUpload'
import Grid from 'material-ui/Grid';
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
      <Grid container direction={'column'} spacing={24}>
        <Grid item xs>
          <FileUpload
            id="profileImg"
            name="profileImg"
            label="Select profile Image"
            accept="image/*"
            onLoad={onLoad} />
        </Grid>
        <Grid item xs>
          <img className="avatar" src={imageURL} alt="avatar"/>
        </Grid>
      </Grid>
    );
  }

  const renderProfileData = () => {
    return (
      <Grid container direction={'column'} spacing={24}>
        <Grid item xs>
          <TextField
            id="first-name"
            label="Name"
            required
            onChange={val => onChangeKey('firstName', val)}
            defaultValue={getFormValue('firstName')}
            errorText="Please enter your name" />
        </Grid>
        <Grid item xs>
          <TextField
            id="last-name"
            label="Surname"
            required
            onChange={val => onChangeKey('lastName', val)}
            defaultValue={getFormValue('lastName')}
            errorText="Please enter your name" />
        </Grid>
        <Grid item xs>
          <SelectionGroup
            id="genders"
            name="genders"
            type="radio"
            required
            inline
            controls={gender}
            onChange={val => onChangeKey('gender', val)}
            defaultValue={getFormValue('gender')} />
        </Grid>
        <Grid item xs>
          <DatePicker
            id="birthDate"
            label={'Date of birth'}
            onChange={val => onChangeKey('birthday', val)}
            required
            maxDate={new Date()}
            defaultValue={getFormValue('birthday')} />
        </Grid>
        <Grid item xs>
          <SelectField
            id="nationality"
            label="Nationality"
            menuItems={nationality}
            onChange={val => onChangeKey('nationality', val)}
            defaultValue={getFormValue('nationality')}
            required
            errorText="A state is required" />
        </Grid>
        <Grid item xs>
          <TextField
            id="phone"
            label="Phone"
            required
            maxLength={10}
            onChange={val => onChangeKey('phoneNumber', val)}
            defaultValue={getFormValue('phoneNumber')}
            errorText="Phone number is required" />
        </Grid>
        <Grid item xs>
          <TextField
            id="email"
            label="Email"
            required
            type="email"
            onChange={val => onChangeKey('email', val)}
            defaultValue={email.value || getFormValue('email')}
            disabled={email.disabled}
            errorText="Email is required" />
        </Grid>
        <Grid item xs>
          <Grid container spacing={24} align={'center'}>
            <Grid item xs>
              <Text type="s" text=" Are you here with the family?"/>
            </Grid>
            <Grid item xs>
              <SelectionGroup
                id="withFamily"
                name="withFamily"
                type="radio"
                required
                inline
                controls={family}
                defaultValue={getFormValue('family')}
                onChange={val => onChangeKey('family', val)} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  const renderStep = () => {
    return (
      <Grid container spacing={40}>
        <Grid item xs={4}>
          {renderProfilePic()}
        </Grid>
        <Grid item xs={8}>
          {renderProfileData()}
        </Grid>
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
