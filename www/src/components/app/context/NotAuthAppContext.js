import React from 'react'
import PropTypes from 'prop-types'
import NotAuthApp from '../NotAuthApp.js'
import SignInContext from '../../pages/notauth/context/SignInContext'
import SignUpContext from '../../pages/notauth/context/SignUpContext'
import ResetContext from '../../pages/notauth/context/ResetContext'
import ForgotContext from '../../pages/notauth/context/ForgotContext'
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
    visible: state.router.pathname === '/'
  }, {
    Page: SignInContext,
    visible: state.router.pathname === '/signin'
  }, {
    Page: SignUpContext,
    visible: state.router.pathname === '/signup'
  }, {
    Page: ForgotContext,
    visible: state.router.pathname === '/forgot'
  }, {
    Page: ResetContext,
    visible: !!((state.router.pathname === '/resetPassword') && state.router.oobCode && state.router.email)
  }])
  let key = 0
  return (
    <div>
      <NotAuthApp loaded={loaded} logo={logo} links={links(state)}
        pages={pages(state).map(page => ({key: key++, ...page, loaded}))} />
    </div>
  )
}

NotAuthAppContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default NotAuthAppContext
