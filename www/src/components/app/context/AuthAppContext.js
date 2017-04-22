import React from 'react'
import PropTypes from 'prop-types'
import AuthApp from '../AuthApp.js'
import PostsContext from '../../pages/auth/context/PostsContext'
import ProfileContext from '../../pages/auth/context/ProfileContext'
import CampsContext from '../../pages/auth/context/CampsContext'

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
    key: 'camps',
    text: 'Camps',
    visible: !!state.auth.uid && state.auth.admin,
    action: () => handlers.goToPath('/camps'),
    active: state.router.pathname === '/camps'
  }, {
    key: 'posts',
    text: 'Posts',
    visible: !!state.auth.uid,
    action: () => handlers.goToPath('/posts'),
    active: state.router.pathname === '/posts'
  }])

  const pages = state => ([{
    key: 'camps',
    Page: CampsContext,
    visible: state.router.pathname === '/camps'
  }, {
    key: 'posts',
    Page: PostsContext,
    visible: state.router.pathname === '/posts'
  }, {
    key: 'profile',
    Page: ProfileContext,
    visible: state.router.pathname === '/profile'
  }])

  return (
    <div>
      <AuthApp loaded={loaded} links={links(state)}
        pages={pages(state)} user={user} clickLogo={() => handlers.goToPath('/posts')} />
    </div>
  )
}

AuthAppContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default AuthAppContext
