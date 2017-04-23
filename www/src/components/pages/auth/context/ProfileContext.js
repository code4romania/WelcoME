import React from 'react'
import PropTypes from 'prop-types'
import Profile from '../Profile'
const ProfileContext = (p, context) => {
  const state = context.store
  const auth = state.auth
  const forms = state.forms
  const handlers = context.handlers
  const accountStep1OK = auth.type && auth.emailVerified && auth.firstName && auth.lastName
  const editing = !accountStep1OK || (forms.accountEditStep === 1)
  const panel = {
    cancelLabel: editing ? 'Cancel' : 'Close',
    saveLabel: editing ? 'Save' : 'Edit',
    expanded: !accountStep1OK || (forms.accountStep === 1),
    onExpandToggle: () => {
      if (accountStep1OK) {
        handlers.changeFields({
          accountStep: forms.accountStep === 1 ? 0 : 1
        })
      }
    }
  }
  const profile = {
    onChangeKey: (key, value) => {
      if (editing) {
        handlers.changeFields({[key]: value})
      }
    },
    sendVerifyEmail: () => console.log('Send verify email'),
    editing,
    loaded: auth.loaded,
    emailVerified: auth.emailVerified,
    email: forms.email || auth.email,
    firstName: forms.firstName || auth.firstName,
    lastName: forms.lastName || auth.lastName,
    refugee: (forms.type || auth.type) === 'refugee',
    volunteer: (forms.type || auth.type) === 'volunteer',
    admin: (forms.type || auth.type) === 'admin',
    asylum: (forms.type || auth.type) === 'asylum',
    facebook: !!(auth.facebook && auth.facebookCredential),
    google: !!(auth.google && auth.googleCredential),
    password: auth.password

  }
  return <Profile {...{panel, profile}} />
}

ProfileContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default ProfileContext
