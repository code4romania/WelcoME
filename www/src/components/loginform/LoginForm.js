import React, {PropTypes} from 'react'
import LoginLink from './LoginLink'
import LoginField from './LoginField'
import LoginMessage from './LoginMessage'

const Form = ({fields = [], links = [], ...props}, context) => {
  const {forms, auth} = context.store
  const handlers = context.handlers
  // helpers
  const validate = props.validate(forms)
  const onSubmit = e => {
    e.preventDefault()
    handlers[props.submitHandler](forms)
  }
  const message = auth.message && auth.message.forms && auth.message.forms.some(form => form === props.name) ? auth.message : null
  const FieldHelper = field => {
            // helpers for field
    const touched = forms[field.name] !== null && forms[field.name] !== undefined
    const value = forms[field.name] || ''
    const error = validate[field.name]
    return (<LoginField key={field.name} {... field} className='form-group' inputClassName='form-control' labelClassName='control-label'
      errorClassName='help-block' value={value} touched={touched} error={error} />)
  }

  const submitDisabled = !!Object.keys(validate).length

  return (
    <div className='container'>
      <div className='col-md-6 col-md-offset-3'>
        <h2 className='text-center'>{props.title}</h2>
        <LoginMessage message={message} />
        <form onSubmit={onSubmit}>
          {fields.map(FieldHelper)}
          <p>
            { links.map(link => (<LoginLink key={link.goTo} {...link} />)) }
          </p>
          <button type='submit' disabled={submitDisabled} className='btn btn-primary'> {props.submitText} </button>
        </form>
      </div>
    </div>
  )
}
Form.propTypes = {
  // title of the form
  title: PropTypes.string.isRequired,
  // on submit what handler to use
  submitHandler: PropTypes.string.isRequired,
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

Form.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default Form
