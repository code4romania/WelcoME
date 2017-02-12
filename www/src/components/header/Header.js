import React from 'react'
import Link from './Link'

export default () => (
  <nav className='navbar navbar-default'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <Link className='navbar-brand' simple goTo='/'>Welcome</Link>
      </div>
      <ul className='nav navbar-nav navbar-right'>
        <Link auth liClassName='nav-item' className='nav-link' goTo='/favorites'>My Favorites</Link>
        <Link auth goTo='/editprofile'>Profile</Link>
        <Link auth action='requestSignout'>Sign Out</Link>
        <Link notAuth goTo='/login'>Sign In</Link>
        <Link notAuth goTo='/signup'>Sign Up</Link>
      </ul>
    </div>
  </nav>
)
