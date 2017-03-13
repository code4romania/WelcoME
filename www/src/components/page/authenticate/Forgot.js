import React from 'react'
import BasicForm from '../../forms/basicform/BasicForm'
import ValidationUtils from '../utils/ValidationUtils'

const fields = [
  { name: 'email', label: 'Email', type: 'email', fieldType: 'textfield'}
]

const links = [
  { goTo: '/signup', text: 'Not having an account? Sign Up' }
]

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter an email.';
  } else if (!ValidationUtils.emailCheck(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

const Forgot = (props) => {
  return (
    <BasicForm
      fields={fields}
      links={links}
      submitText='Search'
      title='Forgot password'
      name='forgot'
      validate={validate}
      submitHandler='requestForgot' />

  );
}

export default Forgot
