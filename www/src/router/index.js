import React from 'react'
import { signOutUser } from '../actions'
import App from '../components/app/App'
import StaticApp from '../components/static/StaticApp'
import Home from '../containers/app/Home'
import StaticHome from '../containers/static/StaticHome'
import Signup from '../containers/static/Signup'
import Login from '../containers/static/Login'
import Forgot from '../containers/static/Forgot'
import Favorites from '../containers/app/Favorites'
import { RequireAuth, RequireNotAuth, IifAuth } from '../containers/special/RequireAuth'

import EditProfile from '../containers/app/EditProfile'

import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router'

const router = (
  <Router history={browserHistory}>
    <Route path='/' component={IifAuth(App, StaticApp)}>
      <IndexRoute component={IifAuth(Home, StaticHome)} />
      <Route path='signup' component={RequireNotAuth(Signup)} />
      <Route path='login' component={RequireNotAuth(Login)} />
      <Route path='forgot' component={RequireNotAuth(Forgot)} />
      <Route path='logout' onEnter={() => signOutUser()} />
      <Route path='favorites' component={RequireAuth(Favorites)} />
      <Route path='editprofile' component={RequireAuth(EditProfile)} />
      <Redirect from='*' to='/' />
    </Route>
  </Router>
)

export default router
