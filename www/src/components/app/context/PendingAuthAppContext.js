import React from 'react'
import PropTypes from 'prop-types'
import ToastrContext from '../../toastr/ToastrContext'
import App from '../App.js'
import UserTypeStepContext from '../../pages/profile_creation/context/UserTypeStepContext'
import ProfileStepContext from '../../pages/profile_creation/context/ProfileStepContext'
import LocationStepContext from '../../pages/profile_creation/context/LocationStepContext'
import SkillsStepContext from '../../pages/profile_creation/context/SkillsStepContext'

// This is the main app entrypoint
const PendingAuthAppContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const loaded = state.auth.loaded;

  const leftLinks = state => ([
    {
      key: 'welcome-profile-creation-link',
      text: 'Welcome',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/welcome-step'),
      active: state.router.pathname === '/welcome-step'
    },
    {
      key: 'profile-profile-creation-link',
      text: 'Profile',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/profile-step'),
      active: state.router.pathname === '/profile-step'
    },
    {
      key: 'location-profile-creation-link',
      text: 'Location',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/location-step'),
      active: state.router.pathname === '/location-step'
    },
    {
      key: 'skills-profile-creation-link',
      text: 'Skills',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/skills-step'),
      active: state.router.pathname === '/skills-step'
    },
  ]);

  // All possible paths
  const pages = state => ([
    {
      key: 'welcome-profile-creation-page',
      Page: UserTypeStepContext,
      visible: state.router.pathname === '/welcome-step'
    },
    {
      key: 'profile-profile-creation-page',
      Page: ProfileStepContext,
      visible: state.router.pathname === '/profile-step'
    },
    {
      key: 'location-profile-creation-page',
      Page: LocationStepContext,
      visible: state.router.pathname === '/location-step'
    },
    {
      key: 'skills-profile-creation-page',
      Page: SkillsStepContext,
      visible: state.router.pathname === '/skills-step'
    },
  ]);

  return !loaded
    ? (<App
        loaded={false}
        logo={{}}
        leftLinks={[]}
        rightLinks={[]}
        pages={[]} />)
    : (<div>
        <App
          loaded={loaded}
          leftLinks={leftLinks(state)}
          rightLinks={[]}
          pages={pages(state)} />
        <ToastrContext />
      </div>);
}

PendingAuthAppContext.contextTypes = {
  store: PropTypes.object,
  handlers: PropTypes.object.isRequired
}

export default PendingAuthAppContext
