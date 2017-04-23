import React from 'react'
import PropTypes from 'prop-types'
import Pages from '../pages/Pages'
import Toolbar from '../header/Toolbar'
import LinearProgress from 'react-md/lib/Progress/LinearProgress'

import './AuthApp.css'

const AuthApp = ({links, pages, loaded, clickLogo, user}) => {
  return (
    <div>
      {!loaded ? <LinearProgress id='progress-auth' className='progress-auth' /> : null}
      <Toolbar clickLogo={clickLogo} user={user} links={links} />
      <Pages pages={pages} />
    </div>
  )
}
AuthApp.PropTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    action: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  })).isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    Page: PropTypes.oneOf([PropTypes.element, PropTypes.func]).isRequired,
    visible: PropTypes.bool.isRequired
  })).isRequired,
  loaded: PropTypes.bool,
  clickLogo: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    clickProfile: PropTypes.func.isRequired,
    clickSignout: PropTypes.func.isRequired
  })
}
export default AuthApp
