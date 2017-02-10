import React, {PropTypes} from 'react'

const LoginLink = ({pathname, handler, children}) => (
  <a onClick={() => handler(pathname)}>
    {children}
  </a>
)

const Field = ({name, type = 'text', label, error, key, value, handler}) => (
  <fieldset className={`form-group ${error ? 'has-error' : ''}`}>
    <label className='control-label'>
      {label}
    </label>
    <div>
      <input value={value} placeholder={label} className='form-control' type={type}
        onChange={event => handler({ key, value: event.target.value })} />
      {error && <div className='help-block'>{error}</div>}
    </div>
  </fieldset>
)
Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  handler: PropTypes.func.isRequired
}

LoginLink.propTypes = {
  pathname: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
}

const Form = ({fields = [], links = [], ...props}) => (
  <div className='container'>
    <div className='col-md-6 col-md-offset-3'>
      <h2 className='text-center'>{props.title}</h2>
      <form onSubmit={e => e.preventDefault()}>
        {fields.map(field => <Field {...field} handler={props.changeFieldHandler} />)}
        <p>
          {links.map(link => (
            <LoginLink {...link} handler={props.linkHandler}>
              {link.text}
            </LoginLink>
            ))}
        </p>
        <button type='submit' className='btn btn-primary' onClick={props.submitHandler}>
          {props.submitText}
        </button>
      </form>
    </div>
  </div>
)
Form.propTypes = {
  title: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  changeFieldHandler: PropTypes.func.isRequired,
  linkHandler: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  fields: PropTypes.array,
  links: PropTypes.array
}

export default Form
