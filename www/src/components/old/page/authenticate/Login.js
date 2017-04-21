import React from 'react'
import BasicForm from '../../forms/basicform/BasicForm'
import ValidationUtils from '../utils/ValidationUtils'
import RaisedButton from 'material-ui/RaisedButton'

const fields = [
  {
    name: 'email',
    fieldType: 'textfield',
    label: 'Email',
    type: 'email'
  },
  {
    name: 'password',
    fieldType: 'textfield',
    label: 'Password',
    type: 'password'
  }
]

const links = [
  { goTo: '/forgot', text: 'Forgot your password?' }
]

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Please enter an email.'
  } else if (!ValidationUtils.emailCheck(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Please enter a password.'
  }

  return errors
}

const Login = (props, context) => {
  const handlers = context.handlers
  const onSignUpWithFb = e => {
    e.preventDefault()
    handlers.requestFacebookSignup()
  }

  const onSignUpWithGl = e => {
    e.preventDefault()
    handlers.requestGoogleSignup()
  }
  return (
    <div>
      <div>
        <RaisedButton
          type='submit' onClick={onSignUpWithGl}
          secondary
          label='Sign-in with Google' />
        <span> OR </span>
        <RaisedButton
          type='submit' onClick={onSignUpWithFb}
          primary
          label='Sign-in with Facebook' />
        <span> OR </span>
      </div>
      <BasicForm
        fields={fields}
        links={links}
        submitText='Sign-in with Email'
        name='login'
        validate={validate}
        submitHandler='requestLogin' />
    </div>
  )
}

export default Login
