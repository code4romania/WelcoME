import React from 'react'
import PropTypes from 'prop-types'
import {Entities} from '../../../../store/constants'
import UserTypeStep from '../UserTypeStep'

const UserTypeStepContext = (props, context)  => {
  const state = context.store;
  const handlers = context.handlers;
  const forms = state.forms.profile;

  const userTypes = [
    {
      value: Entities.userTypes.REFUGEE,
      label: 'Refugee',
    },
    {
      value: Entities.userTypes.ASYLUM_SEEKER,
      label: 'Asylum seeker',
    },
    {
      value: Entities.userTypes.VOLUNTEER,
      label: 'Volunteer',
    },
    {
      value: Entities.userTypes.COMMUNITY_HELPER,
      label: 'Community helper',
    },
  ];

  const currentType = !!forms && !!forms.userType
    ? forms.userType
    : userTypes[0].value;

  return (
    <UserTypeStep
      userTypes={userTypes}
      selectedType={currentType}
      onChangeKey={
        (key, value) => handlers.changeFields('profile', {[key]: value })
      }/>
  );
}

UserTypeStepContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default UserTypeStepContext
