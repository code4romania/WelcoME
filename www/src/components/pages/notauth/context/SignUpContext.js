import React from 'react'
import PropTypes from 'prop-types'
import SignUp from '../SignUp'
import { emailCheck, isEmpty } from '../../../utils'

const SignUpContext = (props, context) => {
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
  if (
    forms.password &&
    forms.passwordRepeat &&
    (forms.password !== forms.passwordRepeat)
  ) {
    errors.passwordRepeat = 'Passwords do not match';
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
  const passwordRepeat = {
    label: 'Repeat password',
    value: forms.passwordRepeat || '',
    error: errors.passwordRepeat || ''
  };
  const valid =
    forms.email && forms.password && forms.passwordRepeat && isEmpty(errors);

  return (
    <SignUp
      loaded={state.auth.loaded}
      email={email}
      password={password}
      passwordRepeat={passwordRepeat}
      enableSignUp={!!valid}
      requestFacebook={handlers.requestFacebook}
      requestGoogle={handlers.requestGoogle}
      requestSignUp={() =>
        handlers.requestSignUp({email: forms.email, password: forms.password})
      }
      goToSignIn={() => handlers.goToPath('/signin')}
      goToHome={() => handlers.goToPath('/home')}      
      onChangeKey={(key, value) =>
        handlers.changeFields('signup', {[key]: value})
      } />
  );
}

SignUpContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default SignUpContext
