import React from 'react'
import Form from './Form'

const fields = [
  {
    key: 'email',
    name: 'email',
    label: 'Email',
    type: 'email'
  }, {
    key: 'password',
    name: 'password',
    label: 'Password',
    type: 'password'
  }, {
    key: 'passwordConfirmation',
    name: 'passwordConfirmation',
    label: 'Confirm Password',
    type: 'password'
  }
]

const links = [
  {
    key: 'login',
    pathname: '/login',
    text: 'Already having an account? Sign In'
  }
]

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Please enter an email.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Please enter a password.'
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter a password confirmation.'
  }
  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Passwords do not match'
  }
  return errors
}

const Signup = (props) => (
  <Form
    fields={fields}
    links={links}
    submitText='Sign Up'
    title='Sign up'
    validate={validate}
    submitHandler={props.auth.requestSignup}
    {...props} />)
export default Signup
