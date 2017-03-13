import React from 'react'
import LoginForm from '../../forms/loginform/LoginForm'

const fields = [
  { name: 'email', label: 'Email', type: 'email' }
]

const links = [
  { goTo: '/signup', text: 'Not having an account? Sign Up' }
]

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter an email.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

const Forgot = (props) => {
  return (
    <LoginForm
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
