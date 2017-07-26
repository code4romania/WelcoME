import React from 'react'
import ProfileCreationStep from '../ProfileCreationStep'
import { nationalities} from '../../../utils'
const ProfileStepContext = () => {
  return (
    <ProfileCreationStep {...{nationalities}}/>
  );
}

export default ProfileStepContext
