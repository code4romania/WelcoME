import React from 'react'
import PropTypes from 'prop-types'
import Forgot from '../Forgot'
import { emailCheck, isEmpty } from '../../../utils'

const ForgotContext = (p, context) => {
  const state = context.store
  const handlers = context.handlers
  const forms = state.forms.signup
  const errors = {}
  if (forms.email && !emailCheck(forms.email)) {
    errors.email = 'Invalid email address'
  }
  const email = {
    label: 'Email',
    value: forms.email || '',
    placeholder: 'Account email',
    error: errors.email || ''
  }
  const valid = forms.email && isEmpty(errors)
  return <Forgot
    loaded={state.auth.loaded}
    email={email}
    enableForgot={!!valid}
    requestForgot={() => handlers.requestForgot({email: forms.email})}
    onChangeKey={(key, value) => handlers.changeFields('signup', {[key]: value})}
    />
}

ForgotContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default ForgotContext
