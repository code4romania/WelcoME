import React from 'react'
import PropTypes from 'prop-types'
import Reset from '../Reset'
import { isEmpty } from '../../../utils'

const ResetContext = (p, context) => {
  const state = context.store
  const handlers = context.handlers

  const errors = {}
  if (state.forms.password && (state.forms.password.length < 6)) {
    errors.password = 'Min length of six chars'
  }

  const password = {
    label: 'Password',
    value: state.forms.password || '',
    error: errors.password || ''
  }
  const valid = state.forms.password && isEmpty(errors)
  return <Reset
    password={password}
    enableReset={!!valid}
    requestReset={() => handlers.requestReset({
      email: state.router.email,
      password: state.forms.password,
      oobCode: state.router.oobCode
    })}
    onChangeKey={(key, value) => handlers.changeFields({[key]: value})}
    />
}

ResetContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default ResetContext
