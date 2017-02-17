import React, { PropTypes } from 'react'

const Profile = (props, { store }) => {
  const { user } = store.auth
  const userData1 = user ? `${user.uid} - ${user.email}` : ''
  const userData2 = user ? `
     ${user.verified ? 'Verified' : 'Not verified'}
  ` : 'Not authenticated'
  return (
    <div>
      <h1>Profile</h1>
      <h4> { userData1 }</h4>
      <h5> { userData2 }</h5>
    </div>
  )
}

Profile.contextTypes = {
  store: PropTypes.object.isRequired
}
export default Profile
