import React from 'react'
import PropTypes from 'prop-types'
import BasicFormLink from './BasicFormLink'
import BasicFormField from './BasicFormField'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import './BasicForm.css'

const BasicForm = ({fields = [], links = [], ...props}, context) => {
  const {forms} = context.store

  const handlers = context.handlers

  // helpers
  const validate = props.validate(forms)

  const onSubmit = e => {
    e.preventDefault()
    props.submitHandler ? handlers[props.submitHandler](forms) : props.submitCustomHandler()
  }

  const FieldHelper = field => {
    // helpers for field
    const touched =
      forms[field.name] !== null && forms[field.name] !== undefined
    const value = field.value || forms[field.name] || ''
    const error = validate[field.name]

    return (
      <BasicFormField
        key={field.name}
        {... field}
        value={value}
        touched={touched}
        error={error} />
    )
  }

  const submitDisabled = !!Object.keys(validate).length

  return (
    <form onSubmit={onSubmit}>
      <Card className='card'>
        <CardTitle title={props.title} />
        <CardText>
          {fields.map(FieldHelper)}
          <p>
            {links.map(link => (<BasicFormLink key={link.goTo} {...link} />))}
          </p>
        </CardText>
        <CardActions>
          <FlatButton
            type='submit'
            primary
            disabled={submitDisabled}
            label={props.submitText} />
        </CardActions>
      </Card>
    </form>
  )
}

BasicForm.propTypes = {
  // title of the form
  title: PropTypes.string,
  // on submit what handler to use
  submitHandler: PropTypes.string,
  submitCustomHandler: PropTypes.func,
  // validation function
  validate: PropTypes.func,
  // submit button text
  submitText: PropTypes.string.isRequired,
  // name of form
  name: PropTypes.string.isRequired,
  // the fields
  fields: PropTypes.array,
  // the linked links
  links: PropTypes.array
}

BasicForm.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default BasicForm
