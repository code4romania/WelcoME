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
  if (!values.profiletype) {
    errors.profiletype = 'Must select a user type';
  }
  return errors;
}

const ProfileCreationSteps = 4;

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
      finished: stepIndex >= ProfileCreationSteps - 2 ? true : false,
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.context.handlers['requestSignup'](this.context.store.forms);
  }

  renderNextAction = () => {
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

    return (
      <div style={{margin: '12px 0'}}>
        {nextAction}
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
        value={value}
        touched={touched}
        error={error}
        {... field} />
    );
  }

  renderLink = link => {
    return (
      <div style={{paddingTop: '25px'}}>
        <BasicFormLink key={link.goTo} {...link} />
      </div>
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

    let isActive = this.state.stepIndex >= 0;
    let isCompleted = this.state.stepIndex > 0;

    return (
      <Step active={isActive} completed={isCompleted}>
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
              {!isCompleted ? this.renderNextAction() : null}
            </CardActions>
          </Card>
        </StepContent>
      </Step>
    );
  }

  // Render Step 2
  // ---------------------------------------------------------------------
  renderUserTypeStep = () => {
    let userTypes = {
      '0': 'Refugee',
      '1': 'Asylum Seeker',
      '2': 'Community Helper',
    }
    let userTypeField = this.renderField({
      name: 'profiletype',
      fieldType: 'radiogroup',
      values: () => Object
        .keys(userTypes)
        .map(type => ({id: type, label: userTypes[type]})),
    });

    let isActive = this.state.stepIndex >= 1;
    let isCompleted = this.state.stepIndex > 1;

    return (
      <Step active={isActive} completed={isCompleted}>
        <StepLabel>
          Welcome
        </StepLabel>
        <StepContent>
          <Card className='card'>
            <CardText>
              <p>
                {'Hello'}
              </p>
              <p>
                {
                  'Welcome to our platform. We connect communities with ' +
                  'refugees and asylum seekers. Let\'s find out a few things ' +
                  'about you, so we can guide you through the platform.'
                }
              </p>
              <p>
                {'You identify yourself as:'}
              </p>
              {userTypeField}
            </CardText>
            <CardActions>
              {!isCompleted ? this.renderNextAction() : null}
            </CardActions>
          </Card>
        </StepContent>
      </Step>
    );
  }

  // Render Step 3
  // ---------------------------------------------------------------------
  renderProfileStep = () => {

    let isActive = this.state.stepIndex >= 2;
    let isCompleted = this.state.stepIndex > 2;

    return (
      <Step active={isActive} completed={isCompleted}>
        <StepLabel>
          Profile
        </StepLabel>
        <StepContent>
          <Card className='card'>
            <CardText>

            </CardText>
            <CardActions>
              {!isCompleted ? this.renderNextAction() : null}
            </CardActions>
          </Card>
        </StepContent>
      </Step>
    );
  }

  // Render Step 4
  // ---------------------------------------------------------------------
  renderLocationStep = () => {
    let campField = this.renderField({
      name: 'camp',
      fieldType: 'select',
      label: 'Camp',
      values: state => Object
        .keys(state.camps.camps || {})
        .map(cid => ({ id: cid, text: state.camps.camps[cid].name })),
    });

    let isActive = this.state.stepIndex >= 3;
    let isCompleted = this.state.stepIndex > 3;

    return (
      <Step active={isActive} completed={isCompleted}>
        <StepLabel>
          Location
        </StepLabel>
        <StepContent>
          <Card className='card'>
            <CardText>
              {campField}
            </CardText>
            <CardActions>
              {!isCompleted ? this.renderNextAction() : null}
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
          {this.renderProfileStep()}
          {this.renderLocationStep()}
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
