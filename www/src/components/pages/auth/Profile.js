import React from 'react'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel'
import Account from './profile/Account'
import AccountHeader from './profile/AccountHeader'
import ProfileStepContext from '../profile_creation/context/ProfileStepContext' 
import LocationStepContext from '../profile_creation/context/LocationStepContext' 
import UserTypeStepContext from '../profile_creation/context/UserTypeStepContext' 

import CustomStepper from '../profile_creation/CustomStepper' 


const Profile = ({panel, profile}) => {
  return (
     <CustomStepper steps = {[
                      <UserTypeStepContext title="Welcome"/>,
                      <ProfileStepContext title="Profile"/>,
                      <LocationStepContext title="Location"/>
                  ]} />
  );
}

export default Profile

