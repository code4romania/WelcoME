import React from 'react'
import { Card } from 'react-md/lib/Cards'
import Dialog from 'react-md/lib/Dialogs';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'

// TODO: #3 - extract out the rendering part into smaller components
const Reset = ({
  enableReset, 
  password, 
  passwordRepeat,
  requestReset, 
  onChangeKey, 
  loaded,
}) => {
  const contents = 
    <Grid fluid>
      <Row className='formRow'>
        <Divider />
        <div className='formRowContent'>
          <p>
            Create a new password
          </p>
        </div>
        <Divider />
      </Row>
      <Row className='formRow'>
        <TextField
          id='password'
          fullWidth
          onChange={val => onChangeKey('password', val)}
          value={password.value}
          type='password'
          label={password.label}
          error={!!password.error}
          errorText={password.error} />     
        <TextField
          id='passwordRepeat'
          fullWidth
          onChange={val => onChangeKey('passwordRepeat', val)}
          value={passwordRepeat.value}
          type='password'
          label={passwordRepeat.label}
          error={!!passwordRepeat.error}
          errorText={passwordRepeat.error} />       
      </Row>
      <Row className='formRow'>
        <Divider />
        <Button
          className='authAction'
          style={{textTransform: 'inherit', backgroundColor: '#79afff', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '1px', height: '50px'}}          
          disabled={!loaded || !enableReset}
          onClick={requestReset}
          raised
          iconBefore={false}
          label='Reset password'/>
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

Reset.propTypes = {
  password: PropTypes.shape(fieldShape).isRequired,
  passwordRepeat: PropTypes.shape(fieldShape).isRequired,
  requestReset: PropTypes.func.isRequired,
  onChangeKey: PropTypes.func.isRequired,
  enableReset: PropTypes.bool,
  loaded: PropTypes.bool
}

export default Reset
