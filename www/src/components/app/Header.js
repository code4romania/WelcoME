import React from 'react'

let key = 0
const link = ({route, text}) => (
  <li className='nav-item' key={key++}>
    <a className='nav-link' href={route}>
      {text}
    </a>
  </li>
)

export default (props) => (
  <nav className='navbar navbar-default'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <a className='navbar-brand' href='/'> Welcome
        </a>
      </div>
      <ul className='nav navbar-nav navbar-right'>
        {props.auth.authenticated && link({route: '/favorites', text: 'My favorites'})}
        {props.auth.authenticated && link({route: '/editprofile', text: 'Profile'})}
        {props.auth.authenticated && link({route: '/logout', text: 'Signout'})}
        {!props.auth.authenticated && link({route: '/login', text: 'Login'})}
        {!props.auth.authenticated && link({route: '/signup', text: 'Signup'})}
      </ul>
    </div>
  </nav>
)
