import React from 'react'
import PropTypes from 'prop-types'
import Forgot from '../Forgot'
import { emailCheck, isEmpty } from '../../../utils'

const ForgotContext = (p, context) => {
  const state = context.store
  const handlers = context.handlers

  const errors = {}
  if (state.forms.email && !emailCheck(state.forms.email)) {
    errors.email = 'Invalid email address'
  }
  const email = {
    label: 'Email',
    value: state.forms.email || '',
    placeholder: 'Account email',
    error: errors.email || ''
  }
  const valid = state.forms.email && isEmpty(errors)
  return <Forgot
    email={email}
    enableForgot={!!valid}
    requestForgot={() => handlers.requestForgot({email: state.forms.email})}
    onChangeKey={(key, value) => handlers.changeFields({[key]: value})}
    />
}

ForgotContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default ForgotContext
