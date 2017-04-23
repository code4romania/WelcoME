import React from 'react'
import PropTypes from 'prop-types'
import AuthApp from '../AuthApp.js'
import FeedContext from '../../pages/auth/context/FeedContext'
import ProfileContext from '../../pages/auth/context/ProfileContext'
import CampsContext from '../../pages/auth/context/CampsContext'
import AdminContext from '../../pages/auth/context/AdminContext'
import MessagesContext from '../../pages/auth/context/MessagesContext'

const AuthAppContext = (props, context) => {
  const state = context.store
  const handlers = context.handlers
  const loaded = state.auth.loaded
  const user = {
    username: state.auth.email,
    clickProfile: () => handlers.goToPath('/profile'),
    clickSignout: () => handlers.requestSignout()
  }
  const links = state => ([{
    key: 'admin',
    text: 'Admin',
    visible: !!state.auth.uid && state.auth.admin,
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
  }])

  const pages = state => ([ {
    key: 'admin',
    Page: AdminContext,
    visible: !!(state.auth.admin && state.router.pathname === '/admin')
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
  }])

  return (
    <div>
      <AuthApp loaded={loaded} links={links(state)}
        pages={pages(state)} user={user} clickLogo={() => handlers.goToPath('/feed')} />
    </div>
  )
}

AuthAppContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default AuthAppContext
