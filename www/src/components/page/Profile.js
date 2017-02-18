import React, { PropTypes } from 'react'
import LoginForm from '../loginform/LoginForm'

const fields = [
  { name: 'firstName', label: 'First Name', type: 'input' },
  { name: 'lastName', label: 'Last Name', type: 'input' },
]

const validate = values => {
  const errors = {}
  return errors
}

const Profile = (props, { store }) => {
  const { user } = store.auth
  const userData1 = user ? `${user.uid} - ${user.email}` : ''
  const userData2 = user
    ? `${user.verified ? 'Verified' : 'Not verified'}`
    : 'Not authenticated'

  return (
    <div>
      <h1>Profile</h1>
      <h4> { userData1 }</h4>
      <h5> { userData2 }</h5>

      <LoginForm
        fields={fields}
        submitText='Update'
        title='Edit profile'
        name='editprofile'
        validate={validate}
        submitHandler='requestEditProfile'
      />
    </div>
  )
}

Profile.contextTypes = {
  store: PropTypes.object.isRequired
}
export default Profile
