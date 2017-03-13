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
    name: 'password1',
    fieldType: 'textfield',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'password2',
    fieldType: 'textfield',
    label: 'Confirm Password',
    type: 'password',
  },
  {
    name: 'camp',
    fieldType: 'select',
    label: 'Camp',
    values: state => Object
      .keys(state.camps.camps || {})
      .map(cid => ({ id: cid, text: state.camps.camps[cid].name })),
  },
  {
    name: 'volunteer',
    fieldType: 'switch',
    label: 'Volunteer',
  }
]

const links = [
  { goTo: '/login', text: 'Already having an account? Sign In' }
]

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter an email.';
  } else if (!ValidationUtils.emailCheck(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password1) {
    errors.password1 = 'Please enter a password.';
  }
  if (!values.password2) {
    errors.password2 = 'Please enter a password confirmation.';
  }
  if (values.password1 !== values.password2) {
    errors.password1 = 'Passwords do not match';
  }
  if (!values.camp) {
    errors.camp = 'Must select a camp';
  }
  return errors;
}

const Signup = (props) => {
  return (
    <BasicForm
      fields={fields}
      links={links}
      submitText='Sign Up'
      title='Sign up'
      name='signup'
      validate={validate}
      submitHandler='requestSignup' />
  );
}

export default Signup
