import React, {PropTypes} from 'react'

const LoginField = (props, { handlers }) => {
  // helpers
  const errorClassName = props.touched && props.error ? 'has-error' : ''
  const errorMessage = props.touched && props.error && <div className={`${props.errorClassName}`}>{props.error}</div>
  const onChange = event => handlers.changeField({key: props.name, value: event.target.value})

  return (
    <fieldset className={`${props.className} ${errorClassName}`}>
      <label className={`${props.labelClassName}`}>{props.label}</label>
      <div>
        <input name={props.name} value={props.value} placeholder={props.label} className={`${props.inputClassName}`} type={props.type} onChange={onChange} />
        {errorMessage}
      </div>
    </fieldset>
  )
}

LoginField.propTypes = {
  // name of the field
  name: PropTypes.string.isRequired,
  // show error only if touched
  touched: PropTypes.bool,
  // error message
  error: PropTypes.string,
  // CSS class for fieldset
  className: PropTypes.string,
  // CSS class for label
  labelClassName: PropTypes.string,
  // CSS class for input
  inputClassName: PropTypes.string,
  // CSS class for input
  errorClassName: PropTypes.string,
  // label text
  label: PropTypes.string,
  // input type
  type: PropTypes.string,
  // input value
  value: PropTypes.any
}

LoginField.contextTypes = {
  handlers: PropTypes.object.isRequired
}
export default LoginField
