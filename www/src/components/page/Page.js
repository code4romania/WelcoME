import React from 'react'
import Route from './Route'
import Home from './Home'
import Login from './Login'
import Forgot from './Forgot'
import Signup from './Signup'
import Profile from './Profile'

const pages = [
  { name: 'home', route: '/', component: Home },
  { name: 'login', visible: state => !state.auth.authenticated, route: '/login', component: Login },
  { name: 'signup', visible: state => !state.auth.authenticated, route: '/signup', component: Signup },
  { name: 'forgot', visible: state => !state.auth.authenticated, route: '/forgot', component: Forgot },
  { name: 'profile', visible: state => state.auth.authenticated, route: '/profile', component: Profile }
]

export default () => (
  <div>
    {pages.map(page => <Route key={page.name} {...page} />)}
  </div>
)
