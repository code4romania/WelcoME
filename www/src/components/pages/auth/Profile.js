import React from 'react'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel'
import Account from './profile/Account'
import AccountHeader from './profile/AccountHeader'

const Profile = ({panel, profile}) => {
  return (
    <ExpansionList>
      <ExpansionPanel closeOnSave={false} {...panel} label={<AccountHeader {...profile} />}>
        <Account {...profile} />
      </ExpansionPanel>
    </ExpansionList>
  )
}

export default Profile
