import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Divider from 'react-md/lib/Dividers';
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Button, Text, TextField, Link} from '../../common/common'

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
    const contents =
      <Grid fluid className='formContainer'>
        <Row style={{margin: '0 0 10px 0'}}>
          <Col xs className='formCenterAlign'> 
            <Text type="h3" text="Welcome! You can login with social media" />
          </Col>
        </Row>
        <Row>
          <Col xs className='formCenterAlign'>
            <Button
              primaryColor="#3b5998"
              onClick={this.props.requestFacebook}
              label="Facebook" />
          </Col>
          <Col xs className='formCenterAlign'>
            <Button
              primaryColor="#d34836"
              onClick={this.props.requestGoogle}
              label="Google" />
          </Col>
        </Row>
        <Row style={{margin: '30px 0 -20px 0'}}>
          <div className='formHalfDividerLeft'>
            <Divider />
          </div>
          <Text type="p-bm" text="or with your email if you'd prefer" />
          <div className='formHalfDividerRight'>
            <Divider />
          </div>
        </Row>
        <Row>
          <Col xs className='formCenterAlign'> 
            <TextField
              id='email'
              onChange={val => this.props.onChangeKey('email', val)}
              value={this.props.email.value}
              disabled={this.props.email.disabled}
              label={this.props.email.label}
              error={!!this.props.email.error}
              errorText={this.props.email.error} />
          </Col>
        </Row>
        <Row>
          <Col xs className='formCenterAlign'> 
            <TextField
              id='password'
              onChange={val => this.props.onChangeKey('password', val)}
              value={this.props.password.value}
              type='password'
              label={this.props.password.label}
              error={!!this.props.password.error}
              errorText={this.props.password.error} />
          </Col>
        </Row>
        <Row style={{margin: '0 0 -20px 0'}}>
          <Col xs className='formCenterAlign'> 
            <Link onClick={this.props.goForgot} linkText="Forgot your password?" />
          </Col>
        </Row>
        <Row>
          <Col xs className='formCenterAlign'> 
            <Button
              onClick={this.props.requestSignIn}
              label="Log in" />
          </Col>
        </Row>
        <Row style={{margin: '10px 0 -10px 0'}}>
          <Col xs className='formCenterAlign'>
            <Link
              onClick={this.props.goToSignUp}
              preLinkText="New here?"
              linkText="Create an account" />
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
