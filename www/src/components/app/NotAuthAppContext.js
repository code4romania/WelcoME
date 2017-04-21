import React from 'react'
import PropTypes from 'prop-types'
import NotAuthApp from './NotAuthApp.js'
import SignIn from '../pages/notauth/SignIn'
import SignUp from '../pages/notauth/SignUp'
import Reset from '../pages/notauth/Reset'
import Forget from '../pages/notauth/Forget'

const NotAuthAppContext = (props, context) => {
  const state = context.store
  const handlers = context.handlers

  const title = 'WelcoME'
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
    key: 'signin',
    Page: SignIn,
    visible: state.router.pathname === '/signin',
    props: {

    }
  }, {
    key: 'signup',
    Page: SignUp,
    visible: state.router.pathname === '/signup',
    props: {

    }
  }, {
    key: 'forget',
    Page: Forget,
    visible: state.router.pathname === '/forget',
    props: {

    }
  }, {
    key: 'reset',
    Page: Reset,
    visible: state.router.pathname === '/resetPassword',
    props: {

    }
  }])
  return (
    <div>
      <NotAuthApp title={title} links={links(state)} pages={pages(state)} />
    </div>
  )
}

NotAuthAppContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default NotAuthAppContext
