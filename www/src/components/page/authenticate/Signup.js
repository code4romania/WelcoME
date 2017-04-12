import React from 'react'
import BasicForm from '../../forms/basicform/BasicForm'
import RaisedButton from 'material-ui/RaisedButton'
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
  },
  {
    name: 'passwordConfirm',
    fieldType: 'textfield',
    label: 'Confirm Password',
    type: 'password',
  },
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
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation.';
  }
  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords do not match';
  }

  return errors;
}

const Signup = (props, context) => {

  const handlers = context.handlers;

  const onSignUpWithFb = e => {
    e.preventDefault();
    handlers.requestFacebookSignup();
  }

  return (
    <div>
      <BasicForm
        fields={fields}
        submitText='Register'
        name='signup'
        validate={validate}
        submitHandler='requestSignup' />
      <div>
        <form onSubmit={onSignUpWithFb}>
          <RaisedButton
            type='submit'
            primary
            label='Sign-up with Facebook' />
        </form>
      </div>
    </div>
  );
}

export default Signup
