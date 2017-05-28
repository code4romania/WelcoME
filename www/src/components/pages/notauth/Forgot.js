import React from 'react'
import { Card } from 'react-md/lib/Cards'
import TextField from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'

// TODO: #2 - extract out the rendering part into smaller components
const Forgot = ({enableForgot, email, requestForgot, onChangeKey, loaded}) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs={0} sm={1} md={2} lg={3} />
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className='form-not-auth'>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
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
                  errorText={email.error} />
              </Col>
            </Row>
            <Row style={{marginTop: 20}} />
            <Row middle='xs' center='xs'>
              <Col>
                <Button
                  disabled={!loaded || !enableForgot}
                  onClick={requestForgot}
                  raised
                  iconBefore={false}
                  label='Search'
                  iconClassName='fa fa-search' />
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

Forgot.propTypes = {
  email: PropTypes.shape(fieldShape).isRequired,
  requestForgot: PropTypes.func.isRequired,
  onChangeKey: PropTypes.func.isRequired,
  enableForgot: PropTypes.bool,
  loaded: PropTypes.bool
}

export default Forgot
