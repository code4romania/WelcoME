import React from 'react'
import PropTypes from 'prop-types'
import ToastrContext from '../../toastr/ToastrContext'
import App from '../App.js'
import LoadingBar from '../../header/LoadingBar'
import HomeContext from '../../pages/notauth/context/HomeContext'
import FeedContext from '../../pages/auth/context/FeedContext'
import ProfileContext from '../../pages/auth/context/ProfileContext'
import CampsContext from '../../pages/auth/context/CampsContext'
import MessagesContext from '../../pages/auth/context/MessagesContext'

// This is the main app entrypoint
const AuthAppContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const loaded = state.auth.loaded;

  const logo = {
    action: () => handlers.goToPath('/'),
  }

  // Possible app bar tabs in the Auth context - Camps, Messages, (Admin)
  // TODO: add the rest of the tabs - Timeline, Legal
  const leftLinks = state => ([
    {
      key: 'auth-feed-link',
      text: 'Newsfeed',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/feed'),
      active: state.router.pathname === '/feed'
    }, 
    {
      key: 'auth-camps-link',
      text: 'Camps',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/camps'),
      active: state.router.pathname === '/camps'
    }, 
    {
      key: 'auth-messages-link',
      text: 'Messages',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/messages'),
      active: state.router.pathname === '/messages'
    },
  ]);
    
  const rightLinks = state => ([
    {
      key: 'auth-profile-settings-link',
      icon: 'person_outline',
      text: 'Me',
      visible: !!state.auth.uid,
      isMenu: true,
      subLinks: [
        {
          key: 'auth-profile-link',
          text: 'Profile',
          visible: !!state.auth.uid,
          action: () => handlers.goToPath('/profile'),
          active: state.router.pathname === '/profile',        
        }, {
          key: 'auth-sign-out-link',
          text: 'Log out',
          visible: !!state.auth.uid,
          action: () => handlers.requestSignout(),
          active: state.router.pathname === '/profile',          
        },
      ],     
    }    
  ]);
  
  // All possible paths
  const pages = state => ([
    {
      key: 'home-page',
      Page: HomeContext,
      visible: state.router.pathname === '/'
    },
    {
      key: 'camps-page',
      Page: CampsContext,
      visible: !!state.auth.uid && state.router.pathname === '/camps'
    }, 
    {
      key: 'messages-page',
      Page: MessagesContext,
      visible: !!state.auth.uid && state.router.pathname === '/messages'
    }, 
    {
      key: 'feed-page',
      Page: FeedContext,
      visible: !!state.auth.uid && state.router.pathname === '/feed'
    }, {
      key: 'profile-page',
      Page: ProfileContext,
      visible: !!state.auth.uid && state.router.pathname === '/profile'
    },    
  ]);  

  return !state.auth.appLoaded
    ? (<LoadingBar />)
    : (<div>
        <App
          loaded={loaded}
          logo={logo}
          leftLinks={leftLinks(state)}
          rightLinks={rightLinks(state)}
          pages={pages(state)} />
        <ToastrContext />
      </div>);    
}

AuthAppContext.contextTypes = {
  store: PropTypes.object,
  handlers: PropTypes.object.isRequired  
}

export default AuthAppContext
