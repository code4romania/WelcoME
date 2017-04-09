import React, {PropTypes} from 'react'
import ProfileCreationForm from '../../forms/authforms/ProfileCreationForm'

const ProfileCreation = (props, context) => {
  const state = context.store;
  const visible = props.visible ? props.visible(state) : true;
  if (!visible) {
    return null;
  }

  return (
    <ProfileCreationForm  />
  );
}

ProfileCreation.propTypes = {
  // visibility function
  visible: PropTypes.func,
}

ProfileCreation.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default ProfileCreation
