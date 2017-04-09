import React from 'react'
import BasicForm from '../../forms/basicform/BasicForm'
import ValidationUtils from '../utils/ValidationUtils'

const fields = [
  {
    name: 'email',
    fieldType: 'textfield',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    fieldType: 'textfield',
    label: 'Password',
    type: 'password',
  }
]

const links = [
  { goTo: '/forgot', text: 'Forgot your password?' }
]

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email.'
  } else if (!ValidationUtils.emailCheck(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Please enter a password.';
  }

  return errors;
}

const Login = (props) => {
  return (
    <BasicForm
      fields={fields}
      links={links}
      submitText='Login'
      name='login'
      validate={validate}
      submitHandler='requestLogin' />
  );
}

export default Login
