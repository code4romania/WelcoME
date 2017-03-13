import React, { PropTypes, Component } from 'react'
import ProfileForm from '../../forms/profileform/ProfileForm'

const fields = [
  { name: 'email', label: 'Email', type: 'input', disabled: true },
  { name: 'firstName', label: 'First Name', type: 'input' },
  { name: 'lastName', label: 'Last Name', type: 'input' }
]

const Profile = (props, { store }) => {

  const { user, profile, profileLoaded } = store.auth;
  const data = profile || {}
  const userData1 = user.uid ? `${user.uid} - ${user.email}` : ''
  const userData2 = (user.uid
    ? `${user.verified ? 'Verified' : 'Not verified'}`
    : 'Not authenticated') + '   Camp: ' + data.camp
  const userData3 = data.firstName ? `${data.firstName} - ${data.lastName}` : ''
  const userData4 = `${data.volunteer ? 'Volunteer' : 'Refugee'} - ${data.admin ? 'CampAdmin' : 'NoCampAdmin'}  - ${data.owner ? 'Owner' : 'NoOwner'}`
  if (!profileLoaded) {
    return null;
  }

  return (
    <div>
      <h1>Profile</h1>
      <h4> { userData1 }</h4>
      <h5> { userData2 }</h5>
      <h5> { userData3 }</h5>
      <h6> { userData4 }</h6>
      <ProfileForm fields={fields} />
    </div>
  );
}

Profile.contextTypes = {
  store: PropTypes.object.isRequired
}

export default Profile
