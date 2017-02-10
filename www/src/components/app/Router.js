import React from 'react'
import Home from './Home'
import Login from './Login'
import Forgot from './Forgot'
import Signup from './Signup'

const Router = (props) => {
  switch (props.router.pathname) {
    case '/':
      return <Home />
    case '/login':
      return <Login {...props} />
    case '/forgot':
      return <Forgot {...props} />
    case '/signup':
      return <Signup {...props} />
    default:
      props.router.goToPath('/')
      return <div />
  }
}

export default Router
