import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row } from 'react-flexbox-grid'

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
    // TODO: #2 - extract out the rendering part into smaller components
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
            onChange={val => this.props.onChangeKey('password', val)}
            value={this.props.password.value}
            type='password'
            label={this.props.password.label}
            error={!!this.props.password.error}
            errorText={this.props.password.error} />     
          <TextField
            id='passwordRepeat'
            fullWidth
            onChange={val => this.props.onChangeKey('passwordRepeat', val)}
            value={this.props.passwordRepeat.value}
            type='password'
            label={this.props.passwordRepeat.label}
            error={!!this.props.passwordRepeat.error}
            errorText={this.props.passwordRepeat.error} />       
        </Row>
        <Row className='formRow'>
          <Divider />
          <Button
            className='authAction'
            style={{textTransform: 'inherit', backgroundColor: '#79afff', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '1px', height: '50px'}}          
            disabled={!this.props.loaded || !this.props.enableReset}
            onClick={this.props.requestReset}
            raised
            iconBefore={false}
            label='Reset password'/>
          <Divider />
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
