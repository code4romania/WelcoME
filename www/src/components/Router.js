import React from 'react'
import Home from './Home'
import Login from './Login'
import Forgot from './Forgot'
import Signup from './Signup'

const Router = (props) => {
  switch (props.router.pathname) {
    case '/':
      return <Home {...props} />
    case '/login':
      if (props.auth.authenticated) {
        props.router.goToPath('/')
      }
      return <Login {...props} />
    case '/forgot':
      if (props.auth.authenticated) {
        props.router.goToPath('/')
      }
      return <Forgot {...props} />
    case '/signup':
      if (props.auth.authenticated) {
        props.router.goToPath('/')
      }
      return <Signup {...props} />
    case '/signout':
      if (!props.auth.authenticated) {
        props.router.goToPath('/')
      } else {
        props.auth.signOut()
      }
      return <div />
    default:
      props.router.goToPath('/')
      return <div />
  }
}

export default Router
