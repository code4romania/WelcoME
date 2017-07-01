import React from 'react'
import PropTypes from 'prop-types'
import Pages from '../pages/Pages'
import Toolbar from '../header/Toolbar'

import './App.css'

const App = ({loaded, logo, leftLinks, rightLinks, pages}) => {
  return (
    <div>
      <Toolbar 
        logo={logo} 
        leftLinks={leftLinks} 
        rightLinks={rightLinks}
        loading={!loaded} />
      <Pages pages={pages} />
    </div>
  );
}

App.PropTypes = {
  loaded: PropTypes.bool,
  logo: PropTypes.shape({
    action: PropTypes.func.isRequired,
  }),  
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
}

export default App
