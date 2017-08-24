import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Divider from 'react-md/lib/Dividers';
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid';
import { Button, Text, TextField, Link} from '../../common/common'

export default class SignUp extends PureComponent {
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
          <Text type="h3" text="Welcome! You can sign-up with social media" />
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
        <Grid item xs={12}>
          <TextField
            id='passwordRepeat'
            onChange={val => this.props.onChangeKey('passwordRepeat', val)}
            value={this.props.passwordRepeat.value}
            type='password'
            label={this.props.passwordRepeat.label}
            error={!!this.props.passwordRepeat.error}
            errorText={this.props.passwordRepeat.error} />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={this.props.requestSignUp}
            label="Create account" />
        </Grid>
        <Grid item xs={12} className="formCenterAlign">
          <Link
            onClick={this.props.goToSignIn}
            preLinkText="Already have an account?"
            linkText="Log in" />
        </Grid>
      </Grid>;

    return (
      <Dialog
        id="signUpDialog"
        aria-describedby="sign-up dialog"
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

SignUp.propTypes = {
  email: PropTypes.shape(fieldShape).isRequired,
  password: PropTypes.shape(fieldShape).isRequired,
  passwordRepeat: PropTypes.shape(fieldShape).isRequired,
  requestFacebook: PropTypes.func.isRequired,
  requestGoogle: PropTypes.func.isRequired,
  requestSignUp: PropTypes.func.isRequired,
  goToSignIn: PropTypes.func.isRequired,
  goToHome: PropTypes.func.isRequired,
  onChangeKey: PropTypes.func.isRequired,
  enableSignUp: PropTypes.bool,
  loaded: PropTypes.bool
}
