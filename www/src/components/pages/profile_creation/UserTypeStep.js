import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid';
import Step from './Step'
import { Text, SelectionGroup } from '../../common/common'
import '../Pages.css'

const UserTypeStep = ({
  onChangeKey,
  getFormValue,
  userTypes,
}) => {
  const renderTitle = () => {
    return (
      <div className='formCenterAlign'>
        <Text type="h2" text="We are glad to have you on our platform." />
      </div>
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
        <SelectionGroup
          id="user-type-selection"
          name="user-type-selection"
          type="radio"
          controls={userTypes}
          onChange={val => onChangeKey('userType', val)}
          defaultValue={getFormValue('userType')}
          required />
      </div>
    );
  }

  const renderStep = () => {
    return (
      <Grid container spacing={40} direction={'column'}>
        <Grid item xs>
          {renderTitle()}
        </Grid>
        <Grid item xs>
          {renderDescription()}
        </Grid>
        <Grid item xs>
          {renderUserTypeSelection(userTypes)}
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

UserTypeStep.propTypes = {
  onChangeKey: PropTypes.func.isRequired,
  getFormValue: PropTypes.func.isRequired,
  userTypes: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
}

export default UserTypeStep;
