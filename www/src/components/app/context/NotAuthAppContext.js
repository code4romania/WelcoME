import React from 'react'
import PropTypes from 'prop-types'
import NotAuthApp from '../NotAuthApp.js'
import SignInContext from '../../pages/notauth/context/SignInContext'
import SignUpContext from '../../pages/notauth/context/SignUpContext'
import ResetContext from '../../pages/notauth/context/ResetContext'
import ForgotContext from '../../pages/notauth/context/ForgotContext'
import HomeContext from '../../pages/notauth/context/HomeContext'
import CampsVisitorContext from '../../pages/notauth/context/CampsVisitorContext'

const NotAuthAppContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const loaded = state.auth.loaded;
  
  const logo = {
    title: 'WelcoME',
    action: () => handlers.goToPath('/')
  };
  
  const leftLinks = state => ([
    {
      key: 'camps-visitor',
      text: 'See who\'s here',
      visible: !state.auth.uid,
      action: () => handlers.goToPath('/camps'),
      active: state.router.pathname === '/camps'
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
      visible: state.router.pathname === '/signin'
    }, {
      key: 'signup',
      Page: SignUpContext,
      visible: state.router.pathname === '/signup'
    }, {
      key: 'forgot',
      Page: ForgotContext,
      visible: state.router.pathname === '/forgot'
    }, {
      key: 'reset',
      Page: ResetContext,
      visible: !!((state.router.pathname === '/resetPassword') && state.router.oobCode && state.router.email)
    }, {
      key: 'camps',
      Page: CampsVisitorContext,
      visible: state.router.pathname === '/camps'
    }
  ]);

  return (
    <div>
      <NotAuthApp
        loaded={loaded}
        logo={logo}
        leftLinks={leftLinks(state)}
        rightLinks={rightLinks(state)}
        pages={pages(state)}
        clickLogo={() => handlers.goToPath('/home')} />
    </div>
  );
}

NotAuthAppContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default NotAuthAppContext
