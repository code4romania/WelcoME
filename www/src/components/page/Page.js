import React from 'react'
import Route from './Route'
import Home from './Home'
import Login from './Login'
import Forgot from './Forgot'
import Signup from './Signup'

export default () => (
  <div>
    <Route to='/'><Home /></Route>
    <Route notAuth to='/login'><Login /></Route>
    <Route notAuth to='/signup'><Signup /></Route>
    <Route notAuth to='/forgot'><Forgot /></Route>
    <Route auth to='/signout' />
  </div>
)
