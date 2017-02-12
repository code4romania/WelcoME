import React, {PropTypes} from 'react'
import LoginLink from './LoginLink'
import LoginField from './LoginField'
import LoginMessage from './LoginMessage'

const Form = ({
  fields = [],
  links = [],
  ...props
}, context) => {
  const {forms, auth} = context.store
  const validate = props.validate(forms)
  const handlers = context.handlers
  return (
    <div className='container'>
      <div className='col-md-6 col-md-offset-3'>
        <h2 className='text-center'>{props.title}</h2>
        <LoginMessage message={auth.error && auth.error.message} className='alert alert-danger' />
        <form onSubmit={e => e.preventDefault()}>
          {fields.map(field => (
            <LoginField
              key={field.name}
              {... field}
              className='form-group'
              inputClassName='form-control'
              labelClassName='control-label'
              errorClassName='help-block'
              value={forms[field.name] || ''}
              touched={forms[field.name] !== null && forms[field.name] !== undefined}
              error={validate[field.name]}
            />))}
          <p>
            { links.map(link => (<LoginLink key={link.goTo} {...link} />)) }
          </p>
          <button
            type='submit'
            disabled={!!Object
            .keys(validate)
            .length}
            className='btn btn-primary'
            onClick={() => handlers[props.submitHandler](forms)}>
            {props.submitText}
          </button>
        </form>
      </div>
    </div>
  )
}
Form.propTypes = {
  title: PropTypes.string.isRequired,
  submitHandler: PropTypes.string.isRequired,
  validate: PropTypes.func,
  submitText: PropTypes.string.isRequired,
  fields: PropTypes.array,
  links: PropTypes.array
}

Form.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default Form
