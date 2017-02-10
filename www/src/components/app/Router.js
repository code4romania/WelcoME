import React from 'react'
import Home from './Home'
import Login from './Login'


const Router = (props) => {
  switch (props.router.pathname) {
    case '/':
      return <Home />
    case '/login':
      return <Login {...props} />
    case '/forgot':
      return <Login {...props} />
    case '/register':
      return <Login {...props} />
    default:
      return <Home />
  }
}

export default Router
