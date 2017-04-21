import React from 'react'
import PropTypes from 'prop-types'
import BasicForm from '../../forms/basicform/BasicForm'

const fields = [
  {
    name: 'password',
    fieldType: 'textfield',
    label: 'Password',
    type: 'password'
  }
]

const links = []

const validate = values => {
  const errors = {}

  if (!values.password) {
    errors.password = 'Please enter a password.'
  } else if (values.password.length < 6) {
    errors.password = 'Min length of six chars.'
  }
  return errors
}

const ResetPassword = (props, context) => {
  const state = context.store
  const handlers = context.handlers
  const resetHandler = () => handlers.requestResetPassword({
    ...state.forms,
    oobCode: state.router.oobCode,
    email: state.router.email
  })
  return (
    <BasicForm
      fields={fields}
      links={links}
      submitText='Reset password'
      name='login'
      validate={validate}
      submitCustomHandler={resetHandler} />
  )
}
ResetPassword.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default ResetPassword
