import React from 'react'
import PropTypes from 'prop-types'
import AuthApp from '../AuthApp.js'
import Home from '../../pages/auth/Home'
import Profile from '../../pages/auth/Profile'

const AuthAppContext = (props, context) => {
  const state = context.store
  const handlers = context.handlers

  const links = state => ([{
    key: 'home',
    text: 'Home',
    visible: !!state.auth.uid,
    action: () => handlers.goToPath('/'),
    active: state.router.pathname === '/'
  }, {
    key: 'profile',
    text: 'Profile',
    visible: !!state.auth.uid,
    action: () => handlers.goToPath('/profile'),
    active: state.router.pathname === '/profile'
  }, {
    key: 'signout',
    text: 'SignOut',
    visible: !!state.auth.uid,
    action: () => handlers.requestSignout()
  }])

  const pages = state => ([{
    Page: Home,
    visible: state.router.pathname === '/',
    props: {
      key: 'home'
    }
  }, {
    Page: Profile,
    visible: state.router.pathname === '/profile',
    props: {
      key: 'profile'
    }
  }])
  return (
    <div>
      <AuthApp links={links(state)} pages={pages(state)} />
    </div>
  )
}

AuthAppContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default AuthAppContext
