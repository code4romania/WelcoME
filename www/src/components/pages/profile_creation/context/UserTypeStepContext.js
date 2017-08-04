import React from 'react'
import PropTypes from 'prop-types'
import UserTypeStep from '../UserTypeStep'

const UserTypeStepContext = (props, context)  => {
  const state = context.store;
  const handlers = context.handlers;
  const forms = state.forms.account;

  const userTypes = [
    {
      value: 'refugee',
      label: 'Refugee',
    },
    {
      value: 'asylum-seeker',
      label: 'Asylum seeker',
    },
    {
      value: 'community-helper',
      label: 'Community helper',
    },
  ];

  const currentType = !!forms.userType
    ? forms.userType
    : userTypes[0].value;

  return (
    <UserTypeStep
      userTypes={userTypes}
      selectedType={currentType}
      onChangeKey={
        (key, value) => handlers.changeFields('account', {[key]: value })
      }/>
  );
}

UserTypeStepContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default UserTypeStepContext
