import React from 'react';
import PropTypes from 'prop-types'
import HorizontalLinearStepper from '../Stepper'
import UserTypeStepContext from './UserTypeStepContext'
import ProfileStepContext from './ProfileStepContext'
import LocationStepContext from './LocationStepContext'
import SkillsStepContext from './SkillsStepContext'

const StepperContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;

  const steps = state => ([
    {
      key: 'welcome-profile-creation-link',
      title: 'Welcome',
      action: () => handlers.goToPath('/welcome-step'),
      active: state.router.pathname === '/welcome-step',
      Page: UserTypeStepContext,
    },
    {
      key: 'profile-profile-creation-link',
      title: 'Profile',
      action: () => handlers.goToPath('/profile-step'),
      active: state.router.pathname === '/profile-step',
      Page: ProfileStepContext,
    },
    {
      key: 'location-profile-creation-link',
      title: 'Location',
      action: () => handlers.goToPath('/location-step'),
      active: state.router.pathname === '/location-step',
      Page: LocationStepContext,
    },
    {
      key: 'skills-profile-creation-link',
      title: 'Skills',
      action: () => handlers.goToPath('/skills-step'),
      active: state.router.pathname === '/skills-step',
      Page: SkillsStepContext,
    },
  ]);

  const requestSaveProfile = () => handlers.requestCompleteProfile(
    Object.assign(
      {},
      state.forms.account,
      state.auth,
    )
  );

  return (
    <HorizontalLinearStepper
      steps={steps(state)}
      onSubmit={requestSaveProfile}
    />
  );
}

StepperContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
}

export default StepperContext
