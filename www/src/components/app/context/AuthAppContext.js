import React from 'react'
import PropTypes from 'prop-types'
import AuthApp from '../AuthApp.js'
import FeedContext from '../../pages/auth/context/FeedContext'
import ProfileContext from '../../pages/auth/context/ProfileContext'
import CampsContext from '../../pages/auth/context/CampsContext'
import AdminContext from '../../pages/auth/context/AdminContext'
import MessagesContext from '../../pages/auth/context/MessagesContext'

//
const AuthAppContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const loaded = state.auth.loaded;
  
  // Possible app bar tabs in the Auth context - Camps, Messages, (Admin)
  // TODO: add the rest of the tabs - Timeline, Legal
  const leftLinks = state => ([
    {
      key: 'feed',
      text: 'Newsfeed',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/feed'),
      active: state.router.pathname === '/feed'
    }, {
      key: 'admin',
      text: 'Admin',
      visible: !!state.auth.uid && (state.auth.type === 'admin'),
      action: () => handlers.goToPath('/admin'),
      active: state.router.pathname === '/admin'
    }, {
      key: 'camps',
      text: 'Camps',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/camps'),
      active: state.router.pathname === '/camps'
    }, {
      key: 'messages',
      text: 'Messages',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/messages'),
      active: state.router.pathname === '/messages'
    }]);
    
  const rightLinks = state => ([
    {
      key: 'profile-settings',
      icon: 'person_outline',
      text: 'Andrei',
      visible: !!state.auth.uid,
      isMenu: true,
      subLinks: [
        {
          key: 'profile',
          text: 'Profile',
          visible: !!state.auth.uid,
          action: () => handlers.goToPath('/profile'),
          active: state.router.pathname === '/profile',        
        }, {
          key: 'sign-out',
          text: 'Log out',
          visible: !!state.auth.uid,
          action: () => handlers.requestSignout(),
          active: state.router.pathname === '/profile',          
        }
      ],     
    }
  ]);

  // All possible paths
  const pages = state => ([
    {
      key: 'admin',
      Page: AdminContext,
      visible: (state.auth.type === 'admin') && (state.router.pathname === '/admin')
    }, {
      key: 'camps',
      Page: CampsContext,
      visible: state.router.pathname === '/camps'
    }, {
      key: 'messages',
      Page: MessagesContext,
      visible: state.router.pathname === '/messages'
    }, {
      key: 'feed',
      Page: FeedContext,
      visible: state.router.pathname === '/feed'
    }, {
      key: 'profile',
      Page: ProfileContext,
      visible: state.router.pathname === '/profile'
    }
  ]);

  return (
    <div>
      <AuthApp
        loaded={loaded}
        leftLinks={leftLinks(state)}
        rightLinks={rightLinks(state)}
        pages={pages(state)}
        clickLogo={() => handlers.goToPath('/home')} />
    </div>
  );
}

AuthAppContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default AuthAppContext
