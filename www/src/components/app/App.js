import React from 'react'
import PropTypes from 'prop-types'
import Pages from '../pages/Pages'
import Toolbar from '../header/Toolbar'

import './App.css'

const App = ({leftLinks, rightLinks, pages, loaded, clickLogo}) => {
  return (
    <div>
      <Toolbar 
        clickLogo={clickLogo} 
        leftLinks={leftLinks} 
        rightLinks={rightLinks}
        loading={!loaded} />
      <Pages pages={pages} />
    </div>
  );
}

App.PropTypes = {
  loaded: PropTypes.bool,
  leftLinks: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    action: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  })).isRequired,
  rightLinks: PropTypes.arrayOf(PropTypes.shape({
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
  clickLogo: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    clickProfile: PropTypes.func.isRequired,
    clickSignout: PropTypes.func.isRequired
  })
}

export default App
