import React from 'react'
import PropTypes from 'prop-types'
import SignUp from '../SignUp'
import { emailCheck, isEmpty } from '../../../utils'

const SignUpContext = (p, context) => {
  const state = context.store
  const handlers = context.handlers

  const errors = {}
  if (state.forms.email && !emailCheck(state.forms.email)) {
    errors.email = 'Invalid email address'
  }
  if (state.forms.password && (state.forms.password.length < 6)) {
    errors.password = 'Min length of six chars'
  }
  if (state.forms.password && state.forms.passwordRepeat && (state.forms.password !== state.forms.passwordRepeat)) {
    errors.passwordRepeat = 'Passwords do not match'
  }

  const email = {
    label: 'Email',
    value: state.forms.email || '',
    placeholder: 'Account email',
    error: errors.email || ''
  }
  const password = {
    label: 'Password',
    value: state.forms.password || '',
    error: errors.password || ''
  }
  const passwordRepeat = {
    label: 'Repeat password',
    value: state.forms.passwordRepeat || '',
    error: errors.passwordRepeat || ''
  }
  const valid = state.forms.email && state.forms.password && state.forms.passwordRepeat && isEmpty(errors)
  return <SignUp
    loaded={state.auth.loaded}
    email={email}
    password={password}
    passwordRepeat={passwordRepeat}
    enableSignUp={!!valid}
    requestFacebook={handlers.requestFacebook}
    requestGoogle={handlers.requestGoogle}
    requestSignUp={() => handlers.requestSignUp({email: state.forms.email, password: state.forms.password})}
    onChangeKey={(key, value) => handlers.changeFields({[key]: value})}
    />
}

SignUpContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default SignUpContext
