import React, {Component, PropTypes} from 'react'
import LoginForm from '../../forms/loginform/LoginForm'

const fields = [
  { name: 'name', label: 'Camp Name', type: 'input' }
]

const validate = values => {
  const errors = {}
  return errors
}

const CampForm = () => {
  return (
    <LoginForm
      fields={fields}
      submitText='Update'
      title='Edit Camp'
      name='updatecamp'
      validate={validate}
      submitHandler='updateCamp'
      />
  )
}

CampForm.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default CampForm
