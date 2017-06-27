import React from 'react'
import PropTypes from 'prop-types'
import User from '../header/User'
import Menu from '../header/Menu'
import Logo from '../header/Logo'
import { Card } from 'react-md/lib/Cards'
import { Grid, Row, Col } from 'react-flexbox-grid'
import './toolbar.css'

const Toolbar = ({clickLogo, links, user}) => {
  const contents = 
    <Row>
      <Col>
        <Logo clickLogo={clickLogo} />
      </Col>
      <Col>
        <Menu links={links} />
      </Col>
      <Col>
        <User {...user} />
      </Col>
    </Row>;
    
  return (
    <Grid fluid className='toolbar-menu'>
      {contents}
    </Grid>
  );
}

Toolbar.PropTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
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
