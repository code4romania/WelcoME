import React, { PropTypes } from 'react'
import BasicForm from '../basicform/BasicForm'

const fields = [
  {
    name: 'name',
    label: 'Camp Name',
    type: 'input',
    fieldType: 'textfield'
  }
]

const validate = values => {
  const errors = {};
  return errors;
}

const CampForm = () => {
  return (
    <BasicForm
      fields={fields}
      submitText='Update'
      title='Edit Camp'
      name='updatecamp'
      validate={validate}
      submitHandler='updateCamp' />
  );
}

CampForm.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default CampForm
