import React from 'react'
import { Card } from 'react-md/lib/Cards'
import Dialog from 'react-md/lib/Dialogs';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'
import injectTooltip from 'react-md/lib/Tooltips';
import classnames from 'classnames';

const TooltipLink = injectTooltip(({children, className, tooltip, ...props}) => (
  <a {...props} className={classnames(className, 'inline-rel-container')}>
    {tooltip}
    {children}
  </a>
));

// TODO: #4 auth requests type
const SignIn = ({
  enableSignIn,
  email,
  password,
  requestFacebook,
  requestGoogle,
  requestSignIn,
  onChangeKey,
  goForgot,
  goToSignUp,
  loaded
}) => {
  // TODO: #2 - extract out the rendering part into smaller components
  const contents = 
    <Grid fluid className='formContainer'>
      <Row className='formRow'>
        <Divider />
        <div className='formRowContent'>
          <p>
            Welcome! You can login with social media
          </p>
        </div>
        <Divider />
      </Row>
      <Row className='formRow'>
        <Button
          className='authAction'
          onClick={requestFacebook}
          raised
          style={{textTransform: 'inherit', backgroundColor: '#3b5998', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '2px', height: '50px'}}
          label='Facebook'/>
        <Button
          className='authAction'
          onClick={requestGoogle}
          raised
          style={{textTransform: 'inherit', backgroundColor: '#d34836', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '2px', height: '50px'}}
          label='Google'/>
      </Row>
      <Row className='formRow' />  
      <Row className='formRow'>
        <div className='formHalfDividerLeft'>
          <Divider />
        </div>
        <p>
          or with your email if you'd prefer
        </p>
        <div className='formHalfDividerRight'>
          <Divider />
        </div>     
        <TextField
          className='formTextField'
          id='email'
          fullWidth
          onChange={val => onChangeKey('email', val)}
          value={email.value}
          disabled={email.disabled}
          label={email.label}
          error={!!email.error}
          errorText={email.error} />
        <Divider />
        <TextField
          id='password'
          fullWidth
          onChange={val => onChangeKey('password', val)}
          value={password.value}
          type='password'
          label={password.label}
          error={!!password.error}
          errorText={password.error} />
      </Row>
      <Row className='formRow'> 
        <Divider />
        <TooltipLink href="#" onClick={goForgot}>
          <p>
            Forgot your password?
          </p>
        </TooltipLink>
        <Divider />         
      </Row>      
      <Row className='formRow'>
        <Divider />
        <Button
          className='authAction'
          style={{textTransform: 'inherit', backgroundColor: '#79afff', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '1px', height: '50px'}}          
          disabled={!loaded || !enableSignIn}
          onClick={requestSignIn}
          raised
          iconBefore={false}
          label='Log in'/>
        <Divider />
      </Row>
      <Row className='formRow' />
      <Row className='formRow'>
        <Divider />
        <section>
          <p>
            New here? 
            <TooltipLink className='authForgotPass' href="#" onClick={goToSignUp}>
              Create an account
            </TooltipLink>
          </p>
        </section>
        <Divider />
      </Row>      
    </Grid>;
    
  return (
    <Dialog
      id="signInDialog" 
      visible={true}
      dialogStyle={{width: '450px'}} >
      {contents}
    </Dialog>
  );
}

const fieldShape = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

SignIn.propTypes = {
  email: PropTypes.shape(fieldShape).isRequired,
  password: PropTypes.shape(fieldShape).isRequired,
  requestFacebook: PropTypes.func.isRequired,
  requestGoogle: PropTypes.func.isRequired,
  requestSignIn: PropTypes.func.isRequired,
  goForgot: PropTypes.func.isRequired,
  onChangeKey: PropTypes.func.isRequired,
  enableSignIn: PropTypes.bool,
  loaded: PropTypes.bool
}

export default SignIn
