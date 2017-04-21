import React from 'react'
import PropTypes from 'prop-types'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'

const Menu = ({links}) => {
  const renderNavBar = (links) => {
    return (
      <ToolbarGroup>
        {links.map(link => (
          <NavLink key={link.name} {...link} />
        ))}
      </ToolbarGroup>
    )
  }

  let showToolbar =
    state.auth.profile && state.auth.profile.pendingProfile
      ? 'none'
      : 'all'

  return (
    <div>
      <TitleCard visible={state => !state.auth.uid} />
      <div style={{display: state => showToolbar}}>
        <Toolbar
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {renderNavBar(navBarLinks)}
        </Toolbar>
      </div>
      <ProfileCreation
        visible={
          state => state.auth.profile && state.auth.profile.pendingProfile
        } />
    </div>
  )
}

Header.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default Header
