import React from 'react'
import PropTypes from 'prop-types'
import ProfileForm from '../../forms/authforms/ProfileForm'

const fields = [
  {
    name: 'email',
    fieldType: 'textfield',
    label: 'Email',
    type: 'input',
    disabled: true
  },
  {
    name: 'firstName',
    fieldType: 'textfield',
    label: 'First Name',
    type: 'input'
  },
  {
    name: 'lastName',
    fieldType: 'textfield',
    label: 'Last Name',
    type: 'input'
  }
]

const Profile = (props, { store }) => {
  // TODO clean up this
  const user = store.auth
  const userData1 = user.uid ? `${user.uid} - ${user.email}` : ''
  const userData2 = (user.uid
    ? `${user.verified ? 'Verified' : 'Not verified'}`
    : 'Not authenticated') + '   Camp: ' + user.camp
  const userData3 = user.firstName ? `${user.firstName} - ${user.lastName}` : ''
  const userData4 = `${user.volunteer ? 'Volunteer' : 'Refugee'} - ${user.admin ? 'CampAdmin' : 'NoCampAdmin'}  - ${user.owner ? 'Owner' : 'NoOwner'}`

  if (!user.loaded) {
    return null
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
  )
}

Profile.contextTypes = {
  store: PropTypes.object.isRequired
}

export default Profile
