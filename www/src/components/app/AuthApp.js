import React from 'react'
import Menu from '../header/Menu'
import Logo from '../header/Logo'
import Pages from '../pages/Pages'
import User from '../header/User'
import LinearProgress from 'react-md/lib/Progress/LinearProgress'
import { Grid, Row, Col } from 'react-flexbox-grid'
import './AuthApp.css'

const AuthApp = ({links, pages, loaded, clickLogo, user}) => {
  return (
    <div>
      {!loaded ? <LinearProgress id='progress-auth' className='progress-auth' /> : null}
      <Grid fluid>
        <Row center='xs'>
          <Col xs={2}><Logo clickLogo={clickLogo} /></Col>
          <Col xs={6}><Menu links={links} /></Col>
          <Col xs={4}><User {...user} /></Col>
        </Row>
      </Grid>
      <Pages pages={pages} />
    </div>
  )
}

export default AuthApp
