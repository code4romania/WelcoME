import React, {PropTypes} from 'react'
import BasicFormLink from '../basicform/BasicFormLink'
import BasicFormField from '../basicform/BasicFormField'
import {Card, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import {Step, Stepper, StepLabel} from 'material-ui/Stepper'

const validationCriteria = values => {
  const errors = {};
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
    this.context.handlers['requestCreateProfile'](this.context.store.forms);
  }

  renderNextAction = () => {
    const {finished} = this.state;
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

  // Render User Type
  // ---------------------------------------------------------------------
  renderUserTypeStep = () => {
    // TODO: check how to use Entities.userTypes as keys for this map
    const userTypes = {
      REFUGEE: 'Refugee',
      ASYLUM_SEEKER: 'Asylum Seeker',
      VOLUNTEER: 'Volunteer',
    };
    const userTypeField = this.renderField({
      name: 'profiletype',
      fieldType: 'radiogroup',
      values: () => Object
        .keys(userTypes)
        .map(type => ({id: type, label: userTypes[type]})),
    });

    return (
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
      </Card>
    );
  }

  // Render Basic Profile
  // ---------------------------------------------------------------------
  renderProfileStep = () => {
    return (
      <Card className='card'>
        <CardText>
        </CardText>
      </Card>
    );
  }

  // Render Camp selection
  // ---------------------------------------------------------------------
  renderLocationStep = () => {
    const campField = this.renderField({
      name: 'camp',
      fieldType: 'select',
      label: 'Camp',
      values: state => Object
        .keys(state.camps.camps || {})
        .map(cid => ({ id: cid, text: state.camps.camps[cid].name })),
    });

    return (
      <Card className='card'>
        <CardText>
          {campField}
        </CardText>
      </Card>
    );
  }

  // Render Skills
  // ---------------------------------------------------------------------
  renderSkillsStep = () => {
    return (
      <Card className='card'>
        <CardText>
        </CardText>
      </Card>
    );
  }

  // Render Steps
  // ---------------------------------------------------------------------
  renderStep = () => {
    switch(this.state.stepIndex) {
      case 0:
        return this.renderUserTypeStep();
      case 1:
        return this.renderProfileStep();
      case 2:
        return this.renderLocationStep();
      case 3:
        return this.renderSkillsStep();
      default:
        return null;
    }
  }

  // Render the entire form
  // ---------------------------------------------------------------------
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Stepper activeStep={this.state.stepIndex}>
          <Step>
            <StepLabel>
              Welcome
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Profile
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Location
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Skills
            </StepLabel>
          </Step>
        </Stepper>
        {this.renderStep()}
        {this.renderNextAction()}
      </form>
    );
  }
}

ProfileCreationForm.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
}

export default ProfileCreationForm
