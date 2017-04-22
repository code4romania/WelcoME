import React from 'react'
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList'
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel'
const Profile = () => {
  return (
    <ExpansionList style={{ padding: 16 }}>
      <ExpansionPanel label='Hello' secondaryLabel='World!' defaultExpanded>
      Razvan
    </ExpansionPanel>
      <ExpansionPanel label='gashsdg' secondaryLabel='gashsdg' >
      Altro
    </ExpansionPanel>
    </ExpansionList>
  )
}

export default Profile
