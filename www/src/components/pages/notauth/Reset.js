import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import PropTypes from 'prop-types'
import Grid from 'material-ui-next/Grid';
import { Button, Text, TextField} from '../../common/common'

export default class Reset extends PureComponent {
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
          <Text type="h3" text="Create a new password" />
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
          <Button onClick={this.props.requestReset}>
            Reset password
          </Button>
        </Grid>
      </Grid>;

    return (
      <Dialog
        id="resetDialog"
        aria-describedby="reset password dialog"
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

Reset.propTypes = {
  password: PropTypes.shape(fieldShape).isRequired,
  passwordRepeat: PropTypes.shape(fieldShape).isRequired,
  requestReset: PropTypes.func.isRequired,
  goToHome: PropTypes.func.isRequired,
  onChangeKey: PropTypes.func.isRequired,
  enableReset: PropTypes.bool,
  loaded: PropTypes.bool
}
