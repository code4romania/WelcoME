import React, { PropTypes, Component } from 'react'
import LoginForm from '../loginform/LoginForm'

const fields = [
  { name: 'firstName', label: 'First Name', type: 'input' },
  { name: 'lastName', label: 'Last Name', type: 'input' }
]

const validate = values => {
  const errors = {}
  return errors
}

class ProfileForm extends Component {
  componentDidMount () {
    const {handlers, store} = this.context
    const editFields = store.auth.profile && store.auth.profile.data
    handlers.changeFields(editFields)
  }

  render () {
    return <LoginForm
      fields={fields}
      submitText='Update'
      title='Edit profile'
      name='editprofile'
      validate={validate}
      submitHandler='requestEditProfile'
      />
  }
}
ProfileForm.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

const Profile = (props, { store }) => {
  const { user, profile, profileLoaded } = store.auth
  const data = profile.data || {}
  const userData1 = user.uid ? `${user.uid} - ${user.email}` : ''
  const userData2 = user.uid
    ? `${user.verified ? 'Verified' : 'Not verified'}`
    : 'Not authenticated'
  const userData3 = data.firstName ? `${data.firstName} - ${data.lastName}` : ''
  if (!profileLoaded) {
    return null
  }
  return (
    <div>
      <h1>Profile</h1>
      <h4> { userData1 }</h4>
      <h5> { userData2 }</h5>
      <h5> { userData3 }</h5>
      <ProfileForm />
    </div>
  )
}

Profile.contextTypes = {
  store: PropTypes.object.isRequired
}
export default Profile
