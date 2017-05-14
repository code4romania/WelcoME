import React from 'react'
import { Card } from 'react-md/lib/Cards'
import TextField from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'

const Reset = ({enableReset, password, requestReset, onChangeKey, loaded}) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs={0} sm={1} md={2} lg={3} />
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className='form-not-auth'>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
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
                  errorText={password.error} />
              </Col>
            </Row>
            <Row style={{marginTop: 20}} />
            <Row middle='xs' center='xs'>
              <Col>
                <Button
                  disabled={!loaded || !enableReset}
                  onClick={requestReset}
                  raised
                  iconBefore={false}
                  label='Reset Password'
                  iconClassName='fa fa-password' />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={0} sm={1} md={2} lg={3} />
      </Row>
    </Grid>
  );
}

const fieldShape = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

Reset.propTypes = {
  password: PropTypes.shape(fieldShape).isRequired,
  requestReset: PropTypes.func.isRequired,
  onChangeKey: PropTypes.func.isRequired,
  enableReset: PropTypes.bool,
  loaded: PropTypes.bool
}

export default Reset
