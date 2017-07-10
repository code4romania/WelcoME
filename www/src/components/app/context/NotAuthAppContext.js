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

const NotAuthAppContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const loaded = state.auth.loaded;

  const logo = {
    action: () => handlers.goToPath('/'),
  }

  const leftLinks = state => ([
    {
      key: 'not-auth-camps-visitor-link',
      text: 'See who\'s here',
      visible: !state.auth.uid,
      action: () => handlers.goToPath('/camps-visitor'),
      active: state.router.pathname === '/camps-visitor'
    },
  ]);

  const rightLinks = state => ([
    {
      key: 'not-auth-sign-in-link',
      icon: 'person_outline',
      text: 'Log in',
      visible: !state.auth.uid,
      action: () => handlers.goToPath('/signin'),
      active: state.router.pathname === '/signin' || state.router.pathname === '/signup' || state.router.pathname === '/forgot' || state.router.pathname === '/resetPassword',
    },
  ]);

  // All possible paths
  const pages = state => ([
    {
      key: 'home-page',
      Page: HomeContext,
      visible: state.router.pathname === '/'
    },
    {
      key: 'signin-page',
      Page: SignInContext,
      visible: !state.auth.uid && state.router.pathname === '/signin'
    },
    {
      key: 'signup-page',
      Page: SignUpContext,
      visible: !state.auth.uid && state.router.pathname === '/signup'
    },
    {
      key: 'forgot-page',
      Page: ForgotContext,
      visible: !state.auth.uid && state.router.pathname === '/forgot'
    },
    {
      key: 'reset-page',
      Page: ResetContext,
      visible: !!((state.router.pathname === '/resetPassword') && state.router.oobCode && state.router.email)
    },
    {
      key: 'camps-visitor-page',
      Page: CampsVisitorContext,
      visible: !state.auth.uid && state.router.pathname === '/camps-visitor'
    },
  ]);

  return !state.auth.appLoaded
    ? (<App
        loaded={false}
        logo={{}}
        leftLinks={[]}
        rightLinks={[]}
        pages={[]} />)
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

NotAuthAppContext.contextTypes = {
  store: PropTypes.object,
  handlers: PropTypes.object.isRequired
}

export default NotAuthAppContext
