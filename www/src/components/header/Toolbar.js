import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../header/Menu'
import Logo from '../header/Logo'
import { Card } from 'react-md/lib/Cards'
import { Grid, Row, Col } from 'react-flexbox-grid'
import './toolbar.css'

const Toolbar = ({clickLogo, leftLinks, rightLinks}) => {
  const contents = 
    <Row style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{display: 'flex'}}>
        <Logo clickLogo={clickLogo} />
        <Menu links={leftLinks} />
      </div>
      <div>
        <Menu links={rightLinks} />
      </div>
    </Row>;
    
  return (
    <Grid fluid className='toolbar-menu'>
      {contents}
    </Grid>
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
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    clickProfile: PropTypes.func.isRequired,
    clickSignout: PropTypes.func.isRequired
  })
}

export default Toolbar
