import React from 'react'
import { Card } from 'react-md/lib/Cards'
import TextField from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'
const SignUp = ({enableSignUp, email, password, passwordRepeat, requestFacebook, requestGoogle, requestSignUp, onChangeKey, loaded}) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs={0} sm={1} md={2} lg={3} />
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className='form-not-auth'>
            <Row middle='xs' center='xs' >
              <Col xs={5}>
                <Button disabled={!loaded} onClick={requestFacebook} raised secondary
                  iconBefore={false} label='SignUp With Facebook' iconClassName='fa fa-facebook' />
              </Col>
              <Col xs={2} />
              <Col xs={5}>
                <Button disabled={!loaded} onClick={requestGoogle} raised primary
                  iconBefore={false} label='SignUp With Google' iconClassName='fa fa-facebook' />
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
                  id='passwordRepeat'
                  fullWidth
                  required
                  onChange={val => onChangeKey('passwordRepeat', val)}
                  value={passwordRepeat.value}
                  type='password'
                  label={passwordRepeat.label}
                  placeholder={passwordRepeat.placeholder || passwordRepeat.label}
                  error={!!passwordRepeat.error}
                  errorText={passwordRepeat.error}
                />
              </Col>
            </Row>
            <Row style={{marginTop: 20}} />
            <Row middle='xs' center='xs'>
              <Col>
                <Button disabled={!loaded || !enableSignUp} onClick={requestSignUp} raised
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
  passwordRepeat: PropTypes.shape(fieldShape).isRequired,
  requestFacebook: PropTypes.func.isRequired,
  requestGoogle: PropTypes.func.isRequired,
  requestSignUp: PropTypes.func.isRequired,
  onChangeKey: PropTypes.func.isRequired,
  enableSignUp: PropTypes.bool,
  loaded: PropTypes.bool
}

export default SignUp
