import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import './LoginField.css'

const LoginField = (props, { store, handlers }) => {
  // helpers
  const errorMessage = (props.select || props.touched) && props.error
  const onChange = (event, index, value) => handlers.changeFields({[props.name]: props.select ? value : props.switch ? index : event.target.value})

  const getSelectField = () => {
    return (
      <SelectField
        className='all-width'
        floatingLabelText={props.label}
        disabled={props.disabled}
        hintText={props.label}
        errorText={errorMessage}
        value={props.value}
        onChange={onChange}
        autoWidth >
        {
          props.values(store).map(
            value => <MenuItem key={value.id} value={value.id} primaryText={value.text} />
          )
        }
      </SelectField>
    );
  }

  const getSwitchField = () => {
    return (
      <Toggle
        disabled={props.disabled}
        label={props.label}
        onToggle={onChange}
        toggled={!!props.value} />
    );
  }

  const getTextField = () => {
    return (
      <TextField
        className='all-width'
        onChange={onChange}
        name={props.name}
        value={props.value}
        type={props.type}
        disabled={props.disabled}
        hintText={props.label}
        errorText={errorMessage}
        floatingLabelText={props.label} />
    );
  }

  return (
    <div>
      {
        props.select
          ? getSelectField()
          : props.switch
            ? getSwitchField()
            : getTextField()
      }
    </div>
  )
}

LoginField.propTypes = {
  // if switch
  switch: PropTypes.bool,
  // if select list
  select: PropTypes.bool,
  // values for select list
  values: PropTypes.func,
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
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default LoginField
