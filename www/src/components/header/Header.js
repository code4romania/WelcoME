import React, { PropTypes} from 'react'
import Link from './Link'
import AppBar from 'material-ui/AppBar'

const styles = {
  title: {
    cursor: 'pointer'
  }
}

const links = [
  { name: 'camps', visible: state => state.auth.profile && state.auth.profile.owner, text: 'Camps', route: '/camps' },
  { name: 'profile', visible: state => state.auth.authenticated, text: 'Profile', route: '/profile' },
  { name: 'signout', visible: state => state.auth.authenticated, text: 'Sign Out', action: 'requestSignout' },
  { name: 'login', visible: state => !state.auth.authenticated, text: 'Sign In', route: '/login' },
  { name: 'signup', visible: state => !state.auth.authenticated, text: 'Sign Up', route: '/signup' }

].map(link => ({...link, className: 'nav-link', liClassName: 'nav-item'}))

const Header = (props, {handlers}) => (
  <AppBar
    title={<span style={styles.title}>Welcome</span>} onTitleTouchTap={() => handlers.goToPath('/')}
    showMenuIconButton={false}
    iconElementRight={<div>
      {links.map(link => (
        <Link key={link.name} {...link} />
      ))}
    </div>} />

)
Header.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default Header
