import React from 'react'
import PropTypes from 'prop-types'
import {studies, skills} from '../../../utils'
import SkillsStep from '../SkillsStep'

const SkillsStepContext = (props, context) => {
  const state = context.store;
  const handlers = context.handlers;
  const forms = state.forms.profile;

  // TODO: validation
  const errors = {};

  return (
    <SkillsStep
      studies={studies}
      skills={skills}
      requestSaveProfile={() => handlers.requestCompleteProfile(forms)} />
  );
}

SkillsStepContext.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default SkillsStepContext
