import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField'
import './LoginField.css'
const LoginField = (props, { handlers }) => {
  // helpers
  const errorMessage = props.touched && props.error
  const onChange = event => handlers.changeFields({[props.name]: event.target.value})

  return (
    <div >
      <TextField className='all-width' onChange={onChange} name={props.name} value={props.value}
        type={props.type}
        disabled={props.disabled}
        hintText={props.label}
        errorText={errorMessage}
        floatingLabelText={props.label}
    />
    </div>
  )
}

LoginField.propTypes = {
  // name of the field
  name: PropTypes.string.isRequired,
  // show error only if touched
  touched: PropTypes.bool,
  // error message
  error: PropTypes.string,
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
