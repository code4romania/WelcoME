import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row, Col } from 'react-flexbox-grid'
import injectTooltip from 'react-md/lib/Tooltips';
import classnames from 'classnames';
import WText from '../../common/WText'

const TooltipLink = injectTooltip(({children, className, tooltip, ...props}) => (
  <a {...props} className={classnames(className, 'inline-rel-container')}>
    {tooltip}
    {children}
  </a>
));

export default class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  closeDialog = () => {
    this.setState({ visible: false });
    this.props.goToHome();
  }

  render = () => {
    // TODO: #2 - extract out the rendering part into smaller components
    const contents =
      <Grid fluid className='formContainer'>
        <Row className='formRow'>
          <Col xs className='formRowContent'> 
            <WText type="h3" text="Welcome! You can login with social media" />
          </Col>
        </Row>
        <Row className='formRow'>
          <Col xs className='formRowContent'> 
            <Button
              className='authAction'
              onClick={this.props.requestFacebook}
              raised
              style={{textTransform: 'inherit', backgroundColor: '#3b5998', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '2px', height: '50px'}}
              label='Facebook'/>
          </Col>
          <Col xs className='formRowContent'>
            <Button
              className='authAction'
              onClick={this.props.requestGoogle}
              raised
              style={{textTransform: 'inherit', backgroundColor: '#d34836', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '2px', height: '50px'}}
              label='Google'/>
          </Col>
        </Row>
        <Row className="formRow">
          <div className='formHalfDividerLeft'>
            <Divider />
          </div>
          <WText type="p" text="or with your email if you'd prefer" />
          <div className='formHalfDividerRight'>
            <Divider />
          </div>
        </Row>
        <Row className="formRow">
          <TextField
            className='formTextField'
            id='email'
            fullWidth
            onChange={val => this.props.onChangeKey('email', val)}
            value={this.props.email.value}
            disabled={this.props.email.disabled}
            label={this.props.email.label}
            error={!!this.props.email.error}
            errorText={this.props.email.error} />
        </Row>
        <Row className="formRow">
          <TextField
            id='password'
            fullWidth
            onChange={val => this.props.onChangeKey('password', val)}
            value={this.props.password.value}
            type='password'
            label={this.props.password.label}
            error={!!this.props.password.error}
            errorText={this.props.password.error} />
        </Row>
        <Row className='formRow'>
          <Col xs className='formRowContent'> 
            <TooltipLink href="#" onClick={this.props.goForgot}>
              <WText type="p" text="Forgot your password?" />
            </TooltipLink>
          </Col>
        </Row>
        <Row className='formRow'>
          <Col xs className='formRowContent'> 
            <Button
              className='authAction'
              style={{textTransform: 'inherit', backgroundColor: '#79afff', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '1px', height: '50px'}}
              disabled={!this.props.loaded || !this.props.enableSignIn}
              onClick={this.props.requestSignIn}
              raised
              iconBefore={false}
              label='Log in' />
          </Col>
        </Row>
        <Row className='formRow'>
          <Col xs className='formRowContent'>
            <WText type="p" text="New here?">
              <TooltipLink className='authForgotPass' href="#" onClick={this.props.goToSignUp}>
                <WText type="p" text="Create an account" />
              </TooltipLink>
            </WText>
          </Col>
        </Row>
      </Grid>;

    return (
      <Dialog
        id="signInDialog"
        aria-describedby="sign-in dialog"
        visible={this.state.visible}
        dialogStyle={{width: '450px'}}
        onHide={this.closeDialog}
        closeOnEsc={true} >
        {contents}
      </Dialog>
    );
  }
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
  goToSignUp: PropTypes.func.isRequired,
  goToHome: PropTypes.func.isRequired,
  onChangeKey: PropTypes.func.isRequired,
  enableSignIn: PropTypes.bool,
  loaded: PropTypes.bool
}
