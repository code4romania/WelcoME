import React from 'react'
import Link from './Link'

export default () => (
  <nav className='navbar navbar-default'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <Link className='navbar-brand' simple go='/'>Welcome</Link>
      </div>
      <ul className='nav navbar-nav navbar-right'>
        <Link auth liClassName='nav-item' className='nav-link' go='/favorites'>My Favorites</Link>
        <Link auth go='/editprofile'>Profile</Link>
        <Link auth go='/signout'>Sign Out</Link>
        <Link notAuth go='/login'>Sign In</Link>
        <Link notAuth go='/signup'>Sign Up</Link>
      </ul>
    </div>
  </nav>
)
