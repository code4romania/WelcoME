import React, { PropTypes} from 'react'
import NavLink from './NavLink'
import TitleCard from './TitleCard'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'

const navBarLinks = [
  {
    name: 'camps',
    visible: state => state.auth.profile && state.auth.profile.owner,
    text: 'Camps',
    route: '/camps'
  },
  {
    name: 'profile',
    visible: state => state.auth.authenticated,
    text: 'Profile',
    route: '/profile'
  },
  {
    name: 'signout',
    visible: state => state.auth.authenticated,
    text: 'Sign Out',
    action: 'requestSignout'
  },
  {
    name: 'login',
    visible: state => !state.auth.authenticated,
    text: 'Sign In',
    route: '/login'
  },
  {
    name: 'signup',
    visible: state => !state.auth.authenticated,
    text: 'Sign Up',
    route: '/signup'
  }
].map(link => ({...link, className: 'nav-link', liClassName: 'nav-item'}))

const Header = (props, {handlers}) => {

  const renderNavBar = (links) => {
    return (
      <ToolbarGroup>
        {links.map(link => (
          <div>
            <NavLink key={link.name} {...link} />
          </div>
        ))}
      </ToolbarGroup>
    );
  }

  return (
    <div>
      <TitleCard visible={state => !state.auth.authenticated}/>
      <Toolbar
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {renderNavBar(navBarLinks)}
      </Toolbar>
    </div>
  );
}

Header.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default Header
