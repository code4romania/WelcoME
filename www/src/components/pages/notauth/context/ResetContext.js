import React from 'react'
import PropTypes from 'prop-types'
import Reset from '../Reset'
import { isEmpty } from '../../../utils'

const ResetContext = (p, context) => {
  const state = context.store
  const handlers = context.handlers
  const forms = state.forms.signup
  const errors = {}
  if (forms.password && (forms.password.length < 6)) {
    errors.password = 'Min length of six chars'
  }

  const password = {
    label: 'Password',
    value: forms.password || '',
    error: errors.password || ''
  }
  const valid = forms.password && isEmpty(errors)
  return <Reset
    loaded={state.auth.loaded}
    password={password}
    enableReset={!!valid}
    requestReset={() => handlers.requestReset({
      email: state.router.email,
      password: forms.password,
      oobCode: state.router.oobCode
    })}
    onChangeKey={(key, value) => handlers.changeFields('signup', {[key]: value})}
    />
}

ResetContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default ResetContext
