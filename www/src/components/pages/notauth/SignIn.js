import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Divider from 'react-md/lib/Dividers';
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid';
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
      <Grid container spacing={24} align={'center'} justify={'center'}>
        <Grid item xs={12} className="formCenterAlign">
          <Text type="h3" text="Welcome! You can login with social media" />
        </Grid>
        <Grid item xs={6}>
          <Button
            primaryColor="#3b5998"
            onClick={this.props.requestFacebook}
            label="Facebook" />
        </Grid>
        <Grid item xs={6}>
          <Button
            primaryColor="#d34836"
            onClick={this.props.requestGoogle}
            label="Google" />
        </Grid>
        <Grid container spacing={24} align={'center'} justify={'center'} style={{margin: '20px 0 -25px 0'}}>
          <Grid item xs>
            <div className='formHalfDividerLeft' style={{marginLeft: '20px', marginRight: '-20px'}}>
              <Divider />
            </div>
          </Grid>
          <Grid item xs={7}>
            <Text type="p-bm" text="or with your email if you'd prefer" />
          </Grid>
          <Grid item xs>
            <div className='formHalfDividerRight' style={{marginRight: '20px', marginLeft: '-20px'}}>
              <Divider />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='email'
            onChange={val => this.props.onChangeKey('email', val)}
            value={this.props.email.value}
            disabled={this.props.email.disabled}
            label={this.props.email.label}
            error={!!this.props.email.error}
            errorText={this.props.email.error} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='password'
            onChange={val => this.props.onChangeKey('password', val)}
            value={this.props.password.value}
            type='password'
            label={this.props.password.label}
            error={!!this.props.password.error}
            errorText={this.props.password.error} />
        </Grid>
        <Grid item xs={12} className="formCenterAlign">
          <Link onClick={this.props.goForgot} linkText="Forgot your password?" />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={this.props.requestSignIn}
            label="Log in" />
        </Grid>
        <Grid item xs={12} className="formCenterAlign">
          <Link
            onClick={this.props.goToSignUp}
            preLinkText="New here?"
            linkText="Create an account" />
        </Grid>
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
