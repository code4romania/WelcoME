import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../header/Menu'
import Logo from '../header/Logo'
import { Grid, Row } from 'react-flexbox-grid'
import LoadingBar from './LoadingBar'

import './toolbar.css'

const Toolbar = ({loading, logo, leftLinks, rightLinks}) => {
  let renderLoading = loading 
    ? <div style={{marginTop: '-2px'}}>
        <LoadingBar /> 
      </div>
    : null;

  let renderLogo = logo 
    ? <Logo clickLogo={logo.action} />
    : null;

  return (
    <div>     
      <Grid fluid className='toolbar-menu'>
        <Row style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex'}}>
            {renderLogo}
            <Menu links={leftLinks} />
          </div>
          <div>
            <Menu links={rightLinks} />
          </div>
        </Row>
      </Grid>
      {renderLoading}
    </div>
  );
}

Toolbar.PropTypes = {
  loading: PropTypes.bool.isRequired,
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
}

export default Toolbar
