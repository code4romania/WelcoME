import React from 'react';
import PropTypes from 'prop-types'
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Grid from 'material-ui-next/Grid';
import { Button } from '../../common/common'

export default class HorizontalLinearStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= this.props.steps.length,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleSubmit = () => this.props.onSubmit();

  renderStepContent = (stepIndex) => {
    const Page = this.props.steps[stepIndex]['Page'];

    return <Page key={this.props.steps[stepIndex]['key']} />;
  }

  renderStepTitle = (step, index) => {
    return (
      <Step key={step.key}>
        <StepButton onClick={() => this.setState({stepIndex: index})}>
          {step.title}
        </StepButton>
      </Step>
    );
  }

  renderNavigation = (stepIndex) => {
    const isLast = stepIndex === this.props.steps.length - 1;

    return (
      <div className='step-container'>
        <Grid container spacing={24} align={'center'} justify={'center'}>
          <Grid item xs={5}>
            <Button
              onClick={this.handlePrev}
              primaryColor="#ababb2"
              disabled={stepIndex === 0}>
              Back
            </Button>
          </Grid>
          <Grid item xs={2}/>
          <Grid item xs={5}>
            <Button
              onClick={isLast ? this.handleSubmit : this.handleNext}>
              {isLast ? 'Create Profile' : 'Next'}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  render = () => {
    const { stepIndex } = this.state;

    return (
      <MuiThemeProvider>
        <div style={{width: '100%', margin: 'auto'}}>
          <Stepper linear={false} activeStep={stepIndex}>
            {this.props.steps.map((step, index) =>
              this.renderStepTitle(step, index)
            )}
          </Stepper>
          {this.renderStepContent(stepIndex)}
          {this.renderNavigation(stepIndex)}
        </div>
      </MuiThemeProvider>
    );
  }
}

HorizontalLinearStepper.PropTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    Page: PropTypes.oneOf([PropTypes.element, PropTypes.func]).isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
}
