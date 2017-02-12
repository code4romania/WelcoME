import React from 'react'
import LoginForm from '../loginform/LoginForm'

const fields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password1', label: 'Password', type: 'password' },
  { name: 'password2', label: 'Confirm Password', type: 'password' }
]

const links = [
  { goTo: '/login', text: 'Already having an account? Sign In' }
]

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Please enter an email.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password1) {
    errors.password1 = 'Please enter a password.'
  }
  if (!values.password2) {
    errors.password2 = 'Please enter a password confirmation.'
  }
  if (values.password1 !== values.password2) {
    errors.password1 = 'Passwords do not match'
  }
  return errors
}

const Signup = (props) => (
  <LoginForm
    fields={fields}
    links={links}
    submitText='Sign Up'
    title='Sign up'
    name='signup'
    validate={validate}
    submitHandler='requestSignup'
  />)
export default Signup
