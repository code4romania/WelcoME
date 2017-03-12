import React from 'react'
import LoginForm from '../../forms/loginform/LoginForm'

const fields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' }
]

const links = [
  { goTo: '/forgot', text: 'Forgot your password?' }
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
  <LoginForm
    fields={fields}
    links={links}
    submitText='Sign In'
    title='Sign In'
    name='login'
    validate={validate}
    submitHandler='requestLogin'
  />
)
export default Login
