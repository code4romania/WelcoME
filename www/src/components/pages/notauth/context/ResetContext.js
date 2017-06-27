import React from 'react'
import PropTypes from 'prop-types'
import Reset from '../Reset'
import { isEmpty } from '../../../utils'

const ResetContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const forms = state.forms.signup;
  const errors = {};

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
  const valid = forms.password && forms.passwordRepeat && isEmpty(errors);

  return (
    <Reset
      loaded={state.auth.loaded}
      password={password}
      passwordRepeat={passwordRepeat}
      enableReset={!!valid}
      requestReset={() => handlers.requestReset({
        email: state.router.email,
        password: forms.password,
        oobCode: state.router.oobCode
      })}
      goToHome={() => handlers.goToPath('/')}
      onChangeKey={(key, value) =>
        handlers.changeFields('signup', {[key]: value})
      } />
  );
}

ResetContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default ResetContext
