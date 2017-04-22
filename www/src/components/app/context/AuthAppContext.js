import React from 'react'
import PropTypes from 'prop-types'
import AuthApp from '../AuthApp.js'
import HomeContext from '../../pages/auth/context/HomeContext'
import ProfileContext from '../../pages/auth/context/ProfileContext'

const AuthAppContext = (props, context) => {
  const state = context.store
  const handlers = context.handlers
  const loaded = state.auth.loaded
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
    Page: HomeContext,
    visible: state.router.pathname === '/'
  }, {
    Page: ProfileContext,
    visible: state.router.pathname === '/profile'
  }])
  let key = 0
  return (
    <div>
      <AuthApp loaded={loaded} links={links(state)}
        pages={pages(state).map(page => ({key: key++, ...page, loaded}))} />
    </div>
  )
}

AuthAppContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default AuthAppContext
