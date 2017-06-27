import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../header/Menu'
import Logo from '../header/Logo'
import { Card } from 'react-md/lib/Cards'
import { Grid, Row, Col } from 'react-flexbox-grid'
import LoadingBar from './LoadingBar'

import './toolbar.css'

const Toolbar = ({clickLogo, leftLinks, rightLinks, loading}) => {
  let renderLoading = loading 
    ? <div style={{marginTop: '-2px'}}>
        <LoadingBar /> 
      </div>
    : null;
  
  return (
    <div>     
      <Grid fluid className='toolbar-menu'>
        <Row style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex'}}>
            <Logo clickLogo={clickLogo} />
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
  clickLogo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

export default Toolbar
