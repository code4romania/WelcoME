import React from 'react'
import { Card } from 'react-md/lib/Cards'
import TextField from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'
const SignUp = ({enableSignUpEmail, email, password, password2, signUpWithFacebook, signUpWithEmail, onChangeKey}) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs={0} sm={1} md={2} lg={3} />
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className='form-not-auth'>
            <Row middle='xs' center='xs' >
              <Col>
                <Button onClick={signUpWithFacebook} raised primary iconBefore={false}
                  label='SignUp With Facebook' iconClassName='fa fa-facebook' />
              </Col>
            </Row>
            <Row style={{marginTop: 12, marginBottom: 12}} middle='xs' center='xs' >
              <Col><Button flat label='OR' /></Col>
            </Row>

            <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
                <TextField
                  id='email'
                  fullWidth
                  required
                  onChange={val => onChangeKey('email', val)}
                  value={email.value}
                  disabled={email.disabled}
                  label={email.label}
                  placeholder={email.placeholder || email.label}
                  error={!!email.error}
                  errorText={email.error}
                />
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <TextField
                  id='password'
                  fullWidth
                  required
                  onChange={val => onChangeKey('password', val)}
                  value={password.value}
                  type='password'
                  label={password.label}
                  placeholder={password.placeholder || password.label}
                  error={!!password.error}
                  errorText={password.error}
                />
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <TextField
                  id='password2'
                  fullWidth
                  required
                  onChange={val => onChangeKey('password2', val)}
                  value={password2.value}
                  type='password'
                  label={password2.label}
                  placeholder={password2.placeholder || password2.label}
                  error={!!password2.error}
                  errorText={password2.error}
                />
              </Col>
            </Row>
            <Row style={{marginTop: 20}} />
            <Row middle='xs' center='xs'>
              <Col>
                <Button disabled={!enableSignUpEmail} onClick={signUpWithEmail} raised
                  iconBefore={false} label='SignUp With Email' iconClassName='fa fa-envelope' />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={0} sm={1} md={2} lg={3} />
      </Row>
    </Grid>
  )
}

const fieldShape = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

SignUp.propTypes = {
  email: PropTypes.shape(fieldShape).isRequired,
  password: PropTypes.shape(fieldShape).isRequired,
  password2: PropTypes.shape(fieldShape).isRequired,
  signUpWithFacebook: PropTypes.func.isRequired,
  signUpWithEmail: PropTypes.func.isRequired,
  onChangeKey: PropTypes.func.isRequired,
  valid: PropTypes.bool
}

export default SignUp
