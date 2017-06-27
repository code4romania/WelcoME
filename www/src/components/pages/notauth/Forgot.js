import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import { Grid, Row } from 'react-flexbox-grid'

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
    // TODO: #2 - extract out the rendering part into smaller components
    const contents = 
      <Grid fluid>
        <Row className='formRow'>
          <Divider />
          <div className='formRowContent'>
            <p>
              We'll send you a link to reset your password
            </p>
          </div>
          <Divider />
        </Row>   
        <Row className='formRow'>
          <TextField
            id='email'
            fullWidth
            onChange={val => this.props.onChangeKey('email', val)}
            value={this.props.email.value}
            disabled={this.props.email.disabled}
            label={this.props.email.label}
            error={!!this.props.email.error}
            errorText={this.props.email.error} />      
        </Row>   
        <Row className='formRow'>
          <Divider />
          <Button
            className='authAction'
            style={{textTransform: 'inherit', backgroundColor: '#79afff', color: '#f0f0f0', boxShadow: '0 0', borderRadius: '1px', height: '50px'}}          
            disabled={!this.props.loaded || !this.props.enableForgot}
            onClick={this.props.requestForgot}
            raised
            iconBefore={false}
            label='Send reset link'/>
          <Divider />      
        </Row>
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
