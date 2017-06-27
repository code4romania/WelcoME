import React from 'react'
import PropTypes from 'prop-types'
import SignIn from '../SignIn'
import { emailCheck, isEmpty } from '../../../utils'

const SignInContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const forms = state.forms.signup;
  const errors = {};

  if (forms.email && !emailCheck(forms.email)) {
    errors.email = 'Invalid email address';
  }
  if (forms.password && (forms.password.length < 6)) {
    errors.password = 'Min length of six chars';
  }

  const email = {
    label: 'Email address',
    value: forms.email || '',
    error: errors.email || ''
  };
  const password = {
    label: 'Password',
    value: forms.password || '',
    error: errors.password || ''
  };
  const valid = forms.email && forms.password && isEmpty(errors);

  return (
    <SignIn
      loaded={state.auth.loaded}
      email={email}
      password={password}
      enableSignIn={!!valid}
      requestFacebook={handlers.requestFacebook}
      requestGoogle={handlers.requestGoogle}
      goForgot={() => handlers.goToPath('/forgot')}
      goToSignUp={() => handlers.goToPath('/signup')}
      goToHome={() => handlers.goToPath('/')}
      requestSignIn={() =>
        handlers.requestSignIn({email: forms.email, password: forms.password})
      }
      onChangeKey={(key, value) =>
        handlers.changeFields('signup', {[key]: value})
      } />
  );
}

SignInContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default SignInContext
