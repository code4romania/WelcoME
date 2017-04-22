import React from 'react'
import {Card, CardTitle} from 'react-md/lib/Cards'
import TextField from 'react-md/lib/TextFields'
import Divider from 'react-md/lib/Dividers'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'
const SignUp = ({email, password, password2}) => {
  email = {
    label: 'Email',
    value: ''
  }
  password = {
    label: 'Password',
    type: 'password',
    value: ''
  }
  password2 = {
    label: 'Repeat password',
    type: 'password',
    value: ''
  }

  return (
    <Grid fluid>
      <Row>
        <Col xs={0} sm={1} md={2} lg={3} />
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className='form-not-auth'>
            <Row middle='xs' center='xs' >
              <Col>
                <Button raised primary iconBefore={false} label='SignUp With Facebook' iconClassName='fa fa-facebook' />
              </Col>
            </Row>
            <Row style={{marginTop: 12, marginBottom: 12}} middle='xs' center='xs' >
              <Col><Button label='OR' /></Col>
            </Row>

            <Row middle='xs' center='xs'>
              <Col xs={12} sm={12} md={4} lg={4}>
                <TextField
                  id='email'
                  className='md-cell elem1-not-auth'
                  {...email}
                />
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <TextField
                  id='password'
                  {...password}
                  className='md-cell elem1-not-auth'
                />
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <TextField
                  id='password2'
                  {...password2}
                  className='md-cell elem1-not-auth'
                />
              </Col>
            </Row>
            <Row style={{marginTop: 20}} />
            <Row middle='xs' center='xs'>
              <Col>
                <Button raised iconBefore={false} label='SignUp With Email' iconClassName='fa fa-envelope' />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={0} sm={1} md={2} lg={3} />
      </Row>
    </Grid>
  )
}

export default SignUp
