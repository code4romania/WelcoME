import React from 'react'
import './Header.css'

let key = 0
const Link = ({pathname, handler, ...props}) => (
  <li className={`nav-item ${props.router.pathname === pathname ? 'active' : ''}`} key={key++}>
    <a className='nav-link' onClick={() => handler(pathname)}>
      {props.children}
    </a>
  </li>
)

const AuthLink = ({pathname, handler, ...props}) => {
  if (props.auth && props.auth.authenticated) {
    return (
      <Link handler={props.router.goToPath} pathname={pathname} {...props}>
        {props.children}
      </Link>
    )
  } else {
    return (<div />)
  }
}
const NotAuthLink = ({pathname, ...props}) => {
  if (!props.auth || !props.auth.authenticated) {
    return (
      <Link handler={props.router && props.router.goToPath} pathname={pathname} {...props}>
        {props.children}
      </Link>
    )
  } else {
    return (<div />)
  }
}

const Header = (props) => (
  <nav className='navbar navbar-default'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <a className='navbar-brand' onClick={() => props.router.goToPath('/')}>Welcome</a>
      </div>
      <ul className='nav navbar-nav navbar-right'>
        <AuthLink pathname='/favorites' {...props}>My Favorites</AuthLink>
        <AuthLink pathname='/editprofile' {...props}>Profile</AuthLink>
        <AuthLink pathname='/signout' {...props}>Sign Out</AuthLink>
        <NotAuthLink pathname='/login' {...props}>Sign In</NotAuthLink>
        <NotAuthLink pathname='/signup' {...props}>Sign Up</NotAuthLink>
      </ul>
    </div>
  </nav>
)

export default Header
