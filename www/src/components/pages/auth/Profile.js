import React from 'react'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel'
import Account from './profile/Account'
import AccountHeader from './profile/AccountHeader'
import ProfileStepContext from '../profile_creation/context/ProfileStepContext' 
const Profile = ({panel, profile}) => {
  return (
    <ExpansionList>
      <ExpansionPanel closeOnSave={false} closeOnCancel={false} {...panel} label={<AccountHeader {...profile} />}>
        <Account {...profile} />
      </ExpansionPanel>
          <ExpansionPanel closeOnSave={false} closeOnCancel={false}>
        <ProfileStepContext/>
      </ExpansionPanel>
    </ExpansionList>
  );
}

export default Profile
