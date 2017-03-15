import React, {PropTypes} from 'react'
import BasicFormLink from '../basicform/BasicFormLink'
import BasicFormField from '../basicform/BasicFormField'
import {Card, CardActions, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import ValidationUtils from '../../page/utils/ValidationUtils'

const validationCriteria = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter an email.';
  } else if (!ValidationUtils.emailCheck(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Please enter a password.';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation.';
  }
  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords do not match';
  }
  if (!values.camp) {
    errors.camp = 'Must select a camp';
  }
  return errors;
}

class ProfileCreationForm extends React.Component {

  state = {
    stepIndex: 0,
    finished: false,
    submitDisabled: !!Object.keys(validationCriteria(this.context.store.forms)).length,
  };

  // Navigation
  // ---------------------------------------------------------------------
  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 0 ? true : false,
    });
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        finished: false,
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.handlers['requestSignup'](this.context.store.forms);
  }

  renderStepActions = () => {
    const {stepIndex, finished} = this.state;
    const nextAction = finished
      ? <RaisedButton
          label='Create Profile'
          type='submit'
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          disabled={this.submitDisabled} />
      : <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext} />
    const prevAction = stepIndex > 0
      ? <FlatButton
          label="Back"
          disabled={stepIndex === 0}
          disableTouchRipple={true}
          disableFocusRipple={true}
          onTouchTap={this.handlePrev} />
      : null;

    return (
      <div style={{margin: '12px 0'}}>
        {nextAction}
        {prevAction}
      </div>
    );
  }

  // Render Components
  // ---------------------------------------------------------------------
  renderField = field => {
    // helpers for field
    const forms = this.context.store.forms;
    const touched =
      forms[field.name] !== null && forms[field.name] !== undefined;
    const value = forms[field.name] || '';
    const error = validationCriteria(this.context.store.forms)[field.name];

    return (
      <BasicFormField
        key={field.name}
        {... field}
        value={value}
        touched={touched}
        error={error} />
    );
  }

  renderLink = link => {
    return (
      <BasicFormLink key={link.goTo} {...link} />
    );
  }

  // Render Step 1
  // ---------------------------------------------------------------------
  renderEmailPasswordStep = () => {
    let emailField = this.renderField({
        name: 'email',
        fieldType: 'textfield',
        label: 'Email',
        type: 'email',
    });
    let passwordField = this.renderField({
      name: 'password',
      fieldType: 'textfield',
      label: 'Password',
      type: 'password',
    });
    let passwordConfirmField = this.renderField({
      name: 'passwordConfirm',
      fieldType: 'textfield',
      label: 'Confirm Password',
      type: 'password',
    });
    let goToSignInLink = this.renderLink({
      goTo: '/login',
      text: 'Already having an account? Sign In',
    });

    return (
      <Step>
        <StepLabel>
          Sign Up
        </StepLabel>
        <StepContent>
          <Card className='card'>
            <CardText>
              {emailField}
              {passwordField}
              {passwordConfirmField}
              {goToSignInLink}
            </CardText>
            <CardActions>
              {this.renderStepActions()}
            </CardActions>
          </Card>
        </StepContent>
      </Step>
    );
  }

  // Render Step 2
  // ---------------------------------------------------------------------
  renderUserTypeStep = () => {
    let refugeeField = this.renderField({
      name: 'volunteer',
      fieldType: 'switch',
      label: 'Volunteer',
    });
    let campField = this.renderField({
      name: 'camp',
      fieldType: 'select',
      label: 'Camp',
      values: state => Object
        .keys(state.camps.camps || {})
        .map(cid => ({ id: cid, text: state.camps.camps[cid].name })),
    });

    return (
      <Step>
        <StepLabel>
          Welcome
        </StepLabel>
        <StepContent>
          <Card className='card'>
            <CardText>
              {refugeeField}
              {campField}
            </CardText>
            <CardActions>
              {this.renderStepActions()}
            </CardActions>
          </Card>
        </StepContent>
      </Step>
    );
  }

  // Render the entire form
  // ---------------------------------------------------------------------
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Stepper
          activeStep={this.state.stepIndex}
          linear={false}
          orientation="vertical">
          {this.renderEmailPasswordStep()}
          {this.renderUserTypeStep()}
        </Stepper>
      </form>
    );
  }
}

ProfileCreationForm.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
}

export default ProfileCreationForm
