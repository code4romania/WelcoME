import React from 'react'
import BasicForm from '../../forms/basicform/BasicForm'
import RaisedButton from 'material-ui/RaisedButton'
import ValidationUtils from '../utils/ValidationUtils'

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
  },
  {
    name: 'passwordConfirm',
    fieldType: 'textfield',
    label: 'Confirm Password',
    type: 'password'
  }
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
  } else if (values.password.length < 6) {
    errors.password = 'Min length of six chars.'
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation.'
  }
  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords do not match'
  }

  return errors
}

const Signup = (props, context) => {
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
          label='Sign-up with Google' />
        <span> OR </span>
        <RaisedButton
          type='submit' onClick={onSignUpWithFb}
          primary
          label='Sign-up with Facebook' />
        <span> OR </span>
      </div>
      <BasicForm
        fields={fields}
        submitText='Sign-up with Email'
        name='signup'
        validate={validate}
        submitHandler='requestSignup' />

    </div>
  )
}

export default Signup
