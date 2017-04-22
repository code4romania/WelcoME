import React from 'react'
import PropTypes from 'prop-types'
import SignIn from '../SignIn'
import { emailCheck, isEmpty } from '../../../utils'

const SignInContext = (p, context) => {
  const state = context.store
  const handlers = context.handlers

  const errors = {}
  if (state.forms.email && !emailCheck(state.forms.email)) {
    errors.email = 'Invalid email address'
  }
  if (state.forms.password && (state.forms.password.length < 6)) {
    errors.password = 'Min length of six chars'
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

  const valid = state.forms.email && state.forms.password && isEmpty(errors)
  return <SignIn
    loaded={state.auth.loaded}
    email={email}
    password={password}
    enableSignIn={!!valid}
    requestFacebook={handlers.requestFacebook}
    requestGoogle={handlers.requestGoogle}
    goForgot={() => handlers.goToPath('/forgot')}
    requestSignIn={() => handlers.requestSignIn({email: state.forms.email, password: state.forms.password})}
    onChangeKey={(key, value) => handlers.changeFields({[key]: value})}
    />
}

SignInContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default SignInContext
