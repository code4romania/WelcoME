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
const SignUp = ({
  enableSignUp,
  email,
  password,
  passwordRepeat,
  requestFacebook,
  requestGoogle,
  requestSignUp,
  onChangeKey,
  goToSignIn,
  loaded,
}) => {
  // TODO: #2 - extract out the rendering part into smaller components
  const contents = 
    <Grid fluid className='formContainer'>
      <Row className='formRow'>
        <Divider />
        <div className='formRowContent'>
          <p>
            Welcome! You can create an account with social media
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
      <Row className='formRow'>
        <div className='formHalfDivider'>
          <Divider />
        </div>
        <p>
          or
        </p>
        <div className='formHalfDivider'>
          <Divider />
        </div>       
      </Row>  
      <Row className='formRow'>
        <Divider />
        <div className='formRowContent'>
          <p>
            with your email if you would prefer
          </p>
        </div>
        <Divider />
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
          disabled={!loaded || !enableSignUp}
          onClick={requestSignUp}
          raised
          iconBefore={false}
          label='Create account'/>
        <Divider />
      </Row>       
      <Row className='formRow' />
      <Row className='formRow'>
        <Divider />
        <section>
          <p>
            Already have an account?
            <TooltipLink className='authForgotPass' href="#" onClick={goToSignIn}>
              Log in
            </TooltipLink>
          </p>
        </section>
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
