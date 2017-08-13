import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-flexbox-grid'
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
      <Grid fluid className='formContainer'>
        <Row style={{margin: '0 0 -10px 0'}}>
          <Col xs className='formCenterAlign'> 
            <Text type="h3" text="Create a new password" />
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
        <Row>
          <Col xs className='formCenterAlign'> 
            <TextField
              id='passwordRepeat'
              onChange={val => this.props.onChangeKey('passwordRepeat', val)}
              value={this.props.passwordRepeat.value}
              type='password'
              label={this.props.passwordRepeat.label}
              error={!!this.props.passwordRepeat.error}
              errorText={this.props.passwordRepeat.error} />
          </Col>
        </Row>
        <Row>
          <Col xs className='formCenterAlign'> 
            <Button
              onClick={this.props.requestReset}
              label="Reset password" />
          </Col>
        </Row>
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
