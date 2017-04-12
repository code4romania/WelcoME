import React, { PropTypes} from 'react'
import NavLink from './NavLink'
import TitleCard from './TitleCard'
import ProfileCreation from '../page/authenticate/ProfileCreation'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'

const navBarLinks = [
  {
    name: 'camps',
    visible: state => state.auth.profile && state.auth.profile.owner && !(state.auth.profile && state.auth.profile.pendingProfile),
    text: 'Camps',
    route: '/camps'
  },
  {
    name: 'profile',
    visible: state => state.auth.authenticated && !(state.auth.profile && state.auth.profile.pendingProfile),
    text: 'Profile',
    route: '/profile'
  },
  {
    name: 'signout',
    visible: state => state.auth.authenticated && !(state.auth.profile && state.auth.profile.pendingProfile),
    text: 'Sign Out',
    action: 'requestSignout'
  },
  {
    name: 'login',
    visible: state => !state.auth.authenticated && !(state.auth.profile && state.auth.profile.pendingProfile),
    text: 'Login',
    route: '/login'
  },
  {
    name: 'signup',
    visible: state => !state.auth.authenticated && !(state.auth.profile && state.auth.profile.pendingProfile),
    text: 'New Here',
    route: '/signup'
  },
].map(link => ({...link, className: 'nav-link', liClassName: 'nav-item'}))

const Header = (props, context) => {

  const state = context.store;
  const handlers = context.handlers;

  const renderNavBar = (links) => {
    return (
      <ToolbarGroup>
        {links.map(link => (
          <NavLink key={link.name} {...link} />
        ))}
      </ToolbarGroup>
    );
  }

  let showToolbar =
    state.auth.profile && state.auth.profile.pendingProfile
      ? 'none'
      : 'all';

  return (
    <div>
      <TitleCard visible={state => !state.auth.authenticated}/>
      <div style={{display: state => showToolbar}}>
        <Toolbar
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {renderNavBar(navBarLinks)}
        </Toolbar>
      </div>
      <ProfileCreation
        visible={
          state => state.auth.profile && state.auth.profile.pendingProfile
        } />
    </div>
  );
}

Header.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default Header
