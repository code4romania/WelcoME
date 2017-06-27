import React from 'react'
import PropTypes from 'prop-types'
import ToastrContext from '../../toastr/ToastrContext'
import App from '../App.js'
import LoadingBar from '../../header/LoadingBar'
import SignInContext from '../../pages/notauth/context/SignInContext'
import SignUpContext from '../../pages/notauth/context/SignUpContext'
import ResetContext from '../../pages/notauth/context/ResetContext'
import ForgotContext from '../../pages/notauth/context/ForgotContext'
import HomeContext from '../../pages/notauth/context/HomeContext'
import CampsVisitorContext from '../../pages/notauth/context/CampsVisitorContext'
import FeedContext from '../../pages/auth/context/FeedContext'
import ProfileContext from '../../pages/auth/context/ProfileContext'
import CampsContext from '../../pages/auth/context/CampsContext'
import AdminContext from '../../pages/auth/context/AdminContext'
import MessagesContext from '../../pages/auth/context/MessagesContext'

// This is the main app entrypoint
const AppContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const loaded = state.auth.loaded;

  // Possible app bar tabs in the Auth context - Camps, Messages, (Admin)
  // TODO: add the rest of the tabs - Timeline, Legal
  const leftLinks = state => ([
    {
      key: 'camps-visitor',
      text: 'See who\'s here',
      visible: !state.auth.uid,
      action: () => handlers.goToPath('/camps-visitor'),
      active: state.router.pathname === '/camps-visitor'
    },
    {
      key: 'feed',
      text: 'Newsfeed',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/feed'),
      active: state.router.pathname === '/feed'
    }, 
    {
      key: 'admin',
      text: 'Admin',
      visible: !!state.auth.uid && (state.auth.type === 'admin'),
      action: () => handlers.goToPath('/admin'),
      active: state.router.pathname === '/admin'
    }, 
    {
      key: 'camps',
      text: 'Camps',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/camps'),
      active: state.router.pathname === '/camps'
    }, 
    {
      key: 'messages',
      text: 'Messages',
      visible: !!state.auth.uid,
      action: () => handlers.goToPath('/messages'),
      active: state.router.pathname === '/messages'
    },
  ]);
    
  const rightLinks = state => ([
    {
      key: 'sign-in',
      icon: 'person_outline',
      text: 'Log in',
      visible: !state.auth.uid,
      action: () => handlers.goToPath('/signin'),
      active: state.router.pathname === '/signin',
    },    
    {
      key: 'profile-settings',
      icon: 'person_outline',
      text: 'Me',
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
        },
      ],     
    }    
  ]);
  
  // All possible paths
  const pages = state => ([
    {
      key: 'home',
      Page: HomeContext,
      visible: state.router.pathname === '/'
    }, {
      key: 'signin',
      Page: SignInContext,
      visible: !state.auth.uid && state.router.pathname === '/signin'
    }, {
      key: 'signup',
      Page: SignUpContext,
      visible: !state.auth.uid && state.router.pathname === '/signup'
    }, {
      key: 'forgot',
      Page: ForgotContext,
      visible: !state.auth.uid && state.router.pathname === '/forgot'
    }, {
      key: 'reset',
      Page: ResetContext,
      visible: !!((state.router.pathname === '/resetPassword') && state.router.oobCode && state.router.email)
    }, {
      key: 'camps-visitor',
      Page: CampsVisitorContext,
      visible: !state.auth.uid && state.router.pathname === '/camps-visitor'
    },    
    {
      key: 'admin',
      Page: AdminContext,
      visible: (state.auth.type === 'admin') && (state.router.pathname === '/admin')
    }, {
      key: 'camps',
      Page: CampsContext,
      visible: !!state.auth.uid && state.router.pathname === '/camps'
    }, {
      key: 'messages',
      Page: MessagesContext,
      visible: !!state.auth.uid && state.router.pathname === '/messages'
    }, {
      key: 'feed',
      Page: FeedContext,
      visible: !!state.auth.uid && state.router.pathname === '/feed'
    }, {
      key: 'profile',
      Page: ProfileContext,
      visible: !!state.auth.uid && state.router.pathname === '/profile'
    },    
  ]);  

  return !state.auth.appLoaded
    ? (<LoadingBar />)
    : (<div>
        <App
          loaded={loaded}
          leftLinks={leftLinks(state)}
          rightLinks={rightLinks(state)}
          pages={pages(state)}
          clickLogo={() => handlers.goToPath('/')} />
        <ToastrContext />
      </div>);    
}

AppContext.contextTypes = {
  store: PropTypes.object,
  handlers: PropTypes.object.isRequired  
}

export default AppContext
