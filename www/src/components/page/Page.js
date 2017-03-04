import React from 'react'
import Route from './Route'
import Home from './Home'
import Login from './Login'
import Forgot from './Forgot'
import Signup from './Signup'
import Profile from './Profile'
import Camps from './camps/Camps'

const pages = [
  { name: 'home', route: '/', component: Home },
  { name: 'login', visible: state => !state.auth.authenticated, route: '/login', component: Login },
  { name: 'signup', visible: state => !state.auth.authenticated, route: '/signup', component: Signup },
  { name: 'forgot', visible: state => !state.auth.authenticated, route: '/forgot', component: Forgot },
  { name: 'profile', visible: state => state.auth.authenticated, route: '/profile', component: Profile },
  { name: 'camps', visible: state => state.auth.profile && state.auth.profile.owner, route: '/camps', component: Camps }
]

export default () => (
  <div>
    {pages.map(page => <Route key={page.name} {...page} />)}
  </div>
)
