import React, {PropTypes} from 'react'
import LoginForm from '../../forms/loginform/LoginForm'

class ProfileForm extends React.Component {

  componentDidMount() {
    const {handlers, store} = this.context;
    const editFields = {...store.auth.profile};
    handlers.changeFields(editFields);
  }

  validate = values => {
    const errors = {}
    return errors
  }

  render() {
    return (
      <LoginForm
        fields={this.props.fields}
        submitText='Update'
        title='Edit profile'
        name='editprofile'
        validate={this.validate}
        submitHandler='requestEditProfile' />
    );
  }
}

ProfileForm.propTypes = {
  // Edit profile fields to view/edit
  fields: PropTypes.array.isRequired
}

ProfileForm.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
}

export default ProfileForm;
