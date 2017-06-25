import React from 'react'
import { Card } from 'react-md/lib/Cards'
import Dialog from 'react-md/lib/Dialogs';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'

// TODO: #2 - extract out the rendering part into smaller components
const Forgot = ({
  enableForgot, 
  email, 
  requestForgot, 
  onChangeKey, 
  loaded,
}) => {
  const contents = 
    <Grid fluid>
      <Row className='formRow'>
        <Divider />
        <div className='formRowContent'>
          <p>
            What's your email address? We'll send you a password reset link
          </p>
        </div>
        <Divider />
      </Row>   
      <Row className='formRow'>
        <TextField
          id='email'
          fullWidth
          onChange={val => onChangeKey('email', val)}
          value={email.value}
          disabled={email.disabled}
          label={email.label}
          error={!!email.error}
          errorText={email.error} />      
      </Row>   
      <Row className='formRow'>
        <Divider />
        <Button
          className='authAction'
          style={{textTransform: 'inherit', backgroundColor: '#79afff', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '1px', height: '50px'}}          
          disabled={!loaded || !enableForgot}
          onClick={requestForgot}
          raised
          iconBefore={false}
          label='Send reset link'/>
        <Divider />      
      </Row>
    </Grid>;
  
  return (
    <Dialog
      id="signUpDialog" 
      visible={true}
      dialogStyle={{width: 'auto'}} >
      {contents}
    </Dialog>
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
