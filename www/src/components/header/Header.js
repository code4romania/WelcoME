import React from 'react'
import Link from './Link'

const links = [
  { name: 'profile', visible: state => state.auth.authenticated, text: 'Profile', route: '/profile' },
  { name: 'signout', visible: state => state.auth.authenticated, text: 'Sign Out', action: 'requestSignout' },
  { name: 'login', visible: state => !state.auth.authenticated, text: 'Sign In', route: '/login' },
  { name: 'signup', visible: state => !state.auth.authenticated, text: 'Sign Up', route: '/signup' }
].map(link => ({...link, className: 'nav-link', liClassName: 'nav-item'}))

export default () => (
  <nav className='navbar navbar-default'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <Link className='navbar-brand' simple route='/'>Welcome</Link>
      </div>
      <ul className='nav navbar-nav navbar-right'>
        {links.map(link => (
          <Link key={link.name} {...link} />
        ))}
      </ul>
    </div>
  </nav>
)

