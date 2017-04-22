import React from 'react'
import PropTypes from 'prop-types'
import NotAuthApp from '../NotAuthApp.js'
import SignIn from '../../pages/notauth/SignIn'
import SignUpContext from '../../pages/notauth/context/SignUpContext'
import Reset from '../../pages/notauth/Reset'
import Forget from '../../pages/notauth/Forget'
import HomeContext from '../../pages/notauth/context/HomeContext'

const NotAuthAppContext = (props, context) => {
  const state = context.store
  const handlers = context.handlers
  const loaded = state.auth.loaded
  const logo = {
    title: 'WelcoME',
    action: () => handlers.goToPath('/')
  }

  const links = state => ([{
    key: 'signin',
    text: 'SignIn',
    visible: !state.auth.uid,
    action: () => handlers.goToPath('/signin'),
    active: state.router.pathname === '/signin'
  }, {
    key: 'signup',
    text: 'SignUp',
    visible: !state.auth.uid,
    action: () => handlers.goToPath('/signup'),
    active: state.router.pathname === '/signup'
  }])
  const pages = state => ([{
    Page: HomeContext,
    visible: state.router.pathname === '/',
    props: {
      key: 'home'
    }
  }, {
    Page: SignIn,
    visible: state.router.pathname === '/signin',
    props: {
      key: 'signin'
    }
  }, {
    Page: SignUpContext,
    visible: state.router.pathname === '/signup',
    props: {
      key: 'signup'
    }
  }, {
    Page: Forget,
    visible: state.router.pathname === '/forget',
    props: {
      key: 'forget'
    }
  }, {
    Page: Reset,
    visible: (state.router.pathname === '/resetPassword') && state.router.oobCode && state.router.email,
    props: {
      key: 'reset'
    }
  }])
  return (
    <div>
      <NotAuthApp loaded={loaded} logo={logo} links={links(state)} pages={pages(state)} />
    </div>
  )
}

NotAuthAppContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default NotAuthAppContext
