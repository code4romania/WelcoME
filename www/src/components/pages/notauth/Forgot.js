import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid';
import { Button, Text, TextField } from '../../common/common'

export default class Forgot extends PureComponent {
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
        <Grid item xs={12} className="formCenterAlign" style={{margin: '0 0 -10px 0'}}>
          <Text type="h3" text="We'll send you a link to reset your password" />
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
          <Button
            onClick={this.props.requestForgot}
            label="Send reset link" />
        </Grid>
      </Grid>;

    return (
      <Dialog
        id="forgotDialog"
        aria-describedby="forgot password dialog"
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

Forgot.propTypes = {
  email: PropTypes.shape(fieldShape).isRequired,
  requestForgot: PropTypes.func.isRequired,
  goToHome: PropTypes.func.isRequired,
  onChangeKey: PropTypes.func.isRequired,
  enableForgot: PropTypes.bool,
  loaded: PropTypes.bool
}
