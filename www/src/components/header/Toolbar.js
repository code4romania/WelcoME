import React from 'react'
import PropTypes from 'prop-types'
import User from '../header/User'
import Menu from '../header/Menu'
import Logo from '../header/Logo'
import { Card } from 'react-md/lib/Cards'
import { Grid, Row, Col } from 'react-flexbox-grid'
const Toolbar = ({clickLogo, links, user}) => {
  return (
    <Card style={{paddingBottom: 10}}>
      <Grid fluid>
        <Row center='xs'>
          <Col xs={2}><Logo clickLogo={clickLogo} /></Col>
          <Col xs={6}><Menu links={links} /></Col>
          <Col xs={4}><User {...user} /></Col>
        </Row>
      </Grid>
    </Card>
  )
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
