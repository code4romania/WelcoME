import React from 'react'
import Form from './Form'

const fields = [
  { key: 'email', name: 'email', label: 'Email', type: 'email' },
  { key: 'password', name: 'password', label: 'Password', type: 'password' }
]

const links = [
  { key: 'forgot', pathname: '/forgot', text: 'Forgot your password?' }
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
  return errors
}

const Login = (props) => (
  <Form
    fields={fields}
    links={links}
    submitText='Sign In'
    title='Sign In'
    validate={validate}
    submitHandler='requestLogin'
    {...props} />
)
export default Login
