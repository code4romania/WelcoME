import React from 'react'
import LoginForm from '../../forms/loginform/LoginForm'

const fields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password1', label: 'Password', type: 'password' },
  { name: 'password2', label: 'Confirm Password', type: 'password' },
  {
    select: true,
    name: 'camp',
    label: 'Camp',
    values: state => Object.keys(state.camps.camps || {}).map(cid => ({ id: cid, text: state.camps.camps[cid].name }))
  },
  { switch: true, name: 'volunteer', label: 'Volunteer' }
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
  if (!values.camp) {
    errors.camp = 'Must select a camp'
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
