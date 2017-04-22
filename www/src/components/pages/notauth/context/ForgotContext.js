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
  if (state.forms.password && state.forms.password2 && (state.forms.password !== state.forms.password2)) {
    errors.password2 = 'Passwords do not match'
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
  const password2 = {
    label: 'Repeat password',
    value: state.forms.password2 || '',
    error: errors.password2 || ''
  }
  const valid = state.forms.email && state.forms.password && state.forms.password2 && isEmpty(errors)
  return <SignUp
    email={email}
    password={password}
    password2={password2}
    enableSignUpEmail={valid}
    signUpWithFacebook={handlers.requestFacebookSignup}
    signUpWithEmail={() => handlers.requestSignup({email: state.forms.email, password: state.forms.password})}
    onChangeKey={(key, value) => handlers.changeFields({[key]: value})}
    />
}

SignUpContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default SignUpContext
