import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'

import './BasicFormField.css'

const BasicFormField = (props, { store, handlers }) => {

  // helpers
  const errorMessage =
    (props.fieldType === 'select' || props.touched) && props.error;

  const onChange = (event, index, value) =>
    handlers.changeFields({
      [props.name]: props.fieldType === 'select'
        ? value
        : props.fieldType === 'switch'
          ? index
          : event.target.value
    })

  const renderSelectField = () => {
    return (
      <SelectField
        className='all-width'
        name={props.name}
        floatingLabelText={props.label}
        disabled={props.disabled}
        hintText={props.label}
        errorText={errorMessage}
        value={props.value}
        onChange={onChange}
        autoWidth>
        {
          props.values(store).map(
            value =>
              <MenuItem
                key={value.id}
                value={value.id}
                primaryText={value.text} />
          )
        }
      </SelectField>
    );
  }

  const renderSwitchField = () => {
    return (
      <Toggle
        name={props.name}
        disabled={props.disabled}
        label={props.label}
        onToggle={onChange}
        toggled={!!props.value} />
    );
  }

  const renderTextField = () => {
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

  const renderField = () => {
    switch(props.fieldType) {
      case 'switch':
        return renderSwitchField();
      case 'select':
        return renderSelectField();
      case 'textfield':
        return renderTextField();
      default:
        return null;
    }
  }

  return (
    <div>
      {renderField()}
    </div>
  );
}

BasicFormField.propTypes = {
  // name of the field
  name: PropTypes.string.isRequired,
  // type of field to render
  fieldType: PropTypes.oneOf(['switch', 'select', 'textfield']).isRequired,
  // values for select list
  values: PropTypes.func,
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

BasicFormField.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default BasicFormField
