import React, {PropTypes} from 'react'

const LoginLink = ({pathname, handler, children}) => (
  <a onClick={() => handler(pathname)}>
    {children}
  </a>
)

const Field = ({
  name,
  type = 'text',
  label,
  error,
  formKey,
  value,
  touched,
  handler
}) => (
  <fieldset className={`form-group ${touched && error
    ? 'has-error'
    : ''}`}>
    <label className='control-label'>
      {label}
    </label>
    <div>
      <input
        value={value}
        placeholder={label}
        className='form-control'
        type={type}
        onChange={event => handler({formKey, value: event.target.value})} /> {touched && error && <div className='help-block'>{error}</div>}
    </div>
  </fieldset>
)
Field.propTypes = {
  name: PropTypes.string.isRequired,
  formKey: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  handler: PropTypes.func.isRequired
}

LoginLink.propTypes = {
  pathname: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
}

const FormError = ({formError}) => {
  if (formError) {
    return (
      <div className='alert alert-danger'>
        {formError}
      </div>
    )
  }
  return <div />
}

const Form = ({
  fields = [],
  links = [],
  ...props
}) => {
  const validate = props.validate(props.forms)
  return (
    <div className='container'>
      <div className='col-md-6 col-md-offset-3'>
        <h2 className='text-center'>{props.title}</h2>
        <FormError formError={props.auth.error && props.auth.error.message} />
        <form onSubmit={e => e.preventDefault()}>
          {fields.map(field => <Field
            {...field}
            formKey={field.key}
            handler={props.forms.changeField}
            value={props.forms[field.key] || ''}
            touched={props.forms[field.key] !== null && props.forms[field.key] !== undefined}
            error={validate[field.key]} />)}
          <p>
            {links.map(link => (
              <LoginLink {...link} handler={props.router.goToPath}>
                {link.text}
              </LoginLink>
            ))}
          </p>
          <button
            type='submit'
            disabled={!!Object
            .keys(validate)
            .length}
            className='btn btn-primary'
            onClick={() => props.submitHandler(props.forms)}>
            {props.submitText}
          </button>
        </form>
      </div>
    </div>
  )
}
Form.propTypes = {
  title: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  validate: PropTypes.func,
  submitText: PropTypes.string.isRequired,
  fields: PropTypes.array,
  links: PropTypes.array
}

export default Form
